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
// variables
// ---------------------------------------------------------------------------
var imageRoot = "assets/images/";

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
addItem(3, 'copper', 'Copper', 0.5, {
    'icon': imageRoot + 'copper.png'
});
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
addItem(36, 'silver', 'Silver', 50);
addItem(37, 'ceasium', 'Ceasium', 100000);

// ---------------------------------------------------------------------------
// Gems
// ---------------------------------------------------------------------------
// TODO: Gems need descriptions. Figure out the stat boosts.
addItem(2000, "agate", "Agate", 10000);
addItem(2001, "alexandrite", "Alexandrite", 10000);
addItem(2002, "almandineGarnet", "Almandine Garnet", 10000);
addItem(2003, "amazonite", "Amazonite", 10000);
addItem(2004, "amber", "Amber", 10000);
addItem(2005, "amethyst", "Amethyst", 10000);
addItem(2006, "ametrine", "Ametrine", 10000);
addItem(2007, "ammolite", "Ammolite", 10000);
addItem(2008, "andalusite", "Andalusite", 10000);
addItem(2009, "andesineLabradorite", "Andesine Labradorite", 10000);
addItem(2010, "andraditeGarnet", "Andradite Garnet", 10000);
addItem(2011, "apatite", "Apatite", 10000);
addItem(2012, "aquamarine", "Aquamarine", 10000);
addItem(2013, "aventurine", "Aventurine", 10000);
addItem(2014, "azurite", "Azurite", 10000);
addItem(2015, "blackOpal", "Black Opal", 10000);
addItem(2016, "bloodstone", "Bloodstone", 10000);
addItem(2017, "boulderOpal", "Boulder Opal", 10000);
addItem(2018, "carnelian", "Carnelian", 10000);
addItem(2019, "chalcedony", "Chalcedony", 10000);
addItem(2020, "chariote", "Charoite", 10000);
addItem(2021, "chysoberyl", "Chrysoberyl", 10000);
addItem(2022, "chrysocolla", "Chrysocolla", 10000);
addItem(2023, "chrysoprase", "Chrysoprase", 10000);
addItem(2024, "citrine", "Citrine", 10000);
addItem(2025, "corla", "Coral", 10000);
addItem(2026, "danburite", "Danburite", 10000);
addItem(2027, "diamond", "Diamond", 10000);
addItem(2028, "diaspore", "Diaspore", 10000);
addItem(2029, "emerald", "Emerald", 10000);
addItem(2030, "flourite", "Fluorite", 10000);
addItem(2031, "fossilCoral", "Fossil Coral", 10000);
addItem(2032, "garnetGems", "Garnet Gems", 10000);
addItem(2033, "goldenBeryl", "Golden Beryl", 10000);
addItem(2034, "goshenite", "Goshenite", 10000);
addItem(2035, "hawksEye", "Hawks Eye", 10000);
addItem(2036, "heliodor", "Heliodor", 10000);
addItem(2037, "heliotrope", "Heliotrope", 10000);
addItem(2038, "hematite", "Hematite", 10000);
addItem(2039, "hemimorphite", "Hemimorphite", 10000);
addItem(2040, "howlite", "Howlite", 10000);
addItem(2041, "idocrase", "Idocrase", 10000);
addItem(2042, "iolite", "Iolite", 10000);
addItem(2043, "jade", "Jade", 10000);
addItem(2044, "jadeite", "Jadeite", 10000);
addItem(2045, "jasper", "Jasper", 10000);
addItem(2046, "kornerupine", "Kornerupine", 10000);
addItem(2047, "kunzite", "Kunzite", 10000);
addItem(2048, "kyanite", "Kyanite", 10000);
addItem(2049, "labradorite", "Labradorite", 10000);
addItem(2050, "lapis", "Lapis Lazuli", 10000);
addItem(2051, "larimar", "Larimar", 10000);
addItem(2052, "lepidolite", "Lepidolite", 10000);
addItem(2053, "malachite", "Malachite", 10000);
addItem(2054, "malayaGarnet", "Malaya Garnet", 10000);
addItem(2055, "maliGarnet", "Mali Garnet", 10000);
addItem(2056, "melanite", "Melanite", 10000);
addItem(2057, "moldavite", "Moldavite", 10000);
addItem(2058, "moonstone", "Moonstone", 10000);
addItem(2059, "morganite", "Morganite", 10000);
addItem(2060, "obsidian", "Obsidian", 10000);
addItem(2061, "omphaciteJade", "Omphacite Jade", 10000);
addItem(2062, "onyx", "Onyx", 10000);
addItem(2063, "opal", "Opal", 10000);
addItem(2064, "opalDoublet", "Opal Doublet", 10000);
addItem(2065, "pearl", "Pearl", 10000);
addItem(2066, "peridot", "Peridot", 10000);
addItem(2067, "pietersite", "Pietersite", 10000);
addItem(2068, "prehenite", "Prehnite", 10000);
addItem(2070, "quartz", "Quartz", 10000);
addItem(2071, "rainbowMoonstone", "Rainbow Moonstone", 10000);
addItem(2072, "rainbowPyrite", "Rainbow Pyrite", 10000);
addItem(2073, "rhodochrosite", "Rhodochrosite", 10000);
addItem(2074, "rhodoliteGarnet", "Rhodolite Garnet", 10000);
addItem(2075, "roseQuartz", "Rose Quartz", 10000);
addItem(2076, "ruby", "Ruby", 10000);
addItem(2077, "ruby-zoisite", "Ruby-Zoisite", 10000);
addItem(2078, "rutilatedGems", "Rutilated Gems", 10000);
addItem(2079, "rutileQuartz", "Rutile Quartz", 10000);
addItem(2080, "rutileTopaz", "Rutile Topaz", 10000);
addItem(2081, "sapphire", "Sapphire", 10000);
addItem(2082, "seraphinite", "Seraphinite", 10000);
addItem(2083, "serpentine", "Serpentine", 10000);
addItem(2084, "smithsonie", "Smithsonite", 10000);
addItem(2085, "smokyQuartz", "Smoky Quartz", 10000);
addItem(2086, "snowflakeObsidian", "Snowflake Obsidian", 10000);
addItem(2087, "sodalite", "Sodalite", 10000);
addItem(2088, "spessartiteGarnet", "Spessartite Garnet", 10000);
addItem(2089, "sphalerite", "Sphalerite", 10000);
addItem(2090, "sphene", "Sphene", 10000);
addItem(2091, "spinel", "Spinel", 10000);
addItem(2092, "sugilite", "Sugilite", 10000);
addItem(2093, "tanzanite", "Tanzanite", 10000);
addItem(2094, "tigersEye", "Tiger's Eye", 10000);
addItem(2095, "topaz", "Topaz", 10000);
addItem(2096, "tourmaline", "Tourmaline", 10000);
addItem(2097, "turquoise", "Turquoise", 10000);
addItem(2098, "variscite", "Variscite", 10000);
addItem(2099, "zircon", "Zircon", 10000);
addItem(2100, "zultanite", "Zultanite", 10000);
// ---------------------------------------------------------------------------
// Components and parts
// ---------------------------------------------------------------------------
addItem(3000, 'copperBar', 'Copper bar', 5, {
    'icon': imageRoot + 'copperBar.png'
}).setCraftingCost(
    [
        [Items.copper.id, 10]
    ]
);
addItem(3001, 'ironBar', 'Iron bar', 10, {
    'icon': imageRoot + 'ironBar.png'
}).setCraftingCost(
    [
        [Items.iron.id, 10]
    ]
);
addItem(3008, 'silverBar', 'Silver bar', 1000, {
    'icon': imageRoot + 'silverBar.png'
}).setCraftingCost(
    [
        [Items.silver.id, 10]
    ]
);
addItem(3002, 'goldBar', 'Gold bar', 1000, {
    'icon': imageRoot + 'goldBar.png'
}).setCraftingCost(
    [
        [Items.gold.id, 10]
    ]
);
addItem(3003, 'oxygenCan', 'Oxygen can', 11, {
    'icon': imageRoot + 'oxygenCan.png'
}).setCraftingCost(
    [
        [Items.oxygen.id, 1],
        [Items.ironBar.id, 1]
    ]
);
addItem(3004, 'oxygenTank', 'Oxygen tank', 120, {
    'icon': imageRoot + 'oxygenTank.png'
}).setCraftingCost(
    [
        [Items.oxygenCan.id, 1],
        [Items.ironBar.id, 10]
    ]
);
addItem(3005, 'gasCan', 'Gas canister', 50, {
    'description': 'A canister used to hold gas.',
    'icon': imageRoot + 'gasCan.png'
}).setCraftingCost(
    [
        [Items.ironBar.id, 5]
    ]
);
addItem(3006, 'fuelCan', 'Fuel can', 1000).setCraftingCost(
    [
        [Items.fuel.id, 10],
        [Items.ironBar.id, 1]
    ]
);
addItem(3007, 'fuelTank', 'Fuel tank', 1000).setCraftingCost(
    [
        [Items.fuelCan.id, 1],
        [Items.ironBar.id, 10]
    ]
);
// The below are essentially batteries for laser/pulse weapons.
addItem(3009, 'plasmaCell', 'Plasma cell', 10000).setCraftingCost(
    [
        [Items.ceasium.id, 10],
        [Items.ironBar.id, 1]
    ]
);
// TODO: finish figuring out how a hyper cell would work...
addItem(3010, 'hyperCell', 'Hyper cell', 10000)
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
    'icon': imageRoot + 'pick.png'
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
    ]
);
addItem(40005, 'pulsePistol', 'Pulse Pistol', 50000).setCraftingCost(
    [
        [Items.ironBar.id, 50],
        [Items.hyperCell.id, 5],
        [Items.plasmaCell.id, 5]
    ]
);
// ---------------------------------------------------------------------------
// Equipment - Head
// ---------------------------------------------------------------------------
addItem(42000, 'copperHelmet', 'Copper Helmet', 5, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.copperBar.id, 4]
]);
addItem(42001, 'ironHelmet', 'Iron Helmet', 50, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.ironBar.id, 10]
]);
addItem(42002, 'silverHelmet', 'Silver Helmet', 250, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.silverBar.id, 10]
]);
addItem(42003, 'goldHelmet', 'Gold Helmet', 500, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.goldBar.id, 10]
]);
// ---------------------------------------------------------------------------
// Equipment - Chest
// ---------------------------------------------------------------------------
addItem(43000, 'copperArmor', 'Copper Armor', 5, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.copperBar.id, 8]
]);
addItem(43001, 'ironArmor', 'Iron Armor', 50, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.ironBar.id, 10]
]);
addItem(43002, 'silverArmor', 'Silver Armor', 250, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.silverBar.id, 10]
]);
addItem(43003, 'goldArmor', 'Gold Armor', 500, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.goldBar.id, 10]
]);
// ---------------------------------------------------------------------------
// Equipment - Legs
// ---------------------------------------------------------------------------
addItem(44000, 'copperArmorLegs', 'Copper Legs', 5, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.copperBar.id, 6]
]);
addItem(44001, 'ironArmorLegs', 'Iron Legs', 50, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.ironBar.id, 10]
]);
addItem(44002, 'silverArmorLegs', 'Silver Legs', 250, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.silverBar.id, 10]
]);
addItem(44003, 'goldArmorLegs', 'Gold Legs', 500, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.goldBar.id, 10]
]);
// ---------------------------------------------------------------------------
// Equipment - Boots
// ---------------------------------------------------------------------------
addItem(45000, 'copperArmorFeet', 'Copper Boots', 5, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.copperBar.id, 3]
]);
addItem(45001, 'ironArmorFeet', 'Iron Boots', 50, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.ironBar.id, 10]
]);
addItem(45002, 'silverArmorFeet', 'Silver Boots', 250, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.silverBar.id, 10]
]);
addItem(45003, 'goldArmorFeet', 'Gold Boots', 500, {
    'storageLimit': 1
}).setCraftingCost([
    [Items.goldBar.id, 10]
]);
// ---------------------------------------------------------------------------
// Machines
// ---------------------------------------------------------------------------
addItem(46000, 'smallMotor', 'Small Motor', 3000, {
    'icon': imageRoot + 'smallMotor.jpg'
}).setCraftingCost([
    [Items.ironBar.id, 5]
]);
addItem(46001, 'atmosphereConcentrator', 'Atmosphere Concentrator', 10000, {
    'planetLimit': 1
}).setCraftingCost([
    [Items.ironBar.id, 5],
    [Items.smallMotor.id, 1]
]);
// ----------
// Spaceship Main Pieces
addItem(50000, 'cabin', 'Cabin', 10000).setCraftingCost([
    [Items.ironBar.id, 50]
]);
addItem(50001, 'payloadBayDoors', 'Payload Bay Doors', 10000).setCraftingCost([
    [Items.ironBar.id, 50]
]);
addItem(50002, 'maneuveringSystem', 'Maneuvering System', 10000).setCraftingCost([
    [Items.ironBar.id, 5]
    //[Items.microchipController.id, 1],
    //[Items.gPS.id, 1]
]);
addItem(50003, 'mainEngine', 'Main Engine', 10000).setCraftingCost([
    [Items.ironBar.id, 30],
    [Items.fuelTank.id, 5]
]);
addItem(50004, 'thrusters', 'Thrusters', 10000).setCraftingCost([
    [Items.ironBar.id, 20],
    [Items.oxygenTank.id, 2],
    //[Items.hydrogenTank.id, 2],
    [Items.smallMotor.id, 2]
]);
addItem(50005, 'solidBooster', 'Solid Booster', 10000).setCraftingCost([
    [Items.ironBar.id, 20],
    [Items.oxygenTank.id, 4]
]);
addItem(50006, 'forwardFuselage', 'Forward Fuselage', 10000).setCraftingCost([
    [Items.ironBar.id, 20]
]);
addItem(50007, 'midFuselage', 'Mid Fuselage', 10000).setCraftingCost([
    [Items.ironBar.id, 20]
]);
addItem(50008, 'aftFuselage', 'Aft Fuselage', 10000).setCraftingCost([
    [Items.ironBar.id, 20]
]);
addItem(50009, 'landingGear', 'Landing Gear', 10000).setCraftingCost([
    [Items.ironBar.id, 20]
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
// 
// Earth
setPlanetMiningResource(Planets.earth, Items.oxygen.id, 'gather', -20, 0, 1);

setPlanetMiningResource(Planets.earth, Items.dirt.id, 'mine', 0,
    Number.MAX_VALUE, 1);
setPlanetMiningResource(Planets.earth, Items.iron.id, 'mine', 5, 350, 0.09);
setPlanetMiningResource(Planets.earth, Items.copper.id, 'mine', 5, 1500, 0.02);
setPlanetMiningResource(Planets.earth, Items.gold.id, 'mine', 500, 5500, 0.005);
setPlanetMiningResource(Planets.earth, Items.silicon.id, 'mine', 500, 5500, 0.27);
setPlanetMiningResource(Planets.earth, Items.aluminum.id, 'mine', 50, 5500, 0.08);
setPlanetMiningResource(Planets.earth, Items.calcium.id, 'mine', 50, 5500, 0.03);
setPlanetMiningResource(Planets.earth, Items.sodium.id, 'mine', 50, 5500, 0.02);
setPlanetMiningResource(Planets.earth, Items.potassium.id, 'mine', 50, 5500,0.02);
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
setPlanetMiningResource(Planets.moon, Items.manganese.id, 'mine', 20, 100, 0.012);

// Mars
setPlanetMiningResource(Planets.mars, Items.carbonDioxide.id, 'gather', -50, Number.MAX_VALUE, 1);

setPlanetMiningResource(Planets.mars, Items.potassium.id, 'mine', 1, Number.MAX_VALUE, 0.05);
setPlanetMiningResource(Planets.mars, Items.magnesium.id, 'mine', 1, Number.MAX_VALUE, 0.1);
setPlanetMiningResource(Planets.mars, Items.sodium.id, 'mine', 1, Number.MAX_VALUE, 0.09);
setPlanetMiningResource(Planets.mars, Items.chloride.id, 'mine', 1, Number.MAX_VALUE, 0.09);

// Venus
setPlanetMiningResource(Planets.venus, Items.carbonDioxide.id, 'gather', -50, Number.MAX_VALUE, 1);
setPlanetMiningResource(Planets.venus, Items.nitrogen.id, 'gather', 50, 5500, 0.03);
setPlanetMiningResource(Planets.venus, Items.sulfurDioxide.id, 'gather', -50, Number.MAX_VALUE, 0.015);
setPlanetMiningResource(Planets.venus, Items.argon.id, 'gather', -50, Number.MAX_VALUE, 0.007);
setPlanetMiningResource(Planets.venus, Items.carbonMonoxide.id, 'gather', -50, Number.MAX_VALUE, 0.0017);
setPlanetMiningResource(Planets.venus, Items.neon.id, 'gather', -50, Number.MAX_VALUE, 0.0007);

setPlanetMiningResource(Planets.venus, Items.iron.id, 'mine', 4, 350, 1);

// Mercury
setPlanetMiningResource(Planets.mercury, Items.oxygen.id, 'gather', -20, 0, .94);
setPlanetMiningResource(Planets.mercury, Items.oxygen.id, 'gather', -20, 0, .01);
setPlanetMiningResource(Planets.mercury, Items.argon.id, 'gather', -20, 0, .01);
setPlanetMiningResource(Planets.mercury, Items.nitrogen.id, 'gather', -20, 0, .01);
setPlanetMiningResource(Planets.mercury, Items.carbonDioxide.id, 'gather', -20, 0, .01);
setPlanetMiningResource(Planets.mercury, Items.xenon.id, 'gather', -20, 0, .01);
setPlanetMiningResource(Planets.mercury, Items.krypton.id, 'gather', -20, 0, .01);
setPlanetMiningResource(Planets.mercury, Items.neon.id, 'gather', -20, 0, .01);

setPlanetMiningResource(Planets.mercury, Items.oxygen.id, 'dig', 1, 10000, 0.29);
setPlanetMiningResource(Planets.mercury, Items.hydrogen.id, 'gather', -50, Number.MAX_VALUE, .22);
setPlanetMiningResource(Planets.mercury, Items.helium.id, 'gather', -50, Number.MAX_VALUE, .06);
setPlanetMiningResource(Planets.mercury, Items.potassium.id, 'gather', -50, Number.MAX_VALUE, .05);

// Jupiter
setPlanetMiningResource(Planets.jupiter, Items.hydrogen.id, 'gather', -50, Number.MAX_VALUE, .90);
setPlanetMiningResource(Planets.jupiter, Items.helium.id, 'gather', -50, Number.MAX_VALUE, .1);
setPlanetMiningResource(Planets.jupiter, Items.neon.id, 'gather', -50, Number.MAX_VALUE, 0.0007);
setPlanetMiningResource(Planets.jupiter, Items.methane.id, 'gather', -50, Number.MAX_VALUE, 0.0001);

// Saturn
setPlanetMiningResource(Planets.saturn, Items.hydrogen.id, 'gather', -50, Number.MAX_VALUE, .96);
setPlanetMiningResource(Planets.saturn, Items.helium.id, 'gather', -50, Number.MAX_VALUE, .03);
setPlanetMiningResource(Planets.saturn, Items.methane.id, 'gather', -50, Number.MAX_VALUE, 0.01);

// Neptune
setPlanetMiningResource(Planets.neptune, Items.hydrogen.id, 'gather', -50, Number.MAX_VALUE, .80);
setPlanetMiningResource(Planets.neptune, Items.helium.id, 'gather', -50, Number.MAX_VALUE, .19);
setPlanetMiningResource(Planets.neptune, Items.methane.id, 'gather', -50, Number.MAX_VALUE, 0.01);

// Pluto
setPlanetMiningResource(Planets.pluto, Items.nitrogen.id, 'gather', 50, 5500, 0.90);
setPlanetMiningResource(Planets.pluto, Items.methane.id, 'gather', -50, Number.MAX_VALUE, 0.05);
setPlanetMiningResource(Planets.pluto, Items.carbonMonoxide.id, 'gather', -50, Number.MAX_VALUE, 0.05);
