import { DefinitionBlock } from "../models/Block.js";

export default class COQExporter {

    export(blockObjects, snappedBlocks) {

        let traversalResult = this.DFSTraverse(blockObjects, snappedBlocks);
        console.log("Exported structure: ", traversalResult.result);

        return traversalResult.output;
    }

    DFSTraverse(blockObjects, snappedBlocks) {
        let definitions = [];

        // Find all root blocks (DefinitionBlocks)
        let rootBlocks = blockObjects.filter(
            block => block instanceof DefinitionBlock
        );

        if (rootBlocks.length === 0) {
            throw new Error("Export failed: No Definition blocks found.");
        }

        // For each root block, get the object tree
        rootBlocks.forEach(rootBlock => {
            let defObj = this.traverseBlock(rootBlock, snappedBlocks);
            definitions.push(defObj);
        });

        // Build output strings
        let outputStrings = definitions.map(def => this.stringifyDefinition(def, 0));
        let finalOutput = outputStrings.join("\n");

        return {
            result: definitions,
            output: finalOutput
        };
    }

    // Recursive traversal of a block and its snapped children
    traverseBlock(block, snappedBlocks) {
        // Object for tree representation for return
        let ret = {
            // Auto-generated kind based on class name
            kind: block.constructor.name,   // like "DefinitionBlock", "ConstructorBlock"
            block: block,
            children: []
        };

        block.plugObjects.forEach(plug => {
            let snap = snappedBlocks.find(s => s.plug === plug);

            if (snap) {
                ret.children.push(this.traverseBlock(snap.child, snappedBlocks));
            } else {
                let blockId = block.blockName || block.constructor.name || block.dataType || "Unknown Block";
                throw new Error(`Export failed: Block ${blockId} has an unconnected plug.`);
            }
        });

        return ret;
    }

    // Recursive stringification of the definition object
    stringifyDefinition(def, i) {
        let children = def.children
            .filter(p => p !== null)
            .map(p => this.stringifyDefinition(p, i + 1));

        if (def.kind == "DefinitionBlock") {
            return `Definition ${def.block.varName} ${children.length ? " " + children.join(" ") : ""}`;
        }

        // If it is the first block after definition, not giving parentheses ()
        else if (i == 1) {
            if (def.kind == "AtomicBlock") {
                return `${def.block.dataType} ${def.block.value}`;
            }
            else {
                return `: ${def.block.typeName} := ${def.block.constructorName}${children.length ? " " + children.join(" ") : ""}`;
            }
        }

        else {
            if (def.kind == "AtomicBlock") {
                return `(${def.block.dataType} ${def.block.value})`;
            }
            else {
                return `(${def.block.constructorName}${children.length ? " " + children.join(" ") : ""})`;
            }
        }
    }
}