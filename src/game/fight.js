function Fight(teamList) {
	this.teams = [];
	this.log = [];
	this.status = {
		turn: Math.round(Math.random()), //random starter. Opposite of this number starts
		active:true
	};

	$('#combat-log').html(' '); //clear log
    
	this.winner = -1;

	var npc = new NPC();
	this.teams = [
		new Team([game.player]),
		new Team([npc])
	];
	
	this.text = undefined; //TODO: add this to the HTML, its only experimental for now.
	
	$('#playerHP').width((this.teams[0].members[0].health/this.teams[0].members[0].maxHealth)*100+"%");
	$('#enemyHP').width((this.teams[1].members[0].health/this.teams[1].members[0].maxHealth)*100+"%");
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

	this.disableFight = function(){
		this.teams[0].members[0].inCombat = false;
		this.teams[1].members[0].inCombat = false;
		this.status.active = false;
		$('#fightText')[0].removeChild(this.text);
		$('#combat-log')[0].style.display = "";
		
	};

    // ---------------------------------------------------------------------------
    // fight functions
    // ---------------------------------------------------------------------------
    this.attack = function(){
		//placeholder. "Attack" button triggers this.
		if(this.status.active){
			//very bad, will change
			this.action("attack",this.teams[0].members[0],this.teams[1].members[0]);
		}
    };
    this.heal = function(){
    	if(this.status.active){
        	this.action("heal", this.teams[0].members[0],this.teams[0].members[0]);
        }
    };
	this.nextTurn = function() {
		this.checkStatus();
		if(!this.status.active){
			//no combat
			this.teams[0].members[0].inCombat = false;
			this.teams[1].members[0].inCombat = false;
			return this;
		}
		this.status.turn = 1-this.status.turn; //switch turn to other player
		this.teams[this.status.turn].requestMove(this,this.teams[1-this.status.turn]);
	};
	
	this.action = function(action,source,target){
		if(action == "attack"){
			var sourceStats = source.stats;
			var targetStats = target.stats;

			var damage = sourceStats.damage;
            var log = source.name+" hit "+target.name+" for "+damage+" hp.";
			this.log.push(log);
			console.log(log);
			$('#combat-log').prepend(log+"<br>");
			target.takeDamage(this,damage);
		}else if(action == "heal"){
			var sourceStats = source.stats;
			var targetStats = target.stats;
            var damage = sourceStats.damage;
			var heal = sourceStats.damage;
			var log = source.name+" heals "+target.name+" for "+damage+" hp.";
			this.log.push(log);
			console.log(log);
			$('#combat-log').prepend(log+"<br>");
			target.heal(this,heal);
		}
		this.nextTurn();
	};

	this.checkStatus = function(){
		for(var team=0;team<this.teams.length;team++){
			for(var member=0;member<this.teams[team].members.length;member++){
				var combatant = this.teams[team].members[member];
				if(combatant.isAlive() === false){
					/*var log = "combatant "+combatant.name+" is dead";
					this.log.push(log);
					console.log(log);
					$('#combat-log').prepend(log+"<br>");*/
					
					//TODO: put this in the HTML and hidden, put this into a function
						$('#combat-log')[0].style.display = "none";
						this.text = document.createElement("div");
						$('#fightText')[0].appendChild(this.text);
						var lootTable = game.getLootTable(1500); //npcGenericLoot
						var items = game.loot(lootTable, this.teams[1].members.length); //for now, it'll loot once per enemy in the enemy team
						//TODO: make this loot depending on each enemy
						var lootedItems = [];
						for(var i = 0; i < items.length; i++) {
							if(!lootedItems[items[i]]) lootedItems[items[i]] = 0;
							lootedItems[items[i]]++;
						}
						this.text.innerText = "Battle won!\nYou've earned 10 xp.\n\nLoot:";
						for(var k in lootedItems) {
							this.text.innerText += "\n" + lootedItems[k] + " " + game.getItem(k).name; // # item ej: 3 Copper Bar
						}
					
					this.status.active = false; //disable fight when somebody dies
					this.winner = this.teams[1-team].members[0];
				}
			}
		}
		$('#playerHP').width((this.teams[0].members[0].health/this.teams[0].members[0].maxHealth)*100+"%");
		$('#enemyHP').width((this.teams[1].members[0].health/this.teams[1].members[0].maxHealth)*100+"%");
	};

	// ---------------------------------------------------------------------------
	// loading / saving
	// ---------------------------------------------------------------------------
	//TODO: add save/load
	
	
	// ---------------------------------------------------------------------------
	// inner class
	// ---------------------------------------------------------------------------
	function Team(memberList) {
		this.members = [];
		for(var i=0;i<memberList.length;i++){
			memberList[i].combatant.reset();
			memberList[i].combatant.inCombat = true;
			this.members.push(
				memberList[i].combatant
			);
		}
		this.requestMove = function(fight,opponent){
			this.members[0].requestMove(fight,this,opponent);
		};
		this.getStatus = function(){
			//TODO: add more stats
			return {'alive': this.getAlive().length, 'dead': this.getDead().length};
		};

		this.getRandomMember = function() {
			var alive = getAlive();
			return alive[Math.floor((Math.random() * alive.length * 3) % alive.length)]; //made it *3 to increase randomness
		};
		
		this.getAlive = function() {
			var alive = [];
			for(var i = 0; i < this.members.length; i++)
				if(this.members[i].isAlive())
					alive.push(this.members[i]);
			return alive;
		};
		
		this.getDead = function() {
			var dead = [];
			for(var i = 0; i < this.members.length; i++)
				if(!this.members[i].isAlive())
					dead.push(this.members[i]);
			return dead;
		};
		
		this.areAllDead = function() {
			return this.getDead().length == this.members.length;
		};
	}
}








