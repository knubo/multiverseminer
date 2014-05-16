function Miner(id) {
	this.id = id;

	this.baseMineSpeed = 1;
	
	this.previousTime = 0;
	this.autoMineTime = 1000; // in milliseconds
	this.autoMine = false;
	
	// ---------------------------------------------------------------------------
	// general
	// ---------------------------------------------------------------------------
	this.initialize = function() {		
	};
	
	this.update = function(currentTime) {
		if(this.autoMine && (currentTime - this.previousTime > this.autoMineTime))
		{			
			var items = this.mine();
			if (items) {
				for(var i = 0; i < items.length; i++) {
					var name = game.getItemName(items[i]);
					var float = ui.createFloat('+1 ' + name, 'lootFloating', utils.getRandomInt(-100, 100), utils.getRandomInt(-100, 0));
				}			
				game.player.storage.addItems(items);
			}
			
			this.previousTime = currentTime;
		}
	};

	this.gather = function() {
		var tableId = game.currentPlanet.getGatherLootTableId();
		return this._dropResources(tableId);
	};

	this.mine = function() {
		var tableId = game.currentPlanet.getMiningLootTableId();
		return this._dropResources(tableId);
	};

	// ---------------------------------------------------------------------------
	// internal
	// ---------------------------------------------------------------------------
	this._dropResources = function(tableId) {
		var table = game.getLootTable(tableId);
		if (!table || table.length <= 0) {
			return;
		}
		
		// Todo: apply modifiers and tools etc		
		items = game.loot(table, this.baseMineSpeed);
		return items;
	};

	this._getStorageKey = function() {
		return 'miner_' + this.id + '_';
	};

	// ---------------------------------------------------------------------------
	// loading / saving
	// ---------------------------------------------------------------------------
	this.save = function() {
		var storageKey = this._getStorageKey();

		localStorage[storageKey + 'baseMineSpeed'] = this.baseMineSpeed;
	};

	this.load = function() {
		var storageKey = this._getStorageKey();

		this.baseMineSpeed = utils.loadFloat(storageKey + 'baseMineSpeed', 1);
	};

	this.reset = function(fullReset) {
		this.baseMineSpeed = 1;
	};
}