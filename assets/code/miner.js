function Miner(id) {
	this.id = id;

	this.baseMineSpeed = 1;
	
	this.gatherableResources = undefined;
	this.minableResources = undefined;

	// ---------------------------------------------------------------------------
	// general
	// ---------------------------------------------------------------------------
	this.initialize = function() {		
	};
	
	this.update = function(currentTime) {
	};

	this.gather = function() {
		if (!this.gatherableResources || this.gatherableResources.length <= 0) {
			return;
		}

		// Todo: apply modifiers and tools etc
		return this._dropResources(this.gatherableResources);
	};

	this.mine = function() {
		if (!this.minableResources || this.minableResources.length <= 0) {
			return;
		}
		
		// Todo: apply modifiers and tools etc
		var loot = this._dropResources(this.minableResources);		
		return loot;
	};
	
	this.setDepth = function(depth) {
	    this.minableResources = game.currentPlanet.getMinableResources(depth);
	    this.gatherableResources = game.currentPlanet.getGatherableResources(depth);
	};

	// ---------------------------------------------------------------------------
	// internal
	// ---------------------------------------------------------------------------
	this._dropResources = function(resources) {
		var items = {};
		for ( var i = 0; i < resources.length; i++) {
			var resource = resources[i];
			var chance = resource.baseChance;
			if (Math.random() <= chance) {
				// Todo: allow for drop of more than one?
				items[resource.id] = 1;
			}
		}

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

		this.baseMineSpeed = Utils.loadFloat(storageKey + 'baseMineSpeed', 1);
	};

	this.reset = function(fullReset) {
		this.baseMineSpeed = 1;
	};
}