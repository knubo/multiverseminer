Utils = {
        'startTime': Date.now(),
};

// ---------------------------------------------------------------------------
// Utility functions
// ---------------------------------------------------------------------------
Utils.load = function(property, defaultValue) {
	loadedValue = localStorage[property];
	if (localStorage[property] == undefined) {
		return defaultValue;
	}

	return loadedValue;
};

Utils.loadBool = function(property, defaultValue) {
	loadedValue = localStorage[property];
	if (localStorage[property] == undefined) {
		return defaultValue;
	}

	return loadedValue == "true";
};

Utils.loadInt = function(property, defaultValue) {
	loadedValue = localStorage[property];
	if (localStorage[property] == undefined) {
		return defaultValue;
	}

	return parseInt(loadedValue);
};

Utils.loadFloat = function(property, defaultValue) {
	loadedValue = localStorage[property];
	if (localStorage[property] == undefined) {
		return defaultValue;
	}

	return parseFloat(loadedValue);
};

Utils.pad = function(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

Utils.getDayTimeInSeconds = function() {
	var now = new Date();
	then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
	return now.getTime() - then.getTime();
};

Utils.splitDateTime = function(seconds) {
    // returns array of [d, h, m, s, z]
    var result = [0, 0, 0, 0, 0];
    
    var milliSeconds = Math.floor(seconds);

    result[0] = Math.floor(milliSeconds / (24 * 60 * 60 * 1000));

    milliSeconds %= (24 * 60 * 60 * 1000);
    result[1] = Math.floor(milliSeconds / (60 * 60 * 1000));

    milliSeconds %= (60 * 60 * 1000);
    result[2] = Math.floor(milliSeconds / (60 * 1000));

    milliSeconds %= (60 * 1000);
    result[3] = Math.floor(milliSeconds / 1000);
    result[4] = milliSeconds;
    
    return result;
};

Utils.getDurationDisplay = function(seconds, highPrecision) {
    if (seconds === 0 || seconds == Number.POSITIVE_INFINITY) {
        return '~~';
    }
    
    var timeSplit = this.splitDateTime(seconds);
    var days, hours, minutes, seconds;

    days = timeSplit[0];
    days = (days > 0) ? days + 'd ' : '';

    hours = timeSplit[1];
    hours = (hours > 0) ? this.pad(hours, 2) + 'h ' : '';

    minutes = timeSplit[2];
    minutes = (minutes > 0) ? this.pad(minutes, 2) + 'm ' : '';

    seconds = timeSplit[3];
    seconds = (seconds > 0) ? this.pad(seconds, 2) + 's ' : '';

    if (highPrecision == true) {
        milliSeconds = timeSplit[4];
        milliSeconds = (milliSeconds > 0) ? this.pad(milliSeconds, 3) + 'ms' : '';

        return (days + hours + minutes + seconds + milliSeconds).trim();
    }

    return (days + hours + minutes + seconds).trim();
}

Utils.getShortTimeDisplay = function(seconds) {
    if (seconds === 0 || seconds == Number.POSITIVE_INFINITY) {
        return '~~';
    }
    
    var timeSplit = this.splitDateTime(seconds);
    
    hours = this.pad(timeSplit[1], 2) + ':';
    minutes = this.pad(timeSplit[2], 2) + ':';
    seconds = this.pad(timeSplit[3], 2);
    
    return hours + minutes + seconds;
}

Utils.logFormat = function(level, message, popup) {
	var time = '[' + this.getShortTimeDisplay(Date.now() - this.startTime) + ']: ';
	var fullMessage = time + level + ' ' + message;

	console.log(fullMessage);

	if (popup) {
		alert(fullMessage);
	}
};

Utils.log = function(message, silent) {
	if (Utils.logCallback && (silent == undefined || !silent)) {
		Utils.logCallback('information', message);
	} else {
		this.logFormat("INFO", message, false);
	}
};

Utils.stackTrace = function() {
	var err = new Error();
	return err.stack;
};

Utils.logError = function(message) {
	if (Utils.logCallback) {
		Utils.logCallback('error', message);
	} else {
		this.logFormat("ERROR", message, true);
	}
};
