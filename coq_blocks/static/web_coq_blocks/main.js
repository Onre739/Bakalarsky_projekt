import { AppStore } from './AppStore.js';
import BlockFactory from "./BlockFactory.js";
import DefinitionLoader from "./DefinitionLoader.js";
//import UIController from "./UIController.js";
import COQExporter from "./COQExporter.js";
import SavedTypeManager from "./SavedTypeManager.js";
import { getResizeMode } from "./store/appStoreActions.js";
import InteractionController from './views/InteractionController.js';
import SnapManager from './SnapManager.js';

// Initialize store and main components
const store = new AppStore();
const blockFactory = new BlockFactory(store);
const typeManager = new SavedTypeManager(store);
const snapManager = new SnapManager(store);
const interactionController = new InteractionController(store, snapManager);
//const uiController = new UIController(store);
const definitionLoader = new DefinitionLoader();
const coqExporter = new COQExporter(store);

// Initialize interaction controller, interact.js
interactionController.initializeAutomaticResizeConfig();



// UI Reagující na změny ve store
store.subscribe((state) => {
    console.log("Stav se změnil:", state);
    // Zde by se volalo překreslení, např.:
    // uiRenderer.render(state.blockObjects);
});





// console.log("GROUND OFFSET: " + $("#ground").offset().left + ", " + $("#ground").offset().top);
// var uiController = new UIController();
// var definitionLoader = new DefinitionLoader();
// var blockFactory = new BlockFactory();
// var coqExporter = new COQExporter();
// var savedTypeManager = new SavedTypeManager();

// // ------------ Listeneři ------------

// // Tvorba bloků
// document.getElementById("loadBtn").addEventListener("click", async () => {
//     // Parsování a načtení dat z inputu
//     var data = await definitionLoader.load();
//     console.log("Data: ", data);

//     // Odeslání dat
//     savedTypeManager.getClasicData(data);
// });

// // Tlačítka pro změnu režimu
// // document.getElementById("autoBtn").addEventListener("click", () => {
// //     uiController.switchToAutomatic();
// // });

// // document.getElementById("manualBtn").addEventListener("click", () => {
// //     uiController.switchToManual();
// // });

// // Export button
// document.getElementById("exportBtn").addEventListener("click", () => {
//     coqExporter.export();
// });

// // Nový block definice
// document.getElementById("newDefBtn").addEventListener("click", () => {
//     blockFactory.createDefinitionBlock();
// });

// // Nový atomický typ
// document.getElementById("atomicCreateBtn").addEventListener("click", () => {
//     let dataType = document.getElementById("atomicCreateInput").value.trim();
//     savedTypeManager.getAtomicData(dataType);
// });

// // -----------------------------------

// // Vykreslení uložených typů
// savedTypeManager.printList();

// // Drag controll
// switch (getResizeMode()) {
//     // Automatický mód pro resize bloků
//     case "Auto":
//         uiController.automaticResizeConfig();
//         break;

//     // Manuální mód pro resize bloků
//     case "Manual":
//         uiController.manualResizeConfig();
//         break;
// }
