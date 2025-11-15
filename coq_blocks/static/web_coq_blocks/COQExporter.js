import { DefinitionBlock } from "./Block.js";
import {
    getBlockObjects,
    getSnappedBlocks
} from "./store/appStoreActions.js";
export default class COQExporter {
    constructor() {
    }

    export() {
        let result = this.DFSTraverse();
        console.log("exported: ", result);

        let li = document.createElement("li");
        li.innerText = result.output;
        document.getElementById("result").appendChild(li);
    }

    DFSTraverse() {
        let definitions = [];

        // Najdi root bloky – definice
        let rootBlocks = getBlockObjects().filter(
            block => block instanceof DefinitionBlock
        );

        // Pro každý root blok získej objektový strom
        rootBlocks.forEach(rootBlock => {
            let defObj = this.traverseBlock(rootBlock);
            definitions.push(defObj);
        });

        // Sestav závorkový string
        let outputStrings = definitions.map(def => this.stringifyDefinition(def, 0));
        let finalOutput = outputStrings.join("\n");

        return {
            result: definitions,
            output: finalOutput
        };
    }

    // Rekurzivní průchod bloky a plnění stromové struktury
    traverseBlock(block) {
        // Objekt pro stromovou strukturu k návratu
        let ret = {
            // Automatický název konstruktoru, něco jako instanceof
            kind: block.constructor.name,   // třeba "DefinitionBlock", "ConstructorBlock"
            block: block,
            children: []
        };

        block.plugObjects.forEach(plug => {
            let snap = getSnappedBlocks().find(s => s.plug === plug);
            if (snap) {
                ret.children.push(this.traverseBlock(snap.child));
            } else {
                ret.children.push(null); // nic nesnapnutého
            }
        });

        return ret;
    }

    // Rekurzivní převod na závorkový formát
    stringifyDefinition(def, i) {
        let children = def.children
            .filter(p => p !== null)
            .map(p => this.stringifyDefinition(p, i + 1));

        if (def.kind == "DefinitionBlock") {
            return `Definition ${def.block.varName} ${children.length ? " " + children.join(" ") : ""}`;
        }

        // Pokud jde o 1 blok po definici, nedávám závorky (...)
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

        // return def.kind == "DefinitionBlock" ? // Pokud jde o blok definice
        //     `Definition ${def.block.varName} ${children.length ? " " + children.join(" ") : ""}`
        //     :
        //     i == 1 ? // Pokud jde o 1 blok po definici, nedávám závorky (...)
        //         `: ${def.block.typeName} := ${def.block.constructorName}${children.length ? " " + children.join(" ") : ""}`
        //         :
        //         `(${def.block.constructorName}${children.length ? " " + children.join(" ") : ""})`;
    }


}