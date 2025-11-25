export class Store {
    constructor(initialState = {}) {
        this.state = initialState;
        this.listeners = [];
    }

    getState() {
        return this.state;
    }

    subscribe(fn) {
        this.listeners.push(fn);
        return () => {
            this.listeners = this.listeners.filter(l => l !== fn);
        };
    }

    notify() {
        this.listeners.forEach(fn => fn());
    }

    // Pomocná metoda na změnu stavu
    setState(patch) {
        Object.assign(this.state, patch);
        this.notify();
    }
}