# GEOC – Lab 2: Point-in-Triangle Test

**Course:** Computational Geometry (GEOC) – Facultat d'Informàtica de Barcelona (FIB, UPC)  
**Deliverable:** Technical Report & Algorithmic Solution  

---

## 1. Problem Statement and Objectives

The objective of Lab 2 is to classify the relative position of an arbitrary 2D query point $p = (p_x, p_y)$ with respect to a general triangle $T = (t_0, t_1, t_2)$ in the Euclidean plane.

The algorithm must partition the plane into four mutually disjoint topological regions:

1. **Interior (Green):** The point $p$ lies strictly inside the open region bounded by $T$.
2. **Boundary – Vertex (Blue):** The point $p$ coincides exactly with one of the triangle's vertices ($t_0$, $t_1$, or $t_2$).
3. **Boundary – Edge Interior (DarkOrange):** The point $p$ lies on one of the triangle's three closed line segments, but not on any vertex (i.e., strictly in the relative interior of an edge).
4. **Exterior (Red):** The point $p$ lies strictly outside the triangle, including points collinear with an edge line but lying outside the bounding segment.

### Mandatory Requirements

- **Orientation-Only Predicates:** The classification must rely exclusively on 2D orientation tests ($\mathbb{R}^2$ determinants), avoiding floating-point divisions, trigonometric functions, slope calculations, or square roots.
- **Order Invariance:** The algorithm must produce identical, correct results regardless of whether the triangle vertices $(t_0, t_1, t_2)$ are supplied in **Counter-Clockwise (CCW)** or **Clockwise (CW)** order.
- **Screen Coordinate Invariance:** HTML5 `<canvas>` employs an inverted $y$-axis (where the origin $(0,0)$ sits at the top-left and $y$ increases downwards). The algorithm must remain fully invariant to this geometric reflection.

---

## 2. Mathematical Foundations: The 2D Orientation Test

Given two points $a = (a_x, a_y)$ and $b = (b_x, b_y)$ defining a directed line segment $\vec{ab}$, and a query point $p = (p_x, p_y)$, the **Orientation Test** in $\mathbb{R}^2$ determines the position of $p$ relative to the oriented line through $a$ and $b$.

### Determinant Definition

The test evaluates the sign of the determinant of the vectors $\vec{ab}$ and $\vec{ap}$:

$$\Delta(a, b, p) = \det \begin{pmatrix} b_x - a_x & p_x - a_x \\ b_y - a_y & p_y - a_y \end{pmatrix} = (b_x - a_x)(p_y - a_y) - (b_y - a_y)(p_x - a_x)$$

Equivalently, using homogeneous coordinates:

$$\Delta(a, b, p) = \det \begin{pmatrix} a_x & a_y & 1 \\ b_x & b_y & 1 \\ p_x & p_y & 1 \end{pmatrix}$$

### Geometric Interpretation (Standard Cartesian vs. Canvas Screen)

In standard Cartesian coordinates ($y$ pointing upwards):

- $\Delta(a, b, p) > 0$: $p$ lies strictly to the **left** of the directed line $a \to b$ (Counter-Clockwise turn).
- $\Delta(a, b, p) < 0$: $p$ lies strictly to the **right** of the directed line $a \to b$ (Clockwise turn).
- $\Delta(a, b, p) = 0$: $p$, $a$, and $b$ are **collinear** (lying on the exact same geometric line).

```
        p (Left: det > 0)
        ^
        |
a --------------> b
        |
        v
        p (Right: det < 0)
```

In the discrete orientation predicate, we extract the sign:
$$\text{orient}(a, b, p) = \begin{cases} +1, & \text{if } \Delta(a, b, p) > 0 \\ -1, & \text{if } \Delta(a, b, p) < 0 \\ 0, & \text{if } \Delta(a, b, p) = 0 \end{cases}$$

---

## 3. The Classification Algorithm

Consider the triangle $T = (t_0, t_1, t_2)$ with the three cyclic directed edges:

- $e_0 = (t_0 \to t_1)$
- $e_1 = (t_1 \to t_2)$
- $e_2 = (t_2 \to t_0)$

For any query point $p$, we compute the three edge orientations:
$$o_0 = \text{orient}(t_0, t_1, p), \quad o_1 = \text{orient}(t_1, t_2, p), \quad o_2 = \text{orient}(t_2, t_0, p)$$

Let $z$ denote the number of zero orientations among $\{o_0, o_1, o_2\}$:
$$z = \sum_{i=0}^2 [o_i = 0]$$

```
                  t2
                 /  \
                /    \
         e2    /  p   \   e1
              / (Int)  \
             /          \
           t0 ---------- t1
                 e0
```

### 3.1. Case 1: Boundary – Vertex ($z \ge 2$)

Since $T$ is non-degenerate (its vertices are not collinear), each vertex is the unique intersection point of exactly two bounding lines:

- $p = t_0 \iff o_0 = 0 \text{ and } o_2 = 0$
- $p = t_1 \iff o_0 = 0 \text{ and } o_1 = 0$
- $p = t_2 \iff o_1 = 0 \text{ and } o_2 = 0$

Thus, $p$ coincides with a vertex if and only if **two of the orientation tests evaluate to zero** ($z = 2$).

- **Color:** `Blue`
- **Description:** `"Boundary: Vertex"`

### 3.2. Case 2: Boundary – Edge Interior ($z = 1$)

If exactly one orientation is zero (e.g., $o_0 = 0$), point $p$ lies on the infinite line containing segment $t_0 t_1$.

To decide whether $p$ lies **between** $t_0$ and $t_1$ or on the exterior collinear rays, we observe the orientation of $p$ with respect to the remaining two directed edges ($e_1$ and $e_2$):

- Lines $L(t_1, t_2)$ and $L(t_2, t_0)$ intersect line $L(t_0, t_1)$ at $t_1$ and $t_0$, respectively.
- For all points strictly between $t_0$ and $t_1$, the point $p$ is on the **same relative side** of both lines $L(t_1, t_2)$ and $L(t_2, t_0)$ as the interior of the triangle.
- Therefore, $p \in \text{int}(t_0 t_1)$ if and only if $o_1$ and $o_2$ are non-zero and share the **exact same sign**:
  $$(o_1 > 0 \land o_2 > 0) \quad \text{or} \quad (o_1 < 0 \land o_2 < 0) \iff o_1 \cdot o_2 > 0$$

If $o_1$ and $o_2$ have opposite signs ($o_1 \cdot o_2 < 0$), $p$ lies on the infinite line outside the triangle segment (Exterior).

By symmetry:

- If $o_0 = 0$: $p$ is on edge interior $\iff o_1 \cdot o_2 > 0$.
- If $o_1 = 0$: $p$ is on edge interior $\iff o_0 \cdot o_2 > 0$.
- If $o_2 = 0$: $p$ is on edge interior $\iff o_0 \cdot o_1 > 0$.

When satisfied:

- **Color:** `DarkOrange`
- **Description:** `"Boundary: Edge Interior"`

> **Key Insight:** This check requires **no 1D bounding-box or distance computations**. The other two orientation tests provide the exact 1D interval confinement naturally.

### 3.3. Case 3: Strictly Interior ($z = 0$)

When $z = 0$, $p$ does not lie on the infinite line of any edge.

- If $T$ is ordered Counter-Clockwise (CCW), an interior point lies strictly to the left of all three edges:
  $$o_0 = +1, \quad o_1 = +1, \quad o_2 = +1$$
- If $T$ is ordered Clockwise (CW), an interior point lies strictly to the right of all three edges:
  $$o_0 = -1, \quad o_1 = -1, \quad o_2 = -1$$

Thus, $p \in \text{int}(T)$ if and only if:
$$(o_0 > 0 \land o_1 > 0 \land o_2 > 0) \quad \lor \quad (o_0 < 0 \land o_1 < 0 \land o_2 < 0)$$

- **Color:** `Green`
- **Description:** `"Interior"`

### 3.4. Case 4: Strictly Exterior

Any configuration not meeting the three criteria above belongs to the exterior:

- $z = 0$ with mixed signs (e.g., $(+1, +1, -1)$ or $(+1, -1, -1)$).
- $z = 1$ where the remaining two orientations have opposite signs ($o_j \cdot o_k < 0$).
- **Color:** `Red`
- **Description:** `"Exterior"`

---

## 4. Robustness and Invariance Guarantees

### 4.1. Clockwise (CW) vs. Counter-Clockwise (CCW) Invariance

Reversing vertex order from $(t_0, t_1, t_2)$ to $(t_0, t_2, t_1)$ negates all three orientation determinants:
$$o_i \mapsto -o_i \quad \forall i \in \{0, 1, 2\}$$
Because our decision rules evaluate either sign equality ($(+++) \lor (---)$) or sign products ($o_j \cdot o_k > 0$ where $(-1) \cdot (-1) = (+1) \cdot (+1) = +1$), the classification logic is strictly invariant under vertex permutation.

### 4.2. Inverted Screen Coordinate Invariance

HTML5 `<canvas>` reflects the $y$-axis ($y_{\text{canvas}} = -y_{\text{Cartesian}}$). This spatial reflection changes the orientation determinant sign:
$$\Delta_{\text{canvas}} = -\Delta_{\text{Cartesian}}$$
A spatial reflection transforms a CCW loop into a CW loop. Because our algorithm is proven invariant to CW/CCW orientation, it operates seamlessly on `<canvas>` coordinates without coordinate transformations or negation flags.

### 4.3. Pure Integer Exact Arithmetic

If input coordinates are integers, every step of the algorithm consists solely of subtractions, additions, and multiplications:
$$\det = (b_x - a_x)(p_y - a_y) - (b_y - a_y)(p_x - a_x)$$
No division is ever performed. As long as values remain within IEEE 754 safe integer limits ($|x|, |y| < 2^{26}$), the computations are **100% exact and free from floating-point roundoff errors**.

---

## 5. Complete Implementation Reference

Below is the JavaScript implementation integrated into `geoc_lab2.html`:

```javascript
/**
 * 2D Orientation Test
 * Computes the determinant of vectors (b - a) and (p - a).
 * Returns:
 *   +1 : p is to the left of directed line ab
 *   -1 : p is to the right of directed line ab
 *    0 : p is collinear with ab
 */
function orientation(a, b, p) {
    var det = (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x);
    if (det > 0) return 1;
    if (det < 0) return -1;
    return 0;
}

/**
 * Classifies query point p with respect to triangle T = [t0, t1, t2].
 * Returns an object with the display color and a descriptive string.
 */
function classifyPoint(p, triangle) {
    var t0 = triangle[0];
    var t1 = triangle[1];
    var t2 = triangle[2];

    // Evaluate orientations w.r.t. the three cyclic edges
    var o0 = orientation(t0, t1, p);
    var o1 = orientation(t1, t2, p);
    var o2 = orientation(t2, t0, p);

    // Count how many edge lines contain p
    var zeros = (o0 === 0 ? 1 : 0) + (o1 === 0 ? 1 : 0) + (o2 === 0 ? 1 : 0);

    // Case 1: Vertex Boundary (coincides with an intersection of 2 edges)
    if (zeros >= 2) {
        return {
            color: "Blue",
            description: "Boundary: Point coincides with a triangle vertex"
        };
    }

    // Case 2: Edge Interior Boundary
    if (zeros === 1) {
        // Point is collinear with exactly one edge line.
        // It lies in the interior of the segment iff orientations
        // w.r.t. the other two edges share the same non-zero sign.
        var onEdgeInterior = false;
        if (o0 === 0) onEdgeInterior = (o1 * o2 > 0);
        else if (o1 === 0) onEdgeInterior = (o0 * o2 > 0);
        else if (o2 === 0) onEdgeInterior = (o0 * o1 > 0);

        if (onEdgeInterior) {
            return {
                color: "DarkOrange",
                description: "Boundary: Point lies on a triangle edge interior"
            };
        } else {
            return {
                color: "Red",
                description: "Exterior: Point is collinear with an edge line but outside the triangle"
            };
        }
    }

    // Case 3: Strictly Interior
    // All three orientations must be strictly non-zero and share the exact same sign
    if ((o0 > 0 && o1 > 0 && o2 > 0) || (o0 < 0 && o1 < 0 && o2 < 0)) {
        return {
            color: "Green",
            description: "Interior: Point lies strictly inside the triangle"
        };
    }

    // Case 4: Strictly Exterior
    return {
        color: "Red",
        description: "Exterior: Point lies strictly outside the triangle"
    };
}
```

---

## 6. Empirical Validation on Benchmark Datasets

The solution was verified against all three laboratory test datasets:

### Test Set 1 vs. Test Set 2: Vertex Reordering Test

- **Test 1 Triangle:** $T_1 = [(0,0), (200,200), (100,300)]$ (Ordered CCW)
- **Test 2 Triangle:** $T_2 = [(0,0), (100,300), (200,200)]$ (Ordered CW, reversed order)
- **Points:** Identical set of 11 query points.

| Index | Point Coordinates | Test 1 Classification | Test 2 Classification | Geometric Verification |
| :-----: | :-----------------: | :---------------------: | :---------------------: | :----------------------- |
| 1 | $(-100, 0)$ | Exterior (Red) | Exterior (Red) | Far left of $t_0$ |
| 2 | $(100, 0)$ | Exterior (Red) | Exterior (Red) | Outside |
| 3 | $(0, -100)$ | Exterior (Red) | Exterior (Red) | Far above $t_0$ |
| 4 | $(0, 100)$ | Exterior (Red) | Exterior (Red) | Outside |
| 5 | $(100, 100)$ | Edge Interior (DarkOrange) | Edge Interior (DarkOrange) | Midpoint of edge $(0,0) \to (200,200)$ |
| 6 | $(200, 100)$ | Exterior (Red) | Exterior (Red) | Outside |
| 7 | $(0, 200)$ | Exterior (Red) | Exterior (Red) | Outside |
| 8 | $(100, 200)$ | **Interior (Green)** | **Interior (Green)** | Strictly inside the triangle |
| 9 | $(300, 200)$ | Exterior (Red) | Exterior (Red) | Outside |
| 10 | $(100, 300)$ | **Vertex (Blue)** | **Vertex (Blue)** | Exact match with vertex $t_2$ (Test 1) / $t_1$ (Test 2) |
| 11 | $(100, 400)$ | Exterior (Red) | Exterior (Red) | Collinear extension past vertex $(100, 300)$ |

**Conclusion:** Both test sets yield identical classifications across all points, proving complete CW/CCW order independence.

---

### Test Set 3: Collinear Extension and Boundary Stress Test

- **Triangle:** $T_3 = [(0,0), (200,0), (0,200)]$
- **Grid:** 25 points spanning $x, y \in \{-100, 0, 100, 200, 300\}$.

Key edge and collinear points evaluated:

- **Vertices:**
  - $(0,0)$: Vertex (Blue) — intersection of edges on $y=0$ and $x=0$.
  - $(200,0)$: Vertex (Blue) — intersection of horizontal edge and hypotenuse $x+y=200$.
  - $(0,200)$: Vertex (Blue) — intersection of vertical edge and hypotenuse.
- **Edge Interiors:**
  - $(100,0)$: Edge Interior (DarkOrange) — strictly between $(0,0)$ and $(200,0)$ on $y=0$.
  - $(0,100)$: Edge Interior (DarkOrange) — strictly between $(0,0)$ and $(0,200)$ on $x=0$.
  - $(100,100)$: Edge Interior (DarkOrange) — lies exactly on hypotenuse line $x+y=200$ ($100+100=200$).
- **Collinear Points Beyond Segments (Critical Case):**
  - $(-100,0)$: Exterior (Red) — collinear with $y=0$, but $x = -100 < 0$.
  - $(300,0)$: Exterior (Red) — collinear with $y=0$, but $x = 300 > 200$.
  - $(0,-100)$: Exterior (Red) — collinear with $x=0$, but $y = -100 < 0$.
  - $(0,300)$: Exterior (Red) — collinear with $x=0$, but $y = 300 > 200$.

All collinear points outside the segments are correctly identified as **Exterior (Red)** without false positive edge detections.

---

## 7. Color Legend Summary

| Color | Region | Mathematical Condition |
| :------ | :------- | :----------------------- |
| <span style="color:green; font-weight:bold;">Green</span> | **Interior** | $(o_0 > 0 \land o_1 > 0 \land o_2 > 0) \lor (o_0 < 0 \land o_1 < 0 \land o_2 < 0)$ |
| <span style="color:blue; font-weight:bold;">Blue</span> | **Boundary – Vertex** | At least two orientations equal 0 ($z \ge 2$) |
| <span style="color:darkorange; font-weight:bold;">DarkOrange</span> | **Boundary – Edge Interior** | Exactly one $o_i = 0$, and the other two share the same sign ($o_j \cdot o_k > 0$) |
| <span style="color:red; font-weight:bold;">Red</span> | **Exterior** | All remaining configurations (mixed signs or collinear outside segment) |

---

## 8. Complexity Analysis

- **Time Complexity:**
  - For a single query point $p$: exactly 3 orientation tests, each taking $O(1)$ arithmetic operations. Total query time is $\mathcal{O}(1)$.
  - For a dataset of $n$ query points: total processing time is $\mathcal{O}(n)$.
- **Space Complexity:** $\mathcal{O}(1)$ auxiliary space beyond the storage of input points and triangle vertices.
