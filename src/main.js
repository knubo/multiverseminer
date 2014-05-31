require([ "data/system", "data/items", "data/loot", "data/planets", "game", "ui", "jquery", "jqueryui", "enums" ]);

// Create components
var game = new Game();
var ui = new UI();

// Add hook for document ready
$(document).ready(onDocumentReady);

// Setup notifications
$.jGrowl.defaults.position = 'bottom-right';
$.jGrowl.defaults.animateOpen = { height: 'show'};
$.jGrowl.defaults.life = 1000;

// Setup key bindings
$(window).delegate('*', 'keypress', onKeyPress);

Number.prototype.formatNumber = function() {
	if(ui.numberFormatter) {
		return ui.numberFormatter(this).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	return this;
};

// ---------------------------------------------------------------------------
// function hooks
// ---------------------------------------------------------------------------
function onDocumentReady() {
	$(document).bind('keypress', onKeyPress);

    // Initialize the crafting accordion
    $("#playerCraftingContent").accordion();

    //Initialize components
    game.init();
    ui.init();

    // Call one round of UI Updates
    ui.update();

    // Activate the default panels
    onActivatePlayerInventory();
    onActivatePlayerGear();

    // Set the update interval
    var interval = 1000 / 60;
    setInterval(function() {
        onUpdate();
    }, interval);
};

function onKeyPress(event) {
	var char = String.fromCharCode(event.which).toLowerCase();

	switch(char) {
	case 'd': {
			onMine();
			break;
	}
	case 'g': {
		onGather();
		break;
	}
	case 's': {
		onSave();
		break;
	}
	case 'r': {
		onReset();
		break;
	}
	}
};

function onUpdate() {
    var currentTime = Date.now();

	game.update(currentTime);
	ui.update(currentTime);
};

function onCraft(what) {
	if (what == undefined) {
		utils.logError("onCraft with invalid target");
		return;
	}

	if (game.player.craft(what)) {
		ui.screenPlanet.componentCrafting.invalidate();
	}
};

function onMine() {
	game.settings.addStat('mineCount');
	game.player.mine();
};

function onGather() {
	game.settings.addStat('gatherCount');
	game.player.gather();
};

function onScavenge() {
	game.settings.addStat('scavengeCount');
	game.player.scavenge();
};

function onActivatePlayerInventory() {
	// select the button
	changeLeftCategoryButton(0);

    // disable and hide
    ui.screenPlanet.activatePlayerInventory();
}

function onActivateCrafting() {
	// select the button
	changeRightCategoryButton(3);

    ui.screenPlanet.activateCrafting();
};

function onActivateEmpire() {
	// select the button
	changeLeftCategoryButton(1);

    ui.screenPlanet.activateEmpire();
};

function onActivatePlayerGear() {
	// select the button
	changeRightCategoryButton(0);

    ui.screenPlanet.activatePlayerGear();
};

function onActivateShip() {
	// select the button
	changeRightCategoryButton(1);

    ui.screenPlanet.activatePlayerShip();
};

function onActivatePlanet() {
	// select the button
	changeRightCategoryButton(2);

    ui.screenPlanet.activatePlanet();
};

function onMovePlanetItemsToPlayer() {
	game.movePlanetItemsToPlayer();
};

function onSave() {
	game.save();

	ui.notify("Game saved");
};

function onReset() {
	ui.showDialog('Yes', 'No', 'Confirm reset', function() {
		game.reset();
		//TODO: Add reset function to ui
//		ui.reset();

		onActivatePlayerInventory();
		onActivatePlayerGear();
	});
}

function onTravelToPlanet(target) {
	if(!game.canTravelTo(target)) {
		return;
	}

    $("#solarsystem").dialog("close");

	ui.screenPlanet.hide();
	ui.screenTravel.show();
	game.travelTo(target);
};

function onSetInventoryFilter(filter) {
	ui.inventoryPlayerCategoryFilter = filter;

	ui.updateComponent(ui.componentPlayerInventory);
}

function showSolar() {
    $("#solarsystem").dialog({
        minWidth: 1200,
        minHeight: "auto"
    });
}

function onCombat() {
	game.testCombat(); //TODO: change this to know if its duel or ship duel
    $("#fight-dialog").dialog({
        title: "Fight",
        height: 200,
        width: 350,
        buttons: {
            "Hit": function() {},
            "Auto-Attack": function() {},
            "Heal": function() {}
        }
    });
};

function changeLeftCategoryButton(selected) {
	for(var i = 0; i < 4; i++)
	{
		var name = document.getElementById("leftCategory" + i);
		name.className="genericButton categoryButton clickable";
    }

	var name = document.getElementById("leftCategory" + selected);
	name.className="genericButtonSelected categoryButton clickable";
}
function changeRightCategoryButton(selected) {
	for(var i = 0; i < 4; i++)
	{
		var name = document.getElementById("rightCategory" + i);
		name.className="genericButton categoryButton clickable";
    }

	var name = document.getElementById("rightCategory" + selected);
	name.className="genericButtonSelected categoryButton clickable";
}
