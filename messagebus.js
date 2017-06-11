function extend(base, c) {
	var output = function() {
		this.parent = function() {
			base.call(this);
		}.bind(this);
		if (c && typeof c === "function") {
			c.bind(this).apply(this,arguments);
		}
	}

	output.prototype = Object.create(base.prototype);
	output.prototype.constructor = output;
	return output;
}


var MessageBus = function() {
	this.globalNS = '__customMessageRegsiter';

	this.emit = function(namespace, payload, sync = false) {
		if (window[this.globalNS] && window[this.globalNS][namespace]) {
			for (var x = 0; x < window[this.globalNS][namespace].length; x++) {
				if (sync) {
					window[this.globalNS][namespace][x](payload);
				} else {
					setTimeout(function() {
						this.method(this.payload);
					}.bind({
						method: window[this.globalNS][namespace][x],
						payload: payload
					}), 0);
				}
			}
		}
	}

	this.on = function(namespace, func) {
		if (!window[this.globalNS]) {
			window[this.globalNS] = {}
		}
		if (!window[this.globalNS][namespace]) {
			window[this.globalNS][namespace] = [];
		}
		window[this.globalNS][namespace].push(func);
	}
}
