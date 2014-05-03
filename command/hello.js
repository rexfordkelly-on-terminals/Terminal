var Command_Hello = function(term) {
	this.term = term;
};

Command_Hello.prototype = new Command;

Command_Hello.prototype.name = false;

Command_Hello.prototype.test = function(v) {
	v = v.split();
	return /^(hello|hi|bonjour)$/i.test(v[0]);
};

Command_Hello.prototype.invoke = function(v) {
	var fw = v.match(/^[a-z]+/);
	if (fw.length) {
		fw = fw[0];
		fw = fw[0].toUpperCase() + fw.slice(1);
		this.term.out("\n" + fw + '!');
	}
};
