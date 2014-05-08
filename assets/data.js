ItemCategory = {
	'rawMaterial' : 1,
	'gem' : 2,
	'component' : 3,
	'gear' : 4,
	'usable' : 5,
};

ItemType = {
	'mainHand' : 1,
};

Items = {};

// ---------------------------------------------------------------------------
// helper functions
// ---------------------------------------------------------------------------
function addItem(id, internalName, name, baseValue, metadata) {
	var item = {
		'id' : id,
		'name' : name,
		'baseValue' : baseValue,
	};

	if (metadata) {
		var keys = Object.keys(metadata);
		for (var i = 0; i < keys.length; i++) {
			item[keys[i]] = metadata[keys[i]];
		}
	}

	Items[internalName] = item;
}

function setItemCraftingCost(item, id, value) {
	if (!item.craftCost) {
		item.craftCost = {};
	}

	item.craftCost[id] = value;
};

function setItemCategory(category, items) {
	for (var i = 0; i < items.length; i++) {
		items[i].category = category;
	}
}

function setPlanetMiningResource(planet, id, mode, min, max, chance) {
	if(!planet.resources) {
		planet.resources = {};
	}
	
	planet.resources[id] = {
			'mode': mode,
			'minDepth': min,
			'maxDepth': max,
			'baseChance': chance,
	};
}

// ---------------------------------------------------------------------------
// Raw materials
// ---------------------------------------------------------------------------
addItem(1, 'oxygen', 'Oxygen', 0.1);
addItem(2, 'dirt', 'Dirt', 0, {
	'storageLimit' : 100
});
addItem(3, 'copper', 'Copper', 0.5);
addItem(4, 'iron', 'Iron', 1);
addItem(5, 'gold', 'Gold', 100);
addItem(6, 'silicon', 'Silicon', 1000);
addItem(7, 'aluminum', 'Aluminum', 1000);
addItem(8, 'calcium', 'Calcium', 1000);
addItem(9, 'sodium', 'Sodium', 1000);
addItem(10, 'fuel', 'Fuel', 1000);
addItem(11, 'potassium', 'Potassium', 1000);
addItem(12, 'magnesium', 'Magnesium', 1000);
addItem(13, 'titanium', 'Titanium', 1000);
addItem(14, 'hydrogen', 'Hydrogen', 1000);
addItem(15, 'phosphorus', 'Phosphorus', 1000);
addItem(16, 'manganese', 'Manganese', 1000);
addItem(17, 'fluorine', 'Fluorine', 1000);
addItem(18, 'barium', 'Barium', 1000);
addItem(19, 'carbon', 'Carbon', 1000);
addItem(20, 'sulfur', 'Sulfur', 1000);
addItem(21, 'nitrogen', 'Nitrogen', 1000);
addItem(22, 'nickel', 'Nickel', 1000);
addItem(23, 'zinc', 'Zinc', 1000);
addItem(24, 'chromium', 'Chromium', 1000);
addItem(25, 'chloride', 'Chloride', 1000);
addItem(26, 'carbondioxide', 'Carbon dioxide', 1000);

// ---------------------------------------------------------------------------
// Gems
// ---------------------------------------------------------------------------
addItem(2000, 'diamond', 'Diamond', 1000);
addItem(2001, 'topaz', 'Topaz', 500);

// ---------------------------------------------------------------------------
// Components and parts
// ---------------------------------------------------------------------------
addItem(3000, 'copperBar', 'Copper bar', 5);
addItem(3001, 'ironBar', 'Iron bar', 10);
addItem(3002, 'goldBar', 'Gold bar', 1000);
addItem(3003, 'oxygenCan', 'Oxygen can', 11);
addItem(3004, 'oxygenTank', 'Oxygen tank', 120);
addItem(3005, 'gasCan', 'Gas canister', 50, {
	'description' : 'A canister used to hold gas.'
});
addItem(3006, 'fuelCan', 'Fuel can', 1000);
addItem(3007, 'fuelTank', 'Fuel tank', 1000);

// ---------------------------------------------------------------------------
// Gear / Equipment
// ---------------------------------------------------------------------------
addItem(4000, 'copperPick', 'Copper Pickaxe', 15, {
	'storageLimit' : 1
});
addItem(4001, 'ironPick', 'Iron Pickaxe', 25, {
	'storageLimit' : 1
});
addItem(4002, 'goldPick', 'Gold Pickaxe', 2500, {
	'storageLimit' : 1
});
addItem(4003, 'jackhammer', 'Jackhammer', 10000, {
	'storageLimit' : 1
});

// ---------------------------------------------------------------------------
// Usable
// ---------------------------------------------------------------------------
addItem(5000, 'strengthPotion', 'Strength Potion', 5000, {
	'description' : 'Dig deeper for 1 minute',
	'storeValue' : 10000,
	'duration' : 60,
	'use' : 1
});

addItem(5001, 'refiningPotion', 'Refining Potion', 25000, {
	'description' : '5% bonus when refining for 1 minute',
	'storeValue' : 50000,
	'duration' : 60,
	'use' : 1
});

addItem(5002, 'oxygenPotion', 'Oxygen Potion', 25000, {
	'description' : 'Refills your oxygen tanks',
	'storeValue' : 50000,
	'use' : 1
});

addItem(5003, 'healthPotion', 'Health Potion', 25000, {
	'description' : 'Refills your health',
	'storeValue' : 50000,
	'use' : 1
});

addItem(5004, 'resurrectionPotion', 'Resurrection Potion', 100000, {
    'description': 'Resurrect your character',
    'storeValue': 500000,
    'use' : 1,
});

// ---------------------------------------------------------------------------
// Set the item categories
// ---------------------------------------------------------------------------
setItemCategory(ItemCategory.rawMaterial, [ Items.oxygen, Items.dirt,
		Items.copper, Items.iron, Items.gold, Items.silicon, Items.aluminum,
		Items.calcium, Items.sodium, Items.fuel, Items.potassium,
		Items.magnesium, Items.titanium, Items.hydrogen, Items.phosphorus,
		Items.manganese, Items.fluorine, Items.barium, Items.carbon,
		Items.sulfur, Items.nitrogen, Items.nickel, Items.zinc, Items.chromium,
		Items.chloride, Items.carbondioxide ]);

setItemCategory(ItemCategory.gem, [ Items.diamond, Items.topaz ]);

setItemCategory(ItemCategory.component, [ Items.copperBar, Items.ironBar,
		Items.goldBar, Items.goldBar, Items.oxygenCan, Items.oxygenTank,
		Items.gasCan, Items.fuelCan, Items.fuelTank ]);

setItemCategory(ItemCategory.gear, [ Items.copperPick, Items.ironPick,
		Items.goldPick, Items.jackhammer ]);

setItemCategory(ItemCategory.usable, [ Items.strengthPotion,
		Items.refiningPotion, Items.oxygenPotion, Items.healthPotion, Items.resurrectionPotion ]);

// ---------------------------------------------------------------------------
// Set the crafting cost
// ---------------------------------------------------------------------------
setItemCraftingCost(Items.oxygenCan, Items.oxygen.id, 1);
setItemCraftingCost(Items.oxygenCan, Items.ironBar.id, 1);

setItemCraftingCost(Items.oxygenTank, Items.oxygenCan.id, 1);
setItemCraftingCost(Items.oxygenTank, Items.ironBar.id, 10);

setItemCraftingCost(Items.jackhammer, Items.ironBar.id, 50);
setItemCraftingCost(Items.jackhammer, Items.fuelCan.id, 50);
setItemCraftingCost(Items.jackhammer, Items.goldBar.id, 1);

setItemCraftingCost(Items.gasCan, Items.ironBar.id, 5);

setItemCraftingCost(Items.fuelCan, Items.fuel.id, 10);
setItemCraftingCost(Items.fuelCan, Items.ironBar.id, 1);

setItemCraftingCost(Items.fuelTank, Items.fuelCan.id, 1);
setItemCraftingCost(Items.fuelTank, Items.ironBar.id, 10);

setItemCraftingCost(Items.copperBar, Items.copper.id, 10);
setItemCraftingCost(Items.copperPick, Items.copperBar.id, 10);

setItemCraftingCost(Items.ironBar, Items.iron.id, 10);
setItemCraftingCost(Items.ironPick, Items.ironBar.id, 10);

setItemCraftingCost(Items.goldBar, Items.gold.id, 10);
setItemCraftingCost(Items.goldPick, Items.goldBar.id, 10);

// ---------------------------------------------------------------------------
// Planet data
// ---------------------------------------------------------------------------
Planets = {
	'earth' : {
		'id' : 1,
		'name' : 'Earth',
		'gravity' : 1,
		'baseMultiplier' : 1,
		'distance' : 0,
		'resources' : {}
	},
	'moon' : {
		'id' : 2,
		'name' : 'Moon',
		'gravity' : 0.166,
		'baseMultiplier' : 1,
		'distance' : 238900,
		'resources' : {}
	},
	'mercury' : {
		'id' : 3,
		'name' : 'Mercury',
		'gravity' : 0.378,
		'baseMultiplier' : 1,
		'distance' : 57000000000,
		'resources' : {}
	},
	'venus' : {
		'id' : 4,
		'name' : 'Venus',
		'gravity' : .907,
		'baseMultiplier' : 1,
		'distance' : 26000000000,
		'resources' : {}
	},
	'mars' : {
		'id' : 5,
		'name' : 'Mars',
		'gravity' : 0.713,
		'baseMultiplier' : 1,
		'distance' : 35000000000,
		'resources' : {}
	},
	'jupiter' : {
		'id' : 6,
		'name' : 'Jupiter',
		'gravity' : 2.36,
		'baseMultiplier' : 1,
		'distance' : 370000000000,
		'resources' : {}
	},
	'saturn' : {
		'id' : 7,
		'name' : 'Saturn',
		'gravity' : 0.916,
		'baseMultiplier' : 1,
		'distance' : 744000000000,
		'resources' : {}
	},
	'uranus' : {
		'id' : 8,
		'name' : 'Uranus',
		'gravity' : 0.230,
		'baseMultiplier' : 1,
		'distance' : 1607000000,
		'resources' : {}
	},
	'neptune' : {
		'id' : 9,
		'name' : 'Neptune',
		'gravity' : 0.297,
		'baseMultiplier' : 1,
		'distance' : 2680000000,
		'resources' : {}
	},
	'pluto' : {
		'id' : 10,
		'name' : 'Pluto',
		'gravity' : 0.059,
		'baseMultiplier' : 1,
		'distance' : 2670000000000,
		'resources' : {}
	}
};

// ---------------------------------------------------------------------------
// Populate the resources
// ---------------------------------------------------------------------------

// Earth
setPlanetMiningResource(Planets.earth, Items.oxygen.id, 'gather', -20, 0, 1);
setPlanetMiningResource(Planets.earth, Items.fuel.id, 'gather', -20, 0, 0.1);

setPlanetMiningResource(Planets.earth, Items.iron.id, 'mine', 5, 350, 0.5);
setPlanetMiningResource(Planets.earth, Items.copper.id, 'mine', 5, 1500, 0.9);
setPlanetMiningResource(Planets.earth, Items.gold.id, 'mine', 500, 5500, 0.01);
setPlanetMiningResource(Planets.earth, Items.silicon.id, 'mine', 500, 5500, 0.27);
setPlanetMiningResource(Planets.earth, Items.aluminum.id, 'mine', 50, 5500, 0.08);
setPlanetMiningResource(Planets.earth, Items.calcium.id, 'mine', 50, 5500, 0.03);
setPlanetMiningResource(Planets.earth, Items.sodium.id, 'mine', 50, 5500, 0.02);
setPlanetMiningResource(Planets.earth, Items.potassium.id, 'mine', 50, 5500, 0.02);
setPlanetMiningResource(Planets.earth, Items.magnesium.id, 'mine', 50, 5500, 0.02);
setPlanetMiningResource(Planets.earth, Items.titanium.id, 'mine', 50, 5500, 0.044);
setPlanetMiningResource(Planets.earth, Items.hydrogen.id, 'mine', 50, 5500, 0.014);
setPlanetMiningResource(Planets.earth, Items.phosphorus.id, 'mine', 50, 5500, 0.012);
setPlanetMiningResource(Planets.earth, Items.manganese.id, 'mine', 50, 5500, 0.01);
setPlanetMiningResource(Planets.earth, Items.fluorine.id, 'mine', 50, 5500, 0.008);
setPlanetMiningResource(Planets.earth, Items.barium.id, 'mine', 50, 5500, 0.0001);
setPlanetMiningResource(Planets.earth, Items.carbon.id, 'mine', 50, 5500, 0.003);
setPlanetMiningResource(Planets.earth, Items.sulfur.id, 'mine', 50, 5500, 0.005);
setPlanetMiningResource(Planets.earth, Items.nitrogen.id, 'mine', 50, 5500, 0.0005);
setPlanetMiningResource(Planets.earth, Items.nickel.id, 'mine', 50, 5500, 0.0005);
setPlanetMiningResource(Planets.earth, Items.zinc.id, 'mine', 50, 5500, 0.0005);

// Moon
setPlanetMiningResource(Planets.moon, Items.oxygen.id, 'gather', 1, 100, 0.43);

setPlanetMiningResource(Planets.moon, Items.silicon.id, 'mine', 20, 100, 0.2);
setPlanetMiningResource(Planets.moon, Items.magnesium.id, 'mine', 20, 100, 0.19);
setPlanetMiningResource(Planets.moon, Items.iron.id, 'mine', 20, 100, 0.1);
setPlanetMiningResource(Planets.moon, Items.calcium.id, 'mine', 20, 100, 0.03);
setPlanetMiningResource(Planets.moon, Items.aluminum.id, 'mine', 20, 100, 0.03);
setPlanetMiningResource(Planets.moon, Items.chromium.id, 'mine', 20, 100, 0.042);
setPlanetMiningResource(Planets.moon, Items.titanium.id, 'mine', 20, 100, 0.018);
setPlanetMiningResource(Planets.moon, Items.manganese.id, 'mine', 20, 100, 0.012);

// Mars
setPlanetMiningResource(Planets.mars, Items.carbondioxide.id, 'gather', -50, Number.MAX_VALUE, 1);

setPlanetMiningResource(Planets.mars, Items.potassium.id, 'mine', 1, Number.MAX_VALUE, 0.05);
setPlanetMiningResource(Planets.mars, Items.magnesium.id, 'mine', 1, Number.MAX_VALUE, 0.1);
setPlanetMiningResource(Planets.mars, Items.sodium.id, 'mine', 1, Number.MAX_VALUE, 0.09);
setPlanetMiningResource(Planets.mars, Items.chloride.id, 'mine', 1, Number.MAX_VALUE, 0.09);
