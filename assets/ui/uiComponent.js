function UIComponent(id, updateCallback) {
    this.id = id;
    this.updateTime = 0;
    this.updateInterval = 0;
    this.updateCallback = updateCallback;    
    this.enabled = false;
    this.invalidated = true;
    this.updateWhenNeededOnly = true;
    
    // ---------------------------------------------------------------------------
    // main functions
    // ---------------------------------------------------------------------------
    this.hide = function() {
        $('#' + this.id).hide("slide", { direction: "left"  }, 200);
    };
    
    this.show = function() {
        $('#' + this.id).show("slide", { direction: "right"  }, 200);
    };
    
    this.update = function(currentTime) {
        if(!this.enabled) {
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
        
        this.updateCallback();
        this.updateTime = currentTime;
        this.invalidated = false;
        return true;
    };
    
    this.invalidate = function() {
    	this.invalidated = true;
    };
};