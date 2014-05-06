var game = {
    earth: { 
	    depth: 0,
		ironChance: 10,
		iron: 0,
		ironBar: 0,
		fuelChance: 0,
		fuel: 0,
		oxygenChance: 100,
		oxygen: 0,
		chance: 0
	},
	moon: {
	    depth: 0
	},
	pick: {
		current: {
			owned: true,
			power: 1
		},
		wood: {
			owned: true,
			power: 1,
			name: "Wood Pickaxe"
		},
		iron: {
			owned: false,
			power: 3,
			name: "Iron Pickaxe"
		}
	}
};

function dig_down(){
    game.earth.depth+=game.pick.current.power;
	if(game.earth.depth>10000){
	    game.earth.ironChance=100*game.pick.current.power;
	} else if(game.earth.depth>9000){
	    game.earth.ironChance=90*game.pick.current.power;
	} else if(game.earth.depth>8000){
	    game.earth.ironChance=80*game.pick.current.power;
	} else if(game.earth.depth>7000){
	    game.earth.ironChance=70*game.pick.current.power;
	} else if(game.earth.depth>6000){
	    game.earth.ironChance=50*game.pick.current.power;
	} else if(game.earth.depth>5000){
	    game.earth.ironChance=40*game.pick.current.power;
	} else if(game.earth.depth>4000){
	    game.earth.ironChance=30*game.pick.current.power;
	} else if(game.earth.depth>3000){
	    game.earth.ironChance=20*game.pick.current.power;
	} else {
	    game.earth.ironChance=10*game.pick.current.power;
	}
	game.earth.chance = getRandom();
	if(game.earth.chance<game.earth.ironChance){
	    game.earth.iron+=1;
		document.getElementById('iron').innerHTML = game.earth.iron;
	}
	document.getElementById('depth').innerHTML = game.earth.depth;
}

function getRandom(){
    return Math.floor((Math.random() * 100) + 1);
}

function craftIronBar(){
    if(game.earth.iron>=10){
	    game.earth.iron-=10;
		game.earth.ironBar+=1;
		document.getElementById('iron').innerHTML = game.earth.iron;
		document.getElementById('ironbar').innerHTML = game.earth.ironBar;
	}
}

function craftIronPick(){
    if(game.earth.ironBar>=10){
	    game.earth.ironBar-=10;
		game.pick.iron.owned = true;
		game.pick.current.power = game.pick.iron.power;
		document.getElementById('ironbar').innerHTML = game.earth.ironBar;
		document.getElementById('pickType').innerHTML = game.pick.iron.name;
		document.getElementById('pickPower').innerHTML = game.pick.iron.power;
	}
}

function gather_atmosphere(){
	// "Add 1" is incredibly vague.
}