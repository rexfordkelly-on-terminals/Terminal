var Terminal = function(el, input, inputPrefix) {
	this.el = el;
	this.input = input;
	this.inputPrefix = inputPrefix;
	this.host = document.location.host;
};

Terminal.prototype = {};

/*
@text
*/

Terminal.prototype.updatePrefix = function(p) {
	if (p) {
		this.nlprefix = "\nHOST/PREFIX $ ".replace('HOST', this.host).replace('PREFIX', p);
	}
	else {
		this.nlprefix = "\nHOST $ ".replace('HOST', this.host);
	}
	this.inputPrefix.innerHTML = this.nlprefix;
};

// clear text
Terminal.prototype.clear = function() {
	this.el.innerHTML = '';
	this.hasText = false;
};

// put line abstract
Terminal.prototype.out = function(t) {
	t = this.cleanHtml(t);
	this.el.innerHTML += t;
	this.hasText = true;
};

// put line with prefix
Terminal.prototype.nl = function(t) {
	if (t) {
		t = this.nlprefix+t;
	}
	else {
		t = this.nlprefix;
	}
	if (! this.hasText) {
		t = t.replace(/^\n*/, '');
	}
	this.out(t);
};

// clean html
Terminal.prototype.cleanHtml = function(t) {
	return t.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
};

/*
@commands
*/

Terminal.prototype.registerCommand = function(c) {
	this.commands.push(c);
};

Terminal.prototype.initCommands = function() {
	this.commands = [];
};

Terminal.prototype.testCommands = function(v) {
	var c, t = false;
	for (c = 0; c < this.commands.length; c++) {
		if (this.commands[c].test(v)) {
			t = true;
			this.commands[c].invoke(v);
			break;
		}
	}
	if (! t) {
		this.out("\nUnrecognised command \"COMMAND\"".replace('COMMAND', v));
	}
};

/*
@history
*/

Terminal.prototype.initHistory = function() {
	this.history = new History(this);
};

// requires keyboard
Terminal.prototype.keyboardUp = function() {
	var v = this.history.last();
	this.input.value = v;
};

// requires keyboard
Terminal.prototype.keyboardDown = function() {
	var v = this.history.next();
	this.input.value = v;
};


/*
@keyboard
*/

Terminal.prototype.clean = function(s) {
	return s.replace(/^\s*/, '').replace(/\s*$/, '');
};

Terminal.prototype.captureKeyboard = function() {
	var v = this.clean(this.input.value);
	this.history.push(v);
	this.input.value = '';
	this.nl(v);
	this.testCommands(v);
};

Terminal.prototype.initKeyboard = function() {
	this.keyboard = new Keyboard(this, this.input);
	this.keyboard.init();
};

/*
@init
*/

Terminal.prototype.init = function() {
	this.updatePrefix('');
	this.clear();

	this.initHistory();
	this.initKeyboard();

	this.initCommands();
	this.registerCommand(new Command_Clear(this));
	this.registerCommand(new Command_Hello(this));
	this.registerCommand(new Command_Help(this));
	this.registerCommand(new Command_History(this));

	this.nl('Welcome to HOST'.replace('HOST', this.host));
};
