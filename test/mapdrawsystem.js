MapDrawSystem.prototype = new System();
MapDrawSystem.prototype.constructor = MapDrawSystem;

/*
	MapDrawSystem handles drawing of entities on the map.  Entities are drawn if they have a MapTransform and a Drawable.
*/
function MapDrawSystem() {
	System.call(this, [MapTransform.type, Drawable.type]);
}

/* draw all of our entities on the given context */
DrawSystem.prototype.draw = function(context) {
	this.drawCount = 0;

	for (var i = 0, len = this.entities.length; i < len; i++) {
		if (this.entities[i].enabled) {
			this.drawEntity(context, this.entities[i]);
		}
	}
}

DrawSystem.prototype.drawEntity = function(context, entity) {
	this.drawCount++;

	var drawable = entity.components[Drawable.type];
	var transform = entity.components[Transform.type];

	context.save();
	context.globalAlpha = drawable.alpha;

	if (transform != null) {
		context.translate(transform.position.x, transform.position.y);
		context.rotate(Math.PI / 180 * transform.rotation);
		context.scale(transform.scale.x, transform.scale.y);
	}

	drawable.draw(context);
	context.restore();
}
