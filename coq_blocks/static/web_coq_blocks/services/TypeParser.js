/**
 * Simple parser for Coq type expressions used for polymorphic types.
 * Example input: "list (SuperTree nat bool)"
 * Example output: { name: "list", args: [{ name: "SuperTree", args: [...] }] }
 */
export class TypeParser {
    /**
     * Main method: converts a string like "list (nat)" into an object structure.
     */
    static parse(input) {
        if (!input || input.trim() === "") return null;

        // 1. Tokenization: Split the string into an array like ["list", "(", "nat", ")"]
        // Trick: add spaces around parentheses so we can split by whitespace
        const tokens = input
            .replace(/\(/g, " ( ")
            .replace(/\)/g, " ) ")
            .trim()
            .split(/\s+/) // Split by whitespace
            .filter(t => t.length > 0); // Remove empty strings

        let cursor = 0;

        // 2. Recursive parsing
        function parseExpression() {
            if (cursor >= tokens.length) return null;

            // Read the first token (type head or parenthesis)
            let head = parseToken();

            if (!head) return null;

            // Arguments parsing
            while (cursor < tokens.length && tokens[cursor] !== ")") {
                const arg = parseToken(); // Recursively parse argument
                if (arg) {
                    head.args.push(arg);
                }
            }

            return head;
        }

        function parseToken() {
            if (cursor >= tokens.length) return null;

            const token = tokens[cursor];
            cursor++; // Move cursor forward

            if (token === "(") {
                // Start of parenthesis -> recursively call parseExpression for the inside
                const result = parseExpression();

                // After returning, we must "eat" the closing parenthesis
                if (cursor < tokens.length && tokens[cursor] === ")") {
                    cursor++;
                }
                return result;

            } else if (token === ")") { // Should not happen here, just return null

                cursor--; // Return cursor back so the parent while can handle it
                return null;

            } else { // Just name of type

                return { name: token, args: [] };

            }
        }

        // Start parsing
        const result = parseExpression();

        // Result check: if it's just a string, wrap it
        if (result && typeof result === 'string') {
            return { name: result, args: [] };
        }

        return result;
    }
}