Planets = {};

// ---------------------------------------------------------------------------
// helper functions
// ---------------------------------------------------------------------------
function addPlanet(id, internalName, name, metadata) {
	var planet = {
	        'id': id,
	        'name': name,
	        'gatherLootTableId': undefined,
	        'miningLootTableId': undefined
	    };
	
	if (metadata) {
        var keys = Object.keys(metadata);
        for (var i = 0; i < keys.length; i++) {
        	planet[keys[i]] = metadata[keys[i]];
        }
    }
	
	Planets[internalName] = planet;
    return planet;
};

// ---------------------------------------------------------------------------
// Planet data
// ---------------------------------------------------------------------------
addPlanet(1, 'earth', 'Earth', {
	'gravity': 1,
    'baseMultiplier': 1,
    'distance': 0,
    'background': 'assets/images/planetBackground_blueLarge.png',
    'gatherLootTableId': LootTables.earthAtmosphere.id,
    'miningLootTableId': LootTables.earthMining.id
});

addPlanet(2, 'moon', 'Moon', {
	'gravity': 0.166,
    'baseMultiplier': 1,
    'distance': 238900,
    'background': 'assets/images/planetBackground_greySmall.png',
    'gatherLootTableId': LootTables.moonAtmosphere.id,
    'miningLootTableId': LootTables.moonMinerals.id
});

addPlanet(3, 'mercury', 'Mercury', {
	'gravity': 0.378,
    'baseMultiplier': 1,
    'distance': 57000000000,
    'gatherLootTableId': LootTables.mercuryAtmosphere.id
});

addPlanet(4, 'venus', 'Venus', {
	'gravity': .907,
    'baseMultiplier': 1,
    'distance': 26000000000,
    'gatherLootTableId': LootTables.venusAtmosphere.id
});

addPlanet(5, 'mars', 'Mars', {
	'gravity': 0.713,
    'baseMultiplier': 1,
    'distance': 35000000000,
    'gatherLootTableId': LootTables.marsAtmosphere.id,
    'miningLootTableId': LootTables.marsMinerals.id
});

addPlanet(6, 'jupiter', 'Jupiter', {
	'gravity': 2.36,
    'baseMultiplier': 1,
    'distance': 370000000000,
    'gatherLootTableId': LootTables.jupiterAtmosphere.id
});

addPlanet(7, 'saturn', 'Saturn', {
	'gravity': 0.916,
    'baseMultiplier': 1,
    'distance': 744000000000,
    'gatherLootTableId': LootTables.saturnAtmosphere.id
});

addPlanet(8, 'uranus', 'Uranus', {
	'gravity': 0.230,
    'baseMultiplier': 1,
    'distance': 1607000000
});

addPlanet(9, 'neptune', 'Neptune', {
	'gravity': 0.297,
    'baseMultiplier': 1,
    'distance': 2680000000,
    'gatherLootTableId': LootTables.neptuneAtmosphere.id
});

addPlanet(10, 'pluto', 'Pluto', {
	'gravity': 0.059,
    'baseMultiplier': 1,
    'distance': 2670000000000,
    'gatherLootTableId': LootTables.plutoAtmosphere.id
});