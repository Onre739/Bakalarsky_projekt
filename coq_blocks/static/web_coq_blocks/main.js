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

    try {
        const coqString = coqExporter.export(blocks, snaps);
        if (coqString) {
            workspaceView.showExportResult(coqString);
        }
    }

    catch (error) {
        console.error("Error during export: ", error);
        workspaceView.printAlert(`${error.message}`, "danger");
    }

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
const atomicModalEl = document.getElementById("atomicTypeModal");
const atomicModal = bootstrap.Modal.getInstance(atomicModalEl) || new bootstrap.Modal(atomicModalEl);

atomicCreateBtn.addEventListener("click", () => {
    const dataTypeName = atomicCreateInput.value.trim();

    if (dataTypeName.length === 0) {
        workspaceView.printAlert("Atomic type name cannot be empty.", "warning");

        // Do not close the modal
        return;
    }

    store.addSavedType(dataTypeName, "atomic");
    workspaceView.printAlert(`Atomic type "${dataTypeName}" created successfully.`, "success");

    atomicCreateInput.value = "";

    // Close the modal
    atomicModal.hide();
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

