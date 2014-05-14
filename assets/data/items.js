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
    'spaceship': 'Spaceship'
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
        } else if (item.id >= 50000 && item.id < 50100){
            item.category = ItemCategory.spaceship;
        }
        else {
            item.category = ItemCategory.unset;
        }
    }
}

// ---------------------------------------------------------------------------
// Raw materials
// ---------------------------------------------------------------------------
addItem(1, 'oxygen', 'Oxygen', 0.1);

addItem(3, 'copper', 'Copper', 0.5, {
    'icon': sys.iconRoot + 'copper.png',
    'el': 'Cu'
});

addItem(4, 'iron', 'Iron', 1, {
    'icon': sys.iconRoot + 'iron.png',
    'el': 'Fe'
});

addItem(5, 'gold', 'Gold', 100, {
    'icon': sys.iconRoot + 'gold.png',
    'el': 'Au'
});

addItem(6, 'silicon', 'Silicon', 1000, {
    'el': 'Si'
});

addItem(7, 'aluminum', 'Aluminum', 1000, {
    'icon': sys.iconRoot + 'aluminum.png',
    'el': 'Al'
});

addItem(8, 'calcium', 'Calcium', 1000, {
    'el': 'Ca'
});

addItem(9, 'sodium', 'Sodium', 1000, {
    'el': 'Na'
});

addItem(10, 'fuel', 'Fuel', 1000);

addItem(11, 'potassium', 'Potassium', 1000, {
    'el': 'K'
});

addItem(12, 'magnesium', 'Magnesium', 1000, {
    'el': 'Mg'
});

addItem(13, 'titanium', 'Titanium', 1000, {
    'el': 'Ti'
});

addItem(14, 'hydrogen', 'Hydrogen', 1000, {
    'el': 'H'
});

addItem(15, 'phosphorus', 'Phosphorus', 1000, {
    'el': 'P'
});

addItem(16, 'manganese', 'Manganese', 1000, {
    'el': 'Mn'
});

addItem(17, 'fluorine', 'Fluorine', 1000, {
    'el': 'F'
});

addItem(18, 'barium', 'Barium', 1000, {
    'el': 'Ba'
});

addItem(19, 'carbon', 'Carbon', 1000, {
    'icon': sys.iconRoot + 'carbon.png',
    'el': 'C'
});

addItem(20, 'sulfur', 'Sulfur', 1000, {
    'el': 'S'
});

addItem(21, 'nitrogen', 'Nitrogen', 1000, {
    'el': 'N'
});

addItem(22, 'nickel', 'Nickel', 1000, {
    'el': 'Ni'
});

addItem(23, 'zinc', 'Zinc', 1000, {
    'el': 'Zn'
});

addItem(24, 'chromium', 'Chromium', 1000, {
    'el': 'Cr'
});

addItem(25, 'chloride', 'Chloride', 1000, {
    'el': 'Cl'
});

addItem(26, 'carbonDioxide', 'Carbon dioxide', 1000, {
    'el': 'CO2'
});

addItem(27, 'sulfurDioxide', 'Sulfur Dioxide', 1000, {
    'el': 'SO2'
});

addItem(28, 'carbonMonoxide', 'Carbon Monoxide', 1000, {
    'el': 'CO'
});

addItem(29, 'helium', 'Helium', 1000, {
    'el': 'He'
});

addItem(30, 'neon', 'Neon', 1000, {
    'el': 'Ne'
});

addItem(31, 'methane', 'Methane', 10000, {
    'el': 'CH4'
});

addItem(32, 'argon', 'Argon', 10000, {
    'el': 'Ar'
});

addItem(33, 'xenon', 'Xenon', 100000, {
    'el': 'Xe'
});

addItem(34, 'krypton', 'Krypton', 100000, {
    'el': 'Kr'
});

addItem(35, 'silver', 'Silver', 50, {
    'icon': sys.iconRoot + 'silver.png',
    'el': 'Ag'
});

addItem(36, 'ceasium', 'Ceasium', 100000, {
    'el': 'Cs'
});

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
    'icon': sys.iconRoot + 'copperBar.png'
}).setCraftingCost(
    [
        [Items.copper.id, 10]
    ]
);

addItem(3001, 'ironBar', 'Iron bar', 10, {
    'icon': sys.iconRoot + 'ironBar.png'
}).setCraftingCost(
    [
        [Items.iron.id, 10]
    ]
);

addItem(3008, 'silverBar', 'Silver bar', 1000, {
    'icon': sys.iconRoot + 'silverBar.png'
}).setCraftingCost(
    [
        [Items.silver.id, 10]
    ]
);

addItem(3002, 'goldBar', 'Gold bar', 1000, {
    'icon': sys.iconRoot + 'goldBar.png'
}).setCraftingCost(
    [
        [Items.gold.id, 10]
    ]
);

addItem(3017, 'titaniumBar', 'Titanium Bar', 2500).setCraftingCost(
	[
		[Items.titanium.id, 10]
	]
);

addItem(3003, 'oxygenCan', 'Oxygen can', 11, {
    'icon': sys.iconRoot + 'oxygenCan.png'
}).setCraftingCost(
    [
        [Items.oxygen.id, 1],
        [Items.ironBar.id, 1]
    ]
);

addItem(3004, 'oxygenTank', 'Oxygen tank', 120, {
    'icon': sys.iconRoot + 'oxygenTank.png'
}).setCraftingCost(
    [
        [Items.oxygenCan.id, 1],
        [Items.ironBar.id, 10]
    ]
);

addItem(3005, 'gasCan', 'Gas canister', 50, {
    'description': 'A canister used to hold gas.',
    'icon': sys.iconRoot + 'gasCan.png'
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

addItem(3009, 'plasmaCell', 'Plasma cell', 10000).setCraftingCost(
    [
        [Items.ceasium.id, 10],
        [Items.ironBar.id, 1]
    ]
);

addItem(3010, 'hyperCell', 'Hyper cell', 10000);

addItem(3011, 'silica', 'Silica', 2500).setCraftingCost(
    [
        [Items.silica.id, 1],
        [Items.oxygen.id, 2]
    ]
);

addItem(3012, 'glass', 'Glass', 5000).setCraftingCost(
    [
        [Items.silica.id, 2]
    ]
);

addItem(3014, 'steelBar', 'Steel bar', 5000).setCraftingCost(
    [
        [Items.ironBar.id, 1],
        [Items.carbon.id, 1]
    ]
);

addItem(3013, 'microchip', 'Microchip', 10000).setCraftingCost(
    [
        [Items.silica.id, 1],
        [Items.steelBar.id, 1]
    ]
);

addItem(3015, 'hydrogenTank', 'Hydrogen tank', 10000).setCraftingCost(
    [
        [Items.hydrogen.id, 10],
        [Items.steelBar.id, 10]
    ]
);

addItem(3016, 'gps', 'GPS', 10000).setCraftingCost(
    [
        [Items.steelBar.id, 10],
        [Items.microchip.id, 1]
    ]
);

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
    [Items.iron.id, 100]
]);

addItem(4001, 'refinery', 'Refinery', 50000, {
    'storageLimit': 1
}).setCraftingCost(
[
     [Items.ironBar.id, 50],
     [Items.gasCan.id, 10]
]);

// ---------------------------------------------------------------------------
// Equipment - MainHand
// ---------------------------------------------------------------------------
// TODO: MOVE THIS UP 
var copperBasePrice = 10000;
var bronzeBasePrice = 15000;
var ironBasePrice = 20000;
var steelBasePrice = 25000;
var silverBasePrice = 30000;
var goldBasePrice = 35000;
var titaniumBasePrice = 40000;

addItem(40000, 'woodenPick', 'Wooden Pickaxe', 0, {
    'storageLimit': 1,
	'power': 1
});

addItem(40001, 'copperPick', 'Copper Pickaxe', 15, {
    'storageLimit': 1,
	'power': 3,
    'icon': sys.iconRoot + 'pick.png'
}).setCraftingCost([
    [Items.copperBar.id, 10]
]);

addItem(40002, 'ironPick', 'Iron Pickaxe', 25, {
    'storageLimit': 1,
	'power': 4
}).setCraftingCost([
    [Items.ironBar.id, 10]
]);

addItem(40003, 'goldPick', 'Gold Pickaxe', 2500, {
    'storageLimit': 1,
	'power': 5
}).setCraftingCost([
    [Items.goldBar.id, 10]
]);

addItem(40004, 'titaniumPick', 'Titanium Pickaxe', 4000, {
	'storageLimit': 1,
	'power': 6
}).setCraftingCost([
	[Items.titaniumBar.id, 10]
]);

addItem(40005, 'jackhammer', 'Jackhammer', 10000, {
    'storageLimit': 1,
	'power': 10
}).setCraftingCost(
    [
        [Items.ironBar.id, 50],
        [Items.fuelCan.id, 50],
        [Items.goldBar.id, 10]
    ]
);

addItem(40006, 'pulsePistol', 'Pulse Pistol', 50000).setCraftingCost(
    [
        [Items.ironBar.id, 50],
        [Items.hyperCell.id, 5],
        [Items.plasmaCell.id, 5]
    ]
);

addItem(40007, 'titaniumJackhammerTip', 'Titanium Jackhammer Tip', 20000, {
	'storageLimit': 1,
	'power': 7
}).setCraftingCost(
	[
		[Items.titaniumBar.id, 75],
		[Items.diamond.id, 20],
		[Items.goldBar.id, 5]
	]
);

addItem(40008, 'copperScimitar', 'Copper Scimitar', copperBasePrice);

addItem(40009, 'bronzeScimitar', 'Bronze Scimitar', bronzeBasePrice);

addItem(40010, 'ironScimitar', 'Iron Scimitar', ironBasePrice);

addItem(40011, 'steelScimitar', 'Steel Scimitar', steelBasePrice);

addItem(40012, 'silverScimitar', 'Silver Scimitar', silverBasePrice);

addItem(40013, 'goldScimitar', 'Gold Scimitar', goldBasePrice);

addItem(40014, 'titaniumScimitar', 'Titanium Scimitar', silverBasePrice);

//	 Wood -> Copper -> Bronze -> Iron -> Steel -> Silver -> Gold -> Aluminum -> Titanium
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
    'icon': sys.iconRoot + 'smallMotor.jpg'
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
// Spaceship Main Pieces
// ---------------------------------------------------------------------------
addItem(50000, 'cabin', 'Cabin', 10000).setCraftingCost([
    [Items.ironBar.id, 50]
]);

addItem(50001, 'payloadBayDoors', 'Payload Bay Doors', 10000).setCraftingCost([
    [Items.ironBar.id, 50]
]);

addItem(50002, 'maneuveringSystem', 'Maneuvering System', 10000).setCraftingCost([
    [Items.ironBar.id, 5],
    [Items.microchip.id, 1],
    [Items.gps.id, 1]
]);

addItem(50003, 'mainEngine', 'Main Engine', 10000).setCraftingCost([
    [Items.ironBar.id, 30],
    [Items.fuelTank.id, 5],
    [Items.hydrogenTank.id, 5]
]);

addItem(50004, 'thrusters', 'Thrusters', 10000).setCraftingCost([
    [Items.ironBar.id, 20],
    [Items.oxygenTank.id, 2],
    [Items.hydrogenTank.id, 2],
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
