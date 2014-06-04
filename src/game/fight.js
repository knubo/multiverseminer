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

	this.close = function(){
		this.teams[0].members[0].inCombat = false;
		this.teams[1].members[0].inCombat = false;
		this.status.active = false;
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
					var log = "combatant "+combatant.name+" is dead";
					this.log.push(log);
					console.log(log);
					$('#combat-log').prepend(log+"<br>");
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
			//returns number of dead/alive people etc.
		};

		this.getRandomMember = function() {
			//returns a random member
		};
		
		this.getAlive = function() {
			//returns the members that are alive
		};
		
		this.getDead = function() {
			//returns the members that are dead
		};
		
		this.areAllDead = function() {
			//returns true/false
		};
	}
}








