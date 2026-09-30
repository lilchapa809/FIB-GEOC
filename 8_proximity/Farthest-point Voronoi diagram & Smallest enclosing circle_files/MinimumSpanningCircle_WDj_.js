class MinimumSpanningCircle {
	constructor() {
		this.view = new MinimumSpanningCircleView();

		this.convexHull = {
			ch: [],
			lines: []
		};

		this.farthestVoronoi = {
			DCEL: new DCEL()
		};

		this.points = [];

		this.circle = undefined;

		this.showDebugCircles = false;
		this.debugCircles = [];
	}

	/**
	 * 
	 * @description Clears the Farthest Voronoi Diagram
	 */
	cleanFV() {
		this.farthestVoronoi = {
			DCEL: new DCEL()
		};
	}

	/**
	 * 
	 * @description Clears the Smallest Enclosing Circle
	 */
	cleanMSC() {
		this.circle = undefined;
		this.debugCircles = [];
	}

	/**
	 * 
	 * @description Clears the Convex Hull
	 */
	cleanCH() {
		this.convexHull = {
			ch: [],
			lines: []
		};
	}

	/**
	 * 
	 * @description Clears the Smallest Enclosing Circle and the Convex Hull
	 */
	clean() {
		this.cleanCH();
		this.cleanMSC();
		this.cleanFV();
	}


	/**
	 * 
	 * @description Clears all Smallest Enclosing Circle
	 */
	cleanAll() {
		this.points = [];
		this.clean();
	}

	/**
	 * 
	 * @param {Point} point
	 * @description Pushes a point into the array of points
	 */
	pushPoint(point) {
		this.points.push(point);
	}


	/**
	 * 
	 * @description Zooms in all the points and recompute everything
	 */
	zoom_in() {
		const canvas_center = new Point(myCanvas.WIDTH / 2, myCanvas.HEIGHT / 2);

		for (let i = 0; i < this.points.length; ++i) {
			this.points[i].move(-canvas_center.x, -canvas_center.y);
			this.points[i].x /= MinimumSpanningCircle.ZOOM_CONSTANT;
			this.points[i].y /= MinimumSpanningCircle.ZOOM_CONSTANT;
			this.points[i].move(canvas_center.x, canvas_center.y);
		}

		if (this.convexHull.ch.length != 0) this.compute();
	}

	/**
	 *
	 * @description Zooms out all the points and recompute everything
	 */
	zoom_out() {
		const canvas_center = new Point(myCanvas.WIDTH / 2, myCanvas.HEIGHT / 2);

		for (let i = 0; i < this.points.length; ++i) {
			this.points[i].move(-canvas_center.x, -canvas_center.y);
			this.points[i].x *= MinimumSpanningCircle.ZOOM_CONSTANT;
			this.points[i].y *= MinimumSpanningCircle.ZOOM_CONSTANT;
			this.points[i].move(canvas_center.x, canvas_center.y);
		}

		if (this.convexHull.ch.length != 0) this.compute();
	}


	/**
	 * 
	 * @param {Buffer} buffer 
	 * @param {color} color
	 * @description Calls the View Handler for the Smallest Enclosing Circle 
	 */
	show(buffer, color) {
		this.view.show(buffer, color, this);
	}

	/**
	 * 
	 * @description Creates the lines between the points of the Convex Hull
	 */
	constructCH() {
		this.convexHull.lines = [];
		let n = this.convexHull.ch.length;
		if (n >= 2) {
			for (let i = 0; i < n; ++i) {
				let a = this.convexHull.ch[i];
				let b = this.convexHull.ch[(i + 1) % n];
				this.convexHull.lines.push(new Line(a.x, a.y, b.x, b.y));
			}
		}
	}

	/**
	 * 
	 * @description Computes the Convex Hull of the given points
	 */
	computeCH() {
		let points = [...this.points];
		if (myCanvas.someDrawableMoving) points.push(new Point(mouseX, mouseY));
		if (points.length >= 2) {
			this.convexHull.ch = [...Graham.compute(points)];
		} else {
			this.convexHull.ch = [...this.points];
		}

		this.constructCH();
	}

	/**
	 * 
	 * @param {Point[]} S
	 * @returns {{ index: number, angle: number, center: { i: number, j: number, k: number } }}
	 * @description Returns the index, the angle and the cos(angle) of the point p
	 * with maximum circle radius with prev(p), p, next(p)
	 */
	maximizeOptimized(S) {
		let max_index = -1;
		let max_radius = -1;
		let max_angle = -1;
		let min_cosangle = 2;

		const N = S.length;

		for (let i = 0; i < S.length; ++i) {
			const p_prev = S[(N + i - 1) % N];
			const p_curr = S[i];
			const p_next = S[(i + 1) % N];

			const radius = Circle.constructByPoints(p_prev, p_curr, p_next).r2;
			if (radius >= max_radius) {
				const [cosangle, angle] = angleFormedByPointsOptimized(p_prev, p_curr, p_next);
				if (radius != max_radius || cosangle <= min_cosangle) {
					max_index = i;
					max_radius = radius;
					max_angle = angle;
					min_cosangle = cosangle;
				}
			}
		}

		return {
			index: max_index,
			angle: max_angle,
			cosangle: min_cosangle,
		}
	}

	/**
	 * 
	 * @deprecated
	 * @param {Object[]} S
	 * @returns {{ index: number, angle: number }}
	 * @description Returns the index and the angle of the point p
	 * with maximum circle radius with prev(p), p, next(p)
	 */
	maximize(S) {
		let max_index = -1;
		let max_radius = -1;
		let max_angle = -1;

		const N = S.length;

		for (let i = 0; i < S.length; ++i) {
			const p_prev = S[(N + i - 1) % N];
			const p_curr = S[i];
			const p_next = S[(i + 1) % N];

			const radius = Math.round(Circle.constructByPoints(p_prev, p_curr, p_next).r2);
			const angle = angleFormedByPoints(p_prev, p_curr, p_next);

			if (radius >= max_radius) {
				if (radius != max_radius || angle > max_angle) {
					max_index = i;
					max_radius = radius;
					max_angle = angle;
				}
			}
		}

		return {
			index: max_index,
			angle: max_angle
		};
	}

	/**
	 * 
	 * @description Computes the Smallest Enclosing Circle of the Convex Hull
	 */
	computeMST() {
		let S = [...this.convexHull.ch];

		let finish = false;
		let best;
		while (!finish && S.length != 2) {
			best = this.maximize(S);
			if (best.angle < Math.PI / 2) finish = true;
			else {
				this.debugCircles.push(Circle.constructByPoints(S[(S.length + best.index - 1) % S.length], S[best.index], S[(best.index + 1) % S.length]));
				S.splice(best.index, 1);
			}
		}

		const N = S.length;

		if (S.length == 2) this.circle = Circle.constructByPoints(S[0], S[1]);
		else this.circle = Circle.constructByPoints(S[(N + best.index - 1) % N], S[best.index], S[(best.index + 1) % N]);
	}

	/**
	 * 
	 * @description Computes the Farthers Voronoi Diagram
	 */
	computeFVD() {
		let S = [];

		this.farthestVoronoi.DCEL = new DCEL(this.convexHull.ch.length);

		for (let i = 0; i < this.convexHull.ch.length; ++i) {
			S.push({
				x: this.convexHull.ch[i].x,
				y: this.convexHull.ch[i].y,
				i: i
			});

			const _i = -(this.convexHull.ch[(i + 1) % this.convexHull.ch.length].y - this.convexHull.ch[i].y);
			const _j = (this.convexHull.ch[(i + 1) % this.convexHull.ch.length].x - this.convexHull.ch[i].x);
			const x = (this.convexHull.ch[(i + 1) % this.convexHull.ch.length].x + this.convexHull.ch[i].x) / 2 + _i * -100;
			const y = (this.convexHull.ch[(i + 1) % this.convexHull.ch.length].y + this.convexHull.ch[i].y) / 2 + _j * -100;

			this.farthestVoronoi.DCEL.vertexs.push(new DCELVertex(
				new Point(x, y)
			));
			this.farthestVoronoi.DCEL.points[i] = i;
		}

		if (S.length > 2) {
			let p;
			while (S.length > 2) {
				p = this.maximize(S);
				const q = (S.length + p.index - 1) % S.length;
				const _c = Circle.constructByPoints(S[q], S[p.index], S[(p.index + 1) % S.length]);
				const c = new Point(_c.dx, _c.dy);

				this.farthestVoronoi.DCEL.edges.push(new DCELEdge(
					c,
					this.farthestVoronoi.DCEL.vertexs[S[p.index].i].point,
					this.farthestVoronoi.DCEL.vertexs.length,
					S[p.index].i
				));
				this.farthestVoronoi.DCEL.edges.push(new DCELEdge(
					c,
					this.farthestVoronoi.DCEL.vertexs[S[q].i].point,
					this.farthestVoronoi.DCEL.vertexs.length,
					S[q].i,
				));

				this.farthestVoronoi.DCEL.vertexs.push(new DCELVertex(
					c,
					this.farthestVoronoi.DCEL.edges.length - 1,
					this.farthestVoronoi.DCEL.edges.length - 2,
					true
				));
				this.farthestVoronoi.DCEL.points[S[p.index].i] = this.farthestVoronoi.DCEL.vertexs.length - 1;

				this.farthestVoronoi.DCEL.vertexs[S[q].i] = new DCELVertex(
					c,
					this.farthestVoronoi.DCEL.edges.length - 1,
					this.farthestVoronoi.DCEL.edges.length - 2,
					true
				);
				S.splice(p.index, 1);
			}

			const q = (S.length + p.index - 1) % S.length;

			this.farthestVoronoi.DCEL.edges.push(new DCELEdge(
				this.farthestVoronoi.DCEL.vertexs[S[q].i].point,
				this.farthestVoronoi.DCEL.vertexs[S[(q + 1) % S.length].i].point,
				S[q].i,
				S[(q + 1) % S.length].i
			));

			this.farthestVoronoi.DCEL.vertexs.push(new DCELVertex(
				this.farthestVoronoi.DCEL.vertexs[this.farthestVoronoi.DCEL.vertexs.length - 1].point,
				this.farthestVoronoi.DCEL.edges.length - 1,
				this.farthestVoronoi.DCEL.vertexs[this.farthestVoronoi.DCEL.vertexs.length - 1].next,
				true
			));

			this.farthestVoronoi.DCEL.points[S[q].i] = this.farthestVoronoi.DCEL.vertexs.length - 1;

			this.farthestVoronoi.DCEL.vertexs.push(new DCELVertex(
				this.farthestVoronoi.DCEL.vertexs[this.farthestVoronoi.DCEL.vertexs.length - 1].point,
				this.farthestVoronoi.DCEL.vertexs[this.farthestVoronoi.DCEL.vertexs.length - 2].prev,
				this.farthestVoronoi.DCEL.edges.length - 1,
				true
			));
			this.farthestVoronoi.DCEL.points[S[(q + 1) % S.length].i] = this.farthestVoronoi.DCEL.vertexs.length - 1;
		} else {
			if (S.length == 2) {
				this.farthestVoronoi.DCEL.vertexs[0] = new DCELVertex(
					this.farthestVoronoi.DCEL.vertexs[0].point,
					0,
					0,
					true
				);

				this.farthestVoronoi.DCEL.vertexs[1] = new DCELVertex(
					this.farthestVoronoi.DCEL.vertexs[1].point,
					0,
					0,
					true
				);

				this.farthestVoronoi.DCEL.edges.push(new DCELEdge(
					this.farthestVoronoi.DCEL.vertexs[0].point,
					this.farthestVoronoi.DCEL.vertexs[1].point,
					0,
					1
				));
			}
		}

	}

	/**
	 * 
	 * @description Computes the Convex Hull and the Smallest Enclosing Circle
	 */
	compute() {
		this.clean();

		this.computeCH();
		if (this.convexHull.ch.length >= 2) {
			this.computeMST();
			this.computeFVD();
		}
	}


	/**
	 * 
	 * @global
	 */
	static ZOOM_CONSTANT = 1.1;
}