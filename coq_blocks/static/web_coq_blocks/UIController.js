import { AppState } from "./AppState.js";
import SnapManager from "./SnapManager.js";

export default class UIController {
    constructor() {
        this.snapManager = new SnapManager();
    }

    switchToAutomatic() {
        document.getElementById("resizeHeader").innerText = "Automatic Resize";
        AppState.resizeMode = "Auto";
        console.log(AppState.resizeMode);

        let blocks = Array.from($(".block"));
        blocks.forEach(function (block) {
            if (!block.classList.contains("definition")) {
                block.remove();
            }
        });

        // Nová konfigurace
        this.automaticResizeConfig();
    }

    switchToManual() {
        document.getElementById("resizeHeader").innerText = "Manual Resize";
        AppState.resizeMode = "Manual";
        console.log(AppState.resizeMode);

        let blocks = Array.from($(".block"));
        blocks.forEach(function (block) {
            if (!block.classList.contains("definition")) {
                block.remove();
            }
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
                },

                move: (event) => {
                    let target = event.target;
                    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    // Zapsání změny pozice
                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);

                    // Log pro nové pozice
                    console.log(" ------------------ MOVE ------------------ ");
                    console.log("new X: " + x + ", Y: " + y +
                        ", X+DiffLeft: " + String(Number(x + AppState.docGroundDiffLeft)) +
                        ", Y+DiffTop: " + String(Number(y + AppState.docGroundDiffTop)));
                    console.log("Position of DOT X: " + String(Number(x + AppState.docGroundDiffLeft)) +
                        ", Y: " + String(Number(y + AppState.docGroundDiffTop + target.offsetHeight / 2)));

                    // Dynamická aktualizace snap targets
                    this.snapManager.updateSnapTargets(target);

                    interact('.draggable').draggable({
                        modifiers: [
                            interact.modifiers.snap({
                                targets: AppState.snapTargets, // Nové nastavení snapTargets
                                range: 30,
                                relativePoints: [{ x: 0, y: AppState.plugInBlockPos }]
                            }),
                            interact.modifiers.restrictRect({
                                restriction: 'document',
                                endOnly: true
                            })
                        ]
                    });
                },

                end: (event) => {
                    // Výpis všech snapů do pole snappedBlocks
                    this.snapManager.checkForSnap();

                    // Pouze krajní bloky mohou mít drag + třídy pro delete buttony
                    this.snapManager.dragControl();

                    // Delete buttony pouze pro nesnapnuté bloky
                    this.deleteButtonsControl();

                    console.log('Drag ended', event);
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
                },

                move: (event) => {
                    let target = event.target;
                    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    // Zapsání změny pozice
                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);

                    // Log pro nové pozice
                    console.log(" ------------------ MOVE ------------------ ");
                    console.log("new X: " + x + ", Y: " + y +
                        ", X+DiffLeft: " + String(Number(x + AppState.docGroundDiffLeft)) +
                        ", Y+DiffTop: " + String(Number(y + AppState.docGroundDiffTop)));
                    console.log("Position of DOT X: " + String(Number(x + AppState.docGroundDiffLeft)) +
                        ", Y: " + String(Number(y + AppState.docGroundDiffTop + target.offsetHeight / 2)));

                    // Dynamická aktualizace snap targets
                    this.snapManager.updateSnapTargets(target);

                    interact('.draggable').draggable({
                        modifiers: [
                            interact.modifiers.snap({
                                targets: AppState.snapTargets, // Nové nastavení snapTargets
                                range: 30,
                                relativePoints: [{ x: 0, y: AppState.plugInBlockPos }]
                            }),
                            interact.modifiers.restrictRect({
                                restriction: 'document',
                                endOnly: true
                            })
                        ]
                    });
                },

                end: (event) => {
                    // Výpis všech snapů do pole snappedBlocks
                    this.snapManager.checkForSnap();

                    // Akce s novými snapy
                    this.snapManager.snapOccured();

                    // Pouze krajní bloky mohou mít drag + třídy pro delete buttony
                    this.snapManager.dragControl();

                    // Delete buttony pouze pro nesnapnuté bloky
                    this.deleteButtonsControl();

                    console.log('Drag ended', event);
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
        });
    }


    deleteButtonsControl() {
        this.addDeleteBtnClass();

        let blocks = Array.from(document.getElementsByClassName("block"));
        blocks.forEach(function (block) {
            let deleteBtn = block.querySelector(".deleteButton");
            if (deleteBtn) {
                deleteBtn.remove();
            }
        });

        let blocksWBtn = Array.from(document.getElementsByClassName("hasDeleteButton"));
        blocksWBtn.forEach((block) => {
            let deleteBtn = document.createElement("button");
            deleteBtn.setAttribute("class", "deleteButton");
            // deleteBtn.setAttribute("onclick", "deleteBlock(this)");
            deleteBtn.addEventListener("click", () => this.deleteBlock(deleteBtn));
            deleteBtn.innerText = "X";
            block.appendChild(deleteBtn);
        });
    }

    addDeleteBtnClass() {
        // DELETE BUTTONY
        let blocks = Array.from(document.getElementsByClassName("block"));

        let notSnappedBlocks = blocks.filter(
            block1 => !AppState.snappedBlocks.some(block2 => block1 === block2.parent) &&
                !AppState.snappedBlocks.some(block3 => block1 === block3.child)
        );

        notSnappedBlocks = notSnappedBlocks.filter(block => !block.classList.contains("definition"));

        blocks.forEach(block => block.classList.remove("hasDeleteButton"));
        notSnappedBlocks.forEach(block => block.classList.add("hasDeleteButton"));
    }

    deleteBlock(button) {
        let parent = button.parentElement;
        parent.remove();
    }
}
