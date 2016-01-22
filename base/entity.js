/* 
	Entity

	An Entity is a collection of components.
	Each entity can only have one component of each type.
*/
function Entity(name) {
  	this.name = name;
	this.components = {};
	this.enabled = true; //if disabled, the entity will be ignored by the game

	this.uuid = Entity.nextUUID++;
};

Entity.nextUUID = 1;

Entity.prototype.getName = function() {
	return this.name;
};

Entity.prototype.addComponent = function(component) {
	if (component == null) {
		return;
	}

	this.components[component.type] = component;
};

Entity.prototype.dump = function() {
	console.log("Entity [" + this.name + "]");
	console.log("  Components: " + this.components);
};

Entity.prototype.toString = function() {
	return "Entity [" + this.name + "]";
}
