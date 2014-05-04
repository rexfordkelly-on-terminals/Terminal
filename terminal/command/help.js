var Command_Help = function(term) {
	this.term = term;
	this.name = 'help';
	this.help = 'Displays helpful information';
	term.register(this.name, this);
};

Command_Help.prototype = new Command;

Command_Help.prototype.invoke = function(args) {
	if (args.length) {
		this.man(args);
	}
	else {
		this.all();
	}
};

Command_Help.prototype.all = function() {
	this.term.out("\nAll available commands:");
	var c;
	for (c in this.term.commands) {
		this.term.out("\n\t" + c + "\t\t" + this.term.commands[c].help);
	}
};

Command_Help.prototype.man = function(v) {
	this.term.out("\nSorry, the \"man\" feature is still work in progress!");
};
