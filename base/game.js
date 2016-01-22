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

var Game = { };

//key state variables
Game.keysDown = {};

addEventListener("keydown", function (e) {
		Game.keysDown[e.keyCode] = true;
		Game.handleKeyDown(e.keyCode);
}, false);

addEventListener("keyup", function (e) {
		delete Game.keysDown[e.keyCode];
		Game.handleKeyUp(e.keyCode);
}, false);

Game.DEBUG = true;

Game.updatesPerSecond = 60; /* Game state updates per second.  Updates are not skipped! */
Game.drawsPerSecond = 60;	/* Target number of redraws per second.  Draws WILL be skipped if it gets behind. */
Game.scene = null; 			/* the current scene */
Game.nextScene = null; 		/* the scene we should switch to next */
Game.currentMusic = null;
Game.previousMusic = null;

/* variables for keeping track of draw and update FPS */
Game.currUpdatesCounter = 0;
Game.prevUpdatesCounter = 0;
Game.currDrawCounter = 0;
Game.prevDrawCounter = 0;
Game.fpsPrevTime = 0;
Game.fpsDisplayEnabled = true;

Game.run = (function() {
		var ticksPerUpdate = 1000 / Game.updatesPerSecond;
		var ticksPerRedraw = 1000 / Game.drawsPerSecond;
		var nextGameUpdateTick = (new Date).getTime() + ticksPerUpdate;
		var nextGameRedrawTick = nextGameUpdateTick;

		var currentTime = 0;

		return function() {
			currentTime = (new Date).getTime();

			if (currentTime > Game.fpsPrevTime + 1000) {
				Game.fpsPrevTime = currentTime;
				Game.prevUpdatesCounter = Game.currUpdatesCounter;
				Game.prevDrawCounter = Game.currDrawCounter;
				Game.currUpdatesCounter = 0;
				Game.currDrawCounter = 0;
			}	

			/* update the game state until its caught up with the current time */
			while (currentTime > nextGameUpdateTick) {
				nextGameUpdateTick += ticksPerUpdate;

				Game.update();
				Game.currUpdatesCounter++;
			}

			/* draw at most once, if the nextGameRedrawTick has been reached */
			if (currentTime > nextGameRedrawTick) {
				var drawsBehind = (currentTime - nextGameRedrawTick) / ticksPerRedraw;
				if (drawsBehind > 1) {
					nextGameRedrawTick = (new Date).getTime() + ticksPerRedraw;
				}
				else {
					nextGameRedrawTick += ticksPerRedraw;
				}

				Game.draw();
				Game.currDrawCounter++;
			}
		};
})();

Game.draw = function() {
	context.fillStyle = "#000"
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);

	this.scene.draw();

	if (Game.fpsDisplayEnabled) {
		context.font = "14px Courier";
		context.fillStyle = "#ddf"
		context.fillText("updates/s: " + Game.prevUpdatesCounter, 10, 20);
		context.fillText("draws/s:   " + Game.prevDrawCounter, 10, 36);
	}
};

Game.update = function() {
	if (this.nextScene != null) {
		/* we have a new scene, so change scenes! */
		this.scene = this.nextScene;
		this.nextScene = null;

		this.setMusic(this.scene.getMusic());
	}

	var deltaTime = 1 / Game.updatesPerSecond;

	this.time += deltaTime;

	this.scene.update(deltaTime);
};

Game.getContext = function() {
	return context;
}

Game.getImages = function() {
	return theImages;
}

Game.setNextScene = function(nextScene) {
	this.nextScene = nextScene;
}

Game.handleKeyDown = function(key) {
	if (Game.scene == null) {
		return;
	}

	Game.scene.handleKeyDown(key);
}

Game.handleKeyUp = function(key) {
	if (Game.scene == null) {
		return;
	}

	Game.scene.handleKeyUp(key);

	if (Game.DEBUG) {
		if (key == 80) { // pause
			this.scene.togglePause();
		}

		if (key == 27) { // ESC
			this.setNextScene(new TestMenuScene(this));
		}

		if (key == 68) { // d
			this.scene.debugDump();
		}
	}
}

Game.reset = function() {
	this.setNextScene(new TestMenuScene(this));
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

		    if (Game.scene.shouldMusicRepeat()) {
			    this.play();
			}
		}
	}, false);

	Game.currentMusic.play();
}

Game.reset();

//start the loop!
Game._intervalId = setInterval(Game.run, 0);
