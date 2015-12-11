CircleBody.prototype = new PhysicsBody();
CircleBody.prototype.constructor = CircleBody;

/*
	A PhysicsBody is a component that represents an entity's physical aspects.
*/
function CircleBody() {
	PhysicsBody.call(this);
}

CircleBody.prototype.isFullyContainedIn = function(transform, rect) {
	var result = 
		transform.position.x - transform.scale.x > rect.x &&
		transform.position.x + transform.scale.x < rect.x + rect.w &&

		transform.position.y - transform.scale.y > rect.y &&
		transform.position.y + transform.scale.y < rect.y + rect.h;

	return result;
}
