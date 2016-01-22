/*
	Simple 2 dimensional vector class.
*/
function Vector(x, y) {
	if (x != null) {
		this.x = x;
	}
	else {
		this.x = 0;
	}

	if (y != null) {
		this.y = y;
	}
	else {
		this.y = 0;
	}
}

Vector.prototype.multiply = function(value) {
	this.x *= value;
	this.y *= value;

	return this;
}

Vector.prototype.add = function(value) {
	this.x += value;
	this.y += value;

	return this;
}

Vector.prototype.distance = function()  {
	return Math.sqrt(this.x * this.x + this.y * this.y);
}

Vector.prototype.normalize = function() { 
	var distance = this.distance();

	this.x = this.x / distance;
	this.y = this.y / distance;

	return this;
}

Vector.prototype.dot = function(vec) {
	return this.x * vec.x + this.y * vec.y;
}

Vector.prototype.copy = function() {
    return new Vector(this.x, this.y);
}

Vector.prototype.toString = function() {
	return "(" + this.x + ", " + this.y + ")";
}
