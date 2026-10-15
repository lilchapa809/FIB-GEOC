var test_bugs = {
    // Scalene triangle designed to test all edges, slopes, and quadrants
    // Edge 0-1: y = 0 from x=0 to x=300
    // Edge 1-2: x + y = 300 from (300, 0) to (100, 200)
    // Edge 2-0: y = 2x from (100, 200) to (0, 0)
    "triangle": [
        { "x": 0, "y": 0 },
        { "x": 300, "y": 0 },
        { "x": 100, "y": 200 }
    ],
    "points": [
        // ==========================================
        // 1. EXACT VERTICES (Case 3: Blue)
        // Two orientations must be 0 simultaneously
        // ==========================================
        { "x": 0, "y": 0 },     // Vertex t0
        { "x": 300, "y": 0 },   // Vertex t1
        { "x": 100, "y": 200 }, // Vertex t2

        // ==========================================
        // 2. EDGE INTERIORS (Case 4: DarkOrange)
        // Strictly on segment, not on vertex
        // ==========================================
        { "x": 150, "y": 0 },   // Midpoint of edge t0-t1 (horizontal)
        { "x": 75, "y": 0 },    // 1/4 point of edge t0-t1
        { "x": 200, "y": 100 }, // Midpoint of edge t1-t2 (diagonal: 200+100=300)
        { "x": 250, "y": 50 },  // Point on edge t1-t2 (250+50=300)
        { "x": 50, "y": 100 },  // Midpoint of edge t2-t0 (diagonal: y = 2x)

        // ==========================================
        // 3. COLLINEAR EXTENSIONS OUTSIDE (Case 2: Red)
        // Collinear with an edge line, but outside the segment
        // (Must NOT trigger Case 4 false-positives!)
        // ==========================================
        { "x": -100, "y": 0 },   // Collinear with t0-t1 past t0 (left)
        { "x": 400, "y": 0 },    // Collinear with t0-t1 past t1 (right)
        { "x": 350, "y": -50 },  // Collinear with t1-t2 past t1 (350 + (-50) = 300)
        { "x": 50, "y": 250 },   // Collinear with t1-t2 past t2 (50 + 250 = 300)
        { "x": 150, "y": 300 },  // Collinear with t2-t0 past t2 (y = 2x, y=300 > 200)
        { "x": -50, "y": -100 }, // Collinear with t2-t0 past t0 (y = 2x, negative)

        // ==========================================
        // 4. STRICTLY INTERIOR (Case 1: Green)
        // Deep interior and points close to vertices/centroid
        // ==========================================
        { "x": 130, "y": 70 },  // Near centroid
        { "x": 20, "y": 10 },   // Near vertex t0 inside
        { "x": 270, "y": 10 },  // Near vertex t1 inside
        { "x": 100, "y": 180 }, // Near vertex t2 inside

        // ==========================================
        // 5. NEAR-MISS BOUNDARY PERTURBATIONS (1-pixel offset)
        // Tests numerical precision right at the boundary
        // ==========================================
        { "x": 150, "y": 1 },   // 1px inside edge t0-t1 (Interior: Green)
        { "x": 150, "y": -1 },  // 1px outside edge t0-t1 (Exterior: Red)
        { "x": 200, "y": 99 },  // 1px inside edge t1-t2 (200+99=299 < 300: Green)
        { "x": 200, "y": 101 }, // 1px outside edge t1-t2 (200+101=301 > 300: Red)
        { "x": 50, "y": 99 },   // 1px inside edge t2-t0 (99 < 100: Green)
        { "x": 50, "y": 101 },  // 1px outside edge t2-t0 (101 > 100: Red)

        // ==========================================
        // 6. EXTERIOR CORNERS / WEDGES (Case 2: Red)
        // Points outside in various angles/quadrants
        // ==========================================
        { "x": -30, "y": -30 },  // Beyond vertex t0
        { "x": 350, "y": -20 },  // Beyond vertex t1
        { "x": 100, "y": 250 }   // Beyond vertex t2
    ]
};

// Aliases for compatibility
var inputJSON4 = test_bugs;
var inputJSON_bugs = test_bugs;
