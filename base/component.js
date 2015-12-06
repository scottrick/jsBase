/* 
	Component 

	A component is something that makes up an entity.
*/
var Component = function(type) {
  this.type = type;
};

Component.prototype.getType = function() {
	return this.type;
};

Component.prototype.dump = function() {
	console.log("Component [" + this.type + "]");
};

Component.prototype.toString = function() {
	return this.type;
}
