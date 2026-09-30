/**
 * 
 * @extends DrawableView
 */
class CircleView extends DrawableView {
	/**
		 * 
		 * @param {Buffer} buffer Buffer where the objects are going to be drawn
		 * @param {color} color Color of the points to be drawn 
		 * @param {MinimumSpanningCircle} msc The Minimum Spanning Circle object
		 * @description Draws points and lines to the buffer 
		 */
	show(buffer, color, circle) {
		if (SEMchecked()) {
			buffer.noFill();
			buffer.stroke(color);
			buffer.strokeWeight(5);
			buffer.circle(circle.dx, circle.dy, Math.sqrt(circle.r2) * 2);
			buffer.strokeWeight(1);
		}

		if (SEMCchecked()) {
			let p = new Point(circle.dx, circle.dy);
			p.show(buffer, color, false);
		}
	}
}