function UIComponent(id) {
    this.id = id;
    
    this.parent = undefined;
    this.classes = '';
    
    this.mainDiv = undefined;
    
    this.updateTime = 0;
    this.updateInterval = 0;
    
    this.updateCallback = undefined;

    this.isVisible = true;
    this.enabled = true;
    this.invalidated = true;
    this.updateWhenNeededOnly = true;
    
    // ---------------------------------------------------------------------------
    // main functions
    // ---------------------------------------------------------------------------
    this.init = function() {    	
    	// Check if the component holder exist, if not create it
    	this.mainDiv = $('#' + this.id);
    	if(this.mainDiv.length == 0) {
    		this.mainDiv = $('<div id="' + this.id + '" class="'+ this.classes +'"></div>');
    		// We are creating it so either append to body or a given parent
    		if(!this.parent) {
    			$(document.body).append(this.mainDiv);
    		} else {
    			this.parent.append(this.mainDiv);
    		}
    	}
    };
    
    this.hide = function(direction) {
    	this.isVisible = false;
    	this.mainDiv.hide("slide", { direction: direction || "left"  }, 200);
    };
    
    this.show = function(direction) {
    	this.isVisible = true;
    	this.mainDiv.show("slide", { direction: direction || "right"  }, 200);
    	this.invalidate();
    };
    
    this.update = function(currentTime) {
        if(!this.enabled || !this.isVisible) {
            return false;
        }

        // If we don't need an update and we are only allowed to update then bail out
        if(!this.invalidated && this.updateWhenNeededOnly) {
            return false;
        }

        // If we don't need an update and we are updating in intervals and our interval is not yet up, bail out
        if(!this.invalidated && this.updateInterval > 0 && currentTime - this.updateTime < this.updateInterval) {
            return false;
        }

        if(this.updateCallback) {
        	this.updateCallback();
        }

        this.updateTime = currentTime;
        this.invalidated = false;
        return true;
    };
    
    this.invalidate = function() {
    	this.invalidated = true;
    };
    
    this.getMainElement = function() {
		return this.mainDiv;
	};
};