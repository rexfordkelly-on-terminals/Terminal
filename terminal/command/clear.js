var Command_Clear = function(term) {
	this.term = term;
};

Command_Clear.prototype = new Command;

Command_Clear.prototype.name = 'clear';
Command_Clear.prototype.help = 'Clear the screen';

Command_Clear.prototype.test = function(v) {
	return /^clear$/.test(v);
};

Command_Clear.prototype.invoke = function(v) {
	this.term.clear();
};
