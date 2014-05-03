var Command_History = function(term) {
	this.term = term;
};

Command_History.prototype = new Command;

Command_History.prototype.name = 'history';
Command_History.prototype.help = 'List previously entered commands';

Command_History.prototype.test = function(v) {
	return /^history$/.test(v);
};

Command_History.prototype.invoke = function(v) {
	var h;
	var l = this.term.history.history.length;
	for (h = 0; h < l; h++) {
		this.term.out("\n\t" + (l-h) + "\t" + this.term.history.history[h]);
	}
};
