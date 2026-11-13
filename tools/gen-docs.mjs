// Writes one help page per block from the locale files:
//   docs/<name>.md                  English
//   _locales/de/docs/<name>.md      German
// MakeCode opens docs/<name>.md when someone right-clicks a block and picks
// "Hilfe", because every block carries `//% help=github:franc0r/pxt-francor-maqueen/docs/<name>`.
// For a German user MakeCode should prefer _locales/de/docs/<name>.md (its lookup for
// GitHub markdown; not confirmed for help pages, see geraetetest/README.md).
//
//   node tools/gen-docs.mjs          writes docs/*.md
//   node tools/gen-docs.mjs --check  fails if docs/ is out of date or a block has no help line
//
// Run `npm run check:locales` first (it refreshes the English locale files).
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");
const load = (p) => JSON.parse(readFileSync(join(root, "_locales", p), "utf8"));
const en = { ...load("francor-maqueen-strings.json"), ...load("francor-maqueen-jsdoc-strings.json") };
const de = { ...load("de/francor-maqueen-strings.json"), ...load("de/francor-maqueen-jsdoc-strings.json") };

// Blocks = keys "<namespace>.<function>|block" (enum members have three parts).
const blocks = Object.keys(en)
    .filter((k) => k.endsWith("|block") && k.slice(0, -6).split(".").length === 2)
    .map((k) => k.slice(0, -6))
    .sort();

const clean = (s) => String(s).replace(/\\n/g, "\n").trim();
// "|\%" is pxt's escape for a literal percent sign in a block text.
const shown = (s) => s.replace(/\|\\%/g, "%").replace(/%(\w+)/g, "[$1]");

function page(strings, key, lang) {
    const out = [`# ${shown(strings[key + "|block"])}`, ""];
    if (strings[key]) out.push(clean(strings[key]), "");
    const params = Object.keys(strings).filter((k) => k.startsWith(key + "|param|"));
    if (params.length) {
        out.push(lang === "de" ? "Parameter:" : "Parameters:", "");
        for (const p of params) out.push(`* \`${p.split("|param|")[1]}\`: ${clean(strings[p])}`);
        out.push("");
    }
    out.push(lang === "de"
        ? "[English version](https://github.com/franc0r/pxt-francor-maqueen/blob/main/docs/" + key.replace(".", "-") + ".md)"
        : "[Deutsche Version](https://github.com/franc0r/pxt-francor-maqueen/blob/main/_locales/de/docs/" + key.replace(".", "-") + ".md)", "");
    return out.join("\n");
}

// files: path relative to the repo root -> text
const files = {};
for (const key of blocks) {
    const name = key.replace(".", "-");
    files[`docs/${name}.md`] = page(en, key, "en");
    files[`_locales/de/docs/${name}.md`] = page(de, key, "de");
}
const pages = Object.fromEntries(blocks.map((k) => [k.replace(".", "-"), 1]));

// Every block must point at its page.
const problems = [];
const helpRe = /\/\/% blockId=(\w+).*\n(?:\s*\/\/%.*\n)*?\s*\/\/% help=github:franc0r\/pxt-francor-maqueen\/docs\/([\w-]+)/g;
const used = new Set();
for (const f of readdirSync(root).filter((f) => f.endsWith(".ts") && f !== "test.ts")) {
    const src = readFileSync(join(root, f), "utf8");
    for (const m of src.matchAll(helpRe)) used.add(m[2]);
    const ids = [...src.matchAll(/\/\/% blockId=(\w+)/g)].length;
    const helps = [...src.matchAll(/\/\/% help=/g)].length;
    if (ids !== helps) problems.push(`${f}: ${ids} blocks, ${helps} help lines`);
}
for (const name of Object.keys(pages)) if (!used.has(name)) problems.push(`no block points at docs/${name}.md`);
for (const name of used) if (!(name in pages)) problems.push(`help line points at missing page docs/${name}.md`);

if (check) {
    for (const [path, text] of Object.entries(files)) {
        const p = join(root, path);
        if (!existsSync(p) || readFileSync(p, "utf8") !== text) problems.push(`${path} is out of date (run node tools/gen-docs.mjs)`);
    }
} else {
    for (const [path, text] of Object.entries(files)) {
        mkdirSync(dirname(join(root, path)), { recursive: true });
        writeFileSync(join(root, path), text);
    }
}
if (problems.length) {
    console.error(problems.join("\n"));
    process.exit(1);
}
console.log(`${check ? "Docs OK" : "Wrote"}: ${blocks.length} blocks x 2 languages`);
