var inventoryId = 0;

function UIInventory(parent, columns, rows, storage) {
    this.id = inventoryId++;
    this.parent = parent;
    this.columns = columns;
    this.rows = rows;    
    this.storage = storage;
    
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
        for(var x = 0; x < this.rows; x++) {
            var row = $('<div class="itemRow"></div>');
            for( var y = 0; y < this.columns; y++) {
                var slotElement = this.createSlotElement();
                row.append(slotElement);
                this.slotElements.push(slotElement);
                this.slotIdItemIdMap.push(undefined);
                this._clearSlot(slotId);
                slotId++;
            }
            grid.append(row);
        }
        
        $('#' + this.parent).append(grid);
    };
    
    this.update = function() {
        var items = undefined;
        if(this.category) {
            items = this.storage.getItemsOfCategory(this.category);
        } else {
            items = this.storage.getItems();
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
        for(var i = 0; i < this.slotElements.length; i++) {
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
            var icon = item.icon || ui.defaultIcon;
            var slotJQueryId = 'inv'+this.id+'_slot'+slotId;
            
            var slotId = this._getSlot(itemId);
            if(slotId == undefined) {
                slotId = this._occupySlot(itemId);
                
                // New occupied slot, have to add the content
                slot = this.slotElements[slotId];
                slot.attr('title', item.name);
                slot.append('<img class="itemSlotIcon noselect" src="' + icon + '"/>');
                slot.append('<div class="itemSlotText noselect" id="'+slotJQueryId+'">'+this.storage.getItemCount(itemId)+'</div>');
            } else {
                // Already occupied, just update the count
                $('#' + slotJQueryId).text(this.storage.getItemCount(itemId));
            }
        };
    };
    
    this.createSlotElement = function() {
        var slot = $('<div class="itemSlot itemSlotNonHover"></div>');
        slot.hover(
                function() { $(this).addClass("itemSlotHover"); $(this).removeClass("itemSlotNonHover"); },
                function() { $(this).addClass("itemSlotNonHover"); $(this).removeClass("itemSlotHover"); }
        );
        
        slot.append('<p class="itemSlotText">999</p>');
        return slot;
    };
    
    this.setCategory = function(categoryId) {
        this.category = game.getCategoryById(categoryId);
        this.update();
    };
    
    // ---------------------------------------------------------------------------
    // internal functions
    // ---------------------------------------------------------------------------
    this._clearSlot = function(slotId) {
        this.slotElements[slotId].empty();
        this.slotElements[slotId].attr('title', '');
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
                var slot = this.slotElements[i];
                this.slotIdItemIdMap[i] = itemId;
                return i;
            }
        }
    };
};