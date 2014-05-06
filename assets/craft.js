function craft(item) {
    if (item === "ironBar") {
        if (game.earth.iron >= 10) {
            game.earth.iron -= 10;
            game.earth.ironBar++;
            document.getElementById('iron').innerHTML = game.earth.iron;
            document.getElementById('ironBar').innerHTML = game.earth.ironBar;
        }
    }
    if (item === "fuelCan") {
        if (game.earth.fuel >= 10 && game.earth.ironBar >= 1) {
            game.earth.fuel -= 10;
            game.earth.ironBar--;
            game.earth.fuelCan++;
            document.getElementById('fuel').innerHTML = game.earth.fuel;
            document.getElementById('ironBar').innerHTML = game.earth.ironBar;
            document.getElementById('fuelCan').innerHTML = game.earth.fuelCan;
        }
    }
}
