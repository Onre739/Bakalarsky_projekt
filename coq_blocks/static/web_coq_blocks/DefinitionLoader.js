import { AppState } from "./AppState.js";

export default class DefinitionLoader {

    // Načtení dat
    async load() {
        let definition = $("#defInput").val();

        let response = await fetch("http://127.0.0.1:8000/api/newdef/", {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: definition,
        });

        if (!response.ok) throw new Error("Network response was not ok");

        let data = JSON.parse(await response.text());

        data.hypothesis.forEach(hypothes => AppState.hypothesisObjects.push(hypothes));
        data.new_types.forEach(new_type => {
            if (new_type.explicit_constructors.length !== 0) {
                new_type.explicit_constructors.forEach(constructor =>
                    AppState.blockObjects.push(constructor)
                );
            } else if (new_type.implicit_constructors.length !== 0) {
                new_type.implicit_constructors.forEach(constructor =>
                    AppState.blockObjects.push(constructor)
                );
            }
        });

        console.log("Success return:", data);
        return data;
    }

}