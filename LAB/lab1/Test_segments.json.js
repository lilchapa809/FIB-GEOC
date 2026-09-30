var inputJSON = {
    'segments': [
        // 0: No intersection (Blue)
        { from: { 'x': 100, 'y': 100 }, to: { 'x': 200, 'y': 100 } },
        { from: { 'x': 100, 'y': 200 }, to: { 'x': 200, 'y': 200 } },

        // 1: Proper intersection (Red)
        { from: { 'x': 300, 'y': 100 }, to: { 'x': 400, 'y': 200 } },
        { from: { 'x': 300, 'y': 200 }, to: { 'x': 400, 'y': 100 } },

        // 2: Shared point (v-shape) (Green)
        { from: { 'x': 500, 'y': 100 }, to: { 'x': 600, 'y': 100 } },
        { from: { 'x': 500, 'y': 100 }, to: { 'x': 550, 'y': 200 } },

        // 3: T-Intersection (Endpoint of s2 on interior of s1) (Cyan)
        { from: { 'x': 100, 'y': 300 }, to: { 'x': 300, 'y': 300 } },
        { from: { 'x': 200, 'y': 300 }, to: { 'x': 200, 'y': 400 } },

        // 4: T-Intersection (Endpoint of s1 on interior of s2) (DarkOrange)
        { from: { 'x': 500, 'y': 300 }, to: { 'x': 500, 'y': 400 } },
        { from: { 'x': 400, 'y': 300 }, to: { 'x': 600, 'y': 300 } },

        // 5: Collinear Overlap (Magenta)
        { from: { 'x': 100, 'y': 500 }, to: { 'x': 300, 'y': 500 } },
        { from: { 'x': 200, 'y': 500 }, to: { 'x': 400, 'y': 500 } },

        // 6: Collinear Touch (RosyBrown)
        { from: { 'x': 500, 'y': 500 }, to: { 'x': 700, 'y': 500 } },
        { from: { 'x': 700, 'y': 500 }, to: { 'x': 900, 'y': 500 } }
    ]
};