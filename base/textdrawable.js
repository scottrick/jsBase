TextDrawable.prototype = new Drawable();
TextDrawable.prototype.constructor = TextDrawable;

function TextDrawable(text) {
	Drawable.call(this);

	this.text = text;
	this.alignment = "left";

	this.font = "14px Courier";
	this.fontColor = "#ddd";

	this.shouldOutline = true;
	this.outlineColor = "#000";
	this.outlineWidth = "4";
}

TextDrawable.prototype.toString = function() {
	return "TextDrawable[" + this.text + "]";
}

TextDrawable.prototype.draw = function(context) {
	context.textAlign = this.alignment;
	context.font = this.font;
	context.fillStyle = this.fontColor;

	if (this.shouldOutline) {
		context.strokeStyle = this.outlineColor;
		context.lineWidth = this.outlineWidth;
		context.strokeText(this.text, 0, 0);
	}

	context.fillText(this.text, 0, 0);
}
