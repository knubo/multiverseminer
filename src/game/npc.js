require(["gamecombatant", "gamestorage", "gamegear" ]);

function NPC(id) {
	this.storage = new Storage('npc_' + id);
	this.gear = new Gear('npc_' + id);
	this.combatant = new Combatant({id:'npc_' + id,npc:true,player:this});
	this.NPC = true;
	
	this.AI = undefined;

	// ---------------------------------------------------------------------------
	// general
	// ---------------------------------------------------------------------------
	this.initialize = function() {
		this.combatant.initialize();
		this.storage.initialize();
		this.gear.initialize();
		
		// Give npc's a default basic ai, move somewhere else later
		this.AI = function(info) {
						//normally this would analyze info (enemies' hp, potential damage, potential defense, and make a decision based on it
						//this one will just randomly attack any enemy
						return ['hit', 'any'];
					};
	};
	
	this.update = function(currentTime) {
		this.combatant.update(currentTime);
	};
	
	// ---------------------------------------------------------------------------
	// npc functions
	// ---------------------------------------------------------------------------
	this.setAI = function(AI) {
		this.AI = AI;
	};
	
	this.getAI = function() {
		return this.AI;
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