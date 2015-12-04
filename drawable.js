Drawable.prototype = new Component();
Drawable.prototype.constructor = Drawable;

Drawable.type = "drawable";

/*
	A Drawable is a component that can be drawn on the canvas.

	Subclasses should override the draw function.
*/
function Drawable() {
	Component.call(this, Drawable.type);

	this.alpha = 1.0;
	this.z = 0;
}

Drawable.prototype.draw = function(context) {
	/* default draw code */
	context.beginPath();

	/* default color */
	context.fillStyle = "#a0a";

	/* draw a 1x1 rectangle */
	context.rect(-0.5, -0.5, 1, 1);

	context.fill();
}
