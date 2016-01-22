VectorDrawable.prototype = new Drawable();
VectorDrawable.prototype.constructor = RectDrawable;

function VectorDrawable(image, start, end, width) {
	Drawable.call(this);

	this.image = image;

	if (start == null) {
		this.start = new Vector();
	}
	else {
		this.start = start;
	}

	if (end == null) {
		this.end = new Vector(32, 32);
	}
	else {
		this.end = end;
	}

	if (width == null) {
		this.width = 24;
	}
	else {
		this.width = width;
	}
}

VectorDrawable.prototype.draw = function(context) {
	var xPart = (this.end.x - this.start.x) * (this.end.x - this.start.x);
	var yPart = (this.end.y - this.start.y) * (this.end.y - this.start.y);
	var length = Math.sqrt(xPart + yPart);

	var angle = Math.atan2(this.end.y - this.start.y, this.end.x - this.start.x);

	context.translate(this.start.x, this.start.y);
	context.rotate(angle);
	context.scale(length, this.width);

	context.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0.0, -0.5, 1.0, 1.0);
}
