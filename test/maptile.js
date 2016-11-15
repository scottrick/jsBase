
/* MapTile types */
MapTile.TYPE_DEEP_WATER 		= 1;
MapTile.TYPE_SHALLOW_WATER 		= 2;
MapTile.TYPE_SAND 				= 3;
MapTile.TYPE_GRASS 				= 4;
MapTile.TYPE_DIRT 				= 5;
MapTile.TYPE_MOUNTAIN 			= 6;

function MapTile(pos, type) {
	this.pos = pos;
	this.type = type;
}

MapTile.prototype.getColor = function() {
	switch (this.type) {
		case 1:
			return "#0000b4";
		case 2:
			return "#0000ff";
		case 3:
			return "#d2aa78";
		case 4:
			return "#0b630b";
		case 5:
			return "#8b4513";
		case 6:
			return "#b4b4b4";

		default:
			return "#ff00ff";
	}
}
