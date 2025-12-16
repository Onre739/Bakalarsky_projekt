import AppStore from "./store/appStore.js";
import BlockFactory from "./factories/BlockFactory.js";
import DefinitionLoader from "./services/DefinitionLoader.js";
import COQExporter from "./services/COQExporter.js";
import SavedTypeManager from "./services/SavedTypeManager.js";
import InteractionController from './views/InteractionController.js';
import SnapManager from './services/SnapManager.js';
import WorkspaceView from './views/WorkspaceView.js';
import SidebarView from './views/SidebarView.js';

// Initialize store and main components
const snapManager = new SnapManager();
const savedTypeManager = new SavedTypeManager();
const definitionLoader = new DefinitionLoader();
const coqExporter = new COQExporter();

const store = new AppStore(snapManager, savedTypeManager, null);

const blockFactory = new BlockFactory(store);
store.setBlockFactory(blockFactory);

const workspaceView = new WorkspaceView(store, snapManager);
const sidebarView = new SidebarView(store);

// Initialize interaction controller, interact.js
const interactionController = new InteractionController(store, snapManager);
interactionController.initializeAutomaticResizeConfig();

// Subscribe views to store updates
workspaceView.subscribeToStore();
sidebarView.subscribeToStore();

// ----------------- Global Listeners -----------------
// ----- Export button -----
const exportBtn = document.getElementById("exportBtn");

exportBtn.addEventListener("click", () => {
    const blocks = store.getBlockObjects();
    const snaps = store.getSnappedBlocks();

    const coqString = coqExporter.export(blocks, snaps);

    workspaceView.showExportResult(coqString);
});

// ----- New Definition Block button -----
const newDefBtn = document.getElementById("newDefBtn");

newDefBtn.addEventListener("click", () => {
    store.spawnDefinitionBlock();
});

// ----- Classic Type Creation button -----
const loadBtn = document.getElementById("loadBtn");
const defInput = document.getElementById("defInput");

loadBtn.addEventListener("click", async () => {
    const definitionText = defInput.value;

    try {
        const data = await definitionLoader.load(definitionText);
        store.importDefinitions(data);
        defInput.value = "";
        console.log("Definitions loaded successfully.");

    } catch (error) {
        console.error("Error loading definition:", error);
        alert("Failed to load definition. See console for details.");
    }
});

// ----- Atomic Type Creation button -----
const atomicCreateBtn = document.getElementById("atomicCreateBtn");
const atomicCreateInput = document.getElementById("atomicCreateInput");

atomicCreateBtn.addEventListener("click", () => {
    const dataTypeName = atomicCreateInput.value.trim();

    if (dataTypeName.length === 0) {
        alert("Please enter a type name.");
        return;
    }

    store.addSavedType(dataTypeName, "atomic");

    atomicCreateInput.value = "";
});

console.log("Application initialized.");

// // ------------ Listeneři ------------

// // Tlačítka pro změnu režimu
// // document.getElementById("autoBtn").addEventListener("click", () => {
// //     uiController.switchToAutomatic();
// // });

// // document.getElementById("manualBtn").addEventListener("click", () => {
// //     uiController.switchToManual();
// // });

