/**
 * 
 * @extends DrawableView
 */
class ParabolaView extends DrawableView {
	constructor() {
		super();
	}

	/**
	 * 
	 * @param {Buffer} buffer Buffer where the Parabola is going to be drawn
	 * @param {color} color Color of the Parabola to be drawn 
	 * @param {boolean} lightning If the Parabola needs lightning 
	 * @param {Parabola} parabola The Parabola to be drawn
	 * @description Draws the given Parabola to the buffer 
	 */
	show(buffer, color, lightning, parabola) {
		buffer.noFill();
		buffer.stroke(0, 0, 255)
		if (!lightning) buffer.stroke(color);
		buffer.beginShape();
		parabola.listPoints.forEach(obj => {
			buffer.vertex(obj.x, obj.y);
		});
		buffer.endShape();
	}
}