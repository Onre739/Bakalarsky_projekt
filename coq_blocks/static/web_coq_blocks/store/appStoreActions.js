import { appStore } from './appStore.js';

// Store metody pro aktualizaci stavu

// ------------- Block counts (type / atomic) -------------
export function initTypeBlockCount(id) {
    const state = appStore.getState();
    if (!state.typeBlockCount.has(id)) {
        state.typeBlockCount.set(id, 0);
        appStore.notify();
    }
}

export function incrementTypeBlockCount(id) {
    const state = appStore.getState();
    const cnt = state.typeBlockCount.has(id) ? state.typeBlockCount.get(id) : -1;
    if (cnt >= 0) {
        state.typeBlockCount.set(id, cnt + 1);
        appStore.notify();
        return cnt + 1;
    }
    return -1;
}

export function deleteTypeBlockCount(id) {
    const state = appStore.getState();
    if (state.typeBlockCount.has(id)) {
        state.typeBlockCount.delete(id);
        appStore.notify();
    }
}

export function getTypeBlockCount(id) {
    const state = appStore.getState();
    return state.typeBlockCount.has(id) ? state.typeBlockCount.get(id) : 0;
}
// ---------
export function initAtomicBlockCount(id) {
    const state = appStore.getState();
    if (!state.atomicBlockCount.has(id)) {
        state.atomicBlockCount.set(id, 0);
        appStore.notify();
    }
}

export function incrementAtomicBlockCount(id) {
    const state = appStore.getState();
    const cnt = state.atomicBlockCount.has(id) ? state.atomicBlockCount.get(id) : -1;
    if (cnt >= 0) {
        state.atomicBlockCount.set(id, cnt + 1);
        appStore.notify();
        return cnt + 1;
    }
    return -1;
}

export function deleteAtomicBlockCount(id) {
    const state = appStore.getState();
    if (state.atomicBlockCount.has(id)) {
        state.atomicBlockCount.delete(id);
        appStore.notify();
    }
}

export function getAtomicBlockCount(id) {
    const state = appStore.getState();
    return state.atomicBlockCount.has(id) ? state.atomicBlockCount.get(id) : 0;
}

// ------------- Definition / generic counters -------------
export function incrementDefinitionBlockCount() {
    const state = appStore.getState();
    state.definitionBlockCount += 1;
    appStore.notify();
    return state.definitionBlockCount;
}

export function getDefinitionBlockCount() {
    return appStore.getState().definitionBlockCount;
}

// ------------- Z-index helper - returns current z index then increments it -------------
export function getAndIncrementZIndex() {
    const state = appStore.getState();
    const z = state.zIndexCount;
    state.zIndexCount += 1;
    appStore.notify();
    return z;
}

// ------------- Block objects manipulation -------------
export function addBlockObject(obj) {
    const state = appStore.getState();
    state.blockObjects.push(obj);
    appStore.notify();
}

export function removeBlockObject(obj) {
    const state = appStore.getState();
    state.blockObjects = state.blockObjects.filter(b => b !== obj);
    appStore.notify();
}

export function clearBlockObjects() {
    const state = appStore.getState();
    state.blockObjects.length = 0;
    appStore.notify();
}

export function getBlockObjects() {
    return appStore.getState().blockObjects;
}

// ------------- Snap targets / snapped blocks helpers -------------
// NOTE: some code (interact.js) keeps references to the snapTargets array; prefer clearing and pushing
export function clearSnapTargets() {
    const state = appStore.getState();
    state.snapTargets.length = 0;
    appStore.notify();
}

export function pushSnapTarget(target) {
    const state = appStore.getState();
    state.snapTargets.push(target);
    appStore.notify();
}

export function replaceSnapTargets(targets) {
    const state = appStore.getState();
    state.snapTargets.length = 0;
    targets.forEach(t => state.snapTargets.push(t));
    appStore.notify();
}

export function getSnapTargets() {
    return appStore.getState().snapTargets;
}
// ---------
export function clearSnappedBlocks() {
    const state = appStore.getState();
    state.snappedBlocks.length = 0;
    appStore.notify();
}

export function pushSnappedBlock(obj) {
    const state = appStore.getState();
    state.snappedBlocks.push(obj);
    appStore.notify();
}

export function setSnappedBlocks(arr) {
    const state = appStore.getState();
    state.snappedBlocks = arr;
    appStore.notify();
}

export function getSnappedBlocks() {
    return appStore.getState().snappedBlocks;
}
// ---------
export function setOrderedSnappedBlocks(arr) {
    const state = appStore.getState();
    state.orderedSnappedBlocks = arr;
    appStore.notify();
}


export function getOrderedSnappedBlocks() {
    return appStore.getState().orderedSnappedBlocks;
}
// ---------
export function setPreviousSnappedBlocks(arr) {
    const state = appStore.getState();
    state.previousSnappedBlocks = arr;
    appStore.notify();
}

export function getPreviousSnappedBlocks() {
    return appStore.getState().previousSnappedBlocks;
}

// ------------- Raw data pushers (DefinitionLoader uses these) -------------
export function pushRawHypothesis(item) {
    const state = appStore.getState();
    state.rawHypothesis.push(item);
    appStore.notify();
}

export function pushRawConstructor(item) {
    const state = appStore.getState();
    state.rawContructors.push(item);
    appStore.notify();
}

// ------------- Resize mode setter -------------
export function setResizeMode(mode) {
    const state = appStore.getState();
    state.resizeMode = mode;
    appStore.notify();
}

export function getResizeMode() {
    return appStore.getState().resizeMode;
}

// ------------- Utility setters -------------
export function replaceSnapTargetsInPlace(targets) {
    const state = appStore.getState();
    // clear existing array (preserve reference) and push new
    state.snapTargets.length = 0;
    targets.forEach(t => state.snapTargets.push(t));
    appStore.notify();
}

// ------------- Plug in block position ------------

export function getPlugInBlockPos() {
    return appStore.getState().plugInBlockPos;
}

export function setPlugInBlockPos(pos) {
    const state = appStore.getState();
    state.plugInBlockPos = pos;
    appStore.notify();
}

// ------------- Del button width -------------
export function getDelBtnWidth() {
    return appStore.getState().delBtnWidth;
}

// ------------- Block colors -------------
export function getBlockColors() {
    return appStore.getState().blockColors;
}

// ------------- Generic setter when needed -------------
// export function setStateValue(key, value) {
//     const state = appStore.getState();
//     state[key] = value;
//     appStore.notify();
// }

// ------------- Generic getter helper -------------
// export function getStateValue(key) {
//     return appStore.getState()[key];
// }


