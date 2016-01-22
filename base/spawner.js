Spawner.prototype = new Component();
Spawner.prototype.constructor = Spawner;

Spawner.type = "spawner";

function Spawner(direction, delay, monster) {
	Component.call(this, Spawner.type);

	this.direction = direction;
	this.delay = delay;
	this.currentDelay = delay;

	this.monster = monster;
}
