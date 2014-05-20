function Combatant(id) {
	this.id = id;
	this.health = 100;
	this.maxHealth = 100;
	this.defense = 100;
	this.attack = 50;
	this.alive = true;

	this.baseAttackSpeed = 1;

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
	this.hit = function(fight, target) { //target is a combatant
		var damage = this.attack; //TODO: add defense to formula
		var alive = target.takeDamage(fight, damage); //TODO: rename, probably not even use a function
		fight.action('attack', target, damage, alive); //TODO: use enum
		return true;
	};

	this.takeDamage = function(fight, damage) {
		this.health -= damage;
		return this.checkIsAlive(); //unsure if unnecessary function, but it can be used outside of combat
	};

	this.heal = function(fight, target) {
		target = target == undefined ? this : target;
		var healing = 60;
		if(target.health + healing > target.maxHealth) {
			healing = target.maxHealth - target.health;
		}
		target.health += healing;
		fight.action('heal', target, healing); 
		target.checkIsAlive();
		return true;
	};

	this.checkIsAlive = function() {
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

	this.reset = function(fullReset) {
		this.health = 100;
		this.maxHealth = 100;
		this.attack = 50;
		this.defense = 100;
		this.alive = true;

		this.baseAttackSpeed = 1;
	};
}