class DivideAndConquer {
	/**
	 * 
	 * @param {number} n 
	 * @param {Point[]} ch
	 * @returns {Point}
	 * @description Returns the rightmost vertex of the Convex Hull
	 * @time O(n) 
	 */
	static findRightMostVertex(n, ch) {
		let ret = 0;
		for (let i = 1; i < n; ++i) {
			if (ch[i].x > ch[ret].x) ret = i;
		}

		return ret;
	}

	/**
	 * 
	 * @param {number} n 
	 * @param {Point[]} ch
	 * @returns {Point}
	 * @description Returns the leftmost vertex of the Convex Hull
	 * @time O(n) 
	 */
	static findLeftMostVertex(n, ch) {
		let ret = 0;
		for (let i = 1; i < n; ++i) {
			if (ch[i].x < ch[ret].x) ret = i;
		}

		return ret;
	}

	/**
	 * 
	 * @param {Point[]} ch1 
	 * @param {Point[]} ch2 
	 * @param {number} i1 
	 * @param {number} i2
	 * @returns {Object}
	 * @description Computes the upper tangent between two Convex hulls
	 * @time O(1) 
	 */
	static findUpperTangent(ch1, ch2, i1, i2) {
		let n1 = ch1.length;
		let n2 = ch2.length;

		let upper1 = i1;
		let upper2 = i2;
		let done = false;

		while (!done) {
			done = true;
			while (isRightTurn(ch2[upper2], ch1[upper1], ch1[(upper1 + 1) % n1])) {
				upper1 = (upper1 + 1) % n1;
			}

			while (isLeftTurn(ch1[upper1], ch2[upper2], ch2[(n2 + upper2 - 1) % n2])) {
				upper2 = (n2 + upper2 - 1) % n2;
				done = false;
			}
		}

		return {
			a: upper1,
			b: upper2
		};
	}

	/**
	 * 
	 * @param {Point[]} ch1 
	 * @param {Point[]} ch2 
	 * @param {number} i1 
	 * @param {number} i2
	 * @returns {Object}
	 * @description Computes the lower tangent between two Convex Hulls
	 * @time O(n) 
	 */
	static findLowerTangent(ch1, ch2, i1, i2) {
		let n1 = ch1.length;
		let n2 = ch2.length;

		let lower1 = i1;
		let lower2 = i2;
		let done = false;

		while (!done) {
			done = true;
			while (isRightTurn(ch1[lower1], ch2[lower2], ch2[(lower2 + 1) % n2])) {
				lower2 = (lower2 + 1) % n2;
			}

			while (isLeftTurn(ch2[lower2], ch1[lower1], ch1[(n1 + lower1 - 1) % n1])) {
				lower1 = (n1 + lower1 - 1) % n1;
				done = false;
			}
		}

		return {
			a: lower1,
			b: lower2
		};
	}

	/**
	 * 
	 * @param {Points[]} ch1 
	 * @param {Points[]} ch2
	 * @param {Points[]}
	 * @description Merges two Convex Hulls into one
	 * @time O(n)
	 */
	static merge(ch1, ch2) {
		// As we are passing 2 convex hulls we know they're both ordered
		// counterclockwise
		let n1 = ch1.length;
		let n2 = ch2.length;

		// i1 -> right most vertex of ch1
		let i1 = this.findRightMostVertex(n1, ch1);
		// i2 -> left most vertex of ch2
		let i2 = this.findLeftMostVertex(n2, ch2);

		// Upper tangent
		let tmp = this.findUpperTangent(ch1, ch2, i1, i2);
		let upper1 = tmp.a;
		let upper2 = tmp.b;

		// Lower tangent
		tmp = this.findLowerTangent(ch1, ch2, i1, i2);
		let lower1 = tmp.a;
		let lower2 = tmp.b;

		let i = upper1;
		let ret = [ch1[upper1]];
		while (i != lower1) {
			i = (i + 1) % n1;
			ret.push(ch1[i]);
		}

		i = lower2;
		ret.push(ch2[lower2]);
		while (i != upper2) {
			i = (i + 1) % n2;
			ret.push(ch2[i]);
		}

		return ret;
	}

	// O(1)
	/**
	 * 
	 * @param {Points[]} points
	 * @returns {Points[]}
	 * @description Constructs the base case
	 * @time O(1) since we know that points.length < 6
	 */
	static baseCase(points) {
		return Graham.compute(points);
	}

	/**
	 * 
	 * @param {Points[]} points
	 * @returns {Points[]}
	 * @returns Divides by two the set of points if is not a base case
	 * @time O(n) 
	 */
	static divide(points) {
		let n = points.length;
		let ch = [];
		if (n >= 6) {
			let m = Math.floor(n / 2);
			let ch1 = this.divide(points.slice(0, m));
			let ch2 = this.divide(points.slice(m, n));
			ch = this.merge(ch1, ch2);

		} else {
			ch = this.baseCase(points);
		}

		return ch;
	}

	/**
	 * 
	 * @param {Point[]} points
	 * @returns {Point[]}
	 * @description Returns the list of points sorted by x
	 * @time O(n log n)
	 */
	static orderPoints(points) {
		return points.sort((a, b) => {
			if (a.x == b.x) return a.y - b.y;
			return a.x - b.x;
		});
	}

	/**
	 * 
	 * @param {Points[]} points
	 * @returns {Points[]} Convex Hull
	 * @description Computes the Divide and conquer algorithm to construct the Convex Hull
	 * @time O(n log n) 
	 */
	static compute(points) {
		points = this.orderPoints(points);

		return this.divide(points);
	}

	/**
	 * 
	 * @description Runs the step-by-step divide and conquer algorithm
	 */
	static computeStepByStep() {
		switch (myCanvas.convexhull.step) {
			case 0: // Start
				myCanvas.convexhull.clean();
				this.resetState();
				++myCanvas.convexhull.step;
				break;
			case 1: // Sort
				this.state.tree = new BinaryTree(this.orderPoints(myCanvas.convexhull.points));
				++myCanvas.convexhull.step;
				break;
			case 2: // Divide till get an array of base cases
				this.state.divided = true;
				if (!this.state.tree.divide()) {
					++myCanvas.convexhull.step;
				}
				break;
			case 3: // Merge
				this.state.tree.merge();
				if (this.state.tree.root.ch.length != 0) ++myCanvas.convexhull.step;
				break;
			default:
				this.state.divided = false;
				myCanvas.convexhull.ch = this.state.tree.root.ch;
				myCanvas.convexhull.constructCH();
				endStepByStep();
				break;
		}
	}

	/**
	 * 
	 * @description Resets the state
	 */
	static resetState() {
		this.state = {
			divided: false,
			tree: []
		};
	}

	/**
	 * 
	 * @static State
	 */
	static state = {
		divided: false,
		tree: []
	};
}