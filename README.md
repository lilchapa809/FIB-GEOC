<div align="center">

  <h1>💻 Computational Geometry (GEOC)</h1>
  
  <p>
    <strong>Bachelors in Computer Science | Polytechnic University of Catalonia - FIB</strong>
  </p>
  
  <p>
    <a href="https://github.com/lilchapa809/FIB-GEOC/graphs/contributors">
      <img src="https://img.shields.io/badge/Contributors-1-blue?style=for-the-badge" />
    </a>
    <a href="https://img.shields.io/badge/Language-JavaScript-yellow?style=for-the-badge&logo=javascript">
      <img src="https://img.shields.io/badge/Language-JavaScript-yellow?style=for-the-badge&logo=javascript" />
    </a>
    <a href="https://img.shields.io/badge/Language-HTML-orange?style=for-the-badge&logo=html5">
      <img src="https://img.shields.io/badge/Language-HTML-orange?style=for-the-badge&logo=html5" />
    </a>
  </p>
  
  <h3> 
    From Geometric Theory to Visual Implementation.
  </h3>
</div>

---

## 📖 About The Course

**Computational Geometry (GEOC)** focuses on the design, analysis, and implementation of algorithms and data structures for geometric problems. This subject bridges theoretical geometry with practical computing, emphasizing robust execution in the 2D plane.

The course is divided into two key components:

1.  **Theory:** Mathematical foundations and advanced algorithms for solving spatial problems (e.g., Convex Hulls, Triangulations, Voronoi Diagrams).
2.  **Labs (Web-based):** Implementation of these concepts using HTML and JavaScript. We use robust orientation tests to compute intersections and visual relationships dynamically on an HTML5 Canvas.

### 🧠 Key Learning Modules

| Module | Environment | Focus Concepts |
| :--- | :--- | :--- |
| **Orientation Tests** | **Labs (JS/HTML)** | Implementing basic geometric primitives like CCW (Counter-Clockwise) to test for intersection and point-line relationships. |
| **Polygons & Triangulation** | **Theory / Labs** | Art gallery problem, polygon decomposition, and meshing point sets. |
| **Sweep-line Algorithms** | **Theory** | Efficient algorithms for segment intersections and finding the closest pair of points. |
| **Convex Hulls** | **Theory** | Graham scan, divide and conquer, and Gift wrapping algorithms. |

---

## 📂 Repository Structure

This repository is organized into theoretical modules and practical laboratory sessions:

```text
.
├── 📂 1_background/                     # Foundation of geometric concepts
├── 📂 2_basic_tools/                    # Basic tools (Orientation, inCircle, etc.)
├── 📂 3_basic_problems_polygons/        # Algorithms relating to polygons
├── 📂 4_sweep-line-algorithm/           # Sweep-line techniques and applications
├── 📂 5_convex_hull_set_points/         # Convex hull algorithms (2D & 3D)
├── 📂 6_triangulating_polygons/         # Decomposing polygons into triangles
├── 📂 7_triangulating_point_sets/       # Delaunay triangulation
├── 📂 8_proximity/                      # Voronoi diagrams and closest pairs
├── 📂 9_duality/                        # Point-line duality transformations
├── 📂 10_point_location_planar_decompositions/ # Point location strategies
├── 📂 11_arrangements_lines/            # Line arrangements and complexity
├── 📂 12_extra/                         # Additional materials and exercises
│
├── 📂 LAB/                              # Practical Programming Assignments (JS/HTML)
│   ├── 📜 README.md                     # Overview of the Lab requirements and environment
│   ├── 📂 lab1/                         # Lab 1: Segment Intersection (using orientation tests)
│   │   ├── 📜 geoc_lab1.html            # Main UI/Canvas file
│   │   ├── 📜 Test_segments.json.js     # Test cases in JSON format
│   │   └── ...
│   ├── 📂 lab2/                         # Lab 2 Implementation
│   └── 📂 lab3/                         # Lab 3 Implementation
│
├── 📄 GeoC-problems_2024.pdf            # Problem sets for the course
├── 📄 Intro_lab_assignments.pptx        # Introduction to the lab environment
└── 📄 README.md                         # This documentation
```
