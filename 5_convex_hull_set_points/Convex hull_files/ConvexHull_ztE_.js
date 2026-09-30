class ConvexHull {
	constructor() {
		this.points = [];
		this.lines = [];
		this.ch = [];
		this.algorithm = Graham;

		this.drawIndexes = false;

		this.stepByStepFinished = false;

		this.step = 0;

		this.view = new ConvexHullView();
	}

	/**
	 * 
	 * @param {Buffer} buffer 
	 * @param {color} color
	 * @description Calls the View Handler for the Convex Hull 
	 */
	show(buffer, color) {
		this.view.show(buffer, color, this);
	}

	/**
	 * 
	 * @description Clears the Convex Hull
	 */
	clean() {
		this.lines = [];
		this.ch = [];
		Incremental.resetState();
		DivideAndConquer.resetState();
		Graham.resetState();
	}

	/**
	 * 
	 * @description Clears all the state
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
	 * @description Creates the lines between the points of the Convex Hull
	 */
	constructCH() {
		this.lines = ConvexHull.__constructCH__(this.ch);
	}

	/**
	 * 
	 * @param {Point[]} points
	 * @returns {Line[]}
	 * @description Creates the lines between the points of the Convex Hull
	 */
	static __constructCH__(points) {
		let lines = [];
		let n = points.length;
		if (n >= 2) {
			for (let i = 0; i < n; ++i) {
				let a = points[i];
				let b = points[(i + 1) % n];
				lines.push(new Line(a.x, a.y, b.x, b.y));
			}
		}
		return lines;
	}

	/**
	 * 
	 * @description Runs the step-by-step visualization
	 */
	stepByStep() {
		if (myCanvas.someDrawableMoving) {
			alert('Please, do not move any point while the construction is going on');
			return;
		}
		this.algorithm.computeStepByStep();
	}

	/**
	 * 
	 * @description Runs the selected algorithm to compute the Convex Hulls
	 */
	computeCompleteAlgorithm() {
		this.clean();
		let points = [...this.points];
		if (myCanvas.someDrawableMoving) points.push(new Point(mouseX, mouseY));
		if (points.length >= 2) {
			this.ch = this.algorithm.compute(points);
			this.constructCH();
		}
	}
}