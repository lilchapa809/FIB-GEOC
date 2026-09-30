/**
 * 
 * @global Object that encapsulates the global variables needed
 */
let myCanvas = {
	WIDTH: 0,
	HEIGHT: 0,
	width: 0,
	height: 0,
	xmax: 0,
	ymax: 0,
	xmin: 0,
	ymin: 0,
	buffer: null,
	canvas: null,
	convexhull: new ConvexHull(),
	movingDrawableObject: null,
	someDrawableMoving: false,
	computingStepByStep: false,
	iniX: -1,
	iniY: -1,
	lastUpdate: null,
	timeBetweenSteps: 1000,
	paused: false,
}

/**
 * 
 * @description Sets up the initial values for the visualization such as create
 * and initialize some of the myCanvas properties
 */
function setup() {
	myCanvas.WIDTH = myCanvas.width = document.getElementById('main-canvas').offsetWidth;
	myCanvas.HEIGHT = myCanvas.height = 600;


	myCanvas.canvas = createCanvas(myCanvas.WIDTH, myCanvas.HEIGHT)

	myCanvas.canvas.mousePressed(canvasPressed);

	myCanvas.canvas.parent('main-canvas');

	myCanvas.buffer = createGraphics(myCanvas.WIDTH, myCanvas.HEIGHT);
}

/**
 * 
 * @description Main loop of the visualization. It's called every frame
 */
function draw() {
	myCanvas.buffer.background(255);

	if (!myCanvas.paused && myCanvas.computingStepByStep && Date.now() >= myCanvas.lastUpdate + myCanvas.timeBetweenSteps) {
		play();
	}

	myCanvas.convexhull.show(myCanvas.buffer, 0);

	handleDrawMovingDrawable();

	image(myCanvas.buffer, 0, 0);
}