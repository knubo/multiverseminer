var game = {
    earth: { 
	    depth: 0,
		ironChance: 10,
		iron: 0,
		fuelChance: 0,
		fuel: 0,
		oxygenChance: 100,
		oxygen: 0,
		chance: 0
	},
	moon: {
	    depth: 0
	}
};

function dig_earth(number){
    game.earth.depth+=number;
	if(game.earth.depth>10000){
	    game.earth.ironChance=100;
	} else if(game.earth.depth>9000){
	    game.earth.ironChance=90;
	} else if(game.earth.depth>8000){
	    game.earth.ironChance=80;
	} else if(game.earth.depth>7000){
	    game.earth.ironChance=70;
	} else if(game.earth.depth>6000){
	    game.earth.ironChance=50;
	} else if(game.earth.depth>5000){
	    game.earth.ironChance=40;
	} else if(game.earth.depth>4000){
	    game.earth.ironChance=30;
	} else if(game.earth.depth>3000){
	    game.earth.ironChance=20;
	} else {
	    game.earth.ironChance=10;
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