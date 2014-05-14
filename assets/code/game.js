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
	
	this.planetChanged = true;
	
	this.version = 0.1;

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
		elapsed = currentTime - this.lastUpdateTime;
		elapsedSinceAutoSave = currentTime - this.lastAutoSaveTime;

		if (this.settings.autoSaveEnabled
				&& elapsedSinceAutoSave > this.settings.autoSaveInterval) {
			ui.notify("Auto-saving");
			this.save();
			this.lastAutoSaveTime = currentTime;
		}

		this.player.update(currentTime);

		if (this.currentPlanet) {
			this.currentPlanet.update(currentTime);
		}
		
		if(this.settings.travelActive) {
			this.settings.travelDistanceElapsed += 5000;
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
			this.settings.travelDistanceRemaining = Math
					.abs(this.settings.travelDistanceRemaining
							- this.currentPlanet.data.distance);
			this._leaveOrbit(target);
		}
	};
	
	// ---------------------------------------------------------------------------
	// internal functions
	// ---------------------------------------------------------------------------
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
