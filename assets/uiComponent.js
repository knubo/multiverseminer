function UIComponent(id, updateCallback) {
    this.id = id;
    this.updateTime = 0;
    this.updateInterval = 0;
    this.updateCallback = updateCallback;    
    this.enabled = false;
    this.needUpdate = true;
    this.updateWhenNeededOnly = true;
    
    // ---------------------------------------------------------------------------
    // main functions
    // ---------------------------------------------------------------------------
    this.hide = function() {
        $('#' + this.id).hide();
    };
    
    this.show = function() {
        $('#' + this.id).show();
    };
    
    this.update = function(currentTime) {
        if(!this.enabled) {
            return false;
        }
        
        // If we don't need an update and we are only allowed to update then bail out
        if(!this.needUpdate && this.updateWhenNeededOnly) {
            return false;
        }
        
        // If we don't need an update and we are updating in intervals and our interval is not yet up, bail out
        if(!this.needUpdate && this.updateInterval > 0 && currentTime - this.updateTime < this.updateInterval) {
            return false;
        }
        
        this.updateCallback();
        this.updateTime = currentTime;
        this.needUpdate = false;
        return true;
    };
};