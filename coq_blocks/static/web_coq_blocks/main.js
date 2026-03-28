import AppStore from "./store/app_store.js";
import BlockFactory from "./factories/block_factory.js";
import DefinitionLoader from "./services/definition_loader.js";
import COQExporter from "./services/coq_exporter.js";
import SavedTypeManager from "./services/saved_type_manager.js";
import InteractionController from './views/interaction_controller.js';
import SnapManager from './services/snap_manager.js';
import WorkspaceView from './views/workspace_view.js';
import SidebarView from './views/sidebar_view.js';

// ----- Initialize store and main components -----
const snapManager = new SnapManager();
const savedTypeManager = new SavedTypeManager();
const definitionLoader = new DefinitionLoader();
const coqExporter = new COQExporter();

const store = new AppStore(snapManager, savedTypeManager, null);

const blockFactory = new BlockFactory(store);
store.setBlockFactory(blockFactory);

// Handler for exporting
const handleSingleExport = (rootBlock) => {
    const allSnaps = store.getSnappedBlocks();

    try {
        const coqString = coqExporter.exportSingle(rootBlock, allSnaps);

        if (coqString) {
            workspaceView.showExportResult(coqString);
            workspaceView.printAlert("Export successful!!", "success");

            const showExportsBtn = document.getElementById('showExportsBtn');
            if (showExportsBtn) showExportsBtn.click();
        }

    } catch (error) {
        console.error(error);
        workspaceView.printAlert(error.message, "danger");
    }
};

const workspaceView = new WorkspaceView(store, snapManager, handleSingleExport);
const sidebarView = new SidebarView(store);

// Initialize interaction controller, interact.js
const interactionController = new InteractionController(store, snapManager);
interactionController.initializeAutomaticResizeConfig();

// Subscribe views to store updates
workspaceView.subscribeToStore();
sidebarView.subscribeToStore();

// ----- New Definition Block button -----
const newDefBtn = document.getElementById("newDefBtn");

newDefBtn.addEventListener("click", () => {
    store.spawnDefinitionBlock();
});

// ----- Clear Playground button -----
const clearPlaygroundBtn = document.getElementById("clearPlaygroundBtn");

if (clearPlaygroundBtn) {
    clearPlaygroundBtn.addEventListener("click", () => {
        if (confirm("Opravdu chcete smazat celou plochu? Tato akce je nevratná.")) {
            store.clearPlayground();
        }
    });
}
// ----- Classic Type Creation button -----
const loadBtn = document.getElementById("loadBtn");
const defInput = document.getElementById("defInput");

loadBtn.addEventListener("click", async () => {
    const definitionText = defInput.value;

    try {
        const data = await definitionLoader.load(definitionText);
        console.log("Loaded definition data:", data);

        store.importDefinitions(data);
        defInput.value = "";
        console.log("Definitions loaded successfully.");
        workspaceView.printAlert("Definition loaded successfully.", "success");

    } catch (error) {
        console.error("Error loading definition:", error);
        alert("Failed to load definition. See console for details.");
        workspaceView.printAlert("Failed to load definition.", "danger");
    }
});

console.log("Application initialized.");