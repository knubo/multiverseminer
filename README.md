Multiverse Miner

TODO:

There is a 100 dirt limit, once the limit is reached, you can refine the dirt and have a chance to find ores.
As first pass i think removing all the resources with type 'mine' from Planets.earth.resources[] (in assets/data.js) and putting only dirt that will cover the mine part of gathering dirt then next up we want to get mine and dig down split up so game.player.mine() should not mess with the planet depth move everything from onDigDown() to onDigSideways() in main.js and make onDigDown() increase the depth for now i think so what we should end up with is 2 buttons to go up / down, 1 button to mine (giving only dirt)

The automated things that digs up rocks should be called Excavators.
The buildings looking for precious resources should be called Processing Plants.
The buildings that turn ores into bars should be called Smelting Mills.
A proper mining base should have all of these, and on gas planets they would be called Gas Collectors, Gas Separators and Bottling Plants.
