TestScene.prototype = new Scene();
TestScene.prototype.constructor = Scene;

function TestScene(name) {
	this.DEBUG_DRAW = false;
	this.debugOptions = false;

	Scene.call(this, name);

	this.setupTest();
}

TestScene.prototype.setupTest = function() {
	var position = new Vector(50, 50);
	var velocity = new Vector(20, 20);
	var test = new PointObject(position, velocity, 200);
	this.addObject(test);
}
