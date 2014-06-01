function Fight(teamList) {
	this.teams = [];
	this.log = [];
	this.status = {
		turn: Math.round(Math.random()), //random starter. Opposite of this number starts
		active:true
	};
	this.counter = -1; //counter for teams

	if(teamList.length < 2){return "Need at least two teams to start a fight";}
	for(var i=0;i<teamList.length;i++){
		this.teams.push(
			new Team(teamList[i])
		);
	}

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


	this.nextTurn = function() {
		this.checkStatus();
		if(!this.status.active){return this;}
		this.status.turn = 1-this.status.turn; //switch turn to other player
		this.teams[this.status.turn].requestMove(this,this.teams[1-this.status.turn]);
	};
	
	this.action = function(action,source,target){
		if(action == "attack"){
			var sourceStats = source.stats;
			var targetStats = target.stats;

			var damage = sourceStats.damage;
			this.log.push(source.name+" hits "+target.name+" for "+damage+" hp.");
			target.takeDamage(this,damage);
		}else if(action == "heal"){
			var sourceStats = source.stats;
			var targetStats = target.stats;

			var heal = sourceStats.damage;
			this.log.push(source.name+" heals "+target.name+" for "+damage+" hp.");
			target.heal(this,heal);
		}
	};

	this.checkStatus = function(){
		for(var team=0;team<this.teams.length;team++){
			for(var member=0;member<this.teams[team].length;member++){
				var combatant = this.teams[team][member];
				if(!isAlive){
					this.log.push("combatant "+combatant.name+" is dead");
					this.status.active = false; //disable fight when somebody dies
				}
			}
		}
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








