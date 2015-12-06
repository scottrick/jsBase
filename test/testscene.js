TestScene.prototype = new Scene();
TestScene.prototype.constructor = TestScene;

function TestScene(game) {
	Scene.call(this, game);

	this.dumpDelay = 0.25;
    this.slowMotionSpeed = 0.2;

	this.setupTest();
}

TestScene.prototype.setupTest = function() {
	this.addSystem(new MovementSystem());
	this.addSystem(new TestSystem());

	var boomSize = 20;

	var testEntity = new Entity("testEntity");
	var transform = new Transform(new Vector(300, 300), new Vector(200, 200), -10);
	var movement = new Movement(new Vector(4, 4), new Vector(2, 2), -40);
	var drawable = new Drawable();

	testEntity.addComponent(transform);
	testEntity.addComponent(movement);
	testEntity.addComponent(drawable);
	testEntity.addComponent(new TestComponent(2.5, boomSize));

	var transform2 = new Transform(new Vector(400, 300), new Vector(150, 150), 9);
	var movement2 = new Movement(null, null, 0, 1);
	var anotherEntity = new Entity("testEntity2");
	anotherEntity.addComponent(transform2);
	anotherEntity.addComponent(movement2);
	anotherEntity.addComponent(new TestComponent(1.5, boomSize));

	var imageDrawable = new ImageDrawable(this.game.getImages().getDefaultImage());
	imageDrawable.alpha = 0.75;
	anotherEntity.addComponent(imageDrawable);

	this.addEntity(testEntity);
	this.addEntity(anotherEntity);
}
