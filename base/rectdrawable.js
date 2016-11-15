RectDrawable.prototype = new Drawable();
RectDrawable.prototype.constructor = RectDrawable;

function RectDrawable(rect) {
	Drawable.call(this);

	if (rect == null) {
		this.rect = new Rect(-0.5, -0.5, 1, 1);
	}
	else {
		this.rect = rect;
	}

	this.strokeColor = "#0ff";
	this.fillColor = "#f00";
	this.lineWidth = "0";
}

RectDrawable.prototype.draw = function(context) {
	context.fillStyle = this.fillColor;
	context.strokeStyle = this.strokeColor;
	context.lineWidth = this.lineWidth;

	context.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
	context.strokeRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
}
