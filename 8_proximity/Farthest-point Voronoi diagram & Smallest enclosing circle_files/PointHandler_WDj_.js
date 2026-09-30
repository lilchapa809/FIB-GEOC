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
		if (canCreatePoint(x, y, myCanvas.MSC.points)) {
			myCanvas.MSC.points.push(new Point(x, y));

			if (myCanvas.MSC.convexHull.ch.length != 0) myCanvas.MSC.compute();
		}
	}

	/**
	 * 
	 * @param {number} x 
	 * @param {number} y
	 * @description Deletes the point at (x, y) 
	 */
	static delete(x, y) {
		if (myCanvas.MSC.points.length == 1) {
			myCanvas.MSC.cleanAll();
			return;
		}

		let p = canDeletePoint(x, y, myCanvas.MSC.points);
		if (p != -1) {
			myCanvas.MSC.points.splice(p, 1);
		}

		myCanvas.MSC.compute();
	}

	/**
	 * 
	 * @param {number} x 
	 * @param {number} y
	 * @description Moves the point at (x, y) or to (x, y) 
	 */
	static move(x, y) {
		if (myCanvas.someDrawableMoving) {
			if (canCreatePoint(x, y, myCanvas.MSC.points)) {
				myCanvas.MSC.pushPoint(myCanvas.movingDrawableObject);
				myCanvas.someDrawableMoving = false;
				myCanvas.movingDrawableObject = null;
				myCanvas.iniX = -1;
				myCanvas.iniY = -1;
			}
		} else {
			let p = canDeletePoint(x, y, myCanvas.MSC.points);
			if (p != -1) {
				myCanvas.MSC.points.splice(p, 1);
				myCanvas.someDrawableMoving = true;
				myCanvas.movingDrawableObject = new Point(x, y);

				myCanvas.iniX = x;
				myCanvas.iniY = y;
			}
		}

		myCanvas.MSC.compute();
	}
}