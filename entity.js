/* 
	Entity

	An entity is a collection of components.
*/

var Entity = function(name) {
  	this.name = name;
	this.components = [];
};

Entity.prototype.getName = function() {
	return this.name;
};

Entity.prototype.addComponent = function(component) {
	if (this.components.indexOf(component) >= 0) {
		return;
	}

	this.components.push(component);
};

/* returns the first component with this type */
Entity.prototype.getComponentByType = function(type) {
	for (var i = 0; i < this.components.length; i++) {
		component = this.components[i];
		if (component.type == type) {
			return component;
		}
	}

	return null;
}

/* returns a list of components with this type */
Entity.prototype.getComponentsByType = function(type) {
	var results = [];

	for (var i = 0; i < this.components.length; i++) {
		component = this.components[i];
		if (component.type == type) {
			results.push(type);
		}
	}

	return results;
}

Entity.prototype.dump = function() {
	console.log("Entity [" + this.name + "]");
	console.log("  Components: " + this.components);
};
