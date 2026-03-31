
// /**
//  * Recursively formats a type for display (e.g., on a Plug or Dot label)
//  * @param {Object|string} typeObj - JSON type object (e.g. {name: "list", args: [...]}) or string "nat"
//  * @returns {string} Formatted string (e.g. "list nat")
//  */
// export function formatType(typeObj) {
//     if (!typeObj) return "?";
//     if (typeof typeObj === 'string') return typeObj; // If it's already a string, return it
//     if (!typeObj.args || typeObj.args.length === 0) return typeObj.name; // If no arguments, return just the name

//     // Recursively format arguments, if an argument is complex, put it in parentheses
//     const formattedArgs = typeObj.args.map(arg => {
//         const str = formatType(arg);
//         return (arg.args && arg.args.length > 0) ? `(${str})` : str;
//     });
//     return `${typeObj.name} ${formattedArgs.join(" ")}`;
// };



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