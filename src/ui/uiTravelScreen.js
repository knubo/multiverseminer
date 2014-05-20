require([ "starfield" ]);

UITravelScreen.prototype = new UIComponent();
UITravelScreen.prototype.$super = parent;
UITravelScreen.prototype.constructor = UITravelScreen;

function UITravelScreen() {
	this.id = 'travelScreen';
	
	this.parent = undefined;
	
	this.componentTravelDisplay = undefined;
	
	// ---------------------------------------------------------------------------
    // overrides
    // ---------------------------------------------------------------------------
    this.baseInit = this.init;
    this.baseUpdate = this.update;
    this.baseShow = this.show;
    this.baseHide = this.hide;
    
	// ---------------------------------------------------------------------------
    // main functions
    // ---------------------------------------------------------------------------
    this.init = function() {
    	this.baseInit();
    	
    	this.updateWhenNeededOnly = false;
    	
    	this.componentTravelDisplay = new UIComponent('travelDisplay');
        this.componentTravelDisplay.init();
        this.componentTravelDisplay.enabled = true;
        this.componentTravelDisplay.updateCallback = this.updateTravelDisplay;
        
        // Todo: refactor, just a test for now
        $('#travelBackground').starfield({ speed: 10, mouseMove: false });
    };
    
    this.update = function(currentTime) {
    	if(!this.baseUpdate(currentTime)) {
    		return false;
    	};
    	
    	this.componentTravelDisplay.invalidate();
    	this.componentTravelDisplay.update(currentTime);
    };
    
    this.show = function() {
    	this.isVisible = true;
    	this.mainDiv.show().animate({opacity: 1}, 500);
    	this.invalidate();
    };
    
    this.hide = function() {
    	this.isVisible = false;
    	this.mainDiv.animate({opacity: 0}, 500, function() { $(this).hide(); });
    };
    
    // ---------------------------------------------------------------------------
    // travel functions
    // ---------------------------------------------------------------------------
    this.updateTravelDisplay = function() {
    	var remaining = game.getRemainingTravelTime();
    	var remainingTime = Math.floor(remaining / game.player.getTravelSpeed()) * 1000;
    	$('#travelDistance').text(game.getRemainingTravelTime().formatNumber() + ' km - ETA: ' + utils.getShortTimeDisplay(remainingTime));
    };
};