Transform.prototype = new Component();
Transform.prototype.constructor = Transform;

Transform.type = "transform";

/*
	vec2 position
	vec2 scale
	angle in degrees rotation
	z is zOrdering value
*/
function Transform(position, scale, rotation, z) {
	Component.call(this, Transform.type);

	if (position != null) {
		this.position = position;
	}
	else {
		this.position = new Vector(0, 0);
	}

	if (scale != null) {
		this.scale = scale;
	}
	else {
		this.scale = new Vector(1, 1);
	}

	if (rotation != null) {
		this.rotation = rotation;
	}
	else {
		this.rotation = 0;
	}

	if (z != null) {
		this.z = z;
	}
	else {
		this.z = 0;
	}
}

Transform.prototype.toString = function() {
	return this.type + "[p=" + this.position + " s=" + this.scale + " r=" + this.rotation + "z=" + this.z + "]";
}
