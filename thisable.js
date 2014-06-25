// - -------------------------------------------------------------------- - //

var Thisable = require("./thenable.js");

Thisable.prototype.bind = function(_this) {
	this._this = _this;
};

var then = Thisable.prototype.then;

Thisable.prototype.then = function() {
	if (this._this) {
		for (var i = 0; i < arguments.length; i++) {
			if (typeof arguments[i] == "function") {
				arguments[i] = arguments[i].bind(this._this);
			}
		}
	}
	return then.apply(this,arguments);
};

module.exports = exports = Thisable;

// - -------------------------------------------------------------------- - //