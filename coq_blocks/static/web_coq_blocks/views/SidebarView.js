export default class SidebarView {
    constructor(store) {
        this.store = store;

        this.importedListEl = document.getElementById("importedTypesList");
        this.atomicListEl = document.getElementById("atomicTypesList");

        // Cache for change detection
        this.lastSavedTypesJson = "";
    }

    subscribeToStore() {
        this.store.subscribe(() => {
            this.updateUI();
        });
    }

    updateUI() {
        const savedTypes = this.store.getSavedTypes();
        const currentJson = JSON.stringify(savedTypes);

        // Check for changes, because it may close the accordion unnecessarily (annoying)
        if (currentJson === this.lastSavedTypesJson) {
            return;
        }

        this.lastSavedTypesJson = currentJson;

        // Clear existing lists
        this.importedListEl.innerHTML = "";
        this.atomicListEl.innerHTML = "";

        savedTypes.forEach(item => {
            if (item.sort === "atomic") {
                this.renderAtomicItem(item);
            } else if (item.sort === "clasic") {
                this.renderClasicItem(item);
            }
        });

    }

    renderAtomicItem(item) {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between border-0 pe-1";

        li.innerHTML = `
            <div>${item.dataType}</div>
            <div class="d-flex gap-1">
                <button id="spawn-btn-${item.id}" class="btn btn-success btn-sm d-flex align-items-center spawn-btn">
                    <svg svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" fill = "currentColor" class="bi bi-plus-circle-dotted" viewBox = "0 0 16 16" >
                        <path d="M8 0q-.264 0-.523.017l.064.998a7 7 0 0 1 .918 0l.064-.998A8 8 0 0 0 8 0M6.44.152q-.52.104-1.012.27l.321.948q.43-.147.884-.237L6.44.153zm4.132.271a8 8 0 0 0-1.011-.27l-.194.98q.453.09.884.237zm1.873.925a8 8 0 0 0-.906-.524l-.443.896q.413.205.793.459zM4.46.824q-.471.233-.905.524l.556.83a7 7 0 0 1 .793-.458zM2.725 1.985q-.394.346-.74.74l.752.66q.303-.345.648-.648zm11.29.74a8 8 0 0 0-.74-.74l-.66.752q.346.303.648.648zm1.161 1.735a8 8 0 0 0-.524-.905l-.83.556q.254.38.458.793l.896-.443zM1.348 3.555q-.292.433-.524.906l.896.443q.205-.413.459-.793zM.423 5.428a8 8 0 0 0-.27 1.011l.98.194q.09-.453.237-.884zM15.848 6.44a8 8 0 0 0-.27-1.012l-.948.321q.147.43.237.884zM.017 7.477a8 8 0 0 0 0 1.046l.998-.064a7 7 0 0 1 0-.918zM16 8a8 8 0 0 0-.017-.523l-.998.064a7 7 0 0 1 0 .918l.998.064A8 8 0 0 0 16 8M.152 9.56q.104.52.27 1.012l.948-.321a7 7 0 0 1-.237-.884l-.98.194zm15.425 1.012q.168-.493.27-1.011l-.98-.194q-.09.453-.237.884zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a7 7 0 0 1-.458-.793zm13.828.905q.292-.434.524-.906l-.896-.443q-.205.413-.459.793zm-12.667.83q.346.394.74.74l.66-.752a7 7 0 0 1-.648-.648zm11.29.74q.394-.346.74-.74l-.752-.66q-.302.346-.648.648zm-1.735 1.161q.471-.233.905-.524l-.556-.83a7 7 0 0 1-.793.458zm-7.985-.524q.434.292.906.524l.443-.896a7 7 0 0 1-.793-.459zm1.873.925q.493.168 1.011.27l.194-.98a7 7 0 0 1-.884-.237zm4.132.271a8 8 0 0 0 1.012-.27l-.321-.948a7 7 0 0 1-.884.237l.194.98zm-2.083.135a8 8 0 0 0 1.046 0l-.064-.998a7 7 0 0 1-.918 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                    </svg>    
                </button>
                <button id="delete-btn-${item.id}" class="btn btn-danger btn-sm d-flex align-items-center delete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                    </svg>
                </button>
            </div>
        `;

        // Listeners
        const spawnBtn = li.querySelector(".spawn-btn");
        spawnBtn.addEventListener("click", () => {
            this.store.spawnAtomicBlock(item);
        });

        const deleteBtn = li.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            this.store.removeSavedType(item.id);
        });

        this.atomicListEl.appendChild(li);
    }

    renderClasicItem(item) {
        const newTypeObj = item.dataType;
        const typeName = newTypeObj.name;
        const typeParameters = newTypeObj.typeParameters;

        const explicitConstructors = newTypeObj.explicitConstructors || [];
        const implicitConstructors = newTypeObj.implicitConstructors || [];

        const constructors = explicitConstructors.length > 0 ? explicitConstructors : implicitConstructors;

        // --- 1. Main element (Accordion Item) ---
        const typeEl = document.createElement("div");
        typeEl.className = "accordion-item";

        // --- 2. Header ---
        const headerEl = document.createElement("h5");
        headerEl.className = "accordion-header d-flex bg-light-subtle";

        // HTML for header (Name + Buttons)
        headerEl.innerHTML = `
            <button class="accordion-button collapsed px-3 py-1 bg-light-subtle text-success" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapse-${item.id}" 
                    aria-expanded="false" 
                    aria-controls="collapse-${item.id}"
                    style="font-weight: 500;">
                ${typeName}
            </button>
            
            <button class="btn btn-secondary btn-sm d-flex align-items-center mx-0 my-2 settings-btn" 
                    data-bs-toggle="modal" data-bs-target="#settingModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
                </svg>
            </button>

            <button class="btn btn-danger btn-sm d-flex align-items-center mx-1 my-2 delete-type-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                </svg>
            </button>
        `;

        // --- 2.1 Setting button listener ---
        const settingsBtn = headerEl.querySelector(".settings-btn");
        settingsBtn.addEventListener("click", (e) => {
            e.stopPropagation();

            // Title
            document.getElementById("settingModalTitle").innerText = `Settings for type: ${typeName}`;

            // Reset body
            let settingModalBody = document.getElementById("settingModalBody");
            settingModalBody.innerHTML = "";
            const warnDiv = document.getElementById("settingModalWarnDiv");

            // Parameter check
            if (!typeParameters || typeParameters.length === 0) {
                let div = document.createElement("div");
                div.innerText = "This type has no type parameters.";
                div.className = "mb-3";
                settingModalBody.appendChild(div);

                if (warnDiv) warnDiv.style.display = "none";
            }
            else {
                if (warnDiv) warnDiv.style.display = "block";
            }

            // --- 2.1.1 Generate inputs for each type parameter ---
            typeParameters.forEach((param, index) => {
                // Param structure: { "A": "hodnota" } nebo { "A": null }
                const typeKey = Object.keys(param)[0];
                const storedValue = param[typeKey];

                // Label
                let paramDivLabel = document.createElement("label");
                paramDivLabel.innerText = `Type parameter ${typeKey}: `;
                paramDivLabel.className = "form-label";

                // Create input
                let paramDivInput = document.createElement("input");
                paramDivInput.type = "text";
                paramDivInput.className = "form-control mb-3";

                // Input ID for later retrieval
                // Stricture: typeParamInput-ITEMID-TYPEKEY-INDEX
                paramDivInput.id = `typeParamInput:${item.id}:${typeKey}:${index}`;

                // Set stored value
                if (storedValue !== null) {
                    paramDivInput.value = storedValue;
                }

                settingModalBody.appendChild(paramDivLabel);
                settingModalBody.appendChild(paramDivInput);
            });

            // --- 2.1.2 --- Color picker ---
            let colorLabel = document.createElement("label");
            colorLabel.innerText = "Block Color: ";
            colorLabel.className = "form-label mt-2"; // Bootstrap spacing

            let colorInput = document.createElement("input");
            colorInput.type = "color";
            colorInput.className = "form-control form-control-color mb-3";
            colorInput.value = item.color || "#808080"; // Actual color
            colorInput.title = "Choose your color";

            let colorDiv = document.createElement("div");
            colorDiv.className = "d-flex gap-2";
            colorDiv.appendChild(colorLabel);
            colorDiv.appendChild(colorInput);

            settingModalBody.appendChild(colorDiv);

            // --- 2.1.3 Save button in modal listener ---
            const saveBtn = document.querySelector("#settingModalSaveBtn");

            // Tricks for removing old listeners (cloneNode)
            // It's necessary because the modal is in the DOM only once and is shared
            const newSaveBtn = saveBtn.cloneNode(true);
            saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);

            // New listener
            newSaveBtn.addEventListener("click", () => {
                // A) Collect updated parameters from inputs
                const updatedParameters = typeParameters.map((param, idx) => {
                    const typeKey = Object.keys(param)[0];

                    // Find input by ID and get its value
                    const input = document.getElementById(`typeParamInput:${item.id}:${typeKey}:${idx}`);
                    const newValue = input.value.trim() === "" ? null : input.value.trim();

                    // Return the updated parameter object
                    return { [typeKey]: newValue };
                });

                // B) Get new color
                const newColor = colorInput.value;

                // C) Call Store to update
                this.store.updateTypeColor(item.id, newColor);

                // Check if parameters changed
                const paramsChanged = JSON.stringify(typeParameters) !== JSON.stringify(updatedParameters);
                if (paramsChanged) {
                    console.log("Parameters changed - updating definition and removing blocks.");
                    this.store.updateTypeParameters(item.id, updatedParameters);
                } else {
                    console.log("Parameters unchanged - skipping block removal.");
                }
            });
        });

        // --- 2.2 Delete button listener ---
        const deleteTypeBtn = headerEl.querySelector(".delete-type-btn");
        deleteTypeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.store.removeSavedType(item.id);
        });

        typeEl.appendChild(headerEl);

        // --- 3. Body (Collapse Content) ---
        const contentEl = document.createElement("div");
        contentEl.id = `collapse-${item.id}`;
        contentEl.className = "accordion-collapse collapse";

        const bodyEl = document.createElement("div");
        bodyEl.className = "accordion-body p-0";

        const listGroup = document.createElement("ul");
        listGroup.className = "list-group";

        // --- 4. Constructors ---
        constructors.forEach(constructor => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item d-flex justify-content-between border-0 ps-3 pe-1";

            listItem.innerHTML = `
                <div>${constructor.name}</div>
                <button class="btn btn-success btn-sm d-flex align-items-center spawn-cons-btn">
                    <svg svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" fill = "currentColor" class="bi bi-plus-circle-dotted" viewBox = "0 0 16 16" >
                        <path d="M8 0q-.264 0-.523.017l.064.998a7 7 0 0 1 .918 0l.064-.998A8 8 0 0 0 8 0M6.44.152q-.52.104-1.012.27l.321.948q.43-.147.884-.237L6.44.153zm4.132.271a8 8 0 0 0-1.011-.27l-.194.98q.453.09.884.237zm1.873.925a8 8 0 0 0-.906-.524l-.443.896q.413.205.793.459zM4.46.824q-.471.233-.905.524l.556.83a7 7 0 0 1 .793-.458zM2.725 1.985q-.394.346-.74.74l.752.66q.303-.345.648-.648zm11.29.74a8 8 0 0 0-.74-.74l-.66.752q.346.303.648.648zm1.161 1.735a8 8 0 0 0-.524-.905l-.83.556q.254.38.458.793l.896-.443zM1.348 3.555q-.292.433-.524.906l.896.443q.205-.413.459-.793zM.423 5.428a8 8 0 0 0-.27 1.011l.98.194q.09-.453.237-.884zM15.848 6.44a8 8 0 0 0-.27-1.012l-.948.321q.147.43.237.884zM.017 7.477a8 8 0 0 0 0 1.046l.998-.064a7 7 0 0 1 0-.918zM16 8a8 8 0 0 0-.017-.523l-.998.064a7 7 0 0 1 0 .918l.998.064A8 8 0 0 0 16 8M.152 9.56q.104.52.27 1.012l.948-.321a7 7 0 0 1-.237-.884l-.98.194zm15.425 1.012q.168-.493.27-1.011l-.98-.194q-.09.453-.237.884zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a7 7 0 0 1-.458-.793zm13.828.905q.292-.434.524-.906l-.896-.443q-.205.413-.459.793zm-12.667.83q.346.394.74.74l.66-.752a7 7 0 0 1-.648-.648zm11.29.74q.394-.346.74-.74l-.752-.66q-.302.346-.648.648zm-1.735 1.161q.471-.233.905-.524l-.556-.83a7 7 0 0 1-.793.458zm-7.985-.524q.434.292.906.524l.443-.896a7 7 0 0 1-.793-.459zm1.873.925q.493.168 1.011.27l.194-.98a7 7 0 0 1-.884-.237zm4.132.271a8 8 0 0 0 1.012-.27l-.321-.948a7 7 0 0 1-.884.237l.194.98zm-2.083.135a8 8 0 0 0 1.046 0l-.064-.998a7 7 0 0 1-.918 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                    </svg>
                </button>
            `;

            const spawnBtn = listItem.querySelector(".spawn-cons-btn");
            spawnBtn.addEventListener("click", () => {
                this.store.spawnClasicBlock(constructor, typeName, typeParameters, item.id);
            });

            listGroup.appendChild(listItem);
        });

        bodyEl.appendChild(listGroup);
        contentEl.appendChild(bodyEl);
        typeEl.appendChild(contentEl);

        // Append to main list
        this.importedListEl.appendChild(typeEl);
    }
}