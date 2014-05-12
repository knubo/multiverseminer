// Create components
var game = new Game();
var ui = new UI();

// Initialize notification window
$.noty.defaults.layout = 'bottomRight';
$.noty.defaults.timeout = 3000;

// Initialize tooltip
$(document).tooltip();

// Add hook for document ready
$(document).ready(onDocumentReady);

// Setup key bindings
Mousetrap.bind('f', function(e) {
    onDigDown();       
});
Mousetrap.bind('d', function(e) {
   onDigSideways();
});
Mousetrap.bind('g', function(e) {
   onGatherAtmosphere();
});
Mousetrap.bind('u', function(e) {
   onMoveUp();
});
Mousetrap.bind('s', function(e) {
   onSave();
});
Mousetrap.bind('r', function(e) {
   onReset();
});

// Hook into the log so we can display it in the notification window
Utils.logCallback = function(type, message) {
    noty({
        text : message,
        type : type
    });
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

function onUpdate() {
    var currentTime = Date.now();
    
	game.update(currentTime);
	ui.update(currentTime);
};

function onCraft(what) {
	if (what == undefined) {
		Utils.logError("onCraft with invalid target");
		return;
	}

	if (game.player.craft(what)) {
		ui.updateCraftingPanel();
	}
};

function onDigSideways() {
	game.settings.addStat('clickCount');
	game.player.mine();
};

function onDigDown() {
	if (!game.currentPlanet) {
		Utils.logError("Can not dig down, not on planet");
		return;
	}

	game.settings.addStat('clickCount');

	// Todo: this needs to happen in the player or something to account for
	// items / bonus etc
	game.player.moveDown();
	
	// Update the finder components
	ui.updateComponent(ui.componentElementFinder);
    ui.updateComponent(ui.componentGemFinder);
};

function onMoveUp() {
	if (!game.currentPlanet) {
		Utils.logError("Can not dig up, not on planet");
		return;
	}

	game.settings.addStat('clickCount');

	// Todo: this needs to happen in the player or something to account for
	// items / bonus etc
	game.player.moveUp();
	
	// Update the finder components
	ui.updateComponent(ui.componentElementFinder);
	ui.updateComponent(ui.componentGemFinder);
};

function onGatherAtmosphere() {
	game.settings.addStat('clickCount');
	game.player.gather();
};

function onActivatePlayerInventory() {
    // disable and hide
    ui.hideLeftSideComponents();
    
    // activate the category
    ui.showComponent(ui.componentPlayerInventory);
}

function onActivateCrafting() {
    // disable and hide
    ui.hideLeftSideComponents();
    
    // activate the category
    ui.showComponent(ui.componentCrafting);
};

function onActivatePlayerGear() {
    ui.hideRightSideComponents();
    
    // activate the category
    ui.showComponent(ui.componentPlayerGear);
}

function onActivateElementFinder() {
    ui.hideRightSideComponents();
    
    // activate the category
    ui.showComponent(ui.componentElementFinder);
}

function onActivateGemFinder() {
    ui.hideRightSideComponents();
    
    // activate the category
    ui.showComponent(ui.componentGemFinder);
}

function onSave() {
	game.save();

	Utils.log("Game saved");
}

function onReset() {
	noty({
		text : 'Are you sure you want to reset?',
		type : 'confirmation',
		buttons : [ {
			text : 'Ok',
			onClick : function($noty) {
				$noty.close();
				game.reset();
				ui.reset();
				
				onActivatePlayerInventory();
				onActivatePlayerGear();
			}
		}, {
			text : 'Cancel',
			onClick : function($noty) {
				$noty.close();
			}
		} ]
	});
}

function onSetInventoryFilter(filter) {
	ui.inventoryPlayerCategoryFilter = filter;
	
	ui.updateComponent(ui.componentPlayerInventory);
}
