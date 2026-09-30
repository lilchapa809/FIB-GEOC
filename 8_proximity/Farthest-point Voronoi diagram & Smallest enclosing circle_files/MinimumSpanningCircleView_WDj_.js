class MinimumSpanningCircleView {
	/**
	 * 
	 * @param {Buffer} buffer Buffer where the objects are going to be drawn
	 * @param {color} color Color of the points to be drawn 
	 * @param {MinimumSpanningCircle} msc The Minimum Spanning Circle object
	 * @description Draws points and lines to the buffer 
	 */
	show(buffer, color, msc) {
		if (CHchecked()) {
			for (let l of msc.convexHull.lines) {
				l.view = new DashedLineView();
				l.show(buffer, buffer.color(192, 192, 192), false);
			}
		}

		if (msc.showDebugCircles) {
			for (let c of msc.debugCircles) {
				c.show(buffer, 'blue', c);
			}
		}

		if (msc.circle) msc.circle.show(buffer, buffer.color(144, 238, 144), msc.circle);


		if (FVDchecked()) {
			const fvdColor = 'red';
			for (let edge of msc.farthestVoronoi.DCEL.edges) {
				edge.show(buffer, fvdColor, false);
			}
		}

		for (let p of msc.points) {
			p.show(buffer, color, false);
		}
	}
}