export default class InteractionController {
    constructor(store, snapManager) {
        this.store = store;
        this.snapManager = snapManager;
    }

    initializeAutomaticResizeConfig() {
        interact('.draggable').draggable({
            inertia: false,
            autoScroll: true,
            listeners: {
                start: (event) => {
                    let target = event.target;
                    target.style.zIndex = this.store.getAndIncrementZIndex();

                    // Najít BlockObject podle target elementu
                    let movedBlockObject = this.store.getBlockObjectByElement(target);
                    if (movedBlockObject) {
                        // Najít snap targety
                        this.store.recalculateSnapTargetsSilent(movedBlockObject);
                        console.log("Updated snap targets:", this.store.getSnapTargets());
                    }
                    else console.log("Moved block not found in appStore");
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
                    // Actions after block drop: snap check, resize, drag control, delete buttons
                    this.store.handleBlockDrop();

                    console.log('Drag ended', event);
                    console.log("Snapped blocks:", this.store.getSnappedBlocks());
                    console.log("Ordered snapped blocks:", this.store.getOrderedSnappedBlocks());
                }
            },
            modifiers: [
                interact.modifiers.snap({
                    targets: this.store.getSnapTargets(),
                    range: 30,
                    relativePoints: [{ x: 0, y: this.store.getPlugInBlockPos() }] // Pozice i s borderem
                }),
                interact.modifiers.restrictRect({
                    restriction: 'document',
                    endOnly: true
                })
            ]
        });
    }

    // initializeManualResizeConfig() {
    //     interact('.draggable').draggable({
    //         inertia: false,
    //         autoScroll: true,
    //         listeners: {
    //             start: (event) => {
    //                 let target = event.target;
    //                 target.style.zIndex = this.store.getAndIncrementZIndex();

    //                 // Najít BlockObject podle target elementu
    //                 let movedBlockObject = this.store.getBlockObjects().find(b => b.element === target);
    //                 if (movedBlockObject) {
    //                     // Nové snap targety
    //                     this.snapManager.updateSnapTargets(movedBlockObject);
    //                     console.log("Updated snap targets:", this.store.getSnapTargets());
    //                 }
    //                 else console.log("Moved block not found in appStore");
    //             },

    //             move: (event) => {
    //                 let target = event.target;
    //                 let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    //                 let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    //                 // Zapsání změny pozice
    //                 target.style.transform = `translate(${x}px, ${y}px)`;
    //                 target.setAttribute('data-x', x);
    //                 target.setAttribute('data-y', y);
    //             },

    //             end: (event) => {
    //                 // Výpis všech snapů do pole snappedBlocks
    //                 this.snapManager.checkForSnap();

    //                 // Pouze krajní bloky mohou mít drag + třídy pro delete buttony
    //                 this.snapManager.dragControl();

    //                 // Delete buttony pouze pro nesnapnuté bloky
    //                 this.deleteButtonsControl();

    //                 console.log('Drag ended', event);
    //                 console.log("Snapped blocks:", this.store.getSnappedBlocks());
    //             }
    //         },
    //         modifiers: [
    //             interact.modifiers.snap({
    //                 targets: this.store.getSnapTargets(),
    //                 range: 30,
    //                 relativePoints: [{ x: 0, y: this.store.getPlugInBlockPos() }]
    //             }),
    //             interact.modifiers.restrictRect({
    //                 restriction: 'document',
    //                 endOnly: true
    //             })
    //         ]
    //     })
    //         .resizable({
    //             edges: { left: false, right: false, bottom: true, top: true },
    //             listeners: {
    //                 move(event) {
    //                     let target = event.target;
    //                     let x = (parseFloat(target.getAttribute('data-x')) || 0);
    //                     let y = (parseFloat(target.getAttribute('data-y')) || 0);

    //                     // Aktualizace velikosti elementu
    //                     target.style.width = `${event.rect.width}px`;
    //                     target.style.height = `${event.rect.height}px`;

    //                     // Přizpůsobení pozice při změně velikosti
    //                     x += event.deltaRect.left;
    //                     y += event.deltaRect.top;

    //                     target.style.transform = `translate(${x}px, ${y}px)`;

    //                     target.setAttribute('data-x', x);
    //                     target.setAttribute('data-y', y);
    //                 },
    //                 end: (event) => {
    //                     // Výpis všech snapů do pole snappedBlocks
    //                     this.snapManager.checkForSnap();

    //                     // Pouze krajní bloky mohou mít drag + třídy pro delete buttony
    //                     this.snapManager.dragControl();

    //                     // Delete buttony pouze pro nesnapnuté bloky
    //                     this.deleteButtonsControl();

    //                     console.log('Resize ended', event);
    //                 }
    //             },
    //             modifiers: [
    //                 // minimum size
    //                 interact.modifiers.restrictSize({
    //                     min: { width: 100, height: 50 }
    //                 })
    //             ],
    //             inertia: false
    //         });
    // }

    // switchToAutomatic() {
    //     document.getElementById("resizeHeader").innerText = "Resize mode: Automatic";
    //     this.store.setResizeMode("Auto");
    //     console.log(this.store.getResizeMode());

    //     let blockObjects = this.store.getBlockObjects();
    //     blockObjects.forEach((blockObject) => {
    //         this.removeBlock(blockObject);
    //     });

    //     // Nová konfigurace
    //     this.automaticResizeConfig();
    // }

    // switchToManual() {
    //     document.getElementById("resizeHeader").innerText = "Resize mode: Manual";
    //     this.store.setResizeMode("Manual");
    //     console.log(this.store.getResizeMode());

    //     let blockObjects = this.store.getBlockObjects();
    //     blockObjects.forEach((blockObject) => {
    //         this.removeBlock(blockObject);
    //     });

    //     // Nová konfigurace
    //     this.manualResizeConfig();
    // }

}