class GrahamView {
	/**
	 * 
	 * @param {Buffer} buffer Buffer where the objects are going to be drawn
	 * @param {color} color
	 * @param {ConvexHull} convexHull The ConvexHull object
	 * @description Draws points and lines to the buffer at the step-by-step visualization
	 */
	static show(buffer, color, convexHull) {
		for (let line of Graham.state.guidelines) {
			line.show(buffer, myCanvas.buffer.color(255, 165, 0, 150), false);
		}

		ConvexHullView.showLines(buffer, color, convexHull);

		for (let line of convexHull.lines) {
			line.show(buffer, color, false);
		}

		for (let line of Graham.state.deleted_lines) {
			line.show(buffer, 'gray', false);
		}

		ConvexHullView.showPoints(buffer, color, convexHull);

		for (let p of Graham.state.deleted_points) {
			p.show(buffer, 'gray', false);
		}

		let pi = Graham.state.pi;
		let p = Graham.state.p;
		let pp = Graham.state.pp;

		buffer.textSize(10);
		try {
			pi.show(buffer, 'red', false);
			buffer.text('pi', pi.x - 10, pi.y - 10);
		} catch (e) { }
		try {
			p.show(buffer, (Graham.state.to_delete_p) ? 'gray' : 'green', false);
			buffer.text('p', p.x - 10, p.y - 10);
		} catch (e) { }
		try {
			pp.show(buffer, 'blue', false);
			buffer.text('pp', pp.x - 10, pp.y - 10);
		} catch (e) { }
	}
}