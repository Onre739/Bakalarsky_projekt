/**
 * Help function to format type objects
 * {name: "list", args: [{name: "nat"}]} -> "list nat"
 * @param {Object} typeObj - Type object
 * @param {boolean} needsParens - Whether the result should be wrapped in parentheses (default: false)
 * @param {boolean} forceExplicit - Whether to add '@' prefix to polymorphic types (default: false)
 * @returns {string} Formatted string (e.g. "list nat")
 */
export function formatType(typeObj, needsParens = false, forceExplicit = false) {
    if (!typeObj) return "Unknown";
    if (typeof typeObj === "string") return typeObj;

    const name = typeObj.name || "Unknown";
    const hasArgs = typeObj.args && typeObj.args.length > 0;

    const atPrefix = (forceExplicit && hasArgs) ? "@" : "";

    // If no arguments, return just the name
    if (!hasArgs) return name;

    // Recursively for arguments
    const argsString = typeObj.args.map(arg => formatType(arg, true, forceExplicit)).join(" ");
    const result = `${atPrefix}${name} ${argsString}`;

    return needsParens ? `(${result})` : result;
}

/**
 * Recursively replaces type parameters
 * @param {Object} typeObj - Type to be replaced (e.g. { name: "A", args: [] })
 * @param {Object} typeParamMap - Map { "A": { name: "nat", args:[] }, "B": { name: "list", args:[...] } }
 * @returns {Object} New type object with replaced parameters
 */
export function resolveTypeParams(typeObj, typeParamMap) {
    if (!typeObj) return null;
    if (!typeParamMap || Object.keys(typeParamMap).length === 0) return typeObj;

    // 1. If typeObj is a string (exception case), check directly in the map
    if (typeof typeObj === 'string') {
        const replacement = typeParamMap[typeObj];
        if (replacement) {
            if (typeof replacement === 'object') {
                return JSON.parse(JSON.stringify(replacement));
            }
            return { name: replacement, args: [] };
        }
        return { name: typeObj, args: [] };
    }

    // 2. Check if typeObj.name is a type parameter to be replaced
    const replacement = typeParamMap[typeObj.name];

    if (replacement) {
        if (typeof replacement === 'object') {
            return JSON.parse(JSON.stringify(replacement));
        }

        // Fallback to string replacement
        return { name: replacement, args: [] };
    }

    // 3. Recurse for arguments
    const newArgs = (typeObj.args || []).map(arg => resolveTypeParams(arg, typeParamMap));

    return {
        ...typeObj,
        args: newArgs
    };
}