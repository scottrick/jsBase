function Images(document) {
	this.defaultImage = document.getElementById("defaultImageId");
}

Images.prototype.getDefaultImage = function() {
	return this.defaultImage;
};
