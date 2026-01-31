// ------------------- Helper functions -------------------

/**
 * Recursively formats a type for display (e.g., on a Plug or Dot label)
 * @param {Object|string} typeObj - JSON type object (e.g. {name: "list", args: [...]}) or string "nat"
 * @returns {string} Formatted string (e.g. "list nat")
 */
function formatType(typeObj) {
    if (!typeObj) return "?";

    // If it's already a string, return it
    if (typeof typeObj === 'string') return typeObj;

    // If no arguments, return just the name
    if (!typeObj.args || typeObj.args.length === 0) {
        return typeObj.name;
    }

    // Recursively format arguments, if an argument is complex, put it in parentheses
    const formattedArgs = typeObj.args.map(arg => {
        const str = formatType(arg);
        return (arg.args && arg.args.length > 0) ? `(${str})` : str;
    });

    return `${typeObj.name} ${formattedArgs.join(" ")}`;
}

/**
 * Recursively replaces type parameters
 * @param {Object} typeObj - Type to be replaced (e.g. { name: "A", args: [] })
 * @param {Object} typeParamMap - Map { "A": { name: "nat", args:[] }, "B": { name: "list", args:[...] } }
 * @returns {Object} New type object with replaced parameters
 */
function resolveTypeParams(typeObj, typeParamMap) {
    if (!typeObj) return null;
    if (!typeParamMap || Object.keys(typeParamMap).length === 0) return typeObj;

    // 1. If typeObj is a string (exception case), check directly in the map
    if (typeof typeObj === 'string') {
        const replacement = typeParamMap[typeObj];
        if (replacement) {
            if (typeof replacement === 'object') {
                return JSON.parse(JSON.stringify(replacement));
            }
            return { name: replacement, args: [] };
        }
        return { name: typeObj, args: [] };
    }

    // 2. Check if typeObj.name is a type parameter to be replaced
    const replacement = typeParamMap[typeObj.name];

    if (replacement) {
        if (typeof replacement === 'object') {
            return JSON.parse(JSON.stringify(replacement));
        }

        // Fallback to string replacement
        return { name: replacement, args: [] };
    }

    // 3. Recurse for arguments
    const newArgs = (typeObj.args || []).map(arg => resolveTypeParams(arg, typeParamMap));

    return {
        ...typeObj,
        args: newArgs
    };
}

class Dot {
    constructor(typeObj, parentBlockEl, color) {
        this.typeObj = typeObj; // Data type object, JSON
        this.type = typeObj;
        this.color = color; // Color
        this.parentBlockEl = parentBlockEl; // Reference to parent block
        this.dotLabelWidth = 0; // Width of dot label for block width
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

        dotLabel.innerText = formatType(this.typeObj);
        dotLabel.style.position = "absolute";
        dotLabel.style.left = "25px";
        dotLabel.style.top = "0";
        dotLabel.style.whiteSpace = "nowrap";

        this.dotLabelWidth = dotLabel.offsetWidth;
        this.element = dot;
    }
}
class Plug {
    constructor(typeObj, parentBlockEl, index, plugPosition) {
        this.typeObj = typeObj; // Data type object, or string "any" (exception, SnapManager -> areTypesEqual handles it)
        this.type = typeObj;
        this.parentBlockEl = parentBlockEl; // Reference to parent block
        this.index = index; // Order
        this.width = 0; // Width = plug + plug label
        this.plugPosition = plugPosition; // Plug position
        this.element = document.createElement("div"); // DOM element
        this.occupied = false; // If plug is occupied
    }

    createElement() {
        let plug = this.element;
        this.parentBlockEl.appendChild(plug);
        plug.setAttribute("class", "block-plug");
        plug.style.top = this.plugPosition + "%";

        // Label pro plug
        let typeLabel = document.createElement("div");
        plug.appendChild(typeLabel);

        typeLabel.innerText = formatType(this.typeObj);
        typeLabel.style.position = "absolute";
        typeLabel.style.right = "120%";
        typeLabel.style.top = "2px";
        typeLabel.style.whiteSpace = "nowrap";

        this.width = typeLabel.offsetWidth + plug.offsetWidth;
        this.element = plug;
    }
}

class BaseBlock {
    constructor(id, color) {
        this.id = id;
        this.color = color;
        this.element = document.createElement("div"); // DOM element
        this.delBtnWidth = 20;

    }

    createElement() {
        throw new Error("Must be implemented by subclass");
    }

    /**
     * Initializes common block features:
     * - Main DIV attributes (id, class, style)
     * - Delete Button (hidden by default)
     * - Block Name (optional helper)
     */
    initBlockElement() {
        // 1. Setup Main Element
        this.element.setAttribute("id", this.id);
        this.element.className = "block draggable";
        this.element.style.backgroundColor = this.color;
        //this.element.style.position = "absolute"; // Pro jistotu, aby fungovalo top/left dětí

        // 2. Setup Delete Button
        let deleteBtn = document.createElement("div");
        deleteBtn.className = "delete-block-btn";
        deleteBtn.style.display = "none";

        deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
        </svg>`;

        deleteBtn.addEventListener("mousedown", (e) => e.stopPropagation());
        this.element.appendChild(deleteBtn);
    }

    /**
     * Helper to create and append the block title
     * @param {string} text - Title text
     */
    addBlockName(text) {
        let blockNameEl = document.createElement("div");
        blockNameEl.setAttribute("class", "blockName");
        blockNameEl.style.position = "absolute";
        blockNameEl.style.top = "5px";
        blockNameEl.style.left = "30px";
        blockNameEl.style.fontWeight = "bold";
        blockNameEl.innerText = text;
        this.element.appendChild(blockNameEl);
    }

    // Get plug positions based on number of plugs
    getPlugPositions(n) {
        // Calculation is from 0 to 90%, then shifted by 10% due to the title

        if (n === 0) return []; // No plugs
        if (n === 1) return ["60"]; // Single plug in the middle

        let margin = 45 / n;
        let positions = [];
        for (let i = 1; i <= n; i++) {
            let position = ((i - 1) * (90 - 2 * margin) / (n - 1)) + margin;
            positions.push(String(position + 10));
        }
        return positions;
    }
}

export class DefinitionBlock extends BaseBlock {
    constructor(varName, id) {
        super(id, "rgb(128, 128, 128)");
        this.plugObjects = [];
        this.varName = varName; // Name of the variable for definition
    }

    createElement() {
        // Initialize block element
        this.initBlockElement();

        // Block name
        this.addBlockName("Definition");

        let newBlock = this.element

        // Export button
        let exportIcon = document.createElement("div");
        exportIcon.className = "export-icon";
        exportIcon.style.position = "absolute";
        exportIcon.style.bottom = "5px";
        exportIcon.style.left = "5px";
        exportIcon.style.cursor = "pointer";
        exportIcon.style.color = "#000";
        exportIcon.style.transition = "transform 0.2s, color 0.2s";
        exportIcon.title = "Export this definition";

        exportIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
        </svg>`;

        exportIcon.onmouseover = () => {
            exportIcon.style.transform = "scale(1.2)";
            exportIcon.style.color = "#000";
        };
        exportIcon.onmouseout = () => {
            exportIcon.style.transform = "scale(1)";
            exportIcon.style.color = "#000";
        };

        // To prevent drag on export icon click
        exportIcon.addEventListener("mousedown", (e) => e.stopPropagation());
        newBlock.appendChild(exportIcon);

        // ------ PLUGS

        let aktPlug = 0; // Current plug
        this.plugsCount = 1;
        let plugPositions = this.getPlugPositions(this.plugsCount); // Get plug positions

        // Create plug object; string "any" is exception (string not object), SnapManager -> areTypesEqual handles it
        let plugObject = new Plug("any", newBlock, aktPlug, plugPositions[aktPlug]);

        // Create plug element for DOM
        plugObject.createElement()

        this.plugObjects.push(plugObject);
    }
}

export class ConstructorBlock extends BaseBlock {
    /**
     * @param {Object} constructorObj - JSON Object representing the constructor
     * @param {string} typeName - Name of the data type (e.g., "nat", "bool")
     * @param {Array} typeParameters - [{ "X": "nat" }]
     * @param {string} id 
     * @param {string} color 
     */
    constructor(constructorObj, typeName, typeParameters, id, color) {
        super(id, color);

        this.typeName = typeName; // Name of the data type
        this.constructorName = constructorObj.name; // Name of the constructor
        this.typeParameters = typeParameters; // Parameters of the data type
        this.constructorObj = constructorObj;
        this.blockName = `${typeName} : ${constructorObj.name}`; // Name of entire block
        this.returnTypeObj = null;

        console.log("ConstructorBlock: Created for constructor:", this.constructorObj, "of type:", typeName, "with typeParameters:", typeParameters);

        // --- 1. Prepare type parameter map for substitution { "X": "nat", ... } ---
        const typeParamMap = {};
        if (Array.isArray(this.typeParameters)) {
            this.typeParameters.forEach(obj => {
                const k = Object.keys(obj)[0];
                const v = obj[k];
                if (v) typeParamMap[k] = v;
            });
        }

        // --- 2. Return type ---
        // If explicit return_type is given, use it, otherwise build from typeName and typeParameters

        if (this.constructorObj.return_type && this.constructorObj.return_type.name !== "Unknown") { // Arrow style (explicit return_type)
            this.returnTypeObj = resolveTypeParams(this.constructorObj.return_type, typeParamMap); // Apply type parameter substitution
        } else {  // Binder style (return_type not given)

            // Get name of type parameter and use it, if not given, use the key as placeholder
            // {X: "nat"} uses nat; {X: null} uses X
            // Does not need substitution here, we are building the type

            const paramArgs = [];
            if (this.typeParameters && Array.isArray(this.typeParameters)) {
                this.typeParameters.forEach(p => {
                    const key = Object.keys(p)[0];
                    const val = p[key];

                    if (val && typeof val === 'object') { // If value is already an object
                        paramArgs.push(JSON.parse(JSON.stringify(val)));
                    }
                    else if (val) { // If value is given as string, must create type object
                        paramArgs.push({
                            name: val,
                            args: []
                        });
                    }
                    else { // If value is not given, use key as placeholder
                        paramArgs.push({
                            name: key,
                            args: []
                        });
                    }
                });
            }

            this.returnTypeObj = {
                name: typeName,
                args: paramArgs
            };
        }

        this.plugObjects = [];
        this.plugsCount = 0;
        this.dotObject = null;
    }

    createElement() {
        // Initialize block element
        this.initBlockElement();

        // Block name
        this.addBlockName(this.blockName);

        let newBlock = this.element;

        // ------------------------ Dot
        let dot = new Dot(this.returnTypeObj, newBlock, this.color);
        dot.createElement(); // DOM element
        this.dotObject = dot;

        // ------------------------ Plugs
        // Map for substituting type parameters
        const typeParamMap = {};
        if (Array.isArray(this.typeParameters)) {
            this.typeParameters.forEach(obj => {
                const k = Object.keys(obj)[0];
                const v = obj[k];
                if (v) typeParamMap[k] = v;
            });
        }

        // Plug count
        let allPlugsData = [];

        const args = this.constructorObj.args || [];

        args.forEach(arg => {
            const resolvedType = resolveTypeParams(arg.type, typeParamMap);

            if (arg.names && arg.names.length > 0) {
                // Binder style: (n m : nat)
                arg.names.forEach(name => {
                    allPlugsData.push({ type: resolvedType, label: name });
                });
            } else {
                // Arrow style: nat -> bool
                allPlugsData.push({ type: resolvedType, label: "" });
            }
        });

        this.plugsCount = allPlugsData.length;
        let plugPositions = this.getPlugPositions(this.plugsCount);

        // Plug elements 
        allPlugsData.forEach((plugData, index) => {
            let plugObject = new Plug(plugData.type, newBlock, index, plugPositions[index]);
            plugObject.createElement();
            this.plugObjects.push(plugObject);
        });

        // CSS class for single plug
        if (this.plugsCount == 1) {
            newBlock.classList.add("1plug");
        }
    }
}

export class AtomicBlock extends BaseBlock {
    constructor(typeName, id, color) {
        super(id, color);

        this.typeObj = { name: typeName, args: [] };
        this.value = null;
        this.dotObject = null;
        this.plugObjects = [];

    }

    createElement() {
        // Initialize block element
        this.initBlockElement();
        let newBlock = this.element;
        newBlock.classList.add("d-flex", "justify-content-end", "align-items-center");

        // Block name
        this.addBlockName(this.typeObj.name);

        // Input
        let inputEl = document.createElement("input");
        inputEl.setAttribute("class", "form-control p-0 mx-2 mt-3");
        inputEl.setAttribute("maxlength", "12");
        inputEl.setAttribute("id", "atomicInput");

        newBlock.appendChild(inputEl);

        // Dot
        let dot = new Dot(this.typeObj, newBlock, this.color);
        dot.createElement(); // DOM element
        this.dotObject = dot;

        // Input event listener
        inputEl.addEventListener("input", () => {
            this.value = inputEl.value;
        });
    }

}
