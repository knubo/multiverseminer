function Gear(id) {

	this.id = id;

	this.slots = {};
	this.slotMetadata = {};

	// ---------------------------------------------------------------------------
	// general
	// ---------------------------------------------------------------------------
	this.initialize = function() {
	};

	this.update = function(elapsed) {
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
		var itemInfo = game.itemDictionary[id];
		if (!itemInfo || !itemInfo.type) {
			Utils.logError("attempt to equip unknown or invalid item: " + id);
			return;
		}

		if (!this.slots[item.type]) {
			Utils.logError("attempt to equip item but slot was not set: " + id
					+ " in " + item.type);
			return;
		}

		this.slots[item.type] = item;
		this.slotMetadata[item.type] = metadata;
	};

	this.unEquip = function(type) {
		if (!this.slots[type]) {
			Utils.logError("attempt to un-equip item but slot was not set: "
					+ type);
			return;
		}

		this.slots[type] = -1;
		if (this.slotMetadata[type]) {
			delete this.slotMetadata[type];
		}
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
	};

	this.load = function() {
	};

	this.reset = function(fullReset) {
	};
}