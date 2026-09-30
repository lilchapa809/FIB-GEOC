class ConvexHullView {
	/**
	 * 
	 * @param {Buffer} buffer Buffer where the objects are going to be drawn
	 * @param {color} color Color of the lines to be drawn 
	 * @param {ConvexHull} convexHull The ConvexHull object
	 * @description Draws lines to the buffer 
	 */
	static showLines(buffer, color, convexHull) {
		for (let line of convexHull.lines) {
			line.show(buffer, color, false);
		}
	}

	/**
	 * 
	 * @param {Buffer} buffer Buffer where the objects are going to be drawn
	 * @param {color} color Color of the points to be drawn 
	 * @param {ConvexHull} convexHull The ConvexHull object
	 * @description Draws points  to the buffer 
	 */
	static showPoints(buffer, color, convexHull) {
		for (let i = 0; i < convexHull.points.length; ++i) {
			if (!convexHull.algorithm.DivideAndConquer || !DivideAndConquer.state.divided) {
				convexHull.points[i].show(buffer, color, false);
			}
			if (convexHull.drawIndexes) {
				let x = convexHull.points[i].x + 10;
				let y = convexHull.points[i].y - 10;
				buffer.fill(color);
				buffer.textSize(10);
				buffer.text(`${i + 1}`, x, y);
			}
		}
	}

	/**
	 * 
	 * @param {Buffer} buffer Buffer where the objects are going to be drawn
	 * @param {color} color Color of the points and lines to be drawn 
	 * @param {ConvexHull} convexHull The ConvexHull object
	 * @description Draws points and lines to the buffer 
	 */
	static showPointsLines(buffer, color, convexHull) {
		ConvexHullView.showLines(buffer, color, convexHull);
		ConvexHullView.showPoints(buffer, color, convexHull);
	}

	/**
	 * 
	 * @param {Buffer} buffer Buffer where the objects are going to be drawn
	 * @param {color} color Color of the points and lines to be drawn 
	 * @param {ConvexHull} convexHull The ConvexHull object
	 * @description Draws points and lines to the buffer 
	 */
	show(buffer, color, convexHull) {
		if (convexHull.algorithm == Graham && convexHull.drawIndexes) {
			GrahamView.show(buffer, color, convexHull);
		} else if (convexHull.algorithm == Incremental && Incremental.state.running) {
			IncrementalView.show(buffer, color, convexHull);
		} else if (convexHull.algorithm == DivideAndConquer && DivideAndConquer.state.divided) {
			DivideAndConquerView.show(buffer);
		} else {
			ConvexHullView.showPointsLines(buffer, color, convexHull);
		}
	}
}