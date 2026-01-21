import { ConstructorBlock, DefinitionBlock, AtomicBlock } from "../models/Block.js";

export default class BlockFactory {
    constructor() { }

    /**
     * @param {Object} constructorObj - JSON constructor object
     * @param {string} typeName - Name of the data type (e.g., "nat", "bool")
     * @param {Array} typeParameters - Parameters of the data type[{ "X": null }, ...]
     * @param {string} id 
     * @param {string} color 
     */
    createConstructorBlock(constructorObj, typeName, typeParameters, id, color) {
        return new ConstructorBlock(constructorObj, typeName, typeParameters, id, color);
    }

    /**
     * @param {string} typeName - Name of the atomic data type (e.g., "nat", "bool")
     * @param {string} id 
     * @param {string} color 
     */
    createAtomicBlock(typeName, id, color) {
        return new AtomicBlock(typeName, id, color);
    }

    createDefinitionBlock(id) {
        const varName = "a"; // Name of the variable for definition: Definition a: nat := ......
        return new DefinitionBlock(varName, id);
    }
}