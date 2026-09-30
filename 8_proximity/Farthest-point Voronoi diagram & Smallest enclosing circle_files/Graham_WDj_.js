class Graham {
	/**
	 * 
	 * @param {Point[]} points
	 * @returns {Point[]}
	 * @description Returns the given list of points ordered by angle
	 * with the lowest point
	 * @time O(n log n) 
	 */
	static orderByAngle(points) {
		let lowestPoint = {
			point: points[0],
			i: 0
		};

		for (let i = 0; i < points.length; ++i) {
			let p = points[i];
			if (p.y > lowestPoint.point.y)
				lowestPoint = {
					point: p,
					i: i
				};
		}

		let orderPointsByAngle = [];
		orderPointsByAngle.push({
			point: new Point(lowestPoint.point.x, lowestPoint.point.y),
			angle: 0 // In degrees
		});

		let atan = point => {
			let delta_y = point.y - lowestPoint.point.y;
			let delta_x = point.x - lowestPoint.point.x;
			return Math.atan(delta_y / delta_x) * 180 / Math.PI;
		};

		let positiveAngle = [];
		let negativeAngle = [];

		for (let i = 0; i < points.length; ++i) {
			if (i == lowestPoint.i) continue;
			let p = points[i];
			let angle = atan(p);
			let obj = {
				point: new Point(p.x, p.y),
				angle: angle
			};

			if (angle < 0) negativeAngle.push(obj);
			else if (angle > 0) positiveAngle.push(obj);
			else {
				/*
				If it's on the X axis of the referecence point
				If the X coordinate of the is greater, it's a negative angle point
				Else, it's a positive angle point 
				*/
				if (obj.point.x > lowestPoint.point.x) negativeAngle.push(obj);
				else positiveAngle.push(obj);
			}
		}

		negativeAngle = negativeAngle.sort((a, b) => {
			return b.angle - a.angle;
		});

		positiveAngle = positiveAngle.sort((a, b) => {
			return b.angle - a.angle;
		});

		orderPointsByAngle = orderPointsByAngle.concat(
			negativeAngle,
			positiveAngle
		);

		return orderPointsByAngle;
	}

	/**
	 * 
	 * @param {Point[]} points
	 * @returns {Point[]} Convex Hull
	 * @description Computes the Convex Hull of the given points
	 * @time O(n log n)
	 */
	static compute(points) {
		points = this.orderByAngle(points).map(a => a.point);

		let ch = [];

		ch.push(points[0]);
		ch.push(points[1]);

		points.splice(0, 2);

		// O(n)
		while (points.length > 0) {
			let pi = points[0];
			let p = ch[ch.length - 1];
			let pp = ch[ch.length - 2];

			if (pp == undefined || isLeftTurn(pp, p, pi)) {
				ch.push(new Point(pi.x, pi.y));
				points.splice(0, 1);
			} else {
				ch.splice(ch.length - 1, 1);
			}
		}

		return ch;
	}

	/**
	 * 
	 * @description Creates the lines 1-i for i in [2, n]
	 */
	static createGuideLines() {
		let base = this.state.points[0];
		for (let i = 1; i < this.state.points.length; ++i) {
			let p = this.state.points[i];
			this.state.guidelines.push(new Line(base.x, base.y, p.x, p.y, new DashedLineView()));
		}
	}

	/**
	 * 
	 * @description Runs the step-by-step Graham algorithm
	 */
	static computeStepByStep() {
		switch (myCanvas.convexhull.step) {
			case 0: // Start
				myCanvas.convexhull.clean();
				this.state.points = [...myCanvas.convexhull.points];
				myCanvas.convexhull.drawIndexes = true;
				++myCanvas.convexhull.step;
				break;
			case 1: // Sort && draw first line
				this.state.points = this.orderByAngle(this.state.points).map(a => a.point);
				myCanvas.convexhull.points = [...this.state.points];
				myCanvas.convexhull.ch.push(this.state.points[0]);
				myCanvas.convexhull.ch.push(this.state.points[1]);
				this.createGuideLines();
				this.state.points.splice(0, 2);
				++myCanvas.convexhull.step;
				break;
			case 2: // Start to construct the whole CH
				this.state.to_delete_p = false;
				if (this.state.points.length > 0) {
					this.state.pi = this.state.points[0];
					this.state.p = myCanvas.convexhull.ch[myCanvas.convexhull.ch.length - 1];
					this.state.pp = myCanvas.convexhull.ch[myCanvas.convexhull.ch.length - 2];

					myCanvas.convexhull.ch.push(new Point(this.state.pi.x, this.state.pi.y));

					if (isLeftTurn(this.state.pp, this.state.p, this.state.pi)) {
						this.state.points.splice(0, 1);
					} else {
						++myCanvas.convexhull.step;
					}
				} else {
					myCanvas.convexhull.step = -1;
				}
				break;
			case 3: // Prepare a point and line to be deleted
				// Draw the triangle p_ini, p, pi
				this.state.deleted_lines.push(new Line(this.state.p.x, this.state.p.y, this.state.pi.x, this.state.pi.y));
				this.state.deleted_lines.push(new Line(this.state.p.x, this.state.p.y, this.state.pp.x, this.state.pp.y));
				this.state.deleted_points.push(new Point(this.state.p.x, this.state.p.y));
				this.state.to_delete_p = true;
				++myCanvas.convexhull.step;
				break;
			case 4: // Delete de point
				myCanvas.convexhull.ch.splice(myCanvas.convexhull.ch.length - 2, 2);
				myCanvas.convexhull.ch.push(this.state.points[0]);
				this.state.points.splice(0, 1);
				myCanvas.convexhull.step = 2;
				break;
			default:
				endStepByStep();
				break;
		}

		myCanvas.convexhull.constructCH();
	}

	/**
	 * 
	 * @description Resets the state
	 */
	static resetState() {
		this.state = {
			points: [],
			pi: 0,
			p: 0,
			pp: 0,
			deleted_points: [],
			deleted_lines: [],
			to_delete_p: false,
			guidelines: []
		};
	}

	/**
	 * 
	 * @static State
	 */
	static state = {
		points: [],
		pi: 0,
		p: 0,
		pp: 0,
		deleted_points: [],
		deleted_lines: [],
		to_delete_p: false,
		guidelines: []
	};
}