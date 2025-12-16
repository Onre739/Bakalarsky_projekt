export default class SavedTypeManager {
    constructor() {
        this.STORAGE_KEY = "myData";
    }

    // Load data from localStorage
    loadData() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    // Save data to localStorage
    saveData(data) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }

    // Helpful method for adding (called by Store)
    addItem(dataArray, newItem, type) {
        const item = {
            id: crypto.randomUUID(),
            sort: type, // "atomic" or "clasic"
            dataType: newItem
        };
        const newData = [...dataArray, item];
        this.saveData(newData);
        return newData;
    }

    // Helpful method for removing (called by Store)
    removeItem(dataArray, id) {
        const newData = dataArray.filter(item => item.id !== id);
        this.saveData(newData);
        return newData;
    }
}