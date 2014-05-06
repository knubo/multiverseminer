//To use craft function, just create a onclick button, with (what) replaced by the object name
//If you don't know the name of it's not in this file, you're old enough to add it :)
function craft(what){
    if(what==="ironbar"){
	    if(game.earth.iron>=10){
		    game.earth.iron-=10;
			game.earth.ironbar++;
		}
	}
}