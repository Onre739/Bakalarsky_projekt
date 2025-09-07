import { AppState } from "./AppState.js";

export default class BlockFactory {

    createBlock(data) {
        data.new_types.forEach((newType) => {
            let type_name = newType.name;
            let type_parameters = newType.type_parameters;
            let explicit_constructors = newType.explicit_constructors;
            let implicit_constructors = newType.implicit_constructors;

            // Ternární operátor
            let constructors = explicit_constructors.length > implicit_constructors.length ? explicit_constructors : implicit_constructors

            constructors.forEach((newConstructor) => {
                let type_color = AppState.blockColors[AppState.typeCount];
                let constructor_name = newConstructor.name;
                let parameters = newConstructor.parameters;
                let nameOfBlock = type_name + "\u00A0:\u00A0" + constructor_name;
                let is_explicit = "type" in newConstructor;

                let constructor_type = "";
                if (is_explicit) {
                    constructor_type = newConstructor.type.length == 2 ? newConstructor.type[0] + "\u00A0" + newConstructor.type[1] : newConstructor.type[0];
                }

                let variablesCount = 0;
                parameters.forEach((param) => {
                    if (Array.isArray(param.variables)) {
                        variablesCount += (param.variables.length - 1);
                    }
                });
                let plugPositions = this.getPlugPositions(parameters.length + variablesCount);

                // Nový blok
                let newBlock = document.createElement("div");
                newBlock.setAttribute("id", "block:" + AppState.blockCount);
                newBlock.setAttribute("class", "block draggable");
                newBlock.style.backgroundColor = type_color;

                let groundElement = document.getElementById("ground");
                groundElement.appendChild(newBlock);

                // Název bloku
                let blockName = document.createElement("div");
                blockName.setAttribute("class", "blockName");
                blockName.style.position = "absolute";
                blockName.style.top = "10px";
                blockName.style.left = "40px";
                blockName.style.fontWeight = "bold";
                blockName.innerText = nameOfBlock;
                newBlock.appendChild(blockName);

                // Dot
                let dot = document.createElement("div");
                dot.setAttribute("class", "block-dot");
                dot.style.backgroundColor = type_color;
                dot.innerHTML = AppState.icon1;
                let dotLabel = document.createElement("div");
                dot.appendChild(dotLabel);
                // Pokud je explicit tak typ konstruktoru, jinak typ bloku
                dotLabel.innerText = is_explicit ? constructor_type : type_name;
                dotLabel.style.position = "absolute";
                dotLabel.style.left = "25px";

                newBlock.appendChild(dot);

                // Plugy
                let paramNum = parameters.length + variablesCount;
                let aktPlug = 0;
                let widestLabel = blockName.offsetWidth + AppState.delBtnWidth;
                parameters.forEach((param) => {
                    // Pokud jsou proměnné s 1 typem (v jednom parametru), vždy pro implicitní
                    if (Array.isArray(param.variables)) {
                        param.variables.forEach((variable) => {
                            let plug = document.createElement("div");
                            newBlock.appendChild(plug);
                            plug.setAttribute("class", "block-plug");
                            plug.style.top = plugPositions[aktPlug] + "%";

                            // Label pro plug
                            let typeLabel = document.createElement("div");
                            plug.appendChild(typeLabel);
                            typeLabel.innerText = param.type.length == 2 ? param.type[0] + "\u00A0" + param.type[1] : param.type[0];
                            typeLabel.style.position = "absolute";
                            typeLabel.style.right = "120%";
                            typeLabel.style.top = "5px";
                            console.log(typeLabel.offsetWidth + plug.offsetWidth);
                            console.log(widestLabel);
                            if (typeLabel.offsetWidth + plug.offsetWidth > widestLabel) {
                                widestLabel = typeLabel.offsetWidth + plug.offsetWidth + dotLabel.offsetWidth;
                            }

                            aktPlug += 1;
                        });
                    }
                    else {
                        let plug = document.createElement("div");
                        newBlock.appendChild(plug);
                        plug.setAttribute("class", "block-plug");
                        plug.style.top = plugPositions[aktPlug] + "%";

                        // Label pro plug
                        let typeLabel = document.createElement("div");
                        plug.appendChild(typeLabel);
                        typeLabel.innerText = param.type.length == 2 ? param.type[0] + "\u00A0" + param.type[1] : param.type[0];
                        typeLabel.style.position = "absolute";
                        typeLabel.style.right = "120%";
                        typeLabel.style.top = "5px";
                        //console.log(typeLabel.offsetWidth + plug.offsetWidth);
                        //console.log(widestLabel);
                        if (typeLabel.offsetWidth + plug.offsetWidth > widestLabel) {
                            widestLabel = typeLabel.offsetWidth + plug.offsetWidth + dotLabel.offsetWidth;
                        }

                        aktPlug += 1;
                    }

                });

                // Id bloku
                AppState.blockCount += 1;

                if (paramNum == 1) {
                    newBlock.classList.add("1plug");
                }

                // Dynamická velikost bloku podle obsahu + přidání několika pixelů pro velikost (padding ne bo nefachá dobře se snappem)
                newBlock.style.width = String(widestLabel + 50) + "px";
                if (paramNum == 0) {
                    newBlock.style.height = "70px";
                }
                else {
                    newBlock.style.height = String(paramNum * 50 + 20) + "px";
                }
            });
            AppState.typeCount += 1;
        });

        // přidání snap pozice
        // updateSnapTargets();
    }

    getPlugPositions(n) {
        // Výpočet je od 0 do 90%, ke konci posunu výsledek o 10% kvůli nadpisu

        if (n === 0) {
            return [];
        }
        else if (n === 1) {
            return [String(50 + 10)];  // Pokud je pouze jeden prvek, vrátíme střed.
        }

        let margin = 45 / n;  // Vypočítáme margin na základě počtu prvků.
        let positions = [];

        for (let i = 1; i <= n; i++) {
            // Vypočítáme pozici každého prvku
            let position = ((i - 1) * (90 - 2 * margin) / (n - 1)) + margin;
            positions.push(String(position + 10));
        }

        return positions;
    }

}

