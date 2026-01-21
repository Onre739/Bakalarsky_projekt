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
        li.className = "list-group-item d-flex justify-content-between align-items-center border-0 pe-2";

        const typeName = item.name ? item.name : "Unknown";

        li.innerHTML = `
            <div>${typeName}</div>
            
            <div class="d-flex align-items-center gap-2">
                <svg id="spawn-btn-${item.id}" 
                     class="spawn-btn text-success" 
                     style="cursor: pointer; transition: transform 0.1s, color 0.2s;"
                     onmouseover="this.classList.replace('text-success', 'text-success-emphasis'); this.style.transform='scale(1.1)'" 
                     onmouseout="this.classList.replace('text-success-emphasis', 'text-success'); this.style.transform='scale(1)'"
                     xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                     <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5"/>
                     <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z"/>
                </svg>

                <svg id="delete-btn-${item.id}" 
                     class="delete-btn text-danger" 
                     style="cursor: pointer; transition: transform 0.1s, color 0.2s;"
                     onmouseover="this.classList.replace('text-danger', 'text-danger-emphasis'); this.style.transform='scale(1.1)'" 
                     onmouseout="this.classList.replace('text-danger-emphasis', 'text-danger'); this.style.transform='scale(1)'"
                     xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                     <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                </svg>
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
        const newTypeObj = item;
        const typeName = newTypeObj.name;
        const typeParameters = newTypeObj.typeParameters;
        const id = newTypeObj.id;

        const constructors = newTypeObj.constructors || [];

        // --- 1. Main element (Accordion Item) ---
        const typeEl = document.createElement("div");
        typeEl.className = "accordion-item";

        // --- 2. Header ---
        const headerEl = document.createElement("h5");
        headerEl.className = "accordion-header d-flex align-items-center bg-light-subtle pe-2";

        headerEl.innerHTML = `
            <button class="accordion-button collapsed px-3 py-2 bg-light-subtle text-success flex-grow-1" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapse-${item.id}" 
                    aria-expanded="false" 
                    aria-controls="collapse-${item.id}"
                    style="font-weight: 500; box-shadow: none;"> 
                ${typeName}
            </button>
            
            <div class="d-flex align-items-center gap-2">
                <svg class="settings-btn text-secondary" style="cursor: pointer; transition: color 0.2s;"
                     data-bs-toggle="modal" 
                     data-bs-target="#settingModal" 
                     onmouseover="this.classList.replace('text-secondary', 'text-dark'); this.style.transform='scale(1.1)'" 
                     onmouseout="this.classList.replace('text-dark', 'text-secondary'); this.style.transform='scale(1)'"
                     xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.86z"/>
                </svg>

                <svg class="delete-type-btn text-danger" style="cursor: pointer; transition: color 0.2s;"
                     onmouseover="this.classList.replace('text-danger', 'text-danger-emphasis'); this.style.transform='scale(1.1)'" 
                     onmouseout="this.classList.replace('text-danger-emphasis', 'text-danger'); this.style.transform='scale(1)'"
                     xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                </svg>
            </div>
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

            // --- 2.1.0 Original Definiton ---
            let codeLabel = document.createElement("label");
            codeLabel.innerText = "Original Definition: ";
            codeLabel.className = "form-label fw-bold";

            let codeArea = document.createElement("div");
            codeArea.className = "form-control font-monospace bg-light";
            codeArea.style.fontSize = "0.85em";

            codeArea.style.whiteSpace = "pre-wrap"; // Respektuje \n a zalamuje řádky
            // codeArea.style.whiteSpace = "pre";   // Respektuje \n, ale NEZALAMUJE dlouhé řádky (udělá scrollbar)

            codeArea.style.maxHeight = "200px";     // Omezení výšky
            codeArea.style.overflowY = "auto";      // Scrollbar, pokud je text dlouhý
            codeArea.textContent = item.fullText || "Definition source not available.";

            settingModalBody.appendChild(codeLabel);
            settingModalBody.appendChild(codeArea);

            // --- 2.1.1 Generate inputs for each type parameter ---
            let paramLabel = document.createElement("div");
            paramLabel.innerText = "Parameters: ";
            paramLabel.className = "form-label fw-bold mt-3";
            settingModalBody.appendChild(paramLabel);

            // Parameter check
            const warnDiv = document.getElementById("settingModalWarnDiv");
            if (!typeParameters || typeParameters.length === 0) {
                let div = document.createElement("div");
                div.innerText = "This type has no type parameters.";
                settingModalBody.appendChild(div);

                if (warnDiv) warnDiv.style.display = "none";
            }
            else {
                if (warnDiv) warnDiv.style.display = "block";
            }

            typeParameters.forEach((param, index) => {
                // Param structure: { "A": "hodnota" } nebo { "A": null }
                const typeKey = Object.keys(param)[0];
                const storedValue = param[typeKey];

                let rowDiv = document.createElement("div");
                rowDiv.className = "d-flex align-items-center mb-3";

                let paramDivLabel = document.createElement("label");
                paramDivLabel.innerText = `${typeKey}:`;
                paramDivLabel.className = "form-label me-3 mb-0 text-nowrap";
                paramDivLabel.htmlFor = `typeParamInput:${id}:${typeKey}:${index}`;

                let paramDivInput = document.createElement("input");
                paramDivInput.type = "text";
                paramDivInput.className = "form-control";
                paramDivInput.id = `typeParamInput:${id}:${typeKey}:${index}`;

                if (storedValue !== null) {
                    paramDivInput.value = storedValue;
                }

                rowDiv.appendChild(paramDivLabel);
                rowDiv.appendChild(paramDivInput);
                settingModalBody.appendChild(rowDiv);
            });

            // --- 2.1.2 --- Color picker ---
            let colorLabel = document.createElement("label");
            colorLabel.innerText = "Block Color: ";
            colorLabel.className = "form-label fw-bold mt-3";
            settingModalBody.appendChild(colorLabel);

            let colorInput = document.createElement("input");
            colorInput.type = "color";
            colorInput.className = "form-control form-control-color mb-3";
            colorInput.value = item.color || "#808080"; // Actual color
            colorInput.title = "Choose your color";

            let colorDiv = document.createElement("div");
            colorDiv.className = "d-flex gap-2";
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
                    const input = document.getElementById(`typeParamInput:${id}:${typeKey}:${idx}`);
                    const newValue = input.value.trim() === "" ? null : input.value.trim();

                    // Return the updated parameter object
                    return { [typeKey]: newValue };
                });

                // B) Get new color
                const newColor = colorInput.value;

                // C) Call Store to update
                this.store.updateTypeColor(id, newColor);

                // Check if parameters changed
                const paramsChanged = JSON.stringify(typeParameters) !== JSON.stringify(updatedParameters);
                if (paramsChanged) {
                    console.log("Parameters changed - updating definition and removing blocks.");
                    this.store.updateTypeParameters(id, updatedParameters);
                } else {
                    console.log("Parameters unchanged - skipping block removal.");
                }
            });
        });

        // --- 2.2 Delete button listener ---
        const deleteTypeBtn = headerEl.querySelector(".delete-type-btn");
        deleteTypeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.store.removeSavedType(id);
        });

        typeEl.appendChild(headerEl);

        // --- 3. Body (Collapse Content) ---
        const contentEl = document.createElement("div");
        contentEl.id = `collapse-${id}`;
        contentEl.className = "accordion-collapse collapse";

        const bodyEl = document.createElement("div");
        bodyEl.className = "accordion-body p-0";

        const listGroup = document.createElement("ul");
        listGroup.className = "list-group";

        // --- 4. Constructors ---
        constructors.forEach(constructor => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item d-flex justify-content-between align-items-center border-0 ps-3 pe-2";

            listItem.innerHTML = `
                <div>${constructor.name}</div>
                
                <svg class="spawn-cons-btn text-success" 
                     style="cursor: pointer; transition: transform 0.1s, color 0.2s;"
                     onmouseover="this.classList.replace('text-success', 'text-success-emphasis'); this.style.transform='scale(1.1)'" 
                     onmouseout="this.classList.replace('text-success-emphasis', 'text-success'); this.style.transform='scale(1)'"
                     xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5"/>
                    <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z"/>
                </svg>
            `;

            const spawnBtn = listItem.querySelector(".spawn-cons-btn");
            spawnBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                this.store.spawnClasicBlock(constructor, typeName, typeParameters, id);
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