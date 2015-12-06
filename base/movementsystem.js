MovementSystem.prototype = new System();
MovementSystem.prototype.constructor = MovementSystem;

/*
	The MovementSystem handles moving entities that have movement and transform components.
*/
function MovementSystem() {
	System.call(this, [Movement.type, Transform.type]);
}

MovementSystem.prototype.updateEntity = function(scene, entity, deltaTime) {
	var transform = entity.components[Transform.type];
	var movementComponent = entity.components[Movement.type];

	transform.position.x += movementComponent.velocity.x * deltaTime;
	transform.position.y += movementComponent.velocity.y * deltaTime;
	transform.rotation += movementComponent.angularVelocity * deltaTime;

	movementComponent.velocity.x += movementComponent.acceleration.x * deltaTime;
	movementComponent.velocity.y += movementComponent.acceleration.y * deltaTime;
	movementComponent.angularVelocity += movementComponent.angularAcceleration * deltaTime;
}
