import { Store } from './Store.js';

// Návrhový vzor Store - globální stav aplikace
export class appStore extends Store {

    constructor(snapManager, workspaceView) {
        this.snapManager = snapManager;
        this.workspaceView = workspaceView;
        super({

            // Počet typů a jeho bloků pomocí Map.set(), get(), has(), delete()
            typeBlockCount: new Map(),

            // Počet bloků definic
            definitionBlockCount: 0,

            // Počet atomických bloků podle id (Map: id -> count)
            atomicBlockCount: new Map(),

            // zparsovaná (raw) data z DefinitionLoader.js, teď to nikde nepoužívám 
            rawContructors: [],
            rawHypothesis: [],

            // Objekty bloků a hypotéz z Block.js
            blockObjects: [],
            hypothesisObjects: [],

            // Pole možných snapů pro dragovaný blok: x, y, block, plug, for
            snapTargets: [],

            // Pole snapnutých bloků: parent, plugIndex, plug, child
            snappedBlocks: [],

            // Pole seřazených snapnutých bloků pro zvětšování a zmenšování, NEJSOU SEŘAZENY PODLE PLUGŮ !!! (1,2,...)
            orderedSnappedBlocks: [],

            // Pole předchozích snapnutých bloků, pro zjištění rozdílu / změny
            previousSnappedBlocks: [],

            zIndexCount: 1,

            // Rozdíl mezi pozicí 0,0 stránky a 0,0 ground elementu, protože interact.js bere 0,0 z groundu
            // docGroundDiffLeft: $("#ground").offset().left,
            // docGroundDiffTop: $("#ground").offset().top,

            // Při různém zoomu stránky se mění velikost borderu !!! Počítám velikost podle Definition bloku
            //borderSize: $(".definition").get(0).getBoundingClientRect().width - $(".definition").get(0).clientWidth,
            resizeMode: "Auto",
            blockColors: ["rgb(255, 0, 0)", "rgb(0, 102, 255)", "rgb(255, 255, 0)",
                "rgb(0, 128, 0)", "rgb(227, 117, 0)", "rgb(0, 238, 255)",
                "rgb(234, 0, 255)", "rgb(111, 255, 0)", "rgb(170, 11, 64)",
                "rgb(98, 47, 0)", "rgb(66, 0, 190)"],
            blockColorsCount: 11,
            plugInBlockPos: 0.6,
            delBtnWidth: 20

        });
    }

    // ------------- Block counts (type / atomic) -------------
    initTypeBlockCount(id) {
        const state = this.getState();
        if (!state.typeBlockCount.has(id)) {
            state.typeBlockCount.set(id, 0);
            this.notify();
        }
    }

    incrementTypeBlockCount(id) {
        const state = this.getState();
        const cnt = state.typeBlockCount.has(id) ? state.typeBlockCount.get(id) : -1;
        if (cnt >= 0) {
            state.typeBlockCount.set(id, cnt + 1);
            this.notify();
            return cnt + 1;
        }
        return -1;
    }

    deleteTypeBlockCount(id) {
        const state = this.getState();
        if (state.typeBlockCount.has(id)) {
            state.typeBlockCount.delete(id);
            this.notify();
        }
    }

    getTypeBlockCount(id) {
        const state = this.getState();
        return state.typeBlockCount.has(id) ? state.typeBlockCount.get(id) : 0;
    }

    // ---------
    initAtomicBlockCount(id) {
        const state = this.getState();
        if (!state.atomicBlockCount.has(id)) {
            state.atomicBlockCount.set(id, 0);
            this.notify();
        }
    }

    incrementAtomicBlockCount(id) {
        const state = this.getState();
        const cnt = state.atomicBlockCount.has(id) ? state.atomicBlockCount.get(id) : -1;
        if (cnt >= 0) {
            state.atomicBlockCount.set(id, cnt + 1);
            this.notify();
            return cnt + 1;
        }
        return -1;
    }

    deleteAtomicBlockCount(id) {
        const state = this.getState();
        if (state.atomicBlockCount.has(id)) {
            state.atomicBlockCount.delete(id);
            this.notify();
        }
    }

    getAtomicBlockCount(id) {
        const state = this.getState();
        return state.atomicBlockCount.has(id) ? state.atomicBlockCount.get(id) : 0;
    }

    // ------------- Definition / generic counters -------------
    incrementDefinitionBlockCount() {
        const state = this.getState();
        state.definitionBlockCount += 1;
        this.notify();
        return state.definitionBlockCount;
    }

    getDefinitionBlockCount() {
        return this.getState().definitionBlockCount;
    }

    // ------------- Z-index helper - returns current z index then increments it -------------
    getAndIncrementZIndex() {
        const state = this.getState();
        const z = state.zIndexCount;
        state.zIndexCount += 1;
        this.notify();
        return z;
    }

    // ------------- Block objects manipulation -------------
    addBlockObject(obj) {
        const state = this.getState();
        state.blockObjects.push(obj);
        this.notify();
    }

    removeBlockObject(obj) {
        const state = this.getState();
        state.blockObjects = state.blockObjects.filter(b => b !== obj);
        this.notify();
    }

    clearBlockObjects() {
        const state = this.getState();
        state.blockObjects.length = 0;
        this.notify();
    }

    getBlockObjects() {
        return this.getState().blockObjects;
    }

    getBlockObjectByElement(element) {
        const state = this.getState();
        return state.blockObjects.find(b => b.element === element);
    }

    // ------------- Snap targets / snapped blocks helpers -------------
    // NOTE: some code (interact.js) keeps references to the snapTargets array; prefer clearing and pushing
    clearSnapTargets() {
        const state = this.getState();
        state.snapTargets.length = 0;
        this.notify();
    }

    pushSnapTarget(target) {
        const state = this.getState();
        state.snapTargets.push(target);
        this.notify();
    }

    replaceSnapTargets(targets) {
        const state = this.getState();
        state.snapTargets.length = 0;
        targets.forEach(t => state.snapTargets.push(t));
        this.notify();
    }

    getSnapTargets() {
        return this.getState().snapTargets;
    }

    // ---------
    clearSnappedBlocks() {
        const state = this.getState();
        state.snappedBlocks.length = 0;
        this.notify();
    }

    pushSnappedBlock(obj) {
        const state = this.getState();
        state.snappedBlocks.push(obj);
        this.notify();
    }

    setSnappedBlocks(arr) {
        const state = this.getState();
        state.snappedBlocks = arr;
        this.notify();
    }

    getSnappedBlocks() {
        return this.getState().snappedBlocks;
    }

    // ---------
    setOrderedSnappedBlocks(arr) {
        const state = this.getState();
        state.orderedSnappedBlocks = arr;
        this.notify();
    }

    getOrderedSnappedBlocks() {
        return this.getState().orderedSnappedBlocks;
    }

    // ---------
    setPreviousSnappedBlocks(arr) {
        const state = this.getState();
        state.previousSnappedBlocks = arr;
        this.notify();
    }

    getPreviousSnappedBlocks() {
        return this.getState().previousSnappedBlocks;
    }

    // ------------- Raw data pushers (DefinitionLoader uses these) -------------
    pushRawHypothesis(item) {
        const state = this.getState();
        state.rawHypothesis.push(item);
        this.notify();
    }

    pushRawConstructor(item) {
        const state = this.getState();
        state.rawContructors.push(item);
        this.notify();
    }

    // ------------- Resize mode setter -------------
    setResizeMode(mode) {
        const state = this.getState();
        state.resizeMode = mode;
        this.notify();
    }

    getResizeMode() {
        return this.getState().resizeMode;
    }

    // ------------- Utility setters -------------
    replaceSnapTargetsInPlace(targets) {
        const state = this.getState();
        // clear existing array (preserve reference) and push new
        state.snapTargets.length = 0;
        targets.forEach(t => state.snapTargets.push(t));
        this.notify();
    }

    // ------------- Plug in block position ------------

    getPlugInBlockPos() {
        return this.getState().plugInBlockPos;
    }

    setPlugInBlockPos(pos) {
        const state = this.getState();
        state.plugInBlockPos = pos;
        this.notify();
    }

    // ------------- Del button width -------------
    getDelBtnWidth() {
        return this.getState().delBtnWidth;
    }

    // ------------- Block colors -------------
    getBlockColors() {
        return this.getState().blockColors;
    }

    // Generic getter helper
    getStateValue(key) {
        return this.getState()[key];
    }




    // ------------------------------------------------------------------------

    // -------------- InteractionController --------------

    removeBlock(blockToRemove) {
        const state = this.state;

        // 0) smazat DOM element, přesun do WorkspaceView, měl by to dělat automaticky po notify 
        //block.element.remove();

        // 1) Smazat z blockObjects
        state.blockObjects = state.blockObjects.filter(b => b !== blockToRemove);

        // 2) Snapnuté bloky, není potřebné, pojistka
        state.snappedBlocks = state.snappedBlocks.filter(
            s => s.parent !== blockToRemove && s.child !== blockToRemove
        );

        // 3) SnapTargets 
        // DŮLEŽITÉ !!! - NESMÍŠ VYTVÁŘET NOVÝ appStore.snapTargets !!! PROTOŽE ZTRATÍŠ REFERENCI PRO INTERACT JS
        const validTargets = state.snapTargets.filter(
            t => t.block !== blockToRemove && t.plug.parentBlockEl !== blockToRemove.element
        );
        // Vyprázdnění a naplnění původního pole (zachová referenci)
        state.snapTargets.length = 0;
        state.snapTargets.push(...validTargets);

        this.notify();
    }

    recalculateSnapTargetsSilent(movedBlockObject) {
        const state = this.state;

        const newTargets = this.snapManager.calculateSnapTargets(movedBlockObject, state.blockObjects);
        // Update in-place (aby interact.js viděl změnu v poli)
        state.snapTargets.length = 0;
        state.snapTargets.push(...newTargets);

        // ŽÁDNÉ this.notify() !!!
    }

    handleBlockDrop() {
        const state = this.state;

        // 1. Výpočet nových snapů
        const newCalculatedSnaps = this.snapManager.checkForSnap(
            state.blockObjects,
            state.snapTargets,
            state.plugInBlockPos
        );

        // 2. Porovnání snapů
        // Pokud se nic nezměnilo, nic neděláme a končíme!
        // Ušetříme překreslování i výpočty layoutu.
        const hasChanged = !this.snapManager.areSnapsEqual(
            state.snappedBlocks,
            newCalculatedSnaps
        );

        if (!hasChanged) {
            // Žádná změna v topologii -> možná jen posun, ale to řeší interact.js
            console.log("Drop bez změny snapů - skip update");
            return;
        }

        // 4. Pokud se snapy změnily, pokračujeme...
        const previousSnaps = state.snappedBlocks.slice();
        const orderedSnaps = this.snapManager.orderSnappedBlocks(newCalculatedSnaps);

        // 5. Hromadná aktualizace stavu
        this.state.previousSnappedBlocks = previousSnaps;
        this.state.snappedBlocks = newCalculatedSnaps;
        this.state.orderedSnappedBlocks = orderedSnaps;

        // 6. Oznámení View
        // Notify pouze při změně snapů
        this.notify();
    }

}
