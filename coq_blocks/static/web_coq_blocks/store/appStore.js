import { Store } from './Store.js';

// Návrhový vzor Store - globální stav aplikace
export const appStore = new Store({
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

