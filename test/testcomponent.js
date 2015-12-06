TestComponent.prototype = new Component();
TestComponent.prototype.constructor = TestComponent;

TestComponent.type = "test";

function TestComponent(time, number) {
	Component.call(this, TestComponent.type);

	this.time = time;
	this.number = number;
}

TestComponent.prototype.toString = function() {
	return this.type + "[time=" + this.time + " number=" + this.number + "]";
}
