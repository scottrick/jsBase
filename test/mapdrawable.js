MapDrawable.prototype = new Drawable();
MapDrawable.prototype.constructor = MapDrawable;

function MapDrawable(map, rect) {
	Drawable.call(this);

	this.map = map;

	if (rect == null) {
		this.rect = new Rect(-0.5, -0.5, 1, 1);
	}
	else {
		this.rect = rect;
	}

	this.tileSize = 40;
	this.drawOffsetX = this.map.width / 2;
	this.drawOffsetY = this.map.height / 2;
}

MapDrawable.prototype.draw = function(context) {
	var numDrawX = this.rect.w / this.tileSize;
	var numDrawY = this.rect.h / this.tileSize;

	for (var x = this.drawOffsetX; x < this.drawOffsetX + numDrawX; x++) {
		for (var y = this.drawOffsetY; y < this.drawOffsetY + numDrawY; y++) {
			var tile = this.map.getTile(x, y);

			if (tile == null) {
				continue;
			}

			var startX = (x - this.drawOffsetX) * this.tileSize;
			var startY = (y - this.drawOffsetY) * this.tileSize;

			context.fillStyle = tile.getColor();
			context.fillRect(startX, startY, this.tileSize, this.tileSize);

			context.strokeStyle = "#000";
			context.lineWidth = 0.2;
			context.strokeRect(startX, startY, this.tileSize, this.tileSize);
		}
	}
}
