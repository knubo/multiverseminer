function Planet(data) {
	this.data = data;
	this.miner = new Miner('planet' + data.id);
	this.storage = new Storage('planet' + data.id);

	this.currentDepth = 0;
	
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
	this.getGatherableResources = function(depth) {
		return this._getAvailableResources('gather', depth || this.currentDepth);
	};

	this.getMinableResources = function(depth) {
		return this._getAvailableResources('mine', depth || this.currentDepth);
	};
	
	this.getName = function() {
	    return this.data.name;
	};
	
	this.getBackground = function() {
	    return this.data.background;
	};

	// ---------------------------------------------------------------------------
    // internal
    // ---------------------------------------------------------------------------
	this._getAvailableResources = function(mode, depth) {
		var results = [];
		var keys = Object.keys(this.data.resources);
		for ( var i = 0; i < keys.length; i++) {
			var resource = this.data.resources[keys[i]];

			// We push the resource id into the resource to link it up on drop
			resource.id = keys[i];

			if (resource.mode == undefined || resource.mode != mode) {
				continue;
			}

			var min = resource.minDepth || 0;
			var max = resource.maxDepth || Number.MAX_VALUE;
			if (min > depth || max < depth) {
				continue;
			}

			results.push(resource);
		}

		return results;
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
		localStorage[storageKey + 'currentDepth'] = this.currentDepth;
	};

	this.load = function() {
		this.miner.load();
		this.storage.load();

		var storageKey = this.getStorageKey();

		this.currentDepth = Utils.loadInt(storageKey + 'currentDepth', 0);
	};

	this.reset = function() {
		this.miner.reset();
		this.storage.reset();

		this.currentDepth = 0;
	};
}
