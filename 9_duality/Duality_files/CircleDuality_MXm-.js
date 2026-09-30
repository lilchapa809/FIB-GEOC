class CircleDuality {
	/**
	 * @param {Duality} object
	 * @returns {Duality}
	 * @description Computes the Circle duality of the given object and it returns it
	 */
	static compute(object) {
		try {
			if (object instanceof Point) {
				if (object.y == 0) {
					const l = new Line(Math.pow(myCanvas.scale, 2) / object.x, 0, Math.pow(myCanvas.scale, 2) / object.x, 0);
					l.expand();
					return l;
				} else {
					return Line.createLineFromMN(- object.x / object.y, Math.pow(myCanvas.scale, 2) / object.y);
				}
			} else if (object instanceof Line) {
				if (isNaN(object.m) || Math.abs(object.m) === Infinity) {
					return new Point(Math.pow(myCanvas.scale, 2) / object.start.x, 0);
				}

				const b = 1 / object.n;
				const a = - object.m / object.n;
				return new Point(a * Math.pow(myCanvas.scale, 2), b * Math.pow(myCanvas.scale, 2));
			} else {
				let l = [];
				for (let obj of object.listPoints) {
					l.push(this.compute(obj));
				}
				return l;
			}
		} catch (e) { }
	}
}