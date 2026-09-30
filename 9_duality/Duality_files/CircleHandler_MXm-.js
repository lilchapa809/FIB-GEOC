/**
 * 
 * @extends Handler
 */
class CircleHandler extends Handler {
	/**
	 *
	 * @param {number} x
	 * @param {number} y
	 * @description Creates a Circle with center (x, y) 
	 */
	static create(x, y) {
		let lp = getLocalPosition(x, y);

		if (lp.space == 'primal') myCanvas.primalDualObjects.push(new Duality(new Circle(lp.x, lp.y), undefined));
		else myCanvas.primalDualObjects.push(new Duality(undefined, new Circle(lp.x, lp.y)));
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

		let l = canDeleteCircle(lp.x, lp.y, list);
		if (l != -1) {
			myCanvas.primalDualObjects.splice(l, 1);
		}
	}

	/**
	 * 
	 * @param {number} x 
	 * @param {number} y
	 * @description Moves the circle at (x, y) or to (x, y) 
	 */
	static move(x, y) {
		let lp = getLocalPosition(x, y);

		if (myCanvas.someDrawableMoving) {
			if (lp.space != myCanvas.movingDrawableObject.buffer) {
				alert('Mouse is not in the correct space');
			} else {
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

			let p = canDeleteCircle(lp.x, lp.y, list);
			if (p != -1) {
				let pdo = myCanvas.primalDualObjects[p];
				myCanvas.primalDualObjects.splice(p, 1);

				myCanvas.someDrawableMoving = true;
				myCanvas.movingDrawableObject.buffer = lp.space;

				if (lp.space == 'primal') myCanvas.movingDrawableObject.object = new Duality(Circle.constructorByCopy(pdo.primalObject), undefined);
				else myCanvas.movingDrawableObject.object = new Duality(undefined, Circle.constructorByCopy(pdo.dualObject));

				myCanvas.iniX = lp.x;
				myCanvas.iniY = lp.y;
			}
		}
	}
}