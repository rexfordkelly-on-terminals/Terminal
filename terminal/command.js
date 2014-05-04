var Command = function(term) {
	this.term = term;
	this.name = 'abstract';
	this.help = 'n/a';
};

Command.prototype = {};

Command.prototype.parse = function(v) {
	// overly simplistic but ok for prototype
	v = v.split(/\s+/);
	return [v.shift(), v];
};

Command.prototype.invoke = function(v) {
	return;
};
