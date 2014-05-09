//---------------------------------------------------------------------------
//core setup
//---------------------------------------------------------------------------
var game = new Game();
game.init();

var interval = 1000 / 60;
setInterval(function() {
	onUpdate();
}, interval);

$.noty.defaults.layout = 'bottomRight';
$.noty.defaults.timeout = 3000;

$(document).ready( function () {
    $('#inventoryTable').DataTable( {
        "sScrollY": "400px",
        "bScrollCollapse": true,
        "bPaginate": false,
        "bJQueryUI": true,
        "aoColumnDefs": [
            { "sWidth": "90%", "aTargets": [ -1 ] }
        ]
    } );
} );

var inventoryCategoryFilter = undefined;

// ---------------------------------------------------------------------------
// user interface
// ---------------------------------------------------------------------------
Utils.logCallback = function(type, message) {
	noty({
		text : message,
		type : type
	});
};

function updateInventory() {
	var scrollTopSaved = $('.dataTables_scrollBody').scrollTop();
	$('#inventoryTable').DataTable().rows().remove();

	if (!inventoryCategoryFilter) {
		var items = game.player.storage.getItems();
	} else {
		var items = game.player.storage.getItemsOfCategory(inventoryCategoryFilter);
	}

	game.player.storage.storageChanged = false;

	if (!items || items.length <= 0) {
		$('#inventoryTable').DataTable().draw();
		return;
	}

	for (var i = 0; i < items.length; i++) {
		var itemName = game.getItemName(items[i]);
		var count = game.player.storage.getItemCount(items[i]);
		$('#inventoryTable').DataTable().row.add([count, itemName]).draw();
	}
	
	$('#inventoryTable').DataTable().draw();
	$('.dataTables_scrollBody').scrollTop(scrollTopSaved);
}

function updateInterface() {
	$('#planet').text(game.currentPlanet.data.name);
	$('#depth').text(game.currentPlanet.currentDepth);

	$('#oxygen').text(game.player.storage.getItemCount(Items.oxygen.id));
	$('#oxygenCan').text(game.player.storage.getItemCount(Items.oxygenCan.id));
	$('#oxygenTank')
			.text(game.player.storage.getItemCount(Items.oxygenTank.id));

	$('#copper').text(game.player.storage.getItemCount(Items.copper.id));
	$('#copperBar').text(game.player.storage.getItemCount(Items.copperBar.id));
	$('#iron').text(game.player.storage.getItemCount(Items.iron.id));
	$('#ironBar').text(game.player.storage.getItemCount(Items.ironBar.id));
	$('#gold').text(game.player.storage.getItemCount(Items.gold.id));
	$('#goldBar').text(game.player.storage.getItemCount(Items.goldBar.id));

	$('#fuel').text(game.player.storage.getItemCount(Items.fuel.id));
	$('#fuelCan').text(game.player.storage.getItemCount(Items.fuelCan.id));
	$('#fuelTank').text(game.player.storage.getItemCount(Items.fuelTank.id));
	
	var slots = [];
	for (var key in game.player.gear.slots)
	{
		slots.push(game.player.gear.slots[key].gearType + " - " + game.getItemName(game.player.gear.slots[key].id));
	}
	$('#gear').html("<p>" + slots.join("</p><p>") + "</p>");
	$('#pickPower').text(game.player.pickPower + " / mpc");

	if (game.currentPlanet) {
		resources = game.currentPlanet._getAvailableResources("mine");
		var elements = [];
		for (var i = 0; i < resources.length; i++) {
			elements.push(game.getItemName(resources[i].id));
		}
		$('#elementFinder').text(elements.join(", "));
	} else {
		$('#elementFinder').text("N/A");
	}

	if (game.player.storage.storageChanged) {
		updateInventory();
	}
}

// ---------------------------------------------------------------------------
// function hooks
// ---------------------------------------------------------------------------
function onUpdate() {
	game.update();

	updateInterface();
}

function onCraft(what) {
	if (what == undefined) {
		Utils.logError("onCraft with invalid target");
		return;
	}

	game.player.craft(what);

	updateInterface();
}

function onDigSideways() {
	game.settings.addStat('clickCount');
	game.player.mine();
}

function onDigDown() {
	if (!game.currentPlanet) {
		Utils.logError("Can not dig down, not on planet");
		return;
	}

	game.settings.addStat('clickCount');

	// Todo: this needs to happen in the player or something to account for
	// items / bonus etc
	game.player.digDown();
}

function onMoveUp() {
	if (!game.currentPlanet) {
		Utils.logError("Can not dig up, not on planet");
		return;
	}

	game.settings.addStat('clickCount');

	// Todo: this needs to happen in the player or something to account for
	// items / bonus etc
	game.currentPlanet.currentDepth--;
}

function onGatherAtmosphere() {
	game.settings.addStat('clickCount');
	game.player.gather();
}

function onPlanetEarth() {
	$(".planet")
			.planetarium(
					{
						autospin : "1000ms",
						angle : "20deg",
						glow : "rgba(255, 255, 255, 0.34902) 0px 0px 50px, inset 33px 20px 50px rgba(0,0,0,0.5)",
						pattern : "assets/texture-earth.jpg",
						size : "100x100",
						float : true,
						space : "body",
						ring : false,
						ringColor : "#fff",
						ringAngle : "20deg"
					});
	$(".hidePlanetBtn").hide();
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
	inventoryCategoryFilter = filter;
	updateInventory();
}