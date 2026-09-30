/**
 * 
 * @extends Drawable
 */
class Line extends Drawable {
	/**
	 * 
	 * @param {number} x_start 
	 * @param {number} y_start 
	 * @param {undefined|number} x_end 
	 * @param {undefined|number} y_end
	 * @param {LineView|Object} view
	 */
	constructor(x_start, y_start, x_end = null, y_end = null, view = new LineView()) {
		super(view);

		this.start = new Point(x_start, y_start, Line.radius);

		this.end = null;
		this.m = null;
		this.n = null;

		if (x_end != null) {
			this.end = new Point(x_end, y_end, Line.radius);
			this.m = (this.end.y - this.start.y) / (this.end.x - this.start.x);
			this.n = this.start.y - this.m * this.start.x;
		}

		this.expanded = false;
		this.listPoints = [];
	}

	/**
	 * 
	 * @param {Line} other
	 * @returns {boolean}
	 * @description Returns if two lines are equal or not 
	 */
	equals(other) {
		return this.m == other.m && this.n == other.n;
	}

	/**
	 * 
	 * @param {Point} point
	 * @returns {boolean}
	 * @description Returns if the given point collides with the line 
	 */
	listPointCollision(point) {
		for (let p of this.listPoints) {
			if (p.collides(point)) return true;
		}
		return false;
	}

	/**
	 * 
	 * @param {Point} q
	 * @returns {boolean}
	 * @description Returns if the given point is on the segment y = m * x + n 
	 */
	onSegment(q) {
		let p = this.start;
		let r = this.end;
		return q.x <= max(p.x, r.x) && q.x >= min(p.x, r.x) && q.y <= max(p.y, r.y) && q.y >= min(p.y, r.y);
	}

	/**
	 * 
	 * @param {number} x 
	 * @param {number} y
	 * @returns {boolean}
	 * @description Returns if the point (x, y) collides with the line 
	 */
	pointCollision(x, y) {
		if (this.expanded) {
			if (isNaN(this.m)) {
				return this.listPointCollision(new Point(x, y));
			} else {
				let yp = this.m * x + this.n;
				let delta = Line.radius * 5;
				return Drawable.valid(y, yp - delta, yp + delta) || this.listPointCollision(new Point(x, y));
			}
		} else {
			return this.onSegment(new Point(x, y));
		}
	}

	/**
	 * 
	 * @param {Drawable} p
	 * @returns {boolean}
	 * @description Returns if the given drawable is a point and collides with the line
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
	 * @description Moves the line by (dx, dy)
	 */
	move(dx, dy) {
		this.start.x += dx;
		this.end.x += dx;

		this.start.y += dy;
		this.end.y += dy;

		this.m = (this.end.y - this.start.y) / (this.end.x - this.start.x);
		this.n = this.start.y - this.m * this.start.x;
	}

	/**
	 * 
	 * @description Expands the line to simulate infinity
	 */
	expand() {
		this.expanded = true;

		let xmin = myCanvas.xmin;
		let xmax = myCanvas.xmax;
		let ymin = myCanvas.ymin;
		let ymax = myCanvas.ymax;

		if (this.start.x == this.end.x) {
			this.start.y = ymin;
			this.end.y = ymax;

			this.listPoints = [];

			for (let i = ymin; i <= ymax; i += 10) {
				this.listPoints.push(new Point(this.start.x, i));
			}

			return;
		}

		if (this.start.y == this.end.y) {
			this.start.x = xmin;
			this.end.x = xmax;
			return;
		}

		let y_for_xmin = this.start.y + (this.end.y - this.start.y) * (xmin - this.start.x) / (this.end.x - this.start.x);
		let y_for_xmax = this.start.y + (this.end.y - this.start.y) * (xmax - this.start.x) / (this.end.x - this.start.x);
		let x_for_ymin = this.start.x + (this.end.x - this.start.x) * (ymin - this.start.y) / (this.end.y - this.start.y);
		let x_for_ymax = this.start.x + (this.end.x - this.start.x) * (ymax - this.start.y) / (this.end.y - this.start.y);

		let p = [];

		if (Drawable.valid(y_for_xmin, ymin, ymax)) {
			p.push(new Point(xmin, y_for_xmin, Line.radius));
		}
		if (Drawable.valid(y_for_xmax, ymin, ymax)) {
			p.push(new Point(xmax, y_for_xmax, Line.radius));
		}
		if (Drawable.valid(x_for_ymin, xmin, xmax)) {
			p.push(new Point(x_for_ymin, ymin, Line.radius));
		}
		if (Drawable.valid(x_for_ymax, xmin, xmax)) {
			p.push(new Point(x_for_ymax, ymax, Line.radius));
		}

		if (p.length < 2) throw new Error('error expanding line');

		this.start = p[0];
		this.end = p[1];
		this.listPoints = [];

		let n = 50;
		let dx = (this.end.x - this.start.x) / n;
		let dy = (this.end.y - this.start.y) / n;

		for (let i = 0; i < n; ++i) {
			let x = this.start.x + dx * i;
			let y = this.start.y + dy * i;
			this.listPoints.push(new Point(x, y));
		}
	}

	/**
	 * 
	 * @param {number} x 
	 * @param {number} y
	 * @description Sets the end point of the line 
	 */
	setEnd(x, y) {
		this.end = new Point(x, y, Line.radius);
	}

	/**
	 * 
	 * @param {Buffer} buffer 
	 * @param {color} color 
	 * @param {boolean} lightning
	 * @description Calls the view handler of the line 
	 */
	show(buffer, color, lightning) {
		this.view.show(buffer, color, lightning, this);
	}

	/**
	 * 
	 * @param {number} m slope
	 * @param {number} n y intercept
	 * @param {boolean} expand if line needs to be expanded
	 * @returns {Line}
	 * @description Creates a line with the given m and n values with the formula y = m * x + n
	 */
	static createLineFromMN(m, n, expand = true) {
		if (m != 0) {
			let sx = 0;
			let ex = 100;
			let sy = m * sx + n;
			let ey = m * ex + n;
			let l = new Line(sx, sy, ex, ey);
			if (expand) l.expand();
			return l;
		} else {
			let l = new Line(0, 0, 0, 100);
			if (expand) l.expand();
			return l;
		}
	}

	/**
	 * 
	 * @global Thickness of the line
	 */
	static radius = 2;
}