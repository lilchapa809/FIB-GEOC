class ParabolaDuality {
	/**
	 * @param {Duality} object
	 * @returns {Duality}
	 * @description Computes the Parabola duality of the given object and it returns it
	 */
	static compute(object) {
		try {
			if (object instanceof Point) {
				return Line.createLineFromMN(object.x / myCanvas.scale, -object.y);
			} else {
				if (isNaN(object.m) || object.m === Infinity) {
					let l = [];
					for (let obj of object.listPoints) {
						l.push(this.compute(obj));
					}
					return l;
				}
				return new Point(object.m * myCanvas.scale, -object.n);
			}
		} catch (e) { }
	}
}