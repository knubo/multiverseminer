var game = {
    earth: { 
	    depth: 0,
		ironChance: 100,
		iron: 10,
		ironBar: 0,
		fuel: 10,
        fuelCan: 0,
		fuelChance: 5,
		oxygenChance: 100,
		oxygen: 0,
		chance: 0,
		copper: 0,
		copperChance: 5
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
		},
		copper: {
			owned: false,
			power: 10,
			name: "Copper Pickaxe"
		}
	}
};
var atmosphere = 0;
function gather_atmosphere(number){
    atmosphere = atmosphere + number;
    document.getElementById("atmosphere").innerHTML = atmosphere;
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
	    game.earth.iron++;
		document.getElementById('iron').innerHTML = game.earth.iron;
	}
	if(game.earth.chance<game.earth.copperChance){
	    game.earth.copper++;
		document.getElementById('copper').innerHTML = game.earth.copper;
	}
    if(game.earth.chance<game.earth.fuelChance){
        game.earth.fuel++;
        document.getElementById('fuel').innerHTML = game.earth.fuel;
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
		document.getElementById('ironBar').innerHTML = game.earth.ironBar;
	}
}

function craftFuelCan(){
    if(game.earth.fuel>=10 && game.earth.ironBar>=1){
        game.earth.fuel-=10;
        game.earth.ironBar-=1;
        game.earth.fuelCan+=1;
        document.getElementById('fuel').innerHTML = game.earth.fuel;
        document.getElementById('ironBar').innerHTML = game.earth.ironBar;
        document.getElementById('fuelCan').innerHTML = game.earth.fuelCan;
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

function planetEarth(){
	$(".planet").planetarium({
   		autospin: "10000ms",                                  
   		angle: "20deg",                                      
   		glow: "rgba(255, 255, 255, 0.34902) 0px 0px 50px, inset 33px 20px 50px rgba(0,0,0,0.5)", 
   		pattern: "assets/texture-earth.jpg",                    
   		size: "100x100",                                     
   		float: true,                                         
   		space: "body",                                       
   		ring: false,                                         
   		ringColor: "#fff",                                   
   		ringAngle: "20deg"                                   
 });
}

function dig_sideways(){
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
	    game.earth.iron++;
		document.getElementById('iron').innerHTML = game.earth.iron;
	}
	if(game.earth.chance<game.earth.copperChance){
	    game.earth.copper++;
		document.getElementById('copper').innerHTML = game.earth.copper;
	}
    if(game.earth.chance<game.earth.fuelChance){
        game.earth.fuel++;
        document.getElementById('fuel').innerHTML = game.earth.fuel;
    }
	document.getElementById('depth').innerHTML = game.earth.depth;
}