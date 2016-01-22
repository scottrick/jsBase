QuadtreeDrawable.prototype = new Drawable();
QuadtreeDrawable.prototype.constructor = QuadtreeDrawable;

function QuadtreeDrawable(quadtree) {
	Drawable.call(this);

	this.quadtree = quadtree;
	this.z = -100;
}

QuadtreeDrawable.prototype.toString = function() {
	return "QuadtreeDrawable[" + this.quadtree + "]";
}

QuadtreeDrawable.prototype.draw = function(context) {
	QuadtreeDrawable.drawQuad(this.quadtree);
}

QuadtreeDrawable.drawQuad = function(quadtree) {
	context.beginPath();
	context.strokeStyle = "#00c";
	context.lineWidth = 1;
	context.rect(quadtree.bounds.x, quadtree.bounds.y, quadtree.bounds.w, quadtree.bounds.h);
	context.stroke();

	for (var i = 0; i < quadtree.nodes.length; i++) {
		QuadtreeDrawable.drawQuad(quadtree.nodes[i]);
	}
}
