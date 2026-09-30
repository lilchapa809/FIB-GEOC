/**
 * 
 * @description adds the options to the selectors
 */
function addOptions() {
	let parent = document.getElementById('sel');
	let options = Drawable.types;

	options.forEach(option => {
		let p = document.createElement("option");
		let t = document.createTextNode(option);
		p.appendChild(t);
		parent.appendChild(p);
	});

	parent = document.getElementById('duals');
	options = Duality.dualities;

	options.forEach(option => {
		let p = document.createElement("option");
		let t = document.createTextNode(option);
		p.appendChild(t);
		parent.appendChild(p);
	});
}

/**
 * 
 * @description Called every time the duality is changed to recalculate all the objects
 */
function dualityChanged() {
	for (let i = myCanvas.primalDualObjects.length - 1; i >= 0; --i) {
		if (!myCanvas.primalDualObjects[i].recalcDuality()) {
			alert('There\'s no duality of a point at (0, 0) on cirlce duality');
			myCanvas.primalDualObjects.splice(i, 1);
		}
	}
}

/**
 * 
 * @description Called every time some selector is changed to update the state
 */
function changeCurrent() {
	let parent = document.getElementById('current-action');
	try {
		let child = document.getElementById('current-action-text');
		parent.removeChild(child);
	} catch (e) { }

	let ne = document.createElement('a');
	ne.setAttribute('id', 'current-action-text');
	let text = ' ' + getOptionSelected('act').toLowerCase() + ' ' + getOptionSelected('sel').toLowerCase();
	let tn = document.createTextNode(text);
	ne.appendChild(tn);
	parent.appendChild(ne);


	parent = document.getElementById('current-duality');
	try {
		let child = document.getElementById('current-duality-text');
		parent.removeChild(child);
	} catch (e) { }

	ne = document.createElement('a');
	ne.setAttribute('id', 'current-duality-text');
	const dual = getOptionSelected('duals');
	ne.appendChild(document.createTextNode(dual));
	parent.appendChild(ne);

	if (dual == 'Parabola') Duality.duality = ParabolaDuality;
	else if (dual == 'Circle') Duality.duality = CircleDuality;
	else Duality.duality = undefined;
}

/**
 * 
 * @returns {boolean}
 * @description Returns if the checkbox of reference lines is checked or not
 */
function isReferenceLinesActive() {
	let checkbox = document.getElementById('referenceLinesHandler');
	return checkbox.checked;
}

/**
 * 
 * @returns {boolean}
 * @description Returs if the checkbox of lightning is checked or not
 */
function isLightningActive() {
	let checkbox = document.getElementById('lightningHandler');
	return checkbox.checked;
}

/**
 * 
 * @returns {boolean}
 * @description Returs if the checkbox of reference duality is checked or not
 */
function isReferenceDualityActive() {
	let checkbox = document.getElementById('referenceParabolasHandler');
	return checkbox.checked;
}

/**
 * 
 * @description Draws the reference X and Y axis
 */
function drawReferenceCoordinates() {
	myCanvas.primalBuffer.stroke(255, 0, 0, 100);
	myCanvas.primalBuffer.line(0, -myCanvas.height / 2, 0, myCanvas.height / 2);
	myCanvas.primalBuffer.line(-myCanvas.width / 2, 0, myCanvas.width / 2, 0);

	myCanvas.dualBuffer.stroke(255, 0, 0, 100);
	myCanvas.dualBuffer.line(0, -myCanvas.height / 2, 0, myCanvas.height / 2);
	myCanvas.dualBuffer.line(-myCanvas.width / 2, 0, myCanvas.width / 2, 0);
}

/**
 * 
 * @description Draws the reference duality at (0, 0)
 */
function drawReferenceDuality() {
	if (getOptionSelected('duals') == 'Parabola') {
		myCanvas.referenceParabola.show(myCanvas.primalBuffer, 0, false);
		myCanvas.referenceParabola.show(myCanvas.dualBuffer, 255, false);
	} else if (getOptionSelected('duals') == 'Circle') {
		myCanvas.referenceCircle.show(myCanvas.primalBuffer, 0, false);
		myCanvas.referenceCircle.show(myCanvas.dualBuffer, 255, false);
	} else throw new Error('Duality does not exists');
}

/**
 * 
 * @description Called every time the canvas is pressed and calls the Handler class
 * with the options selected
 */
function canvasPressed() {
	let x = mouseX;
	let y = mouseY;

	if (myCanvas.creatingLine.value) {
		LineHandler.handleSecondPointLine(x, y);
		return;
	}

	let drawable = undefined;
	const drawableSelected = getOptionSelected('sel');
	if (drawableSelected == 'Point') drawable = PointHandler;
	else if (drawableSelected == 'Line') drawable = LineHandler;
	else if (drawableSelected == 'Parabola') drawable = ParabolaHandler;
	else if (drawableSelected == 'Circle') drawable = CircleHandler;

	const actionSelected = getOptionSelected('act');
	if (actionSelected == 'Insert') drawable.create(x, y);
	else if (actionSelected == 'Delete') drawable.delete(x, y);
	else if (actionSelected == 'Move') drawable.move(x, y);
}

function windowResized() {
	resizeCanvas(document.getElementById('main-canvas').offsetWidth, 600);
}

/**
 * 
 * @description Cleans all the used data structures of myCanvas to their inital values
 */
function clearAll() {
	myCanvas.primalDualObjects = [];

	myCanvas.creatingLine = {
		value: false,
		buffer: null,
		line: null
	};

	myCanvas.movingDrawableObject = {
		buffer: null,
		object: null
	}

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
		let lp = getLocalPosition(mouseX, mouseY);
		let dx = lp.x - myCanvas.iniX;
		let dy = lp.y - myCanvas.iniY;

		myCanvas.movingDrawableObject.object.move(dx, dy, myCanvas.movingDrawableObject.buffer);
		myCanvas.movingDrawableObject.object.expand('primal-dual');
		myCanvas.movingDrawableObject.object.show(myCanvas.primalBuffer, myCanvas.dualBuffer);

		myCanvas.iniX = lp.x;
		myCanvas.iniY = lp.y;
	}
}


/**
 * 
 * @description Sets the tooltips titles
 */
function assignTooltips() {

	const playTooltipText = "Left click on the canvas to aply the current action.";
	const dualityTooltipText = "Choose the duality conic, parabola or circle.";
	const drawingTooltipText = "Choose the geometric object to apply an action.";
	const actionsTooltipText = "Choose an action to perform.";
	const helpersTooltipText = "Here are some helpers that will help you understand duality better.";

	$('#play-tooltip').tooltip({ title: playTooltipText });
	$('#duality-tooltip').tooltip({ title: dualityTooltipText });
	$('#drawing-tooltip').tooltip({ title: drawingTooltipText });
	$('#actions-tooltip').tooltip({ title: actionsTooltipText });
	$('#helpers-tooltip').tooltip({ title: helpersTooltipText });
}