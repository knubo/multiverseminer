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
        } else if (item.id >= 50000 && item.id <= 50100) {
            item.category = ItemCategory.spaceship;
        } else {
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
    'icon': sys.iconRoot + 'silicon.png',
    'el': 'Si'
});

addItem(7, 'aluminum', 'Aluminum', 1000, {
    'icon': sys.iconRoot + 'aluminum.png',
    'el': 'Al'
});

addItem(8, 'calcium', 'Calcium', 1000, {
    'icon': sys.iconRoot + 'calcium.png',
    'el': 'Ca'
});

addItem(9, 'sodium', 'Sodium', 1000, {
    'icon': sys.iconRoot + 'sodium.png',
    'el': 'Na'
});

addItem(10, 'fuel', 'Fuel', 1000);

addItem(11, 'potassium', 'Potassium', 1000, {
    'icon': sys.iconRoot + 'potassium.png',
    'el': 'K'
});

addItem(12, 'magnesium', 'Magnesium', 1000, {
    'el': 'Mg'
});

addItem(13, 'titanium', 'Titanium', 1000, {
    'icon': sys.iconRoot + "titanium.png",
    'el': 'Ti'
});

addItem(14, 'hydrogen', 'Hydrogen', 1000, {
    'el': 'H'
});

addItem(15, 'phosphorus', 'Phosphorus', 1000, {
    'icon': sys.iconRoot + 'phosphorus.png',
    'el': 'P'
});

addItem(16, 'manganese', 'Manganese', 1000, {
    'icon': sys.iconRoot + 'manganese.png',
    'el': 'Mn'
});

addItem(17, 'fluorine', 'Fluorine', 1000, {
    'icon': sys.iconRoot + 'flourine.png',
    'el': 'F'
});

addItem(18, 'barium', 'Barium', 1000, {
    'icon': sys.iconRoot + 'barium.png',
    'el': 'Ba'
});

addItem(19, 'carbon', 'Carbon', 1000, {
    'icon': sys.iconRoot + 'carbon.png',
    'el': 'C'
});

addItem(20, 'sulfur', 'Sulfur', 1000, {
    'icon': sys.iconRoot + 'sulfur.png',
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
addItem(2000, "agate", "Agate", 10000, { 
	"statIncrease":  {"agility": 1},
	"statDecrease": {"strength": 1}
});
addItem(2001, "alexandrite", "Alexandrite", 10000, {
	"statIncrease":  {"agility": 1},
	"statDecrease": {"strength": 1}
});
addItem(2002, "almandineGarnet", "Almandine Garnet", 10000, {
	"statIncrease":  {"agility": 1},
	"statDecrease": {"strength": 1}
});
addItem(2003, "amazonite", "Amazonite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2004, "amber", "Amber", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2005, "amethyst", "Amethyst", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2006, "ametrine", "Ametrine", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2007, "ammolite", "Ammolite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2008, "andalusite", "Andalusite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2009, "andesineLabradorite", "Andesine Labradorite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2010, "andraditeGarnet", "Andradite Garnet", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2011, "apatite", "Apatite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2012, "aquamarine", "Aquamarine", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2013, "aventurine", "Aventurine", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2014, "azurite", "Azurite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2015, "blackOpal", "Black Opal", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2016, "bloodstone", "Bloodstone", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2017, "boulderOpal", "Boulder Opal", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2018, "carnelian", "Carnelian", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2019, "chalcedony", "Chalcedony", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2020, "chariote", "Charoite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2021, "chysoberyl", "Chrysoberyl", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2022, "chrysocolla", "Chrysocolla", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2023, "chrysoprase", "Chrysoprase", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2024, "citrine", "Citrine", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2025, "corla", "Coral", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2026, "danburite", "Danburite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2027, "diamond", "Diamond", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2028, "diaspore", "Diaspore", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2029, "emerald", "Emerald", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2030, "flourite", "Fluorite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2031, "fossilCoral", "Fossil Coral", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2032, "garnetGems", "Garnet Gems", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2033, "goldenBeryl", "Golden Beryl", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2034, "goshenite", "Goshenite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2035, "hawksEye", "Hawks Eye", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2036, "heliodor", "Heliodor", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2037, "heliotrope", "Heliotrope", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2038, "hematite", "Hematite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2039, "hemimorphite", "Hemimorphite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2040, "howlite", "Howlite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2041, "idocrase", "Idocrase", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2042, "iolite", "Iolite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2043, "jade", "Jade", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2044, "jadeite", "Jadeite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2045, "jasper", "Jasper", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2046, "kornerupine", "Kornerupine", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2047, "kunzite", "Kunzite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2048, "kyanite", "Kyanite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2049, "labradorite", "Labradorite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2050, "lapis", "Lapis Lazuli", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2051, "larimar", "Larimar", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2052, "lepidolite", "Lepidolite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2053, "malachite", "Malachite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2054, "malayaGarnet", "Malaya Garnet", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2055, "maliGarnet", "Mali Garnet", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2056, "melanite", "Melanite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2057, "moldavite", "Moldavite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2058, "moonstone", "Moonstone", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2059, "morganite", "Morganite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2060, "obsidian", "Obsidian", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2061, "omphaciteJade", "Omphacite Jade", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2062, "onyx", "Onyx", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2063, "opal", "Opal", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2064, "opalDoublet", "Opal Doublet", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2065, "pearl", "Pearl", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2066, "peridot", "Peridot", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2067, "pietersite", "Pietersite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2068, "prehenite", "Prehnite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2070, "quartz", "Quartz", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2071, "rainbowMoonstone", "Rainbow Moonstone", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2072, "rainbowPyrite", "Rainbow Pyrite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2073, "rhodochrosite", "Rhodochrosite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2074, "rhodoliteGarnet", "Rhodolite Garnet", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2075, "roseQuartz", "Rose Quartz", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2076, "ruby", "Ruby", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2077, "ruby-zoisite", "Ruby-Zoisite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2078, "rutilatedGems", "Rutilated Gems", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2079, "rutileQuartz", "Rutile Quartz", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2080, "rutileTopaz", "Rutile Topaz", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2081, "sapphire", "Sapphire", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2082, "seraphinite", "Seraphinite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2083, "serpentine", "Serpentine", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2084, "smithsonie", "Smithsonite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2085, "smokyQuartz", "Smoky Quartz", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2086, "snowflakeObsidian", "Snowflake Obsidian", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2087, "sodalite", "Sodalite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2088, "spessartiteGarnet", "Spessartite Garnet", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2089, "sphalerite", "Sphalerite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2090, "sphene", "Sphene", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2091, "spinel", "Spinel", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2092, "sugilite", "Sugilite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2093, "tanzanite", "Tanzanite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2094, "tigersEye", "Tiger's Eye", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2095, "topaz", "Topaz", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2096, "tourmaline", "Tourmaline", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2097, "turquoise", "Turquoise", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2098, "variscite", "Variscite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2099, "zircon", "Zircon", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});
addItem(2100, "zultanite", "Zultanite", 10000, { 
	"statIncrease":  {"agility": 1}, 
	"statDecrease": {"strength": 1} 
});

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

addItem(3012, 'glass', 'Glass', 5000, {
    'icon': sys.iconRoot + "Glass.png"
}).setCraftingCost(
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
//
// TODO: MOVE THIS UP 
var copperBasePrice = 10000;
var bronzeBasePrice = 15000;
var ironBasePrice = 20000;
var steelBasePrice = 25000;
var titaniumBasePrice = 30000;
var tungstenBasePrice = 35000;
var iridiumBasePrice = 40000;
var rheniumBasePrice = 45000;
var maxSockets = 4;

addItem(40000, 'woodenPick', 'Wooden Pickaxe', 0, {
    'storageLimit': 1,
    'power': 1, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(40001, 'copperPick', 'Copper Pickaxe', 15, {
    'storageLimit': 1,
    'power': 2,
    'icon': sys.iconRoot + 'pick_1.png', 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost([
    [Items.copperBar.id, 10]
]);
addItem(40002, 'ironPick', 'Iron Pickaxe', 25, {
    'storageLimit': 1,
    'power': 3, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost([
    [Items.ironBar.id, 10]
]);
addItem(40003, 'goldPick', 'Gold Pickaxe', 2500, {
    'storageLimit': 1,
    'power': 4, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost([
    [Items.goldBar.id, 10]
]);
addItem(40004, 'titaniumPick', 'Titanium Pickaxe', 4000, {
    'storageLimit': 1,
    'power': 5, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost([
    [Items.titaniumBar.id, 10]
]);
addItem(40005, 'jackhammer', 'Jackhammer', 10000, {
    'storageLimit': 1,
    'power': 10, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost(
    [
        [Items.ironBar.id, 50],
        [Items.fuelCan.id, 50],
        [Items.goldBar.id, 10]
    ]
);
addItem(40006, 'pulsePistol', 'Pulse Pistol', 50000, {
	'icon': sys.iconRoot + 'pulsePistol.png',
    'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost(
    [
        [Items.ironBar.id, 50],
        [Items.hyperCell.id, 5],
        [Items.plasmaCell.id, 5]
    ]
);
addItem(40007, 'titaniumJackhammerTip', 'Titanium Jackhammer Tip', 20000, {
    'storageLimit': 1,
    'power': 7, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost(
    [
        [Items.titaniumBar.id, 75],
        [Items.diamond.id, 20],
        [Items.goldBar.id, 5]
    ]
);
addItem(40008, 'copperScimitar', 'Copper Scimitar', copperBasePrice, {
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(40009, 'copperAxe', 'Copper Axe', copperBasePrice, {
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(40010, 'copperTwoHandedAxe', 'Copper Two Handed Axe', copperBasePrice, {
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(40011, 'copperHatchet', 'Copper Hatchet', copperBasePrice, {
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(40012, 'copperPistol', 'Copper Pistol', copperBasePrice, {
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(40013, 'copperRifle', 'Copper Rifle', copperBasePrice, {
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(40014, 'copperPolearm', 'Copper Polearm', copperBasePrice, {
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(40015, 'copperSword', 'Copper Sword', copperBasePrice, {
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(40016, 'copperLongsword', 'Copper Longsword', copperBasePrice, {
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(40017, 'copperGreatsword', 'Copper Greatsword', copperBasePrice, {
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(40018, 'copperSickle', 'Copper Sickle', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40019, 'copperTippedStaff', 'Copper Tipped Staff', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40020, 'copperShuriken', 'Copper Shuriken', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40021, 'copperKnuckles', 'Copper Knuckles', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40022, 'copperSpikedClub', 'Copper Spiked Club', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40023, 'copperTippedSpear', 'Copper Tipped Spear', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40024, 'copperThrowingKnife', 'Copper Throwing Knife', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40025, 'copperTomahawk', 'Copper Tomahawk', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40026, 'bronzeScimitar', 'Bronze Scimitar', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40027, 'bronzeAxe', 'Bronze Axe', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40028, 'bronzeTwoHandedAxe', 'Bronze Two Handed Axe', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40029, 'bronzeHatchet', 'Bronze Hatchet', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40030, 'bronzePistol', 'Bronze Pistol', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40031, 'bronzeRifle', 'Bronze Rifle', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40032, 'bronzePolearm', 'Bronze Polearm', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40033, 'bronzeSword', 'Bronze Sword', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40034, 'bronzeLongsword', 'Bronze Longsword', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40035, 'bronzeGreatsword', 'Bronze Greatsword', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40152, 'bronzeTwoHandedSword', "Bronze Two Handed Sword", bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40036, 'bronzeSickle', 'Bronze Sickle', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40037, 'bronzeTippedStaff', 'Bronze Tipped Staff', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40038, 'bronzeShuriken', 'Bronze Shuriken', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40039, 'bronzeKnuckles', 'Bronze Knuckles', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40040, 'bronzeSpikedClub', 'Bronze Spiked Club', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40041, 'bronzeTippedSpear', 'Bronze Tipped Spear', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40042, 'bronzeThrowingKnife', 'Bronze Throwing Knife', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40043, 'bronzeTomahawk', 'Bronze Tomahawk', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40044, 'ironScimitar', 'Iron Scimitar', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40045, 'ironAxe', 'Iron Axe', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40046, 'ironTwoHandedAxe', 'Iron Two Handed Axe', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40047, 'ironHatchet', 'Iron Hatchet', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40048, 'ironPistol', 'Iron Pistol', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40049, 'ironRifle', 'Iron Rifle', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40050, 'ironPolearm', 'Iron Polearm', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40051, 'ironSword', 'Iron Sword', ironBasePrice, { 
    'icon': sys.iconRoot + 'ironSword.png',
    'maxSockets': maxSockets,
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40052, 'ironLongsword', 'Iron Longsword', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40053, 'ironGreatsword', 'Iron Greatsword', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40153, 'ironTwoHandedSword', "Iron Two Handed Sword", ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40054, 'ironSickle', 'Iron Sickle', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40055, 'ironTippedStaff', 'Iron Tipped Staff', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40056, 'ironShuriken', 'Iron Shuriken', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40057, 'ironKnuckles', 'Iron Knuckles', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40058, 'ironSpikedClub', 'Iron Spiked Club', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40059, 'ironTippedSpear', 'Iron Tipped Spear', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40060, 'ironThrowingKnife', 'Iron Throwing Knife', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40061, 'ironTomahawk', 'Iron Tomahawk', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40062, 'steelScimitar', 'Steel Scimitar', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40063, 'steelAxe', 'Steel Axe', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40064, 'steelTwoHandedAxe', 'Steel Two Handed Axe', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40065, 'steelHatchet', 'Steel Hatchet', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40066, 'steelPistol', 'Steel Pistol', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40067, 'steelRifle', 'Steel Rifle', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40068, 'steelPolearm', 'Steel Polearm', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40069, 'steelSword', 'Steel Sword', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40070, 'steelLongsword', 'Steel Longsword', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40071, 'steelGreatsword', 'Steel Greatsword', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40154, 'steelTwoHandedSword', "Steel Two Handed Sword", steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40072, 'steelSickle', 'Steel Sickle', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40073, 'steelTippedStaff', 'Steel Tipped Staff', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40074, 'steelShuriken', 'Steel Shuriken', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40075, 'steelKnuckles', 'Steel Knuckles', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40076, 'steelSpikedClub', 'Steel Spiked Club', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40077, 'steelTippedSpear', 'Steel Tipped Spear', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40078, 'steelThrowingKnife', 'Steel Throwing Knife', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40079, 'steelTomahawk', 'Steel Tomahawk', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40080, 'titaniumScimitar', 'Titanium Scimitar', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40081, 'titaniumAxe', 'Titanium Axe', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40082, 'titaniumTwoHandedAxe', 'Titanium Two Handed Axe', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40083, 'titaniumHatchet', 'Titanium Hatchet', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40084, 'titaniumPistol', 'Titanium Pistol', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40085, 'titaniumRifle', 'Titanium Rifle', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40086, 'titaniumPolearm', 'Titanium Polearm', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40087, 'titaniumSword', 'Titanium Sword', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40088, 'titaniumLongsword', 'Titanium Longsword', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40089, 'titaniumGreatsword', 'Titanium Greatsword', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40155, 'titaniumTwoHandedSword', "Titanium Two Handed Sword", titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40090, 'titaniumSickle', 'Titanium Sickle', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40091, 'titaniumTippedStaff', 'Titanium Tipped Staff', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40092, 'titaniumShuriken', 'Titanium Shuriken', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40093, 'titaniumKnuckles', 'Titanium Knuckles', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40094, 'titaniumSpikedClub', 'Titanium Spiked Club', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40095, 'titaniumTippedSpear', 'Titanium Tipped Spear', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40096, 'titaniumThrowingKnife', 'Titanium Throwing Knife', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40097, 'titaniumTomahawk', 'Titanium Tomahawk', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40098, 'tungstenScimitar', 'Tungsten Scimitar', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40099, 'tungstenAxe', 'Tungsten Axe', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40100, 'tungstenTwoHandedAxe', 'Tungsten Two Handed Axe', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40101, 'tungstenHatchet', 'Tungsten Hatchet', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40102, 'tungstenPistol', 'Tungsten Pistol', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40103, 'tungstenRifle', 'Tungsten Rifle', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40104, 'tungstenPolearm', 'Tungsten Polearm', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40105, 'tungstenSword', 'Tungsten Sword', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40106, 'tungstenLongsword', 'Tungsten Longsword', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40107, 'tungstenGreatsword', 'Tungsten Greatsword', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40156, 'tungstenTwoHandedSword', "Tungsten Two Handed Sword", tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40108, 'tungstenSickle', 'Tungsten Sickle', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40109, 'tungstenTippedStaff', 'Tungsten Tipped Staff', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40110, 'tungstenShuriken', 'Tungsten Shuriken', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40111, 'tungstenKnuckles', 'Tungsten Knuckles', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40112, 'tungstenSpikedClub', 'Tungsten Spiked Club', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40113, 'tungstenTippedSpear', 'Tungsten Tipped Spear', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40114, 'tungstenThrowingKnife', 'Tungsten Throwing Knife', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40115, 'tungstenTomahawk', 'Tungsten Tomahawk', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40116, 'iridiumScimitar', 'Iridium Scimitar', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40117, 'iridiumAxe', 'Iridium Axe', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40118, 'iridiumTwoHandedAxe', 'Iridium Two Handed Axe', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40119, 'iridiumHatchet', 'Iridium Hatchet', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40120, 'iridiumPistol', 'Iridium Pistol', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40121, 'iridiumRifle', 'Iridium Rifle', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40122, 'iridiumPolearm', 'Iridium Polearm', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40123, 'iridiumSword', 'Iridium Sword', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40124, 'iridiumLongsword', 'Iridium Longsword', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40125, 'iridiumGreatsword', 'Iridium Greatsword', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40157, 'iridiumTwoHandedSword', "Iridium Two Handed Sword", iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40126, 'iridiumSickle', 'Iridium Sickle', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40127, 'iridiumTippedStaff', 'Iridium Tipped Staff', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40128, 'iridiumShuriken', 'Iridium Shuriken', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40129, 'iridiumKnuckles', 'Iridium Knuckles', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40130, 'iridiumSpikedClub', 'Iridium Spiked Club', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40131, 'iridiumTippedSpear', 'Iridium Tipped Spear', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40132, 'iridiumThrowingKnife', 'Iridium Throwing Knife', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40133, 'iridiumTomahawk', 'Iridium Tomahawk', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40134, 'rheniumScimitar', 'Rhenium Scimitar', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40135, 'rheniumAxe', 'Rhenium Axe', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40136, 'rheniumTwoHandedAxe', 'Rhenium Two Handed Axe', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40137, 'rheniumHatchet', 'Rhenium Hatchet', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40138, 'rheniumPistol', 'Rhenium Pistol', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40139, 'rheniumRifle', 'Rhenium Rifle', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40140, 'rheniumPolearm', 'Rhenium Polearm', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40141, 'rheniumSword', 'Rhenium Sword', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40142, 'rheniumLongsword', 'Rhenium Longsword', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40143, 'rheniumGreatsword', 'Rhenium Greatsword', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40158, 'rheniumTwoHandedSword', "Rhenium Two Handed Sword", rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40144, 'rheniumSickle', 'Rhenium Sickle', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40145, 'rheniumTippedStaff', 'Rhenium Tipped Staff', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40146, 'rheniumShuriken', 'Rhenium Shuriken', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40147, 'rheniumKnuckles', 'Rhenium Knuckles', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40148, 'rheniumSpikedClub', 'Rhenium Spiked Club', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40149, 'rheniumTippedSpear', 'Rhenium Tipped Spear', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40150, 'rheniumThrowingKnife', 'Rhenium Throwing Knife', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});
addItem(40151, 'rheniumTomahawk', 'Rhenium Tomahawk', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength' : 1}, 
	'statDecrease': {'agility':1}
});

//	 Wood -> Copper -> Bronze -> Iron -> Steel -> Silver -> Gold -> Aluminum -> Titanium
// ---------------------------------------------------------------------------
// Equipment - Head
// ---------------------------------------------------------------------------
addItem(42000, 'copperHelmet', 'Copper Helmet', 5, {
    'storageLimit': 1, 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost([
    [Items.copperBar.id, 4]
]);
addItem(42001, 'ironHelmet', 'Iron Helmet', 50, {
    'storageLimit': 1, 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost([
    [Items.ironBar.id, 10]
]);
addItem(42002, 'silverHelmet', 'Silver Helmet', 250, {
    'storageLimit': 1, 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost([
    [Items.silverBar.id, 10]
]);
addItem(42003, 'goldHelmet', 'Gold Helmet', 500, {
    'storageLimit': 1, 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost([
    [Items.goldBar.id, 10]
]);
addItem(42004, 'copperReinforcedCowl', 'Copper Reinforced Cowl', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42005, 'copperReinforcedHood', 'Copper Reinforced Hood', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42006, 'copperReinforcedMask', 'Copper Reinforced Mask', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42008, 'bronzeReinforcedCowl', 'Bronze Reinforced Cowl', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42009, 'bronzeReinforcedHood', 'Bronze Reinforced Hood', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42010, 'bronzeReinforcedMask', 'Bronze Reinforced Mask', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42011, 'bronzeHelmet', 'Bronze Helmet', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42012, 'ironReinforcedCowl', 'Iron Reinforced Cowl', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42013, 'ironReinforcedHood', 'Iron Reinforced Hood', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42014, 'ironReinforcedMask', 'Iron Reinforced Mask', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42016, 'steelReinforcedCowl', 'Steel Reinforced Cowl', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42017, 'steelReinforcedHood', 'Steel Reinforced Hood', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42018, 'steelReinforcedMask', 'Steel Reinforced Mask', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42019, 'steelHelmet', 'Steel Helmet', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42020, 'titaniumReinforcedCowl', 'Titanium Reinforced Cowl', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42021, 'titaniumReinforcedHood', 'Titanium Reinforced Hood', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42022, 'titaniumReinforcedMask', 'Titanium Reinforced Mask', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42023, 'titaniumHelmet', 'Titanium Helmet', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42024, 'tungstenReinforcedCowl', 'Tungsten Reinforced Cowl', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42025, 'tungstenReinforcedHood', 'Tungsten Reinforced Hood', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42026, 'tungstenReinforcedMask', 'Tungsten Reinforced Mask', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42027, 'tungstenHelmet', 'Tungsten Helmet', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42028, 'iridiumReinforcedCowl', 'Iridium Reinforced Cowl', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42029, 'iridiumReinforcedHood', 'Iridium Reinforced Hood', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42030, 'iridiumReinforcedMask', 'Iridium Reinforced Mask', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42031, 'iridiumHelmet', 'Iridium Helmet', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42032, 'rheniumReinforcedCowl', 'Rhenium Reinforced Cowl', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42033, 'rheniumReinforcedHood', 'Rhenium Reinforced Hood', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42034, 'rheniumReinforcedMask', 'Rhenium Reinforced Mask', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(42035, 'rheniumHelmet', 'Rhenium Helmet', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
// ---------------------------------------------------------------------------
// Equipment - Chest
// ---------------------------------------------------------------------------
addItem(43000, 'copperArmor', 'Copper Armor', 5, {
    'storageLimit': 1, 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost([
    [Items.copperBar.id, 8]
]);
addItem(43001, 'ironArmor', 'Iron Armor', 50, {
    'storageLimit': 1, 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost([
    [Items.ironBar.id, 10]
]);
addItem(43002, 'silverArmor', 'Silver Armor', 250, {
    'storageLimit': 1, 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost([
    [Items.silverBar.id, 10]
]);
addItem(43003, 'goldArmor', 'Gold Armor', 500, {
    'storageLimit': 1, 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost([
    [Items.goldBar.id, 10]
]);
addItem(43004, 'copperBreastplate', 'Copper Breastplate', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43005, 'copperChainmail', 'Copper Chainmail', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43006, 'copperMail', 'Copper Mail', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43007, 'copperReinforcedShirt', 'Copper Reinforced Shirt', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43008, 'bronzeBreastplate', 'Bronze Breastplate', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43009, 'bronzeChainmail', 'Bronze Chainmail', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43010, 'bronzeMail', 'Bronze Mail', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43011, 'bronzeReinforcedShirt', 'Bronze Reinforced Shirt', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43012, 'ironBreastplate', 'Iron Breastplate', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43013, 'ironChainmail', 'Iron Chainmail', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43014, 'ironMail', 'Iron Mail', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43015, 'ironReinforcedShirt', 'Iron Reinforced Shirt', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43016, 'steelBreastplate', 'Steel Breastplate', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43017, 'steelChainmail', 'Steel Chainmail', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43018, 'steelMail', 'Steel Mail', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43019, 'steelReinforcedShirt', 'Steel Reinforced Shirt', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43020, 'titaniumBreastplate', 'Titanium Breastplate', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43021, 'titaniumChainmail', 'Titanium Chainmail', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43022, 'titaniumMail', 'Titanium Mail', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43023, 'titaniumReinforcedShirt', 'Titanium Reinforced Shirt', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43024, 'tungstenBreastplate', 'Tungsten Breastplate', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43025, 'tungstenChainmail', 'Tungsten Chainmail', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43026, 'tungstenMail', 'Tungsten Mail', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43027, 'tungstenReinforcedShirt', 'Tungsten Reinforced Shirt', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43028, 'iridiumBreastplate', 'Iridium Breastplate', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43029, 'iridiumChainmail', 'Iridium Chainmail', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43030, 'iridiumMail', 'Iridium Mail', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43031, 'iridiumReinforcedShirt', 'Iridium Reinforced Shirt', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43032, 'rheniumBreastplate', 'Rhenium Breastplate', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43033, 'rheniumChainmail', 'Rhenium Chainmail', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43034, 'rheniumMail', 'Rhenium Mail', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(43035, 'rheniumReinforcedShirt', 'Rhenium Reinforced Shirt', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
// ---------------------------------------------------------------------------
// Equipment - Legs
// ---------------------------------------------------------------------------
addItem(44000, 'copperArmorLegs', 'Copper Legs', 5, {
    'storageLimit': 1, 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost([
    [Items.copperBar.id, 6]
]);
addItem(44001, 'ironArmorLegs', 'Iron Legs', 50, {
    'storageLimit': 1, 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost([
    [Items.ironBar.id, 10]
]);
addItem(44002, 'silverArmorLegs', 'Silver Legs', 250, {
    'storageLimit': 1, 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost([
    [Items.silverBar.id, 10]
]);
addItem(44003, 'goldArmorLegs', 'Gold Legs', 500, {
    'storageLimit': 1, 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost([
    [Items.goldBar.id, 10]
]);
addItem(44004, 'copperReinforcedPants', 'Copper Reinforced Pants', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44005, 'copperReinforcedChaps', 'Copper Reinforced Chaps', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44006, 'copperGeaves', 'Copper Geaves', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44007, 'copperPlatelegs', 'Copper Platelegs', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44008, 'bronzeReinforcedPants', 'Bronze Reinforced Pants', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44009, 'bronzeReinforcedChaps', 'Bronze Reinforced Chaps', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44010, 'bronzeGeaves', 'Bronze Geaves', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44011, 'bronzePlatelegs', 'Bronze Platelegs', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44012, 'ironReinforcedPants', 'Iron Reinforced Pants', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44013, 'ironReinforcedChaps', 'Iron Reinforced Chaps', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44014, 'ironGeaves', 'Iron Geaves', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44015, 'ironPlatelegs', 'Iron Platelegs', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44016, 'steelReinforcedPants', 'Steel Reinforced Pants', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44017, 'steelReinforcedChaps', 'Steel Reinforced Chaps', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44018, 'steelGeaves', 'Steel Geaves', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44019, 'steelPlatelegs', 'Steel Platelegs', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44020, 'titaniumReinforcedPants', 'Titanium Reinforced Pants', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44021, 'titaniumReinforcedChaps', 'Titanium Reinforced Chaps', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44022, 'titaniumGeaves', 'Titanium Geaves', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44023, 'titaniumPlatelegs', 'Titanium Platelegs', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44024, 'tungstenReinforcedPants', 'Tungsten Reinforced Pants', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44025, 'tungstenReinforcedChaps', 'Tungsten Reinforced Chaps', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44026, 'tungstenGeaves', 'Tungsten Geaves', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44027, 'tungstenPlatelegs', 'Tungsten Platelegs', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44028, 'iridiumReinforcedPants', 'Iridium Reinforced Pants', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44029, 'iridiumReinforcedChaps', 'Iridium Reinforced Chaps', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44030, 'iridiumGeaves', 'Iridium Geaves', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44031, 'iridiumPlatelegs', 'Iridium Platelegs', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44032, 'rheniumReinforcedPants', 'Rhenium Reinforced Pants', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44033, 'rheniumReinforcedChaps', 'Rhenium Reinforced Chaps', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44034, 'rheniumGeaves', 'Rhenium Geaves', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(44035, 'rheniumPlatelegs', 'Rhenium Platelegs', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
// ---------------------------------------------------------------------------
// Equipment - Boots
// ---------------------------------------------------------------------------
addItem(45000, 'copperArmorFeet', 'Copper Boots', 5, {
    'storageLimit': 1, 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost([
    [Items.copperBar.id, 3]
]);
addItem(45001, 'ironArmorFeet', 'Iron Boots', 50, {
    'storageLimit': 1, 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost([
    [Items.ironBar.id, 10]
]);
addItem(45002, 'silverArmorFeet', 'Silver Boots', 250, {
    'storageLimit': 1, 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost([
    [Items.silverBar.id, 10]
]);
addItem(45003, 'goldArmorFeet', 'Gold Boots', 500, {
    'storageLimit': 1, 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost([
    [Items.goldBar.id, 10]
]);
addItem(45004, 'copperReinforcedShoes', 'Copper Reinforced Shoes', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45005, 'copperBoots', 'Copper Boots', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45006, 'copperChainboots', 'Copper Chainboots', copperBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45007, 'bronzeReinforcedShoes', 'Bronze Reinforced Shoes', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45008, 'bronzeBoots', 'Bronze Boots', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45009, 'bronzeChainboots', 'Bronze Chainboots', bronzeBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45010, 'ironReinforcedShoes', 'Iron Reinforced Shoes', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45011, 'ironBoots', 'Iron Boots', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45012, 'ironChainboots', 'Iron Chainboots', ironBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45013, 'steelReinforcedShoes', 'Steel Reinforced Shoes', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45014, 'steelBoots', 'Steel Boots', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45015, 'steelChainboots', 'Steel Chainboots', steelBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45016, 'titaniumReinforcedShoes', 'Titanium Reinforced Shoes', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45017, 'titaniumBoots', 'Titanium Boots', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45018, 'titaniumChainboots', 'Titanium Chainboots', titaniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45019, 'tungstenReinforcedShoes', 'Tungsten Reinforced Shoes', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45020, 'tungstenBoots', 'Tungsten Boots', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45021, 'tungstenChainboots', 'Tungsten Chainboots', tungstenBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45022, 'iridiumReinforcedShoes', 'Iridium Reinforced Shoes', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45023, 'iridiumBoots', 'Iridium Boots', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45024, 'iridiumChainboots', 'Iridium Chainboots', iridiumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45025, 'rheniumReinforcedShoes', 'Rhenium Reinforced Shoes', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45026, 'rheniumBoots', 'Rhenium Boots', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
addItem(45027, 'rheniumChainboots', 'Rhenium Chainboots', rheniumBasePrice, { 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
});
// ---------------------------------------------------------------------------
// Machines
// ---------------------------------------------------------------------------
addItem(46000, 'smallMotor', 'Small Motor', 3000, {
    'icon': sys.iconRoot + 'smallMotor.jpg', 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
}).setCraftingCost([
    [Items.ironBar.id, 5]
]);

addItem(46001, 'atmosphereConcentrator', 'Atmosphere Concentrator', 10000, {
    'planetLimit': 1, 
	'maxSockets': maxSockets, 
	'statIncrease': {'strength': 1}, 
	'statDecrease': {'agility': 1}
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
