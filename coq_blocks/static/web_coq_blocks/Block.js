export default class Block {
    constructor(data) {
        this.id = Block.generateId();
        this.type = data.type;
        this.params = data.params;
        this.element = this.createElement();
    }

    createElement() {
        // vytvoří DOM <div class="block">
        // přidá dot, plugy, tlačítko delete
    }

    resize() {
        // přepočítá velikost podle obsahu
    }

    setPosition(x, y) {
        this.element.style.transform = `translate(${x}px, ${y}px)`;
    }

    static generateId() {
        return "block_" + Math.random().toString(36).slice(2, 9);
    }
}