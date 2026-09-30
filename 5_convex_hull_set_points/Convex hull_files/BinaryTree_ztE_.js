class BinaryTree {
	/**
	 * 
	 * @param {Point[]} objects 
	 */
	constructor(objects = []) {
		this.root = null;
		if (objects) this.root = new BinaryTreeNode(objects);

		this.CHmade = false;
	}

	/**
	 * 
	 * @param {BinaryTreeNode} node
	 * @returns {Boolean} Returns false if already have the leaves, otherwise returns true
	 * @description If children nodes are empty, it creates them with the current state splitted in two.
	 * Otherwise it tries to divide its childrens
	 */
	__divide__(node) {
		if (node.points.length == 1) return false; // Base case, can't split more

		if (!node.left && !node.right) {
			const n = node.points.length;
			const m = n / 2;
			node.left = new BinaryTreeNode(node.points.slice(0, m));
			node.right = new BinaryTreeNode(node.points.slice(m, n));
			return true;
		}

		let left = this.__divide__(node.left);
		let right = this.__divide__(node.right);
		return left || right;
	}

	/**
	 * 
	 * @returns {Boolean} Returns false if already have the leaves, otherwise returns true
	 * @description Divides the leaves of the tree if possible (leave.points.length > 1)
	 */
	divide() {
		return this.__divide__(this.root);
	}

	/**
	 * 
	 * @param {BinaryTreeNode} node
	 * @description If children nodes are merged, it merges them at ch.
	 * Otherwise it tries to merge its childrens
	 */
	__merge__(node) {
		if (node.points.length == 1) {
			node.ch = [...node.points];
		}
		else if (node.left.ch.length != 0 && node.right.ch.length != 0) {
			if (node.left.ch.length + node.right.ch.length < 6) {
				if (node.left.ch.length + node.right.ch.length < 3) {
					node.ch = node.left.ch.concat(node.right.ch);
				} else {
					node.ch = DivideAndConquer.baseCase(node.left.ch.concat(node.right.ch));
				}
			} else {
				node.ch = DivideAndConquer.merge(node.left.ch, node.right.ch);
			}
		} else {
			if (node.left.ch.length == 0) this.__merge__(node.left);
			if (node.right.ch.length == 0) this.__merge__(node.right);
		}
	}

	/**
	 * 
	 * @description Merges the last merged children (if none merges the leaves)
	 */
	merge() {
		this.CHmade = true;
		this.__merge__(this.root);
	}
}

class BinaryTreeNode {
	/**
	 * 
	 * @param {Point[]} points 
	 */
	constructor(points = []) {
		this.points = points;
		this.color = myCanvas.buffer.color(random(255), random(255), random(255));
		this.ch = [];
		this.left = null;
		this.right = null;
	}
}