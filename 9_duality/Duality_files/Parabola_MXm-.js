/**
 * 
 * @extends Drawable
 */
class Parabola extends Drawable {
	/**
	 * 
	 * @param {number} a x^2 coeficient
	 * @param {number} b x coeficient
	 * @param {number} c independet coeficient
	 * @param {number} dx x distance from (0, 0)
	 * @param {number} dy y distance from (0, 0)
	 */
	constructor(a, b, c, dx, dy) {
		super(new ParabolaView());

		this.a = a;
		this.b = b;
		this.c = c;
		this.dx = dx;
		this.dy = dy;
		this.listPoints = this.computeAllPoints();
	}

	/**
	 * 
	 * @returns {Point[]}
	 * @description Computes points that lie on the parabola a * x^2 + b * x + c = 0
	 */
	computeAllPoints() {
		let l = [];
		let x = -myCanvas.width / 2;
		while (x < myCanvas.width / 2) {
			let y = this.calcParabola(x);
			l.push(new Point(x, y));
			x += 10;
		}
		return l;
	}

	/**
	 * 
	 * @param {number} x
	 * @returns {number}
	 * @description Computes the point (x, y) that lie on the parabola
	 */
	calcParabola(x) {
		x -= this.dx
		return (Math.pow(x, 2) * this.a + this.b * x) / myCanvas.scale + this.c + this.dy;
	}

	/**
	 * 
	 * @param {Buffer} buffer 
	 * @param {color} color 
	 * @param {boolean} lightning
	 * @description Calls the view handler of the Parabola 
	 */
	show(buffer, color, lightning) {
		this.view.show(buffer, color, lightning, this);
	}

	/**
	 * 
	 * @param {Point} point
	 * @returns {boolean}
	 * @description Returns if the given point lies on the parabola 
	 */
	listPointCollision(point) {
		let ret = false;
		for (let p of this.listPoints) {
			if (p.collides(point)) return true;
		}
		return false;
	}

	/**
	 * 
	 * @param {number} x 
	 * @param {number} y
	 * @returns {boolean}
	 * @description Returns if the point (x, y) lies on the parabola 
	 */
	pointCollision(x, y) {
		return this.listPointCollision(new Point(x, y));
	}

	/**
	 * 
	 * @param {Drawable} p
	 * @returns {boolean}
	 * @description Returns if the given Drawable is a point and lies on the parabola
	 * Otherwise returns false 
	 */
	collides(p) {
		if (p instanceof Point) return this.pointCollision(p.x, p.y);
		return false;
	}

	/**
	 * 
	 * @param {number} dx Movement of x 
	 * @param {number} dy Movement of y
	 * @description Moves the parabola by (dx, dy) 
	 */
	move(dx, dy) {
		this.dx += dx;
		this.dy += dy;
		this.listPoints = this.computeAllPoints();
	}

	/**
	 * 
	 * @constructor
	 * @param {Parabola} other
	 * @returns {Parabola}
	 * @description Constructor by copy of the parabola 
	 */
	static constructorByCopy(other) {
		return new Parabola(other.a, other.b, other.c, other.dx, other.dy);
	}
}