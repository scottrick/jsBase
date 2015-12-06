/*
	A Scene is a collection of entities and systems.

	It will also handle input and music for a given scene in the game.
*/
function Scene(game) {
    this.game = game;
    this.paused = false;

    this.entities = [];

	this.systems = [];
	this.drawSystem = new DrawSystem();
    
    this.entitiesToAdd = [];
    this.entitiesToRemove = [];

    this.updateSpeed = 1.0;
    this.slowMotionSpeed = 0.333;
    this.isSlowMotion = false;

	this.dumpTimer = 0;
	this.dumpDelay = 4;
}

Scene.prototype.draw = function() {
	this.drawSystem.draw(this.game.getContext());
}

Scene.prototype.update = function(deltaTime) {
	this.doEntityMaintenance();
	this.updateSystems(deltaTime);

	this.dumpTimer += deltaTime;
	if (this.dumpTimer >= this.dumpDelay) {
		this.dumpTimer -= this.dumpDelay;
		console.log(this.toString());
	}
};

/* update all systems */
Scene.prototype.updateSystems = function(deltaTime) {
	for (var i = 0, len = this.systems.length; i < len; i++) {
		var system = this.systems[i];
		this.updateSystem(system, deltaTime);
	}
}

Scene.prototype.updateSystem = function(system, deltaTime) {
	if (!system.isEnabled()) {
		/* skip disabled systems */
		return;
	}

	for (var e = 0, len = this.entities.length; e < len; e++) {
		var entity = this.entities[e];

		if (system.checkEntity(entity)) {
			system.updateEntity(this, entity, deltaTime);
		}
	}		
}

/* add/remove entities */
Scene.prototype.doEntityMaintenance = function() {
	/* add all entities waiting to be added */
	if (this.entitiesToAdd.length > 0) {
		this.entities.push.apply(this.entities, this.entitiesToAdd);
		this.drawSystem.addEntities(this.entitiesToAdd);
		this.entitiesToAdd = [];
	}

	/* remove all entities waiting to be removed */
	for (var i = 0, len = this.entitiesToRemove.length; i < len; i++) {
		var entity = this.entitiesToRemove[i];
		var removeIndex = this.entities.indexOf(entity);

		if (removeIndex >= 0) {
	    	this.entities.splice(removeIndex, 1);
		}

		this.drawSystem.removeEntity(entity);
	}

	this.entitiesToRemove = [];
}

Scene.prototype.addEntity = function(entity) {
	this.entitiesToAdd.push(entity);
}

Scene.prototype.removeEntity = function(entity) {
	this.entitiesToRemove.push(entity);
}

Scene.prototype.addSystem = function(system) {
	this.systems.push(system);
}

Scene.prototype.toString = function() {
	return "Scene has " + this.entities.length + " entities.";
}

Scene.prototype.handleKeyDown = function(key) {

}

Scene.prototype.handleKeyUp = function(key) {
	if (key == 83) { //s
		this.toggleSlowMotion();
	}
}

Scene.prototype.toggleSlowMotion = function() {
	this.isSlowMotion = !this.isSlowMotion;
}

Scene.prototype.togglePause = function() {
	this.paused = !this.paused;
}

Scene.prototype.isPaused = function() {
	return this.paused;
}

Scene.prototype.getUpdateSpeed = function() {
	if (this.isSlowMotion) {
		return this.slowMotionSpeed;
	}
	else {
		return this.updateSpeed;
	}
}

Scene.prototype.getMusic = function() {
	return theSounds.getGameTrack();
}
