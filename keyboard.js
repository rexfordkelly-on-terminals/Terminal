var Keyboard = function(term, input) {
	this.term = term;
	this.input = input;
};

Keyboard.prototype = {};

Keyboard.prototype.keys = {
	enter: 13,
	up: 38,
	down: 40
};

Keyboard.prototype.getKey = function(e) {
	return e.key ? e.key : e.keyCode;
};

Keyboard.prototype.focusInput = function(e) {
	this.input.focus();
};

Keyboard.prototype.keypress = function(e) {
	var k = this.getKey(e);
	if (k == this.keys.enter) {
		e.preventDefault();
		this.term.captureKeyboard();
	};
};

Keyboard.prototype.keyup = function(e) {
	var k = this.getKey(e);
	switch(k) {
		case this.keys.up:
			this.term.keyboardUp();
		break;
		case this.keys.down:
			this.term.keyboardDown();
		break;
	}
};

// initialise binding
Keyboard.prototype.init = function() {
	this.focusInputBound = this.focusInput.bind(this);
	document.addEventListener('keydown', this.focusInputBound);

	this.keypressBound = this.keypress.bind(this);
	document.addEventListener('keypress', this.keypressBound);

	this.keyupBound = this.keyup.bind(this);
	document.addEventListener('keyup', this.keyupBound);
};

// disable binding without deleting self
Keyboard.prototype.deinit = function() {
	document.addEventListener('keydown', this.focusInputBound);
	document.removeEventListener('keypress', this.keypressBound);
};
