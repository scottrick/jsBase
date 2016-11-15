MapPosition.prototype = new Component();
MapPosition.prototype.constructor = MapPosition;

MapPosition.type = "map_position";

function MapPosition(coordinate) {
	Component.call(this, MapPosition.type);

	if (coordinate != null) {
		this.coordinate = coordinate;
	}
	else {
		this.coordinate = new Vector(0, 0);
	}
}
