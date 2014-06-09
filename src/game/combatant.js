function Combatant(opts) {
    this.opts = opts;
    this.name = opts.name || "npc";
    this.id = opts.id;
    this.npc = opts.npc;

    this.inCombat = false;

    this.health = 10;
    this.maxHealth = this.health;
    this.alive = true;
    
    //local variables, change later
    this.regenCounter = 0; //used for timed regen
    this.delta = 0;
    this.last = 0;

    // ---------------------------------------------------------------------------
    // general
    // ---------------------------------------------------------------------------
    this.initialize = function() {
    	if(this.npc) {
    		
    	}

        this.health = 10;
        this.maxHealth = this.health;
    };

    this.update = function(currentTime) {
    	if(!this.inCombat) {
    		this.delta = currentTime-this.last;
    		this.regenCounter += this.delta;
	    	if(this.regenCounter > 1000) {//TODO: add regen per fraction once we have a health regen stat
	    		if(this.health < this.maxHealth)
	    			this.health ++;
	    		this.regenCounter -= 1000;
	    	}
    	} else this.regenCounter = 0;
    	this.last = currentTime;
    };

    // ---------------------------------------------------------------------------
    // combatant functions
    // ---------------------------------------------------------------------------

    this.requestMove = function(fight, team, opponentTeam) {
        var move;
        if (this.autoAttack) {
            var source = this;
            var target = opponentTeam.members[0];
            setTimeout(function() {
                fight.action("attack", source, target);
            }, 100);
            return this;
        }
        if (this.npc) {
            move = this.player.requestMove(fight, team, opponentTeam);
        } else {
            //ask player for move
        }
    };

    this.takeDamage = function(fight, damage) {
        this.health -= damage;
        this.isAlive();
        return this; //unsure if unnecessary function, but it can be used outside of combat
    };

    this.heal = function(fight, amount) {
        if (!this.alive) {
            return "Player is dead";
        }
        if(this.health + amount > this.maxHealth)
        	amount = this.maxHealth - this.health;
        this.health += amount;
        return this;
    };

    this.isAlive = function() {
        if (this.health <= 0) {
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
    this.reset = function() {
        //placeholder
        this.stats = this.opts.player.gear.getStats() || {};
        this.stats.damage = this.stats.strength || 1;
        this.autoAttack = false;
        if (this.npc) {
            this.autoAttack = true;
        }

        this.health = 10;
        this.maxHealth = this.health;
    };
    this.reset(); //Why is this here?
    this.save = function() {
        var storageKey = this._getStorageKey();

        localStorage[storageKey + 'health'] = this.health;
        localStorage[storageKey + 'maxHealth'] = this.maxHealth;
        localStorage[storageKey + 'attack'] = this.attack; //we have stats.damage, not this.attack?
        localStorage[storageKey + 'defense'] = this.defense; //same as attack
        localStorage[storageKey + 'alive'] = this.alive;

        localStorage[storageKey + 'baseAttackSpeed'] = this.baseAttackSpeed;
    };

    this.load = function() {
        var storageKey = this._getStorageKey();

        this.health = utils.loadFloat(storageKey + 'health', 10); //changed default to 10
        this.maxHealth = utils.loadFloat(storageKey + 'maxHealth', 10); //changed default to 10
        this.attack = utils.loadFloat(storageKey + 'attack', 0); //we have stats.damage, not this.attack?
        this.defense = utils.loadFloat(storageKey + 'defense', 0); //same as attack
        this.alive = utils.loadBool(storageKey + 'alive', true);

        this.baseAttackSpeed = utils.loadFloat(storageKey + 'baseAttackSpeed', 1);
    };
}
