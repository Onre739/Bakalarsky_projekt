import { ConstructorBlock, DefinitionBlock, AtomicBlock } from "../models/Block.js";

export default class BlockFactory {
    constructor() { }

    createConstructorBlock(constructor, typeName, typeParameters, id, color) {
        return new ConstructorBlock(constructor, typeName, typeParameters, id, color);
    }

    createAtomicBlock(dataType, id, color) {
        return new AtomicBlock(dataType, id, color);
    }

    createDefinitionBlock(id) {
        const varName = "a"; // Název proměnné pro definici: Definition a: nat := ......
        return new DefinitionBlock(varName, id);
    }
}
