function Map(width, height, seed) {
	this.width = width;
	this.height = height;

	if (seed != null) {
		this.seed = seed; 
	}
	else {
		this.seed = Date.now();
	}

	this.tiles = [];

	/* initialize the tiles array */
	for (var i = 0; i < width * height; i++) {
		this.tiles.push(0);
	}
}

Map.prototype.getTile = function(x, y) {
	if (x < this.width && x >= 0 && y < this.height && y >= 0) {
		return this.tiles[y * this.width + x];
	}
}

Map.prototype.putTile = function(tile) {
	if (tile.pos.x < this.width && tile.pos.x >= 0 && tile.pos.y < this.height && tile.pos.y >= 0) {
		this.tiles[tile.pos.y * this.width + tile.pos.x] = tile;
	}
}

Map.prototype.generate = function(context) {
	/* for testing */
	this.mapImageData = context.createImageData(this.width, this.height);

	var data = this.mapImageData.data;

	noise.seed(this.seed);

	var startingFrequency = 4;
	var frequencyScale = 4;
	var numberOfOctaves = 8;

	var centerX = this.width / 2;
	var centerY = this.height / 2;
	var maxDistance = Math.max(this.width, this.height);
	var bonusDistance = Math.max(this.width, this.height) / 3;

	for (var y = 0; y < this.height; y++) {
		for (var x = 0; x < this.width; x++) {
			var value = 0;

			for (var i = 0; i < numberOfOctaves; i++) {
				value += (noise.perlin2(
					x / this.width * startingFrequency * Math.pow(frequencyScale, i), 
					y / this.height * startingFrequency * Math.pow(frequencyScale, i))) / Math.pow(frequencyScale, i);
			}

			var distance = Math.sqrt((x - centerX) * (x - centerX) + (y - centerY) * (y - centerY));
			var multiplier = 1 - Math.min(0.7, distance / maxDistance);

			if (distance <= bonusDistance) {
				var bonus = 1 - (distance / bonusDistance);
				value += Math.min(bonus * 2, 0.5);
			}

			value = ((value + 1) * multiplier) - 1;

			var cell = (x + y * this.width) * 4;
			var type = 0;

			data[cell + 3] = 255; // alpha

			if (value <= -0.15) {
				/* water */
				data[cell + 0] = 0; 
				data[cell + 1] = 0; 
				data[cell + 2] = 180;
				type = 1;
			}
			else if (value <= 0) {
				/* shallow water */
				data[cell + 0] = 0; 
				data[cell + 1] = 0; 
				data[cell + 2] = 255;
				type = 2;
			}
			// else {
			// 	data[cell + 0] = value * 256; 
			// 	data[cell + 1] = value * 256; 
			// 	data[cell + 2] = value * 256;
			// }
			else if (value <= 0.12) {
				/* sandy dirt */
				data[cell + 0] = 210; 
				data[cell + 1] = 170; 
				data[cell + 2] = 120;
				type = 3;
			}
			else if (value <= 0.6) {
				/* grass */
				data[cell + 0] = 11; 
				data[cell + 1] = 99; 
				data[cell + 2] = 11;
				type = 4;
			}
			else if (value <= 0.85) {
				/* brown dirt */
				data[cell + 0] = 139; 
				data[cell + 1] = 69; 
				data[cell + 2] = 19;
				type = 5;
			}
			else {
				/* mountains */
				data[cell + 0] = 210; 
				data[cell + 1] = 210; 
				data[cell + 2] = 210;
				type = 6;
			}

			this.putTile(new MapTile(new Vector(x, y), type));
		}
	}
}
