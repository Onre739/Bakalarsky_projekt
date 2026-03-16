export default class DefinitionLoader {

    async load(definitionString) {
        // Value check
        if (!definitionString || definitionString.trim() === "") {
            throw new Error("Definition string is empty");
        }

        let response = await fetch("/api/newdef/", {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: definitionString,
        });

        if (!response.ok) throw new Error("Network response was not ok");

        let data = JSON.parse(await response.text());
        return data;
    }

}