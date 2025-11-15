import { pushRawHypothesis, pushRawConstructor } from "./store/appStoreActions.js";

export default class DefinitionLoader {

    // Načtení dat
    async load() {
        // Zisk dat
        let definition = document.getElementById("defInput").value;

        // Vymazání inputu
        document.getElementById("defInput").value = "";

        let response = await fetch("http://127.0.0.1:8000/api/newdef/", {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: definition,
        });

        if (!response.ok) throw new Error("Network response was not ok");

        let data = JSON.parse(await response.text());

        data.hypothesis.forEach(hypothes => pushRawHypothesis(hypothes));
        data.newTypes.forEach(newType => {
            if (newType.explicitConstructors.length !== 0) {
                newType.explicitConstructors.forEach(constructor =>
                    pushRawConstructor(constructor)
                );
            } else if (newType.implicitConstructors.length !== 0) {
                newType.implicitConstructors.forEach(constructor =>
                    pushRawConstructor(constructor)
                );
            }
        });

        console.log("Success return:", data);
        return data;
    }

}