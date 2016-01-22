LineBody.prototype = new PhysicsBody();
LineBody.prototype.constructor = LineBody;

/*
	A LineBody is a component that represents a line.
*/
function LineBody(start, end) {
	PhysicsBody.call(this);

	this.bodyType = "line";

	this.e = start;
	this.l = end;
}

LineBody.prototype.isFullyContainedIn = function(transform, rect) {
	return false;
}
