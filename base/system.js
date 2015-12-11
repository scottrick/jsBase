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
System.prototype.handleEntity = function(scene, entity, deltaTime) {

}

/* override this function in your custom systems */
System.prototype.frameWorkStart = function(scene, deltaTime) {

}

/* override this function in your custom systems */
System.prototype.frameWorkEnd = function(scene, deltaTime) {

}

System.prototype.isEnabled = function() {
	return this.enabled;
}
