RectangleObject.prototype = new PolygonObject();
RectangleObject.prototype.constructor = PolygonObject;

function RectangleObject(start, size, fillColor, strokeColor) {
	var points = [];
	points.push(new Vector(start.x, start.y));
	points.push(new Vector(start.x + size.x, start.y));
	points.push(new Vector(start.x + size.x, start.y + size.y));
	points.push(new Vector(start.x, start.y + size.y));

	PolygonObject.call(this, points, fillColor, strokeColor);
}
