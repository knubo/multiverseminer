var inventoryId = 0;

function UIInventory(parent, slotCount) {
    this.id = inventoryId++;
    this.parent = parent;
    this.count = slotCount;
    
    this.slotElements = [];
    this.slotIdItemIdMap = [];
    
    this.currentPage = 0;
    this.maxPage = 0;
    
    this.category = undefined;
    
    // ---------------------------------------------------------------------------
    // main functions
    // ---------------------------------------------------------------------------
    this.init = function() {
        var slotId = 0;
        var grid = $('<div class="itemGrid"></div>');
        for(var x = 0; x < this.count; x++) {
            var slot = new UISlot();
            slot.init();
            
            grid.append(slot.getMainElement());
            
            this.slotElements.push(slot);
            this.slotIdItemIdMap.push(undefined);
            this._clearSlot(slotId);
            slotId++;
        }
        
        $('#' + this.parent).append(grid);
    };
    
    this.update = function(storage) {
        var items = undefined;
        if(this.category) {
            items = storage.getItemsOfCategory(this.category);
        } else {
            items = storage.getItems();
        }
        
        // Update the paging info
        if(items) {
            this.maxPage = items.length / this.slotElements.count;
        } else {
            this.maxPage = 0;
        }
        
        if(this.currentPage > this.maxPage) {
            this.currentPage = 0;
        }
        
        // Determine which items we are to update
        var pageStart = this.currentPage * this.slotElements.length;
        var pageEnd = pageStart + this.slotElements.length;
        if(items) {
            if(pageEnd > items.length) {
                pageEnd = items.length;
            }
        } else
        {
            pageEnd = pageStart;
        }
        
        // Get the list of all items we are displaying right now
        var itemsToUpdate = [];
        for(var i = pageStart; i < pageEnd; i++) {
            itemsToUpdate.push(items[i]);
        }
        
        // Clear out slots that contain items we do not display
        for(var i = 0; i < this.slotIdItemIdMap.length; i++) {
            var itemId = this.slotIdItemIdMap[i];
            if(!itemId) {
                continue;
            }

            if($.inArray(itemId, itemsToUpdate) == -1) {
                this._clearSlot(i);
                this.slotIdItemIdMap[i] = undefined;
            };
        };
        
        // update the slots for all items
        for(var i = 0; i < itemsToUpdate.length; i++) {
            var itemId = itemsToUpdate[i];
            var item = game.getItem(itemId);
            var itemCount = storage.getItemCount(itemId);
                        
            var slotId = this._getSlot(itemId);
            if(slotId == undefined) {
                slotId = this._occupySlot(itemId);
                
                // New occupied slot, have to add the content
                slot = this.slotElements[slotId];
                slot.set(item, itemCount);
            } else {
                // Already occupied, just update the count
            	this.slotElements[slotId].update(itemCount);
            }
        };
    };
    
    this.setCategory = function(categoryId) {
        this.category = game.getCategoryById(categoryId);
    };
    
    // ---------------------------------------------------------------------------
    // internal functions
    // ---------------------------------------------------------------------------
    this._clearSlot = function(slotId) {
    	this.slotElements[slotId].clear();
    };
    
    this._getSlot = function(itemId) {
        for(var i = 0; i < this.slotIdItemIdMap.length; i++) {
            if(this.slotIdItemIdMap[i] == itemId) {
                return i;
            }
        }
    };
    
    this._occupySlot = function(itemId) {
        for(var i = 0; i < this.slotElements.length; i++) {
            if(!this.slotIdItemIdMap[i]) {
                this.slotIdItemIdMap[i] = itemId;
                return i;
            }
        }
    };
};