class DashedLineView extends LineView {
	/**
	 * 
	 * @param {number[]} dashing 
	 */
	constructor(dashing = [5, 15]) {
		super();

		this.dashing = dashing;
	}

	/**
	 * 
	 * @param {Buffer} buffer Buffer where the Line is going to be drawn
	 * @param {color} color Color of the line to be drawn 
	 * @param {boolean} lightning If the line needs lightning 
	 * @param {Line} line The Line to be drawn
	 * @description Sets the dashed context to the line and calls LineView.show
	 */
	show(buffer, color, lightning, line) {
		buffer.drawingContext.setLineDash(this.dashing);
		super.show(buffer, color, lightning, line);
		buffer.drawingContext.setLineDash([]);
	}
}