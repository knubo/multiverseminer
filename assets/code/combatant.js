function Combatant(id) {
	this.id = id;
	this.health = 100;
	this.defense = 100;

	this.baseAttackSpeed = 1;

	// ---------------------------------------------------------------------------
	// general
	// ---------------------------------------------------------------------------
	this.initialize = function() {		
	};
	
	this.update = function(currentTime) {
	};

	// ---------------------------------------------------------------------------
	// internal
	// ---------------------------------------------------------------------------
	this._getStorageKey = function() {
		return 'combatant_' + this.id + '_';
	};
	
	// ---------------------------------------------------------------------------
	// loading / saving
	// ---------------------------------------------------------------------------
	this.save = function() {
		var storageKey = this._getStorageKey();

		localStorage[storageKey + 'health'] = this.health;
		localStorage[storageKey + 'defense'] = this.defense;

		localStorage[storageKey + 'baseAttackSpeed'] = this.baseAttackSpeed;
	};

	this.load = function() {
		var storageKey = this._getStorageKey();

		this.health = utils.loadFloat(storageKey + 'health', 0);
		this.defense = utils.loadFloat(storageKey + 'defense', 0);

		this.baseAttackSpeed = utils.loadFloat(storageKey + 'baseAttackSpeed',
				1);
	};

	this.reset = function(fullReset) {
		this.health = 100;
		this.defense = 100;

		this.baseAttackSpeed = 1;
	};
}