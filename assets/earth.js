earth = {
    "gravity": 1,
    "artificats": ["arondight", "trident", "ichaival"],
    "layers": {
        "0": {
            "elements": "oxygen",
            "maxDepth": 0,
            "minDepth": 0,
            "name": "atmosphere"
        },
        "1": {
            "elements": [
                "iron",
                "gold",
                "copper"
            ],
            "maxDepth": 35,
            "minDepth": 1,
            "name": "crust"
        },
        "2": {
            "elements": [
                "iron",
                "fuel",
                "copper"
            ],
            "maxDepth": 60,
            "minDepth": 36,
            "name": "upper mantle"
        },
        "3": {
            "elements": [
                "iron",
                "copper"
            ],
            "maxDepth": 2890,
            "minDepth": 61,
            "name": "mantle"
        }
    },
    "name": "Earth",
    "mobs": {
        "human": 2
    }
}
