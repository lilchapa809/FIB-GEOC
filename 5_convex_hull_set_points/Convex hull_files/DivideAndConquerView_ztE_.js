class DivideAndConquerView {
	/**
	 * 
	 * @param {Buffer} buffer Buffer where the objects are going to be drawn
	 * @description Draws points and lines to the buffer at the step-by-step visualization
	 */
	static show(buffer) {
		if (!DivideAndConquer.state.tree.CHmade) this.showPoints(buffer, DivideAndConquer.state.tree.root);
		else this.showCH(buffer, DivideAndConquer.state.tree.root);
	}

	/**
	 * 
	 * @param {Buffer} buffer 
	 * @param {BinaryTreeNode} node
	 * @description Shows the leaf nodes with their colors
	 */
	static showPoints(buffer, node) {
		if (node.points.length == 1) node.points[0].show(buffer, node.color, false);
		else {
			if (node.left) this.showPoints(buffer, node.left);
			else {
				for (let p of node.points) {
					p.show(buffer, node.color, false);
				}
			}

			if (node.right) this.showPoints(buffer, node.right);
			else {
				for (let p of node.points) {
					p.show(buffer, node.color, false);
				}
			}
		}
	}

	/**
	 * 
	 * @param {Buffer} buffer 
	 * @param {BinaryTreeNode} node
	 * @description Shows the leaf nodes with their colors
	 */
	static showCH(buffer, node) {
		if (node.ch.length == 0) {
			this.showCH(buffer, node.left);
			this.showCH(buffer, node.right);
		} else {
			for (let p of node.points) {
				p.show(buffer, node.color, false);
			}

			let lines = ConvexHull.__constructCH__(node.ch);
			for (let l of lines) {
				l.show(buffer, node.color, false);
			}
		}
	}
}