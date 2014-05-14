function Planet(data) {
	this.data = data;
	this.miner = new Miner('planet' + data.id);
	this.storage = new Storage('planet' + data.id);
	
	// ---------------------------------------------------------------------------
	// general
	// ---------------------------------------------------------------------------
	this.initialize = function() {
		this.miner.initialize();
		this.storage.initialize();
	};
	
	this.update = function(currentTime) {
		this.miner.update(currentTime);
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

		var storageKey = this.getStorageKey();
	};

	this.load = function() {
		this.miner.load();
		this.storage.load();

		var storageKey = this.getStorageKey();
	};

	this.reset = function() {
		this.miner.reset();
		this.storage.reset();

		this.currentDepth = 0;
	};
}
