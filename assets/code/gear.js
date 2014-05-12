function Gear(id) {

	this.id = id;

	this.slots = {};
	this.slotMetadata = {};
	
	this.gearChanged = false;

	// ---------------------------------------------------------------------------
	// general
	// ---------------------------------------------------------------------------
	this.initialize = function() {
	};

	this.update = function(currentTime) {
	};

	// ---------------------------------------------------------------------------
	// gear functions
	// ---------------------------------------------------------------------------
	this.addSlot = function(type) {
		if (this.slots[type]) {
			Utils.logError("Slot was already added: " + type);
			return;
		}

		this.slots[type] = -1;
		this.slotMetadata[type] = undefined;
	};

	this.equip = function(itemId, metadata) {	
		// get the item info
		var itemInfo = game.getItem(itemId);

		if (!itemInfo || !itemInfo.gearType) {
			Utils.logError("attempt to equip unknown or invalid item: " + itemId + itemInfo.category);
			return;
		}

		if (!this.slots[itemInfo.gearType]) {
			Utils.logError("attempt to equip item but slot was not set: " + itemId
					+ " in " + itemInfo.type);
			return;
		}

		this.slots[itemInfo.gearType] = itemId;
		this.slotMetadata[itemInfo.gearType] = metadata;
		this.gearChanged = true;
	};

	this.unEquip = function(type) {
		if (!this.slots[type]) {
			Utils.logError("attempt to un-equip item but slot was not set: "
					+ type);
			return;
		}
		
		this.slots[type] = -1;
		this.slotMetadata[type] = undefined;
		this.gearChanged = true;
	};
	
	this.hasGearEquipped = function(type){
		return this.slots[type] && this.slots[type] > -1;
	};
	
	this.getSlots = function() {
		return Object.keys(this.slots);
	};
	
	this.getItemInSlot = function(type) {
		if(this.slots[type] < 0) {
			return undefined;
		}
		
		return this.slots[type];
	};
	
	this.getMetadataInSlot = function(type) {
		return this.slotMetadata[type];
	};
	
	this.getStats = function() {
		// Todo: calculate all the stats for the current gear and return it
	};

	// ---------------------------------------------------------------------------
	// internal
	// ---------------------------------------------------------------------------
	this._getStorageKey = function() {
		return 'gear_' + this.id + '_';
	};

	// ---------------------------------------------------------------------------
	// loading / saving
	// ---------------------------------------------------------------------------
	this.save = function() {
		var storageKey = this._getStorageKey();
		for(var key in this.slots) {
			localStorage[storageKey + key] = this.slots[key];
			
			// Todo: save metadata
		}
	};

	this.load = function() {
		var storageKey = this._getStorageKey();
		for(var key in this.slots) {
			var itemId = Utils.loadInt(storageKey + key, undefined);
			if(!itemId || itemId < 0) {
				continue;
			}

			this.equip(itemId);
			// Todo: load metadata
		}
		
		this.gearChanged = true;
	};

	this.reset = function(fullReset) {
		for(var key in this.slots) {
			if(!this.hasGearEquipped(key)) {
				continue;
			}
			
			this.unEquip(key);
		}
	};
}
