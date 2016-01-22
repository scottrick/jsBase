ImageDataDrawable.prototype = new Drawable();
ImageDataDrawable.prototype.constructor = ImageDataDrawable;

function ImageDataDrawable(data, upperLeft) {
	Drawable.call(this);

	if (upperLeft == null) {
		this.upperLeft = new Vector(0, 0);
	}
	else {
		this.upperLeft = upperLeft;
	}

	this.data = data;
}

ImageDataDrawable.prototype.toString = function() {
	return "ImageDataDrawable[" + this.data + "]";
}

ImageDataDrawable.prototype.draw = function(context) {
	context.putImageData(this.data, this.upperLeft.x, this.upperLeft.y);
}
