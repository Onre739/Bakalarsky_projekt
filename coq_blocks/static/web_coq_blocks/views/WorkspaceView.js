import { DefinitionBlock, ConstructorBlock, AtomicBlock } from "../models/Block.js";
export default class WorkspaceView {
    constructor(store, snapManager, exportCallback) {
        this.ground = document.getElementById("ground");
        this.store = store;
        this.snapManager = snapManager;
        this.exportCallback = exportCallback;

        const LAYOUT_CONFIG = {
            PADDING_TOP: 20,      // Padding for block name
            PADDING_BOTTOM: 10,
            MIN_ROW_HEIGHT: 50,   // Row for plug, minimum height if no child is snapped
            ROW_GAP: 2,           // Gap between rows
        };

        this.LAYOUT_CONFIG = LAYOUT_CONFIG;
    }

    subscribeToStore() {
        this.store.subscribe(() => {
            this.updateUI();
        });
    }

    updateUI() {
        const blockObjects = this.store.getBlockObjects();
        const currentSnaps = this.store.getSnappedBlocks();
        const dotYPosition = this.store.getDotYPosition();
        const orderedSnaps = this.store.getOrderedSnappedBlocks();

        // 1. Synchronize DOM elements (adding/removing blocks)
        this.syncBlocksWithDOM(blockObjects);

        // 2. Block resize
        this.afterSnapActions(blockObjects, dotYPosition, orderedSnaps, currentSnaps);

        // 3. Delete button control
        const notSnappedBlocks = this.snapManager.getNotSnappedBlocks(blockObjects, currentSnaps);
        const removeBlockCallback = (block) => this.store.removeBlock(block);
        this.deleteBtnClassControl(notSnappedBlocks, blockObjects, removeBlockCallback);

        // 4. Export button control
        this.bindExportButtons(blockObjects);

    }

    bindExportButtons(blockObjects) {
        blockObjects.forEach(block => {
            const icon = block.element.querySelector(".export-icon");

            // Custom flag 'hasExportListener' -> in HTML atribute: data-has-export-listener="true" 
            if (icon && !icon.dataset.hasExportListener) {

                icon.addEventListener("click", (e) => {
                    e.stopPropagation();

                    if (this.exportCallback) {
                        this.exportCallback(block);
                    }
                });

                icon.dataset.hasExportListener = "true";
            }
        });
    }

    deleteBtnClassControl(notSnappedBlocks, blockObjects, removeBlockCallback) {
        // 1. Set for quick lookup
        const notSnappedSet = new Set(notSnappedBlocks);

        // 2. Traverse all blocks and add/remove delete button
        blockObjects.forEach((blockObject) => {
            let deleteBtn = blockObject.element.querySelector(".delete-block-btn");
            if (!deleteBtn) return;

            const shouldHaveButton = notSnappedSet.has(blockObject);

            // Visibility control
            if (shouldHaveButton) {
                deleteBtn.style.display = "flex";
            } else {
                deleteBtn.style.display = "none";
            }

            // Listener control
            if (!deleteBtn.dataset.hasDeleteListener) {
                deleteBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    removeBlockCallback(blockObject);
                });

                // Custom flag to avoid multiple listeners
                deleteBtn.dataset.hasDeleteListener = "true";
            }
        });
    }

    // Automatically syncs the blocks in the DOM with the blocks in the Store
    syncBlocksWithDOM(blockObjects) {
        // 1. Get all current DOM blocks
        const domBlocks = Array.from(this.ground.querySelectorAll('.block'));

        // 2. Set of IDs for quick lookup
        const dataIds = new Set(blockObjects.map(b => b.id));

        // 3. Remove extra DOM blocks
        domBlocks.forEach(domEl => {
            const id = domEl.getAttribute('id');

            // If the block is not in the Store, remove it from DOM
            if (!dataIds.has(id)) {
                domEl.remove();
            }
        });

        // 4. Add missing blocks
        blockObjects.forEach(block => {
            // If the block is not in the DOM, add it
            if (!this.ground.contains(block.element)) {
                this.ground.appendChild(block.element);

                // All blocks are draggable
                block.element.classList.add("draggable");

                if (!block.element.classList.contains("block")) {
                    block.createElement();
                }

                // Default block sizes
                this.initializeBlockLayout(block);

                // Spawn position
                if (!block.element.hasAttribute('data-x')) {
                    const visibleCenterX = this.ground.scrollLeft + (this.ground.clientWidth / 2) - 50;
                    const visibleCenterY = this.ground.scrollTop + (this.ground.clientHeight / 2) - 50;

                    block.element.style.transform = `translate(${visibleCenterX}px, ${visibleCenterY}px)`;
                    block.element.setAttribute('data-x', visibleCenterX);
                    block.element.setAttribute('data-y', visibleCenterY);
                }

            }
        });
    }

    /**
     * Initializes the block layout (width, height, specific styles) based on its type.
     * @param {Block} block - The block to initialize.
     */
    initializeBlockLayout(block) {
        if (block instanceof DefinitionBlock) {
            block.element.style.width = "150px";
            this.verticalLayoutResize(block, null);
        }
        else if (block instanceof ConstructorBlock) {
            this.constructorHorizontalResize(block);
            this.verticalLayoutResize(block, null);
        }
        else if (block instanceof AtomicBlock) {
            this.atomicHorizontalResize(block);
            this.verticalLayoutResize(block, null);

            // Atomic block input listener for dynamic resizing
            const input = block.element.querySelector("input");
            if (input) {
                input.addEventListener("input", () => {
                    this.atomicHorizontalResize(block);
                });
            }
        }
    }

    /**
     * Sets the width for ConstructorBlock based on its content.
     * @param {ConstructorBlock} block - The ConstructorBlock to set the width for.
     */
    constructorHorizontalResize(block) {
        let blockNameEl = block.element.querySelector(".blockName");
        let blockDeleteBtnEl = block.element.querySelector(".delete-block-btn");

        let nameWidth = blockNameEl ? blockNameEl.offsetWidth : 0;

        let widestLabel = nameWidth + (blockDeleteBtnEl ? blockDeleteBtnEl.offsetWidth : 20);

        // plug.width and dotLabelWidth are atributes computed in createElement
        let dotLabelWidth = block.dotObject ? block.dotObject.dotLabelWidth : 0;

        if (block.plugObjects && block.plugObjects.length > 0) {
            block.plugObjects.forEach(plug => {
                let total = plug.width + dotLabelWidth;

                if (total > widestLabel) {
                    widestLabel = total;
                }
            });
        }

        if (dotLabelWidth > widestLabel) {
            widestLabel = dotLabelWidth;
        }

        block.element.style.width = (widestLabel + 50) + "px";
    }

    /**
     * Resizes the AtomicBlock based on its input content AND dot label width.
     * @param {AtomicBlock} block - The AtomicBlock to resize.
     */
    atomicHorizontalResize(block) {
        const input = block.element.querySelector("input");
        const nameEl = block.element.querySelector(".blockName"); // Pro jistotu, kdyby tam ještě byl

        if (!input) return;

        // 1. Calculate input text width
        // Canvas method for accurate text width measurement
        const context = document.createElement("canvas").getContext("2d");
        context.font = getComputedStyle(input).font;
        const text = input.value || input.placeholder || "";
        const textWidth = context.measureText(text).width;

        // 2. Set input width (min 50px, max 200px, padding cca 10px)
        const inputNewWidth = Math.max(50, textWidth + 10);
        const inputNewWidthLimited = Math.min(inputNewWidth, 200);

        input.style.width = `${inputNewWidthLimited}px`;

        // 3. Get widths of other elements
        const nameWidth = nameEl ? nameEl.offsetWidth : 0;

        // 4. Get dot label width
        let dotLabelWidth = 0;
        if (block.dotObject && block.dotObject.dotLabelWidth) {
            dotLabelWidth = block.dotObject.dotLabelWidth;
        }

        // 5. Calculate final block width
        const widthForDot = dotLabelWidth;
        const widthForInput = inputNewWidthLimited + 20; // Input + padding of block 
        const widthForName = nameWidth + 60; // Name + padding

        const blockWidth = Math.max(widthForName, widthForInput, widthForDot + widthForInput);

        block.element.style.width = `${blockWidth}px`;
    }

    /**
     * Calculates exact positions for plugs, dot and height for the parent block based on children sizes.
     * @param {Block} parentBlock 
     * @param {Array} currentSnaps - Array of all snap objects used to lookup children
     */
    verticalLayoutResize(parentBlock, currentSnaps) {
        let currentY = this.LAYOUT_CONFIG.PADDING_TOP;

        // 1. Dot positioning
        if (parentBlock.dotObject) {
            const firstRowCenter = currentY + (this.LAYOUT_CONFIG.MIN_ROW_HEIGHT / 2);
            const dotTop = firstRowCenter - (parentBlock.dotObject.element.offsetHeight / 2);

            parentBlock.dotObject.element.style.top = `${dotTop}px`;
        }

        // 2. Plugs positioning
        if (parentBlock.plugObjects && parentBlock.plugObjects.length > 0) {
            parentBlock.plugObjects.forEach(plug => {

                let rowHeight = this.LAYOUT_CONFIG.MIN_ROW_HEIGHT;

                const snap = currentSnaps ? currentSnaps.find(s => s.plug === plug) : null;
                const lastPlug = parentBlock.plugObjects[parentBlock.plugObjects.length - 1];

                // If child exists, use its height
                if (snap && snap.child) {
                    rowHeight = Math.max(this.LAYOUT_CONFIG.MIN_ROW_HEIGHT, snap.child.element.offsetHeight);

                    // Last plug has extra padding space, blocks starts 30px above its row, so in the last row its extra
                    if (plug === lastPlug) {
                        rowHeight = rowHeight - this.LAYOUT_CONFIG.PADDING_TOP - this.LAYOUT_CONFIG.PADDING_BOTTOM;
                    }
                }

                // Place plug, not in the center of the row, but in the center of default row height !
                const plugCenterY = currentY + (this.LAYOUT_CONFIG.MIN_ROW_HEIGHT / 2);
                plug.element.style.top = `${plugCenterY - (plug.element.offsetHeight / 2)}px`;

                // Increment Y position for next row
                currentY += rowHeight + this.LAYOUT_CONFIG.ROW_GAP;
            });
        }
        else {
            currentY += this.LAYOUT_CONFIG.MIN_ROW_HEIGHT;
        }

        // 3. Final height of the parent block, minus the last ROW_GAP
        const finalHeight = currentY + this.LAYOUT_CONFIG.PADDING_BOTTOM - (parentBlock.plugObjects.length > 0 ? this.LAYOUT_CONFIG.ROW_GAP : 0);
        parentBlock.element.style.height = `${finalHeight}px`;
    }

    /**
     * Manages the logic after a snap (changing parent sizes, new positions).
     * Changes DOM elements' height and position.
     * @param {number} dotYPosition - Y position of the dot in pixels
     * @param {Array} orderedSnappedBlocks - Ordered snaps (array of arrays)
     */
    afterSnapActions(blockObjects, dotYPosition, orderedSnappedBlocks, allSnaps) {
        const activeParents = new Set();

        // 1. --- Height recount (Bottom-Up: from leaves to root) ---
        orderedSnappedBlocks.forEach(tree => {
            tree.forEach(snap => {
                activeParents.add(snap.parent);
            });
        });

        // CLEANUP, for blocks that have NO children snapped, only for ConstructorBlocks
        blockObjects.forEach(block => {
            if (block instanceof ConstructorBlock && !activeParents.has(block)) {
                this.verticalLayoutResize(block, allSnaps);
            }
        });

        const processedParents = new Set();

        // orderedSnappedBlocks is sorted from root to leaves -> must go backwards (from the deepest child up) to correctly sum heights
        // Includes plugs and dot positioning
        orderedSnappedBlocks.forEach(tree => {
            // Make a copy and reverse the order
            [...tree].reverse().forEach(snap => {
                const parent = snap.parent;

                // Recalculate layout for the parent block, only for ConstructorBlocks
                if (parent instanceof ConstructorBlock) {
                    this.verticalLayoutResize(parent, allSnaps);
                    processedParents.add(parent);
                }
            });
        });



        // 2. --- New positions (Top-Down: from root to leaves) ---
        const groundEl = this.ground;
        const groundRect = groundEl.getBoundingClientRect();
        const groundStyle = getComputedStyle(groundEl);

        // Scroll for window, it is disabled, but ground might be scrolled
        // const scrollX = window.scrollX;
        // const scrollY = window.scrollY;

        // Difference between position 0,0 of the page and 0,0 of the ground element, because interact.js takes 0,0 from ground
        // getBoundingClientRect is position before border and padding -> so I have to add it

        const groundBorderLeft = parseFloat(groundStyle.borderLeftWidth) || 0;
        const groundBorderTop = parseFloat(groundStyle.borderTopWidth) || 0;
        const groundPaddingLeft = parseFloat(groundStyle.paddingLeft) || 0;
        const groundPaddingTop = parseFloat(groundStyle.paddingTop) || 0;

        // Position of upper left corner of ground element
        const groundContentX = groundRect.left + groundBorderLeft + groundPaddingLeft;
        const groundContentY = groundRect.top + groundBorderTop + groundPaddingTop;

        orderedSnappedBlocks.forEach((snappedDef) => {
            snappedDef.forEach((snappedBlock) => {
                let plugEl = snappedBlock.plug.element;
                let plugRect = plugEl.getBoundingClientRect();

                let plugX = plugRect.left;
                let plugY = plugRect.top;

                let plugWidth = plugRect.width;
                let plugHeight = plugRect.height;

                let x = (plugX + plugWidth) - groundContentX - 3;
                let y = (plugY + plugHeight / 2) - dotYPosition - groundContentY;

                // Ground scroll offset
                x += groundEl.scrollLeft;
                y += groundEl.scrollTop;

                snappedBlock.child.element.style.transform = `translate(${x}px, ${y}px)`;
                snappedBlock.child.element.setAttribute('data-x', x);
                snappedBlock.child.element.setAttribute('data-y', y);
            });
        });
    }

    /**
     * Prints the export result into the export result list.
     * @param {string} str - The COQ string to display.
     */
    showExportResult(str) {
        let li = document.createElement("li");
        li.innerText = str;

        const resultList = document.getElementById("result");
        if (resultList) {
            resultList.appendChild(li);
        }
    }

    /**
     * Prints alert message
     * @param {string} msg - The alert message.
     * @param {string} type - The type of alert (e.g., "danger", "success").
     */
    printAlert(msg, type) {
        let alertPlaceholder = document.getElementById("alertPlaceholder");

        const alertEl = document.createElement('div');
        alertEl.className = `alert alert-${type} alert-dismissible m-0 shadow-sm`;
        alertEl.setAttribute('role', 'alert');
        alertEl.innerHTML = [
            `   <div>${msg}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
        ].join('');

        alertPlaceholder.append(alertEl);

        setTimeout(() => {
            alertEl.remove();
        }, 10000);
    }

}