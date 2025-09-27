import { AppState } from "./AppState.js";
import { DefinitionBlock } from "./Block.js";


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
        let rootBlocks = AppState.blockObjects.filter(
            block => block instanceof DefinitionBlock
        );

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

    // Rekurzivní průchod bloky a plnìní stromové struktury
    traverseBlock(block) {
        let ret = {
            kind: block.constructor.name,   // třeba "DefinitionBlock", "ConstructorBlock"
            block: block,
            children: []
        };

        block.plugObjects.forEach(plug => {
            let snap = AppState.snappedBlocks.find(s => s.plug === plug);
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


        return def.kind == "DefinitionBlock" ? // Pokud jde o blok definice
            `Definition ${def.block.varName} ${children.length ? " " + children.join(" ") : ""}`
            :
            i == 1 ? // Pokud jde o 1 blok po definici, nedávám závorky (...)
                `: ${def.block.typeName} := ${def.block.constructorName}${children.length ? " " + children.join(" ") : ""}`
                :
                `(${def.block.constructorName}${children.length ? " " + children.join(" ") : ""})`;
    }


}