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
		if (canCreatePoint(x, y, myCanvas.convexhull.points)) {
			myCanvas.convexhull.pushPoint(new Point(x, y));

			if (myCanvas.convexhull.ch.length != 0) myCanvas.convexhull.computeCompleteAlgorithm();
		}
	}

	/**
	 * 
	 * @param {number} x 
	 * @param {number} y
	 * @description Deletes the point at (x, y) 
	 */
	static delete(x, y) {
		if (myCanvas.convexhull.points.length == 1) {
			myCanvas.convexhull.cleanAll();
			return;
		}
		let p = canDeletePoint(x, y, myCanvas.convexhull.points);
		if (p != -1) {
			let recalc = false;
			for (let q of myCanvas.convexhull.ch) {
				if (q.equals(myCanvas.convexhull.points[p])) {
					recalc = true;
					break;
				}
			}

			myCanvas.convexhull.points.splice(p, 1);

			if (recalc) myCanvas.convexhull.computeCompleteAlgorithm();
		}
	}

	/**
	 * 
	 * @param {number} x 
	 * @param {number} y
	 * @description Moves the point at (x, y) or to (x, y) 
	 */
	static move(x, y) {
		if (myCanvas.someDrawableMoving) {
			if (canCreatePoint(x, y, myCanvas.convexhull.points)) {
				myCanvas.convexhull.pushPoint(myCanvas.movingDrawableObject);
				myCanvas.someDrawableMoving = false;
				myCanvas.movingDrawableObject = null;
				myCanvas.iniX = -1;
				myCanvas.iniY = -1;
			}
		} else {
			let p = canDeletePoint(x, y, myCanvas.convexhull.points);
			if (p != -1) {
				myCanvas.convexhull.points.splice(p, 1);
				myCanvas.someDrawableMoving = true;
				myCanvas.movingDrawableObject = new Point(x, y);

				myCanvas.iniX = x;
				myCanvas.iniY = y;
			}
		}

		myCanvas.convexhull.computeCompleteAlgorithm();
	}
}