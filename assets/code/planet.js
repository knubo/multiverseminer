function Planet(data) {
	this.data = data;
	this.miner = new Miner('planet' + data.id);
	this.gear = new Gear('planet' + data.id);
	this.storage = new Storage('planet' + data.id);
	
	this.lastAutoMineTime = 0;
	this.autoMineTime = 1000; // in milliseconds
	this.autoMine = false;
	
	// ---------------------------------------------------------------------------
	// general
	// ---------------------------------------------------------------------------
	this.initialize = function() {
		this.gear.initialize();
		
		// Add the slots we can wear
		this.gear.addSlot(GearType.building);
		
		this.miner.initialize();
		this.storage.initialize();
	};
	
	this.update = function(currentTime) {
		this.miner.update(currentTime);
		
		// Temp fix to enable auto-mining on re-load
		if(this.gear.getItemInSlot(GearType.building) > 0 && !this.autoMine) {
			this.autoMine = true;
		}
		
		if(this.autoMine && (currentTime - this.lastAutoMineTime > this.autoMineTime))
		{
			this.lastAutoMineTime = currentTime;
			
			var items = this.miner.mine(this);
			if (items) {
				if(game.currentPlanet == this) {
					for(var i = 0; i < items.length; i++) {
						var name = game.getItemName(items[i]);
						var float = ui.createFloat('+1 ' + name, 'lootFloating', utils.getRandomInt(-100, 100), utils.getRandomInt(-100, 0));
					}
				}
				
				this.storage.addItems(items);
			}
		}
	};
	
	this.equip = function(itemId) {
		if(!itemId || !this.storage.hasItem(itemId))
		{
			utils.logError("Unable to equip item, invalid or don't have it");
			return;
		}
		
		this.gear.equip(itemId, this.storage.getItemMetadata(itemId));
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
	// loading / saving / reset
	// ---------------------------------------------------------------------------
	this.getStorageKey = function() {
		return 'planet' + this.data.id + '_';
	};

	this.save = function() {
		this.miner.save();
		this.storage.save();
		this.gear.save();

		var storageKey = this.getStorageKey();
	};

	this.load = function() {
		this.miner.load();
		this.storage.load();
		this.gear.load();

		var storageKey = this.getStorageKey();
	};

	this.reset = function() {
		this.miner.reset();
		this.storage.reset();

		this.currentDepth = 0;
	};
}
