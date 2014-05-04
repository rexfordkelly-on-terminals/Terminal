var Command = function(term) {
	this.term = term;
};

Command.prototype = {};

Command.prototype.name = 'unknown';
Command.prototype.help = 'No help information for unknown';

Command.prototype.test = function(v) {
	return false;
};

Command.prototype.invoke = function(v) {
	return;
};

// referenced by Command_Man
Command.prototype.man = function() {
	this.term.out("\nNo man page for " + this.name);
};
