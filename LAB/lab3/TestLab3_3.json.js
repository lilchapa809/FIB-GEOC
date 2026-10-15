// TestLab3_3.json.js - Degenerate case where A, B, C are collinear (do not form a circle)
var inputJSON3 = {
	// Three collinear points along the horizontal axis y = 0
	// orientation2D(a, b, c) === 0
	'circle_points': [
		{ 'x': -100, 'y': 0 }, // Point A
		{ 'x': 0, 'y': 0 },    // Point B
		{ 'x': 100, 'y': 0 }   // Point C
	],
	'points': [
		// Points collinear with A, B, C along the line y = 0
		{ 'x': -300, 'y': 0 },
		{ 'x': -200, 'y': 0 }, // Coincides with A
		{ 'x': -100, 'y': 0 },
		{ 'x': 0, 'y': 0 },    // Coincides with B
		{ 'x': 100, 'y': 0 },
		{ 'x': 200, 'y': 0 },  // Coincides with C
		{ 'x': 300, 'y': 0 },

		// Off-line query points across the plane
		{ 'x': 0, 'y': 150 },
		{ 'x': 0, 'y': -150 },
		{ 'x': 150, 'y': 100 },
		{ 'x': -150, 'y': -100 },
		{ 'x': -250, 'y': 250 },
		{ 'x': 250, 'y': -250 },
		{ 'x': 200, 'y': 200 },
		{ 'x': -200, 'y': -200 }
	],
	// No finite circumscribed circle exists (radius = 0)
	'c': { 'x': 0, 'y': 0 },
	'r': 0
};

var inputJSON_collinear = inputJSON3;
