class Drawable {
	/**
	 * 
	 * @param {DrawableView} view - Which view is called at show 
	 */
	constructor(view) {
		this.view = view;
	}

	/**
	 * 
	 * @param {Buffer} buffer 
	 * @param {color} color 
	 * @param {boolean} lightning
	 * @description Calls the view handler 
	 */
	show(buffer, color, lightning) {
		throw new Error('Not implemented');
	}

	/**
	 * 
	 * @param {Drawable} other
	 * @return {boolean}
	 * @description Returs if two objects collide 
	 */
	collides(other) {
		throw new Error('Not implemented');
	}

	/**
	 * 
	 * @param {number} dx Movement of x 
	 * @param {number} dy Movement of y
	 * @description Updates the x and y coordinates
	 */
	move(dx, dy) {
		throw new Error('Not implemented');
	}

	/**
	 * 
	 * @description Expands the object to simulate infinity (used in Line) 
	 */
	expand() {
		throw new Error('Not implemented');
	}

	/**
	 * 
	 * @param {number} n Value
	 * @param {number} nmin Min value
	 * @param {number} nmax Max value
	 * @returns {boolean}
	 * @description Returns if a value is within the boundaries 
	 */
	static valid(n, nmin, nmax) {
		return n >= nmin && n <= nmax;
	}

	/**
	 * 
	 * @static Types of Drawable objects
	 */
	static types = ['Point', 'Line', 'Parabola', 'Circle'];
}