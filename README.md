Multiverse Miner

TODO:

Change dig to drill on earth.

There is a 100 dirt limit, once the limit is reached, you can refine the dirt and have a chance to find ores.
As first pass i think removing all the resources with type 'mine' from Planets.earth.resources[] (in assets/data.js) and putting only dirt that will cover the mine part of gathering dirt then next up we want to get mine and dig down split up so game.player.mine() should not mess with the planet depth move everything from onDigDown() to onDigSideways() in main.js and make onDigDown() increase the depth for now i think so what we should end up with is 2 buttons to go up / down, 1 button to mine (giving only dirt)

