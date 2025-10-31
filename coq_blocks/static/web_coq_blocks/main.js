import { AppState } from "./AppState.js";
import BlockFactory from "./BlockFactory.js";
import DefinitionLoader from "./DefinitionLoader.js";
import UIController from "./UIController.js";
import COQExporter from "./COQExporter.js";
import SavedTypeManager from "./SavedTypeManager.js";

console.log("GROUND OFFSET: " + $("#ground").offset().left + ", " + $("#ground").offset().top);
var uiController = new UIController();
var definitionLoader = new DefinitionLoader();
var blockFactory = new BlockFactory();
var coqExporter = new COQExporter();
var savedTypeManager = new SavedTypeManager();

// ------------ Listeneři ------------

// Tvorba bloků
document.getElementById("loadBtn").addEventListener("click", async () => {
    // Parsování a načtení dat z inputu
    var data = await definitionLoader.load();
    console.log("Data: ", data);

    // Odeslání dat
    savedTypeManager.getClasicData(data);
});

// Tlačítka pro změnu režimu
// document.getElementById("autoBtn").addEventListener("click", () => {
//     uiController.switchToAutomatic();
// });

// document.getElementById("manualBtn").addEventListener("click", () => {
//     uiController.switchToManual();
// });

// Export button
document.getElementById("exportBtn").addEventListener("click", () => {
    coqExporter.export();
});

// Nový block definice
document.getElementById("newDefBtn").addEventListener("click", () => {
    blockFactory.createDefinitionBlock();
});

// Nový atomický typ
document.getElementById("atomicCreateBtn").addEventListener("click", () => {
    let dataType = document.getElementById("atomicCreateInput").value.trim();
    savedTypeManager.getAtomicData(dataType);
});

// -----------------------------------

// Vykreslení uložených typů
savedTypeManager.printList();

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
