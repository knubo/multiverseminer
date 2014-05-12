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
        'background': 'assets/images/planetBackground_blueLarge.png',
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

setPlanetMiningResource(Planets.earth, Items.iron.id, 'mine', 5, 350, 0.09);
setPlanetMiningResource(Planets.earth, Items.copper.id, 'mine', 5, 1500, 0.02);
setPlanetMiningResource(Planets.earth, Items.gold.id, 'mine', 500, 5500, 0.005);
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
setPlanetMiningResource(Planets.earth, Items.fuel.id, 'mine', 100, 100000, 0.1);
setPlanetMiningResource(Planets.earth, Items.carbon.id, 'mine', 1000, 100000, 0.001);

// Global gem rate because i'm tired of changing them all for testing.
var gemRate = 0.005;

setPlanetMiningResource(Planets.earth, Items.agate.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.alexandrite.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.almandineGarnet.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.amazonite.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.amber.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.amethyst.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.ametrine.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.ammolite.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.andalusite.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.andesineLabradorite.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.andraditeGarnet.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.apatite.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.aquamarine.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.aventurine.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.azurite.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.blackOpal.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.bloodstone.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.boulderOpal.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.carnelian.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.chalcedony.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.chariote.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.chysoberyl.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.chrysocolla.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.chrysoprase.id, 'mine', 1, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.citrine.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.corla.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.danburite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.diamond.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.diaspore.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.emerald.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.flourite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.fossilCoral.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.garnetGems.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.goldenBeryl.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.goshenite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.hawksEye.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.heliodor.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.heliotrope.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.hematite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.hemimorphite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.howlite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.idocrase.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.iolite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.jade.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.jadeite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.jasper.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.kornerupine.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.kunzite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.kyanite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.labradorite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.lapis.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.larimar.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.lepidolite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.malachite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.malayaGarnet.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.maliGarnet.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.melanite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.moldavite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.moonstone.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.morganite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.obsidian.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.omphaciteJade.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.onyx.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.opal.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.opalDoublet.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.pearl.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.peridot.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.pietersite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.prehenite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.quartz.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.rainbowMoonstone.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.rainbowPyrite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.rhodochrosite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.rhodoliteGarnet.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.roseQuartz.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.ruby.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.rutilatedGems.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.rutileQuartz.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.rutileTopaz.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.sapphire.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.seraphinite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.serpentine.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.smithsonie.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.smokyQuartz.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.snowflakeObsidian.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.sodalite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.spessartiteGarnet.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.sphalerite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.sphene.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.spinel.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.sugilite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.tanzanite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.tigersEye.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.topaz.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.tourmaline.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.turquoise.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.variscite.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.zircon.id, 'mine', 10, 10000, gemRate);
setPlanetMiningResource(Planets.earth, Items.zultanite.id, 'mine', 10, 10000, gemRate);

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