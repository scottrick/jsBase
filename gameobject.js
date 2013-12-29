var COLLISION_TYPE_UNKNOWN = 0;
var COLLISION_TYPE_POINT = 1;
var COLLISION_TYPE_CIRCLE = 2;
var COLLISION_TYPE_POLYGON = 3;
var COLLISION_TYPE_NONE = 4;

function GameObject() {
	this.isDead = false;
	this.removeWhenDead = true;
	this.shouldDraw = true;
	this.didMove = false;
	this.collisionType = COLLISION_TYPE_UNKNOWN;
}

GameObject.prototype.update = function(deltaTime, scene) {

};

GameObject.prototype.draw = function(context) {

};

GameObject.prototype.onDeath = function() {

}