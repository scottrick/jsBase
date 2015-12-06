function Sounds(document) {
	this.starSounds = []; 
	this.starSounds.push(document.getElementById("soundStar0"));
	this.starSounds.push(document.getElementById("soundStar1"));
	this.starSounds.push(document.getElementById("soundStar2"));
	this.starSounds.push(document.getElementById("soundStar3"));
	this.starSounds.push(document.getElementById("soundStar4"));
	this.starSounds.push(document.getElementById("soundStar5"));
	this.starSounds.push(document.getElementById("soundStar6"));
	this.starSounds.push(document.getElementById("soundStar7"));
	this.starSounds.push(document.getElementById("soundStar8"));
	this.starSounds.push(document.getElementById("soundStar9"));
	this.starSoundIndex = 0;

	this.fireSounds = [];
	this.fireSounds.push(document.getElementById("soundFire0"));
	this.fireSounds.push(document.getElementById("soundFire1"));
	this.fireSoundsIndex = 0;

	this.misfireSounds = [];
	this.misfireSounds.push(document.getElementById("soundMisfire0"));
	this.misfireSounds.push(document.getElementById("soundMisfire1"));
	this.misfireSoundsIndex = 0;

	this.bounceSounds = [];
	this.bounceSounds.push(document.getElementById("soundBounce0"));
	this.bounceSounds.push(document.getElementById("soundBounce1"));
	this.bounceSounds.push(document.getElementById("soundBounce2"));
	this.bounceSounds.push(document.getElementById("soundBounce3"));
	this.bounceSounds.push(document.getElementById("soundBounce4"));
	this.bounceSoundsIndex = 0;

	this.titleTrack = document.getElementById("titleTrack");
	this.gameTrack = document.getElementById("gameTrack");
}

Sounds.prototype.getNextStarSound = function() {
	var currentIndex = this.starSoundIndex;
	this.starSoundIndex = (this.starSoundIndex + 1) % this.starSounds.length;
	return this.starSounds[currentIndex];
};

Sounds.prototype.getNextFireSound = function() {
	var currentIndex = this.fireSoundsIndex;
	this.fireSoundsIndex = (this.fireSoundsIndex + 1) % this.fireSounds.length;
	return this.fireSounds[currentIndex];
};

Sounds.prototype.getNextMisfireSound = function() {
	var currentIndex = this.misfireSoundsIndex;
	this.misfireSoundsIndex = (this.misfireSoundsIndex + 1) % this.misfireSounds.length;
	return this.misfireSounds[currentIndex];
};

Sounds.prototype.getNextBounceSound = function() {
	var currentIndex = this.bounceSoundsIndex;
	this.bounceSoundsIndex = (this.bounceSoundsIndex + 1) % this.bounceSounds.length;
	return this.bounceSounds[currentIndex];
};

Sounds.prototype.getTitleTrack = function() {
	this.titleTrack.volume = 0.8;
	return this.titleTrack;
}

Sounds.prototype.getGameTrack = function() {
	this.gameTrack.volume = 0.3;
	return this.gameTrack;
}
