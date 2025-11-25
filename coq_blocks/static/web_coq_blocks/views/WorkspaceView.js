export default class WorkspaceView {
    constructor(groundElement, store, snapManager) {
        this.ground = groundElement;
        this.store = store;
        this.snapManager = snapManager;
    }

    initialize() {
        // Inicializace workspace view
    }

    subscribeToStore() {
        this.store.subscribe(() => {
            this.updateUI();
        });
    }

    updateUI() {
        const blockObjects = this.store.getBlockObjects();
        const currentSnaps = this.store.getSnappedBlocks();
        const previousSnaps = this.store.getPreviousSnappedBlocks();
        const plugInBlockPos = this.store.getPlugInBlockPos();
        const orderedSnaps = this.store.getOrderedSnappedBlocks();

        // 1. Synchronizace DOM elementů (přidání/odebrání bloků)
        this.syncBlocksWithDOM(blockObjects);

        // 2. Block resize
        this.afterSnapActions(currentSnaps, previousSnaps, plugInBlockPos, orderedSnaps);

        // 3. Drag control
        const blockedDraggableItems = this.snapManager.getBlockedDraggableItems(currentSnaps);
        this.draggableClassControl(blockObjects, blockedDraggableItems);

        // 4. Delete button control
        const notSnappedBlocks = this.snapManager.getNotSnappedBlocks(blockObjects, currentSnaps);
        const removeBlockCallback = (block) => this.store.removeBlock(block);
        this.deleteBtnClassControl(notSnappedBlocks, blockObjects, removeBlockCallback);

    }

    draggableClassControl(blockObjects, blockedDraggableItems) {
        //Přidání / odebrání třídy draggable pro všechny bloky

        blockObjects.forEach(block => {
            if (blockedDraggableItems.has(block)) {
                block.element.classList.remove("draggable");
            } else {
                block.element.classList.add("draggable");
            }
        });

    }

    deleteBtnClassControl(notSnappedBlocks, blockObjects, removeBlockCallback) {
        // 1. Pro rychlejší vyhledávání si uděláme Set z nesnapnutých bloků
        const notSnappedSet = new Set(notSnappedBlocks);

        // 2. Projdeme všechny existující bloky
        blockObjects.forEach((blockObject) => {
            let deleteBtn = blockObject.element.querySelector(".deleteButton");

            // Zjistíme, zda tento blok má mít tlačítko
            const shouldHaveButton = notSnappedSet.has(blockObject);

            if (shouldHaveButton && !deleteBtn) {
                // A) MÁ mít tlačítko, ale NEMÁ ho -> Vytvořit
                deleteBtn = document.createElement("button");
                deleteBtn.setAttribute("class", "deleteButton");
                deleteBtn.innerText = "X";

                // DŮLEŽITÉ: stopPropagation, aby kliknutí nespustilo drag bloku
                deleteBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    removeBlockCallback(blockObject);
                });

                blockObject.element.appendChild(deleteBtn);

            } else if (!shouldHaveButton && deleteBtn) {
                // B) NEMÁ mít tlačítko, ale MÁ ho -> Smazat
                deleteBtn.remove();
            }

        });
    }

    // Funkce automatické odebírání elementů z DOMu, které už nejsou ve store !!!
    // Má se spouštět po notify
    syncBlocksWithDOM(blockObjects) {
        // 1. Získat všechny bloky, které jsou aktuálně v DOMu (mají třídu .block)
        const domBlocks = Array.from(this.ground.querySelectorAll('.block'));

        // Vytvoříme Set IDček z dat pro rychlé hledání
        const dataIds = new Set(blockObjects.map(b => b.id));

        domBlocks.forEach(domEl => {
            // Předpokládám, že element.id odpovídá block.id
            const id = domEl.getAttribute('id');

            // Pokud element je v DOMu, ale jeho ID už není v datech -> SMAZAT
            if (!dataIds.has(id)) {
                domEl.remove();
            }
        });
    }


    /**
     * Řeší logiku po snapu (změna velikosti rodičů, nové pozice).
     * Mění DOM elementům výšku a pozici (side-effect na View), ale nemění Store.
     * @param {Array} currentSnappedBlocks - Aktuálně vypočítané snapy
     * @param {Array} previousSnappedBlocks - Snapy z minulého kroku (pro porovnání změn)
     * @param {number} plugInBlockPos 
     * @param {Array} orderedSnappedBlocks - Seřazené snapy (pole polí)
     */
    afterSnapActions(currentSnappedBlocks, previousSnappedBlocks, plugInBlockPos, orderedSnappedBlocks) { // Akce pokud se projevil snap / unsnap
        let arrayCurr = currentSnappedBlocks.slice();
        let arrayPrev = previousSnappedBlocks.slice();

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

                // Při různém zoomu stránky se mění velikost borderu!!!
                // offsetHeight zahrnuje obsah + padding + border, proto odečítám border
                block.element.style.height =
                    `${block.element.offsetHeight + heightValue}px`;
            }
            let snap = currentSnappedBlocks.find(s => s.child === block);
            if (snap) resizeParents(snap.parent, heightValue); // rekurze
        };

        // Nové pozice po zvětšení velikostí
        const applyNewPositions = () => {
            orderedSnappedBlocks.forEach((snappedDef) => {
                snappedDef.forEach((snappedBlock) => {

                    // Zisk pozice plugu pro novou pozici child bloku
                    let plugEl = snappedBlock.plug.element;
                    let plugRect = plugEl.getBoundingClientRect();

                    let plugLeft = plugRect.left + window.scrollX;
                    let plugTop = plugRect.top + window.scrollY;
                    let plugWidth = plugRect.width;
                    let plugHeight = plugRect.height;

                    // Rozdíl mezi pozicí 0,0 stránky a 0,0 ground elementu, protože interact.js bere 0,0 z groundu
                    // getBoundingClientRect je pozice před borderem a paddingem -> proto je musím přičíst
                    let groundEl = document.getElementById("ground");
                    let groundRect = groundEl.getBoundingClientRect();
                    let groundStyle = getComputedStyle(groundEl);

                    let docGroundDiffLeft = groundRect.left + parseFloat(groundStyle.borderLeftWidth) + parseFloat(groundStyle.paddingLeft);
                    let docGroundDiffTop = groundRect.top + parseFloat(groundStyle.borderTopWidth) + parseFloat(groundStyle.paddingTop);

                    // Nová pozice child bloku
                    let x = plugLeft + plugWidth - docGroundDiffLeft - 3;
                    let y = plugTop + plugHeight / 2 - snappedBlock.child.element.offsetHeight * plugInBlockPos - docGroundDiffTop;

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
            let heightValueCurr = childCurr.element.offsetHeight;

            // Změna velikosti snapnutých bloků
            resizeParents(parentCurr, +heightValueCurr);

            // Nová pozice pro všechny snapnuté bloky kvůli změně velikosti díky snapu/odsnapu
            applyNewPositions();
        }

        // Když prev == 1 a curr == 0, tak jde o klasický UNsnap
        else if (uniqueCurr.length === 0 && uniquePrev.length === 1) {
            console.log("Just normal UNSNAP ---");

            let parentPrev = uniquePrev[0].parent;
            let childPrev = uniquePrev[0].child;
            let heightValuePrev = childPrev.element.offsetHeight;

            // Změna velikosti snapnutých bloků
            resizeParents(parentPrev, -heightValuePrev);

            // Nová pozice pro všechny snapnuté bloky kvůli změně velikosti díky snapu/odsnapu
            applyNewPositions();
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
            let heightValueCurr = childCurr.element.offsetHeight;

            let parentPrev = uniquePrev[0].parent;
            let childPrev = uniquePrev[0].child;
            let heightValuePrev = childPrev.element.offsetHeight;

            // Prvně zmenšení původních bloků, proto použiju previousSnappedBlocks
            resizeParents(parentPrev, -heightValuePrev);

            // Zvětšení nových bloků
            resizeParents(parentCurr, +heightValueCurr);

            // Nové pozice
            applyNewPositions();
        }
    }

}