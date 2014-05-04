var Command_Clear = function(term) {
	this.term = term;
	this.name = 'clear';
	this.help = 'Clear the screen';
	term.register(this.name, this);
};

Command_Clear.prototype = new Command;

Command_Clear.prototype.invoke = function(args) {
	this.term.clear();
};
