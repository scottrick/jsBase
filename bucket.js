function Bucket(start, size) {
	this.start = start;
	this.size = size;

	this.objects = [];
}

Bucket.prototype.add = function(object) {
	this.objects.push(object);
}

Bucket.prototype.remove = function(object) {
	var index = this.objects.indexOf(object);

	if (index >= 0) {
    	this.objects.splice(index, 1);
	}
}

Bucket.prototype.containsPoint = function(point) {
	return this.containsCircle(point, 0);
}

Bucket.prototype.containsCircle = function(point, radius) {
	if (point.x + radius < this.start.x || this.start.x + this.size.x + radius < point.x) {
		return false;
	}

	if (point.y + radius < this.start.y || this.start.y + this.size.y + radius < point.y) {
		return false;
	}

	return true;
}

Bucket.prototype.containsLine = function(start, end) {

}

Bucket.prototype.draw = function(context) {
	if (this.objects.length > 0) {
		context.strokeStyle = "#0f0";
	}
	else {
		context.strokeStyle = "#020";
	}

	context.strokeRect(this.start.x, this.start.y, this.size.x, this.size.y);
}

Bucket.prototype.checkCollisions = function() {
	var checkCount = 0;

	for (var i = 0; i < this.objects.length; i++) {
		var objectOne = this.objects[i];

		for (var k = i + 1; k < this.objects.length; k++) {
			var objectTwo = this.objects[k];

			if (objectOne.didMove || objectTwo.didMove) {
				this.checkCollision(objectOne, objectTwo);
				checkCount++;
			}
		}
	}

	return checkCount;
}

Bucket.prototype.checkCollision = function(objectOne, objectTwo) {
	if (objectOne.collisionType == COLLISION_TYPE_CIRCLE && objectTwo.collisionType == COLLISION_TYPE_CIRCLE) {
		var xDist = objectOne.position.x - objectTwo.position.x;
		var yDist = objectOne.position.y - objectTwo.position.y;

		var distSquared = xDist * xDist + yDist * yDist;
		var radiusSquared = (objectOne.radius + objectTwo.radius) * (objectOne.radius + objectTwo.radius);

		if (distSquared < radiusSquared) {
			//there was a collision

			var d = Math.sqrt(distSquared);

			if (d < objectOne.radius - objectTwo.radius) {
				//circle inside the other
				return;
			}

			if (d == 0 && objectOne.radius == objectTwo.radius) {
				//circles are identical!
				return;
			}

			// a = (r02 - r12 + d2 ) / (2 d)
			var a = (objectOne.radius * objectOne.radius - objectTwo.radius * objectTwo.radius + distSquared) / (2 * d);

			var collisionX = objectOne.position.x + a * (objectTwo.position.x - objectOne.position.x) / d;
			var collisionY = objectOne.position.y + a * (objectTwo.position.y - objectOne.position.y) / d;

			var collisionPoint = new Vector(collisionX, collisionY);

			objectOne.collide(objectTwo, collisionPoint);
			objectTwo.collide(objectOne, collisionPoint);
		}
		else {
			//no collision!
			return;
		}
	}
	else if (objectOne.collisionType == COLLISION_TYPE_CIRCLE && objectTwo.collisionType == COLLISION_TYPE_POLYGON) {
		this.checkCircleAndPolygon(objectOne, objectTwo);
	}
	else if (objectOne.collisionType == COLLISION_TYPE_POLYGON && objectTwo.collisionType == COLLISION_TYPE_CIRCLE) {
		this.checkCircleAndPolygon(objectTwo, objectOne);
	}
}

Bucket.prototype.checkCircleAndPolygon = function(pointObject, polygonObject) {
	for (var i = 0; i < polygonObject.points.length; i++) {
		var seg_a = polygonObject.points[i];
		var seg_b = polygonObject.points[(i + 1) % polygonObject.points.length];
		var circle_pos = pointObject.position;

		var closest = this.closestPointOnSegmentToCircle(seg_a, seg_b, circle_pos);

		// dist_v = circ_pos - closest
		var dist_v = new Vector(circle_pos.x - closest.x, circle_pos.y - closest.y);

		var distance = dist_v.distance();

  		if (dist_v.distance() > pointObject.radius) {
  			//not colliding!
  			continue;
  		}

  		if (dist_v.distance() <= 0) {
  			continue;
  		}

		theSounds.getNextBounceSound().play();

  		//they collided!
  		//pass the collision vector
  		pointObject.collide(polygonObject, closest, new Vector(seg_b.x - seg_a.x, seg_b.y - seg_a.y));
  		return;
	}
}

Bucket.prototype.closestPointOnSegmentToCircle = function(seg_a, seg_b, circle_pos) {
	var seg_v  = new Vector(seg_b.x - seg_a.x, seg_b.y - seg_a.y);
	var pt_v = new Vector(circle_pos.x - seg_a.x, circle_pos.y - seg_a.y);

	 if (seg_v.distance() <= 0) {
	 	return;
	 }

	 var seg_v_unit = new Vector(seg_v.x, seg_v.y);
	 seg_v_unit.normalize();

	 var proj = pt_v.dot(seg_v_unit);

	 if (proj <= 0) {
	 	return seg_a;
	 }

	 if (proj >= seg_v.distance()) {
	 	return seg_b;
	 }

	var proj_v = new Vector(seg_v_unit.x * proj, seg_v_unit.y * proj);
	var closest = new Vector(proj_v.x + seg_a.x, proj_v.y + seg_a.y);
	return closest;
}


