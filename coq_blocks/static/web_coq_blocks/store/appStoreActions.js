import { appStore } from './appStore.js';

export const initTypeBlockCount = (id) => appStore.initTypeBlockCount(id);
export const incrementTypeBlockCount = (id) => appStore.incrementTypeBlockCount(id);
export const deleteTypeBlockCount = (id) => appStore.deleteTypeBlockCount(id);
export const getTypeBlockCount = (id) => appStore.getTypeBlockCount(id);

export const initAtomicBlockCount = (id) => appStore.initAtomicBlockCount(id);
export const incrementAtomicBlockCount = (id) => appStore.incrementAtomicBlockCount(id);
export const deleteAtomicBlockCount = (id) => appStore.deleteAtomicBlockCount(id);
export const getAtomicBlockCount = (id) => appStore.getAtomicBlockCount(id);

export const incrementDefinitionBlockCount = () => appStore.incrementDefinitionBlockCount();
export const getDefinitionBlockCount = () => appStore.getDefinitionBlockCount();

export const getAndIncrementZIndex = () => appStore.getAndIncrementZIndex();

export const addBlockObject = (obj) => appStore.addBlockObject(obj);
export const removeBlockObject = (obj) => appStore.removeBlockObject(obj);
export const clearBlockObjects = () => appStore.clearBlockObjects();
export const getBlockObjects = () => appStore.getBlockObjects();

export const clearSnapTargets = () => appStore.clearSnapTargets();
export const pushSnapTarget = (t) => appStore.pushSnapTarget(t);
export const replaceSnapTargets = (targets) => appStore.replaceSnapTargets(targets);
export const getSnapTargets = () => appStore.getSnapTargets();

export const clearSnappedBlocks = () => appStore.clearSnappedBlocks();
export const pushSnappedBlock = (obj) => appStore.pushSnappedBlock(obj);
export const setSnappedBlocks = (arr) => appStore.setSnappedBlocks(arr);
export const getSnappedBlocks = () => appStore.getSnappedBlocks();

export const setOrderedSnappedBlocks = (arr) => appStore.setOrderedSnappedBlocks(arr);
export const getOrderedSnappedBlocks = () => appStore.getOrderedSnappedBlocks();

export const setPreviousSnappedBlocks = (arr) => appStore.setPreviousSnappedBlocks(arr);
export const getPreviousSnappedBlocks = () => appStore.getPreviousSnappedBlocks();

export const pushRawHypothesis = (item) => appStore.pushRawHypothesis(item);
export const pushRawConstructor = (item) => appStore.pushRawConstructor(item);

export const setResizeMode = (m) => appStore.setResizeMode(m);
export const getResizeMode = () => appStore.getResizeMode();

export const replaceSnapTargetsInPlace = (targets) => appStore.replaceSnapTargetsInPlace(targets);

export const getPlugInBlockPos = () => appStore.getPlugInBlockPos();
export const setPlugInBlockPos = (p) => appStore.setPlugInBlockPos(p);

export const getDelBtnWidth = () => appStore.getDelBtnWidth();
export const getBlockColors = () => appStore.getBlockColors();


