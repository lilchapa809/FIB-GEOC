/**
 * 
 * @extends DrawableView
 */
class LineView extends DrawableView {
	constructor() {
		super();
	}

	/**
	 * 
	 * @param {Buffer} buffer Buffer where the Line is going to be drawn
	 * @param {color} color Color of the line to be drawn 
	 * @param {boolean} lightning If the line needs lightning 
	 * @param {Line} line The Line to be drawn
	 * @description Draws the given Line to the buffer 
	 */
	show(buffer, color, lightning, line) {
		//line.start.show(buffer, color, lightning);
		let p = line.end;
		if (line.end == null) {
			let lp = getLocalPosition(mouseX, mouseY);
			p = new Point(lp.x, lp.y, Line.radius);
		}
		//p.show(buffer, color, lightning);
		if (!lightning) buffer.stroke(color);
		else buffer.stroke(0, 0, 255);
		buffer.strokeWeight(Line.radius);
		buffer.line(line.start.x, line.start.y, p.x, p.y);
	}
}