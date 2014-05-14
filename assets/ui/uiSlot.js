function UISlot() {
	this.controlType = 'UISlot';
	
	this.mainDiv = undefined;
	this.iconDisplay = undefined;
	this.countDisplay = undefined;
	
	this.isClear = true;
	
	this.displayZero = false;
	
	this.canDrag = true;
	this.canDrop = true;
	
	// ---------------------------------------------------------------------------
    // main functions
    // ---------------------------------------------------------------------------
	this.init = function() {
		this.mainDiv = $('<div class="itemSlot itemSlotNonHover"></div>');
		this.mainDiv.hover(
                function() { $(this).addClass("itemSlotHover"); $(this).removeClass("itemSlotNonHover"); },
                function() { $(this).addClass("itemSlotNonHover"); $(this).removeClass("itemSlotHover"); }
        );
        
		this.mainDiv.append('<p class="itemSlotText">0</p>');
		
		// This is not really working out, gotta do it the hard way it seems...
		// this.mainDiv.draggable( { addClasses: false, snap: ".itemSlot" } );
	};
	
	// ---------------------------------------------------------------------------
    // slot functions
    // ---------------------------------------------------------------------------
	this.getMainElement = function() {
		return this.mainDiv;
	};
	
	this.set = function(item, count) {
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