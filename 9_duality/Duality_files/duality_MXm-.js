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
	scale: 100,
	canvas: null,
	primalBuffer: null,
	dualBuffer: null,
	primalDualObjects: [],
	movingDrawableObject: {
		buffer: null,
		object: null
	},
	someDrawableMoving: false,
	creatingLine: {
		value: false,
		buffer: null,
		line: null
	},
	iniX: -1,
	iniY: -1,
	referenceParabola: null,
	referenceCircle: null
}

/**
 * 
 * @description Sets up the initial values for the visualization such as create
 * and initialize some of the myCanvas properties
 */
function setup() {
	myCanvas.width = document.getElementById('main-canvas').offsetWidth / 2;
	myCanvas.height = 600;

	myCanvas.xmax = myCanvas.width / 2;
	myCanvas.ymax = myCanvas.height / 2;
	myCanvas.xmin = -myCanvas.width / 2
	myCanvas.ymin = -myCanvas.height / 2;

	myCanvas.WIDTH = 2 * myCanvas.width;
	myCanvas.HEIGHT = 600;

	myCanvas.canvas = createCanvas(myCanvas.WIDTH, myCanvas.HEIGHT, WEBGL);

	myCanvas.primalBuffer = createGraphics(myCanvas.width, myCanvas.height, WEBGL);
	myCanvas.dualBuffer = createGraphics(myCanvas.width, myCanvas.height, WEBGL);

	myCanvas.canvas.mousePressed(canvasPressed);

	myCanvas.canvas.parent('main-canvas');

	myCanvas.primalBuffer.rotateX(Math.PI);
	myCanvas.dualBuffer.rotateX(Math.PI);

	myCanvas.referenceParabola = new Parabola(1 / 2, 0, 0, 0, 0);
	myCanvas.referenceCircle = new Circle(0, 0);
}

/**
 * 
 * @description Main loop of the visualization. It's called every frame
 */
function draw() {
	myCanvas.primalBuffer.background(255);
	myCanvas.dualBuffer.background(0);

	if (isReferenceLinesActive()) {
		drawReferenceCoordinates();
	}

	if (isReferenceDualityActive()) {
		drawReferenceDuality();
	}

	myCanvas.primalDualObjects.forEach(obj => {
		obj.show(myCanvas.primalBuffer, myCanvas.dualBuffer);
	});

	handleDrawMovingDrawable();
	LineHandler.handleDrawCreatingLine();

	image(myCanvas.primalBuffer, -myCanvas.width, -myCanvas.height / 2);
	image(myCanvas.dualBuffer, 0, -myCanvas.height / 2);
}