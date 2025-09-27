

export default class SavedTypeManager {
    constructor() {

    }

    getData(data) {

        data.new_types.forEach((newType) => {

            this.addItem(newType);





            // let type_name = newType.name;
            // let type_parameters = newType.type_parameters;
            // let explicit_constructors = newType.explicit_constructors;
            // let implicit_constructors = newType.implicit_constructors;

            // // Ternární operátor
            // let constructors = explicit_constructors.length > implicit_constructors.length ? explicit_constructors : implicit_constructors

            // constructors.forEach((newConstructor) => {
            //     let newBlockObj = new ConstructorBlock(newConstructor, type_name, type_parameters);
            //     newBlockObj.createElement();
            //     AppState.blockObjects.push(newBlockObj);

            // });
            // AppState.typeCount += 1;
        });

        this.printList();

    }

    printList() {
        let data = this.getAllItems();
        let typeListEl = document.getElementById("savedTypesList");
        //typeListEl.children = 0;

        data.forEach(val => {
            // Hodnoty
            let newTypeObj = val.type;
            let typeName = newTypeObj.name;
            let typeParameters = newTypeObj.type_parameters;
            let explicitConstructors = newTypeObj.explicit_constructors;
            let implicitConstructors = newTypeObj.implicit_constructors;

            // Ternární operátor
            let constructors = explicitConstructors.length > implicitConstructors.length ? explicitConstructors : implicitConstructors

            // Elementy
            let typeEl = document.createElement("div");
            typeListEl.appendChild(typeEl);
            typeEl.setAttribute("class", "accordion-item");

            let headerEl = document.createElement("h5");
            let contentEl = document.createElement("div");
            typeEl.appendChild(headerEl);
            typeEl.appendChild(contentEl);
            headerEl.setAttribute("class", "accordion-header d-flex");
            contentEl.setAttribute("class", "accordion-collapse collapse");
            contentEl.setAttribute("id", val.id);

            let headerButtonEl = document.createElement("button");
            headerEl.appendChild(headerButtonEl);
            headerButtonEl.setAttribute("class", "accordion-button bg-success-subtle");
            headerButtonEl.setAttribute("data-bs-toggle", "collapse");
            headerButtonEl.setAttribute("data-bs-target", "#" + val.id);
            headerButtonEl.style.fontWeight = "bold";
            headerButtonEl.innerText = typeName;

            let deleteBtnEl = document.createElement("button");
            headerEl.appendChild(deleteBtnEl);
            deleteBtnEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                </svg>`
            deleteBtnEl.setAttribute("class", "btn btn-danger btn-sm d-flex align-items-center mx-1 my-2");



            let contentElBody = document.createElement("div");
            contentEl.appendChild(contentElBody);
            contentElBody.setAttribute("class", "accordion-body");

            let constructorListEl = document.createElement("ul");
            contentElBody.appendChild(constructorListEl);
            constructorListEl.setAttribute("class", "list-group");

            constructors.forEach(constructor => {
                let listItemEl = document.createElement("li");
                constructorListEl.appendChild(listItemEl);
                listItemEl.setAttribute("class", "list-group-item d-flex justify-content-between");

                let constructorNameEl = document.createElement("div");
                listItemEl.appendChild(constructorNameEl)
                constructorNameEl.innerText = constructor.name;

                let spawnBtnEl = document.createElement("button");
                listItemEl.appendChild(spawnBtnEl);
                spawnBtnEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                </svg>`
                spawnBtnEl.setAttribute("class", "btn btn-success btn-sm d-flex align-items-center");






            });

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
    addItem(value) {
        const data = this.loadData();
        data.push({
            id: crypto.randomUUID(),  // unikátní ID
            type: value
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