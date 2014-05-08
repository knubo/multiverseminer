Multiverse Miner

Theres advancements in space travel; you're a space miner. You begin on earth, once you're able to build your ship, you fly to the moon to mine. Then earth is attacked, and you can't mine on it freely anymore, you must mine in space, building your ship up; you can go back to earth to exchange rare resources, the ultimate goal is to build a wormhole, and you fly through to user generated universes, where you PvP and conquer/loot you build bases on planets to auto-mine for you, but they can be attacked, so it's a constant battle to maintain your bases. Your ships can be attacked while transporting by NPCs and players also.

TODO:

1) Add all elements on earth (data.js) to the site, index.html and main.js

There is a 100 dirt limit, once the limit is reached, you can refine the dirt and have a chance to find ores.
As first pass i think removing all the resources with type 'mine' from Planets.earth.resources[] (in assets/data.js) and putting only dirt that will cover the mine part of gathering dirt then next up we want to get mine and dig down split up so game.player.mine() should not mess with the planet depth move everything from onDigDown() to onDigSideways() in main.js and make onDigDown() increase the depth for now i think so what we should end up with is 2 buttons to go up / down, 1 button to mine (giving only dirt)

The automated things that digs up rocks should be called Excavators.
The buildings looking for precious resources should be called Processing Plants.
The buildings that turn ores into bars should be called Smelting Mills.
A proper mining base should have all of these, and on gas planets they would be called Gas Collectors, Gas Separators and Bottling Plants.
