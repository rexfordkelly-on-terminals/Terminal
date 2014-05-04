var Terminal = function(el, opt) {
	this.el = el;
	this.host = document.location.host;

	this.form = this.createForm(el.id);
	this.label = this.form.childNodes[0];
	this.input = this.form.childNodes[1];

	el.parentNode.insertBefore(this.form, el.nextSibling);

	this.keyboard = new Keyboard(this, this.input);
	// bind input capture (13 = enter)
	var captureInput = this.captureInput.bind(this);
	this.keyboard.keyBind('keypress', 13, captureInput);

	this.setPrefix('');
};

Terminal.prototype = {};

/*
@input
*/

// create form for use with keyboard object
Terminal.prototype.createForm = function(prefix) {
	var formId = prefix + '-input-container';
	var labelId = prefix + '-input-label';
	var inputId = prefix + '-input';

	var form = document.createElement('form');
	form.action = '#';
	form.autocomplete = false;
	form.className = formId;
	form.id = formId;
	form.method = 'post';

	var label = document.createElement('label');
	label.className = labelId;
	label.htmlFor = inputId;
	label.id = labelId;

	var input = document.createElement('input');
	input.autocomplete = false;
	input.className = inputId;
	input.id = inputId;

	form.appendChild(label);
	form.appendChild(input);

	return form;
};

// capture input from keyboard
Terminal.prototype.captureInput = function(e) {
	e.preventDefault();
	var v = this.input.value;
	this.input.value = '';
	v = this.trim(v);
	this.nl(this.cleanHtml(v));
};

/*
@text
*/

Terminal.prototype.setPrefix = function(t) {
	if (t) {
		this.nlprefix = "\n"+this.host+'/'+t+' $ ';
	}
	else {
		this.nlprefix = "\n"+this.host+' $ ';
	}

	if (this.label) {
		this.label.innerHTML = this.nlprefix;
	}
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

/*
@text.util
*/

// trim whitespace
Terminal.prototype.trim = function(s) {
	return s.replace(/^\s*/, '').replace(/\s*$/, '');
};

// clean html
Terminal.prototype.cleanHtml = function(t) {
	return t.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
};
