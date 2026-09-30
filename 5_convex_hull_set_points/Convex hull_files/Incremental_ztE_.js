class Incremental {
	/**
	 * 
	 * @param {Point[]} points
	 * @returns {Point[]}
	 * @description Sorts the list of points and returns it
	 * @time O(n log n)
	 */
	static orderPoints(points) {
		return points.sort((a, b) => {
			if (a.x == a.y) return a.y - b.y;
			return a.x - b.x;
		});
	}

	/**
	 * 
	 * @param {Point[]} points
	 * @returns {Point[]}
	 * @description Returns the current Convex Hull
	 * @time O(n^2)
	 */
	static computeAlgorithm(points) {
		const n = points.length;

		if (n <= 2) {
			return points;
		}

		let next = [1, 0];
		let prev = [1, 0];

		for (let i = 2; i < n; ++i) {
			const p = points[i];
			let upper = 0, lower = 0;
			for (let j = 1; j < i; ++j) {
				const a = points[j];
				const b = points[j - 1];

				if (isLeftTurn(p, a, b) && isLeftTurn(p, a, points[upper])) upper = j;
				else if (isRightTurn(p, a, b) && isRightTurn(p, a, points[lower])) lower = j;
			}

			next[upper] = i;
			prev[lower] = i;
			next.push(lower);
			prev.push(upper);
		}

		let ch = [points[0]];
		let i = next[0];
		while (i && ch.length <= points.length + 1) {
			ch.push(points[i]);
			i = next[i];
		}

		console.assert(ch.length <= points.length);

		return ch;
	}

	/**
	 * 
	 * @param {Point[]} points
	 * @returns {Point[]} Convex Hull
	 * @description Computes the Incremental algorithm to construct the Convex Hull
	 * @time O(n^2)
	 */
	static compute(points) {
		return this.computeAlgorithm(this.orderPoints(points));
	}

	/**
	 * 
	 * @description Runs the step-by-step incremental algorithm
	 */
	static computeStepByStep() {
		switch (myCanvas.convexhull.step) {
			case 0: // Start
				myCanvas.convexhull.clean();
				myCanvas.convexhull.drawIndexes = true;
				this.state.running = true;
				++myCanvas.convexhull.step;
				break;
			case 1: // Sort points
				myCanvas.convexhull.points = this.orderPoints(myCanvas.convexhull.points);
				this.state.pi = 2;
				this.state.testing = 1;
				this.state.next = [1, 0];
				this.state.prev = [1, 0];
				++myCanvas.convexhull.step;
				break;
			case 2: // Inner loop upper tangent
				if (this.state.pi == myCanvas.convexhull.points.length) {
					myCanvas.convexhull.step = -1;
				} else {
					const a = myCanvas.convexhull.points[this.state.testing];
					const b = myCanvas.convexhull.points[this.state.testing - 1];
					const p = myCanvas.convexhull.points[this.state.pi];
					const q = myCanvas.convexhull.points[this.state.upper];
					if (isLeftTurn(p, a, b) && isLeftTurn(p, a, q)) this.state.upper = this.state.testing;
					this.state.testing = this.state.next[this.state.testing];
					if (this.state.testing == 0) {
						this.state.testing = this.state.next[0];
						++myCanvas.convexhull.step;
					}
				}
				break;
			case 3: // Inner loop lower tangent
				const a = myCanvas.convexhull.points[this.state.testing];
				const b = myCanvas.convexhull.points[this.state.testing - 1];
				const p = myCanvas.convexhull.points[this.state.pi];
				const q = myCanvas.convexhull.points[this.state.lower];
				if (isRightTurn(p, a, b) && isRightTurn(p, a, q)) this.state.lower = this.state.testing;
				this.state.testing = this.state.next[this.state.testing];
				if (this.state.testing == 0) {
					++myCanvas.convexhull.step;
				}
				break;
			case 4:
				this.state.next[this.state.upper] = this.state.pi;
				this.state.prev[this.state.lower] = this.state.pi;
				this.state.next.push(this.state.lower);
				this.state.prev.push(this.state.upper);
				this.state.upper = 0;
				this.state.lower = 0;
				this.state.testing = this.state.next[0];
				++this.state.pi;
				myCanvas.convexhull.step = 2;
				break;
			default:
				this.state.running = false;
				endStepByStep();
				break;
		}

		let ch = [myCanvas.convexhull.points[0]];
		let i = this.state.next[0];
		while (i && ch.length <= myCanvas.convexhull.points.length + 1) {
			ch.push(myCanvas.convexhull.points[i]);
			i = this.state.next[i];
		}
		myCanvas.convexhull.ch = [...ch];
		myCanvas.convexhull.constructCH();
	}

	/**
	 * 
	 * @description Resets the state
	 */
	static resetState() {
		this.state = {
			pi: 0,
			testing: 0,
			next: [],
			prev: [],
			ch: [],
			upper: 0,
			lower: 0,
			running: false,
		};
	}

	/**
	 * 
	 * @static State
	 */
	static state = {
		pi: 0,
		testing: 0,
		next: [],
		prev: [],
		ch: [],
		upper: 0,
		lower: 0,
		running: false,
	}
}