require(["gameplayer", "gameplanet", "gamenpc", "gamefight", "gamesettings", "utils"]);

function Game() {
	this.player = new Player();
	this.settings = new Settings();

	this.planets = {};
	this.currentPlanet = undefined;

	this.planetDictionary = undefined;
	this.itemDictionary = undefined;
	this.lootTableDictionary = undefined;

	this.lastUpdateTime = Date.now();
	this.lastAutoSaveTime = Date.now();
	this.lastTravelTime = Date.now();
	
	this.planetChanged = true;
	
	this.version = 0.1;
	
	this.itemContexts = {
			'playerInventory': 1,
			'planetInventory': 2,
			'playerGear': 3,
			'planetGear': 4,
			'playerShip': 5
	};
	
	this.activeItemContexts = [];

	// ---------------------------------------------------------------------------
	// main functions
	// ---------------------------------------------------------------------------
	this.init = function() {
		// Rebuild the dictionaries for our data
		this.planetDictionary = this.buildDictionary(Planets);
		this.itemDictionary = this.buildDictionary(Items);
		this.lootTableDictionary = this.buildDictionary(LootTables);

		utils.log(Object.keys(this.planetDictionary).length + " planets");
		utils.log(Object.keys(this.itemDictionary).length + " items");
		
		// Initialize all the components
		this.player.initialize();
		this.settings.initialize();

		// Load the settings
		this.load();

		if(this.settings.isNewGame) {
			this.setNewGame();
		}
		
		this.setStartupState();
	};
	
	this.setNewGame = function() {
		// Give the player some basic items
		this.player.storage.addItem(Items.woodenPick.id);
		this.player.equipBestGear();
		
		// make earth our current planet
		this.settings.currentPlanet = Planets.earth.id;
		
		// Set some basic things in settings
		this.settings.isNewGame = false;
		this.settings.savedVersion = this.version;
	};

	this.reset = function(fullReset) {
		// Clear the storage
		localStorage.clear();

		// Clear the local variables
		this.planets = {};

		// Reset the saved settings
		this.player.reset(fullReset);
		this.settings.reset(fullReset);

		if (this.currentPlanet) {
			this.currentPlanet.reset(fullReset);
		}

		this.setNewGame();
		this.setStartupState();
		
		this.save();
		location.reload();
	};

	this.update = function(currentTime) {
		var elapsed = currentTime - this.lastUpdateTime;
		var elapsedSinceAutoSave = currentTime - this.lastAutoSaveTime;
		var elapsedSinceTravel = currentTime - this.lastTravelTime;

		if (this.settings.autoSaveEnabled
				&& elapsedSinceAutoSave > this.settings.autoSaveInterval) {
			ui.notify("Auto-saving");
			this.save();
			this.lastAutoSaveTime = currentTime;
		}

		this.player.update(currentTime);

		for(planet in this.planets) {
			this.planets[planet].update(currentTime);
		}
		
		if(this.settings.travelActive && elapsedSinceTravel > 1000) {
			this.lastTravelTime = currentTime;
			this.settings.travelDistanceElapsed += this.player.getTravelSpeed();
			if(this.settings.travelDistanceElapsed >= this.settings.travelDistanceRemaining) {
				this._enterOrbit(this.settings.targetPlanet);
			}
		}

		this.lastUpdateTime = currentTime;
		return elapsed;
	};

	// ---------------------------------------------------------------------------
	// game functions
	// ---------------------------------------------------------------------------	
	this.setStartupState = function() {		
		// Bring us back to our last position
		if (this.settings.travelActive) {
			// Todo: resume travelling
		} else {
			this._enterOrbit(this.settings.currentPlanet);
		}
	};
	
	this.craft = function(storageSource, storageTarget, what, count) {
		if (!count) {
			count = 1;
		}

		var targetItem = game.itemDictionary[what];

		// Check if we have enough storage to store the result
		if (!storageTarget.canAdd(what, count)) {
			ui.notifyError("Can not craft, storage limit exceeded!");
			return false;
		}

		var cost = this.getCraftingCost(what, count);
		if (!cost) {
			return false;
		}

		var quantity = targetItem.craftResult || 1;
		var keys = Object.keys(cost);
		// First pass to check
		for ( var i = 0; i < keys.length; i++) {
			var key = keys[i];
			if (storageSource.getItemCount(key) < cost[key]) {
				// Todo: this needs to go into the ui somewhere
				ui.notifyError("Insufficient resources, need " + cost[key] + " " + this.getItemName(key));
				return false;
			}
		}

		// Now deduct
		for ( var i = 0; i < keys.length; i++) {
			var key = keys[i];
			storageSource.removeItem(key, cost[key]);
		}

		var totalQuantity = count * quantity;
		// Todo: Refactor
					
		storageTarget.addItem(what, totalQuantity);
		
		ui.notify("Crafted " + totalQuantity + " " + targetItem.name);
		return true;
	};
	
	this.loot = function(table, count) {
		var results = [];
		for(var n = 0; n < count; n++) {
			this._pickLootTableEntries(table, results);
			if(results.length <= 0) {
				continue;
			}
		}
		
		return results;
	};
	
	this.getLootTable = function(id) {
		if(this.lootTableDictionary[id]) {
			return this.lootTableDictionary[id];
		}
		
		return undefined;
	};

	this.getItemName = function(id) {
		if (this.itemDictionary[id]) {
			return this.itemDictionary[id].name;
		}

		return 'N/A';
	};

	this.getCraftingCost = function(itemId, count) {
		var targetItem = this.itemDictionary[itemId];

		// Check if the item has proper crafting data
		if (!targetItem.craftCost) {
			ui.notifyError("Don't know how to craft this, check the data!");
			return;
		}

		var cost = {};
		var keys = Object.keys(targetItem.craftCost);
		for ( var i = 0; i < keys.length; i++) {
			cost[keys[i]] = targetItem.craftCost[keys[i]] * count;
		}

		return cost;
	};
	
	this.getItem = function(itemId) {
		if(this.itemDictionary[itemId]) {
			return this.itemDictionary[itemId];
		}
		
		return undefined;
	};
	
	this.getItems = function() {
		return Object.keys(this.itemDictionary);
	};
	
	this.getItemsByCategory = function(category) {
		// Todo: build a dictionary of this if we need to call this often
		var results = [];
		for(id in this.itemDictionary) {
			var item = this.itemDictionary[id];
			if(item.category && item.category == category) {
				results.push(item);
			}
		}
		
		return results;
	};
	
	this.getPlanetChanged = function() {
	    return this.planetChanged;
	};
	
	this.setPlanetChanged = function(value) {
	    this.planetChanged = value;
	};
	
	this.getCategoryById = function(categoryId) {
	    return ItemCategory[Object.keys(ItemCategory)[categoryId]];
	};
	
	this.canTravelTo = function(target) {
		if (target == undefined || !this.planetDictionary[target]) {
			return false;
		}
		
		var targetData = this.planetDictionary[target];
		
		// Check if we are already there
		if(this.currentPlanet.data.id == targetData.id) {
			return false;
		}
		
		return true;
	};
	
	this.travelTo = function(target) {
		console.log("Traveling to " + target);
		// Todo: deduct travel cost
		if (target == undefined || !this.planetDictionary[target]) {
			ui.notifyError("Unknown destination: " + target);
			return;
		}

		this.settings.travelActive = true;
		this.settings.travelDistanceRemaining = this.planetDictionary[target].distance;
		this.settings.travelDistanceElapsed = 0;

		// Leave the current planet and adjust the travel distance based on
		// location
		if (this.currentPlanet) {
			this.settings.travelDistanceRemaining = Math.abs(this.settings.travelDistanceRemaining - this.currentPlanet.data.distance);
			this._leaveOrbit(target);
		}
	};
	
	this.getDefaultItemIcon = function(item) {
        if(item.category) {
            if(item.category == ItemCategory.rawMaterial) {
                return sys.iconPlaceholderRawMaterial;
            } else if (item.category == ItemCategory.gem) {
                return sys.iconPlaceholderGem;
            } else if (item.category == ItemCategory.gearChest) {
                return sys.iconPlaceholderChest;
            } else if (item.category == ItemCategory.gearHead) {
                return sys.iconPlaceholderHead;
            }
        };
        
        return sys.iconPlaceholder;
    };
    
    this.getRemainingTravelTime = function() {
		return this.settings.travelDistanceRemaining - this.settings.travelDistanceElapsed;
	};
	
	this.moveItems = function(itemId, sourceStorage, targetStorage, count) {
		// Todo: sanity checks and cheat detection
		if(!sourceStorage.removeItem(itemId, count)) {
			return;
		}
		
		if(!targetStorage.addItem(itemId, count)) {
			// Rewind
			sourceStorage.addItem(itemId, count);
		}
	};
	
	this.removeItems = function(itemId, storage, count) {
		// Todo: sanity checks and cheat detection
		storage.removeItem(itemId, count);
	};
	
	this.movePlanetItemsToPlayer = function() {
		if(!this.currentPlanet) {
			return false;
		};
		
		var items = this.currentPlanet.storage.getItems();
		for(var i = 0; i < items.length; i++) {
			var count = this.currentPlanet.storage.getItemCount(items[i]);
			if(count <= 0) {
				continue;
			}
			
			var item = this.getItem(items[i]);
			switch(item.category) {
			case ItemCategory.rawMaterial:
			case ItemCategory.gem:
				{
					break;
				}
				
			default:
				{
					// Not transfering other categories for now
					return;
				}
			}
			
			this.moveItems(items[i], this.currentPlanet.storage, this.player.storage, count);
			
			// Todo: test code, remove when we can properly animate this
			var float = ui.createFloat('+'+count+' '+item.name, 'lootFloating', utils.getRandomInt(800, 900), utils.getRandomInt(-190, -125));
			float.getMainElement().animate({'marginLeft': '-='+utils.getRandomInt(1500, 1900)+'px'});
		}
	};
	
	this.setItemContext = function(context) {
		if (jQuery.inArray(context, this.activeItemContexts) != -1) {
			return;
		}
		
		this.activeItemContexts.push(context);
	};
	
	this.clearItemContexts = function() {
		this.activeItemContexts = [];
	};
		
	this.clearItemContext = function(context) {
		this.activeItemContexts = jQuery.grep(this.activeItemContexts, function(value){ return value != context; });
	};
	
	this.getItemContext = function(sourceContext) {
		// Gets the first active item context that is not the source
		for(var i = 0; i < this.activeItemContexts.length; i++)
		{
			if(this.activeItemContexts[i] != sourceContext) {
				return this.activeItemContexts[i];
			}
		}
	};
	
	this.canProcessItemContext = function(itemId, sourceContext) {
		var target = this.getItemContext(sourceContext);
		if(!target) {
			return false;
		}
		
		var item = this.getItem(itemId);
		return item != undefined;
	};
	
	this.activateItemContext = function(itemId, sourceContext) {
		if(!this.canProcessItemContext(itemId)) {
			return false;
		}
		
		var target = this.getItemContext(sourceContext);
		
		// Todo
		switch(sourceContext) {
			case this.itemContexts.playerInventory: return this._processItemContextPlayerInventory(itemId, target);
			case this.itemContexts.planetInventory: return this._processItemContextPlanetInventory(itemId, target);
			case this.itemContexts.playerGear: return this._processItemContextPlayerGear(itemId, target);
			case this.itemContexts.planetGear: return this._processItemContextPlanetGear(itemId, target);
			case this.itemContexts.playerShip: return this._processItemContextPlayerShip(itemId, target);
			default: throw new Error('Not implemented context type: ' + this.activeItemContextSource);
		}
	};
	
	this.canUseItemContext = function(itemId, sourceContext) {
		if(!sourceContext) {
			return false;
		}
		
		var item = this.getItem(itemId);
		if(!item || item.use != 1) {
			return false;
		}
		
		switch(sourceContext) {
			case this.itemContexts.playerInventory: return true;
			case this.itemContexts.planetInventory: return true;
			default: return false;
		}
	};
	
	this.useItemContext = function(itemId, sourceContext) {
		if(!this.canUseItemContext(itemId, sourceContext)) {
			return false;
		}
		
		var item = this.getItem(itemId);
		if(!item || item.use != 1) {
			return false;
		}
		
		var target = this.getItemContext(sourceContext);
		utils.log("useItemContext: " + itemId+" "+sourceContext+" -> "+target);
		
		switch(sourceContext) {
			case this.itemContexts.playerInventory: {
				this.removeItems(itemId, this.player.storage, 1);
				return this._applyItemUseEffect(item, target);
			}
			case this.itemContexts.planetInventory: {
				this.removeItems(itemId, this.currentPlanet.storage, 1);
				return this._applyItemUseEffect(item, target);
			}
			default: return false;
		}
	};
	
	this.testCombat = function() { //for testing purposes, TODO: refactor?
		var fight = new Fight();
		var enemy = new NPC('testEnemy');
		enemy.initialize();
		fight.startBattle([this.player], [enemy]); //not even gonna add the todo, it's obvious
	};
	
	// ---------------------------------------------------------------------------
	// internal functions
	// ---------------------------------------------------------------------------
	this._applyItemUseEffect = function(item, targetContext) {
		// Todo: evaluate what the item does and apply the effect
		throw new Error('Used item: ' + item.id);
		return false;
	};
	
	this._processItemContextPlayerInventory = function(itemId, targetContext) {
		switch(targetContext) {
			case this.itemContexts.playerInventory: return false;
		
			case this.itemContexts.planetInventory: {
				this.moveItems(itemId, this.player.storage, this.currentPlanet.storage, this.player.storage.getItemCount(itemId));
				return true;
			}
			
			case this.itemContexts.playerGear: {
				if(this.player.canEquip(itemId)) {
					this.player.equip(itemId);
				}
				
				return true;
			}
			
			case this.itemContexts.planetGear: {
				if(this.currentPlanet.canEquip(itemId)) {
					// Move the item to the planet and equip
					this.moveItems(itemId, this.player.storage, this.currentPlanet.storage, this.player.storage.getItemCount(itemId));
					this.currentPlanet.equip(itemId);
				}
				
				return true;
			}
			
			case this.itemContexts.playerShip: {
				// Todo: add when ship is added
				/*if(this.player.ship.canEquip(item.id)) {
					this.player.ship.equip(item.id);
				}*/
				return true;
			}
			
			default: return false;
		}
	};
	
	this._processItemContextPlanetInventory = function(itemId, targetContext) {
		switch(targetContext) {		
			case this.itemContexts.playerInventory: {
				this.moveItems(itemId, this.currentPlanet.storage, this.player.storage, this.currentPlanet.storage.getItemCount(itemId));
				return true;
			}
			
			case this.itemContexts.planetGear: {
				if(this.currentPlanet.canEquip(itemId)) {
					this.currentPlanet.equip(itemId);
				}
				
				return true;
			}
			
			default: return false;
		}
	};
	
	this._processItemContextPlayerGear = function(itemId, targetContext) {
		var item = this.getItem(itemId);
		
		switch(targetContext) {	
		case this.itemContexts.playerInventory: {
			if(this.player.hasEquipped(item.gearType)) {
				this.player.unEquip(item.gearType);
			}
			
			return true;
		}
		
		default: return false;
	}
	};
	
	this._processItemContextPlanetGear = function(item, targetContext) {
		
	};
	
	this._processItemContextPlayerShip = function(item, targetContext) {
		
	};
	
	this._pickLootTableEntries = function(table, results) {
		switch(table.mode) {
			case LootMode.single: {
				this._pickSingleLootTableEntry(table, results);
				break;
			}
			
			case LootMode.multi: {
				this._pickMultiLootTableEntries(table, results);
				break;
			}
		}
	};
	
	this._pickMultiLootTableEntries = function(table, results) {
		for(var i = 0; i < table.entries.length; i++) {
			var entry = table.entries[i][0];
			var chance = table.entries[i][1];
			if(Math.random() <= chance) {
				if(entry.entries) {
					// Sub-table
					this._pickLootTableEntries(entry, results);
				} else {
					results.push(entry);
				}
			}
		}
	};
	
	this._pickSingleLootTableEntry = function(table, results) {
		var pick = utils.getRandomInt(0, table.entries.length - 1);
		var entry = table.entries[pick];
		if(entry.entries) {
			// Sub-table
			this._pickLootTableEntries(entry, results);
		} else {
			results.push(entry);
		}
	};

	this._leaveOrbit = function(target) {
		if (!this.currentPlanet) {
			ui.notifyError("Can not leave, not on a planet");
		}

		// Save the planet before leaving for another one
		this.currentPlanet.save();
		this.currentPlanet = undefined;
		
		this.settings.targetPlanet = target;
	};

	this._enterOrbit = function(target) {
		if (!this.planets[target]) {
			// We have not visited this planet this session, load it up
			this.planets[target] = new Planet(this.planetDictionary[target]);
			this.planets[target].initialize();
		}

		this.currentPlanet = this.planets[target];
		this.currentPlanet.load();
		this.planetChanged = true;
		
		this.settings.targetPlanet = undefined;
		
		this.settings.travelActive = false;
	};

	// ---------------------------------------------------------------------------
	// utility functions
	// ---------------------------------------------------------------------------
	this.buildDictionary = function(list) {
		var result = {};
		var keys = Object.keys(list);
		for ( var i = 0; i < keys.length; i++) {
			var entry = list[keys[i]];
			if (result[entry.id]) {
				utils.logError("Duplicate id: " + entry.id);
				continue;
			}

			result[entry.id] = entry;
		}

		return result;
	};

	// ---------------------------------------------------------------------------
	// loading / saving
	// ---------------------------------------------------------------------------
	this.save = function() {
		if (typeof (Storage) == "undefined") {
			return;
		}

		this.player.save();
		this.settings.save();

		if (this.currentPlanet) {
			this.currentPlanet.save();
		}
	};

	this.load = function() {
		if (typeof (Storage) == "undefined") {
			return;
		}

		this.player.load();
		this.settings.load();

		if (this.currentPlanet) {
			this.currentPlanet.load();
		}
	};
}
