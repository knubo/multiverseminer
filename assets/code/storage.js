function Storage(id) {
	this.id = id;
	this.items = {};

	this.itemCategoryDictionary = {};
	this.itemTypeDictionary = {};
	this.itemMetadata = {};
	
	this.storageChanged = false;
	
	// ---------------------------------------------------------------------------
	// general
	// ---------------------------------------------------------------------------
	this.initialize = function() {
	};

	// ---------------------------------------------------------------------------
	// storage functions
	// ---------------------------------------------------------------------------
	this.canAdd = function(id) {
		if (!this.items[id]) {
			return true;
		}

		// See if this item has limited storage capacity
		var limit = game.itemDictionary[id].storageLimit;
		if (!limit) {
			return true;
		}

		return limit < this.items[id];
	};

	this.addItem = function(id, value) {
		if (!value) {
			value = 1;
		}

		// Get some info about the item we are adding
		var itemInfo = game.itemDictionary[id];
		if (!itemInfo) {
			Utils.logError("attempt to add unknown item: " + id);
			return;
		}

		// Add it to the storage
		if (!this.items[id]) {
			this.items[id] = 0;
		}

		this.items[id] += value;

		// Register this item in the dictionaries
		this._registerItemDictionary(itemInfo, "category", this.itemCategoryDictionary);
		this._registerItemDictionary(itemInfo, "type", this.itemTypeDictionary);
		
		this.storageChanged = true;
	};

	this.addItems = function(items) {
		var keys = Object.keys(items);
		for ( var i = 0; i < keys.length; i++) {
			var key = keys[i];
			this.addItem(key, items[key]);
		}
	};

	this.hasItem = function(id)
	{
		return this.items[id] != undefined;
	};

	this.getItems = function() {
		return Object.keys(this.items);
	};

	this.getItemsOfType = function(type) {
		if (!this.itemTypeDictionary[type]) {
			return;
		}

		return this.itemTypeDictionary[type];
	};
	
	this.getItemsOfCategory = function(category) {
		if (!this.itemCategoryDictionary[category]) {
			return;
		}
		
		return this.itemCategoryDictionary[category];
	};

	this.getItemCount = function(id) {
		if (!this.items[id]) {
			return 0;
		}

		return this.items[id];
	};

	this.removeItem = function(id, value) {
		if (!value) {
			value = 1;
		}

		// Get some info about the item we are adding
		var itemInfo = game.itemDictionary[id];
		if (!itemInfo) {
			Utils.logError("attempt to remove unknown item: " + id);
			return;
		}
		
		if (!this.items[id] || this.items[id] < value) {
			Utils.logError("RemoveItem of " + id
					+ " called with insufficient items: " + id + " was "
					+ this.items[id]);
			return;
		}

		this.items[id] -= value;
		if (this.items[id] <= 0) {
			// We depleted the resource so we remove the entry
			delete this.items[id];
		}
		
		// Unregister from the dictionaries
		this._unregisterItemDictionary(itemInfo, "category", this.itemCategoryDictionary);
		this._unregisterItemDictionary(itemInfo, "type", this.itemTypeDictionary);
		
		this.storageChanged = true;
	};
	
	this.setItemMetadata = function(id, metadata) {
		this.itemMetadata[id] = metadata;
		this.storageChanged = true;
	};
	
	this.getItemMetadata = function(id) {
		return this.itemMetadata[id];
	};
	
	this.removeItemMetadata = function(id) {
		if(!this.itemMetadata[id]) {
			return;
		}
		
		delete this.itemMetadata[id];
		this.storageChanged = true;
	};
	
	// ---------------------------------------------------------------------------
	// internal stuff, don't use outside
	// ---------------------------------------------------------------------------
	this._registerItemDictionary = function(itemInfo, property, dictionary) {
		var propertyValue = itemInfo["property"];
		if (propertyValue) {
			if (!dictionary[propertyValue]) {
				dictionary[propertyValue] = [];
			}

			// Register this item in our dictionary if it's not there yet
			if (!jQuery.inArray(itemInfo.id, dictionary[propertyValue])) {
				dictionary[propertyValue].push(itemInfo.id);
			}
		}
	};
	
	this._unregisterItemDictionary = function(itemInfo, property, dictionary) {
		var propertyValue = itemInfo["property"];
		if (propertyValue) {
			if (!dictionary[propertyValue]) {
				return
			}

			// Unregister the item
			var index = dictionary[propertyValue].indexOf(itemInfo.id);
			if (index >= 0) {
				dictionary[propertyValue].splice(index, 1);
			}
			
			// Clean up if this was the last item
			if (dictionary[propertyValue].length <= 0) {
				delete dictionary[propertyValue];
			}
		}
	};
	
	this._getStorageKey = function() {
		return 'storage_' + this.id + '_';
	};

	// ---------------------------------------------------------------------------
	// loading / saving
	// ---------------------------------------------------------------------------
	this.save = function() {
		var storageKey = this._getStorageKey();

		var keys = Object.keys(this.items);
		for ( var i = 0; i < keys.length; i++) {
			var key = keys[i];
			var value = this.items[key];
			localStorage[storageKey + key] = value;
		}
	};

	this.load = function() {
		var storageKey = this._getStorageKey();

		var keys = Object.keys(game.itemDictionary);
		for ( var i = 0; i < keys.length; i++) {
			var key = keys[i];
			if (!localStorage[storageKey + key]) {
				continue;
			}

			this.items[key] = Utils.loadInt(storageKey + key, 0);
		}
	};

	this.reset = function(fullReset) {
		this.items = {};
	};
};