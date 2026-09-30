var inputJSON = {
    "segments": [
        // 1. Normal Crossing (Case 1)
        { "from": { "x": 100, "y": 100 }, "to": { "x": 200, "y": 200 } },
        { "from": { "x": 100, "y": 200 }, "to": { "x": 200, "y": 100 } },

        // 2. Shared Endpoint (Case 2)
        { "from": { "x": 300, "y": 100 }, "to": { "x": 400, "y": 200 } },
        { "from": { "x": 300, "y": 100 }, "to": { "x": 250, "y": 200 } },

        // 3. T-Intersection: endpoint of s1 on interior of s2 (Case 3)
        { "from": { "x": 600, "y": 150 }, "to": { "x": 600, "y": 250 } },
        { "from": { "x": 500, "y": 150 }, "to": { "x": 700, "y": 150 } },

        // 4. T-Intersection: endpoint of s2 on interior of s1 (Case 4)
        { "from": { "x": 750, "y": 150 }, "to": { "x": 950, "y": 150 } },
        { "from": { "x": 850, "y": 150 }, "to": { "x": 850, "y": 250 } },

        // 5. Collinear Touch (Case 6)
        { "from": { "x": 100, "y": 300 }, "to": { "x": 200, "y": 300 } },
        { "from": { "x": 200, "y": 300 }, "to": { "x": 300, "y": 300 } },

        // 6. Collinear Overlap - partial, but sharing one endpoint (Case 5)
        { "from": { "x": 400, "y": 300 }, "to": { "x": 600, "y": 300 } },
        { "from": { "x": 400, "y": 300 }, "to": { "x": 700, "y": 300 } },

        // 7. Collinear Overlap - one completely inside another (Case 5)
        { "from": { "x": 100, "y": 400 }, "to": { "x": 400, "y": 400 } },
        { "from": { "x": 200, "y": 400 }, "to": { "x": 300, "y": 400 } },

        // 8. Collinear Disjoint (Case 0)
        { "from": { "x": 500, "y": 400 }, "to": { "x": 600, "y": 400 } },
        { "from": { "x": 650, "y": 400 }, "to": { "x": 750, "y": 400 } },

        // 9. Parallel but not collinear (Case 0)
        { "from": { "x": 100, "y": 500 }, "to": { "x": 300, "y": 500 } },
        { "from": { "x": 100, "y": 520 }, "to": { "x": 300, "y": 520 } },

        // 10. Nearly touching but not (Case 0)
        { "from": { "x": 400, "y": 500 }, "to": { "x": 500, "y": 500 } },
        { "from": { "x": 501, "y": 500 }, "to": { "x": 600, "y": 500 } },

        // 11. Very close parallel (Case 0)
        { "from": { "x": 700, "y": 500 }, "to": { "x": 900, "y": 500 } },
        { "from": { "x": 700, "y": 501 }, "to": { "x": 900, "y": 501 } },

        // 12. Identical segments (Case 5)
        { "from": { "x": 100, "y": 600 }, "to": { "x": 300, "y": 600 } },
        { "from": { "x": 100, "y": 600 }, "to": { "x": 300, "y": 600 } },

        // 13. Perpendicular disjoint (Case 0)
        { "from": { "x": 400, "y": 600 }, "to": { "x": 500, "y": 600 } },
        { "from": { "x": 450, "y": 620 }, "to": { "x": 450, "y": 700 } },

        // 14. Vertical completely collinear disjoint (Case 0)
        { "from": { "x": 600, "y": 600 }, "to": { "x": 600, "y": 650 } },
        { "from": { "x": 600, "y": 660 }, "to": { "x": 600, "y": 700 } },

        // 15. Diagonal T-Intersection: non-90 degrees, endpoint of s1 on interior of s2 (Case 3)
        { "from": { "x": 800, "y": 550 }, "to": { "x": 750, "y": 650 } },
        { "from": { "x": 700, "y": 600 }, "to": { "x": 800, "y": 700 } },

        // 16. Diagonal T-Intersection: non-90 degrees, endpoint of s2 on interior of s1 (Case 4)
        { "from": { "x": 800, "y": 600 }, "to": { "x": 900, "y": 700 } },
        { "from": { "x": 900, "y": 750 }, "to": { "x": 850, "y": 650 } }
    ]
};