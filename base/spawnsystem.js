SpawnSystem.prototype = new System();
SpawnSystem.prototype.constructor = SpawnSystem;

/*
	SpawnSystem handles spawning new entities.
*/
function SpawnSystem() {
	System.call(this, [Spawner.type, Transform.type]);
}

SpawnSystem.prototype.handleEntity = function(scene, entity, deltaTime) {
	var spawner = entity.components[Spawner.type];
	var transform = entity.components[Transform.type];

	spawner.currentDelay -= deltaTime;

	while (spawner.currentDelay <= 0) {
		spawner.currentDelay += spawner.delay;

		//spawn
		var testEntity = new Entity("spawned entity");
		var velocity = spawner.direction.copy();
		velocity.multiply(240);

		var movement = new Movement(velocity);
		var drawable = new Drawable();
		var body = new CircleBody();

		var scale = Math.random() * 20 + 2;

		testEntity.addComponent(new Transform(transform.position.copy(), new Vector(scale, scale)));
		testEntity.addComponent(movement);
		testEntity.addComponent(drawable);
		testEntity.addComponent(body);

		scene.addEntity(testEntity);
	}
}
