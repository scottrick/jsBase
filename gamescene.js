GameScene.prototype = new Scene();
GameScene.prototype.constructor = Scene;

var STATE_GAME = 2;
var STATE_HELP = 3;
var STATE_RETRY = 4;
var STATE_SUCCESS = 5;

function GameScene(name, levelData, polyData) {
	this.DEBUG_DRAW = false;
	this.debugOptions = false;
	this.levelData = levelData;
	this.polyData = polyData;

	Scene.call(this, name);
}

GameScene.prototype.update = function(deltaTime, scene) {
	Scene.prototype.update.call(this, deltaTime, scene);

	if (this.state == STATE_GAME) {
		//rotate cannon as needed
		if (keysDown[65] || keysDown[90] || keysDown[37]) {
			//rotate left
			this.cannon.rotateLeft(deltaTime);
		}

		if (keysDown[68] || keysDown[88] || keysDown[39]) {
			//rotate right
			this.cannon.rotateRight(deltaTime);
		}

		this.checkLevelOver();
	}

	this.checkCollisions();
}

GameScene.prototype.checkLevelOver = function() {
	//level is over when there are no shots left in the cannon, and all cannon balls are dead
	if (this.cannon.shots > 0) {
		return;
	}

	for (var i = 0; i < this.cannonballs.length; i++) {
		var cannonball = this.cannonballs[i];

		if (cannonball.velocity != null) {
			return;
		}
	}

	//there are no shots let, and all the cannonballs are dead!
	this.state = STATE_RETRY;
}

GameScene.prototype.draw = function(context) {
	Scene.prototype.draw.call(this, context);

	switch (this.state) {
		case STATE_HELP:
			this.drawHelp(context);
			break;

		case STATE_RETRY:	
			this.drawRetry(context);
			break;

		case STATE_SUCCESS:
			this.drawSuccess(context);
			break;

		default:
			break;	
	}

	if (!this.DEBUG_DRAW) {
		return;
	}

	for (var i = 0; i < this.buckets.length; i++) {
		var bucket = this.buckets[i];

		if (bucket.objects.length <= 0) {
			bucket.draw(context);
		}
	}

	for (var i = 0; i < this.buckets.length; i++) {
		var bucket = this.buckets[i];

		if (bucket.objects.length > 0) {
			bucket.draw(context);
		}
	}
}

GameScene.prototype.checkCollisions = function() {
	//update the buckets
	for (var i = 0; i < this.objects.length; i++) {
		var object = this.objects[i];
		if (object.didMove) {
			this.updateBucket(object);			
		}
	}

	var checkCount = 0;

	//check collisions in each bucket!
	for (var i = 0; i < this.buckets.length; i++) {
		var bucket = this.buckets[i];
		checkCount += bucket.checkCollisions();
	}
}

GameScene.prototype.updateBucket = function(object) {
	if (object.collisionType == COLLISION_TYPE_NONE) {
		return;
	}

	this.removeFromBuckets(object);

	for (var i = 0; i < this.buckets.length; i++) {
		var bucket = this.buckets[i];

		var result = false;

		switch (object.collisionType) {
			case COLLISION_TYPE_CIRCLE:
				result = bucket.containsCircle(object.position, object.radius);
				break;

			case COLLISION_TYPE_POINT:
				result = bucket.containsPoint(object.position);
				break;

			case COLLISION_TYPE_POLYGON:
				{
					//first check to see if any of the points are contained in the bucket
					for (var p = 0; p < object.points.length; p++) {
						var point = object.points[p];

						result = bucket.containsPoint(point);

						if (result) {
							break;
						}
					}

					//no points were inside, but still could be in the bucket.  check the line segments themselves!
					for (var p = 0; p < object.points.length; p++) {
						var first = object.points[p];
						var second = object.points[(p + 1) % object.points.length];

						//check against all four edges of the bucket

						//top of bucket
						var intersection = CalculateLineIntersection(
							first.x, 
							first.y, 
							second.x, 
							second.y, 
							bucket.start.x, 
							bucket.start.y, 
							bucket.start.x + bucket.size.x, 
							bucket.start.y);

						if (intersection != null) {
							result = true;
							break;
						}

						//left of bucket
						intersection = CalculateLineIntersection(
							first.x, 
							first.y, 
							second.x,
							second.y,
							bucket.start.x, 
							bucket.start.y, 
							bucket.start.x, 
							bucket.start.y + bucket.size.y);

						if (intersection != null) {
							result = true;
							break;
						}

						//right of bucket
						intersection = CalculateLineIntersection(
							first.x, 
							first.y, 
							second.x, 
							second.y, 
							bucket.start.x + bucket.size.x, 
							bucket.start.y, 
							bucket.start.x + bucket.size.x, 
							bucket.start.y + bucket.size.y);

						if (intersection != null) {
							result = true;
							break;
						}

						//bottom of bucket
						intersection = CalculateLineIntersection(
							first.x, 
							first.y, 
							second.x, 
							second.y, 
							bucket.start.x, 
							bucket.start.y + bucket.size.y, 
							bucket.start.x + bucket.size.x, 
							bucket.start.y + bucket.size.y);

						if (intersection != null) {
							result = true;
							break;
						}
					}
				}

				break;

			default:

				break;
		}

		if (result) {
			bucket.add(object);
		}
	}
}

GameScene.prototype.removeFromBuckets = function(object) {
	for (var i = 0 ; i < this.buckets.length; i++) {
		var bucket = this.buckets[i];
		bucket.remove(object);
	}
}

GameScene.prototype.addObject = function(object) {
	Scene.prototype.addObject.call(this, object);

	//added a new object, so put it in the right bucket!
	this.updateBucket(object);
}

GameScene.prototype.removeObject = function(object) {
	Scene.prototype.removeObject.call(this, object);

	//object removed from scene, so remove it from all buckets as well
	this.removeFromBuckets(object);
}

GameScene.prototype.showHelp = function() {
	if (this.state == STATE_GAME) {
		this.state = STATE_HELP;
	}
}

GameScene.prototype.toggleHelp = function() {
	if (this.state == STATE_GAME) {
		this.state = STATE_HELP;
	}
	else if (this.state == STATE_HELP) {
		this.state = STATE_GAME;
	}
}

GameScene.prototype.drawHelp = function(context) {
	context.save();

	context.lineWidth = 1.5;
	context.globalAlpha = 0.8;
	context.strokeStyle = "#6666ff";
	context.fillRect(100, 100, 600, 400);
	context.fillStyle = context.strokeStyle;

	context.globalAlpha = 1;
	context.strokeRect(100, 100, 600, 400);

	var startY = 124;
	var spacingY = 24;
	context.font = "20px Courier New";

	context.textAlign = "left"
	context.fillText("Welcome to Star Cannon.", 112, startY);
	startY += spacingY * 3;

	context.fillText("Collect all the stars with a single cannonball.", 112, startY);
	startY += spacingY * 2;

	context.fillText("Aim the cannon with the left/right arrow keys.", 112, startY);
	startY += spacingY;

	context.fillText("Use spacebar to fire the cannon.", 112, startY);
	startY += spacingY * 2;

	context.fillText("The 'H' key will toggle this help menu.", 112, startY);
	startY += spacingY;

	context.fillText("The 'Q' key will take you back to the main menu.", 112, startY);
	startY += spacingY;

	context.fillText("The 'R' key will reset the current level.", 112, startY);
	startY += spacingY;

	context.fillText("Good luck!", 112, 500 - 16);
	startY += spacingY;

	context.restore();
}

GameScene.prototype.drawRetry = function(context) {
	context.save();

	context.lineWidth = 1.5;
	context.globalAlpha = 0.8;
	context.strokeStyle = "#f22";
	context.fillRect(100, 100, 600, 400);
	context.fillStyle = context.strokeStyle;

	context.globalAlpha = 1;
	context.strokeRect(100, 100, 600, 400);

	var startY = 124;
	var spacingY = 24;
	context.font = "20px Courier New";

	startY += spacingY * 2;

	context.textAlign = "center"
	context.fillText("You didn't get all the stars!", 400, startY);

	context.fillText("[spacebar to try again, 'Q' to quit]", 400, 500 - 16 - spacingY);
	startY += spacingY;

	context.restore();
}

GameScene.prototype.drawSuccess = function(context) {
	context.save();

	context.lineWidth = 1.5;
	context.globalAlpha = 0.8;
	context.strokeStyle = "#2f2";
	context.fillRect(100, 100, 600, 400);
	context.fillStyle = context.strokeStyle;

	context.globalAlpha = 1;
	context.strokeRect(100, 100, 600, 400);

	var startY = 124;
	var spacingY = 24;
	context.font = "20px Courier New";

	startY += spacingY * 2;

	context.textAlign = "center"
	context.fillText("Success!", 400, startY);

	context.fillText("[spacebar to continue]", 400, 500 - 16 - spacingY);
	startY += spacingY;

	context.restore();
}

GameScene.prototype.handleKeyDown = function(key) {
	Scene.prototype.handleKeyDown.call(this, key);
}

GameScene.prototype.handleKeyUp = function(key) {
	Scene.prototype.handleKeyUp.call(this, key);

	if (key == 82) {  //r
		this.reset();
	}

	if (this.debugOptions) {
		if (key == 80) {
			//hack
			Game.nextLevel();
		}
	}

	if (this.state == STATE_HELP) {
		if (key == 81) { //q
			Game.reset();
		}

		if (key == 72 || key == 32) {
			this.toggleHelp();
		}

		return;
	}

	if (this.state == STATE_RETRY) {
		if (key == 32) {  //spacebar
			this.reset();
		}

		if (key == 81) {  //q
			Game.reset();
		}

		return;
	}

	if (this.state == STATE_SUCCESS) {
		if (key == 32) {  //spacebar
			Game.nextLevel();
		}

		return;
	}

	switch (key) {
		case 32:  //spacebar
			//fire the cannon!
			var cannonball = this.cannon.fire(this);
			if (cannonball != null) {
				this.cannonballs.push(cannonball);
			}
			break;

		case 72:  //h
			//show help
			this.toggleHelp();
			break;
	}
}

GameScene.prototype.handleStarsGone = function() {
	Scene.prototype.handleStarsGone.call(this);

	this.state = STATE_SUCCESS;
}

GameScene.prototype.setupBoundaries = function() {
	//left boundary
	var leftBoundary = new RectangleObject(new Vector(-10, 0), new Vector(10, 600), null, null);
	leftBoundary.shouldDraw = false;
	this.addObject(leftBoundary);

	//right boundary
	var rightBoundary = new RectangleObject(new Vector(800, 0), new Vector(810, 600), null, null);
	rightBoundary.shouldDraw = false;
	this.addObject(rightBoundary);

	//top boundary
	var topBoundary = new RectangleObject(new Vector(0, -10), new Vector(800, 10), null, null);
	topBoundary.shouldDraw = false;
	this.addObject(topBoundary);

	//bottom boundary
	var bottomBoundary = new RectangleObject(new Vector(0, 600), new Vector(800, 10), null, null);
	bottomBoundary.shouldDraw = false;
	this.addObject(bottomBoundary);
}

GameScene.prototype.reset = function() {
	Scene.prototype.reset.call(this);

	this.state = STATE_GAME;

	//setup the buckets
	{
		this.buckets = [];

		var NUM_BUCKETS_X = 20;
		var NUM_BUCKETS_Y = 15;
		var BUCKET_WIDTH = gameWidth / NUM_BUCKETS_X;
		var BUCKET_HEIGHT = gameHeight / NUM_BUCKETS_Y;

		for (var x = 0; x < NUM_BUCKETS_X; x++) {
			for (var y = 0; y < NUM_BUCKETS_Y; y++) {
				var bucket = new Bucket(new Vector(x * BUCKET_WIDTH, y * BUCKET_HEIGHT), new Vector(BUCKET_WIDTH, BUCKET_HEIGHT));
				this.buckets.push(bucket);
			}
		}
	}

	this.cannonballs = [];

	if (this.cannon == null) {
		this.cannon = new Cannon();
	}
	else {
		this.cannon.rearm();
	}

	this.addObject(this.cannon);

	if (this.levelData != null) {
		this.loadLevelData(this.levelData);
	}

	if (this.polyData != null) {
		this.loadPolyData(this.polyData);
	}

	this.setupBoundaries();
}

GameScene.prototype.getMusic = function() {
	return Scene.prototype.getMusic.call(this);
}

