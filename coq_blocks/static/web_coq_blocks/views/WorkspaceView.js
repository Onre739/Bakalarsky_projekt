export default class WorkspaceView {
    constructor(store, snapManager) {
        this.ground = document.getElementById("ground");
        this.store = store;
        this.snapManager = snapManager;
    }

    subscribeToStore() {
        this.store.subscribe(() => {
            this.updateUI();
        });
    }

    updateUI() {
        const blockObjects = this.store.getBlockObjects();
        const currentSnaps = this.store.getSnappedBlocks();
        const plugInBlockPos = this.store.getPlugInBlockPos();
        const orderedSnaps = this.store.getOrderedSnappedBlocks();

        // 1. Synchronize DOM elements (adding/removing blocks)
        this.syncBlocksWithDOM(blockObjects);

        // 2. Block resize
        this.afterSnapActions(plugInBlockPos, orderedSnaps);

        // 3. Drag control
        const blockedDraggableItems = this.snapManager.getBlockedDraggableItems(currentSnaps);
        this.draggableClassControl(blockObjects, blockedDraggableItems);

        // 4. Delete button control
        const notSnappedBlocks = this.snapManager.getNotSnappedBlocks(blockObjects, currentSnaps);
        const removeBlockCallback = (block) => this.store.removeBlock(block);
        this.deleteBtnClassControl(notSnappedBlocks, blockObjects, removeBlockCallback);

    }

    draggableClassControl(blockObjects, blockedDraggableItems) {
        // Add / remove draggable class for all blocks

        blockObjects.forEach(block => {
            if (blockedDraggableItems.has(block)) {
                block.element.classList.remove("draggable");
            } else {
                block.element.classList.add("draggable");
            }
        });

    }

    deleteBtnClassControl(notSnappedBlocks, blockObjects, removeBlockCallback) {
        // 1. Set for quick lookup
        const notSnappedSet = new Set(notSnappedBlocks);

        // 2. Traverse all blocks and add/remove delete button
        blockObjects.forEach((blockObject) => {
            let deleteBtn = blockObject.element.querySelector(".deleteButton");

            const shouldHaveButton = notSnappedSet.has(blockObject);

            // A) Should have delete button and doesn't have it -> create
            if (shouldHaveButton && !deleteBtn) {
                deleteBtn = document.createElement("button");
                deleteBtn.setAttribute("class", "deleteButton");
                deleteBtn.innerText = "X";

                // IMPORTANT: stopPropagation, so that clicking the button doesn't trigger drag of the block
                deleteBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    removeBlockCallback(blockObject);
                });

                blockObject.element.appendChild(deleteBtn);

            }

            // B) Shouldn't have delete button and has it -> remove
            else if (!shouldHaveButton && deleteBtn) {
                deleteBtn.remove();
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

                if (!block.element.classList.contains("block")) {
                    block.createElement();
                }

                // Spawn position
                // if (!block.element.hasAttribute('data-x')) {
                //     const x = window.scrollX + 100;
                //     const y = window.scrollY + 100;
                //     block.element.style.transform = `translate(${x}px, ${y}px)`;
                //     block.element.setAttribute('data-x', x);
                //     block.element.setAttribute('data-y', y);
                // }

            }
        });
    }

    /**
     * Manages the logic after a snap (changing parent sizes, new positions).
     * Changes DOM elements' height and position.
     * @param {number} plugInBlockPos 
     * @param {Array} orderedSnappedBlocks - Ordered snaps (array of arrays)
     */
    afterSnapActions(plugInBlockPos, orderedSnappedBlocks) {

        // 1. Reset height
        this.store.getBlockObjects().forEach(block => {
            const baseHeight = (block.plugsCount || 0) === 0 ? 70 : (block.plugsCount * 50 + 20);

            block.element.style.height = `${baseHeight}px`;
        });

        // 2. Height recount (Bottom-Up: from leaves to root)
        // orderedSnappedBlocks is already sorted from root to leaves
        // Need to go backwards (from the deepest child up) to correctly sum heights.
        orderedSnappedBlocks.forEach(tree => {
            // Make a copy and reverse the order -> going from leaves to root
            [...tree].reverse().forEach(snap => {
                const parent = snap.parent;
                const child = snap.child;

                // Blocks with only 1 plug do not change height
                if (parent.plugsCount !== 1) {
                    const childHeight = child.element.offsetHeight; // Current height of the child (may already be increased)
                    const parentCurrentHeight = parent.element.offsetHeight;

                    // Set new height for the parent
                    parent.element.style.height = `${parentCurrentHeight + childHeight}px`;
                }
            });
        });

        // 3. New positions (Top-Down: from root to leaves)
        orderedSnappedBlocks.forEach((snappedDef) => {
            snappedDef.forEach((snappedBlock) => {
                let plugEl = snappedBlock.plug.element;
                let plugRect = plugEl.getBoundingClientRect();

                let plugLeft = plugRect.left + window.scrollX;
                let plugTop = plugRect.top + window.scrollY;
                let plugWidth = plugRect.width;
                let plugHeight = plugRect.height;

                // Difference between position 0,0 of the page and 0,0 of the ground element, because interact.js takes 0,0 from ground
                // getBoundingClientRect is position before border and padding -> so I have to add it
                let groundEl = this.ground;
                let groundRect = groundEl.getBoundingClientRect();
                let groundStyle = getComputedStyle(groundEl);

                let docGroundDiffLeft = groundRect.left + parseFloat(groundStyle.borderLeftWidth) + parseFloat(groundStyle.paddingLeft);
                let docGroundDiffTop = groundRect.top + parseFloat(groundStyle.borderTopWidth) + parseFloat(groundStyle.paddingTop);

                let x = plugLeft + plugWidth - docGroundDiffLeft - 3;
                let y = plugTop + plugHeight / 2 - snappedBlock.child.element.offsetHeight * plugInBlockPos - docGroundDiffTop;

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

        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible m-0" role="alert">`,
            `   <div>${msg}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('');

        alertPlaceholder.append(wrapper);

        setTimeout(() => {
            wrapper.remove();
        }, 10000);
    }

}