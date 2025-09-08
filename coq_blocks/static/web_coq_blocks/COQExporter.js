import { AppState } from "./AppState.js";


export class COQExporter {
    constructor() {
    }

    export() {
        AppState.orderedSnappedBlocks.forEach((definition) => {
            let buildLine = (j) => {
                if (j === definition.length - 1) {
                    return definition[j].child.children[0].textContent.split(":")[1].trim();
                } else {
                    return definition[j].child.children[0].textContent.split(":")[1].trim() + " ( " + buildLine(j + 1) + " )";
                }
            };

            let line = "Definition " + buildLine(0);

            let list = document.getElementById("result");
            let item = document.createElement("li");
            item.innerText = line;

            list.appendChild(item);
        });
    }




}