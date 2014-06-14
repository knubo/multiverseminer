require(["gameminer", "gamecombatant", "gamestorage", "ui", "uiplanetscreen", "gamesettings"]);

function Player() {
    this.id = 'player';
    this.pickPower = 1;
    this.miner = new Miner('player');
    this.storage = new Storage('player');
    this.gear = new Gear('player');
    this.stats = {
        "stats": []
    };
    this.combatant = new Combatant({
        id: 'player',
        npc: false,
        player: this,
        name: "you"
    });
    this.playerClass = null;

    this.oxygenConsumption = 1;
    this.canBreathe = true;
    this.lastOxygenConsumption = Date.now();

    // ---------------------------------------------------------------------------
    // general
    // ---------------------------------------------------------------------------
    this.initialize = function() {
        this.miner.initialize();
        this.combatant.initialize();
        this.storage.initialize();
        this.gear.initialize();

        // Add the slots we can wear
        this.gear.addSlot('head');
        this.gear.addSlot('chest');
        this.gear.addSlot('mainHand');
        this.gear.addSlot('secondHand');
        this.gear.addSlot('legs');
        this.gear.addSlot('feet');
        this.gear.addSlot('miningGear');
    };

    this.update = function(currentTime) {
        this.miner.update(currentTime);
        this.combatant.update(currentTime);
        this.checkPlanet();

        if (!this.canBreathe) {
            if (currentTime - this.lastOxygenConsumption > 1000) {
                // Todo: need to do something when this runs out
                if (this.storage.getItemCount(Items.oxygen.id) > 0) {
                    this.storage.removeItem(Items.oxygen.id);
                }
                this.lastOxygenConsumption = currentTime;
            }
        }
    };

    // ---------------------------------------------------------------------------
    // player functions
    // ---------------------------------------------------------------------------	
    this.mine = function() {
        if (!game.currentPlanet) {
            return false;
        }

        //game.settings.addStat('manualDigCount');

        var items = this.miner.mine(game.currentPlanet, this.pickPower);
        if (items) {
            for (var i = 0; i < items.length; i++) {
                var name = game.getItemName(items[i]);
                var float = ui.createFloat('+1 ' + name, 'lootFloating', utils.getRandomInt(-100, 100), utils.getRandomInt(-100, 0));
            }
            // TODO - Add stat for whatever items you found.
            this.storage.addItems(items);
            return true;
        }

        return false;
    };

    this.gather = function() {
        if (!game.currentPlanet) {
            return false;
        }

        //game.settings.addStat('manualGatherCount');

        var items = this.miner.gather(game.currentPlanet);
        if (items) {
            // TODO - Add stat for whatever items you found.
            this.storage.addItems(items);
            return true;
        }

        return false;
    };

    this.scavenge = function() {
        if (!game.currentPlanet) {
            return false;
        }
        // TODO - Add stat for whatever items you found.
        //game.settings.addStat('manualScavengeCount');

        var items = this.miner.scavenge(game.currentPlanet);
        if (items) {
            this.storage.addItems(items);
            return true;
        }

        return false;
    };

    this.decomposeScavenged = function() {
        // Decomposing scavenged items
        // TODO - Add stat for whatever items you found.
        if (!this.storage.getItemsOfCategory("scavenge")) {
            return;
        }
        var tmpItems = this.storage.getItemsOfCategory("scavenge");
        var scavengedItems = [];
        var gained = {};
        var removed = {};

        for (var i = 0; i < tmpItems.length; i++) {
            scavengedItems.push([game.getItem(tmpItems[i]), this.storage.items[tmpItems[i]]]);
        }
        if (!scavengedItems) {
            return;
        }

        for (var i = 0; i < scavengedItems.length; i++) {
            var item = scavengedItems[i][0];
            var count = scavengedItems[i][1]; //how many of each item being decomposed
            for (var key in item.craftCost) {
                this.storage.addItem(key, item.craftCost[key] * count);
                gained[key] = gained[key] ? gained[key] + item.craftCost[key] * count : item.craftCost[key] * count;
            }
            removed[item.id] = removed[item.id] ? removed[item.id] + count : count;
            this.storage.removeItem(item.id, count);
        }

        var gainedString = "<strong>Gained:</strong><br> ";
        for (var key in gained) {
            gainedString += game.getItem(key).name + " x " + gained[key] + ", ";
        }
        gainedString.substring(0, gainedString.length - 2);

        var removedString = "<br><br><strong>Lost:</strong><br>";
        for (var key in removed) {
            removedString += game.getItem(key).name + " x " + removed[key] + ", ";
        }
        removedString = removedString.substring(0, removedString.length - 2);
        gainedString = gainedString.substring(0, gainedString.length - 2);
        //$('#scavmodal').dialog({positon: {my: "center", at: "center", of: window} }).empty();
        $(this).custombox({
            url: "#scavmodal",
            customClass: 'scavModal',
            overlayClose: 'true',
            opacity: '0.7',
        });
        $("#scavmodal").append(gainedString + "" + removedString);
        delete scavengedItems;
    };

    this.craft = function(itemId, count) {
        // For now we craft with our inventory into our inventory
        if (!game.craft(this.storage, this.storage, itemId, count)) {
            return false;
        }

        var item = game.getItem(itemId);
        if (item.gearType == 'building' && game.currentPlanet) {
            game.moveItems(itemId, this.storage, game.currentPlanet.storage, 1);

            // Todo: Planet needs to evaluate this
            game.currentPlanet.equip(item.id);
        }

        this.equipBestGear();

        return true;
    };

    this.checkPlanet = function() {
        if (game.currentPlanet != null) {
            if (game.currentPlanet.data.oxygen == true) {
                this.canBreathe = true;
            } else {
                this.canBreathe = false;
            }
        }
    }

    this.equipBestGear = function() {
        // TODO: needs actual selection of best gear, right now it selects the latest found + proper pickPower assignment
        for (var key in this.storage.items) {
            var item = game.getItem(key);

            if (!item || !item.gearType) {
                continue;
            }
            if (item.gearType == 'miningGear' && item.name.match("Pickaxe") != null) {
                this.pickPower = item.power;
            }

            this.equip(item.id);
        }
    };

    this.equip = function(itemId) {
        this.gear.equip(itemId, this.storage.getItemMetadata(itemId));
        this.storage.removeItem(itemId);
    };

    this.canEquip = function(itemId) {
        return this.gear.canEquip(itemId);
    };

    this.unEquip = function(type) {
        if (!this.hasEquipped(type)) {
            return;
        }
        var itemId = this.gear.getItemInSlot(type);
        this.gear.unEquip(type);
        // Add the item back to the player's inventory
        game.player.storage.addItem(itemId);
        game.player.gearChanged = true;
    };

    this.hasEquipped = function(type) {
        return this.gear.getItemInSlot(type) != undefined;
    };

    this.getTravelSpeed = function() {
        // Todo: hardcoded for now until ship is done
        return 5000;
    };

    // ---------------------------------------------------------------------------
    // loading / saving
    // ---------------------------------------------------------------------------
    this.save = function() {
        this.miner.save();
        this.combatant.save();
        this.storage.save();
        this.gear.save();
        localStorage.playerOxygenConsumption = this.oxygenConsumption;
        localStorage.planetID = game.currentPlanet.data.id;
        localStorage.playerClass = this.playerClass;
    };

    this.load = function() {
        this.miner.load();
        this.combatant.load();
        this.storage.load();
        this.gear.load();
        this.oxygenConsumption = utils.loadFloat('playerOxygenConsumption', 1);
        this.playerClass = utils.loadInt('playerClass', 1);
        game.currentPlanet = game.planets[utils.loadInt('planetID', 1)];
        game.planetChanged = true;
    };

    this.reset = function(fullReset) {
        window.localStorage.clear();
        this.miner.reset(fullReset);
        this.combatant.reset(fullReset);
        this.storage.reset(fullReset);
        this.gear.reset(fullReset);
        this.oxygenConsumption = 1;
        this.pickPower = 1;
        this.baseMineSpeed = 1;
        this.playerClass = null;
    };
}
