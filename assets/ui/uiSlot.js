function UISlot(classes) {
	this.controlType = 'UISlot';
	
	this.mainDiv = undefined;
	this.iconDisplay = undefined;
	this.countDisplay = undefined;
	
	this.classes = classes || 'itemSlot';
	
	this.isClear = true;
	
	this.displayZero = false;
	
	this.canDrag = true;
	this.canDrop = true;
	
	this.item = undefined;
	
	this.onClick = undefined;
	
	this.count = 0;
	
	// ---------------------------------------------------------------------------
    // main functions
    // ---------------------------------------------------------------------------
	this.init = function() {
		this.mainDiv = $('<div class="' + this.classes + ' itemSlotNonHover noSelect"></div>');
		this.mainDiv.hover(
                function() { $(this).addClass("itemSlotHover noSelect"); $(this).removeClass("itemSlotNonHover"); },
                function() { $(this).addClass("itemSlotNonHover noSelect"); $(this).removeClass("itemSlotHover"); }
        );
        
		this.mainDiv.mousedown({ self: this }, this.onMouseDown );
		this.mainDiv.mouseup({ self: this }, this.onMouseUp );
		this.mainDiv.mouseover({ self: this }, this.onMouseOver );
		this.mainDiv.dblclick({ self: this }, this.onDoubleClick );
	};
	
	// ---------------------------------------------------------------------------
    // events
    // ---------------------------------------------------------------------------
	this.onMouseDown = function(parameters) {
		var self = parameters.data.self;
		
		// utils.log('SlotMouseDown: ' + parameters.which+" " + self.item, true);
		// If we don't have content don't do anything
		if(!self.item) {
			return;
		}

		if(self.onClick) {
			self.onClick(self);
		}
		
		if(!self.canDrag) {
			return;
		}
		
		ui.beginDrag(self);
	};
	
	this.onMouseUp = function(parameters) {
		var self = parameters.data.self;
		
		// utils.log('SlotMouseUp: '  + parameters.which+" "+ self.item, true);
	};
	
	this.onMouseOver = function(parameters) {
		var self = parameters.data.self;
		if(!ui.isDragging) {
			return;
		}
		
		var tryDropResult = self.tryDrop(ui.getDragSource());
		if(tryDropResult) {
			ui.setDragTarget(self);
		} else {
			ui.setDragTarget(undefined);
		}
	};
	
	this.onDoubleClick = function(parameters) {
		var self = parameters.data.self;
		
		// If we don't have content don't do anything
		if(!self.item) {
			return;
		}
		
		// utils.log('SlotDBLC: '  + parameters.which+" "+ self.item, true);
	};
	
	// ---------------------------------------------------------------------------
    // slot functions
    // ---------------------------------------------------------------------------
	this.getMainElement = function() {
		return this.mainDiv;
	};
	
	this.set = function(item, count) {
		this.item = item;
		this.count = count;
		
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
		this.count = count;
		
		var countDisplayValue = count.toString();		
		if(count <= 0) {
			countDisplayValue = this.displayZero ? '0' : '';
		};
		
		this.countDisplay.text(countDisplayValue);
	};
	
	this.clear = function() {
		this.item = undefined;
		this.count = 0;
				
		this.mainDiv.empty();
		this.mainDiv.attr('title', '');
	};
	
	this.tryDrop = function(other) {
		if(!this.canDrop || !other || !other.controlType || other.controlType != this.controlType) {
			return false;
		}
		
		// Right now we don't allow dragging onto occupied slots, will fix later
		if(this.item) {
			return false;
		}
		
		// Todo
		return true;
	};
	
	this.drop = function(other) {
		// Todo: Test code only, have to clean this up
		this.set(other.item, other.count);
		this.update(other.count);
		other.clear();
		other.update();
	};
};