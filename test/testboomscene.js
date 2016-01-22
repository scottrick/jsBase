Test2Scene.prototype = new Scene();
Test2Scene.prototype.constructor = Test2Scene;

function Test2Scene(game) {
	Scene.call(this, game);

	this.dumpDelay = 1;
    this.slowMotionSpeed = 0.05;

	this.setupTest();
}

Test2Scene.prototype.setupTest = function() {
	var collisionSystem = new CollisionSystem(this);

	this.addSystem(new MovementSystem());
	this.addSystem(new TestSystem());
	this.addSystem(collisionSystem);
	this.addSystem(new BoundarySystem(new Rect(-100, -100, 1000, 800)));

	var boomSize = 10;

	var quadtreeEntity = new Entity("quadtree drawable entity");
	var quadtreeDrawable = new QuadtreeDrawable(collisionSystem.quadtree);
	quadtreeEntity.addComponent(quadtreeDrawable);
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
	var movement2 = new Movement(null, new Vector(-50, 0), 0, 80);
	var body2 = new CircleBody();
	var anotherEntity = new Entity("testEntity2");
	anotherEntity.addComponent(transform2);
	anotherEntity.addComponent(movement2);
	anotherEntity.addComponent(body2);
	anotherEntity.addComponent(new TestComponent(2, boomSize));
	anotherEntity.addComponent(new ImageDrawable(this.game.getImages().getDefaultImage()));

	this.addEntity(testEntity);
	this.addEntity(anotherEntity);
}

Test2Scene.prototype.handleCollisionEvent = function(event) {

}
