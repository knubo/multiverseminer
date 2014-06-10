require([ "data/system", "data/items", "data/loot", "data/planets", "data/actors", "game", "ui", "jquery", "jqueryui", "enums", "custombox" ]);

// Create components
var game = new Game();
var ui = new UI();

// Add hook for document ready
$(document).ready(onDocumentReady);

// Setup notifications
$.jGrowl.defaults.position = 'top-right';
$.jGrowl.defaults.animateOpen = { height: 'show'};
$.jGrowl.defaults.life = 300;
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

    //Initialize the audio
    $('#audioDig').trigger('load');
    $('#audioDigSuccess').trigger('load');

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
	if(game.playerDied > 0)
		return false;
	game.settings.addStat('mineCount');
	if(game.player.mine()) {
		$('#audioDigSuccess').trigger('play');
	} else {
		$('#audioDig').trigger('play');
	}
};

function onGather() {
	if(game.playerDied > 0)
		return false;
	game.settings.addStat('gatherCount');
	game.player.gather();
};

function onScavenge() {
	if(game.playerDied > 0)
		return false;
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

function test() {
    $.fn.custombox( this, {
        overlay: false,
        effect: 'fadein'
    });
    e.preventDefault();
};

function onReset() {
	$(this).custombox({
		// This is where you'd put the ID or class of the modal,
		// Or you can use a URL and load it via ajax.
		url: '#newReset',
		overlay: 'true',
		overlayOpacity: '0.9',
		customClass: 'resetGame',
		effect: 'fadein',
		error: 'This is a test!'
	});
	/***
	There will need to be an actual reset button that is tied to
	the HTML buttons inside the modal, so when the "yes" button fires,
	that function will fire:
	game.reset();
	// ui.reset();
	onActivatePlayerInventory();
	onActivatePlayerGear(); */
	
	/*** Old jQueryUI version 
	ui.showDialog('Yes', 'No', 'Confirm reset', function() {
		game.reset();
		// TODO: Add reset function to ui
		// ui.reset();
		onActivatePlayerInventory();
		onActivatePlayerGear();
	}); */
};

//TODO: check for the right place for this
function onPlayerDied() {
	game.playerDied = new Date();
	$('#mineButton')[0].classList.add("hidden");
	$('#gatherButton')[0].classList.add("hidden");
	$('#scavengeButton')[0].classList.add("hidden");
	$('#fightButton')[0].classList.add("hidden");
};

function doReset() {
    game.reset();
    onActivatePlayerInventory();
    onActivatePlayerGear();
};

function onTravelToPlanet(target) {
	if(!game.canTravelTo(target)) {
		return;
	}
    $("#solarsystem").dialog("close");
    $(window).one("scroll",function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
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
	if(game.playerDied > 0)
		return false;
    $("#fight-dialog").dialog({
        title: "Fight",
        minWidth: 350,
        minHeight: "auto"
    }).bind('dialogclose', function(event) {
    	$("#fightText").val("");
    	game.currentFight.disableFight();
	});
     game.currentFight = new Fight();
     game.currentFight.init();
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
