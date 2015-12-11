CollisionSystem.prototype = new System();
CollisionSystem.prototype.constructor = CollisionSystem;

/*
	CollisionSystem detects collisions between different entities with a PhysicsBody and a Transform.
*/
function CollisionSystem() {
	System.call(this, [PhysicsBody.type, Transform.type]);

	//level, startBounds, endBounds
	this.quadtree = new Quadtree(0, new Rect(0, 0, 800, 600));
	this.entities = [];
}

CollisionSystem.prototype.handleEntity = function(scene, entity, deltaTime) {
	this.quadtree.insert(entity);
	this.entities.push(entity);
	entity.collisions = [];
}

CollisionSystem.prototype.frameWorkStart = function(scene, deltaTime) {
	this.quadtree.clear();
	this.entities = [];
}

CollisionSystem.prototype.frameWorkEnd = function(scene, deltaTime) {
	/* check for collisions */
	var collisionEvents = [];
	var checkEntities = [];
	var length = this.entities.length;
	var checkLength = 0;

	for (var i = 0; i < length; i++) {
		checkEntities = [];
		var entity = this.entities[i];

		this.quadtree.retrieve(checkEntities, entity);

		checkLength = checkEntities.length;
		for (var e = 0; e < checkLength; e++) {
			var checkEntity = checkEntities[e];

			if (entity.collisions.length > 0) {
				/* already found collisions for this entity, so lets make sure we aren't making a duplicate collision */
				var index = entity.collisions.indexOf(checkEntity);

				if (index >= 0) {
					continue;
				}
			}

			if (entity != checkEntity) {
				/* only check if they aren't the same entity! */
				if (this.checkCollision(entity, checkEntity)) {
					entity.collisions.push(checkEntity);
					checkEntity.collisions.push(entity);

					collisionEvents.push(new CollisionEvent(entity, checkEntity));
				}
			}
		}
	}

	for (var i = 0; i < collisionEvents.length; i++) {
		var event = collisionEvents[i];

		scene.removeEntity(event.entity1);
		scene.removeEntity(event.entity2);
	}
}

/* assumes everything is a CircleBody for now */
CollisionSystem.prototype.checkCollision = function(e1, e2) {
	// var physics1 = e1.components[PhysicsBody.type];
	var transform1 = e1.components[Transform.type];

	// var physics2 = e2.components[PhysicsBody.type];
	var transform2 = e2.components[Transform.type];

	//calculate distance between centers
	var distanceSquared = 	(transform1.position.x - transform2.position.x) * (transform1.position.x - transform2.position.x) +
							(transform1.position.y - transform2.position.y) * (transform1.position.y - transform2.position.y);

	var scale1 = transform1.scale.x / 2;
	var scale2 = transform2.scale.x / 2;
	var radiusSquared = (scale1 + scale2) * (scale1 + scale2);

	if (radiusSquared >= distanceSquared) {
		return true;
	}
	else {
		return false;
	}
}

function CollisionEvent(entity1, entity2) {
	this.entity1 = entity1;
	this.entity2 = entity2;
}
