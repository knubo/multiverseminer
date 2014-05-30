require([ "uiplanetscreen", "uitravelscreen", "uifloating", "jquery", "jqueryui", "jgrowl" ]);

// ---------------------------------------------------------------------------
// Some const values used in ui code
// ---------------------------------------------------------------------------
MouseButtons = {
		left: 1,
		middle: 2,
		right: 3
};

//---------------------------------------------------------------------------
// UI Class
// ---------------------------------------------------------------------------
function UI() {
    this.screenPlanet = undefined;
    this.screenTravel = undefined;
	
    this.isDragging = false;
    this.pendingDragElementTime = Date.now();
    this.pendingDragElement = undefined;
    this.activeDragElement = undefined;
    this.activeDragSource = undefined;
    this.activeDragTarget = undefined;
    
    this.activeFloats = [];
    
    this.cursorPositionX = 0;
    this.cursorPositionY = 0;
    
    this.numberFormatter = utils.formatters.raw;
        
    // ---------------------------------------------------------------------------
    // main UI functions
    // ---------------------------------------------------------------------------
    this.init = function() {
    	$(document).on('mousemove', this.onMouseMove);
    	$(document).on('mouseup', this.onMouseUp);
    	
    	this.screenPlanet = new UIPlanetScreen();
    	this.screenPlanet.init();
    	
    	this.screenTravel = new UITravelScreen();
    	this.screenTravel.init();
    	
    	// Todo: function to switch screens
    	if(game.currentPlanet) {
    		this.screenPlanet.show();
    		this.screenTravel.hide();
    	} else {
    		this.screenPlanet.hide();
    		this.screenTravel.show();
    	}
    };
    
    this.update = function(currentTime) {
        $('#timeDisplayText').text(utils.getShortTimeDisplay(utils.getDayTimeInSeconds()));
        
		if(game.settings.travelActive) {
			$('#depth').text(game.settings.travelDistanceElapsed + " / " + game.settings.travelDistanceRemaining);
		} else {
			$('#depth').text(game.currentPlanet.currentDepth);
		}

		// Todo: do this a bit more proper maybe with a callback or something
		if(game.currentPlanet && !ui.screenPlanet.isVisible) {
			ui.screenTravel.hide();
			ui.screenPlanet.show();
		}
		
        this.screenPlanet.update(currentTime);
        this.screenTravel.update(currentTime);
        
        // Update floating components
        for(var i = 0; i < this.activeFloats.length; i++) {
        	var float = this.activeFloats[i];
        	float.update(currentTime);
        	if(float.timedOut) {
        		// Remove the float
        		float.remove();
        		this.activeFloats.splice(i, 1);
        	}
        }
        
        // Check if we are starting a drag operation
        if(this.pendingDragElement && currentTime - this.pendingDragElementTime > sys.dragDelay) {
        	this.enterDrag(this.pendingDragElement);
        	this.pendingDragElement = undefined;
        }
    };
        
    this.onMouseMove = function(parameter) {
    	var self = ui;
    	
    	this.cursorPositionX = parameter.pageX;
    	this.cursorPositionY = parameter.pageY;
    	
    	if(!self.isDragging) {
    		return;
    	}
    	
    	self.activeDragElement.moveTo(this.cursorPositionX + 1, this.cursorPositionY + 1);
    };
    
    this.onMouseUp = function(parameter) {
    	var self = ui;
    	
    	// If we are pending a drag cancel it
    	if(self.pendingDragElement) {
    		self.pendingDragElement = undefined;
    	}
    	
    	// If we are not in a drag bail out
    	if(!self.isDragging) {
    		return;
    	}
    	
    	self.finishDrag();
    };
    
    this.notify = function(message) {
    	$.jGrowl(message);
    };
    
    this.notifyError = function(message) {
    	$.jGrowl(message, {header: 'Error'});
    };
    
    this.createFloat = function(content, classes, x, y) {
    	var float = new UIFloating(content, classes || "genericFloating");
    	float.parent = $('#floatingArea');
    	float.init();
    	float.moveTo(x, y);
    	
    	// Todo: use something else as default i guess
    	float.timeOut = Date.now() + 2;
    	
    	this.activeFloats.push(float);
    	
    	return float;
    };
    
    this.beginDrag = function(source) {
    	if(!sys.enableDragDrop) {
    		return;
    	}
    	
    	// Queue this element for dragging
    	this.activeDragSource = source;
    	this.pendingDragElement = source;
    	this.pendingDragElementTime = Date.now();
    };
    
    this.enterDrag = function(source) {
    	this.isDragging = true;
    	var sourceElement = source.getMainElement();
    	this.activeDragElement = new UIFloating(sourceElement.clone(), 'dragDropFloating');
    	this.activeDragElement.init();
    	this.activeDragElement.moveTo(this.cursorPositionX + 1, this.cursorPositionY + 1);
    };
    
    this.setDragTarget = function(target) {
    	if(!this.isDragging) {
    		return;
    	}
    	
    	this.activeDragTarget = target;
    };
    
    this.getDragSource = function() {
    	if(!this.isDragging) {
    		return undefined;
    	}
    	
    	return this.activeDragSource;
    };
    
    this.finishDrag = function(source) {
    	// Sanity check before resolve
    	if(this.activeDragSource && this.activeDragTarget) {
    		this.activeDragTarget.drop(this.activeDragSource);
    	}
    	
    	this.activeDragSource = undefined;
    	this.activeDragTarget = undefined;
    	this.activeDragElement.remove();
    	this.isDragging = false;
    };
    
    this.showDialog = function(buttonSuccess, buttonCancel, title, callback) {
    	var buttons = {};
    	buttons[buttonSuccess] = function() {
    		callback();
    		$(this).dialog("close");
    	};
    	buttons[buttonCancel] = function() {
    		$(this).dialog("close");
    	};
    	
    	$('<div></div>').dialog({
    		autoOpen: true,
    		title: title,
    		modal: true,
    		buttons: buttons,
    		open: function() {
    			$(this).siblings('.ui-dialog-buttonpane').find('button:eq(1)').focus();
    		    }
    	});
    };
    
    // ---------------------------------------------------------------------------
    // building functions
    // ---------------------------------------------------------------------------
    this.buildCraftingCostTooltip = function(item) {
        // We are building a text tooltip for now, html will be a bit more work
        //  for html tooltips see: http://api.jqueryui.com/tooltip/#option-content
        var cost = game.getCraftingCost(item.id, 1);
        var costEntries = [];
        for(var key in cost) {
            var item = game.getItem(key);
            if(item === undefined) {
            	utils.logError("Invalid item in crafting for " + item.id + ": " + key);
            	continue;
            }
            costEntries.push(cost[key]+' '+item.name);
        }
        
        return costEntries.join(', ');
    };
    
    this.buildGearSlot = function(id, slotType, itemId, parent) {
        var item = undefined;
        if(itemId) {
            item = game.getItem(itemId);
        }
        
        var slot = new UISlot(id + '_' + slotType, parent);
        slot.classes = slotType + ' gearSlot ';
        slot.init();
        
        if(item != undefined) {
        	slot.set(item, 1);
        }
        
        return slot;
    };
    
    this.buildItemTooltip = function(item) {
        // For now only text
        return item.name;
    };
};
