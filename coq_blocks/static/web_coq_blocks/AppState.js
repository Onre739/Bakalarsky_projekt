
// Návrhový vzor Singleton
export const AppState = {
    // Počet typů a jeho bloků pomocí Map.set(), get(), has(), delete()
    typeBlockCount: new Map(),

    // Počet bloků definic
    definitionBlockCount: 0,

    // Počet atomických bloků
    atomicBlockCount: 0,

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

    // Uložené definice bloků pro spawn
    savedBlockDefinitions: [],

    // Rozdíl mezi pozicí 0,0 stránky a 0,0 ground elementu, protože interact.js bere 0,0 z groundu
    // docGroundDiffLeft: $("#ground").offset().left,
    // docGroundDiffTop: $("#ground").offset().top,

    // Při různém zoomu stránky se mění velikost borderu !!! Počítám velikost podle Definition bloku
    //borderSize: $(".definition").get(0).getBoundingClientRect().width - $(".definition").get(0).clientWidth,
    resizeMode: "Auto",
    blockColors: ["rgb(255, 0, 0)", "rgb(0, 102, 255)", "rgb(255, 255, 0)", "rgb(0, 128, 0)", "rgb(227, 117, 0)", "rgb(0, 238, 255)", "rgb(234, 0, 255)", "rgb(111, 255, 0)", "rgb(170, 11, 64)", "rgb(98, 47, 0)", "rgb(66, 0, 190)"],
    blockColorsCount: 11,
    plugInBlockPos: 0.6,
    icon1: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16" style="display:inline;"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/></svg>',
    delBtnWidth: 20

}