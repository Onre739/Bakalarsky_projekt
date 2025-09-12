import { AppState } from "./AppState.js";
import BlockFactory from "./BlockFactory.js";
import { Block } from "./Block.js";
export default class SnapManager {
    // Unifikování přístupu, přístup k elementům pouze přes AppState.blockObjects -> .element

    updateSnapTargets(movedBlockEl) {
        // Zisk block objektu z id elementu
        let movedBlockObject = BlockFactory.getBlockObjFromId(movedBlockEl.id);
        let requiredType = movedBlockObject.dotObject.type;
        console.log("Required type:", requiredType);

        // Dynamicky aktualizovat snap body
        AppState.snapTargets.length = 0;

        AppState.blockObjects.forEach((blockObject) => {
            let blockElement = blockObject.element;

            // Zkontrolovat, zda první potomek existuje a má třídu 'block-plug'
            if (blockElement) {
                let plugObjects = blockObject.plugObjects;

                plugObjects.forEach((plugObject, i) => {
                    let plugElement = $(plugObject.element); // JQUERY element pro .offset()

                    let plugType = plugObject.type;
                    let plugOffset = plugElement.offset();

                    // console.log(requiredType + "-vs-" + plugType);
                    // if (plugType === requiredType) {
                    AppState.snapTargets.push({
                        x: plugOffset.left + plugElement.width() - 1,
                        y: plugOffset.top + plugElement.height() / 2 + 2,
                        block: blockObject,
                        plug: plugObject,
                        // Log snap targetů, pro koho jsou (posledně pohnutý block)
                        for: movedBlockObject
                    });
                    // }
                });
            }
        });
    }

    checkForSnap() { // Kontrola které bloky jsou snapnuty

        // Uložení předchozí verze pole
        AppState.previousSnappedBlocks = AppState.snappedBlocks.slice(); // .slice() pro kopii, ne referenci
        AppState.snappedBlocks.length = 0;

        let blockObjects = AppState.blockObjects;

        // Kontrola pozic každého bloku se snap pozicemi
        blockObjects.forEach(blockObject => {
            let blockOffset = $(blockObject.element).offset();
            AppState.snapTargets.forEach(snapTarget => {
                let deltaX = Math.abs(snapTarget.x - blockOffset.left);
                let deltaY = Math.abs(snapTarget.y - (blockOffset.top + $(blockObject.element).height() * AppState.plugInBlockPos));
                if (deltaX < 4 && deltaY < 4) { // tolerance 4 px
                    console.log("delta: " + deltaX + ", " + deltaY);
                    let plugObject = snapTarget.plug;
                    AppState.snappedBlocks.push({ parent: snapTarget.block, plugIndex: plugObject.index, plug: plugObject, child: blockObject });
                }
            });
        });
    }

    // snapOccured(snappedParent, snappedChild, plug) { // nvm k čemu tu byly parametry???
    snapOccured() { // Akce pokud se projevil snap / unsnap
        let arrayCurr = AppState.snappedBlocks.slice();
        let arrayPrev = AppState.previousSnappedBlocks.slice();

        function objectsEqual(obj1, obj2) {
            return obj1.parent === obj2.parent &&
                obj1.plugIndex === obj2.plugIndex &&
                obj1.plug === obj2.plug &&
                obj1.child === obj2.child;
        }

        // Nalezení společných prvků
        let sameElements = arrayCurr.filter(itemCurr =>
            arrayPrev.some(itemPrev => objectsEqual(itemCurr, itemPrev))
        );

        // Odstranění společných prvků z obou polí, tedy zůstane mi pouze aktuální snap / unsnap
        let uniqueCurr = arrayCurr.filter(itemCurr =>
            !sameElements.some(itemPrev => objectsEqual(itemCurr, itemPrev))
        );
        let uniquePrev = arrayPrev.filter(itemPrev =>
            !sameElements.some(itemCurr => objectsEqual(itemPrev, itemCurr))
        );

        // uniqueCurr == unikátní aktuální snap, tedy nový snap +++
        // uniquePrev == unikátní předchozí snap, tedy nový unsnap ---

        // ------ Arrow pomocné funkce

        // Změna velikosti všech rodičovských bloků, rekurzivní arrow funkce, od konce po začátek snapů
        const resizeParents = (block, heightValue) => {
            // Pokud block nemá jen 1 plug
            if (block.plugsCount !== 1) {
                block.element.style.height =
                    `${block.element.offsetHeight - AppState.borderSize + heightValue}px`;
            }
            let snap = AppState.snappedBlocks.find(s => s.child === block);
            if (snap) resizeParents(snap.parent, heightValue); // rekurze
        };


        // Nové pozice po zvětšení velikostí
        const setNewPosition = () => {
            AppState.orderedSnappedBlocks.forEach((snappedDef) => {
                snappedDef.forEach((snappedBlock) => {
                    // Zisk pozice plugu pro novou pozici child bloku
                    let currentPlugEl = $(snappedBlock.plug.element);
                    let currentPlugElOffset = currentPlugEl.offset();

                    // Aktualizace pozice potomka
                    let x = currentPlugElOffset.left + currentPlugEl.width() - AppState.docGroundDiffLeft - 1;
                    let y = currentPlugElOffset.top + currentPlugEl.height() / 2 - snappedBlock.child.element.offsetHeight * AppState.plugInBlockPos - AppState.docGroundDiffTop + 2;

                    snappedBlock.child.element.style.transform = `translate(${x}px, ${y}px)`;
                    snappedBlock.child.element.setAttribute('data-x', x);
                    snappedBlock.child.element.setAttribute('data-y', y);
                });
            });
        };

        // ------ Porovnávání aktuálních snapů s předchozími snapy

        // Když prev == 0 a curr == 1, tak jde o klasický snap
        if (uniquePrev.length === 0 && uniqueCurr.length === 1) {
            console.log("Just normal SNAP +++");

            let parentCurr = uniqueCurr[0].parent;
            let childCurr = uniqueCurr[0].child;
            let heightValueCurr = childCurr.height;

            // Změna velikosti snapnutých bloků
            resizeParents(parentCurr, +heightValueCurr);

            // Seřazení snapped bloků
            AppState.orderedSnappedBlocks = this.orderSnappedBlocks();

            // Nová pozice pro všechny snapnuté bloky kvůli změně velikosti díky snapu/odsnapu
            setNewPosition();
        }

        // Když prev == 1 a curr == 0, tak jde o klasický UNsnap
        else if (uniqueCurr.length === 0 && uniquePrev.length === 1) {
            console.log("Just normal UNSNAP ---");

            let parentPrev = uniquePrev[0].parent;
            let childPrev = uniquePrev[0].child;
            let heightValuePrev = childPrev.height;

            // Změna velikosti snapnutých bloků
            resizeParents(parentPrev, -heightValuePrev);

            // Seřazení snapped bloků
            AppState.orderedSnappedBlocks = this.orderSnappedBlocks();

            // Nová pozice pro všechny snapnuté bloky kvůli změně velikosti díky snapu/odsnapu
            setNewPosition();

        }

        // Když prev == 0 a curr == 0, tak jde jenom o pohyb
        else if (uniqueCurr.length === 0 && uniquePrev.length === 0) {
            console.log("Just move");
        }

        // Když prev == 1 a curr == 1, tak jde o snap -> snap
        else {  // Drag z 1 snapnutého bloku na 2; unikátní pouze 1 blok kvůli zrušení nelistových dragů
            console.log("At the same time --- & +++ snap");

            let parentCurr = uniqueCurr[0].parent;
            let childCurr = uniqueCurr[0].child;
            let heightValueCurr = childCurr.height;

            let parentPrev = uniquePrev[0].parent;
            let childPrev = uniquePrev[0].child;
            let heightValuePrev = childPrev.height;

            // Prvně zmenšení původních bloků, proto použiju previousSnappedBlocks
            resizeParents(parentPrev, -heightValuePrev);

            // Zvětšení nových bloků
            resizeParents(parentCurr, +heightValueCurr);

            // Seřazení snapped bloků
            AppState.orderedSnappedBlocks = this.orderSnappedBlocks();

            // Nové pozice
            setNewPosition();
        }
    }

    // Seřazení snapnutých bloků kvůli změně velikostí a zpětnému parsování
    // Kvůli změně velikostí musíš znovu rozmístit snapnuté bloky a to musíš udělat od začátku do konce v pořadí
    orderSnappedBlocks() {
        // Najdi kořeny = bloky, které nejsou dítětem nikoho jiného
        let rootBlocks = AppState.snappedBlocks.filter(block =>
            !AppState.snappedBlocks.some(otherBlock => otherBlock.child === block.parent)
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
                let children = AppState.snappedBlocks.filter(b => b.parent === currentBlock.child);
                queue = queue.concat(children); // Přidat potomky do fronty
            }

            allOrdered.push(ordered);
        });

        // kontrola, jestli jsme zpracovali všechny
        let flat = allOrdered.flat();
        if (flat.length !== AppState.snappedBlocks.length) {
            console.error("ORDERING BLOCK FAIL");
        }

        return allOrdered; // pole polí
    }

    dragControl() {
        // Nalezení listových snapů
        let leafSnaps = AppState.snappedBlocks.filter(block1 =>
            !AppState.snappedBlocks.some(block2 => block1.child === block2.parent)
        );

        // Nalezení větvených snapů
        let branchSnaps = AppState.snappedBlocks.filter(block1 =>
            AppState.snappedBlocks.some(block2 => block1.child === block2.parent)
        );

        // Set všech bloků, které nesmí být draggable (rodiče větvených + rodiče listových)
        let blocked = new Set([
            ...branchSnaps.map(b => b.parent),
            ...leafSnaps.map(b => b.parent),
        ]);

        // Přidání / odebrání třídy draggable pro všechny bloky
        AppState.blockObjects.forEach(block => {
            if (blocked.has(block)) {
                block.element.classList.remove("draggable");
            } else {
                block.element.classList.add("draggable");
            }
        });
    }

}
