function Combatant(opts) {
	this.opts=opts;
	this.name = opts.name || "npc";
	this.id = opts.id;
	this.npc = opts.npc;

	// ---------------------------------------------------------------------------
	// general
	// ---------------------------------------------------------------------------
	this.initialize = function() {
		
	};

	this.update = function(currentTime) {
	};

	// ---------------------------------------------------------------------------
	// combatant functions
	// ---------------------------------------------------------------------------

	this.requestMove = function(fight,team,opponentTeam){
		var move;
		if(this.autoAttack){
			var source = this;
			var target = opponentTeam.members[0];
			setTimeout(function(){fight.action("attack",source,target);},100);
			return this;
		}
		if(this.npc){
			move = this.player.requestMove(fight,team,opponentTeam);
		}else{
			//ask player for move
		}
	};

	this.takeDamage = function(fight, damage) {
		this.health -= damage;
		return this; //unsure if unnecessary function, but it can be used outside of combat
	};

	this.heal = function(fight, amount) {
		if(!this.alive){return "Player is dead";}
		this.health += amount;
		return this;
	};

	this.isAlive = function() {
		if(this.health <= 0) {
			this.health = 0;
			this.alive = false;
		} else {
			this.alive = true;
		}
		return this.alive;
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
	this.reset = function(){
		//placeholder
		this.health = 10;
		this.maxHealth = this.health;
		this.stats = this.opts.player.gear.getStats() || {};
		this.stats.damage = 1;
		this.alive = true;
		this.autoAttack = false;
		if(this.npc){this.autoAttack=true;}
	};
	this.reset();
	this.save = function() {
		var storageKey = this._getStorageKey();

		localStorage[storageKey + 'health'] = this.health;
		localStorage[storageKey + 'maxHealth'] = this.maxHealth;
		localStorage[storageKey + 'attack'] = this.attack;
		localStorage[storageKey + 'defense'] = this.defense;
		localStorage[storageKey + 'alive'] = this.alive;

		localStorage[storageKey + 'baseAttackSpeed'] = this.baseAttackSpeed;
	};

	this.load = function() {
		var storageKey = this._getStorageKey();

		this.health = utils.loadFloat(storageKey + 'health', 0);
		this.maxHealth = utils.loadFloat(storageKey + 'maxHealth', 0);
		this.attack = utils.loadFloat(storageKey + 'attack', 0);
		this.defense = utils.loadFloat(storageKey + 'defense', 0);
		this.alive = utils.loadBool(storageKey + 'alive', true);

		this.baseAttackSpeed = utils.loadFloat(storageKey + 'baseAttackSpeed', 1);
	};
}