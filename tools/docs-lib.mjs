// Pure helpers for tools/gen-docs.mjs (kept apart so test-node/docs.test.mjs can load them).

// A block text such as "drive left %left |\% right %right |\%" or
// "set light %led to %color=francor_colors" becomes a readable title:
// "|\%" is pxt's escape for a literal percent sign; every parameter (%name, $name,
// optionally "=shadowBlock") becomes "…".
export function title(blockText) {
    return blockText
        .replace(/ ?\|\\%/g, "%")
        .replace(/[%$]\w+(=\w+)?/g, "…")
        .replace(/ +/g, " ")
        .trim();
}

// Names of the parameters in the order they appear in the block text.
export function paramOrder(blockText) {
    return [...blockText.matchAll(/[%$](\w+)(?:=\w+)?/g)].map((m) => m[1]);
}

// Sorts parameter names by their position in the block text; names that do not
// appear in the text (such as an event handler) keep their given order at the end.
export function sortParams(names, blockText) {
    const order = paramOrder(blockText);
    const pos = (n) => (order.includes(n) ? order.indexOf(n) : order.length);
    return names.map((n, i) => [n, i]).sort((a, b) => pos(a[0]) - pos(b[0]) || a[1] - b[1]).map((x) => x[0]);
}

export const clean = (s) => String(s).replace(/\\n/g, "\n").trim();

// "speed in percent, eg: 50" -> "Speed in percent, e.g. 50"
export const sentence = (s) => clean(s).replace(/,? eg: /g, ", e.g. ").replace(/^./, (c) => c.toUpperCase());
