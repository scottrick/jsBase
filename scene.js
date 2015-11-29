function Scene(name) {
    this.name = name;

    this.reset();
}

Scene.prototype.update = function(deltaTime) {
	var deadObjects = [];

	for (var i = 0; i < this.objects.length; i++) {
		this.objects[i].update(deltaTime, this);

		if (this.objects[i].isDead && this.objects[i].removeWhenDead) {
			deadObjects.push(this.objects[i]);
		}
	}

	for (var i = 0; i < deadObjects.length; i++) {
		this.removeObject(deadObjects[i]);
		deadObjects[i].onDeath();
	}

	this.dumpTimer += deltaTime;
	if (this.dumpTimer >= 4) {
		this.dumpTimer -= 4;
		this.getInfo();
	}
};

Scene.prototype.draw = function(context) {
	for (var i = 0; i < this.objects.length; i++) {
		if (this.objects[i].shouldDraw) {
			context.save();
			this.objects[i].draw(context);
			context.restore();
		}	
	}
}

Scene.prototype.addObject = function(object) {
	this.objects.push(object);

	if (object.pointType == POINT_TYPE_STAR) {
		this.stars.push(object);
	}
}

Scene.prototype.removeObject = function(object) {
	var index = this.objects.indexOf(object);

	if (index >= 0) {
    	this.objects.splice(index, 1);
	}

	var starIndex = this.stars.indexOf(object);

	if (starIndex >= 0) {
		//was a star, so remove it from the star list
		this.stars.splice(starIndex, 1);

		if (this.stars.length <= 0) {
			this.handleStarsGone();
		}
	}
}

Scene.prototype.getInfo = function() {
	console.log("Scene [" + this.name + "] has " + this.objects.length + " objects.");;
};

Scene.prototype.handleStarsGone = function() {

}

Scene.prototype.handleKeyDown = function(key) {

}

Scene.prototype.handleKeyUp = function(key) {

}

Scene.prototype.loadLevelData = function(data) {
	this.gameScale = data[0];
	var starRadius = this.gameScale * 5 / 12; 

	var xRows = Math.floor(800 / this.gameScale);
	var xOffset = (800 - xRows * this.gameScale) / 2 + starRadius;

	var yRows = Math.floor(600 / this.gameScale);
	var yOffset = (600 - yRows * this.gameScale) / 2 + starRadius;

	for (var i = 1; i < data.length; i++) {
		var value = data[i];

		if (value == null) {
			continue;
		}

		var xPos = (i - 1) % xRows;
		var yPos = Math.floor((i - 1) / xRows);

		switch (value) {
			case 1:
			{ //its a star!  so add it to the scene...
				var star = new Star(new Vector(xOffset + xPos * this.gameScale, yOffset + yPos * this.gameScale), starRadius);
				this.addObject(star);
			}
				break;
		}
	}
}

Scene.prototype.loadPolyData = function(data) {
	for (var i = 0; i < data.length; i) {
		var numPoints = data[i];
		var fillColor = data[i + 1];
		var strokeColor = data[i + 2];

		var points = [];
		i += 3;

		for (var k = 0; k < numPoints * 2; k += 2) {
			var x = data[i + k];
			var y = data[i + k + 1];
			var newPoint = new Vector(x, y);
			points.push(newPoint);
		}

		i += numPoints * 2;

		this.addObject(new PolygonObject(points, fillColor, strokeColor));
	}
}

Scene.prototype.reset = function() {
    this.objects = [];
    this.stars = [];

    this.gameScale = 24; //default game scale for now

    this.dumpTimer = 0; //debug dump timer;
}

Scene.prototype.getMusic = function() {
	return theSounds.getGameTrack();
}

