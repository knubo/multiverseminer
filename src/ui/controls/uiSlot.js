UISlot.prototype = new UIComponent();
UISlot.prototype.$super = parent;
UISlot.prototype.constructor = UISlot;

function UISlot(id, parent) {
	this.id = id;
    
    this.parent = parent;
	
	this.controlType = 'UISlot';
	this.classes = 'itemSlot itemSlotNonHover';
	
	this.mainDiv = undefined;
	this.iconDisplay = undefined;
	this.countDisplay = undefined;
	
	this.isClear = true;
	
	this.displayZero = false;
	
	this.canDrag = true;
	this.canDrop = true;
	
	this.item = undefined;
	
	this.onClick = undefined;
	
	this.count = 0;
	
	// ---------------------------------------------------------------------------
    // overrides
    // ---------------------------------------------------------------------------
    this.baseInit = this.init;
    
	// ---------------------------------------------------------------------------
    // main functions
    // ---------------------------------------------------------------------------
	this.init = function() {
		this.baseInit();
		
		this.mainDiv.hover(
                function() { $(this).addClass("itemSlotHover"); $(this).removeClass("itemSlotNonHover"); },
                function() { $(this).addClass("itemSlotNonHover"); $(this).removeClass("itemSlotHover"); }
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
		
		// If we don't have content don't do anything
		if(!self.item) {
			return;
		}
		
		// Right click to activate the item context action
		if(parameters.which == MouseButtons.right) {
			game.activateItemContext(self.item.id, self.itemContext);
		}
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
		
		game.useItemContext(self.item.id);
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
		
		var icon = item.icon || game.getDefaultItemIcon(item);
		
		this.iconDisplay = $('<img class="itemSlotIcon" src="' + sys.iconRoot + icon + '"/>');
		this.countDisplay = $('<div class="itemSlotText"></div>');
		
		this.mainDiv.attr('title', item.name);
		this.mainDiv.append(this.iconDisplay);
		this.mainDiv.append(this.countDisplay);
		
		this.update(count);
	};
	
	this.update = function(count) {
		if (!count) count = 0;
		this.count = count;
		
		var countDisplayValue = count.formatNumber();		
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