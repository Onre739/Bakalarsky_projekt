import { AppState } from "./AppState.js";

export default class SnapManager {

    updateSnapTargets(movedBlock) {
        let dotElement = movedBlock.querySelector(".block-dot");
        let requiredType = dotElement.innerText;
        console.log("Required type:", requiredType);

        // Dynamicky aktualizovat snap body
        AppState.snapTargets.length = 0;

        $(".block").each(function () {
            let block = $(this);
            // .get(0) převede jQuery objekt na DOM objekt
            let blockElement = block.get(0);

            // Zkontrolovat, zda první potomek existuje a má třídu 'block-plug'
            if (blockElement) {
                let plugs = $(blockElement).find(".block-plug");
                let i = 0;
                plugs.each(function () {
                    let plug = $(this);
                    let plugType = plug.get(0).innerText;
                    let plugOffset = plug.offset();
                    console.log(requiredType + "-vs-" + plugType);
                    // if (plugType === requiredType) {
                    AppState.snapTargets.push({
                        x: plugOffset.left + plug.width() - 1,
                        y: plugOffset.top + plug.height() / 2 + 2,
                        block: blockElement,
                        plug: i,
                        for: movedBlock
                    });
                    // }
                    i++;
                });
            }
        });
    }

    checkForSnap() { // Kontrola které bloky jsou snapnuty

        // Uložení předchozí verze pole
        AppState.previousSnappedBlocks = AppState.snappedBlocks.slice(); // .slice() pro kopii, ne referenci
        AppState.snappedBlocks.length = 0;

        let blocks = $(".block").toArray();

        // Kontrola pozic každého bloku se snap pozicemi
        blocks.forEach(block => {
            let blockOffset = $(block).offset();
            AppState.snapTargets.forEach(snapTarget => {
                let deltaX = Math.abs(snapTarget.x - blockOffset.left);
                let deltaY = Math.abs(snapTarget.y - (blockOffset.top + $(block).height() * AppState.plugInBlockPos));
                if (deltaX < 4 && deltaY < 4) { // tolerance 4 px
                    console.log("delta: " + deltaX + ", " + deltaY);
                    let plug = $(snapTarget.block).find(".block-plug").get(snapTarget.plug);
                    AppState.snappedBlocks.push({ parent: snapTarget.block, plugIndex: snapTarget.plug, plug: plug, child: block });
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

        // Když prev == 0 a curr == 1, tak jde o klasický snap
        if (uniquePrev.length === 0 && uniqueCurr.length === 1) {
            console.log("Just normal SNAP +++");

            let parent = uniqueCurr[0].parent;
            let child = uniqueCurr[0].child;
            let heightValue = child.offsetHeight;

            // Změna velikosti všech rodičovských bloků
            // .style.height nastavuje výšku pouze obsahu; .offsetHeight vrací výšku i s borderem a paddingem, proto musím odečíst velikost 1 borderu
            while (true) {
                let stop = true;
                AppState.snappedBlocks.forEach(function (snappedBlock) {
                    if (snappedBlock.child === parent) {
                        if (!parent.classList.contains("1plug")) {
                            // Zvětšení rodičovského bloku, pokud se nejedná o 1plug
                            parent.style.height = `${parent.offsetHeight - AppState.borderSize + heightValue}px`;
                        }
                        stop = false;

                        child = parent;
                        parent = snappedBlock.parent;
                    }
                });

                if (stop) {  // Konečné zvětšení posledního bloku
                    if (!parent.classList.contains("1plug")) {
                        parent.style.height = `${parent.offsetHeight - AppState.borderSize + heightValue}px`;
                    }
                    break;
                }
            }

            AppState.orderedSnappedBlocks = this.orderSnappedBlocks();

            // Nová pozice pro všechny snapnuté bloky kvůli změně velikosti díky snapu/odsnapu
            AppState.orderedSnappedBlocks.forEach(function (snappedBlock) {
                // Zisk pozice plugu pro novou pozici child bloku
                let currentPlug = $(snappedBlock.plug);
                let currentPlugOffset = currentPlug.offset();

                // Aktualizace pozice potomka
                let x = currentPlugOffset.left + currentPlug.width() - AppState.docGroundDiffLeft - 1;
                let y = currentPlugOffset.top + currentPlug.height() / 2 - snappedBlock.child.offsetHeight * AppState.plugInBlockPos - AppState.docGroundDiffTop + 2;

                snappedBlock.child.style.transform = `translate(${x}px, ${y}px)`;
                snappedBlock.child.setAttribute('data-x', x);
                snappedBlock.child.setAttribute('data-y', y);
            });

        } else if (uniqueCurr.length === 0 && uniquePrev.length === 1) {
            console.log("Just normal UNSNAP ---");

            // // Zvětšení rodičovského bloku
            // uniquePrev[0].parent.style.height = `${uniquePrev[0].parent.offsetHeight - uniquePrev[0].child.offsetHeight}px`;

            let parent = uniquePrev[0].parent;
            let child = uniquePrev[0].child;
            let heightValue = child.offsetHeight;

            // Změna velikosti všech rodičovských bloků
            while (true) {
                let stop = true;
                AppState.snappedBlocks.forEach(function (snappedBlock) {
                    if (snappedBlock.child === parent) {
                        if (!parent.classList.contains("1plug")) {
                            // Zvětšení rodičovského bloku, pokud se nejedná o 1plug
                            parent.style.height = `${parent.offsetHeight - AppState.borderSize - heightValue}px`;
                        }
                        stop = false;

                        child = parent;
                        parent = snappedBlock.parent;
                    }
                });

                if (stop) {  // Konečné zvětšení posledního bloku
                    if (!parent.classList.contains("1plug")) {
                        parent.style.height = `${parent.offsetHeight - AppState.borderSize - heightValue}px`;
                    }
                    break;
                }
            }

            AppState.orderedSnappedBlocks = this.orderSnappedBlocks();

            // Nová pozice pro všechny snapnuté bloky kvůli změně velikosti díky snapu/odsnapu
            AppState.orderedSnappedBlocks.forEach(function (snappedBlock) {
                if (!objectsEqual(snappedBlock, uniquePrev[0])) {
                    // Zisk pozice plugu pro novou pozici child bloku
                    let currentPlug = $(snappedBlock.plug);
                    let currentPlugOffset = currentPlug.offset();

                    // Aktualizace pozice potomka
                    let x = currentPlugOffset.left + currentPlug.width() - AppState.docGroundDiffLeft - 1;
                    let y = currentPlugOffset.top + currentPlug.height() / 2 - snappedBlock.child.offsetHeight * AppState.plugInBlockPos - AppState.docGroundDiffTop + 2;

                    snappedBlock.child.style.transform = `translate(${x}px, ${y}px)`;
                    snappedBlock.child.setAttribute('data-x', x);
                    snappedBlock.child.setAttribute('data-y', y);
                }
            });

        } else if (uniqueCurr.length === 0 && uniquePrev.length === 0) {
            console.log("Just move");
        } else {  // Drag z 1 snapnutého bloku na 2; unikátní pouze 1 blok kvůli zrušení nelistových dragů
            console.log("At the same time --- & +++ snap");

            // Prvně zmenšení původních bloků, proto použiju previousSnappedBlocks
            let parent = uniquePrev[0].parent;
            let child = uniquePrev[0].child;
            let heightValue = child.offsetHeight;

            while (true) {
                let stop = true;
                AppState.previousSnappedBlocks.forEach(function (snappedBlock) {
                    if (snappedBlock.child === parent) {
                        if (!parent.classList.contains("1plug")) {
                            // Zvětšení rodičovského bloku, pokud se nejedná o 1plug
                            parent.style.height = `${parent.offsetHeight - AppState.borderSize - heightValue}px`;
                        }
                        stop = false;

                        child = parent;
                        parent = snappedBlock.parent;
                    }
                });

                if (stop) { // Konečné zvětšení posledního bloku
                    if (!parent.classList.contains("1plug")) {
                        parent.style.height = `${parent.offsetHeight - AppState.borderSize - heightValue}px`;
                    }
                    break;
                }
            }

            // Zvětšení nových bloků
            parent = uniqueCurr[0].parent;
            child = uniqueCurr[0].child;
            heightValue = child.offsetHeight;

            while (true) {
                let stop = true;
                AppState.snappedBlocks.forEach(function (snappedBlock) {
                    if (snappedBlock.child === parent) {
                        if (!parent.classList.contains("1plug")) {
                            // Zvětšení rodičovského bloku, pokud se nejedná o 1plug
                            parent.style.height = `${parent.offsetHeight - AppState.borderSize + heightValue}px`;
                        }
                        stop = false;

                        child = parent;
                        parent = snappedBlock.parent;
                    }
                });

                if (stop) {  // Konečné zvětšení posledního bloku
                    if (!parent.classList.contains("1plug")) {
                        parent.style.height = `${parent.offsetHeight - AppState.borderSize + heightValue}px`;
                    }
                    break;
                }
            }

            // Nové pozice
            AppState.orderedSnappedBlocks = this.orderSnappedBlocks();

            AppState.orderedSnappedBlocks.forEach(function (snappedBlock) {
                // Zisk pozice plugu pro novou pozici child bloku
                let currentPlug = $(snappedBlock.plug);
                let currentPlugOffset = currentPlug.offset();

                // Aktualizace pozice potomka
                let x = currentPlugOffset.left + currentPlug.width() - AppState.docGroundDiffLeft - 1;
                let y = currentPlugOffset.top + currentPlug.height() / 2 - snappedBlock.child.offsetHeight * AppState.plugInBlockPos - AppState.docGroundDiffTop + 2;

                snappedBlock.child.style.transform = `translate(${x}px, ${y}px)`;
                snappedBlock.child.setAttribute('data-x', x);
                snappedBlock.child.setAttribute('data-y', y);
            });
        }
    }

    // Seřazení snapnutých bloků kvůli změně velikostí
    // Kvůli změně velikostí musíš znovu rozmístit snapnuté bloky a to musíš udělat od začátku do konce v pořadí
    orderSnappedBlocks() {
        // Najít kořenové bloky (bloky, které nemají rodiče)
        let rootBlocks = AppState.snappedBlocks.filter(block =>
            !AppState.snappedBlocks.some(otherBlock => otherBlock.child === block.parent)
        );

        let orderedBlocks = [];
        let queue = rootBlocks.slice(); // Zkopírovat kořenové bloky do fronty

        while (queue.length > 0) {
            let currentBlock = queue.shift(); // Odebrat první blok z fronty
            orderedBlocks.push(currentBlock); // Přidat blok do uspořádaného pole

            // Najít všechny potomky aktuálního bloku
            let children = AppState.snappedBlocks.filter(block => block.parent === currentBlock.child);
            queue = queue.concat(children); // Přidat potomky do fronty
        }

        if (orderedBlocks.length === AppState.snappedBlocks.length) {
            return orderedBlocks;
        } else {
            console.error("ORDERING BLOCK FAIL");
            return [];
        }
    }

    dragControl() {
        // Nalezení listových snapů
        let leafSnaps = AppState.snappedBlocks.filter(block1 =>
            !AppState.snappedBlocks.some(block2 => block1.child === block2.parent)
        );

        // Listové bloky
        let leafBlocks = leafSnaps.map(block => block.child);

        // Nalezení větvených snapů
        let branchSnaps = AppState.snappedBlocks.filter(block1 =>
            AppState.snappedBlocks.some(block2 => block1.child === block2.parent)
        );

        // Větvené bloky + rodiče listových bloků, jde o set kvůli rušení duplicit
        let branchBlocks = new Set(branchSnaps.map(block => block.parent).concat(leafSnaps.map(block => block.parent)));

        console.log("leaf blocks:", leafBlocks);
        console.log("branch blocks:", branchBlocks);

        // Přidání třídy draggable pro všechny bloky, kromě bloku definition
        $(".block").each(function () {
            if (!this.classList.contains("definition")) {
                this.classList.add("draggable");
            }
        });

        // Odebrání draggable pro větvené bloky
        branchBlocks.forEach(function (block) {
            block.classList.remove("draggable");
        });
    }

}
