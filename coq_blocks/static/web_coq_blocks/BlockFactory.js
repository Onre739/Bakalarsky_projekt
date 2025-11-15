import { ConstructorBlock, DefinitionBlock, AtomicBlock } from "./Block.js";
import {
    addBlockObject,
    incrementTypeBlockCount,
    incrementDefinitionBlockCount,
    incrementAtomicBlockCount,
    getAtomicBlockCount,
    getTypeBlockCount
} from "./store/appStoreActions.js";

export default class BlockFactory {

    createConstructorBlock(newConstructor, typeName, typeParameters, id) {

        let newBlockObj = new ConstructorBlock(newConstructor, typeName, typeParameters, id);
        newBlockObj.createElement();
        addBlockObject(newBlockObj);

        let typeBlockCount = getTypeBlockCount(id);

        // Kontrola existence záznamu o typu + inkrementace
        if (typeBlockCount >= 0) incrementTypeBlockCount(id);
        else console.error(`There is no record for id ${id}!`);
    }

    createDefinitionBlock() {

        let varName = "a";

        let newBlockObj = new DefinitionBlock(varName);
        newBlockObj.createElement();
        addBlockObject(newBlockObj);

        incrementDefinitionBlockCount();
    }

    createAtomicBlock(dataType, id) {

        let newBlockObj = new AtomicBlock(dataType, id);
        newBlockObj.createElement();
        addBlockObject(newBlockObj);

        let atomicBlockCount = getAtomicBlockCount(id);

        // Kontrola existence záznamu o typu + inkrementace
        if (atomicBlockCount >= 0) incrementAtomicBlockCount(id);
        else console.error(`There is no record for atomic id ${id}!`);
    }

}

