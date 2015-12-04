Movement.prototype = new Component();
Movement.prototype.constructor = Movement;

Movement.type = "movement";

/* 
	Vec2 velocity
	Vec2 acceleration
	float angularVelocity
	float angularAcceleration

	angles in degrees
*/
function Movement(velocity, acceleration, angularVelocity, angularAcceleration) {
	Component.call(this, Movement.type);

	if (velocity != null) {
		this.velocity = velocity;
	}
	else {
		this.velocity = new Vector(0, 0);
	}

	if (acceleration != null) {
		this.acceleration = acceleration;
	}
	else {
		this.acceleration = new Vector(0, 0);
	}

	if (angularVelocity != null) {
		this.angularVelocity = angularVelocity;
	}
	else {
		this.angularVelocity = 0;
	}

	if (angularAcceleration != null) {
		this.angularAcceleration = angularAcceleration;
	}
	else {
		this.angularAcceleration = 0;
	}
}

Movement.prototype.toString = function() {
	return this.type + "[v=" + this.velocity + " a=" + this.acceleration + " av=" + this.angularVelocity + " aa=" + angularAcceleration + "]";
}
