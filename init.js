var t;
(function() {
	var tc = document.getElementById('terminal');
	var ti = document.getElementById('terminal-input');
	var tp = document.getElementById('terminal-input-prefix');
	t = new Terminal(tc, ti, tp);
	t.init();
})();
