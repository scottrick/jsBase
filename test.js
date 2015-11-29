//jsBase
//Scott Atkins
//December 2013

var documentWidth = window.innerWidth;
var documentHeight = window.innerHeight;

var gameWidth = 800;
var gameHeight = 600;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var theImages = new Images(document);
var theSounds = new Sounds(document);

//state variables
var keysDown = {};

addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
		Game.handleKeyDown(e.keyCode);
}, false);

addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
		Game.handleKeyUp(e.keyCode);
}, false);

var Game = { };

Game.updatesPerSecond = 120;
Game.drawsPerSecond = 30;
Game.paused = false;
Game.slowMotion = false;
Game.slowMotionFactor = 5.0;
Game.time = 0.0;
Game.scene = null;
Game.currentMusic = null;
Game.previousMusic = null;

Game.togglePause = function() {
	this.paused = !this.paused;
}

Game.toggleSlowMotion = function() {
	this.slowMotion = !this.slowMotion;
}

Game.run = (function() {
		var ticksPerUpdate = 1000 / Game.updatesPerSecond;
		var ticksPerRedraw = 1000 / Game.drawsPerSecond;
		var nextGameUpdateTick = (new Date).getTime() + ticksPerUpdate;
		var nextGameRedrawTick = nextGameUpdateTick;
		



		/* TEST STUFF */
		var hatfat = new Component("Test Component");
		var hatfat1 = new Component("zxcv");
		var hatfat2 = new Component("hatfat");

		var e1 = new Entity("test entity1");
		var e2 = new Entity("entity 2");
		var e3 = new Entity("entity 3");

		e1.addComponent(hatfat);
		e1.addComponent(hatfat);
		e1.addComponent(hatfat1);
		e1.addComponent(hatfat2);
		e1.addComponent(hatfat);
		e1.addComponent(hatfat2);
		e1.addComponent(new Component("render"));
		e1.addComponent(new Component("render"));
		e1.addComponent(new Component("render"));

		var zxcvComponent = e1.getComponentByType("zxcv");
		console.log("zxcv component: " + zxcvComponent);

		var componentResults = e1.getComponentsByType("render");
		console.log("render components: " + componentResults);

		e1.dump();
		e2.dump();
		e3.dump();

		/* END TEST STUFF */




		return function() {
			while ((new Date).getTime() > nextGameUpdateTick) {
				nextGameUpdateTick += ticksPerUpdate;

				Game.update();

				if (nextGameUpdateTick > nextGameRedrawTick) {
					Game.draw();
					nextGameRedrawTick += ticksPerRedraw;
				}
			}		
		};
})();

Game.draw = function() {
	context.fillStyle = "#000"
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);

	this.scene.draw(context);
};

Game.update = function() { 
	if (this.paused) {
		return;
	}

	var deltaTime = 1 / Game.updatesPerSecond;

	if (this.slowMotion) {
		deltaTime = deltaTime / this.slowMotionFactor;
	}

	this.time += deltaTime;

	this.scene.update(deltaTime);
};

Game.handleKeyDown = function(key) {
	Game.scene.handleKeyDown(key);
}

Game.handleKeyUp = function(key) {
	Game.scene.handleKeyUp(key);

	// if (key == 32) { // spacebar
	// 	Game.togglePause();
	// }

	// if (key == 83) { //  s
	// 	Game.toggleSlowMotion();
	// }

	// if (key == 66) { //  b
	// 	if (Game.scene.DEBUG_DRAW != null) {
	// 		Game.scene.DEBUG_DRAW = !Game.scene.DEBUG_DRAW;
	// 	}
	// }
}

Game.reset = function() {
	this.scene = null;
	this.scene = new TestScene();
}

Game.setMusic = function(music) {
	if (Game.currentMusic == music) {
		return;
	}

	if (Game.currentMusic != null) {
		var fadeOutMusic = Game.currentMusic;
		var interval = 50

		var fadeout = setInterval(
		  	function() {
			    var newVolume = fadeOutMusic.volume - 0.06;
			    if (newVolume <= 0) {
			    	newVolume = 0;
			    	fadeOutMusic.pause();
			    	fadeOutMusic.currentTime = 0;
					clearInterval(fadeout);
			    }

				fadeOutMusic.volume = newVolume;
		  }, 
		  interval);
	}

	Game.currentMusic = music;

	Game.currentMusic.addEventListener('ended', function() {
		if (Game.currentMusic == this) {
		    this.currentTime = 0;
		    this.play();
		}
	}, false);

	Game.currentMusic.play();
}

Game.reset();

//start the loop!
Game._intervalId = setInterval(Game.run, 0);
