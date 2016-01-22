BoundarySystem.prototype = new System();
BoundarySystem.prototype.constructor = BoundarySystem;

/*
	The BoundarySystem removes entities with transforms that are way off screen
*/
function BoundarySystem(boundary) {
	System.call(this, [Transform.type]);

	this.boundary = boundary;
}		

BoundarySystem.prototype.handleEntity = function(scene, entity, deltaTime) {
	var transform = entity.components[Transform.type];

	if (transform.position.x + Math.abs(transform.scale.x) * 0.5 < this.boundary.x) {
		scene.removeEntity(entity);
		return;
	}

	if (transform.position.x - Math.abs(transform.scale.x) * 0.5 > this.boundary.x + this.boundary.w) {
		scene.removeEntity(entity);
		return;
	}

	if (transform.position.y + Math.abs(transform.scale.y) * 0.5 < this.boundary.y) {
		scene.removeEntity(entity);
		return;
	}

	if (transform.position.y - Math.abs(transform.scale.y) * 0.5 > this.boundary.y + this.boundary.h) {
		scene.removeEntity(entity);
		return;
	}
}
