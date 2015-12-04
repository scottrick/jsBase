DrawSystem.prototype = new System();
DrawSystem.prototype.constructor = DrawSystem;

/*
	DrawSystem handles basic drawing.  Entities can be drawn if they have a Drawable and a Transform. 
*/
function DrawSystem() {
	System.call(this, [Drawable.type, Transform.type]);

	/* we keep our own z-sorted list of entities we need to draw */
	this.entities = [];
}

DrawSystem.prototype.addEntities = function(entities) {
	for (var i = 0, len = entities.length; i < len; i++) {
		var entity = entities[i];
		var drawable = entity.components[Drawable.type];
		var transform = entity.components[Transform.type];
		entity.zCache = drawable.z + transform.z;

		this.entities.push(entity);
	}

	/* sort drawables array */
	this.entities.sort(sort);
}

var sort = function(a, b) {
	if (a.zCache === b.zCache) {
		return a.uuid - b.uuid;
	}

	if (a.zCache < b.zCache) {
		return -1;
	}

	return 1;
};

DrawSystem.prototype.removeEntity = function(entity) {
	var removeIndex = this.entities.indexOf(entity);

	if (removeIndex >= 0) {
    	this.entities.splice(removeIndex, 1);
	}
}

/* draw all of our entities on the given context */
DrawSystem.prototype.draw = function(context) {
	this.drawCount = 0;

	for (var i = 0, len = this.entities.length; i < len; i++) {
		this.drawEntity(context, this.entities[i]);
	}
}

DrawSystem.prototype.drawEntity = function(context, entity) {
	this.drawCount++;

	var drawable = entity.components[Drawable.type];
	var transform = entity.components[Transform.type];

	context.save();
	context.globalAlpha = drawable.alpha;
	context.translate(transform.position.x, transform.position.y);
	context.rotate(Math.PI / 180 * transform.rotation);
	context.scale(transform.scale.x, transform.scale.y);

	drawable.draw(context);
	context.restore();
}
