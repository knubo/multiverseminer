// ---------------------------------------------------------------------------
// Some const values used in ui code
// ---------------------------------------------------------------------------
MouseButtons = {
		Left: 0,
		Middle: 1,
		Right: 2
};

//---------------------------------------------------------------------------
// UI Class
// ---------------------------------------------------------------------------
function UI() {
    this.inventoryPlayerCategoryFilter = undefined;

    this.playerInventoryFilter = undefined;
    this.playerInventory = undefined;
    
    this.componentPlayerInventory = undefined;
    this.componentPlayerGear = undefined;
    
    this.componentCrafting = undefined;
    
    this.componentElementFinder = undefined;
    this.componentGemFinder = undefined;
    
    this.componentPlanet = undefined;
    
    this.isDragging = false;
        
    // ---------------------------------------------------------------------------
    // main UI functions
    // ---------------------------------------------------------------------------
    this.init = function() {
        this.playerIventoryFilter = new UISelection('playerInventoryFilter', ItemCategory, this.onPlayerInventoryFilterChanged);
        this.playerIventoryFilter.init();
        this.playerIventoryFilter.min = 1; // To avoid selecting undef
        this.playerIventoryFilter.setSelection(game.settings.selectedPlayerInventoryFilter);
        
        this.playerInventory = new UIInventory('playerInventorySlots', 30, game.player.storage);
        this.playerInventory.init();
        this.playerInventory.setCategory(game.settings.selectedPlayerInventoryFilter);
        
        this.componentPlayerInventory = new UIComponent('playerInventoryPanel', this.updatePlayerInventoryPanel);
        
        this.componentPlayerGear = new UIComponent('playerGearPanel', this.updatePlayerGearPanel);
        
        this.componentCrafting = new UIComponent('playerCraftingPanel', this.updateCraftingPanel);    
        
        this.componentElementFinder = new UIComponent('elementFinderPanel', this.updateElementFinderPanel);
        this.componentGemFinder = new UIComponent('gemFinderPanel', this.updateGemFinderPanel);
        
        this.componentPlanet = new UIComponent('planetDisplay', this.updatePlanetDisplay);
        this.componentPlanet.enabled = true;
    };
    
    this.update = function(currentTime) {
        $('#timeDisplayText').text(Utils.getShortTimeDisplay(Utils.getDayTimeInSeconds()));
        
        $('#depth').text(game.currentPlanet.currentDepth);

        // Check for gear changes
        if (game.player.gear.gearChanged) {
            this.componentPlayerGear.invalidate();
            game.player.gear.gearChanged = false;
        }

        // Check for inventory changes
        if (game.player.storage.getStorageChanged()) {
            this.componentPlayerInventory.invalidate();
            game.player.storage.setStorageChanged(false);
        }
        
        // Check for planet change
        if (game.getPlanetChanged()) {
            this.componentPlanet.invalidate();
            game.setPlanetChanged(false);
        }
        
        // Update the components
        this.componentPlayerInventory.update();
        this.componentPlayerGear.update();
        
        this.componentCrafting.update();
        
        this.componentElementFinder.update();
        this.componentGemFinder.update();
        
        this.componentPlanet.update();
    };
    
    this.updatePlayerInventoryPanel = function() {
        var self = ui;
        
        self.playerInventory.update(game.player.storage);
    };
        
    this.updatePlayerGearPanel = function() {
        var self = ui;
        
        $('#playerGearPanel').empty();

        var content = $('<div id="playerGearPanelContent" class="gearContent"></div>');
        var gearSlots = game.player.gear.getSlots();
        for (var i = 0; i < gearSlots.length; i++) {
            var itemId = game.player.gear.getItemInSlot(gearSlots[i]);
            content.append(self.buildGearSlot(gearSlots[i], itemId));
        }

        $('#playerGearPanel').append(content);
        $('#pickPower').text(game.player.pickPower + " / mpc");
    };
    
    this.updateCraftingPanel = function() {
        var self = ui;
        var activePage = $('#playerCraftingContent').accordion('option', 'active');
        $('#playerCraftingContent').accordion("destroy");
        $('#playerCraftingContent').empty();
        
        for ( var key in ItemCategory) {
            var items = game.getItemsByCategory(ItemCategory[key]);
            if (!items || items.length <= 0) {
                continue;
            }

            var craftableItems = [];
            for (var i = 0; i < items.length; i ++) {
                if (items[i].craftCost && game.player.storage.canAdd(items[i].id)) {
                    craftableItems.push(items[i]);
                }
            }

            if (craftableItems.length <= 0) {
                continue;
            }

            var headerContent = $('<div/>');
            $('#playerCraftingContent').append('<h4>' + ItemCategory[key]+'</h4>').append(headerContent);
            for (var i = 0; i < craftableItems.length; i ++) {
                headerContent.append(self.buildCraftingEntry(craftableItems[i]));
            }
        }

        $("#playerCraftingContent").accordion({heightStyle: "content" });
        $("#playerCraftingContent").accordion('option', 'active', activePage);
    };
    
    this.updateElementFinderPanel = function() {
        if (game.currentPlanet) {
            resources = game.currentPlanet._getAvailableResources("mine");
            var resElement = "<div>";
            for (var i = 0; i < resources.length; i++) {
                // This is a raw material
                if ( resources[i].id < 2000 ) {
                    resElement += ('<div class="element">' + 
                                        '<span class="elementName">' + game.getItemName(resources[i].id) + '</span>' +
                                        '<span class="elementAbr">' + game.getItem(resources[i].id).el + '</span>' +
                                    '</div>');
                }
            }
            $('#elementFinderPanel').html(resElement + "</div>");
        } else {
            $('#elementFinderPanel').text("N/A");
        }
    };
    
    this.updateGemFinderPanel = function() {
        if (game.currentPlanet) {
            resources = game.currentPlanet._getAvailableResources("mine");
            var resGem = "<ul>";
            for (var i = 0; i < resources.length; i++) {
                // This is a raw material
                if ( resources[i].id >= 2000 && resources[i].id < 3000 ) {
                    resGem += "<li>" + game.getItemName(resources[i].id) + "</li>";
                }
            }
            $('#gemFinderPanel').html(resGem + "</ul>");
        } else {
            $('#gemFinderPanel').text("N/A");
        }
    };
    
    this.updatePlanetDisplay = function() {
        $('#planetDisplayBackground').empty();
        $('#planetDisplayNameText').empty();
        if(game.currentPlanet) {
            var background = game.currentPlanet.getBackground();
            if(background) {
                $('#planetDisplayBackground').append('<img src="' + background + '"/>');
            }
            
            $('#planetDisplayNameText').text(game.currentPlanet.getName().toUpperCase());
        }
    };
    
    this.onPlayerInventoryFilterChanged = function() {
        var self = ui;
        var category = self.playerIventoryFilter.selection;
        game.settings.selectedPlayerInventoryFilter = category;
        self.playerInventory.setCategory(category);
        
        self.componentPlayerInventory.invalidate();
    };
    
    this.hideLeftSideComponents = function() { 
        this.hideComponent(this.componentPlayerInventory);
        this.hideComponent(this.componentCrafting);
    };
    
    this.hideRightSideComponents = function() { 
        this.hideComponent(this.componentPlayerGear);
        this.hideComponent(this.componentElementFinder);
        this.hideComponent(this.componentGemFinder);
    };
    
    this.hideComponent = function(component) {
        component.enabled = false;
        component.hide();
    };
    
    this.showComponent = function(component) {
        component.enabled = true;
        component.show();
        component.invalidate();
    };
    
    this.updateComponent = function(component) {
    	component.invalidate();
    };
    
    this.getDefaultItemIcon = function(item) {
        if(item.category) {
            if(item.category == ItemCategory.rawMaterial) {
                return sys.iconPlaceholderRawMaterial;
            } else if (item.category == ItemCategory.gem) {
                return sys.iconPLaceholderGem;
            } else if (item.category == ItemCategory.gearChest) {
                return sys.iconPlaceholderChest;
            } else if (item.category == ItemCategory.gearHead) {
                return sys.iconPLaceholderHead;
            }
        };
        
        return sys.iconPlaceholder;
    };
    
    // ---------------------------------------------------------------------------
    // building functions
    // ---------------------------------------------------------------------------
    this.buildCraftingEntry = function(item) {
        var tooltipContent = this.buildCraftingCostTooltip(item);
        var content = $('<div class="craftingItemPanel" onclick="onCraft(' + item.id + ')" title="' + tooltipContent +'"/>');
        var icon = this.getDefaultItemIcon(item);
        if(item.icon) {
            icon = item.icon;
        }
        content.append('<image class=\'craftingIcon\' src="'+icon+'" />');
        content.append('<span class="craftingText">'+item.name+'</span>').disableSelection();
        
        return content;
    };

    this.buildCraftingCostTooltip = function(item) {
        // We are building a text tooltip for now, html will be a bit more work
        //  for html tooltips see: http://api.jqueryui.com/tooltip/#option-content
        var cost = game.getCraftingCost(item.id, 1);
        var costEntries = [];
        for(var key in cost) {
            var item = game.getItem(key);
            costEntries.push(cost[key]+' '+item.name);
        }
        
        return costEntries.join(', ');
    };
    
    this.buildGearSlot = function(slot, itemId) {
        var item = undefined;
        if(itemId > 0) {
            item = game.getItem(itemId);
        }
        
        var tooltip = '';
        var icon = undefined;
        if(item != undefined) {
            tooltip = this.buildItemTooltip(item);
            icon = item.icon != undefined ? item.icon : this.getDefaultItemIcon(item);
        }
        
        var entry = $('<div class="' + slot + ' gearSlot" title="' + tooltip + '">');
        if(icon != undefined) {
            entry.append('<img src="' + icon + '"/>');
        }
        
        return entry;
    };

    this.buildInventory = function(targetDiv, storage) {
        
    };
    
    this.buildItemTooltip = function(item) {
        // For now only text
        return item.name;
    };

    this.buildItem = function(item) {
        
    };
};