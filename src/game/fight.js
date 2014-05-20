function Fight() {
	
	this.inFight = false;

	this.teams = [];
	
	this.turn = -1; //0 = a, 1 = b
	this.counter = -1; //counter for teams
	
	// ---------------------------------------------------------------------------
    // main functions
    // ---------------------------------------------------------------------------
	this.init = function() {
	};
	
	this.update = function() {
	};
	
	this.show = function() {
	};
	
	this.hide = function() {
	};

    // ---------------------------------------------------------------------------
    // fight functions
    // ---------------------------------------------------------------------------
	this.startBattle = function(fighterA, fighterB) { //player, enemy
		this.teams = [
		              {
		            	  'name': "A",
		            	  'value': fighterA
		              },
		              {
		            	  'name': "B",
		            	  'value': fighterB
		              }
		             ];
		this.inFight = true;
		this.turn = 0;
		this.nextTurn();
	};
	
	this.stopBattle = function() {
		this.teams = []
		this.inFight = false;
		this.turn = -1;
		this.counter = -1;
	}
	
	this.nextTurn = function() {
		this.counter ++;
		if(this.counter < this.teams[this.turn].value.length) {
			var currentCombatant = this.teams[this.turn].value[this.counter], currentAction, currentTarget;
			if(!currentCombatant.AI) {
				//TODO: display UI to wait for player input
				do {
					currentAction = prompt("Actions: hit heal", 'hit');
				} while(currentAction != 'hit' && currentAction != 'heal');
				//TODO: display targetting UI
				if(currentAction == 'heal') {
					currentTarget = currentCombatant; //add other targets
				} else {
					currentTarget = this.teams[1-this.turn].value[(Math.floor(Math.random()*this.teams[1-this.turn].value.length))]; //UGLY LINE
				}
			} else {
				var info = null; //TODO: fill this out
				var AIOrder = currentCombatant.AI(info);
				currentAction = AIOrder[0], currentTarget = AIOrder[1];
				if(currentTarget == 'any') {
					currentTarget = this.teams[1-this.turn].value[(Math.floor(Math.random()*this.teams[1-this.turn].value.length))];
				}
			}
			currentCombatant.combatant[currentAction](this, currentTarget.combatant);
		} else {
			this.turn = 1 - this.turn;
			this.counter = -1;
			this.nextTurn();
		}
	};
	
	this.action = function(type, target, value, alive) {
		//TODO: change this too -.-
		//TODO: add combatant info to the display (teams[turn].value[counter].info ?)
		//TODO: display target info
		alive = alive==undefined ? true : alive;
		switch(type) {
			case 'attack':
				console.log( this.teams[this.turn].name + " hits " + this.teams[1-this.turn].name + " for " + value + " damage");
				break;
			case 'heal':
				console.log( this.teams[this.turn].name + " heals for " + value + " health");
				break;
		}
		if(alive) {
			this.nextTurn();
		} else {
			this.win();
		}
	};
	
	this.win = function() { //the winner is the person whose turn it is (that line is weird to say)
		console.log("Team " + this.teams[this.turn].name + " wins!");
		this.stopBattle();
	};

	// ---------------------------------------------------------------------------
	// loading / saving
	// ---------------------------------------------------------------------------
	//TODO: add save/load
};