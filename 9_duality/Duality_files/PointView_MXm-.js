/**
 * 
 * @extends DrawableView
 */
class PointView extends DrawableView {
	constructor() {
		super();
	}

	/**
	 * 
	 * @param {Buffer} buffer Buffer where the Point is going to be drawn
	 * @param {color} color Color of the Point to be drawn 
	 * @param {boolean} lightning If the Point needs lightning 
	 * @param {Point} point The Point to be drawn
	 * @description Draws the given Point to the buffer 
	 */
	show(buffer, color, lightning, point) {
		if (!lightning) buffer.fill(color);
		else buffer.fill(0, 0, 255);
		buffer.noStroke();
		buffer.circle(point.x, point.y, point.radius * 2);
	}
}