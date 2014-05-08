function Player() {
	this.pickPower = 1;
	this.miner = new Miner('player');
	this.combatant = new Combatant('player');
	this.storage = new Storage('player');
	this.gear = new Gear('player');

	this.oxygenConsumption = 1;
	this.lastOxygenConsumption = Date.now();

	// ---------------------------------------------------------------------------
	// general
	// ---------------------------------------------------------------------------
	this.initialize = function() {
		this.miner.initialize();
		this.combatant.initialize();
		this.storage.initialize();
		this.gear.initialize();
		
		// Add the slots we can wear
		this.gear.addSlot(GearType.head);
		this.gear.addSlot(GearType.chest);
		this.gear.addSlot(GearType.mainHand);
		this.gear.addSlot(GearType.extraHand);
		this.gear.addSlot(GearType.legs);	
		this.gear.addSlot(GearType.feet);
		// Equip wodden pick
		this.gear.equip(4000);
	};
	
	this.update = function(elapsed) {
		this.miner.update(elapsed);
		this.combatant.update(elapsed);

		var currentTime = Date.now();
		if (currentTime - this.lastOxygenConsumption > 1000) {
			// Todo: need to do something when this runs out
			if (this.storage.getItemCount(Items.oxygen.id) > 0) {
				this.storage.removeItem(Items.oxygen.id);
			}

			this.lastOxygenConsumption = currentTime;
		}
	};

	// ---------------------------------------------------------------------------
	// player functions
	// ---------------------------------------------------------------------------
	this.digDown = function() {
		game.currentPlanet.currentDepth += this.pickPower;
	};
	
	this.mine = function() {
		if (!game.currentPlanet) {
			return;
		}

		game.settings.addStat('manualDigCount');

		var items = this.miner.mine();
		if (items) {
			this.storage.addItems(items);
		}
	};

	this.gather = function() {
		if (!game.currentPlanet) {
			return;
		}

		game.settings.addStat('manualGatherCount');

		var items = this.miner.gather();
		if (items) {
			this.storage.addItems(items);
		}
	};

	this.craft = function(itemId, count) {
		// For now we craft with our inventory into our inventory
		game.craft(this.storage, this.storage, itemId, count);
	};
	
	this.equip = function(itemId) {
		if(!itemId || !this.storage.hasItem(itemId))
		{
			Utils.logError("Unable to equip item, invalid or don't have it");
			return;
		}
		
		this.gear.equip(itemId, this.storage.getItemMetadata(itemId));
	};
	
	this.unEquip = function(type) {
		this.gear.unEquip(type);
	};

	// ---------------------------------------------------------------------------
	// loading / saving
	// ---------------------------------------------------------------------------
	this.save = function() {
		this.miner.save();
		this.combatant.save();
		this.storage.save();

		localStorage.playerOxygenConsumption = this.oxygenConsumption;
	};

	this.load = function() {
		this.miner.load();
		this.combatant.load();
		this.storage.load();

		this.oxygenConsumption = Utils.loadFloat('playerOxygenConsumption', 1);
	};

	this.reset = function(fullReset) {
		this.miner.reset(fullReset);
		this.combatant.reset(fullReset);
		this.storage.reset(fullReset);

		this.oxygenConsumption = 1;
	};
}