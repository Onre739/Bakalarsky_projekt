import { ConstructorBlock, AtomicBlock, DefinitionBlock } from "../models/Block.js";

export default class SnapManager {
    constructor() {

    }

    /**
     * Calculate possible snap targets for a given block.
     * @param {Object} movedBlockObject - The block that is being moved
     * @param {Array} allBlockObjects - All blocks on the scene
     * @returns {Array} Array of snap targets [{x, y, block, plug, for}, ...]
     */
    calculateSnapTargets(movedBlockObject, allBlockObjects) {
        let newTargets = [];

        if (movedBlockObject instanceof DefinitionBlock) {
            return newTargets; // Definition blocks cannot snap
        }

        let requiredType = movedBlockObject.dotObject.type;

        allBlockObjects.forEach((blockObject) => {

            // Cannot snap to self
            if (blockObject !== movedBlockObject) {
                let blockElement = blockObject.element;

                // Check if the first child exists and has the class 'block-plug'
                if (blockElement) {
                    let plugObjects = blockObject.plugObjects;

                    plugObjects.forEach((plugObject) => {
                        let plugType = plugObject.type;

                        let plugEl = plugObject.element;
                        let rect = plugEl.getBoundingClientRect();

                        // console.log(requiredType + "-vs-" + plugType);
                        if (plugType === requiredType || plugType === "any") {
                            newTargets.push({

                                // getBoundingClientRect() dává souřadnice vůči viewportu (oknu)
                                // Pro absolutními souřadnice v dokumentu se musí přičíst scroll offset
                                x: rect.left + rect.width + window.scrollX - 3,
                                y: rect.top + rect.height / 2 + window.scrollY,

                                block: blockObject,
                                plug: plugObject,

                                // Log snap targets, for whom they are (last moved block)
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
     * Calculate which blocks have just snapped together.
     * @param {Array} blockObjects - All blocks
     * @param {Array} snapTargets - All active snap targets
     * @param {number} plugInBlockPos - Constant position of the plug (e.g., 0.6)
     * @returns {Array} Array of new snaps [{parent, plugIndex, plug, child}, ...]
     */
    checkForSnap(blockObjects, snapTargets, plugInBlockPos) {
        let newSnappedBlocks = [];

        // Check positions of each block against snap targets
        blockObjects.forEach(blockObject => {
            // Check if there is at least one target designated for this block
            const relevantTargets = snapTargets.filter(t => t.for === blockObject);

            if (relevantTargets.length === 0) {
                return; // This block is not looking for anyone, skip
            }

            let rect = blockObject.element.getBoundingClientRect();
            let blockLeft = rect.left + window.scrollX;
            let blockTop = rect.top + window.scrollY;
            let blockHeight = rect.height;

            let candidates = [];

            relevantTargets.forEach(snapTarget => {
                let deltaX = Math.abs(snapTarget.x - blockLeft);
                let deltaY = Math.abs(snapTarget.y - (blockTop + blockHeight * plugInBlockPos));

                // If it is within range
                if (deltaX < 15 && deltaY < 15) { // Tolerance 15px
                    candidates.push({
                        parent: snapTarget.block,
                        plugIndex: snapTarget.plug.index,
                        plug: snapTarget.plug,
                        child: blockObject,
                        distance: deltaX + deltaY
                    });
                }
            });

            // If there are multiple options, choose the closest one
            if (candidates.length > 0) {
                // Sort by distance (smallest first)
                candidates.sort((a, b) => a.distance - b.distance);

                // Take only the first one (the winner)
                const winner = candidates[0];

                // Remove the auxiliary 'distance' property and save the clean object
                newSnappedBlocks.push({
                    parent: winner.parent,
                    plugIndex: winner.plugIndex,
                    plug: winner.plug,
                    child: winner.child
                });
            }

        });
        return newSnappedBlocks;
    }

    /**
     * Compare two lists of snaps to see if they contain the same connections.
     * Assumes that the order of blocks in the Store is stable (which it usually is).
     * @param {Array} snapsA 
     * @param {Array} snapsB 
     * @returns {boolean} True if the snaps are equal, false otherwise
     */
    areSnapsEqual(snapsA, snapsB) {
        // 1. Check length
        if (snapsA.length !== snapsB.length) return false;

        // 2. Check content (item by item)
        for (let i = 0; i < snapsA.length; i++) {
            const a = snapsA[i];
            const b = snapsB[i];

            // Compare references to objects (parent, child, plug)
            // These references are stable as long as blocks are not deleted/created.
            if (a.parent !== b.parent ||
                a.child !== b.child ||
                a.plug !== b.plug) {
                return false;
            }
        }

        return true;
    }

    /**
     * Function for ordering blocks (flattening the tree).
     * @param {Array} snappedBlocks - List of connections
     * @returns {Array} Array of arrays of ordered blocks
     */
    // Ordering snapped blocks due to resizing and re-parsing
    orderSnappedBlocks(snappedBlocks) {
        // Find roots = blocks that are not children of any other block
        let rootBlocks = snappedBlocks.filter(block =>
            !snappedBlocks.some(otherBlock => otherBlock.child === block.parent)
        );

        let allOrdered = [];

        // For each root block, there is a separate queue and array of ordered blocks 
        rootBlocks.forEach(root => {
            let ordered = [];
            let queue = [root];

            while (queue.length > 0) {
                let currentBlock = queue.shift(); // Remove the first block from the queue
                ordered.push(currentBlock); // Add the block to the ordered array

                // Find all children of the current block
                let children = snappedBlocks.filter(b => b.parent === currentBlock.child);
                queue = queue.concat(children); // Add children to the queue
            }

            allOrdered.push(ordered);
        });

        // Check if we processed all blocks
        let flat = allOrdered.flat();
        if (flat.length !== snappedBlocks.length) {
            console.error("ORDERING BLOCK FAIL");
        }

        return allOrdered;
    }


    /**
     * Calculates which blocks should be locked (not draggable).
     * @param {Array} snappedBlocks 
     * @returns {Set} Set of blocks that should not be moved
     */
    getBlockedDraggableItems(snappedBlocks) {
        // Find leaf snaps
        let leafSnaps = snappedBlocks.filter(block1 =>
            !snappedBlocks.some(block2 => block1.child === block2.parent)
        );

        // Find branch snaps
        let branchSnaps = snappedBlocks.filter(block1 =>
            snappedBlocks.some(block2 => block1.child === block2.parent)
        );

        // Set of all blocks that should not be draggable (parents of branch + parents of leaf)
        let blocked = new Set([
            ...branchSnaps.map(b => b.parent),
            ...leafSnaps.map(b => b.parent),
        ]);

        return blocked;
    }

    /**
     * Calculates which blocks are not snapped.
     * @param {Array} blockObjects - All blocks
     * @param {Array} snappedBlocks - All snapped blocks
     * @returns {Array} Array of blocks that are not snapped
     */
    getNotSnappedBlocks(blockObjects, snappedBlocks) {
        let notSnappedBlocks = blockObjects.filter(
            b1 => !snappedBlocks.some(b2 => b1 === b2.parent) &&
                !snappedBlocks.some(b3 => b1 === b3.child)
        );

        return notSnappedBlocks;
    }

}
