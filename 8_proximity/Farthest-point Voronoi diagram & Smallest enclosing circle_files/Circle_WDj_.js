/**
 * 
 * @extends Drawable
 */
class Circle extends Drawable {
	/**
	 * 
	 * @param {number} dx x distance from the center (0, 0)
	 * @param {number} dy y distance from the center (0, 0)
	 * @param {number} r radius of the triangle
	 */
	constructor(dx, dy, r = 100, r2 = 10000) {
		super(new CircleView());

		this.dx = dx;
		this.dy = dy;
		this.r = r;
		this.r2 = r2;

		this.listPoints = this.computeAllPoints();
	}

	/**
	 * 
	 * @return {Point[]}
	 * @description Computes 36 the points of the circle
	 */
	computeAllPoints() {
		let l = [];
		for (let theta = 0; theta < 360; theta += 10) {
			let x = this.r * Math.sin(theta * Math.PI / 180) + this.dx;
			let y = this.r * Math.cos(theta * Math.PI / 180) + this.dy;
			l.push(new Point(x, y));
		}
		return l;
	}

	/**
	 * 
	 * @param {Buffer} buffer 
	 * @param {color} color 
	 * @param {boolean} lightning
	 * @description Calls the view handler of the Circle 
	 */
	show(buffer, color, lightning) {
		this.view.show(buffer, color, lightning, this);
	}

	/**
	 * 
	 * @param {Point} point
	 * @returns {boolean}
	 * @description Returns if the given point collides with the perimeter of the circle 
	 */
	listPointCollision(point) {
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
	 * @description Returns if the given coordinates are on the Circle 
	 */
	pointCollision(x, y) {
		return this.listPointCollision(new Point(x, y));
	}

	/**
	 * 
	 * @param {Drawable} p
	 * @returns {boolean}
	 * @description Returns if the given Drawable object is a point and collides with the Circle
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
	 * @description Moves the Circle a distance of (dx, dy)
	 */
	move(dx, dy) {
		this.dx += dx;
		this.dy += dy;
		this.listPoints = this.computeAllPoints();
	}

	/**
	 * 
	 * @constructor
	 * @param {Circle} other
	 * @returns {Circle}
	 * @description Is the constructor by copy of the Circle 
	 */
	static constructorByCopy(other) {
		return new Circle(other.dx, other.dy);
	}

	/**
	 * 
	 * @deprecated Use constructBy3PointsOptimized of utils instead
	 * @param {Point} a 
	 * @param {Point} b 
	 * @param {Point} c
	 * @returns {Circle}
	 * @description Creates a circle given 3 points
	 */
	static constructBy3Points(a, b, c) {
		const a_mid = new Point((a.x + b.x) / 2, (a.y + b.y) / 2);
		const b_mid = new Point((b.x + c.x) / 2, (b.y + c.y) / 2);
		const ab = new Line(a.x, a.y, b.x, b.y);
		const bc = new Line(b.x, b.y, c.x, c.y);
		let abp;
		if (Math.abs(1 / ab.m) == Infinity || isNaN(1 / ab.m)) {
			abp = Line.createLineFromMN(0, 0);
		} else {
			abp = Line.createLineFromMN(-1 / ab.m, 0, false);
		}

		let bcp;
		if (Math.abs(1 / bc.m) == Infinity || isNaN(1 / bc.m)) {
			bcp = Line.createLineFromMN(0, 0);
		} else {
			bcp = Line.createLineFromMN(-1 / bc.m, 0, false);
		}

		abp.move(a_mid.x, a_mid.y);
		bcp.move(b_mid.x, b_mid.y);

		const x = (bcp.n - abp.n) / (abp.m - bcp.m);
		const center = new Point(x, abp.m * x + abp.n);
		const r2 = Math.pow(a.x - center.x, 2) + Math.pow(a.y - center.y, 2);
		const r = Math.sqrt(r2);
		return new Circle(center.x, center.y, r, r2);
	}

	/**
	 * 
	 * @deprecated Use constructBy3PointsOptimized of utils instead
	 * @param {Point} a 
	 * @param {Point} b 
	 * @param {Point} c
	 * @returns {Circle}
	 * @description Optimized calculus of a circle by 3 points 
	 */
	static constructBy3PointsOptimized(a, b, c) {
		const abd = {
			i: b.x - a.x,
			j: b.y - a.y,
			k: 0
		};

		const bcd = {
			i: c.x - b.x,
			j: c.y - b.y,
			k: 0
		};

		const abd_p = {
			i: -abd.j,
			j: abd.i,
			k: 0
		}

		const bcd_p = {
			i: -bcd.j,
			j: bcd.i,
			k: 0
		}

		const a0 = {
			i: (a.x + b.x) / 2,
			j: (a.y + b.y) / 2,
			k: 1
		};

		const a1 = {
			i: a0.i + abd_p.i,
			j: a0.j + abd_p.j,
			k: 1
		};

		const b0 = {
			i: (c.x + b.x) / 2,
			j: (c.y + b.y) / 2,
			k: 1
		}

		const b1 = {
			i: b0.i + bcd_p.i,
			j: b0.j + bcd_p.j,
			k: 1
		};

		const la = cross3D(a0, a1);
		const lb = cross3D(b0, b1);
		const h_center = cross3D(la, lb);
		console.log(h_center);
		const center = new Point(h_center.i / h_center.k, h_center.j / h_center.k);
		const r2 = Math.pow(a.x - center.x, 2) + Math.pow(a.y - center.y, 2);
		const r = Math.sqrt(r2);
		const circle = new Circle(center.x, center.y, r, r2);
		return circle;
	}

	/**
	 * 
	 * @param {Point} a
	 * @param {Point} b
	 * @param {Point} c
	 * @returns {Circle | null}
	 * @description Creates a circle give 2 or 3 points
	 * @
	 */
	static constructByPoints(a, b, c = undefined) {
		/**
		 * CONSTRAINT: All 3 points must be different
		 */

		// 3 points are given
		// if (c != undefined) return this.constructBy3Points(a, b, c);
		// if (c != undefined) return this.constructBy3PointsOptimized(a, b, c);
		if (c != undefined) {
			const h_center = getCenterByPoints(a, b, c);
			const center = new Point(h_center.i / h_center.k, h_center.j / h_center.k);
			const r2 = Math.pow(a.x - center.x, 2) + Math.pow(a.y - center.y, 2);
			const r = Math.sqrt(r2);
			return new Circle(center.x, center.y, r, r2);
		}

		// 2 points are given
		if (b != undefined) {
			const p = new Point((a.x + b.x) / 2, (a.y + b.y) / 2);
			const r2 = Math.pow(a.x - p.x, 2) + Math.pow(a.y - p.y, 2);
			const r = Math.sqrt(r2);
			return new Circle(p.x, p.y, r, r2);
		}

		// console.log(a, b, c);
		// Only 1 point is given
		return null;
	}
}