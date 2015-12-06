ImageDrawable.prototype = new Drawable();
ImageDrawable.prototype.constructor = ImageDrawable;

function ImageDrawable(image) {
	Drawable.call(this);

	this.image = image;
}

ImageDrawable.prototype.toString = function() {
	return "ImageDrawable[" + this.image + "]";
}

ImageDrawable.prototype.draw = function(context) {
	context.drawImage(this.image, 0, 0, this.image.width, this.image.height, -0.5, -0.5, 1, 1);
}
