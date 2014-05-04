var History = function(term) {
	this.history = [];
	this.currentIndex = 0;
};

History.prototype = {};

History.prototype.push = function(v) {
	this.history.push(v);
	this.reset();
};

History.prototype.reset = function(term) {
	this.currentIndex = this.history.length;
};

History.prototype.getCurrent = function() {
	if (this.history[this.currentIndex]) {
		return this.history[this.currentIndex];
	}
	return '';
};

History.prototype.last = function() {
	if (this.currentIndex > 0) {
		this.currentIndex--;
	}
	return this.getCurrent();
};

History.prototype.next = function() {
	if (this.currentIndex < this.history.length) {
		this.currentIndex++;
	}
	return this.getCurrent();
};
