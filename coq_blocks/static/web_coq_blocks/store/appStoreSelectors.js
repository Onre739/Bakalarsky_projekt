import { appStore } from './appStore.js';

// Selector functions to access specific parts of the app state

export function getTypeBlockCount(id) {
    const countMap = appStore.getState().typeBlockCount;
    return countMap.has(id) ? countMap.get(id) : 0;
}

export function getDefinitionBlockCount() {
    return appStore.getState().definitionBlockCount;
}

export function getAtomicBlockCount(id) {
    const countMap = appStore.getState().atomicBlockCount;
    return countMap.has(id) ? countMap.get(id) : 0;
}

export function getRawConstructors() {
    return appStore.getState().rawContructors;
}

export function getRawHypothesis() {
    return appStore.getState().rawHypothesis;
}

export function getBlockObjects() {
    return appStore.getState().blockObjects;
}

export function getHypothesisObjects() {
    return appStore.getState().hypothesisObjects;
}

// ------------------- Změna ???? -------------------
export function getSnapTargets() {
    return appStore.getState().snapTargets;
}

export function getSnappedBlocks() {
    return appStore.getState().snappedBlocks;
}

export function getOrderedSnappedBlocks() {
    return appStore.getState().orderedSnappedBlocks;
}

export function getPreviousSnappedBlocks() {
    return appStore.getState().previousSnappedBlocks;
}
// -----------------------------------------------

export function getZIndexCount() {
    return appStore.getState().zIndexCount;
}

export function getResizeMode() {
    return appStore.getState().resizeMode;
}

export function getBlockColors() {
    return appStore.getState().blockColors;
}

export function getBlockColorsCount() {
    return appStore.getState().blockColorsCount;
}

export function getPlugInBlockPos() {
    return appStore.getState().plugInBlockPos;
}

export function getDelBtnWidth() {
    return appStore.getState().delBtnWidth;
}
