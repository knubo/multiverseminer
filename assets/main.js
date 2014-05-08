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

// ---------------------------------------------------------------------------
// user interface
// ---------------------------------------------------------------------------
Utils.logCallback = function(type, message) {
	noty({
		text : message,
		type : type
	});
};

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

	if (game.currentPlanet) {
		resources = game.currentPlanet._getAvailableResources("mine");
		var elements = [];
		for (var i = 0; i < resources.length; i++) {
			elements.push(game.getItemName(resources[i].id));
		}
		$('#elementFinder').text(elements.join());
	} else {
		$('#elementFinder').text("N/A");
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