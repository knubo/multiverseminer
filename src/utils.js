var utils = new Utils();

exports.utils = utils;

ErrorLevel = {
	'debug': 'DEBUG',
	'info': 'INFO',
	'error': 'ERROR'
};

function Vector3(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
};

function Vector2(x, y) {
	this.x = x;
	this.y = y;
};

function Utils() {
	this.startTime = Date.now();
	
	// ---------------------------------------------------------------------------
	// misc utility functions
	// ---------------------------------------------------------------------------
	this.rgba = function(r, g, b, a) {
		  r = Math.floor(r) || 0;
		  g = Math.floor(g) || 0;
		  b = Math.floor(b) || 0;
		  a = a || 1;
		  return ["rgba(", r, ",", g,",", b, ",", a,")"].join("");
	};
	
	this.pad = function(n, width, z) {
		z = z || '0';
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	};
	
	this.loadScripts = function(scripts, nextId, finish) {
		if (nextId >= scripts.length) {
			finish();
			return;
		}

		var script = scripts[nextId];
		var loaded = jQuery.inArray(script, this.loadedScripts);
		if (loaded >= 0) {
			this.log("Script is already loaded: " + nextId, false);
			this.loadScripts(scripts, nextId + 1, finish);
			return;
		}

		this.log("Loading " + script, false);
		this.loadedScripts.push(script);
		try {
			if (/\.js$/.exec(script)) {
				$.getScript(script).done(function(script, textStatus) {
					this.log("  -> DONE", false);
					this.loadScripts(scripts, nextId + 1, finish);
				}).fail(function(jqxhr, settings, exception) {
							this.logError("  -> FAIL: " + exception + "\n" + exception.stack);
						});
			} else if (/\.css$/.exec(script)) {
				// Append the style
				$('<link>').attr({
					rel : 'stylesheet',
					type : 'text/css',
					href : script
				}).appendTo($('head'));
				this.log("  -> DONE", false);
				this.loadScripts(scripts, nextId + 1, finish);
			} else {
				this.logError("Unhandled script type!");
			}
		} catch (e) {
			this.logError(e +": "+ this.stackTrace());
		}
	};
	
	this.getRandom = function(min, max) {
	    return Math.random() * (max - min) + min;
	};
	
	this.getRandomInt = function(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	
	// ---------------------------------------------------------------------------
	// Time / Date functions
	// ---------------------------------------------------------------------------	
	this.getDayTimeInSeconds = function() {
		var now = new Date();
		then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
		return now.getTime() - then.getTime();
	};
	
	this.splitDateTime = function(seconds) {
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
	
	this.getDurationDisplay = function(seconds, highPrecision) {
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
	};
	
	this.getShortTimeDisplay = function(seconds) {
	    if (seconds === 0 || seconds == Number.POSITIVE_INFINITY) {
	        return '~~';
	    }
	    
	    var timeSplit = this.splitDateTime(seconds);
	    
	    hours = this.pad(timeSplit[1], 2) + ':';
	    minutes = this.pad(timeSplit[2], 2) + ':';
	    seconds = this.pad(timeSplit[3], 2);
	    
	    return hours + minutes + seconds;
	};
	
	// ---------------------------------------------------------------------------
	// storage functions
	// ---------------------------------------------------------------------------
	this.deleteSetting = function(key) {
		if(localStorage[key]) {
			delete localStorage[key];
		}
	};
	
	this.load = function(property, defaultValue) {
		loadedValue = localStorage[property];
		if (localStorage[property] == undefined) {
			return defaultValue;
		}
	
		return loadedValue;
	};
	
	this.loadBool = function(property, defaultValue) {
		loadedValue = localStorage[property];
		if (localStorage[property] == undefined) {
			return defaultValue;
		}
	
		return loadedValue == "true";
	};
	
	this.loadInt = function(property, defaultValue) {
		loadedValue = localStorage[property];
		if (localStorage[property] == undefined) {
			return defaultValue;
		}
	
		return parseInt(loadedValue);
	};
	
	this.loadFloat = function(property, defaultValue) {
		loadedValue = localStorage[property];
		if (localStorage[property] == undefined) {
			return defaultValue;
		}
		return parseFloat(loadedValue);
	};
		
	// ---------------------------------------------------------------------------
	// logging functions
	// ---------------------------------------------------------------------------
	this.logFormat = function(level, message) {
		var time = '[' + this.getShortTimeDisplay(Date.now() - this.startTime) + ']: ';
		var fullMessage = time + level + ' ' + message;
	
		switch(level) {
			case ErrorLevel.error: {
				throw new Error(fullMessage);
				break;
			}
			
			default: {
				console.log(fullMessage);
				break;
			}
		}
	};
	
	this.log = function(message, silent) {
		this.logFormat(ErrorLevel.info, message);
	};
	
	this.stackTrace = function() {
		var err = new Error();
		return err.stack;
	};
	
	this.logError = function(message) {
		this.logFormat(ErrorLevel.error, message);
	};
	
	this.logDebug = function(message) {
		this.logFormat(ErrorLevel.debug, message);
	};
	
	// ---------------------------------------------------------------------------
	// Formatting
	// ---------------------------------------------------------------------------
	this.formatEveryThirdPower = function(notations) 
	{
	  return function (value)
	  {
	    var base = 0;
	    var notationValue = '';
	    if (value >= 1000000 && Number.isFinite(value))
	    {
	      value /= 1000;
	      while(Math.round(value) >= 1000)
	      {
	        value /= 1000;
	        base++;
	      }
	      
	      if (base > notations.length)
	      {
	        return 'Infinity';
	      } 
	      else 
	      {
	        notationValue = notations[base];
	      }
	    }
	
	    return ( Math.round(value * 1000) / 1000.0 ) + notationValue;
	  };
	};
	
	this.formatScientificNotation = function(value)
	{
	  if (value === 0 || !Number.isFinite(value) || (Math.abs(value) > 1 && Math.abs(value) < 100))
	  {
	    return this.formatRaw(value);
	  }
	  
	  var sign = value > 0 ? '' : '-';
	  value = Math.abs(value);
	  var exp = Math.floor(Math.log(value)/Math.LN10);
	  var num = Math.round((value/Math.pow(10, exp)) * 100) / 100;
	  var output = num.toString();
	  if (num === Math.round(num)) 
	  {
	    output += '.00';
	  } 
	  else if (num * 10 === Math.round(num * 10))
	  {
	    output += '0';
	  }
	  
	  return sign + output + '*10^' + exp;
	};
	
	this.formatRaw = function(value)
	{
	  return (Math.round(value * 1000) / 1000).toString();
	};
	
	this.formatters = {
			'off': undefined,
			'raw': this.formatRaw,
			'name': this.formatEveryThirdPower(['', ' million', ' billion', ' trillion', ' quadrillion',
			                                          ' quintillion', ' sextillion', ' septillion', ' octillion',
			                                          ' nonillion', ' decillion'
			                                        ]),
			'shortName': this.formatEveryThirdPower(['', ' M', ' B', ' T', ' Qa', ' Qi', ' Sx',' Sp', ' Oc', ' No', ' De' ]),
			'shortName2': this.formatEveryThirdPower(['', ' M', ' G', ' T', ' P', ' E', ' Z', ' Y']),
			'scientific': this.formatScientificNotation,
	};
};