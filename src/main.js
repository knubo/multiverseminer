require([ "data/system", "data/items", "data/loot", "data/planets", "game", "ui", "jquery", "jqueryui", "enums", "vex" ]);

// Create components
var game = new Game();
var ui = new UI();

// Add hook for document ready
$(document).ready(onDocumentReady);

// Setup notifications
$.jGrowl.defaults.position = 'bottom-right';
$.jGrowl.defaults.animateOpen = { height: 'show'};
$.jGrowl.defaults.life = 1000;
$.jGrowl.defaults.pool = 1;

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
    // Initialize the crafting accordion
    $("#playerCraftingContent").accordion();

    //Initialize components
    game.init();
    ui.init();
	ui.bindKey("d", onMine);
	ui.bindKey("g", onGather);
	ui.bindKey("s", onSave);
	ui.bindKey("r", onReset);

    // Call one round of UI Updates
    ui.update();
    if($("#playerInventoryFilter").text() == "Scavenge") {
        $("#decompButton").show();
    }
    
    // Activate the default panels
    onActivatePlayerInventory();
    onActivatePlayerGear();

    // Set the update interval
    var interval = 1000 / 60;
    setInterval(function() {
        onUpdate();
    }, interval);
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

function reset() {
    vex.dialog.confirm({
      message: 'Are you absolutely sure you want to destroy the alien planet?',
      callback: function(value) {
        return console.log(value);
      }
    });
};

function onReset() {
	ui.showDialog('Yes', 'No', 'Confirm reset', function() {
		game.reset();
		//TODO: Add reset function to ui
//		ui.reset();
		onActivatePlayerInventory();
		onActivatePlayerGear();
	});
};

function onTravelToPlanet(target) {
	if(!game.canTravelTo(target)) {
		return;
	}
    $("#solarsystem").dialog("close");
    $(window).one("scroll",function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    })
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
function showChat() {
    $("#chat-modal").dialog({
        height: 500,
        maxHeight: 800,
        width: 500
    });
}
function showFight() {
    $("#fight-dialog").dialog({
        title: "Fight",
        minWidth: 350,
        minHeight: "auto"
    }).bind('dialogclose', function(event) {
    	$("#fightText").val("");
    	game.currentFight.disableFight();
	});
     game.currentFight = new Fight();
}
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
