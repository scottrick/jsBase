function Images(document) {
	this.defaultImage = document.getElementById("defaultImageId");

	// this.flames = []; 
	// this.flames.push(document.getElementById("flame1"));
	// this.flames.push(document.getElementById("flame2"));
	// this.flameIndex = 0;
}

Images.prototype.getDefaultImage = function() {
	return this.defaultImage;
}

// Images.prototype.getNextFlame = function() {
// 	var currentIndex = this.flameIndex;
// 	this.flameIndex = (this.flameIndex + 1) % this.flames.length;
// 	return this.flames[currentIndex];
// };
