TestScene.prototype = new Scene();
TestScene.prototype.constructor = TestScene;

function TestScene(game) {
	Scene.call(this, game);

	this.dumpDelay = 1;
    this.slowMotionSpeed = 0.05;

	this.setupTest();
}

TestScene.prototype.setupTest = function() {
	var collisionSystem = new CollisionSystem();
	this.addSystem(new MovementSystem());
	// this.addSystem(new TestSystem());
	this.addSystem(collisionSystem);
	this.addSystem(new SpawnSystem());

	var boomSize = 8;

	var quadtreeEntity = new Entity("quadtree drawable entity");
	var quadtreeDrawable = new QuadtreeDrawable(collisionSystem.quadtree);
	quadtreeEntity.addComponent(quadtreeDrawable);
	quadtreeEntity.addComponent(new Transform());
	this.addEntity(quadtreeEntity);

	var testEntity = new Entity("testEntity");
	var transform = new Transform(new Vector(300, 300), new Vector(200, 200), -10);
	var movement = new Movement(new Vector(4, 4), new Vector(2, 2), -40);
	var drawable = new Drawable();
	var body = new CircleBody();

	testEntity.addComponent(transform);
	testEntity.addComponent(movement);
	testEntity.addComponent(drawable);
	testEntity.addComponent(body);
	testEntity.addComponent(new TestComponent(2.5, boomSize));

	var transform2 = new Transform(new Vector(700, 300), new Vector(150, 150), 9);
	var movement2 = new Movement(null, new Vector(-40, 0), 0, 1);
	var body2 = new CircleBody();
	var anotherEntity = new Entity("testEntity2");
	anotherEntity.addComponent(transform2);
	anotherEntity.addComponent(movement2);
	anotherEntity.addComponent(body2);
	anotherEntity.addComponent(new TestComponent(1.5, boomSize));
	anotherEntity.addComponent(new Drawable());

	this.addEntity(testEntity);
	this.addEntity(anotherEntity);

	for (var i = 20; i <= 800; i += 50) {
		var s = new Entity("spawnerx+" + i);
		s.addComponent(new Transform(new Vector(i, 600), new Vector(24, 24)));
		s.addComponent(new Drawable());
		s.addComponent(new Spawner(new Vector(0.0, -1.5), .1));
		this.addEntity(s);
	}

	for (var i = 20; i <= 600; i += 30) {
		var s = new Entity("spawnery+" + i);
		s.addComponent(new Transform(new Vector(0, i), new Vector(24, 24)));
		s.addComponent(new Drawable());
		s.addComponent(new Spawner(new Vector(1.5, 0), .1));
		this.addEntity(s);
	}
}
