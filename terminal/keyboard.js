var Keyboard = function(term, input) {
	this.term = term;
	this.input = input;
	this.binding = {
		keydown: {},
		keypress: {},
		keyup: {}
	};

	this.init();
};

Keyboard.prototype = {};

/*
@util
*/

Keyboard.prototype.k = function(e) {
	return e.key ? e.key : e.keyCode;
};

Keyboard.prototype.focusInput = function(e) {
	this.input.focus();
};

/*
@events
*/

Keyboard.prototype.key = function(e) {
	if (! this.binding[e.type]) {
		return;
	};

	var k = this.k(e);
	if (! (this.binding[e.type][k] instanceof Array)) {
		return;
	}

	var i;
	for (i = 0; i < this.binding[e.type][k].length; i++) {
		this.binding[e.type][k][i](e);
	}
};

Keyboard.prototype.keyBind = function(type, key, callback) {
	if (! (this.binding[type][key] instanceof Array)) {
		this.binding[type][key] = [];
	}

	this.binding[type][key].push(callback);
};

/*
@init
*/

// initialise bindings
Keyboard.prototype.init = function() {
	this.focusInputBound = this.focusInput.bind(this);
	document.addEventListener('keydown', this.focusInputBound);

	this.keyBound = this.key.bind(this);
	document.addEventListener('keypress', this.keyBound);
	document.addEventListener('keyup', this.keyBound);
};

// remove bindings (temporarily or otherwise)
Keyboard.prototype.deinit = function() {
	document.removeEventListener('keydown', this.focusInputBound);
	document.removeEventListener('keypress', this.keyBound);
	document.removeEventListener('keyup', this.keyBound);
};
