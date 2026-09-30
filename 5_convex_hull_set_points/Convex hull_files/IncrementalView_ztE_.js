class IncrementalView {
	/**
	 * 
	 * @param {Buffer} buffer Buffer where the objects are going to be drawn
	 * @param {color} color Color of the points to be drawn 
	 * @param {ConvexHull} convexHull The ConvexHull object
	 * @description Draws points and lines to the buffer at the step-by-step visualization
	 */
	static show(buffer, color, convexHull) {
		if (Incremental.state.pi < convexHull.points.length) {
			const p = convexHull.points[Incremental.state.pi];
			const t = convexHull.points[Incremental.state.testing];
			const upper = convexHull.points[Incremental.state.upper];
			const lower = convexHull.points[Incremental.state.lower];
			let upperLine = new Line(p.x, p.y, upper.x, upper.y, new DashedLineView());
			let lowerLine = new Line(p.x, p.y, lower.x, lower.y, new DashedLineView());

			lowerLine.show(buffer, myCanvas.buffer.color(0, 255, 127), false);
			upperLine.show(buffer, myCanvas.buffer.color(255, 165, 0), false);

			ConvexHullView.showPointsLines(buffer, color, convexHull);

			p.show(buffer, 'red', false);

			if (Incremental.state.testing < Incremental.state.pi && convexHull.step != 4) {
				let color = myCanvas.buffer.color(255, 165, 0);
				if (convexHull.step != 2) color = myCanvas.buffer.color(0, 255, 127);
				t.show(buffer, color, false);
			}

		} else {
			ConvexHullView.showPointsLines(buffer, color, convexHull);
		}
	}
}