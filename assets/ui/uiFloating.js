function UIFloating(content) {
	
	this.mainDiv = undefined;
	
	// ---------------------------------------------------------------------------
    // main functions
    // ---------------------------------------------------------------------------
	this.init = function() {
		this.mainDiv = $('<div class="floating noSelect"></div>');
	};
};