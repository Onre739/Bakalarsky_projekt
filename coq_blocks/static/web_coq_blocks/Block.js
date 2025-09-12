import { AppState } from "./AppState.js";

export class Dot {
    constructor(type, parentBlock, color) {
        this.type = type; // datový typ
        this.color = color; // barva
        this.parentBlock = parentBlock; // reference na rodičovský blok
        this.dotLabelWidth = 0; // šířka dot label pro šířku bloku
        this.element = document.createElement("div"); // DOM element
    }

    createElement() {
        let dot = this.element;
        this.parentBlock.appendChild(dot);

        dot.setAttribute("class", "block-dot");
        dot.style.backgroundColor = this.color;
        dot.innerHTML = AppState.icon1;

        let dotLabel = document.createElement("div");
        dot.appendChild(dotLabel);

        dotLabel.innerText = this.type;
        dotLabel.style.position = "absolute";
        dotLabel.style.left = "25px";

        this.dotLabelWidth = dotLabel.offsetWidth;

        this.element = dot;
    }
}
export class Plug {
    constructor(type, parentBlock, index, plugPosition) {
        this.type = type; // datový typ
        this.parentBlock = parentBlock; // reference na rodičovský blok
        this.index = index; // pořadí
        this.width = 0; // šířka = plug + plug label
        this.plugPosition = plugPosition; // pozice pro plug
        this.element = document.createElement("div"); // DOM element
    }

    createElement() {
        let plug = this.element;
        this.parentBlock.appendChild(plug);
        plug.setAttribute("class", "block-plug");

        plug.style.top = this.plugPosition + "%";

        // Label pro plug
        let typeLabel = document.createElement("div");
        plug.appendChild(typeLabel);
        typeLabel.innerText = this.type;
        typeLabel.style.position = "absolute";
        typeLabel.style.right = "120%";
        typeLabel.style.top = "5px";

        this.width = typeLabel.offsetWidth + plug.offsetWidth;

        this.element = plug;
    }
}

export class Block {
    constructor(constructor, type_name, type_parameters, blockSort) {
        this.blockSort = blockSort; // Typ bloku: Definition | Konstruktor| Atomic | Hypotéza
        this.id = "block:" + AppState.blockCount;
        this.typeName = type_name; // Název datového typu
        this.constructorName = constructor.name; // Název konstruktoru
        this.typeParameters = type_parameters; // Parametry datového typu
        this.constructorParameters = constructor.parameters; // Parametry konstruktoru
        this.color = AppState.blockColors[AppState.typeCount % AppState.blockColors.length]; // Barva bloku
        this.blockName = type_name + "\u00A0:\u00A0" + constructor.name; // Název celého bloku
        this.height = 0;

        // Pokud má konstruktor hodnotu type, tak jde o konstruktor explicitním návratovým dat. typem, jinak se vždy vrací název datového typu
        // + kontrola jestli je typ složen t 1 nebo 2 slov
        this.returnType = "type" in constructor ?
            (constructor.type.length == 2 ? constructor.type[0] + "\u00A0" + constructor.type[1] : constructor.type[0]) : (type_name);

        // Má konstruktor explicitní datový typ?
        this.explicitConstructorType = "type" in constructor ? true : false;

        // Má konstruktor explicitní názvy parametrů? Opak expl.Constr.Type
        this.explicitParamNames = "type" in constructor ? false : true;

        // Pole plug objektů
        this.plugObjects = [];
        this.plugsCount = 0;

        // Object dot
        this.dotObject = null;

        this.element = document.createElement("div"); // DOM element
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
        blockNameEl.style.top = "10px";
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

        let aktPlug = 0; // Aktuální plug
        this.plugsCount = this.constructorParameters.length + variablesCount; // Počet všech parametrů
        let plugPositions = this.getPlugPositions(this.plugsCount); // Zisk pozic pro plugy pro všechny parametry
        let widestLabel = blockNameEl.offsetWidth + AppState.delBtnWidth;

        this.constructorParameters.forEach((param) => {

            // Pokud jsou explicitní názvy parametrů: (a b c d : bit); pak se pro 1 typ, provede tvorba plugu několikrát, jinak 1
            let extraParams = this.explicitParamNames ? param.variables.length : 1

            for (let i = 0; i < extraParams; i++) {
                let dataType = param.type.length == 2 ? param.type[0] + "\u00A0" + param.type[1] : param.type[0];

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

        AppState.blockCount += 1;

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

        this.height = this.element.offsetHeight;

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

    resize() {
        // přepočítá velikost podle obsahu
    }

    setPosition(x, y) {
        this.element.style.transform = `translate(${x}px, ${y}px)`;
    }

}