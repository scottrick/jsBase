NoiseScene.prototype = new Scene();
NoiseScene.prototype.constructor = NoiseScene;

function NoiseScene(game) {
	Scene.call(this, game);

	this.setupNoise();

	var mapWidth = 400;
	var mapHeight = 400;

	var map = new Map(mapWidth, mapHeight);
	map.generate(this.game.getContext());

	var mapEntity = new Entity("map entity");
	this.mapDrawable = new MapDrawable(map, new Rect(0, 0, 800, 600));
	mapEntity.addComponent(this.mapDrawable);
	this.addEntity(mapEntity);

	// var imageEntity = new Entity("Image Data Drawable");
	// var dataDrawable = new ImageDataDrawable(map.mapImageData);
	// imageEntity.addComponent(dataDrawable);
	// this.addEntity(imageEntity);

	// var testEntity = new Entity("Test Entity");
	// var defaultImage = this.game.getImages().getDefaultImage();
	// var imageDrawable = new ImageDrawable(defaultImage, new Rect(0, 0, defaultImage.width, defaultImage.height));
	// testEntity.addComponent(imageDrawable);
	// this.addEntity(testEntity);
}

NoiseScene.prototype.handleKeyUp = function(key) {
	Scene.prototype.handleKeyUp.call(this, key);

	if (key == 32) { // spacebar
		/* regenerate! */
		this.game.setNextScene(new NoiseScene(this.game));
	}
}

NoiseScene.prototype.handleKeyDown = function(key) {
	if (key == 39) { //right
		this.mapDrawable.drawOffsetX++;
	}
	else if (key == 37) { //left
		this.mapDrawable.drawOffsetX--;
	}
	else if (key == 38) { //up
		this.mapDrawable.drawOffsetY--;
	}
	else if (key == 40) { //down
		this.mapDrawable.drawOffsetY++;
	}
}

NoiseScene.prototype.setupNoise = function() {
	// var width = 800;
	// var height = 600;

	// var imageData = this.game.getContext().createImageData(width, height);
	// var data = imageData.data;

	// noise.seed(Date.now());
	// // noise.seed(49);

	// var startingFrequency = 8;
	// var frequencyScale = 4;
	// var numberOfOctaves = 6;

	// var centerX = width / 2;
	// var centerY = height / 2;
	// var maxDistance = 640;
	// var bonusDistance = 200;

	// for (var y = 0; y < height; y++) {
	// 	for (var x = 0; x < width; x++) {
	// 		var value = 0;

	// 		for (var i = 0; i < numberOfOctaves; i++) {
	// 			value += (noise.perlin2(
	// 				x / width * startingFrequency * Math.pow(frequencyScale, i), 
	// 				y / height * startingFrequency * Math.pow(frequencyScale, i))) / Math.pow(frequencyScale, i);
	// 		}

	// 		var distance = Math.sqrt((x - centerX) * (x - centerX) + (y - centerY) * (y - centerY));
	// 		var multiplier = 1 - Math.min(0.7, distance / maxDistance);

	// 		if (distance <= bonusDistance) {
	// 			var bonus = 1 - (distance / bonusDistance);
	// 			value += Math.min(bonus * 2, 0.5);
	// 		}

	// 		value = ((value + 1) * multiplier) - 1;

	// 		var cell = (x + y * width) * 4;

	// 		data[cell + 3] = 255; // alpha

	// 		if (value <= -0.15) {
	// 			/* water */
	// 			data[cell + 0] = 0; 
	// 			data[cell + 1] = 0; 
	// 			data[cell + 2] = 180;
	// 		}
	// 		else if (value <= 0) {
	// 			/* shallow water */
	// 			data[cell + 0] = 0; 
	// 			data[cell + 1] = 0; 
	// 			data[cell + 2] = 255;
	// 		}
	// 		// else {
	// 		// 	data[cell + 0] = value * 256; 
	// 		// 	data[cell + 1] = value * 256; 
	// 		// 	data[cell + 2] = value * 256;
	// 		// }
	// 		else if (value <= 0.12) {
	// 			/* sandy dirt */
	// 			data[cell + 0] = 210; 
	// 			data[cell + 1] = 170; 
	// 			data[cell + 2] = 120;
	// 		}
	// 		else if (value <= 0.6) {
	// 			/* grass */
	// 			data[cell + 0] = 11; 
	// 			data[cell + 1] = 99; 
	// 			data[cell + 2] = 11;
	// 		}
	// 		else if (value <= 0.85) {
	// 			/* brown dirt */
	// 			data[cell + 0] = 139; 
	// 			data[cell + 1] = 69; 
	// 			data[cell + 2] = 19;
	// 		}
	// 		else {
	// 			/* mountains */
	// 			data[cell + 0] = 210; 
	// 			data[cell + 1] = 210; 
	// 			data[cell + 2] = 210;
	// 		}

	// 		var randomRange = 0.12;
	// 		var halfRange = randomRange / 2.0;

	// 		var rRandom = (Math.random() * randomRange) - halfRange;
	// 		var gRandom = (Math.random() * randomRange) - halfRange;
	// 		var bRandom = (Math.random() * randomRange) - halfRange;

	// 		data[cell + 0] *= 1.0 + rRandom;
	// 		data[cell + 1] *= 1.0 + gRandom;
	// 		data[cell + 2] *= 1.0 + bRandom;

	// 		if (data[cell + 0] <= 0) {
	// 			data[cell + 0] = 0;
	// 		}
	// 		if (data[cell + 1] <= 0) {
	// 			data[cell + 1] = 0;
	// 		}
	// 		if (data[cell + 2] <= 0) {
	// 			data[cell + 2] = 0;
	// 		}

	// 		if (data[cell + 0] >= 255) {
	// 			data[cell + 0] = 255;
	// 		}
	// 		if (data[cell + 1] >= 255) {
	// 			data[cell + 1] = 255;
	// 		}
	// 		if (data[cell + 2] >= 255) {
	// 			data[cell + 2] = 255;
	// 		}
	// 	}
	// }

	// var imageEntity = new Entity("image data entity");
	// var dataDrawable = new ImageDataDrawable(imageData);

	// imageEntity.addComponent(dataDrawable);

	// this.addEntity(imageEntity);

	/* add SPACEBAR regenerate text */
	var text1 = new TextDrawable("Press SPACEBAR to generate new map.");
	text1.outlineWidth = 2;
	var transform1 = new Transform(new Vector(10, 588));
	var entity1 = new Entity("regenerate text");
	entity1.addComponent(text1);
	entity1.addComponent(transform1);
	this.addEntity(entity1);
}
