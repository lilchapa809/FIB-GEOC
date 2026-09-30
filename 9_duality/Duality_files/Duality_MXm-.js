/**
 * 
 * @description Object that contains the primal and the dual
 */
class Duality {
	/**
	 * @param {Drawable} primalObject 
	 * @param {Drawable} dualObject 
	 */
	constructor(primalObject, dualObject) {
		if (typeof primalObject === 'undefined' && typeof dualObject === 'undefined') {
			throw new Error('Se debe definir uno de los dos espacios como minimo');
		}

		this.primalObject = typeof primalObject === 'undefined' ? Duality.computeDuality(dualObject) : primalObject;
		this.dualObject = typeof dualObject === 'undefined' ? Duality.computeDuality(primalObject) : dualObject;

		this.drawnDuality = (typeof primalObject === 'undefined') ? 'dual' : 'primal';

		this.dualityView = new DualityView();
	}

	/**
	 * 
	 * @param {number} dx Movement in x
	 * @param {number} dy Movement in y
	 * @param {string} who Which of the two elemets is moved, the primal or the dual
	 * @description Moves the primal and dual by dx and dy 
	 */
	move(dx, dy, who) {
		if (who == 'primal') {
			this.primalObject.move(dx, dy);
			this.dualObject = Duality.computeDuality(this.primalObject);
		} else {
			this.dualObject.move(dx, dy);
			this.primalObject = Duality.computeDuality(this.dualObject);
		}
	}

	/**
	 * 
	 * @description Expands both objects to simulate infinity (used in Line) 
	 */
	expand() {
		try {
			this.primalObject.expand();
		} catch (e) { }
		try {
			this.dualObject.expand();
		} catch (e) { }
	}

	/**
	 * 
	 * @param {Buffer} primalBuffer Buffer where primal values are drawn 
	 * @param {Buffer} dualBuffer Buffer where dual values are drawn
	 * @description Calls the view to show the objects to the canvas 
	 */
	show(primalBuffer, dualBuffer) {
		this.dualityView.show(primalBuffer, dualBuffer, this.primalObject, this.dualObject);
	}

	/**
	 * 
	 * @description Recomputes the duality of the not created object (only when the duality is changed)
	 */
	recalcDuality() {
		if (this.drawnDuality == 'primal') {
			if (getOptionSelected('duals') == 'Circle' && this.primalObject instanceof Point && this.primalObject.x == 0 && this.primalObject.y == 0) {
				return false;
			}
			this.dualObject = Duality.computeDuality(this.primalObject);
			return true;
		} else {
			if (getOptionSelected('duals') == 'Circle' && this.dualObject instanceof Point && this.dualObject.x == 0 && this.dualObject.y == 0) {
				return false;
			}
			this.primalObject = Duality.computeDuality(this.dualObject);
			return true;
		}
	}

	/**
	 * 
	 * @param {Duality} object
	 * @return {Duality}
	 * @description Computes the duality of an object 
	 */
	static computeDuality(object) {
		return this.duality.compute(object);
	}

	/**
	 * 
	 * @static Available dualities
	 */
	static dualities = ['Parabola', 'Circle'];

	/**
	 * 
	 * @static Current duality
	 */
	static duality = ParabolaDuality;
}