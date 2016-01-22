function Sounds(document) {
	// this.fireballSounds = []; 
	// this.fireballSounds.push(document.getElementById("fireball1"));
	// this.fireballSounds.push(document.getElementById("fireball2"));
	// this.fireballSoundIndex = 0;

	this.titleTrack = document.getElementById("titleTrack");
	this.gameTrack = document.getElementById("gameTrack");
}

// Sounds.prototype.getNextFireballSound = function() {
// 	var currentIndex = this.fireballSoundIndex;
// 	this.fireballSoundIndex = (this.fireballSoundIndex + 1) % this.fireballSounds.length;
// 	return this.fireballSounds[currentIndex];
// };

Sounds.prototype.getTitleTrack = function() {
	// this.titleTrack.volume = 0.5;
	return this.titleTrack;
}

Sounds.prototype.getGameTrack = function() {
	// this.gameTrack.volume = 0.5;
	return this.gameTrack;
}
