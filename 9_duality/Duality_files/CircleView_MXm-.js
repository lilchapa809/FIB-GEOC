/**
 * 
 * @extends DrawableView
 */
class CircleView extends DrawableView {
	constructor() {
		super();
	}

	/**
	 * 
	 * @param {Buffer} buffer Buffer where the Circle is going to be drawn
	 * @param {color} color Color of the circle to be drawn 
	 * @param {boolean} lightning If the circle needs lightning 
	 * @param {Circle} circle The Circle to be drawn
	 * @description Draws the given Circle to the buffer 
	 */
	show(buffer, color, lightning, circle) {
		buffer.noFill();
		buffer.stroke(0, 0, 255)
		if (!lightning) buffer.stroke(color);
		buffer.beginShape();
		circle.listPoints.forEach(obj => {
			buffer.vertex(obj.x, obj.y);
		});
		buffer.vertex(circle.listPoints[0].x, circle.listPoints[0].y);
		buffer.endShape();
	}
}