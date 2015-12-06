TestSystem.prototype = new System();
TestSystem.prototype.constructor = TestSystem;

function TestSystem() {
	System.call(this, [TestComponent.type, Transform.type]);
}

TestSystem.prototype.updateEntity = function(scene, entity, deltaTime) {
	var bombComponent = entity.components[TestComponent.type];
	var transform = entity.components[Transform.type];
	var drawable = entity.components[Drawable.type];

	var context = scene.game.getContext();

	bombComponent.time -= deltaTime;

	if (bombComponent.time <= 0.0) {
		//explode
		for (var i = 0; i < bombComponent.number; i++) {
			var scale = transform.scale.copy();
			scale.multiply(0.4); //scale to 25%
			scale.multiply(1 + ((Math.random() - 0.5) * 0.1));

			if (scale.x < 1 && scale.y < 1) {
				continue;
			}

			var newTransform = new Transform(
				transform.position.copy(),		//position
				scale,							//scale
				Math.random() * 360,			//rotation
				transform.z + (Math.random() - 0.5)				//z
				);

			var newMovement = new Movement(
				new Vector((Math.random() - 0.5) * 400, (Math.random() - 0.5) * 400),	//velocity
				null,																	//acceleration
				Math.random() * 100,													//angularVelocity
				null																	//angularAcceleration
				);

			var newEntity = new Entity("bomb fragment");
			newEntity.addComponent(newTransform);
			newEntity.addComponent(newMovement);
			newEntity.addComponent(drawable);

			var newNumber = bombComponent.number / 2;
			if (newNumber <= 1) {
				newNumber = 0;
			}

			newEntity.addComponent(new TestComponent(0.25 + Math.random() * 1.3, newNumber));

			scene.addEntity(newEntity);
		}

		scene.removeEntity(entity);
	}
}
