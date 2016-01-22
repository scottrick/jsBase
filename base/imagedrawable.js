ImageDrawable.prototype = new Drawable();
ImageDrawable.prototype.constructor = ImageDrawable;

function ImageDrawable(image, rect) {
	Drawable.call(this);

	if (rect == null) {
		this.rect = new Rect(-0.5, -0.5, 1, 1);
	}
	else {
		this.rect = rect;
	}

	this.image = image;
}

ImageDrawable.prototype.toString = function() {
	return "ImageDrawable[" + this.image + "]";
}

ImageDrawable.prototype.draw = function(context) {
	if (this.rect.w < 0 || this.rect.h < 0) {
		console.log("ImageDrawable: Invalid width or height.");
	}
	else {
		context.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.rect.x, this.rect.y, this.rect.w, this.rect.h);
	}
}
