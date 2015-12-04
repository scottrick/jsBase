/* 
	System

	A system operates on entities that contain the required components.
*/

/* types is a list of the required component types */
function System(types) {
	this.types = types;
	this.enabled = true;
};

System.prototype.checkEntity = function(entity) {
	for (var i = 0, len = this.types.length; i < len; i++) {
		var type = this.types[i];

		var component = entity.components[type];
		if (component == null) {
			return false;
		}
	}

	return true;
}

/* override this function in your custom systems */
System.prototype.updateEntity = function(scene, entity, deltaTime) {
	console.log("Entity updateEntity default function: " + this.types);
}

System.prototype.isEnabled = function() {
	return this.enabled;
}
