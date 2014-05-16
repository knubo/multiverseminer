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
    'background': 'assets/images/earth.png',
    'gatherLootTableId': LootTables.earthAtmosphere.id,
    'miningLootTableId': LootTables.earthMining.id
});

addPlanet(2, 'moon', 'Moon', {
	'gravity': 0.166,
    'baseMultiplier': 1,
    'distance': 10000,
    'background': 'assets/images/planetBackground_greySmall.png',
    'gatherLootTableId': LootTables.moonAtmosphere.id,
    'miningLootTableId': LootTables.moonMinerals.id
});

addPlanet(3, 'mercury', 'Mercury', {
    'background': 'assets/images/mercury.png',
	'gravity': 0.378,
    'baseMultiplier': 1,
    'distance': 12000,
    'gatherLootTableId': LootTables.mercuryAtmosphere.id
});

addPlanet(4, 'venus', 'Venus', {
    'background': 'assets/images/venus.png',
	'gravity': .907,
    'baseMultiplier': 1,
    'distance': 23000,
    'gatherLootTableId': LootTables.venusAtmosphere.id
});

addPlanet(5, 'mars', 'Mars', {
    'background': 'assets/images/mars.png',
	'gravity': 0.713,
    'baseMultiplier': 1,
    'distance': 29000,
    'gatherLootTableId': LootTables.marsAtmosphere.id,
    'miningLootTableId': LootTables.marsMinerals.id
});

addPlanet(6, 'jupiter', 'Jupiter', {
    'background': 'assets/images/jupiter.png',
	'gravity': 2.36,
    'baseMultiplier': 1,
    'distance': 35000,
    'gatherLootTableId': LootTables.jupiterAtmosphere.id
});

addPlanet(7, 'saturn', 'Saturn', {
    'background': 'assets/images/saturn.png',
	'gravity': 0.916,
    'baseMultiplier': 1,
    'distance': 46000,
    'gatherLootTableId': LootTables.saturnAtmosphere.id
});

addPlanet(8, 'uranus', 'Uranus', {
    'background': 'assets/images/uranus.png',
	'gravity': 0.230,
    'baseMultiplier': 1,
    'distance': 52000
});

addPlanet(9, 'neptune', 'Neptune', {
    'background': 'assets/images/neptune.png',
	'gravity': 0.297,
    'baseMultiplier': 1,
    'distance': 58000,
    'background': 'assets/images/neptune.png',
    'gatherLootTableId': LootTables.neptuneAtmosphere.id
});

addPlanet(10, 'pluto', 'Pluto', {
    'background': 'assets/images/pluto.png',
	'gravity': 0.059,
    'baseMultiplier': 1,
    'distance': 72000,
    'gatherLootTableId': LootTables.plutoAtmosphere.id
});