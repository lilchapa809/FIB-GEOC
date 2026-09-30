/**
 * 
 * @extends Handler
 */
class PointHandler extends Handler {
	/**
	 * 
	 * @param {number} x 
	 * @param {number} y
	 * @description Creates a point at (x, y) 
	 */
	static create(x, y) {
		let lp = getLocalPosition(x, y);

		let list = [];
		if (lp.space == 'primal') myCanvas.primalDualObjects.forEach(obj => list.push(obj.primalObject));
		else myCanvas.primalDualObjects.forEach(obj => list.push(obj.dualObject));

		if (canCreatePoint(lp.x, lp.y, list)) {
			if (getOptionSelected('duals') == 'Circle' && lp.x == 0 && lp.y == 0) {
				alert('Circle duality has no point at (0, 0)');
			} else {
				if (lp.space == 'primal') myCanvas.primalDualObjects.push(new Duality(new Point(lp.x, lp.y), undefined));
				else myCanvas.primalDualObjects.push(new Duality(undefined, new Point(lp.x, lp.y)));
			}
		}
	}

	/**
	 * 
	 * @param {number} x 
	 * @param {number} y
	 * @description Deletes the point at (x, y) 
	 */
	static delete(x, y) {
		let lp = getLocalPosition(x, y);

		let list = [];
		if (lp.space == 'primal') myCanvas.primalDualObjects.forEach(obj => list.push(obj.primalObject));
		else myCanvas.primalDualObjects.forEach(obj => list.push(obj.dualObject));

		let p = canDeletePoint(lp.x, lp.y, list);
		if (p != -1) {
			myCanvas.primalDualObjects.splice(p, 1);
		}
	}

	/**
	 * 
	 * @param {number} x 
	 * @param {number} y
	 * @description Moves the point at (x, y) or to (x, y) 
	 */
	static move(x, y) {
		let lp = getLocalPosition(x, y);

		let list = [];
		if (lp.space == 'primal') myCanvas.primalDualObjects.forEach(obj => list.push(obj.primalObject));
		else myCanvas.primalDualObjects.forEach(obj => list.push(obj.dualObject));


		if (myCanvas.someDrawableMoving) {
			if (lp.space != myCanvas.movingDrawableObject.buffer) {
				alert('Mouse is not it the correct space');
			} else if (canCreatePoint(lp.x, lp.y, list)) {
				myCanvas.primalDualObjects.push(myCanvas.movingDrawableObject.object);
				myCanvas.someDrawableMoving = false;
				myCanvas.movingDrawableObject.buffer = null;
				myCanvas.movingDrawableObject.object = null;
				myCanvas.iniX = -1;
				myCanvas.iniY = -1;
			}
		} else {
			let p = canDeletePoint(lp.x, lp.y, list);
			if (p != -1) {
				myCanvas.primalDualObjects.splice(p, 1);

				myCanvas.someDrawableMoving = true;
				myCanvas.movingDrawableObject.buffer = lp.space;

				if (lp.space == 'primal') myCanvas.movingDrawableObject.object = new Duality(new Point(lp.x, lp.y), undefined);
				else myCanvas.movingDrawableObject.object = new Duality(undefined, new Point(lp.x, lp.y));

				myCanvas.iniX = lp.x;
				myCanvas.iniY = lp.y;
			}
		}
	}
}