function UISlot() {
	this.controlType = 'UISlot';
	
	this.mainDiv = undefined;
	this.iconDisplay = undefined;
	this.countDisplay = undefined;
	
	this.isClear = true;
	
	this.displayZero = false;
	
	this.canDrag = true;
	this.canDrop = true;
	
	this.item = undefined;
	
	this.onClick = undefined;
	
	// ---------------------------------------------------------------------------
    // main functions
    // ---------------------------------------------------------------------------
	this.init = function() {
		this.mainDiv = $('<div class="itemSlot itemSlotNonHover noSelect"></div>');
		this.mainDiv.hover(
                function() { $(this).addClass("itemSlotHover noSelect"); $(this).removeClass("itemSlotNonHover"); },
                function() { $(this).addClass("itemSlotNonHover noSelect"); $(this).removeClass("itemSlotHover"); }
        );
        
		this.mainDiv.append('<p class="itemSlotText noSelect">0</p>');
		this.mainDiv.mousedown({ self: this }, this.onMouseDown );
		this.mainDiv.mouseup({ self: this }, this.onMouseUp );
		this.mainDiv.dblclick({ self: this }, this.onDoubleClick );
	};
	
	// ---------------------------------------------------------------------------
    // events
    // ---------------------------------------------------------------------------
	this.onMouseDown = function(parameters) {
		var self = parameters.data.self;
		
		// Utils.log('SlotMouseDown: ' + parameters.which+" " + self.content, true);
		
		// If we don't have content don't do anything on mouse down
		if(!self.content) {
			return;
		}
				
		if(self.onClick) {
			self.onClick(self);
		}
		
		if(!self.canDrag) {
			return;
		}
	};
	
	this.onMouseUp = function(parameters) {
		var self = parameters.data.self;
		// Utils.log('SlotMouseUp: '  + parameters.which+" "+ self.content, true);
	};
	
	this.onDoubleClick = function(parameters) {
		var self = parameters.data.self;
		// Utils.log('SlotDBLC: '  + parameters.which+" "+ self.content, true);
	};
	
	// ---------------------------------------------------------------------------
    // slot functions
    // ---------------------------------------------------------------------------
	this.getMainElement = function() {
		return this.mainDiv;
	};
	
	this.set = function(item, count) {
		this.item = item;
		
		var icon = item.icon || ui.getDefaultItemIcon(item);
		
		this.iconDisplay = $('<img class="itemSlotIcon noselect" src="' + icon + '"/>');
		this.countDisplay = $('<div class="itemSlotText noselect"></div>');
		
		this.mainDiv.attr('title', item.name);
		this.mainDiv.append(this.iconDisplay);
		this.mainDiv.append(this.countDisplay);
		
		this.update(count);
	};
	
	this.update = function(count) {
		if (!count) count = 0;
		
		var countDisplayValue = count.toString();		
		if(count <= 0) {
			countDisplayValue = this.displayZero ? '0' : '';
		};
		
		this.countDisplay.text(countDisplayValue);
	};
	
	this.clear = function() {
		this.mainDiv.empty();
		this.mainDiv.attr('title', '');
	};
	
	this.canDrop = function(other) {
		if(!other.controlType || other.controlType != this.controlType) {
			return false;
		}
		
		// Todo
	};
	
	this.drop = function(other) {
		// Todo
	};
};