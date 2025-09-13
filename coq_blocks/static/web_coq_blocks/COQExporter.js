import { AppState } from "./AppState.js";
import { DefinitionBlock } from "./Block.js";


export class COQExporter {
    constructor() {
    }

    export() {
        AppState.orderedSnappedBlocks.forEach((definition) => {
            if (definition[0].parent instanceof DefinitionBlock) {
                let buildLine = (j) => {
                    if (j === definition.length - 1) {
                        return definition[j].child.constructorName;
                    } else {
                        return definition[j].child.constructorName + " ( " + buildLine(j + 1) + " )";
                    }
                };

                let line = "Definition " + buildLine(0);

                let list = document.getElementById("result");
                let item = document.createElement("li");
                item.innerText = line;

                list.appendChild(item);
            }


        });
    }




}