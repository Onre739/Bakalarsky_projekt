import { Store } from './Store.js';

// Design pattern: Singleton Store for application state management
export default class appStore extends Store {

    constructor(snapManager, savedTypeManager, blockFactory) {
        super({

            // Count of types and their blocks using Map.set(), get(), has(), delete()
            typeBlockCount: new Map(),

            // Count of definition blocks
            definitionBlockCount: 0,

            // Count of atomic blocks by id (Map: id -> count)
            atomicBlockCount: new Map(),

            // Objects of blocks and hypotheses from Block.js
            blockObjects: [],
            hypothesisObjects: [],

            // Array of possible snap targets for a dragged block: x, y, block, plug, for
            snapTargets: [],

            // Array of snapped blocks: parent, plugIndex, plug, child
            snappedBlocks: [],

            // Array of ordered snapped blocks for size changes, NOT ORDERED BY PLUGS !!! (1,2,...)
            orderedSnappedBlocks: [],

            // Saved types from SavedTypeManager
            savedTypes: [],

            zIndexCount: 1,

            resizeMode: "Auto",
            blockColors: ["rgb(255, 0, 0)", "rgb(0, 102, 255)", "rgb(255, 255, 0)",
                "rgb(0, 128, 0)", "rgb(227, 117, 0)", "rgb(0, 238, 255)",
                "rgb(234, 0, 255)", "rgb(111, 255, 0)", "rgb(170, 11, 64)",
                "rgb(98, 47, 0)", "rgb(66, 0, 190)"],
            blockColorsCount: 11,
            plugInBlockPos: 0.6,
        });

        this.snapManager = snapManager;
        this.savedTypeManager = savedTypeManager;
        this.blockFactory = blockFactory;

        // Load saved types from SavedTypeManager into the state
        this.loadSavedTypes();
    }

    // Setter injection for BlockFactory (circular dependency)
    setBlockFactory(blockFactory) {
        this.blockFactory = blockFactory;
    }

    // ------------- Block counts (type / atomic / definition) -------------
    getTypeBlockCount(id) {
        const state = this.getState();
        return state.typeBlockCount.has(id) ? state.typeBlockCount.get(id) : 0;
    }

    getAtomicBlockCount(id) {
        const state = this.getState();
        return state.atomicBlockCount.has(id) ? state.atomicBlockCount.get(id) : 0;
    }

    getDefinitionBlockCount() {
        return this.getState().definitionBlockCount;
    }

    // ------------- Z-index helper - returns current z index then increments it -------------
    getAndIncrementZIndex() {
        const state = this.getState();
        const z = state.zIndexCount;
        state.zIndexCount += 1;
        // this.notify();
        return z;
    }

    // ------------- Block objects manipulation -------------
    getBlockObjects() {
        return this.getState().blockObjects;
    }

    getBlockObjectByElement(element) {
        const state = this.getState();
        return state.blockObjects.find(b => b.element === element);
    }

    // ------------- Snap targets -------------
    getSnapTargets() {
        return this.getState().snapTargets;
    }

    // ---------
    getSnappedBlocks() {
        return this.getState().snappedBlocks;
    }

    // --------- Ordered snapped blocks -------------
    getOrderedSnappedBlocks() {
        return this.getState().orderedSnappedBlocks;
    }

    // ------------- Saved types manipulation -------------
    getSavedTypes() {
        return this.getState().savedTypes;
    }

    // ------------- Resize mode setter -------------
    getResizeMode() {
        return this.getState().resizeMode;
    }

    // ------------- Plug in block position ------------

    getPlugInBlockPos() {
        return this.getState().plugInBlockPos;
    }

    // ------------- Block colors -------------
    getBlockColors() {
        return this.getState().blockColors;
    }

    // ------------------------------------------------------------------------
    // -------------- SavedTypeManager + SidebarView --------------
    loadSavedTypes() {
        const data = this.savedTypeManager.loadData();
        this.state.savedTypes = data;
        this.notify();
    }

    addSavedType(rawTypeData, sort) {
        let dataToSave = rawTypeData;

        // Transform parameters for "clasic" types
        if (sort === "clasic") {
            dataToSave = {
                explicitConstructors: rawTypeData.explicitConstructors,
                implicitConstructors: rawTypeData.implicitConstructors,
                name: rawTypeData.name,

                // Transform { type: ["A"] } to { "A": null }
                typeParameters: rawTypeData.typeParameters.flatMap(param => {
                    if (param.type && Array.isArray(param.type)) {
                        return param.type.map(t => ({ [t]: null }));
                    }
                    return [];
                })
            };
        }

        // 1. Save to localStorage via SavedTypeManager
        const newSavedTypes = this.savedTypeManager.addItem(
            this.state.savedTypes,
            dataToSave, // Transformed data
            sort
        );

        // 2. Actualize state
        this.state.savedTypes = newSavedTypes;
        this.notify();
    }

    removeSavedType(id) {
        const newSavedTypes = this.savedTypeManager.removeItem(this.state.savedTypes, id);
        this.state.savedTypes = newSavedTypes;
        this.notify();
    }

    spawnAtomicBlock(typeItem) {
        // 1. Counter
        let currentCount = this.state.atomicBlockCount.get(typeItem.id) || 0;
        this.state.atomicBlockCount.set(typeItem.id, currentCount + 1);

        // 2. Block ID
        const blockId = `${typeItem.id}:${currentCount}`;
        //console.log(`Spawning atomic block [${typeItem.dataType}] with ID: ${blockId}`);

        // 3. Create instance via BlockFactory
        const newBlock = this.blockFactory.createAtomicBlock(typeItem.dataType, blockId);

        // 4. Save
        this.state.blockObjects.push(newBlock);
        this.notify();
    }

    spawnClasicBlock(constructor, typeName, typeParameters, typeId) {
        // 1. Counter
        let currentCount = this.state.typeBlockCount.get(typeId) || 0;
        this.state.typeBlockCount.set(typeId, currentCount + 1);

        // 2. Block ID
        const blockId = `${typeId}:${currentCount}`;

        const color = this.state.blockColors[currentCount % this.state.blockColorsCount];

        // 3. Create instance via BlockFactory
        const newBlock = this.blockFactory.createConstructorBlock(
            constructor,
            typeName,
            typeParameters,
            blockId,
            color
        );

        // 4. Save
        this.state.blockObjects.push(newBlock);
        this.notify();
    }

    spawnDefinitionBlock() {
        const id = `defBlock:${this.state.definitionBlockCount++}`;
        const newBlock = this.blockFactory.createDefinitionBlock(id);
        this.state.blockObjects.push(newBlock);
        this.notify();
    }

    updateTypeParameters(typeId, updatedParameters) {
        // 1. New savedTypes with updated parameters
        const newSavedTypes = this.state.savedTypes.map(item => {
            if (item.id === typeId) {
                return {
                    ...item,
                    dataType: {
                        ...item.dataType,
                        typeParameters: updatedParameters
                    }
                };
            }
            return item;
        });

        // 2. Save to localStorage
        this.savedTypeManager.saveData(newSavedTypes);

        // 3. Update state
        this.state.savedTypes = newSavedTypes;

        // 4. Remove blocks of this type from workspace
        const blocksToRemove = this.state.blockObjects.filter(block =>
            block.id.startsWith(typeId + ":")
        );

        blocksToRemove.forEach(block => {
            this.removeBlock(block);
        });

        // 5. Notify views
        this.notify();
    }

    // -------------- InteractionController + WorkspaceView --------------

    removeBlock(blockToRemove) {
        const state = this.state;

        // 1) Remove from blockObjects
        state.blockObjects = state.blockObjects.filter(b => b !== blockToRemove);

        // 2) Remove from snappedBlocks, not needed
        state.snappedBlocks = state.snappedBlocks.filter(
            s => s.parent !== blockToRemove && s.child !== blockToRemove
        );

        // 3) Remove snapTargets 
        const validTargets = state.snapTargets.filter(
            t => t.block !== blockToRemove && t.plug.parentBlockEl !== blockToRemove.element
        );

        // CANT reassign, MUST keep reference for interact.js!!!
        state.snapTargets.length = 0;
        state.snapTargets.push(...validTargets);

        this.notify();
    }

    recalculateSnapTargetsSilent(movedBlockObject) {
        const state = this.state;

        // Free the plug occupied by movedBlockObject (if any)
        const currentSnap = state.snappedBlocks.find(s => s.child === movedBlockObject);
        if (currentSnap) {
            currentSnap.plug.occupied = false;
        }

        const newTargets = this.snapManager.calculateSnapTargets(movedBlockObject, state.blockObjects);
        // Update in-place, CAN'T reassign !!! KEEP REFERENCE !!!
        state.snapTargets.length = 0;
        state.snapTargets.push(...newTargets);

        // NO this.notify() !!!
    }

    handleBlockDrop(movedBlock) {
        const state = this.state;
        const prevSnaps = state.snappedBlocks; // Old snaps

        // 1. Keep previous snaps except those involving movedBlock
        const snapsToKeep = prevSnaps.filter(s => s.child !== movedBlock);

        // 2. New snaps for movedBlock, snapTargets exists only for movedBlock
        const newConnection = this.snapManager.checkForSnap(
            state.blockObjects,
            state.snapTargets,
            state.plugInBlockPos
        );

        // 3. Combine previous and new snaps
        const nextSnaps = [...snapsToKeep, ...newConnection];

        // 4. Diff - check if snaps changed
        const hasChanged = !this.snapManager.areSnapsEqual(prevSnaps, nextSnaps);

        if (!hasChanged) {
            console.log("Drop without changes - skip update");

            // Still need to update plug occupancy, just in case
            this.snapManager.updatePlugOccupancy(state.blockObjects, state.snappedBlocks);
            return;
        }

        // 5. Update state with new snaps
        const orderedSnaps = this.snapManager.orderSnappedBlocks(nextSnaps);

        this.state.snappedBlocks = nextSnaps;
        this.state.orderedSnappedBlocks = orderedSnaps;

        // 6. Update plug occupancy
        this.snapManager.updatePlugOccupancy(state.blockObjects, state.snappedBlocks);

        this.notify();
    }

    // ------------------------------------------------------------------------
    importDefinitions(data) {
        if (data.hypothesis) {
            this.state.rawHypothesis.push(...data.hypothesis);
        }

        if (data.newTypes) {
            data.newTypes.forEach(newType => {
                this.addSavedType(newType, "clasic");
            });
        }

        this.notify();
    }

}
