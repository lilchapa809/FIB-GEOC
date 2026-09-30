class Halton {
	/**
	 * 
	 * @param {number} i interation
	 * @param {number} b base
	 * @returns {number}
	 * @description Applicates the Halton sequence with the interation i and base b
	 */
	static __generateCoordinate__(i, b) {
		let f = 1;
		let r = 0;

		while (i > 0) {
			f = f / b;
			r += f * (i % b);
			i = Math.trunc(i / b);
		}

		return r;
	}


	/**
	 * 
	 * @param {number} n 
	 * @param {number} base
	 * @returns {number[]}
	 * @description Generates n values of the Halton sequence with base base 
	 */
	static __generateSequence__(n, base) {
		let ret = [];
		for (let i = 1; i < n + 1; ++i) {
			ret.push(Halton.__generateCoordinate__(i, base));
		}

		return ret;
	}


	/**
	 * 
	 * @param {number} n 
	 * @param {number} base1 
	 * @param {number} base2 
	 * @param {number} scaleX 
	 * @param {number} scaleY 
	 * @returns {Object[]}
	 * @description Generatea n points where x is in base1 and y in base2 and then scalates the points
	 * by (scaleX, scaleY)
	 */
	static generateSequence(n, base1, base2, scaleX, scaleY) {
		if (scaleX === undefined) scaleX = myCanvas.WIDTH;
		if (scaleY === undefined) scaleY = myCanvas.HEIGHT;

		let _x = Halton.__generateSequence__(n, base1);
		let _y = Halton.__generateSequence__(n, base2);

		return _x.map((e, i) => {
			return {
				x: e * scaleX,
				y: _y[i] * scaleY
			}
		});
	}
}