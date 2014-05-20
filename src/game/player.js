require(["gameminer", "gamecombatant", "gamestorage", "gamegear" ]);

function Player() {
	this.id = 'player';
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
		this.gear.addSlot(GearType.secondHand);
		this.gear.addSlot(GearType.legs);	
		this.gear.addSlot(GearType.feet);
	};
	
	this.update = function(currentTime) {
		this.miner.update(currentTime);
		this.combatant.update(currentTime);
		
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
	this.mine = function() {
		if (!game.currentPlanet) {
			return;
		}

		game.settings.addStat('manualDigCount');

		var items = this.miner.mine(game.currentPlanet);
		if (items) {
			for(var i = 0; i < items.length; i++) {
				var name = game.getItemName(items[i]);
				var float = ui.createFloat('+1 ' + name, 'lootFloating', utils.getRandomInt(-100, 100), utils.getRandomInt(-100, 0));
			}
			
			this.storage.addItems(items);
		}
	};

	this.gather = function() {
		if (!game.currentPlanet) {
			return;
		}

		game.settings.addStat('manualGatherCount');

		var items = this.miner.gather(game.currentPlanet);
		if (items) {
			this.storage.addItems(items);
		}
	};

	this.scavenge = function() {
		if (!game.currentPlanet) {
			return;
		}

		game.settings.addStat('manualScavengeCount');

		var items = this.miner.scavenge(game.currentPlanet);
		if (items) {
			this.storage.addItems(items);
		}
	};

	this.craft = function(itemId, count) {
		// For now we craft with our inventory into our inventory
		if(!game.craft(this.storage, this.storage, itemId, count)) {
			return false;
		}
		
		var item = game.getItem(itemId);
		if(item.gearType == GearType.building && game.currentPlanet)
		{
			game.moveItems(itemId, this.storage, game.currentPlanet.storage, 1);
			
			// Todo: Planet needs to evaluate this
			game.currentPlanet.equip(item.id);
			game.currentPlanet.autoMineTime = item.autoMineTime;
			game.currentPlanet.autoMine = true;
		}
		
		this.equipBestGear();
		
		return true;
	};
	
	this.equipBestGear = function() {
		// TODO: needs actual selection of best gear, right now it selects the latest found + proper pickPower assignment
		for (var key in this.storage.items)
		{
			var item = game.getItem(key);
		
			if(!item || !item.gearType) {
				continue;
			}
		
			if(item.gearType == GearType.mainHand && item.name.match("Pickaxe") != null)
			{
				var diff = item.Power - this.pickPower;
				
				this.pickPower = item.power;
				this.miner.baseMineSpeed = item.power;
			}
			
			this.equip(item.id);
		}
	};
	
	this.equip = function(itemId) {
		if(!itemId || !this.storage.hasItem(itemId))
		{
			utils.logError("Unable to equip item, invalid or don't have it");
			return;
		}
		
		this.gear.equip(itemId, this.storage.getItemMetadata(itemId));
	};
	
	this.canEquip = function(itemId) {
		return this.gear.canEquip(itemId);
	};
	
	this.unEquip = function(type) {
		this.gear.unEquip(type);
	};
	
	this.hasEquipped = function(type) {
		return this.gear.getItemInSlot(type) != undefined;
	};

	this.getTravelSpeed = function() {
		// Todo: hardcoded for now until ship is done
		return 5000;
	};
	
	// ---------------------------------------------------------------------------
	// loading / saving
	// ---------------------------------------------------------------------------
	this.save = function() {
		this.miner.save();
		this.combatant.save();
		this.storage.save();
		this.gear.save();

		localStorage.playerOxygenConsumption = this.oxygenConsumption;
	};

	this.load = function() {
		this.miner.load();
		this.combatant.load();
		this.storage.load();
		this.gear.load();

		this.oxygenConsumption = utils.loadFloat('playerOxygenConsumption', 1);
	};

	this.reset = function(fullReset) {
		this.miner.reset(fullReset);
		this.combatant.reset(fullReset);
		this.storage.reset(fullReset);
		this.gear.reset(fullReset);
		
		this.oxygenConsumption = 1;
		this.pickPower = 1;
	};
}
