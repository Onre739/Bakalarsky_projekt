import { appStore } from './appStore.js';

export const getTypeBlockCount = (id) => appStore.getTypeBlockCount(id);
export const getDefinitionBlockCount = () => appStore.getDefinitionBlockCount();
export const getAtomicBlockCount = (id) => appStore.getAtomicBlockCount(id);

export const getRawConstructors = () => appStore.getStateValue('rawContructors');
export const getRawHypothesis = () => appStore.getStateValue('rawHypothesis');

export const getBlockObjects = () => appStore.getBlockObjects();
export const getHypothesisObjects = () => appStore.getStateValue('hypothesisObjects');

export const getSnapTargets = () => appStore.getSnapTargets();
export const getSnappedBlocks = () => appStore.getSnappedBlocks();
export const getOrderedSnappedBlocks = () => appStore.getOrderedSnappedBlocks();
export const getPreviousSnappedBlocks = () => appStore.getPreviousSnappedBlocks();

export const getZIndexCount = () => appStore.getStateValue('zIndexCount');

export const getResizeMode = () => appStore.getResizeMode();

export const getBlockColors = () => appStore.getBlockColors();
export const getBlockColorsCount = () => appStore.getStateValue('blockColorsCount');

export const getPlugInBlockPos = () => appStore.getPlugInBlockPos();
export const getDelBtnWidth = () => appStore.getDelBtnWidth();
