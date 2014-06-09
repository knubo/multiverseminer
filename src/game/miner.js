function Miner(id) {
	this.id = id;
	this.baseMineSpeed = 1;
	
	this.exp = 0;
	this.level = 1;
	
	// ---------------------------------------------------------------------------
	// general
	// ---------------------------------------------------------------------------
	this.initialize = function() {		
	};
	
	this.update = function(currentTime) {
	};

	this.gather = function(location) {
		var tableId = location.getGatherLootTableId();
		return this._dropResources(tableId);
	};

	this.mine = function(location, power) {
		power = power || 1; //power comes from pickaxe
		var tableId = location.getMiningLootTableId();
		return this._dropResources(tableId, power);
	};

	this.scavenge = function(location) {
		var tableId = 1000;
		return this._dropResources(tableId);
	};
	
	this.gainExp = function(value) {
		this.exp += value;
		this.checkLevel();
	}
	
	this.checkLevel = function() {
		var next = Math.pow(1.125, this.level-1) * 500;
		if(this.exp >= next) {
			this.level ++;
			this.exp -= next;
			this.checkLevel(); //for chain leveling
		}
	}

	// ---------------------------------------------------------------------------
	// internal
	// ---------------------------------------------------------------------------
	this._dropResources = function(tableId, power) {
		power = power || 1; //never too safe ...
		var table = game.getLootTable(tableId);
		if (!table || table.length <= 0) {
			return;
		}
		// Todo: apply modifiers and tools etc	
		items = game.loot(table, this.baseMineSpeed * power);
		this.gainExp(items.length);
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
		localStorage[storageKey + 'exp'] = this.exp;
		localStorage[storageKey + 'level'] = this.level;
	};

	this.load = function() {
		var storageKey = this._getStorageKey();
		this.baseMineSpeed = utils.loadFloat(storageKey + 'baseMineSpeed', 1);
		this.baseMineSpeed = utils.loadFloat(storageKey + 'exp', 0);
		this.baseMineSpeed = utils.loadFloat(storageKey + 'level', 1);
	};

	this.reset = function(fullReset) {
		this.baseMineSpeed = 1;
	};
}
