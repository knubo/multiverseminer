ItemCategory = {
    'unset': '-unset-',
    'rawMaterial': 'Raw materials',
    'gem': 'Gems',
    'component': 'Components',
    'gearMainHand': 'Gear - Main Hand',
    'gearSecondHand': 'Gear - Second Hand',
    'gearHead': 'Gear - Head',
    'gearChest': 'Gear - Chest',
    'gearLegs': 'Gear - Legs',
    'gearFeet': 'Gear - Feet',
    'gearBuilding': 'Buildings',
    'machines': 'Machines',
    'usable': 'Usable',
};

GearType = {
    'head': 'Head',
    'chest': 'Chest',
    'mainHand': 'Main Hand',
    'secondHand': 'Second Hand',
    'legs': 'Legs',
    'feet': 'Feet',
};

Items = {};

// ---------------------------------------------------------------------------
// helper functions
// ---------------------------------------------------------------------------

function addItem(id, internalName, name, baseValue, metadata) {
    var item = {
        'id': id,
        'name': name,
        'baseValue': baseValue,
        'setCraftingCost': _setItemCraftingCost,
    };

    if (metadata) {
        var keys = Object.keys(metadata);
        for (var i = 0; i < keys.length; i++) {
            item[keys[i]] = metadata[keys[i]];
        }
    }

    Items[internalName] = item;
    return item;
}

function _setItemCraftingCost(values) {
    if (!this.craftCost) {
        this.craftCost = {};
    }

    if (values.length <= 0) {
        Utils.logError("setItemCraftingCost called with zero data");
        return;
    }

    for (var i = 0; i < values.length; i++) {
        var value = values[i];
        this.craftCost[value[0]] = value[1];
    }

    return this;
};

function setGearType(item, value) {
    item.gearType = value;
};

function setItemProperties() {
    for (var key in Items) {
        var item = Items[key];
        if (item.id > 0 && item.id < 1000) {
            item.category = ItemCategory.rawMaterial;
        } else if (item.id >= 2000 && item.id < 3000) {
            item.category = ItemCategory.gem;
        } else if (item.id >= 3000 && item.id < 4000) {
            item.category = ItemCategory.component;
        } else if (item.id >= 4000 && item.id < 5000) {
            item.category = ItemCategory.gearBuilding;
        } else if (item.id >= 5000 && item.id < 6000) {
            item.category = ItemCategory.usable;
        } else if (item.id >= 40000 && item.id < 41000) {
            item.category = ItemCategory.gearMainHand;
            item.gearType = GearType.mainHand;
        } else if (item.id >= 41000 && item.id < 42000) {
            item.category = ItemCategory.gearSecondHand;
            item.gearType = GearType.secondHand;
        } else if (item.id >= 42000 && item.id < 43000) {
            item.category = ItemCategory.gearHead;
            item.gearType = GearType.head;
        } else if (item.id >= 43000 && item.id < 44000) {
            item.category = ItemCategory.gearChest;
            item.gearType = GearType.chest;
        } else if (item.id >= 44000 && item.id < 45000) {
            item.category = ItemCategory.gearLegs;
            item.gearType = GearType.legs;
        } else if (item.id >= 45000 && item.id < 46000) {
            item.category = ItemCategory.gearFeet;
            item.gearType = GearType.feet;
        } else if (item.id >= 46000 && item.id < 47000) {
            item.category = ItemCategory.machines;
        } else {
            item.category = ItemCategory.unset;
        }
    }
}

function setPlanetMiningResource(planet, id, mode, min, max, chance) {
    if (!planet.resources) {
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
    'storageLimit': 100
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
addItem(26, 'carbonDioxide', 'Carbon dioxide', 1000);
addItem(27, 'sulfurDioxide', 'Sulfur Dioxide', 1000);
addItem(28, 'argon', 'Argon', 1000);
addItem(29, 'carbonMonoxide', 'Carbon Monoxide', 1000);
addItem(30, 'helium', 'Helium', 1000);
addItem(31, 'neon', 'Neon', 1000);
addItem(32, 'methane', 'Methane', 10000);
addItem(33, 'argon', 'Argon', 10000);
addItem(34, 'xenon', 'Xenon', 100000);
addItem(35, 'krypton', 'Krypton', 100000);

// ---------------------------------------------------------------------------
// Gems
// ---------------------------------------------------------------------------
addItem(2000, 'diamond', 'Diamond', 1000);
addItem(2001, 'topaz', 'Topaz', 500);

// ---------------------------------------------------------------------------
// Components and parts
// ---------------------------------------------------------------------------
addItem(3000, 'copperBar', 'Copper bar', 5, {
    'icon': '/assets/images/copperBar.png'
}).setCraftingCost(
    [
        [Items.copper.id, 10]
    ]);
addItem(3001, 'ironBar', 'Iron bar', 10, {
    'icon': '/assets/images/copperBar.png'
}).setCraftingCost(
    [
        [Items.iron.id, 10]
    ]);
addItem(3002, 'goldBar', 'Gold bar', 1000).setCraftingCost([
    [Items.gold.id, 10]
]);
addItem(3003, 'oxygenCan', 'Oxygen can', 11).setCraftingCost(
    [
        [Items.oxygen.id, 1],
        [Items.ironBar.id, 1]
    ]);
addItem(3004, 'oxygenTank', 'Oxygen tank', 120).setCraftingCost(
    [
        [Items.oxygenCan.id, 1],
        [Items.ironBar.id, 10]
    ]);
addItem(3005, 'gasCan', 'Gas canister', 50, {
    'description': 'A canister used to hold gas.'
}).setCraftingCost([
    [Items.ironBar.id, 5]
]);
addItem(3006, 'fuelCan', 'Fuel can', 1000).setCraftingCost(
    [
        [Items.fuel.id, 10],
        [Items.ironBar.id, 1]
    ]);
addItem(3007, 'fuelTank', 'Fuel tank', 1000).setCraftingCost(
    [
        [Items.fuelCan.id, 1],
        [Items.ironBar.id, 10]
    ]);;

// ---------------------------------------------------------------------------
// Usable
// ---------------------------------------------------------------------------
addItem(5000, 'strengthPotion', 'Strength Potion', 5000, {
    'description': 'Dig deeper for 1 minute',
    'storeValue': 10000,
    'duration': 60,
    'use': 1
});

addItem(5001, 'refiningPotion', 'Refining Potion', 25000, {
    'description': '5% bonus when refining for 1 minute',
    'storeValue': 50000,
    'duration': 60,
    'use': 1
});

addItem(5002, 'oxygenPotion', 'Oxygen Potion', 25000, {
    'description': 'Refills your oxygen tanks',
    'storeValue': 50000,
    'use': 1
});

addItem(5003, 'healthPotion', 'Health Potion', 25000, {
    'description': 'Refills your health',
    'storeValue': 50000,
    'use': 1
});

addItem(5004, 'resurrectionPotion', 'Resurrection Potion', 100000, {
    'description': 'Resurrect your character',
    'storeValue': 500000,
    'use': 1,
});

// ---------------------------------------------------------------------------
// Buildings
// ---------------------------------------------------------------------------
addItem(4000, 'miningRig', 'Mining Rig', 50000, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.dirt.id, 100]
]);

// ---------------------------------------------------------------------------
// Equipment - MainHand
// ---------------------------------------------------------------------------
addItem(40000, 'woodenPick', 'Wooden Pickaxe', 0, {
    'storageLimit': 1
});

addItem(40001, 'copperPick', 'Copper Pickaxe', 15, {
    'storageLimit': 1,
    'icon': 'assets/images/pick.png'
}).setCraftingCost([
    [Items.copperBar.id, 10]
]);

addItem(40002, 'ironPick', 'Iron Pickaxe', 25, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.ironBar.id, 10]
]);

addItem(40003, 'goldPick', 'Gold Pickaxe', 2500, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.goldBar.id, 10]
]);

addItem(40004, 'jackhammer', 'Jackhammer', 10000, {
    'storageLimit': 1
}).setCraftingCost(
    [
        [Items.ironBar.id, 50],
        [Items.fuelCan.id, 50],
        [Items.goldBar.id, 10]
    ]);

// ---------------------------------------------------------------------------
// Equipment - Head
// ---------------------------------------------------------------------------
addItem(42000, 'copperHelmet', 'Copper Helmet', 5, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.copperBar.id, 4]
]);

// ---------------------------------------------------------------------------
// Equipment - Chest
// ---------------------------------------------------------------------------
addItem(43000, 'copperArmor', 'Copper Armor', 5, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.copperBar.id, 8]
]);

// ---------------------------------------------------------------------------
// Equipment - Legs
// ---------------------------------------------------------------------------
addItem(44000, 'copperArmorLegs', 'Copper Legs', 5, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.copperBar.id, 6]
]);

// ---------------------------------------------------------------------------
// Equipment - Legs
// ---------------------------------------------------------------------------
addItem(45000, 'copperArmorFeet', 'Copper Boots', 5, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.copperBar.id, 3]
]);

// ---------------------------------------------------------------------------
// Machines
// ---------------------------------------------------------------------------
addItem(46000, 'smallMotor', 'Small Motor', 3000, {
    'icon': '/assets/images/smallMotor.jpg'
}).setCraftingCost([
    [Items.ironBar.id, 5]
]);
addItem(46001, 'atmosphereConcentrator', 'Atmosphere Concentrator', 10000, {
    'planetLimit': 1
}).setCraftingCost([
    [Items.ironBar.id, 5],
    [Items.smallMotor.id, 1]
]);

// ---------------------------------------------------------------------------
// Set the item categories and types
// ---------------------------------------------------------------------------
setItemProperties();

// ---------------------------------------------------------------------------
// Planet data
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Populate the resources
// ---------------------------------------------------------------------------

// Earth
setPlanetMiningResource(Planets.earth, Items.oxygen.id, 'gather', -20, 0, 1);

setPlanetMiningResource(Planets.earth, Items.dirt.id, 'mine', 0,
    Number.MAX_VALUE, 1);
setPlanetMiningResource(Planets.earth, Items.iron.id, 'mine', 5, 350, 0.5);
setPlanetMiningResource(Planets.earth, Items.copper.id, 'mine', 5, 1500, 0.9);
setPlanetMiningResource(Planets.earth, Items.gold.id, 'mine', 500, 5500, 0.01);
setPlanetMiningResource(Planets.earth, Items.silicon.id, 'mine', 500, 5500,
    0.27);
setPlanetMiningResource(Planets.earth, Items.aluminum.id, 'mine', 50, 5500,
    0.08);
setPlanetMiningResource(Planets.earth, Items.calcium.id, 'mine', 50, 5500, 0.03);
setPlanetMiningResource(Planets.earth, Items.sodium.id, 'mine', 50, 5500, 0.02);
setPlanetMiningResource(Planets.earth, Items.potassium.id, 'mine', 50, 5500,
    0.02);
setPlanetMiningResource(Planets.earth, Items.magnesium.id, 'mine', 50, 5500,
    0.02);
setPlanetMiningResource(Planets.earth, Items.titanium.id, 'mine', 50, 5500,
    0.044);
setPlanetMiningResource(Planets.earth, Items.hydrogen.id, 'mine', 50, 5500,
    0.014);
setPlanetMiningResource(Planets.earth, Items.phosphorus.id, 'mine', 50, 5500,
    0.012);
setPlanetMiningResource(Planets.earth, Items.manganese.id, 'mine', 50, 5500,
    0.01);
setPlanetMiningResource(Planets.earth, Items.fluorine.id, 'mine', 50, 5500,
    0.008);
setPlanetMiningResource(Planets.earth, Items.barium.id, 'mine', 50, 5500,
    0.0001);
setPlanetMiningResource(Planets.earth, Items.carbon.id, 'mine', 50, 5500, 0.003);
setPlanetMiningResource(Planets.earth, Items.sulfur.id, 'mine', 50, 5500, 0.005);
setPlanetMiningResource(Planets.earth, Items.nitrogen.id, 'mine', 50, 5500,
    0.0005);
setPlanetMiningResource(Planets.earth, Items.nickel.id, 'mine', 50, 5500,
    0.0005);
setPlanetMiningResource(Planets.earth, Items.zinc.id, 'mine', 50, 5500, 0.0005);
setPlanetMiningResource(Planets.earth, Items.fuel.id, 'mine', 100, 100000, 0.1);

// Moon
setPlanetMiningResource(Planets.moon, Items.oxygen.id, 'gather', 1, 100, 0.43);

setPlanetMiningResource(Planets.moon, Items.silicon.id, 'mine', 20, 100, 0.2);
setPlanetMiningResource(Planets.moon, Items.magnesium.id, 'mine', 20, 100, 0.19);
setPlanetMiningResource(Planets.moon, Items.iron.id, 'mine', 20, 100, 0.1);
setPlanetMiningResource(Planets.moon, Items.calcium.id, 'mine', 20, 100, 0.03);
setPlanetMiningResource(Planets.moon, Items.aluminum.id, 'mine', 20, 100, 0.03);
setPlanetMiningResource(Planets.moon, Items.chromium.id, 'mine', 20, 100, 0.042);
setPlanetMiningResource(Planets.moon, Items.titanium.id, 'mine', 20, 100, 0.018);
setPlanetMiningResource(Planets.moon, Items.manganese.id, 'mine', 20, 100,
    0.012);

// Mars
setPlanetMiningResource(Planets.mars, Items.carbonDioxide.id, 'gather', -50,
    Number.MAX_VALUE, 1);

setPlanetMiningResource(Planets.mars, Items.potassium.id, 'mine', 1,
    Number.MAX_VALUE, 0.05);
setPlanetMiningResource(Planets.mars, Items.magnesium.id, 'mine', 1,
    Number.MAX_VALUE, 0.1);
setPlanetMiningResource(Planets.mars, Items.sodium.id, 'mine', 1,
    Number.MAX_VALUE, 0.09);
setPlanetMiningResource(Planets.mars, Items.chloride.id, 'mine', 1,
    Number.MAX_VALUE, 0.09);

// Venus
setPlanetMiningResource(Planets.venus, Items.carbonDioxide.id, 'gather', -50,
    Number.MAX_VALUE, 1);
setPlanetMiningResource(Planets.venus, Items.nitrogen.id, 'gather', 50, 5500,
    0.03);
setPlanetMiningResource(Planets.venus, Items.sulfurDioxide.id, 'gather', -50,
    Number.MAX_VALUE, 0.015);
setPlanetMiningResource(Planets.venus, Items.argon.id, 'gather', -50,
    Number.MAX_VALUE, 0.007);
setPlanetMiningResource(Planets.venus, Items.carbonMonoxide.id, 'gather', -50,
    Number.MAX_VALUE, 0.0017);
setPlanetMiningResource(Planets.venus, Items.neon.id, 'gather', -50,
    Number.MAX_VALUE, 0.0007);

setPlanetMiningResource(Planets.venus, Items.iron.id, 'mine', 4, 350, 1);

// Mercury
setPlanetMiningResource(Planets.mercury, Items.oxygen.id, 'gather', -20, 0, .94);
setPlanetMiningResource(Planets.mercury, Items.oxygen.id, 'gather', -20, 0, .01);
setPlanetMiningResource(Planets.mercury, Items.argon.id, 'gather', -20, 0, .01);
setPlanetMiningResource(Planets.mercury, Items.nitrogen.id, 'gather', -20, 0,
    .01);
setPlanetMiningResource(Planets.mercury, Items.carbonDioxide.id, 'gather', -20,
    0, .01);
setPlanetMiningResource(Planets.mercury, Items.xenon.id, 'gather', -20, 0, .01);
setPlanetMiningResource(Planets.mercury, Items.krypton.id, 'gather', -20, 0,
    .01);
setPlanetMiningResource(Planets.mercury, Items.neon.id, 'gather', -20, 0, .01);

setPlanetMiningResource(Planets.mercury, Items.oxygen.id, 'dig', 1, 10000, 0.29);
setPlanetMiningResource(Planets.mercury, Items.hydrogen.id, 'gather', -50,
    Number.MAX_VALUE, .22);
setPlanetMiningResource(Planets.mercury, Items.helium.id, 'gather', -50,
    Number.MAX_VALUE, .06);
setPlanetMiningResource(Planets.mercury, Items.potassium.id, 'gather', -50,
    Number.MAX_VALUE, .05);

// Jupiter
setPlanetMiningResource(Planets.jupiter, Items.hydrogen.id, 'gather', -50,
    Number.MAX_VALUE, .90);
setPlanetMiningResource(Planets.jupiter, Items.helium.id, 'gather', -50,
    Number.MAX_VALUE, .1);
setPlanetMiningResource(Planets.jupiter, Items.neon.id, 'gather', -50,
    Number.MAX_VALUE, 0.0007);
setPlanetMiningResource(Planets.jupiter, Items.methane.id, 'gather', -50,
    Number.MAX_VALUE, 0.0001);

// Saturn
setPlanetMiningResource(Planets.saturn, Items.hydrogen.id, 'gather', -50,
    Number.MAX_VALUE, .96);
setPlanetMiningResource(Planets.saturn, Items.helium.id, 'gather', -50,
    Number.MAX_VALUE, .03);
setPlanetMiningResource(Planets.saturn, Items.methane.id, 'gather', -50,
    Number.MAX_VALUE, 0.01);

// Neptune
setPlanetMiningResource(Planets.neptune, Items.hydrogen.id, 'gather', -50,
    Number.MAX_VALUE, .80);
setPlanetMiningResource(Planets.neptune, Items.helium.id, 'gather', -50,
    Number.MAX_VALUE, .19);
setPlanetMiningResource(Planets.neptune, Items.methane.id, 'gather', -50,
    Number.MAX_VALUE, 0.01);

// Pluto
setPlanetMiningResource(Planets.pluto, Items.nitrogen.id, 'gather', 50, 5500,
    0.90);
setPlanetMiningResource(Planets.pluto, Items.methane.id, 'gather', -50,
    Number.MAX_VALUE, 0.05);
setPlanetMiningResource(Planets.pluto, Items.carbonMonoxide.id, 'gather', -50,
    Number.MAX_VALUE, 0.05);
