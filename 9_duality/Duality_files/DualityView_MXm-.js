/**
 * 
 * @description Handler to show in the canvas the Duality
 */
class DualityView {
	/**
	 * 
	 * @param {Buffer} primalBuffer 
	 * @param {Buffer} dualBuffer 
	 * @param {Drawable} primalObject 
	 * @param {Drawable} dualObject
	 * @description Shows both objects to its buffers
	 */
	show(primalBuffer, dualBuffer, primalObject, dualObject) {
		let lp = getLocalPosition(mouseX, mouseY);
		let lightning = this.isLightning(lp, primalObject, dualObject);

		if (Array.isArray(primalObject)) primalObject.forEach(obj => {
			try {
				obj.show(primalBuffer, 0, lightning)
			} catch (e) { }
		});
		else primalObject.show(primalBuffer, 0, lightning);

		if (Array.isArray(dualObject)) dualObject.forEach(obj => {
			try {
				obj.show(dualBuffer, 255, lightning)
			} catch (e) { }
		});
		else dualObject.show(dualBuffer, 255, lightning);
	}

	/**
	 * 
	 * @param {Object} lp - Local coordinates of the mouse
	 * @param {Drawable} primalObject 
	 * @param {Drawable} dualObject 
	 * @returns {boolean}
	 * @description Returns if the mouse is on the primalObject or the dualObject
	 */
	isLightning(lp, primalObject, dualObject) {
		if (!isLightningActive()) return false;
		let aux = new Point(lp.x, lp.y);
		if (lp.space == 'primal') {
			if (Array.isArray(primalObject)) {
				primalObject.forEach(obj => {
					try {
						if (obj.collides(aux)) return true;
					} catch (e) { };
				});
				return false;
			} else try {
				return primalObject.collides(aux);
			} catch (e) { };
		} else {
			if (Array.isArray(dualObject)) {
				dualObject.forEach(obj => {
					try {
						if (obj.collides(aux)) return true;
					} catch (e) { }
				});
				return false;
			} else try {
				return dualObject.collides(aux);
			} catch (e) { };
		}
		return false;
	}
}