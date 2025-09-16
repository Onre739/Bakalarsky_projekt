import { AppState } from "./AppState.js";
import { ConstructorBlock, DefinitionBlock } from "./Block.js";

export default class BlockFactory {

    createBlock(data) {

        data.new_types.forEach((newType) => {
            let type_name = newType.name;
            let type_parameters = newType.type_parameters;
            let explicit_constructors = newType.explicit_constructors;
            let implicit_constructors = newType.implicit_constructors;

            // Ternární operátor
            let constructors = explicit_constructors.length > implicit_constructors.length ? explicit_constructors : implicit_constructors

            constructors.forEach((newConstructor) => {
                let newBlockObj = new ConstructorBlock(newConstructor, type_name, type_parameters);
                newBlockObj.createElement();
                AppState.blockObjects.push(newBlockObj);

            });
            AppState.typeCount += 1;
        });

        // přidání snap pozice
        // updateSnapTargets();
    }

    createDefinitionBlock() {

        let varName = "a";

        let newBlockObj = new DefinitionBlock(varName);
        newBlockObj.createElement();
        AppState.blockObjects.push(newBlockObj);
    }

}

