// Planetary objects.

planets = {
  0: {
    'name': 'Earth',
    'charAttrs': {
       gold: 1,
       initialGoldPerSec: 1,
       goldPerSec: 1,
       resourceAboveGround: ["Oxygen"],
       resourceUnderGround: ["Iron", "Fuel", "Gold"]
    },
    1: {
        'name': 'the Moon',
        gold: 0,
        initialGoldPerSec: 0,
        resourceAboveGround: ["Helium-3"],
        resourceUnderGround: ["Aluminum", "Magnesium"]
    }
  },
  2: {
      'name': 'Mercury',
      gold: 0,
      initialGoldPerSec: 0,
      resourceAboveGround: ["Carbon Dioxide"],
      resourceUnderGround: ["Hydrogen", "Sodium"]
  }
}