/**
 * 
 * @extends Handler
 */
class LineHandler extends Handler {
	/**
	 * 
	 * @param {number} x 
	 * @param {number} y
	 * @description Creates a line at x, y 
	 */
	static create(x, y) {
		let lp = getLocalPosition(x, y);

		myCanvas.creatingLine.buffer = lp.space;
		myCanvas.creatingLine.value = true;
		myCanvas.creatingLine.line = new Line(lp.x, lp.y);
	}

	/**
	 * 
	 * @param {number} x 
	 * @param {number} y
	 * @description Deletes the line at (x, y) 
	 */
	static delete(x, y) {
		let lp = getLocalPosition(x, y);

		let list = [];
		if (lp.space == 'primal') myCanvas.primalDualObjects.forEach(obj => list.push(obj.primalObject));
		else myCanvas.primalDualObjects.forEach(obj => list.push(obj.dualObject));

		let l = canDeleteLine(lp.x, lp.y, list);
		if (l != -1) {
			myCanvas.primalDualObjects.splice(l, 1);
		}
	}

	/**
	 * 
	 * @param {number} x 
	 * @param {number} y
	 * @description Moves the line at (x, y) or to (x, y) 
	 */
	static move(x, y) {
		let lp = getLocalPosition(x, y);

		if (myCanvas.someDrawableMoving) {
			if (lp.space == myCanvas.movingDrawableObject.buffer) {
				myCanvas.primalDualObjects.push(myCanvas.movingDrawableObject.object);
				myCanvas.someDrawableMoving = false;
				myCanvas.movingDrawableObject.buffer = null;
				myCanvas.movingDrawableObject.object = null;
				myCanvas.iniX = -1;
				myCanvas.iniY = -1;
			}
		} else {
			let list = [];
			if (lp.space == 'primal') myCanvas.primalDualObjects.forEach(obj => list.push(obj.primalObject));
			else myCanvas.primalDualObjects.forEach(obj => list.push(obj.dualObject));

			let l = canDeleteLine(lp.x, lp.y, list);
			if (l != -1) {
				let line = myCanvas.primalDualObjects[l];

				myCanvas.iniX = lp.x;
				myCanvas.iniY = lp.y;
				myCanvas.someDrawableMoving = true;
				myCanvas.movingDrawableObject.buffer = lp.space;
				myCanvas.movingDrawableObject.object = line;

				myCanvas.primalDualObjects.splice(l, 1);
			}
		}
	}

	/**
	 * 
	 * @param {number} x 
	 * @param {number} y
	 * @description Handles the second point at line creation 
	 */
	static handleSecondPointLine(x, y) {
		let lp = getLocalPosition(x, y);

		if (lp.space != myCanvas.creatingLine.buffer) {
			alert('Wrong space');
			return;
		}

		let line = myCanvas.creatingLine.line;
		let l = new Line(line.start.x, line.start.y, lp.x, lp.y);
		l.expand();

		if (lp.space == 'primal') myCanvas.primalDualObjects.push(new Duality(l, undefined));
		else myCanvas.primalDualObjects.push(new Duality(undefined, l));

		myCanvas.creatingLine.value = false;
		myCanvas.creatingLine.buffer = null;
		myCanvas.creatingLine.line = null;
	}

	/**
	 * 
	 * @description Handles the drawing of the line when waiting for the second point
	 */
	static handleDrawCreatingLine() {
		if (myCanvas.creatingLine.value) {
			let line = myCanvas.creatingLine.line;
			let buffer = myCanvas.creatingLine.buffer == 'primal' ? myCanvas.primalBuffer : myCanvas.dualBuffer;
			let color = myCanvas.creatingLine.buffer == 'primal' ? 0 : 255;
			line.show(buffer, color);
		}
	}
}