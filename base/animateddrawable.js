AnimatedDrawable.prototype = new ImageDrawable();
AnimatedDrawable.prototype.constructor = AnimatedDrawable;

AnimatedDrawable.switchTime = 0.3;

function AnimatedDrawable(images, rect) {
	Drawable.call(this);

	if (rect == null) {
		this.rect = new Rect(-0.5, -0.5, 1, 1);
	}
	else {
		this.rect = rect;
	}

	this.images = images;
	this.imageIndex = 0;

	this.timeToNextImage = Math.random() * AnimatedDrawable.switchTime;
}

AnimatedDrawable.prototype.nextImage = function() {
	this.imageIndex++;
	this.imageIndex = this.imageIndex % this.images.length;
	this.timeToNextImage += AnimatedDrawable.switchTime;
}

AnimatedDrawable.prototype.toString = function() {
	return "AnimatedDrawable[" + this.images + "]";
}

AnimatedDrawable.prototype.draw = function(context) {
	var image = this.images[this.imageIndex];
	context.drawImage(image, 0, 0, image.width, image.height, this.rect.x, this.rect.y, this.rect.w, this.rect.h);
}
