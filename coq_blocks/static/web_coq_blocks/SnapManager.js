import { ConstructorBlock, AtomicBlock, DefinitionBlock } from "./Block.js";
// import {
//     clearSnapTargets,
//     pushSnapTarget,
//     setPreviousSnappedBlocks,
//     clearSnappedBlocks,
//     pushSnappedBlock,
//     setOrderedSnappedBlocks,
//     getBlockObjects,
//     getSnappedBlocks,
//     getSnapTargets,
//     getPlugInBlockPos,
//     getPreviousSnappedBlocks,
//     getOrderedSnappedBlocks
// } from "./store/appStoreActions.js";
export default class SnapManager {
    // Unifikování přístupu, přístup k elementům pouze přes appStore.blockObjects -> .element

    calculateSnapTargets(movedBlockObject, allBlockObjects) {
        // Dynamicky aktualizovat snap body
        let newTargets = [];

        if (movedBlockObject instanceof DefinitionBlock) {
            return newTargets; // Vracíme prázdné pole
        }

        let requiredType = movedBlockObject.dotObject.type;

        allBlockObjects.forEach((blockObject) => {

            // Zákaz snapu sám na sebe
            if (blockObject !== movedBlockObject) {
                let blockElement = blockObject.element;

                // Zkontrolovat, zda první potomek existuje a má třídu 'block-plug'
                if (blockElement) {
                    let plugObjects = blockObject.plugObjects;

                    plugObjects.forEach((plugObject) => {
                        let plugType = plugObject.type;

                        let plugEl = plugObject.element;
                        let rect = plugEl.getBoundingClientRect();

                        // console.log(requiredType + "-vs-" + plugType);
                        if (plugType === requiredType) {
                            newTargets.push({

                                // getBoundingClientRect() dává souřadnice vůči viewportu (oknu)
                                // Pro absolutními souřadnice v dokumentu se musí přičíst scroll offset
                                x: rect.left + rect.width + window.scrollX - 3,
                                y: rect.top + rect.height / 2 + window.scrollY,

                                block: blockObject,
                                plug: plugObject,

                                // Log snap targetů, pro koho jsou (posledně pohnutý block)
                                for: movedBlockObject
                            });
                        }
                    });
                }
            }

        });

        return newTargets;
    }

    /**
     * Vypočítá, které bloky se právě spojily.
     * @param {Array} blockObjects - Všechny bloky
     * @param {Array} snapTargets - Všechny aktivní snap targety
     * @param {number} plugInBlockPos - Konstanta pozice plugu (např. 0.6)
     * @returns {Array} Pole nových snapů [{parent, plugIndex, plug, child}, ...]
     */
    checkForSnap(blockObjects, snapTargets, plugInBlockPos) { // Kontrola které bloky jsou snapnuty
        let newSnappedBlocks = [];

        // Kontrola pozic každého bloku se snap pozicemi
        blockObjects.forEach(blockObject => {
            let rect = blockObject.element.getBoundingClientRect();
            let blockLeft = rect.left + window.scrollX;
            let blockTop = rect.top + window.scrollY;
            let blockHeight = rect.height;

            snapTargets.forEach(snapTarget => {
                let deltaX = Math.abs(snapTarget.x - blockLeft);
                let deltaY = Math.abs(snapTarget.y - (blockTop + blockHeight * plugInBlockPos));

                if (deltaX < 4 && deltaY < 4) { // tolerance 4 px
                    let plugObject = snapTarget.plug;

                    newSnappedBlocks.push({
                        parent: snapTarget.block,
                        plugIndex: plugObject.index,
                        plug: plugObject,
                        child: blockObject
                    });
                }
            });
        });
        return newSnappedBlocks;
    }

    /**
     * Porovná dva seznamy snapů, zda obsahují stejná spojení.
     * Předpokládá, že pořadí bloků ve Storu je stabilní (což obvykle je).
     */
    areSnapsEqual(snapsA, snapsB) {
        // 1. Kontrola délky
        if (snapsA.length !== snapsB.length) return false;

        // 2. Kontrola obsahu (položku po položce)
        for (let i = 0; i < snapsA.length; i++) {
            const a = snapsA[i];
            const b = snapsB[i];

            // Porovnáváme reference na objekty (parent, child, plug)
            // Tyto reference jsou stabilní, pokud se nemazaly/nevytvářely bloky.
            if (a.parent !== b.parent ||
                a.child !== b.child ||
                a.plug !== b.plug) {
                return false;
            }
        }

        return true;
    }

    /**
     * Čistá funkce pro seřazení bloků (zploštění stromu).
     * @param {Array} snappedBlocks - Seznam spojení
     * @returns {Array} Pole polí seřazených bloků
     */
    // Seřazení snapnutých bloků kvůli změně velikostí a zpětnému parsování
    // Kvůli změně velikostí musíš znovu rozmístit snapnuté bloky a to musíš udělat od začátku do konce v pořadí
    orderSnappedBlocks(snappedBlocks) {
        // Najdi kořeny = bloky, které nejsou dítětem nikoho jiného
        let rootBlocks = snappedBlocks.filter(block =>
            !snappedBlocks.some(otherBlock => otherBlock.child === block.parent)
        );

        let allOrdered = [];

        // Pro každý kořen. blok je vlastní fronta a pole se seřazenými bloky 
        rootBlocks.forEach(root => {
            let ordered = [];
            let queue = [root];

            while (queue.length > 0) {
                let currentBlock = queue.shift(); // Odebrat první blok z fronty
                ordered.push(currentBlock); // Přidat blok do uspořádaného pole

                // Najít všechny potomky aktuálního bloku
                let children = snappedBlocks.filter(b => b.parent === currentBlock.child);
                queue = queue.concat(children); // Přidat potomky do fronty
            }

            allOrdered.push(ordered);
        });

        // kontrola, jestli jsme zpracovali všechny
        let flat = allOrdered.flat();
        if (flat.length !== getSnappedBlocks().length) {
            console.error("ORDERING BLOCK FAIL");
        }

        return allOrdered; // pole polí
    }


    /**
     * Vypočítá, které bloky mají být zamčené (nedraggable).
     * Nezasahuje do DOM, jen vrací Set bloků.
     * @param {Array} snappedBlocks 
     * @returns {Set} Množina bloků, které se nemají hýbat
     */
    getBlockedDraggableItems(snappedBlocks) {
        // Nalezení listových snapů
        let leafSnaps = snappedBlocks.filter(block1 =>
            !snappedBlocks.some(block2 => block1.child === block2.parent)
        );

        // Nalezení větvených snapů
        let branchSnaps = snappedBlocks.filter(block1 =>
            snappedBlocks.some(block2 => block1.child === block2.parent)
        );

        // Set všech bloků, které nesmí být draggable (rodiče větvených + rodiče listových)
        let blocked = new Set([
            ...branchSnaps.map(b => b.parent),
            ...leafSnaps.map(b => b.parent),
        ]);

        return blocked;
    }

    /**
     * Vypočítá, které bloky nejsou snapnuté.
     * @param {Array} blockObjects 
     * @returns {Array} Pole bloků, které nejsou snapnuté
     */
    getNotSnappedBlocks(blockObjects, snappedBlocks) {
        let notSnappedBlocks = blockObjects.filter(
            b1 => !snappedBlocks.some(b2 => b1 === b2.parent) &&
                !snappedBlocks.some(b3 => b1 === b3.child)
        );

        return notSnappedBlocks;
    }

}
