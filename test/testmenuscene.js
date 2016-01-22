TestMenuScene.prototype = new Scene();
TestMenuScene.prototype.constructor = TestMenuScene;

function TestMenuScene(game) {
	Scene.call(this, game);

	this.setupTest();
}

TestMenuScene.prototype.handleKeyUp = function(key) {
	Scene.prototype.handleKeyUp.call(this, key);

	if (key == 49) { // 1
		this.game.setNextScene(new TestScene(this.game));
	}
	else if (key == 50) { // 2
		this.game.setNextScene(new NoiseScene(this.game));
	}
	else if (key == 51) { // 3
		this.game.setNextScene(new Test2Scene(this.game));
	}
}

TestMenuScene.prototype.setupTest = function() {
	var x = 10;
	var y = 200;
	var increment = 16;

	var text1 = new TextDrawable("Scene Select");
	var transform1 = new Transform(new Vector(x, y));
	var entity1 = new Entity("title text");
	entity1.addComponent(text1);
	entity1.addComponent(transform1);
	this.addEntity(entity1);

	y += increment;

	var text1 = new TextDrawable("---------------------------------------------------");
	var transform1 = new Transform(new Vector(x, y));
	var entity1 = new Entity("dotted line text");
	entity1.addComponent(text1);
	entity1.addComponent(transform1);
	this.addEntity(entity1);

	y += increment;

	var text1 = new TextDrawable("1)    Collision Test");
	var transform1 = new Transform(new Vector(x, y));
	var entity1 = new Entity("collision test 1 text");
	entity1.addComponent(text1);
	entity1.addComponent(transform1);
	this.addEntity(entity1);

	y += increment;

	var text1 = new TextDrawable("2)    Procedural Island Test");
	var transform1 = new Transform(new Vector(x, y));
	var entity1 = new Entity("procedural island 2 text");
	entity1.addComponent(text1);
	entity1.addComponent(transform1);
	this.addEntity(entity1);

	y += increment;

	var text1 = new TextDrawable("3)    Test Boom System");
	var transform1 = new Transform(new Vector(x, y));
	var entity1 = new Entity("explosion test 3 text");
	entity1.addComponent(text1);
	entity1.addComponent(transform1);
	this.addEntity(entity1);

	y += increment;
	y += increment;

	var text1 = new TextDrawable("ESC)  Return to this menu");
	var transform1 = new Transform(new Vector(x, y));
	var entity1 = new Entity("ESC text");
	entity1.addComponent(text1);
	entity1.addComponent(transform1);
	this.addEntity(entity1);
}
