import { AppState } from "./AppState.js";
import { ConstructorBlock, DefinitionBlock, AtomicBlock } from "./Block.js";

export default class BlockFactory {

    createConstructorBlock(newConstructor, typeName, typeParameters, id) {

        let newBlockObj = new ConstructorBlock(newConstructor, typeName, typeParameters, id);
        newBlockObj.createElement();
        AppState.blockObjects.push(newBlockObj);
        let blockCount = AppState.typeBlockCount.has(id) ? AppState.typeBlockCount.get(id) : -1;

        // Kontrola existence záznamu o typu
        if (blockCount >= 0) AppState.typeBlockCount.set(id, blockCount + 1);
        else console.error(`There is no record for id ${id}!`);
    }

    createDefinitionBlock() {

        let varName = "a";

        let newBlockObj = new DefinitionBlock(varName);
        newBlockObj.createElement();
        AppState.blockObjects.push(newBlockObj);

        AppState.definitionBlockCount += 1;
    }

    createAtomicBlock(dataType, id) {
        let newBlockObj = new AtomicBlock(dataType, id);
        newBlockObj.createElement();
        AppState.blockObjects.push(newBlockObj);

        AppState.atomicBlockCount += 1;
    }

}

