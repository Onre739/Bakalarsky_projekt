import {
    getDelBtnWidth,
    getDefinitionBlockCount,
    getBlockColors,
    getTypeBlockCount,
    getAtomicBlockCount
} from "./store/appStoreActions.js";
class Dot {
    constructor(type, parentBlockEl, color) {
        this.type = type; // datový typ
        this.color = color; // barva
        this.parentBlockEl = parentBlockEl; // reference na rodičovský blok
        this.dotLabelWidth = 0; // šířka dot label pro šířku bloku
        this.element = document.createElement("div"); // DOM element
    }

    createElement() {
        let dot = this.element;
        this.parentBlockEl.appendChild(dot);

        dot.setAttribute("class", "block-dot");
        dot.style.backgroundColor = this.color;
        dot.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16" style="display:inline;"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/></svg>';

        let dotLabel = document.createElement("div");
        dot.appendChild(dotLabel);

        dotLabel.innerText = this.type;
        dotLabel.style.position = "absolute";
        dotLabel.style.left = "25px";
        dotLabel.style.top = "0";

        this.dotLabelWidth = dotLabel.offsetWidth;

        this.element = dot;
    }
}
class Plug {
    constructor(type, parentBlockEl, index, plugPosition) {
        this.type = type; // datový typ
        this.parentBlockEl = parentBlockEl; // reference na rodičovský blok
        this.index = index; // pořadí
        this.width = 0; // šířka = plug + plug label
        this.plugPosition = plugPosition; // pozice pro plug
        this.element = document.createElement("div"); // DOM element
    }

    createElement() {
        let plug = this.element;
        this.parentBlockEl.appendChild(plug);
        plug.setAttribute("class", "block-plug");

        plug.style.top = this.plugPosition + "%";

        // Label pro plug
        let typeLabel = document.createElement("div");
        plug.appendChild(typeLabel);
        typeLabel.innerText = this.type;
        typeLabel.style.position = "absolute";
        typeLabel.style.right = "120%";
        typeLabel.style.top = "2px";

        this.width = typeLabel.offsetWidth + plug.offsetWidth;

        this.element = plug;
    }
}

// Základní blok pro různé typy: Definition | Konstruktor| Atomic | Hypotéza
class BaseBlock {
    constructor(id, color) {
        this.id = id; // unikátní ID
        this.color = color; // barva bloku
        this.element = document.createElement("div"); // DOM element
    }

    createElement() {
        throw new Error("Must be implemented by subclass");
    }

    // Zisk pozicí pro N počet plugů
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

export class DefinitionBlock extends BaseBlock {
    constructor(varName) {
        super(`defBlock:${getDefinitionBlockCount()}`, "rgb(128, 128, 128)");
        this.plugObjects = [];
        this.varName = varName; // Název proměnné pro definici: Definition a: nat := ......
    }

    createElement() {

        // Append DOM, jelikož element musí být prvně napojený na dom a až pak se může stylovat a používat offsetWidth atd ...
        let groundElement = document.getElementById("ground");
        groundElement.appendChild(this.element);

        let newBlock = this.element
        newBlock.setAttribute("id", this.id);
        newBlock.setAttribute("class", "block draggable");
        newBlock.style.backgroundColor = this.color;

        // Název bloku
        let blockNameEl = document.createElement("div");
        blockNameEl.setAttribute("class", "blockName");
        blockNameEl.innerText = "Definition";
        blockNameEl.style.position = "absolute";
        blockNameEl.style.top = "10px";
        blockNameEl.style.left = "40px";
        blockNameEl.style.fontWeight = "bold";

        newBlock.appendChild(blockNameEl);

        // ------ PLUGY

        let aktPlug = 0; // Aktuální plug
        this.plugsCount = 1;
        let plugPositions = this.getPlugPositions(this.plugsCount); // Zisk pozice pro plug

        // Tvorba plug objektu
        let plugObject = new Plug("any", newBlock, aktPlug, plugPositions[aktPlug]);

        // Tvorba plug elementu pro DOM
        plugObject.createElement()

        this.plugObjects.push(plugObject);

        newBlock.style.width = String(150) + "px";
        newBlock.style.height = String(this.plugsCount * 50 + 20) + "px";
    }
}

export class ConstructorBlock extends BaseBlock {
    constructor(constructor, typeName, typeParameters, id) {
        super(`${id}:${getTypeBlockCount(id)}`, getBlockColors()[0]);

        this.typeName = typeName; // Název datového typu
        this.constructorName = constructor.name; // Název konstruktoru
        this.typeParameters = typeParameters; // Parametry datového typu
        this.constructorParameters = constructor.parameters; // Parametry konstruktoru
        this.blockName = typeName + "\u00A0:\u00A0" + constructor.name; // Název celého bloku

        // Pokud má konstruktor hodnotu type, tak jde o konstruktor explicitním návratovým dat. typem, jinak se vždy vrací název datového typu
        // + kontrola jestli je typ složen t 1 nebo 2 slov
        this.returnType = "type" in constructor ?
            (constructor.type.length == 2 ? constructor.type[0] + "\u00A0" + constructor.type[1] : constructor.type[0]) : (typeName);

        // Má konstruktor explicitní datový typ?
        this.explicitConstructorType = "type" in constructor ? true : false;

        // Má konstruktor explicitní názvy parametrů? Opak expl.Constr.Type
        this.explicitParamNames = "type" in constructor ? false : true;

        // Pole plug objektů
        this.plugObjects = [];
        this.plugsCount = 0;

        // Object dot
        this.dotObject = null;
    }

    createElement() {
        // Append DOM, jelikož element musí být prvně napojený na dom a až pak se může stylovat a používat offsetWidth atd ...
        let groundElement = document.getElementById("ground");
        groundElement.appendChild(this.element);

        // Počet proměnných u konstruktorů s implicitním typem / explicitními názvy parametrů, např.: (a b c d : bit) ; 4 parametry
        let variablesCount = 0;

        // Zisk počtu těchto parametrů
        if (this.explicitParamNames) {
            this.constructorParameters.forEach((param) => {
                variablesCount += (param.variables.length - 1);
            });
        }

        // ------------------------ New block

        let newBlock = this.element
        newBlock.setAttribute("id", this.id);
        newBlock.setAttribute("class", "block draggable");
        newBlock.style.backgroundColor = this.color;

        // Název bloku
        let blockNameEl = document.createElement("div");
        blockNameEl.setAttribute("class", "blockName");
        blockNameEl.style.position = "absolute";
        blockNameEl.style.top = "6px";
        blockNameEl.style.left = "40px";
        blockNameEl.style.fontWeight = "bold";
        blockNameEl.innerText = this.blockName;

        newBlock.appendChild(blockNameEl);

        // ------------------------ Dot

        let dot = new Dot(this.returnType, newBlock, this.color);

        // Tvorba dot elementu pro DOM
        dot.createElement();

        this.dotObject = dot;

        // ------------------------ Plugy
        // Build a lookup map for type parameters so we can resolve polymorphic types
        // Example: [{X: "a"}, {Y: "bb"}] -> { X: "a", Y: "bb" }
        const typeParamMap = {};
        if (Array.isArray(this.typeParameters)) {
            this.typeParameters.forEach(obj => {
                if (obj && typeof obj === 'object') {
                    Object.keys(obj).forEach(k => {
                        typeParamMap[k] = obj[k];
                    });
                }
            });
        }

        let aktPlug = 0; // Aktuální plug
        this.plugsCount = this.constructorParameters.length + variablesCount; // Počet všech parametrů
        let plugPositions = this.getPlugPositions(this.plugsCount); // Zisk pozic pro plugy pro všechny parametry
        let widestLabel = blockNameEl.offsetWidth + getDelBtnWidth(); // Nejširší label pro šířku bloku

        this.constructorParameters.forEach((param) => {

            // Pokud jsou explicitní názvy parametrů: (a b c d : bit); pak se pro 1 typ, provede tvorba plugu několikrát, jinak 1
            let extraParams = this.explicitParamNames ? param.variables.length : 1

            for (let i = 0; i < extraParams; i++) {
                // Resolve the param.type tokens against type parameters map. If a token
                // matches a type parameter key (e.g. "X"), replace it with the value
                // from typeParamMap (e.g. "a"). Otherwise keep the original token.
                const resolved = param.type.map(token => {
                    if (typeParamMap.hasOwnProperty(token) && typeParamMap[token] !== null && typeParamMap[token] !== "") {
                        return typeParamMap[token];
                    }
                    return token;
                });

                let dataType = resolved.length == 2 ? resolved[0] + "\u00A0" + resolved[1] : resolved[0];

                // Fallback: if resolved produced an empty value, use the overall typeName
                if (!dataType) dataType = typeName;

                // Tvorba plug objektu
                let plugObject = new Plug(dataType, newBlock, aktPlug, plugPositions[aktPlug]);

                // Tvorba plug elementu pro DOM
                plugObject.createElement()

                // Přidání plugu do atributu objektu Block
                this.plugObjects.push(plugObject);

                // Nejširší label, tak aby byl blok dobře široký
                if ((plugObject.width + this.dotObject.dotLabelWidth) > widestLabel) {
                    widestLabel = plugObject.width + this.dotObject.dotLabelWidth;
                }

                aktPlug += 1;
            };

        });

        // Pokud má blok 1 plug, tak se nezvětšuje
        if (this.plugsCount == 1) {
            newBlock.classList.add("1plug");
        }

        // Dynamická velikost bloku podle obsahu + přidání několika pixelů pro velikost (padding ne bo nefachá dobře se snappem)
        newBlock.style.width = String(widestLabel + 50) + "px";
        if (this.plugsCount == 0) {
            newBlock.style.height = "70px";
        }
        else {
            newBlock.style.height = String(this.plugsCount * 50 + 20) + "px";
        }

    }
}

export class AtomicBlock extends BaseBlock {
    constructor(dataType, id) {
        super(`${id}:${getAtomicBlockCount(id)}`, "rgb(128, 128, 128)");

        this.dataType = dataType;

        // Hodnota
        this.value = null;

        // Object dot
        this.dotObject = null;

        // Pole plug objektů, bude prázdné
        this.plugObjects = [];

    }

    createElement() {
        // Append DOM, jelikož element musí být prvně napojený na dom a až pak se může stylovat a používat offsetWidth atd ...
        let groundElement = document.getElementById("ground");
        groundElement.appendChild(this.element);

        // ------------------------ New block

        let newBlock = this.element
        newBlock.setAttribute("id", this.id);
        newBlock.setAttribute("class", "block draggable");
        newBlock.style.backgroundColor = this.color;

        let boxDiv1 = document.createElement("div");
        boxDiv1.setAttribute("class", "d-flex justify-content-center");

        let boxDiv2 = document.createElement("div");
        boxDiv2.setAttribute("class", "d-flex justify-content-center");

        // Název bloku
        let blockNameEl = document.createElement("div");
        blockNameEl.setAttribute("class", "blockName");
        blockNameEl.style.position = "relative";
        blockNameEl.style.fontWeight = "bold";
        blockNameEl.innerText = this.dataType;

        boxDiv1.appendChild(blockNameEl);

        // Input
        let inputEl = document.createElement("input");
        inputEl.setAttribute("class", "form-control p-0 w-50");
        inputEl.setAttribute("id", "atomicInput");

        boxDiv2.appendChild(inputEl);
        newBlock.appendChild(boxDiv1);
        newBlock.appendChild(boxDiv2);

        // ------------------------ Dot

        let dot = new Dot(this.dataType, newBlock, this.color);

        // Tvorba dot elementu pro DOM
        dot.createElement();

        this.dotObject = dot;

        // Listener na input
        inputEl.addEventListener("input", () => {
            let value = inputEl.value;
            this.value = value;
            console.log("atomic value: ", value);
            console.log("atomic value: ", this.value);
        });

        // Výška a šířka
        newBlock.style.width = String(150) + "px";
        newBlock.style.height = String(50 + 20) + "px";
    }

}
