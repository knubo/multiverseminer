function NPC(id) {
	this.combatant = new Combatant('npc_' + id);
	this.storage = new Storage('npc_' + id);
	this.gear = new Gear('npc_' + id);

	// ---------------------------------------------------------------------------
	// general
	// ---------------------------------------------------------------------------
	this.initialize = function() {
		this.combatant.initialize();
		this.storage.initialize();
		this.gear.initialize();
	};
	
	this.update = function(currentTime) {
		this.combatant.update(currentTime);
	};

	// ---------------------------------------------------------------------------
	// loading / saving
	// ---------------------------------------------------------------------------
	this.save = function() {
		this.miner.save();
		this.combatant.save();
		this.storage.save();
		this.gear.save();
	};

	this.load = function() {
		this.combatant.load();
		this.storage.load();
		this.gear.load();
	};

	this.reset = function(fullReset) {
		this.combatant.reset(fullReset);
		this.storage.reset(fullReset);
	};
}