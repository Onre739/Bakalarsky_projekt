import { AppState } from "./AppState.js";
import { ConstructorBlock } from "./Block.js";
import SnapManager from "./SnapManager.js";

export default class UIController {
    constructor() {
        this.snapManager = new SnapManager();
    }

    switchToAutomatic() {
        document.getElementById("resizeHeader").innerText = "Resize mode: Automatic";
        AppState.resizeMode = "Auto";
        console.log(AppState.resizeMode);

        let blockObjects = AppState.blockObjects;
        blockObjects.forEach((blockObject) => {
            this.removeBlock(blockObject);
        });

        // Nová konfigurace
        this.automaticResizeConfig();
    }

    switchToManual() {
        document.getElementById("resizeHeader").innerText = "Resize mode: Manual";
        AppState.resizeMode = "Manual";
        console.log(AppState.resizeMode);

        let blockObjects = AppState.blockObjects;
        blockObjects.forEach((blockObject) => {
            this.removeBlock(blockObject);
        });

        // Nová konfigurace
        this.manualResizeConfig();
    }

    manualResizeConfig() {
        interact('.draggable').draggable({
            inertia: false,
            autoScroll: true,
            listeners: {
                start: (event) => {
                    let target = event.target;
                    target.style.zIndex = AppState.zIndexCount;
                    AppState.zIndexCount += 1;

                    // Najít BlockObject podle target elementu
                    let movedBlockObject = AppState.blockObjects.find(b => b.element === target);
                    if (movedBlockObject) {
                        // Nové snap targety
                        this.snapManager.updateSnapTargets(movedBlockObject);
                        console.log("Updated snap targets:", AppState.snapTargets);
                    }
                    else console.log("Moved block not found in AppState");
                },

                move: (event) => {
                    let target = event.target;
                    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    // Zapsání změny pozice
                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                },

                end: (event) => {
                    // Výpis všech snapů do pole snappedBlocks
                    this.snapManager.checkForSnap();

                    // Pouze krajní bloky mohou mít drag + třídy pro delete buttony
                    this.snapManager.dragControl();

                    // Delete buttony pouze pro nesnapnuté bloky
                    this.deleteButtonsControl();

                    console.log('Drag ended', event);
                    console.log("Snapped blocks:", AppState.snappedBlocks);
                }
            },
            modifiers: [
                interact.modifiers.snap({
                    targets: AppState.snapTargets,
                    range: 30,
                    relativePoints: [{ x: 0, y: AppState.plugInBlockPos }]
                }),
                interact.modifiers.restrictRect({
                    restriction: 'document',
                    endOnly: true
                })
            ]
        })
            .resizable({
                edges: { left: false, right: false, bottom: true, top: true },
                listeners: {
                    move(event) {
                        let target = event.target;
                        let x = (parseFloat(target.getAttribute('data-x')) || 0);
                        let y = (parseFloat(target.getAttribute('data-y')) || 0);

                        // Aktualizace velikosti elementu
                        target.style.width = `${event.rect.width}px`;
                        target.style.height = `${event.rect.height}px`;

                        // Přizpůsobení pozice při změně velikosti
                        x += event.deltaRect.left;
                        y += event.deltaRect.top;

                        target.style.transform = `translate(${x}px, ${y}px)`;

                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                    },
                    end: (event) => {
                        // Výpis všech snapů do pole snappedBlocks
                        this.snapManager.checkForSnap();

                        // Pouze krajní bloky mohou mít drag + třídy pro delete buttony
                        this.snapManager.dragControl();

                        // Delete buttony pouze pro nesnapnuté bloky
                        this.deleteButtonsControl();

                        console.log('Resize ended', event);
                    }
                },
                modifiers: [
                    // minimum size
                    interact.modifiers.restrictSize({
                        min: { width: 100, height: 50 }
                    })
                ],
                inertia: false
            });
    }

    automaticResizeConfig() {
        interact('.draggable').draggable({
            inertia: false,
            autoScroll: true,
            listeners: {
                start: (event) => {
                    let target = event.target;
                    target.style.zIndex = AppState.zIndexCount;
                    AppState.zIndexCount += 1;

                    // Najít BlockObject podle target elementu
                    let movedBlockObject = AppState.blockObjects.find(b => b.element === target);
                    if (movedBlockObject) {
                        // Najít snap targety
                        this.snapManager.updateSnapTargets(movedBlockObject);
                        console.log("Updated snap targets:", AppState.snapTargets);
                    }
                    else console.log("Moved block not found in AppState");
                },

                move: (event) => {
                    // DŮLEŽITÉ, x a y se počítají od GROUND ELEMENTU !! ne od začátku dokumentu
                    let target = event.target;
                    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    // Zapsání změny pozice
                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                },

                end: (event) => {
                    // Výpis všech snapů do pole snappedBlocks
                    this.snapManager.checkForSnap();

                    // Akce s novými snapy, zvětšení / změnšení atd...
                    this.snapManager.snapOccured();

                    // Pouze krajní bloky mohou mít drag + třídy pro delete buttony
                    this.snapManager.dragControl();

                    // Delete buttony pouze pro nesnapnuté bloky
                    this.deleteButtonsControl();

                    console.log('Drag ended', event);
                    console.log("Snapped blocks:", AppState.snappedBlocks);
                    console.log("Ordered snapped blocks:", AppState.orderedSnappedBlocks);
                }
            },
            modifiers: [
                interact.modifiers.snap({
                    targets: AppState.snapTargets,
                    range: 30,
                    relativePoints: [{ x: 0, y: AppState.plugInBlockPos }] // Pozice i s borderem
                }),
                interact.modifiers.restrictRect({
                    restriction: 'document',
                    endOnly: true
                })
            ]
        });
    }

    // ------------- Delete buttony

    deleteButtonsControl() {
        this.addDeleteBtnClass();

        // Prvně odeberu všechny delete buttony
        let blockObjects = AppState.blockObjects;
        blockObjects.forEach((blockObject) => {
            let deleteBtn = blockObject.element.querySelector(".deleteButton");
            if (deleteBtn) {
                deleteBtn.remove();
            }
        });

        // Přidám delete buttony tam kam patří
        blockObjects.forEach((blockObject) => {
            if (blockObject.element.classList.contains("hasDeleteButton")) {

                let deleteBtn = document.createElement("button");
                deleteBtn.setAttribute("class", "deleteButton");
                deleteBtn.addEventListener("click", () => this.removeBlock(blockObject));
                deleteBtn.innerText = "X";
                blockObject.element.appendChild(deleteBtn);

            }
        });
    }

    addDeleteBtnClass() {
        // DELETE BUTTONY
        let blockObjects = AppState.blockObjects;

        let notSnappedBlocks = blockObjects.filter(
            b1 => !AppState.snappedBlocks.some(b2 => b1 === b2.parent) &&
                !AppState.snappedBlocks.some(b3 => b1 === b3.child)
        );

        blockObjects.forEach(b => b.element.classList.remove("hasDeleteButton"));
        notSnappedBlocks.forEach(b => b.element.classList.add("hasDeleteButton"));
    }

    removeBlock(block) {
        // 1) smazat DOM element
        block.element.remove();

        // 2) smazat z blockObjects
        AppState.blockObjects = AppState.blockObjects.filter(b => b !== block);

        // 3) smazat snapy
        AppState.snappedBlocks = AppState.snappedBlocks.filter(
            s => s.parent !== block && s.child !== block
        );

        // DŮLEŽITÉ !!!
        // - NESMÍŠ VYTVÁŘET NOVÝ AppState.snapTargets !!! PROTOŽE ZTRATÍŠ REFERENCI PRO INTERACT JS

        // // 4) případně přepočítat snapTargets
        // AppState.snapTargets = AppState.snapTargets.filter(
        //     t => t.block !== block && t.plug.parentBlock !== block
        // );

        AppState.orderedSnappedBlocks = AppState.orderedSnappedBlocks.filter(
            b => b !== block
        );
    }

}
