function Game() {
	this.player = new Player();
	this.settings = new Settings();

	this.planets = {};
	this.currentPlanet = undefined;

	this.planetDictionary = undefined;
	this.itemDictionary = undefined;

	this.lastUpdateTime = Date.now();
	this.lastAutoSaveTime = Date.now();

	// ---------------------------------------------------------------------------
	// general game functions
	// ---------------------------------------------------------------------------
	this.init = function() {
		// Rebuild the dictionaries for our data
		this.planetDictionary = this.buildDictionary(Planets);
		this.itemDictionary = this.buildDictionary(Items);

		Utils.log(Object.keys(this.planetDictionary).length + " planets");
		Utils.log(Object.keys(this.itemDictionary).length + " items");
		
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
		this.player.storage.addItem(4000);
		this.player.equipBestGear();
		
		// make earth our current planet
		this.settings.currentPlanet = Planets.earth.id;
		
		this.settings.isNewGame = false;
	};

	this.setStartupState = function() {		
		// Bring us back to our last position
		if (this.settings.travelActive) {
			// Todo: resume travelling
		} else {
			this._enterOrbit(this.settings.currentPlanet);
		}
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
	};

	this.update = function() {
		var currentTime = Date.now();
		elapsed = currentTime - this.lastUpdateTime;
		elapsedSinceAutoSave = currentTime - this.lastAutoSaveTime;

		if (this.settings.autoSaveEnabled
				&& elapsedSinceAutoSave > this.settings.autoSaveInterval) {
			Utils.log("Auto-saving");
			this.save();
			this.lastAutoSaveTime = currentTime;
		}

		this.player.update(elapsed);

		if (this.currentPlanet) {
			this.currentPlanet.update(elapsed);
		}

		this.lastUpdateTime = currentTime;
	};

	this.craft = function(storageSource, storageTarget, what, count) {
		if (!count) {
			count = 1;
		}

		var targetItem = game.itemDictionary[what];

		// Check if we have enough storage to store the result
		if (!storageTarget.canAdd(what, count)) {
			Utils.logError("Can not craft, storage limit exceeded!");
			return;
		}

		var cost = this.getCraftingCost(what, count);
		if (!cost) {
			return;
		}

		var quantity = targetItem.craftResult || 1;
		var keys = Object.keys(cost);
		// First pass to check
		for ( var i = 0; i < keys.length; i++) {
			var key = keys[i];
			if (storageSource.getItemCount(key) < cost[key]) {
				// Todo: this needs to go into the ui somewhere
				Utils.logError("Insufficient resources, need " + cost[key] + " " + this.getItemName(key));
				return;
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
		
		Utils.log("Crafted " + totalQuantity + " " + targetItem.name);
	};

	this.getItemName = function(id) {
		if (this.itemDictionary[id]) {
			return this.itemDictionary[id].name;
		}

		return 'N/A';
	};

	this.getCraftingCost = function(type, count) {
		var targetItem = this.itemDictionary[type];

		// Check if the item has proper crafting data
		if (!targetItem.craftCost) {
			Utils.logError("Don't know how to craft this, check the data!");
			return;
		}

		var cost = {};
		var keys = Object.keys(targetItem.craftCost);
		for ( var i = 0; i < keys.length; i++) {
			cost[keys[i]] = targetItem.craftCost[keys[i]] * count;
		}

		return cost;
	};

	// ---------------------------------------------------------------------------
	// specific game functions
	// ---------------------------------------------------------------------------
	this.travelTo = function(target) {
		// Todo: deduct travel cost
		if (target == undefined || !this.planetDictionary[target]) {
			Utils.logError("Unknown destination: " + target);
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
							- this.currentPlanet.distance);
			this._leaveOrbit(target);
		}
	};

	this._leaveOrbit = function(target) {
		if (!this.currentPlanet) {
			Utils.logError("Can not leave, not on a planet");
		}

		// Save the planet before leaving for another one
		this.currentPlanet.save();
		this.currentPlanet = undefined;
	};

	this._enterOrbit = function(target) {
		if (!this.planets[target]) {
			// We have not visited this planet this session, load it up
			this.planets[target] = new Planet(this.planetDictionary[target]);
			this.planets[target].initialize();
		}

		this.currentPlanet = this.planets[target];
		this.currentPlanet.load();
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
				Utils.logError("Duplicate id: " + entry.id);
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