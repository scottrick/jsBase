PolygonObject.prototype = new GameObject();
PolygonObject.prototype.constructor = GameObject;

function PolygonObject(points, fillColor, strokeColor) {
	GameObject.call(this);

	this.collisionType = COLLISION_TYPE_POLYGON;

    this.points = points;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
}

PolygonObject.prototype.update = function(deltaTime, scene) {

};

PolygonObject.prototype.draw = function(context) {
	context.fillStyle = this.fillColor;
	context.strokeStyle = this.strokeColor;

	context.beginPath();
	context.moveTo(this.points[0].x, this.points[0].y);

	for (var i = 1; i < this.points.length; i++) {
		context.lineTo(this.points[i].x, this.points[i].y);
	}

	context.lineTo(this.points[0].x, this.points[0].y);
	context.fill();
	context.stroke();
};
