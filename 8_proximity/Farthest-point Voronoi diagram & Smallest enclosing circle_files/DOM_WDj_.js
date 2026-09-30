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
 * @description Called when the Compute button is pressed
 */
function compute() {
	myCanvas.MSC.compute();
	checkAll();
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

	myCanvas.MSC.points = Halton.generateSequence(points, 2, 3, Mw, Mh).map((e) => new Point(e.x + mw, e.y + mh));

	if (myCanvas.MSC.convexHull.ch.lenght != 0) compute();
}

/**
 * 
 * @description Called every time the canvas is pressed and calls the Handler class
 * with the options selected
 */
function canvasPressed() {
	const action = getOptionSelected('act');
	if (action == 'Insert') PointHandler.create(mouseX, mouseY);
	else if (action == 'Delete') PointHandler.delete(mouseX, mouseY);
	else if (action == 'Move') PointHandler.move(mouseX, mouseY);
}

function windowResized() {
	resizeCanvas(document.getElementById('main-canvas').offsetWidth, 600);
}

/**
 * 
 * @description Clears the MSC
 */
function clearMSC() {
	myCanvas.MSC.cleanMSC();
}

/**
 * 
 * @description Clears the CH
 */
function clearCH() {
	myCanvas.MSC.cleanCH();
}

/**
 * 
 * @description Clears the FV
 */
function clearFV() {
	myCanvas.MSC.cleanFV();
}

/**
 * 
 * @description Cleans all the used data structures of myCanvas to their inital values
 */
function clearAll() {
	myCanvas.MSC.cleanAll();

	myCanvas.movingDrawableObject = null;
	myCanvas.someDrawableMoving = false;

	myCanvas.iniX = -1;
	myCanvas.iniY = -1;

	uncheckAll();
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

		myCanvas.MSC.compute();
	}
}

/**
 * 
 * @description Checks all the checkboxes
 */
function checkAll() {
	document.getElementById('CHcheckbox').checked = true;
	document.getElementById('SEMcheckbox').checked = true;
	document.getElementById('SEMCcheckbox').checked = true;
	document.getElementById('FVDcheckbox').checked = true;
}

/**
 * 
 * @description Unchecks all the checkboxes
 */
function uncheckAll() {
	document.getElementById('CHcheckbox').checked = false;
	document.getElementById('SEMcheckbox').checked = false;
	document.getElementById('SEMCcheckbox').checked = false;
	document.getElementById('FVDcheckbox').checked = false;
}

/**
 * 
 * @returns {boolean}
 * @description Returns if the CH checkbox is checked
 */
function CHchecked() {
	return document.getElementById('CHcheckbox').checked;
}

/**
 * 
 * @returns {boolean}
 * @description Returns if the SEM checkbox is checked
 */
function SEMchecked() {
	return document.getElementById('SEMcheckbox').checked;
}

/**
 * 
 * @returns {boolean}
 * @description Returns if the SEM Circle checkbox is checked
 */
function SEMCchecked() {
	return document.getElementById('SEMCcheckbox').checked;
}

/**
 * 
 * @returns {boolean}
 * @description Returns if the FVD checkbox is checked
 */
function FVDchecked() {
	return document.getElementById('FVDcheckbox').checked;
}

/**
 * 
 * @description Zooms in the canvas
 */
function zoom_in() {
	myCanvas.MSC.zoom_in();
}


/**
 * 
 * @description Zooms out the canvas
 */
function zoom_out() {
	myCanvas.MSC.zoom_out();
}

/**
 * 
 * @description Sets the tooltips titles
 */
function assignTooltips() {

	const actionsTooltipText = "Choose an action to perform.";
	const helpersTooltipText = "Here are some helpers that will help you understand the farthest-point Voronoi diagram and the smallest enclosing circle better.";

	$('#actions-tooltip').tooltip({ title: actionsTooltipText });
	$('#helpers-tooltip').tooltip({ title: helpersTooltipText });
}