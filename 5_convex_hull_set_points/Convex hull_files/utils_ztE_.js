/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {Drawable[]} list 
 * @returns {Point|null}
 * @description Checks if a point of the given list collides with the point (x, y)
 * If the point exists, it's returned, otherwise returns null
 */
function getPointCollision(x, y, list) {
	const p = new Point(x, y);
	for (let obj of list) {
		if (obj instanceof Point && p.collides(obj)) return obj;
	}
	return null;
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {Drawable[]} list
 * @returns {Line|number}
 * @description Checks if the point (x, y) lies on a line of the list
 * If the line exists, it's returned, otherwise returns -1
 */
function getPointLineCollision(x, y, list) {
	const p = new Point(x, y);
	for (let obj of list) {
		if (obj instanceof Line && obj.collides(p)) return list.indexOf(obj);
	}

	return -1;
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {Drawable[]} list
 * @returns {Parabola|number}
 * @description Checks if the point (x, y) lies on a parabola of the list
 * If the parabola exists, it's returned, otherwise returns -1
 */
function getPointParabolaCollision(x, y, list) {
	const p = new Point(x, y);
	for (let obj of list) {
		if (obj instanceof Parabola && obj.collides(p)) {
			return list.indexOf(obj);
		}
	}
	return -1;
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {Drawable[]} list
 * @returns {Circle|number}
 * @description Checks if the point (x, y) lies on a circle of the list
 * If the circle exists, it's returned, otherwise returns -1
 */
function getPointCircleCollision(x, y, list) {
	const p = new Point(x, y);
	for (let obj of list) {
		if (obj instanceof Circle && obj.collides(p)) {
			return list.indexOf(obj);
		}
	}
	return -1;
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {Drawable[]} list
 * @returns {boolean}
 * @description Returns if a Point can be created or not 
 */
function canCreatePoint(x, y, list) {
	if (getPointCollision(x, y, list) != null) return false;
	return true;
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {Drawable[]} list
 * @returns {number}
 * @description Returns the index of the point to be deleted.
 * Return -1 if the point is null 
 */
function canDeletePoint(x, y, list) {
	const p = getPointCollision(x, y, list);
	if (p == null) return -1;
	return list.indexOf(p);
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {Drawable[]} list
 * @returns {number}
 * @description Returns the index of the list array of the line
 * that contains the point (x, y)  
 */
function canDeleteLine(x, y, list) {
	return getPointLineCollision(x, y, list);
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {Drawable[]} list
 * @returns {number}
 * @description Returns the index of the list array of the parabola
 * that contains the point (x, y)  
 */
function canDeleteParabola(x, y, list) {
	return getPointParabolaCollision(x, y, list);
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {Drawable[]} list
 * @returns {number}
 * @description Returns the index of the list array of the circle
 * that contains the point (x, y)  
 */
function canDeleteCircle(x, y, list) {
	return getPointCircleCollision(x, y, list);
}

/**
 * 
 * @param {string} opt
 * @returns {string}
 * @description Returns the option selected by the DOM with id: opt 
 */
function getOptionSelected(opt) {
	let o = document.getElementById(opt);
	return o.options[o.selectedIndex].value;
}

/**
 * 
 * @param {number} x 
 * @param {number} y
 * @returns {object}
 * @description Returns an object with the local coordinates x, y and the space (primal or dual)
 * Used in Duality Applet 
 */
function getLocalPosition(x, y) {
	let lp = {
		x: x - myCanvas.width / 2,
		y: myCanvas.height / 2 - y,
		space: "primal",
	};

	if (x >= myCanvas.width) {
		lp.x -= myCanvas.width;
		lp.space = "dual";
	}

	return lp;
}

/**
 * 
 * @param {{x: number, y: number}} v1 
 * @param {{x: number, y: number}} v2
 * @returns {number}
 * @description Dot product 
 */
function dot(v1, v2) {
	return v1.x * v2.x + v1.y * v2.y;
}

/**
 * 
 * @param {{x: number, y: number}} v1 
 * @param {{x: number, y: number}} v2
 * @returns {number}
 * @description Cross product 
 */
function cross(v1, v2) {
	return v1.x * v2.y - v1.y * v2.x;
}

/**
 * 
 * @param {Point} a 
 * @param {Point} b 
 * @param {Point} c
 * @returns {boolean}
 * @description Returns if ba, cb is a left turn or not 
 */
function isLeftTurn(a, b, c) {
	return orientation(a, b, c) <= 0;
}

/**
 * 
 * @param {number} a 
 * @param {number} b 
 * @param {number} c
 * @returns {boolean}
 * @description Returns if ba, cb is a right turn or not 
 */
function isRightTurn(a, b, c) {
	return orientation(a, b, c) >= 0;
}

/*
    Si v1 X v2 <= 0 -> Giro a la izquierda (o no hay giro)
    Sino, giro a la derecha
    */
/**
 * 
 * @param {number} a 
 * @param {number} b 
 * @param {number} c
 * @returns {1|0|-1}
 * @description Returns the normalized (1, 0 or -1) cross product ba X cb
 */
function orientation(a, b, c) {
	const v1 = {
		x: b.x - a.x,
		y: b.y - a.y,
	};

	const v2 = {
		x: c.x - b.x,
		y: c.y - b.y,
	};

	const ret = cross(v1, v2);
	if (ret == 0) return 0;
	if (ret > 0) return 1;
	return -1;
}

/**
 * 
 * @param {{x: number, y: number}} v
 * @returns {number}
 * @description Returns the length of the vector v
 */
function vectorLength(v) {
	return Math.sqrt(v.x * v.x + v.y * v.y);
}

/**
 * 
 * @param {Point} prev
 * @param {Point} curr 
 * @param {Point} next
 * @returns {number}
 * @description Rerturns the angle formed by 3 points 
 */
function angleFormedByPoints(prev, curr, next) {
	// // Computing the three sides of the triangle
	// const prev_curr = Math.sqrt(
	// 	Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2),
	// );
	// const curr_next = Math.sqrt(
	// 	Math.pow(next.x - curr.x, 2) + Math.pow(next.y - curr.y, 2),
	// );
	// const prev_next = Math.sqrt(
	// 	Math.pow(next.x - prev.x, 2) + Math.pow(next.y - prev.y, 2),
	// );

	// // Cosinus theorem: c^2 = a^2 + b^2 - 2abcos(gamma)
	// const num = Math.pow(prev_curr, 2) + Math.pow(curr_next, 2) - Math.pow(prev_next, 2);
	// const den = 2 * prev_curr * curr_next;

	const PC = {
		i: prev.x - curr.x,
		j: prev.y - curr.y,
		k: 0
	};

	const CN = {
		i: next.x - curr.x,
		j: next.y - curr.y,
		k: 0
	};

	const num = dot3D(PC, CN);

	const den = Math.sqrt(dot3D(PC, PC)) * Math.sqrt(dot3D(CN, CN));

	return Math.acos(num / den);
}

/**
 * 
 * @param {Point} prev
 * @param {Point} curr 
 * @param {Point} next
 * @returns {[cosangle: number, angle: number]}
 * @description Rerturns the cos(angle) and the angle formed by 3 points 
 */
function angleFormedByPointsOptimized(prev, curr, next) {
	// Computing the three sides of the triangle
	const PC = {
		i: prev.x - curr.x,
		j: prev.y - curr.y,
		k: 0
	};

	const CN = {
		i: next.x - curr.x,
		j: next.y - curr.y,
		k: 0
	};

	const num = dot3D(PC, CN);

	const den = Math.sqrt(dot3D(PC, PC)) * Math.sqrt(dot3D(CN, CN));

	const cosangle = num / den;

	return [cosangle, Math.acos(cosangle)];
}

/**
 * 
 * @param {Point} b 
 * @param {Point} c 
 * @param {number} r
 * @returns {number}
 * @description Returns the angle A between the points a, b, c 
 */
function angleByTwoPointsAndRadius(b, c, r) {
	return Math.asin(
		Math.sqrt(Math.pow(b.x - c.x, 2) + Math.pow(b.y - c.y, 2)) / (2 * r),
	);
}

/**
 * 
 * @param {{i: number, j: number, k: number}} a 
 * @param {{i: number, j: number, k: number}} b
 * @returns {{i: number, j: number, k: number}}
 * @description Computes the cross product between two 3D vectors 
 */
function cross3D(a, b) {
	return {
		i: a.j * b.k - a.k * b.j,
		j: a.k * b.i - a.i * b.k,
		k: a.i * b.j - a.j * b.i,
	};
}

/**
 * 
 * @param {{i: number, j: number, k: number}} a 
 * @param {{i: number, j: number, k: number}} b
 * @returns {number}
 * @description Computes the dot product between two 3D vectors 
 */
function dot3D(a, b) {
	return a.i * b.i + a.j * b.j + a.k * b.k;
}

/**
 * 
 * @param {{i: number, j: number, k: number}} v
 * @returns {{i: number, j: number, k: number}}
 * @description Returns the unitary vector
 */
function unitary3D(v) {
	const s = Math.sqrt(Math.pow(v.i, 2) + Math.pow(v.j, 2) + Math.pow(v.k, 2));
	v.i /= s;
	v.j /= s;
	v.k /= s;
	return v;
}

/**
 * 
 * @param {Point} a 
 * @param {Point} b 
 * @param {Point} c
 * @returns {{ i: number, j: number, k: number}}
 * @description Optimized calculus of the center of 3 points
 */
function getCenterByPoints(a, b, c) {
	if ((a == undefined && b == undefined) || (a == undefined && c == undefined) || (b == undefined && c == undefined)) return null;
	if (a == undefined) {
		return {
			i: (b.x + c.x) / 2,
			j: (b.y + c.y) / 2,
			k: 1
		};
	} else if (b == undefined) {
		return {
			i: (a.x + c.x) / 2,
			j: (a.y + c.y) / 2,
			k: 1
		};
	} else if (c == undefined) {
		return {
			i: (a.x + b.x) / 2,
			j: (a.y + b.y) / 2,
			k: 1
		};
	}

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
	return cross3D(la, lb);
}

/**
 * 
 * @param {{ i: number, j: number, k: number }} a
 * @param {{ i: number, j: number, k: number }} b
 * @param {{ i: number, j: number, k: number }} ap
 * @param {{ i: number, j: number, k: number }} bp
 * @returns {boolean} Returns true if dist(a, b) >= dist(b, bp), otherwise false
 */
function distanceOfTwoHomogeneousPoints(a, b, ap, bp) {
	const distab = Math.pow(bp.k, 2) * (Math.pow(a.i * b.k - b.i, 2) + Math.pow(a.j * b.k - b.j, 2));
	const distapbp = Math.pow(b.k, 2) * (Math.pow(ap.i * bp.k - bp.i, 2) + Math.pow(ap.j * bp.k - bp.j, 2));
	return distab >= distapbp;
}