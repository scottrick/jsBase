Quadtree.MAX_OBJECTS = 4;
Quadtree.MAX_LEVELS = 10;

/*
	Quadtree

	Child node ordering:

	0	1
	2	3
*/
function Quadtree(level, bounds) {
  	this.level = level;
  	this.bounds = bounds;

  	this.entities = [];
  	this.nodes = [];
};

Quadtree.prototype.clear = function() {
	this.entities = [];
	this.nodes = []
}

Quadtree.prototype.split = function() {
	var newWidth = this.bounds.w / 2;
	var newHeight = this.bounds.h / 2;

	var node0 = new Quadtree(this.level + 1, new Rect(this.bounds.x, this.bounds.y, newWidth, newHeight));
	var node1 = new Quadtree(this.level + 1, new Rect(this.bounds.x + newWidth, this.bounds.y, newWidth, newHeight));
	var node2 = new Quadtree(this.level + 1, new Rect(this.bounds.x, this.bounds.y + newHeight, newWidth, newHeight));
	var node3 = new Quadtree(this.level + 1, new Rect(this.bounds.x + newWidth, this.bounds.y + newHeight, newWidth, newHeight));

	this.nodes = [];
	this.nodes.push(node0);
	this.nodes.push(node1);
	this.nodes.push(node2);
	this.nodes.push(node3);
}

/* 
	Returns the index of the node this physicsBody fits in.  

	Returns -1 if it can't completely fit in one of the child nodes.
*/
Quadtree.prototype.getIndex = function(entity) {
	var index = -1;

	var transform = entity.components[Transform.type];
	var physicsBody = entity.components[PhysicsBody.type];

	if (physicsBody.isFullyContainedIn(transform, this.nodes[0].bounds)) {
		index = 0;
	}
	else if (physicsBody.isFullyContainedIn(transform, this.nodes[1].bounds)) {
		index =  1;
	}
	else if (physicsBody.isFullyContainedIn(transform, this.nodes[2].bounds)) {
		index =  2;
	}
	else if (physicsBody.isFullyContainedIn(transform, this.nodes[3].bounds)) {
		index =  3;
	}

	return index;
}

/* 
	Inserts an entity into the quadtree.  If the node exceeds the capacity, it will split.
*/
Quadtree.prototype.insert = function(entity) {
	if (this.nodes.length != 0) {
		//we have child nodes!
		var index = this.getIndex(entity);

		if (index != -1){
			this.nodes[index].insert(entity);
			return;
		}
	}

	//node goes in THIS container
	this.entities.push(entity);

	if (this.entities.length > Quadtree.MAX_OBJECTS && this.level < Quadtree.MAX_LEVELS && this.nodes.length == 0) {
		if (this.nodes.length == 0) {
			this.split();
		}

		var i = 0;
		while (i < this.entities.length) {
			var entity = this.entities[i];
			var index = this.getIndex(entity);

			if (index != -1){
				this.nodes[index].insert(entity);

				/* remove the entity from our list of entities */
		    	this.entities.splice(i, 1);
			}
			else {
				i++;
			}
		}
	}
}

Quadtree.prototype.retrieve = function(results, entity) {
	if (this.nodes.length != 0) {
		var index = this.getIndex(entity);
		
		if (index != -1) {
			this.nodes[index].retrieve(results, entity);
		}
	}

	results.push.apply(results, this.entities);

	return results;
}

Quadtree.prototype.dump = function() {
	var indent = "";
	for (var i = 0; i < this.level; i++) {
		indent = indent + "  ";
	}

	console.log(indent + "Node (" + this.entities.length + ")");

	for (var i = 0; i < this.nodes.length; i++) {
		this.nodes[i].dump();
	}
}

Quadtree.prototype.count = function() {
	var count = this.entities.length;

	for (var i = 0; i < this.nodes.length; i++) {
		count += this.nodes[i].count();
	}

	return count;
}
