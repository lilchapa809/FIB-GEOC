class DCELEdge {
	/**
	 * 
	 * @param {Point} orig_vertex 
	 * @param {Point} dest_vertex 
	 * @param {number} orig_index
	 * @param {number} dest_index
	 */
	constructor(orig_vertex = null, dest_vertex = null, orig_index = null, dest_index = null) {
		this.orig_vertex = orig_vertex;
		this.dest_vertex = dest_vertex;
		this.orig_index = orig_index;
		this.dest_index = dest_index;
	}

	/**
	 *
	 * @param {Buffer} buffer Buffer where the objects are going to be drawn
	 * @param {color} color Color of the points to be drawn
	 * @param {boolean} paint_point Paints the points
	 * @description Draws the edge to the buffer
	 */
	show(buffer, color, lightning, paint_point = false) {
		const line = new Line(this.orig_vertex.x, this.orig_vertex.y, this.dest_vertex.x, this.dest_vertex.y);
		line.show(buffer, color, lightning);
		if (paint_point) {
			this.orig_vertex.show(buffer, 'pink', false);
			this.dest_vertex.show(buffer, 'green', false);
		}
	}
}

class DCELVertex {
	/**
	 * 
	 * @param {Point} point 
	 * @param {number} next 
	 * @param {number} prev
	 * @param {boolean} real 
	 */
	constructor(point = null, next = null, prev = null, real = false) {
		this.point = point;
		this.next = next;
		this.prev = prev;
		this.real = real;
	}
}

class DCEL {
	/**
	 * 
	 * @param {number} n number of points of the CH
	 */
	constructor(n) {
		this.edges = [];
		this.vertexs = [];
		this.points = new Array(n);
	}
}