var gameData = {
    Nut: 0,
    NutPerClick: 1,
    GodPowers: 10000,
    GodPowerConsumptionPerNut: 1,
    Money: 0,
    moneyButtonVisible: false, // Track if money button is visible
    nutFarmCost: 5, // Cost of Nut Farm
    NPps: 0,
    GPps: 0,
    npFromFarm: 1,
    gpFromFarm: -1
};


function gamestart() {
    addMessage("You tire of being a God and retire to become something bigger. A Nut Farmer.");
    updateDisplay();
    checkForMoneyButton(); // Check for money button at game start
}


function FarmNut() {
    if (gameData.GodPowers >= gameData.GodPowerConsumptionPerNut) {
        gameData.Nut += gameData.NutPerClick;
        gameData.GodPowers -= gameData.GodPowerConsumptionPerNut;
        addMessage("You farmed 1 Nut with 1 God Power.");
        updateDisplay();
        checkForMoneyButton();
    } else {
        addMessage("Not enough God Powers to farm Nut!");
    }
}


function checkForMoneyButton() {
    if (gameData.Nut >= 10 && !gameData.moneyButtonVisible) {
        var moneyButton = document.getElementById("moneyButton");
        var moneyCount = document.getElementById("MoneyCount");
        moneyButton.style.display = "inline"; // Make money button visible
        moneyCount.style.display = "inline"; // Make money count visible
        gameData.moneyButtonVisible = true; // Update flag
    }
    if (gameData.Money >= gameData.nutFarmCost) {
        var shopButtonContainer = document.getElementById("shopButtonContainer");
        shopButtonContainer.style.display = "block"; // Show shop button
    }
}


function spendNutsForMoney() {
    if (gameData.Nut >= 10) {
        gameData.Nut -= 10;
        gameData.Money += 1;
        addMessage("You spent 10 Nuts to gain 1 Money.");
        updateDisplay();
        checkForMoneyButton(); // Check for shop button visibility after spending money
    } else {
        addMessage("Not enough Nuts to spend for Money!");
    }
}


function openShop() {

    if (document.getElementById("shopButton").textContent == 'Close Shop') {
        closeShop();
        return;
    }

    var shop = document.getElementById("shop");
    shop.style.display = "block"; // Show the shop
    document.getElementById("shopButton").textContent = 'Close Shop';

}

function closeShop() {
    var shop = document.getElementById("shop");
    shop.style.display = "none"; // Show the shop
    document.getElementById("shopButton").textContent = 'Open Shop';
}


function buyNutFarm() {
    if (gameData.Money >= gameData.nutFarmCost) {
        gameData.Money -= gameData.nutFarmCost;
        addMessage("You bought a Nut Farm.");
        startNutFarm();
        gameData.nutFarmCost = Math.floor(gameData.nutFarmCost *= 1.2);
        document.getElementById("nutFarmButton").textContent = ('Buy Nut Farm (Cost: ' + gameData.nutFarmCost + ' Money)');
        document.getElementById("NP/s").style.display = "block";
        gameData.NPps += gameData.npFromFarm;
        document.getElementById("NP/s").textContent = (gameData.NPps + ' NP/s')
        document.getElementById("GP/s").style.display = "block";
        gameData.GPps += gameData.gpFromFarm;
        document.getElementById("GP/s").textContent = (gameData.GPps + ' GP/s')
        updateDisplay();
        var shop = document.getElementById("shop");
       // shop.style.display = "none"; // Hide the shop after purchase
    } else {
        addMessage("Not enough Money to buy a Nut Farm!");
    }
}


function startNutFarm() {
    // Implement functionality to produce 1 Nut per second
    setInterval(function () {
        gameData.Nut += 1;
        gameData.GodPowers -= gameData.GodPowerConsumptionPerNut; // Reduce God powers
        updateDisplay();
    }, 1000); // Run every 1000 milliseconds (1 second)
}



function addMessage(message) {
    var messageBox = document.getElementById("messageBox");
    messageBox.value += message + "\n";
    messageBox.scrollTop = messageBox.scrollHeight;
}


function updateDisplay() {
    document.getElementById("NutPower").innerHTML = gameData.Nut + " Nut Power";
    document.getElementById("GodPowers").innerHTML = gameData.GodPowers + " God Powers";
    document.getElementById("MoneyCount").innerHTML = gameData.Money + " Money";
}
