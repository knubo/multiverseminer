require(["gameminer", "gamestorage", "gamegear" ]);

function Planet(data) {
	this.data = data;
	this.miner = new Miner('planet' + data.id);
	this.gear = new Gear('planet' + data.id);
	this.storage = new Storage('planet' + data.id);
	
	this.lastAutoMineTime = Date.now();
	this.autoMineTime = 1000; // in milliseconds
	this.autoMine = false;
	
	// ---------------------------------------------------------------------------
	// general
	// ---------------------------------------------------------------------------
	this.initialize = function() {
		this.gear.initialize();
		
		// Add the slots we can wear
		this.gear.addSlot('building');
		
		this.miner.initialize();
		this.storage.initialize();
	};
	
	this.update = function(currentTime) {
		this.miner.update(currentTime);
		
		// Temp fix to enable auto-mining on re-load
		if(this.gear.getItemInSlot('building') > 0 && !this.autoMine) {
			this.autoMine = true;
		}
		
		var elapsedTime = currentTime - this.lastAutoMineTime;
		var autoMineAttempts = Math.floor(elapsedTime / this.autoMineTime);
		
		if(this.autoMine && autoMineAttempts >= 1)
		{
			this.lastAutoMineTime = currentTime;
			if(autoMineAttempts > 100) {
				throw new Error("Way too many auto mine attempts pending, check the timer code!");
			}
			
			this._autoMine(autoMineAttempts);
		}
	};
	
	this.equip = function(itemId) {
		if(!itemId || !this.storage.hasItem(itemId))
		{
			utils.logError("Unable to equip item, invalid or don't have it");
			return;
		}
		
		this.gear.equip(itemId, this.storage.getItemMetadata(itemId));
		
		this._updateStats();
	};
	
	this.canEquip = function(itemId) {
		return this.gear.canEquip(itemId);
	};
	
	this.unEquip = function(type) {
		this.gear.unEquip(type);
	};

	// ---------------------------------------------------------------------------
	// planet functions
	// ---------------------------------------------------------------------------
	this.getGatherLootTableId = function() {
		return this.data.gatherLootTableId;
	};

	this.getMiningLootTableId = function() {
		return this.data.miningLootTableId;
	};
	
	this.getName = function() {
	    return this.data.name;
	};
	
	this.getBackground = function() {
	    return this.data.background;
	};
	
	// ---------------------------------------------------------------------------
	// internal functions
	// ---------------------------------------------------------------------------
	this._updateStats = function() {
		// Todo: support multiple buildings etc
		var itemId = this.gear.getItemInSlot('building');
		if(!itemId) {
			return;
		}

		var item = game.getItem(itemId);
		if(item && item.automine) {
			this.autoMineTime = item.automine;
			this.autoMine = true;
		}
	};
	
	this._autoMine = function(attempts) {
		var totalItems = [];
		for(var i = 0; i < attempts; i++) {
			var items = this.miner.mine(this);
			if(items) {
				totalItems = $.merge(totalItems, items);				
			}
		}

		if(totalItems.length <= 0) {
			return;
		}

		this.storage.addItems(totalItems);
		
		if(game.currentPlanet != this) {
			return;
		}
		
		var items = {};
		for(var i = 0; i < totalItems.length; i++) {
			if(!items[totalItems[i]]) {
				items[totalItems[i]] = 0;
			}
			
			items[totalItems[i]]++;
		}
		
		for(item in items) {
			var name = game.getItemName(item);
			ui.createFloat('+' + items[item] + ' ' + name, 'lootFloating', utils.getRandomInt(-100, 100), utils.getRandomInt(-100, 0));
		}
	};

	// ---------------------------------------------------------------------------
	// loading / saving / reset
	// ---------------------------------------------------------------------------
	this.getStorageKey = function() {
		return 'planet' + this.data.id + '_';
	};

	this.save = function() {
		this.miner.save();
		this.storage.save();
		this.gear.save();
	};

	this.load = function() {
		this.miner.load();
		this.storage.load();
		this.gear.load();
		
		this._updateStats();
	};

	this.reset = function() {
		this.miner.reset();
		this.storage.reset();

		this.currentDepth = 0;
	};
}
