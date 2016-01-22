CollisionSystem.prototype = new System();
CollisionSystem.prototype.constructor = CollisionSystem;

/*
	CollisionSystem detects collisions between different entities with a PhysicsBody and a Transform.
*/
function CollisionSystem(collisionHandler) {
	System.call(this, [PhysicsBody.type, Transform.type]);

	//level, startBounds, endBounds
	this.quadtree = new Quadtree(0, new Rect(0, 0, 800, 600));
	this.entities = [];

	this.collisionHandler = collisionHandler;
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

		if (this.collisionHandler != null) {
			this.collisionHandler.handleCollisionEvent(event);
		}
		else {
			scene.removeEntity(event.entity1);
			scene.removeEntity(event.entity2);
		}
	}
}

/* assumes everything is a CircleBody for now */
CollisionSystem.prototype.checkCollision = function(e1, e2) {
	var physics1 = e1.components[PhysicsBody.type];
	var transform1 = e1.components[Transform.type];

	var physics2 = e2.components[PhysicsBody.type];
	var transform2 = e2.components[Transform.type];

	var circleTransform = null;
	var lineBody = null;

	if (physics1.bodyType == "circle") {
		circleTransform = transform1;
	}
	if (physics1.bodyType == "line") {
		lineBody = physics1;
	}
	if (physics2.bodyType == "circle") {
		circleTransform = transform2;
	}
	if (physics2.bodyType == "line") {
		lineBody = physics2;
	}

	if (circleTransform != null && lineBody != null) {
		/* comparing a line and a circle! */
		/* http://stackoverflow.com/questions/1073336/circle-line-segment-collision-detection-algorithm */
		var d = new Vector(lineBody.l.x - lineBody.e.x, lineBody.l.y - lineBody.e.y);
		var f = new Vector(lineBody.e.x - circleTransform.position.x, lineBody.e.y - circleTransform.position.y);

		var a = d.dot(d);
		var b = 2 * f.dot(d);
		var c = f.dot(f) - circleTransform.scale.x * circleTransform.scale.x;

		var discriminant = b * b - 4 * a * c;

		if (discriminant < 0) {
			//no intersection for sure
			return false;
		}

		discriminant = Math.sqrt(discriminant);
		
		var t1 = (-b - discriminant) / (2 * a);
		var t2 = (-b + discriminant) / (2 * a);

		if (t1 >= 0 && t1 <= 1) {
			return true;
		}

		if (t2 >= 0 && t2 <= 1) {
			return false;
		}

		return false;
	}
	else {
		/* treat as circle and a circle */	
		//calculate distance between centers
		var distanceSquared = 	(transform1.position.x - transform2.position.x) * (transform1.position.x - transform2.position.x) +
								(transform1.position.y - transform2.position.y) * (transform1.position.y - transform2.position.y);

		var scale1 = transform1.scale.y / 2;
		var scale2 = transform2.scale.y / 2;
		var radiusSquared = (scale1 + scale2) * (scale1 + scale2);

		if (radiusSquared >= distanceSquared) {
			return true;
		}
		else {
			return false;
		}
	}
}

function CollisionEvent(entity1, entity2) {
	this.entity1 = entity1;
	this.entity2 = entity2;
}
