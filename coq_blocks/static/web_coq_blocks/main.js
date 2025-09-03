import { AppState } from "./AppState.js";
import Block from "./Block.js";
import SnapManager from "./SnapManager.js";
import BlockFactory from "./BlockFactory.js";
import DefinitionLoader from "./DefinitionLoader.js";
import UIController from "./UIController.js";

console.log("GROUND OFFSET: " + $("#ground").offset().left + ", " + $("#ground").offset().top);
var uiController = new UIController();
var definitionLoader = new DefinitionLoader();
var blockFactory = new BlockFactory();

// Listeneři
document.getElementById("loadBtn").addEventListener("click", async () => {
    // Parsování a načtení dat z inputu
    var data = await definitionLoader.load();
    console.log("Dataaaa: ", data);

    // Tvorba bloků
    blockFactory.createBlock(data);
});

document.getElementById("autoBtn").addEventListener("click", () => {
    uiController.switchToAutomatic();
});

document.getElementById("manualBtn").addEventListener("click", () => {
    uiController.switchToManual();
});

// Drag controll
switch (AppState.resizeMode) {
    // Automatický mód pro resize bloků
    case "Auto":
        uiController.automaticResizeConfig();
        break;

    // Manuální mód pro resize bloků
    case "Manual":
        uiController.manualResizeConfig();
        break;
}
