/**
 * 
 * @extends Drawable
 */
class Point extends Drawable {
	/**
	 * 
	 * @param {number} x x coordinate 
	 * @param {number} y y coordinate 
	 * @param {number} r radius of the point 
	 */
	constructor(x, y, r = 5) {
		super(new PointView());

		this.x = x;
		this.y = y;
		this.radius = r;
	}

	/**
	 * 
	 * @param {Buffer} buffer 
	 * @param {color} color 
	 * @param {boolean} lightning
	 * @description Calls the view handler of Point 
	 */
	show(buffer, color, lightning) {
		this.view.show(buffer, color, lightning, this);
	}

	/**
	 * 
	 * @param {Drawable} other
	 * @returns {boolean}
	 * @description Returns if the given Drawable is a Point and if it collides
	 * Otherwise returns false 
	 */
	collides(other) {
		if (other instanceof Point) {
			let d = dist(this.x, this.y, other.x, other.y);
			if (d < this.radius + other.radius) return true;
			return false;
		}
		return false;
	}

	/**
	 * 
	 * @param {number} dx Movement of x 
	 * @param {number} dy Movement of y
	 * @description Moves the point by (dx, dy)
	 */
	move(dx, dy) {
		this.x += dx;
		this.y += dy;
	}

	/**
	 * 
	 * @param {Point} other
	 * @returns {boolean}
	 * @description Returns if the given point is equals 
	 */
	equals(other) {
		return this.x == other.x && this.y == other.y;
	}
}