import { AppState } from "./AppState.js";
import BlockFactory from "./BlockFactory.js";

export default class SavedTypeManager {
    constructor() {
        this.blockFactory = new BlockFactory();
    }

    getClasicData(data) {
        data.newTypes.forEach((newType) => {
            this.addItem(newType, "clasic");
        });

        this.printList();

    }

    getAtomicData(data) {
        // Pouze 1 typ najednou
        this.addItem(data, "atomic");

        this.printList();

    }

    printList() {
        let data = this.getAllItems();
        let importedTypeListEl = document.getElementById("importedTypesList");
        importedTypeListEl.innerHTML = "";
        let atomicTypeListEl = document.getElementById("atomicTypesList");
        atomicTypeListEl.innerHTML = "";

        data.forEach(val => {

            switch (val.sort) {

                case "atomic":
                    let dataTypeName = val.dataType;
                    let listEl = document.getElementById("atomicTypesList");

                    let listItemEl = document.createElement("li");
                    listEl.appendChild(listItemEl);
                    listItemEl.setAttribute("class", "list-group-item d-flex justify-content-between border-0 pe-1 ");

                    let nameEl = document.createElement("div");
                    listItemEl.appendChild(nameEl)
                    nameEl.innerText = dataTypeName;

                    // Div s buttony
                    let btnDivEl = document.createElement("div");
                    listItemEl.appendChild(btnDivEl);
                    btnDivEl.setAttribute("class", "d-flex gap-1");

                    // Buttony
                    let spawnBtnEl = document.createElement("button");
                    btnDivEl.appendChild(spawnBtnEl);
                    spawnBtnEl.innerHTML = `<svg svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" fill = "currentColor" class="bi bi-plus-circle-dotted" viewBox = "0 0 16 16" >
                                <path d="M8 0q-.264 0-.523.017l.064.998a7 7 0 0 1 .918 0l.064-.998A8 8 0 0 0 8 0M6.44.152q-.52.104-1.012.27l.321.948q.43-.147.884-.237L6.44.153zm4.132.271a8 8 0 0 0-1.011-.27l-.194.98q.453.09.884.237zm1.873.925a8 8 0 0 0-.906-.524l-.443.896q.413.205.793.459zM4.46.824q-.471.233-.905.524l.556.83a7 7 0 0 1 .793-.458zM2.725 1.985q-.394.346-.74.74l.752.66q.303-.345.648-.648zm11.29.74a8 8 0 0 0-.74-.74l-.66.752q.346.303.648.648zm1.161 1.735a8 8 0 0 0-.524-.905l-.83.556q.254.38.458.793l.896-.443zM1.348 3.555q-.292.433-.524.906l.896.443q.205-.413.459-.793zM.423 5.428a8 8 0 0 0-.27 1.011l.98.194q.09-.453.237-.884zM15.848 6.44a8 8 0 0 0-.27-1.012l-.948.321q.147.43.237.884zM.017 7.477a8 8 0 0 0 0 1.046l.998-.064a7 7 0 0 1 0-.918zM16 8a8 8 0 0 0-.017-.523l-.998.064a7 7 0 0 1 0 .918l.998.064A8 8 0 0 0 16 8M.152 9.56q.104.52.27 1.012l.948-.321a7 7 0 0 1-.237-.884l-.98.194zm15.425 1.012q.168-.493.27-1.011l-.98-.194q-.09.453-.237.884zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a7 7 0 0 1-.458-.793zm13.828.905q.292-.434.524-.906l-.896-.443q-.205.413-.459.793zm-12.667.83q.346.394.74.74l.66-.752a7 7 0 0 1-.648-.648zm11.29.74q.394-.346.74-.74l-.752-.66q-.302.346-.648.648zm-1.735 1.161q.471-.233.905-.524l-.556-.83a7 7 0 0 1-.793.458zm-7.985-.524q.434.292.906.524l.443-.896a7 7 0 0 1-.793-.459zm1.873.925q.493.168 1.011.27l.194-.98a7 7 0 0 1-.884-.237zm4.132.271a8 8 0 0 0 1.012-.27l-.321-.948a7 7 0 0 1-.884.237l.194.98zm-2.083.135a8 8 0 0 0 1.046 0l-.064-.998a7 7 0 0 1-.918 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                            </svg>`

                    spawnBtnEl.setAttribute("class", "btn btn-success btn-sm d-flex align-items-center");

                    let deleteBtnEll = document.createElement("button");
                    btnDivEl.appendChild(deleteBtnEll);
                    deleteBtnEll.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                    </svg>`
                    deleteBtnEll.setAttribute("class", "btn btn-danger btn-sm d-flex align-items-center");
                    deleteBtnEll.setAttribute("id", `delBtn:${val.id}`);


                    // Listeneři pro add
                    spawnBtnEl.addEventListener("click", () => {
                        this.blockFactory.createAtomicBlock(dataTypeName, val.id);
                    });

                    // Listener pro delete
                    document.getElementById(`delBtn:${val.id}`).addEventListener("click", () => {
                        this.removeItem(val.id);
                        this.printList();
                    });

                    break;

                case "clasic":

                    // Hodnoty
                    let newTypeObj = val.dataType;

                    let typeName = newTypeObj.name;
                    let typeParameters = newTypeObj.typeParameters;
                    let explicitConstructors = newTypeObj.explicitConstructors;
                    let implicitConstructors = newTypeObj.implicitConstructors;

                    let constructors = explicitConstructors.length > implicitConstructors.length ? explicitConstructors : implicitConstructors

                    // Elementy
                    let typeEl = document.createElement("div");
                    importedTypeListEl.appendChild(typeEl);
                    typeEl.setAttribute("class", "accordion-item");

                    let headerEl = document.createElement("h5");
                    let contentEl = document.createElement("div");
                    typeEl.appendChild(headerEl);
                    typeEl.appendChild(contentEl);
                    headerEl.setAttribute("class", "accordion-header d-flex bg-light-subtle");
                    contentEl.setAttribute("class", "accordion-collapse collapse");
                    contentEl.setAttribute("id", val.id);

                    let headerButtonEl = document.createElement("button");
                    headerEl.appendChild(headerButtonEl);
                    headerButtonEl.setAttribute("class", "accordion-button collapsed px-3 py-1 bg-light-subtle text-success");
                    headerButtonEl.setAttribute("data-bs-toggle", "collapse");
                    headerButtonEl.setAttribute("data-bs-target", "#" + val.id);
                    headerButtonEl.style.fontWeight = "500";
                    headerButtonEl.innerText = typeName;

                    // Setting button
                    let settingBtnEl = document.createElement("button");
                    headerEl.appendChild(settingBtnEl);
                    settingBtnEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
                    </svg>`
                    settingBtnEl.setAttribute("class", "btn btn-secondary btn-sm d-flex align-items-center mx-0 my-2");
                    settingBtnEl.setAttribute("id", `setBtn:${val.id}`);
                    settingBtnEl.setAttribute("data-bs-toggle", "modal");
                    settingBtnEl.setAttribute("data-bs-target", `#settingModal`);

                    // Delete button
                    let deleteBtnEl = document.createElement("button");
                    headerEl.appendChild(deleteBtnEl);
                    deleteBtnEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                    </svg>`
                    deleteBtnEl.setAttribute("class", "btn btn-danger btn-sm d-flex align-items-center mx-1 my-2");
                    deleteBtnEl.setAttribute("id", `delBtn:${val.id}`);


                    let contentElBody = document.createElement("div");
                    contentEl.appendChild(contentElBody);
                    contentElBody.setAttribute("class", "accordion-body p-0");

                    let constructorListEl = document.createElement("ul");
                    contentElBody.appendChild(constructorListEl);
                    constructorListEl.setAttribute("class", "list-group");

                    constructors.forEach(constructor => {
                        let listItemEl = document.createElement("li");
                        constructorListEl.appendChild(listItemEl);
                        listItemEl.setAttribute("class", "list-group-item d-flex justify-content-between border-0 ps-3 pe-1");

                        let constructorNameEl = document.createElement("div");
                        listItemEl.appendChild(constructorNameEl)
                        constructorNameEl.innerText = constructor.name;

                        let spawnBtnEl = document.createElement("button");
                        listItemEl.appendChild(spawnBtnEl);
                        spawnBtnEl.innerHTML = `<svg svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" fill = "currentColor" class="bi bi-plus-circle-dotted" viewBox = "0 0 16 16" >
                                <path d="M8 0q-.264 0-.523.017l.064.998a7 7 0 0 1 .918 0l.064-.998A8 8 0 0 0 8 0M6.44.152q-.52.104-1.012.27l.321.948q.43-.147.884-.237L6.44.153zm4.132.271a8 8 0 0 0-1.011-.27l-.194.98q.453.09.884.237zm1.873.925a8 8 0 0 0-.906-.524l-.443.896q.413.205.793.459zM4.46.824q-.471.233-.905.524l.556.83a7 7 0 0 1 .793-.458zM2.725 1.985q-.394.346-.74.74l.752.66q.303-.345.648-.648zm11.29.74a8 8 0 0 0-.74-.74l-.66.752q.346.303.648.648zm1.161 1.735a8 8 0 0 0-.524-.905l-.83.556q.254.38.458.793l.896-.443zM1.348 3.555q-.292.433-.524.906l.896.443q.205-.413.459-.793zM.423 5.428a8 8 0 0 0-.27 1.011l.98.194q.09-.453.237-.884zM15.848 6.44a8 8 0 0 0-.27-1.012l-.948.321q.147.43.237.884zM.017 7.477a8 8 0 0 0 0 1.046l.998-.064a7 7 0 0 1 0-.918zM16 8a8 8 0 0 0-.017-.523l-.998.064a7 7 0 0 1 0 .918l.998.064A8 8 0 0 0 16 8M.152 9.56q.104.52.27 1.012l.948-.321a7 7 0 0 1-.237-.884l-.98.194zm15.425 1.012q.168-.493.27-1.011l-.98-.194q-.09.453-.237.884zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a7 7 0 0 1-.458-.793zm13.828.905q.292-.434.524-.906l-.896-.443q-.205.413-.459.793zm-12.667.83q.346.394.74.74l.66-.752a7 7 0 0 1-.648-.648zm11.29.74q.394-.346.74-.74l-.752-.66q-.302.346-.648.648zm-1.735 1.161q.471-.233.905-.524l-.556-.83a7 7 0 0 1-.793.458zm-7.985-.524q.434.292.906.524l.443-.896a7 7 0 0 1-.793-.459zm1.873.925q.493.168 1.011.27l.194-.98a7 7 0 0 1-.884-.237zm4.132.271a8 8 0 0 0 1.012-.27l-.321-.948a7 7 0 0 1-.884.237l.194.98zm-2.083.135a8 8 0 0 0 1.046 0l-.064-.998a7 7 0 0 1-.918 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                            </svg>`
                        spawnBtnEl.setAttribute("class", "btn btn-success btn-sm d-flex align-items-center");


                        // Listeneři pro add
                        spawnBtnEl.addEventListener("click", () => {
                            this.blockFactory.createConstructorBlock(constructor, typeName, typeParameters, val.id);
                        });
                    });

                    // Listener pro delete
                    document.getElementById(`delBtn:${val.id}`).addEventListener("click", () => {
                        this.removeItem(val.id);
                        this.printList();
                    });


                    // Nový záznam pro počet bloků daného typu
                    AppState.typeBlockCount.set(val.id, 0);

                    break;

            }

        });
    }

    // Funkce pro načtení uložených dat
    loadData() {
        const data = localStorage.getItem("myData");
        return data ? JSON.parse(data) : [];
    }

    // Funkce pro uložení dat
    saveData(data) {
        localStorage.setItem("myData", JSON.stringify(data));
    }

    // Přidání nové položky
    addItem(value, sort) {
        const data = this.loadData();
        data.push({
            id: crypto.randomUUID(),  // unikátní ID
            sort: sort,
            dataType: value
        });
        this.saveData(data);
    }

    // Smazání konkrétní položky podle ID
    removeItem(id) {
        let data = this.loadData();
        data = data.filter(item => item.id !== id);
        this.saveData(data);
    }

    // Vypsání všech hodnot
    getAllItems() {
        return this.loadData();
    }


}