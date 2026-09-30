/**
 * 
 * @description Called every time some selector is changed to update the state
 */
function changeCurrent() {
	let parent = document.getElementById('current');
	try {
		let child = document.getElementById('current-text');
		parent.removeChild(child);
	} catch (e) { }

	let ne = document.createElement('a');
	ne.setAttribute('id', 'current-text');
	let text = getOptionSelected('act').toLowerCase() + ' point';
	let tn = document.createTextNode(text);
	ne.appendChild(tn);
	parent.appendChild(ne);
}

/**
 * 
 * @description Called every time the algorithm changes and updates the state
 */
function changeAlgorithm() {
	let graham = Graham;
	let incremental = Incremental;
	let divideAndConquer = DivideAndConquer;

	let alg = getOptionSelected('alg');
	switch (alg) {
		case 'Incremental':
			myCanvas.convexhull.algorithm = incremental;
			break;
		case 'Divide and conquer':
			myCanvas.convexhull.algorithm = divideAndConquer;
			break;
		case 'Graham\'s':
			myCanvas.convexhull.algorithm = graham;
			break;
		default:
			break;
	}
}

/**
 * 
 * @description Called when the Compute button is pressed
 */
function compute() {
	if (myCanvas.convexhull.points.length == 0) alert('At least 1 point');
	else {
		let type = getOptionSelected('type');
		switch (type) {
			case 'At once':
				myCanvas.convexhull.computeCompleteAlgorithm();
				break;
			case 'Step by step':
				initStepByStep();
				break;
			default:
				break;
		}
	}
}

/**
 * 
 * @description Called when Generate button is pressed and fill the state with N random points
 */
function generateRandomPoints() {
	let points = Math.min(Number(document.getElementById('pointsQuantity').value), 5000);

	let mw = myCanvas.WIDTH / 4;
	let Mw = myCanvas.HEIGHT;

	let mh = 0;
	let Mh = myCanvas.HEIGHT;

	myCanvas.convexhull.points = Halton.generateSequence(points, 2, 3, Mw, Mh).map((e) => new Point(e.x + mw, e.y + mh));

	if (myCanvas.convexhull.ch.length != 0) myCanvas.convexhull.computeCompleteAlgorithm();
}

/**
 * 
 * @param {bolean} disable
 * @description Ables/Disables the main buttons in order to visualize an algorithm
 */
function disableThings(disable) {
	[
		document.getElementById('compute-button'),
		document.getElementById('clear-all-button'),
		document.getElementById('clear-convex-hull-button'),
		document.getElementById('random'),
		document.getElementById('act'),
		document.getElementById('type'),
		document.getElementById('alg')

	].map(thing => {
		if (disable) {
			thing.setAttribute('disabled', true)
		} else {
			thing.removeAttribute('disabled');
		}
	});

	myCanvas.computingStepByStep = disable;

	displayPlayStopButtons(disable);
}

/**
 * 
 * @param {boolean} display
 * @description Display/Hide the step-by-step visualization buttons 
 */
function displayPlayStopButtons(display) {
	if (display) {
		document.getElementById('play-stop').style.display = '';
	} else {
		document.getElementById('play-stop').style.display = 'none';
	}
}

/**
 * 
 * @description Called every time the canvas is pressed and calls the Handler class
 * with the options selected
 */
function canvasPressed() {
	if (!myCanvas.computingStepByStep) {
		const action = getOptionSelected('act');
		if (action == 'Insert') PointHandler.create(mouseX, mouseY);
		else if (action == 'Delete') PointHandler.delete(mouseX, mouseY);
		else if (action == 'Move') PointHandler.move(mouseX, mouseY);
	} else {
		alert('While computing step by step you can\'t insert, delete or move');
	}
}

function windowResized() {
	resizeCanvas(document.getElementById('main-canvas').offsetWidth, 600);
}

/**
 * 
 * @description Clears the lines of the Convex Hull
 */
function clearCH() {
	myCanvas.convexhull.clean();
}

/**
 * 
 * @description Cleans all the used data structures of myCanvas to their inital values
 */
function clearAll() {
	myCanvas.convexhull.cleanAll();

	myCanvas.movingDrawableObject = null;
	myCanvas.someDrawableMoving = false;

	myCanvas.iniX = -1;
	myCanvas.iniY = -1;
}

/**
 * 
 * @description Handles the movement of the moving drawable, if exists 
 */
function handleDrawMovingDrawable() {
	if (myCanvas.someDrawableMoving) {
		let dx = mouseX - myCanvas.iniX;
		let dy = mouseY - myCanvas.iniY;

		myCanvas.movingDrawableObject.move(dx, dy);
		myCanvas.movingDrawableObject.show(myCanvas.buffer, 0, false);

		myCanvas.iniX = mouseX;
		myCanvas.iniY = mouseY;

		myCanvas.convexhull.computeCompleteAlgorithm();
	}
}

/**
 * 
 * @description Initializes the step-by-step visualization
 */
function initStepByStep() {
	myCanvas.computingStepByStep = true;
	disableThings(true);
	myCanvas.timeBetweenSteps = 1000;
	myCanvas.convexhull.step = 0;
	myCanvas.paused = false;
	pause();
}

/**
 * 
 * @description Ends the step-by-step visualization
 */
function endStepByStep() {
	myCanvas.computingStepByStep = false;
	disableThings(false);
	myCanvas.convexhull.drawIndexes = false;
}

/**
 * 
 * @description Plays the step-by-step visualization
 */
function play() {
	myCanvas.convexhull.stepByStep();
	myCanvas.lastUpdate = Date.now();
	myCanvas.paused = false;
}

/**
 * 
 * @description Pauses the step-by-step visualization
 */
function pause() {
	myCanvas.paused = !myCanvas.paused;
}

/**
 * 
 * @description Stops the step-by-step visualization
 */
function stop() {
	endStepByStep();
	myCanvas.convexhull.clean();
}

/**
 * 
 * @description Plays one step forward of the step-by-step visualization
 */
function step_forward() {
	play();
	pause();
}

/**
 * 
 * @description Plays one step backward of the step-by-step visualization
 */
function step_backward() {
	// TODO
}

/**
 * 
 * @description Makes the step-by-step visualization go faster
 */
function faster() {
	myCanvas.timeBetweenSteps -= 100;
}

/**
 * 
 * @description Makes the step-by-step visualization go slower
 */
function slower() {
	myCanvas.timeBetweenSteps += 100;
}

/**
 * 
 * @description Sets the tooltips titles
 */
function assignTooltips() {

	const actionsTooltipText = "Choose an action to perform.";
	const runTooltipText = "Choose how to compute the convex hull, step by step or at once.";
	const algorithmTooltipText = "Select an algorithm to compute the convex hull.";

	$('#actions-tooltip').tooltip({ title: actionsTooltipText });
	$('#run-tooltip').tooltip({ title: runTooltipText });
	$('#algorithm-tooltip').tooltip({ title: algorithmTooltipText });
}