PhysicsBody.prototype = new Component();
PhysicsBody.prototype.constructor = PhysicsBody;

PhysicsBody.type = "physicsbody";

/*
	A PhysicsBody is a component that represents an entity's physical aspects.
*/
function PhysicsBody() {
	Component.call(this, PhysicsBody.type);
}

PhysicsBody.prototype.isFullyContainedIn = function(transform, rect) {

}

