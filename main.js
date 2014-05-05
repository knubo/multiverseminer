var game = {
    earth: { 
	    depth: 0
	},
	jupiter: {
	    depth: 0
	}
};

function dig_earth(number){
    game.earth.depth+=number;
	document.getElementById('depth').innerHTML = game.earth.depth;
}