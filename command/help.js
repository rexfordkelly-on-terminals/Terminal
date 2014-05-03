var Command_Help = function(term) {
	this.term = term;
};

Command_Help.prototype = new Command;

Command_Help.prototype.name = 'help';
Command_Help.prototype.help = 'Displays helpful information';

Command_Help.prototype.test = function(v) {
	v = v.split();
	return /^help$/.test(v[0]);
};

Command_Help.prototype.invoke = function(v) {
	if (v.length == 4) {
		this.displayAll();
	}
	else {
		this.displayMan(v);
	}
};

Command_Help.prototype.displayAll = function() {
	this.term.out("\nAll available commands:");
	var c;
	for (c = 0; c < this.term.commands.length; c++) {
		var command = this.term.commands[c];
		if (! command.name) {
			continue;
		}
		this.term.out("\n\tCOMMAND\t\tHELP".replace('COMMAND', command.name).replace('HELP', command.help));
	}
};

Command_Help.prototype.displayMan = function(v) {
	this.term.out("\nSorry, this feature is still work in progress!");
};
