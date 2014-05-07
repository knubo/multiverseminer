Items = {
    'oxygen': {
        'id': 1,
        'name': 'Oxygen',
        'baseValue': 0.1,
    },
    'oxygenCan': {
        'id': 2,
        'name': 'Oxygen can',
        'baseValue': 11,
        'craftResult': 1,
        'craftCost': {},
    },
    'oxygenTank': {
        'id': 3,
        'name': 'Oxygen tank',
        'baseValue': 120,
        'craftResult': 1,
        'craftCost': {},
    },
    'gasCan': {
        'id': 4,
        'name': 'Gas canister',
        'description': 'A canister used to hold gas.',
        'baseValue': 50,
        'craftResult': 1,
        'craftCost': {
            'iron': 5
        }
    },
    'dirt': {
        'id': 5,
        'name': 'Dirt',
        'baseValue': 0,
        'storageLimit': 100,
        'craftResult': 1,
        'craftCost': {},
    },

    'copper': {
        'id': 10,
        'name': 'Copper',
        'baseValue': 0.5,
    },
    'copperBar': {
        'id': 11,
        'name': 'Copper bar',
        'baseValue': 5,
        'craftResult': 1,
        'craftCost': {},
    },

    'iron': {
        'id': 20,
        'name': 'Iron',
        'baseValue': 1,
    },
    'ironBar': {
        'id': 21,
        'name': 'Iron bar',
        'baseValue': 10,
        'craftResult': 1,
        'craftCost': {},
    },

    'gold': {
        'id': 30,
        'name': 'Gold',
        'baseValue': 100,
    },
    'goldBar': {
        'id': 31,
        'name': 'Gold bar',
        'baseValue': 1000,
        'craftResult': 1,
        'craftCost': {},
    },

    'fuel': {
        'id': 400,
        'name': 'Fuel',
        'baseValue': 1000,
    },
    'fuelCan': {
        'id': 401,
        'name': 'Fuel can',
        'baseValue': 1000,
        'craftResult': 1,
        'craftCost': {},
    },
    'fuelTank': {
        'id': 402,
        'name': 'Fuel tank',
        'baseValue': 1000,
        'craftResult': 1,
        'craftCost': {},
    },

    'copperPick': {
        'id': 101,
        'name': 'Copper Pickaxe',
        'baseValue': 15,
        'storageLimit': 1,
        'craftResult': 1,
        'craftCost': {},
    },
    'ironPick': {
        'id': 102,
        'name': 'Iron Pickaxe',
        'baseValue': 25,
        'storageLimit': 1,
        'craftResult': 1,
        'craftCost': {},
    },
    'goldPick': {
        'id': 103,
        'name': 'Gold Pickaxe',
        'baseValue': 2500,
        'storageLimit': 1,
        'craftResult': 1,
        'craftCost': {},
    },

    'jackhammer': {
        'id': 1000,
        'name': 'Jackhammer',
        'baseValue': 10000,
        'storageLimit': 1,
        'craftResult': 1,
        'craftCost': {
            'ironBar': 50,
            'fuelCan': 50,
            'goldBar': 1
        }
    },
    'diamond': {
        'id': 2000,
        'name': 'Diamond',
        'baseValue': 1000
    },
    'topaz': {
        'id': 2001,
        'name': 'Topaz',
        'baseValue': 500
    },
    'strengthPotion': {
        'id': 3000,
        'name': 'Strength Potion',
        'description': 'Dig deeper for 1 minute',
        'storeValue': 10000,
        'baseValue': 5000,
        'duration': 60,
        'use': 1
    },
    'refiningPotion': {
        'id': 3001,
        'name': 'Refining Potion',
        'description': '5% bonus when refining for 1 minute',
        'baseValue': 25000,
        'storeValue': 50000,
        'duration': 60,
        'use': 1
    },
    'oxygenPotion': {
        'id': 3002,
        'name': 'Oxygen Potion',
        'description': 'Refills your oxygen tanks',
        'use': 1,
        'baseValue': 25000,
        'storeValue': 50000
    },
    'healthPotion': {
        'id': 3003,
        'name': 'Health Potion',
        'description': 'Refills your health',
        'use': 1,
        'baseValue': 25000,
        'storeValue': 50000
    }
};

//---------------------------------------------------------------------------
//Set the crafting cost
//---------------------------------------------------------------------------
Items.oxygenCan.craftCost[Items.oxygen.id] = 1;
Items.oxygenCan.craftCost[Items.ironBar.id] = 1;

Items.oxygenTank.craftCost[Items.oxygenCan.id] = 1;
Items.oxygenTank.craftCost[Items.ironBar.id] = 10;

Items.jackhammer.craftCost[Items.ironBar] = 50;
Items.jackhammer.craftCost[Items.fuelCan] = 50;
Items.jackhammer.craftCost[Items.goldBar] = 1;

Items.gasCan.craftCost[Items.ironBar.id] = 5;

Items.fuelCan.craftCost[Items.fuel.id] = 10;
Items.fuelCan.craftCost[Items.ironBar.id] = 1;

Items.fuelTank.craftCost[Items.fuelCan.id] = 1;
Items.fuelTank.craftCost[Items.ironBar.id] = 10;

Items.copperBar.craftCost[Items.copper.id] = 10;
Items.copperPick.craftCost[Items.copperBar.id] = 10;

Items.ironBar.craftCost[Items.iron.id] = 10;
Items.ironPick.craftCost[Items.ironBar.id] = 10;

Items.goldBar.craftCost[Items.gold.id] = 10;
Items.goldPick.craftCost[Items.goldBar.id] = 10;

//---------------------------------------------------------------------------
//Planet data
//---------------------------------------------------------------------------
Planets = {
    'earth': {
        'id': 1,
        'name': 'Earth',
        'gravity': 1,
        'baseMultiplier': 1,
        'distance': 0,
        'resources': {}
    },
    'moon': {
        'id': 2,
        'name': 'Moon',
        'gravity': 0.166,
        'baseMultiplier': 1,
        'distance': 238900,
        'resources': {}
    },
    'mercury': {
        'id': 3,
        'name': 'Mercury',
        'gravity': 0.378,
        'baseMultiplier': 1,
        'distance': 57000000000,
        'resources': {}
    },
    'venus': {
        'id': 4,
        'name': 'Venus',
        'gravity': .907,
        'baseMultiplier': 1,
        'distance': 26000000000,
        'resources': {}
    },
    'mars': {
        'id': 5,
        'name': 'Mars',
        'gravity': 0.713,
        'baseMultiplier': 1,
        'distance': 35000000000,
        'resources': {}
    },
    'jupiter': {
        'id': 6,
        'name': 'Jupiter',
        'gravity': 2.36,
        'baseMultiplier': 1,
        'distance': 370000000000,
        'resources': {}
    },
    'saturn': {
        'id': 7,
        'name': 'Saturn',
        'gravity': 0.916,
        'baseMultiplier': 1,
        'distance': 744000000000,
        'resources': {}
    },
    'uranus': {
        'id': 8,
        'name': 'Uranus',
        'gravity': 0.230,
        'baseMultiplier': 1,
        'distance': 1607000000,
        'resources': {}
    },
    'neptune': {
        'id': 9,
        'name': 'Neptune',
        'gravity': 0.297,
        'baseMultiplier': 1,
        'distance': 2680000000,
        'resources': {}
    },
    'pluto': {
        'id': 10,
        'name': 'Pluto',
        'gravity': 0.059,
        'baseMultiplier': 1,
        'distance': 2670000000000,
        'resources': {}
    }
};

//---------------------------------------------------------------------------
//Populate the resources
//---------------------------------------------------------------------------
Planets.earth.resources[Items.oxygen.id] = {
    'mode': 'gather',
    'minDepth': -20,
    'maxDepth': 0,
    'baseChance': 1
};
Planets.earth.resources[Items.fuel.id] = {
    'mode': 'gather',
    'minDepth': -20,
    'maxDepth': 0,
    'baseChance': 0.1
};
Planets.earth.resources[Items.iron.id] = {
    'mode': 'mine',
    'minDepth': 5,
    'maxDepth': 350,
    'baseChance': 0.5
};
Planets.earth.resources[Items.copper.id] = {
    'mode': 'mine',
    'minDepth': 5,
    'maxDepth': 1500,
    'baseChance': 0.9
};
Planets.earth.resources[Items.gold.id] = {
    'mode': 'mine',
    'minDepth': 500,
    'maxDepth': 5500,
    'baseChance': 0.01
};
Planets.earth.resources[Items.silicon.id] = {
    'mode': 'mine',
    'minDepth': 500,
    'maxDepth': 5500,
    'baseChance': 0.27
};
Planets.earth.resources[Items.aluminum.id] = {
    'mode': 'mine',
    'minDepth': 50,
    'maxDepth': 5500,
    'baseChance': 0.08
};
Planets.earth.resources[Items.calcium.id] = {
    'mode': 'mine',
    'minDepth': 50,
    'maxDepth': 5500,
    'baseChance': 0.03
};
Planets.earth.resources[Items.sodium.id] = {
    'mode': 'mine',
    'minDepth': 50,
    'maxDepth': 5500,
    'baseChance': 0.02
};
Planets.earth.resources[Items.sodium.id] = {
    'mode': 'mine',
    'minDepth': 50,
    'maxDepth': 5500,
    'baseChance': 0.02
};
Planets.earth.resources[Items.potassium.id] = {
    'mode': 'mine',
    'minDepth': 50,
    'maxDepth': 5500,
    'baseChance': 0.02
};
Planets.earth.resources[Items.magnesium.id] = {
    'mode': 'mine',
    'minDepth': 50,
    'maxDepth': 5500,
    'baseChance': 0.02
};
Planets.earth.resources[Items.titanium.id] = {
    'mode': 'mine',
    'minDepth': 50,
    'maxDepth': 5500,
    'baseChance': 0.044
};
Planets.earth.resources[Items.hydrogen.id] = {
    'mode': 'mine',
    'minDepth': 50,
    'maxDepth': 5500,
    'baseChance': 0.014
};
Planets.earth.resources[Items.phosphorus.id] = {
    'mode': 'mine',
    'minDepth': 50,
    'maxDepth': 5500,
    'baseChance': 0.012
};
Planets.earth.resources[Items.manganese.id] = {
    'mode': 'mine',
    'minDepth': 50,
    'maxDepth': 5500,
    'baseChance': 0.010
};
Planets.earth.resources[Items.fluorine.id] = {
    'mode': 'mine',
    'minDepth': 50,
    'maxDepth': 5500,
    'baseChance': 0.008
};
Planets.earth.resources[Items.barium.id] = {
    'mode': 'mine',
    'minDepth': 50,
    'maxDepth': 5500,
    'baseChance': 0.0001
};
Planets.earth.resources[Items.carbon.id] = {
    'mode': 'mine',
    'minDepth': 50,
    'maxDepth': 5500,
    'baseChance': 0.003
};
Planets.earth.resources[Items.sulfur.id] = {
    'mode': 'mine',
    'minDepth': 50,
    'maxDepth': 5500,
    'baseChance': 0.005
};
Planets.earth.resources[Items.nitrogen.id] = {
    'mode': 'mine',
    'minDepth': 50,
    'maxDepth': 5500,
    'baseChance': 0.0005
};
Planets.earth.resources[Items.nickel.id] = {
    'mode': 'mine',
    'minDepth': 50,
    'maxDepth': 5500,
    'baseChance': 0.0005
};
Planets.earth.resources[Items.zinc.id] = {
    'mode': 'mine',
    'minDepth': 50,
    'maxDepth': 5500,
    'baseChance': 0.0005
};

Planets.moon.resources[Items.oxygen.id] = {
    'mode': 'gather',
    'minDepth': 1,
    'maxDepth': 100,
    'baseChance': 0.43
};
Planets.moon.resources[Items.silicon.id] = {
    'mode': 'mine',
    'minDepth': 20,
    'maxDepth': 100,
    'baseChance': 0.20
};
Planets.moon.resources[Items.magnesium.id] = {
    'mode': 'mine',
    'minDepth': 20,
    'maxDepth': 100,
    'baseChance': 0.19
};
Planets.moon.resources[Items.iron.id] = {
    'mode': 'mine',
    'minDepth': 20,
    'maxDepth': 100,
    'baseChance': 0.10
};
Planets.moon.resources[Items.calcium.id] = {
    'mode': 'mine',
    'minDepth': 20,
    'maxDepth': 100,
    'baseChance': 0.03
};
Planets.moon.resources[Items.aluminum.id] = {
    'mode': 'mine',
    'minDepth': 20,
    'maxDepth': 100,
    'baseChance': 0.03
};
Planets.moon.resources[Items.chromium.id] = {
    'mode': 'mine',
    'minDepth': 20,
    'maxDepth': 100,
    'baseChance': 0.042
};
Planets.moon.resources[Items.titanium.id] = {
    'mode': 'mine',
    'minDepth': 20,
    'maxDepth': 100,
    'baseChance': 0.018
};
Planets.moon.resources[Items.manganese.id] = {
    'mode': 'mine',
    'minDepth': 20,
    'maxDepth': 100,
    'baseChance': 0.012
};

Planets.mars.resources[Items.carbondioxide] = {
    'mode': 'gather',
    'minDepth': -50,
    'maxDepth': 0,
    'baseChance': 1
};

Planets.mars.resources[Items.potassium.id] = {
    'mode': 'mine',
    'minDepth': 50,
    'maxDepth': 5500,
    'baseChance': 0.05

};