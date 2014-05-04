var Command_History = function(term) {
	this.term = term;
	this.name = 'history';
	this.help = 'List recently entered commands';
	term.register(this.name, this);

	this.history = [];
	this.currentIndex = 0;
	this.limit = 100;

	var last = this.last.bind(this);
	var next = this.next.bind(this);
	// 38 = up
	term.keyboard.keyBind('keyup', 38, last);
	// 40 = down
	term.keyboard.keyBind('keyup', 40, next);
};

Command_History.prototype = new Command;

Command_History.prototype.invoke = function(args) {
	var h;
	var l = this.history.length;
	this.term.out("\nRecently entered commands:");
	for (h = 0; h < l; h++) {
		this.term.out("\n\t" + (l-h) + "\t\t" + this.history[h]);
	}
};

Command_History.prototype.push = function(v) {
	if (! v.length) {
		return;
	}
	this.history.push(v);
	while (this.history.length > this.limit) {
		this.history.shift();
	}
	this.reset();
};

Command_History.prototype.reset = function(term) {
	this.currentIndex = this.history.length;
};

Command_History.prototype.getCurrent = function() {
	if (this.history[this.currentIndex]) {
		return this.history[this.currentIndex];
	}
	return '';
};

Command_History.prototype.updateInput = function() {
	var t = this.getCurrent();
	this.term.input.value = t;
};

Command_History.prototype.last = function(e) {
	if (this.currentIndex > 0) {
		this.currentIndex--;
	}
	this.updateInput();
};

Command_History.prototype.next = function(e) {
	if (this.currentIndex < this.history.length) {
		this.currentIndex++;
	}
	this.updateInput();
};
