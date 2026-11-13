// Writes one help page per block from the locale files:
//   docs/<name>.md                  English
//   docs/_locales/de/<name>.md      German
// Every block carries `//% help=github:francor-maqueen/docs/<name>`. The editor looks the
// file up among the files of the project and its extensions, where a file is named
// "<name in pxt.json>/<path>", and for a German user it tries
// "francor-maqueen/docs/_locales/de/<name>.md" first. So the pages must also be listed
// in pxt.json "files"; this script keeps that list in sync.
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

const examples = JSON.parse(readFileSync(join(root, "tools", "doc-examples.json"), "utf8"));
const clean = (s) => String(s).replace(/\\n/g, "\n").trim();
// "|\%" is pxt's escape for a literal percent sign in a block text; "%name" is a parameter.
const title = (s) => s.replace(/ ?\|\\%/g, "%").replace(/%(\w+)/g, "[$1]").trim();
const sentence = (s) => clean(s).replace(/,? eg: /g, ", e.g. ").replace(/^./, (c) => c.toUpperCase());

const T = {
    en: { example: "Example", params: "Parameters", name: "Parameter", meaning: "Meaning" },
    de: { example: "Beispiel", params: "Parameter", name: "Parameter", meaning: "Bedeutung" }
};

function page(strings, key, lang) {
    const t = T[lang];
    const out = [`# ${title(strings[key + "|block"])}`, ""];
    if (strings[key]) {
        for (const para of clean(strings[key]).split("\n")) if (para.trim()) out.push(para.trim(), "");
    }
    if (!examples[key]) problems.push(`doc-examples.json has no example for ${key}`);
    else out.push(`## ${t.example}`, "", "```blocks", examples[key], "```", "");
    const params = Object.keys(strings).filter((k) => k.startsWith(key + "|param|"));
    if (params.length) {
        out.push(`## ${t.params}`, "", `| ${t.name} | ${t.meaning} |`, "|---|---|");
        for (const p of params) out.push(`| \`${p.split("|param|")[1]}\` | ${sentence(strings[p]).replace(/\|/g, "\\|")} |`);
        out.push("");
    }
    out.push("---", "", "FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)", "");
    return out.join("\n");
}

const problems = [];
// files: path relative to the repo root -> text
const files = {};
for (const key of blocks) {
    const name = key.replace(".", "-");
    files[`docs/${name}.md`] = page(en, key, "en");
    files[`docs/_locales/de/${name}.md`] = page(de, key, "de");
}
const pages = Object.fromEntries(blocks.map((k) => [k.replace(".", "-"), 1]));

// Every block must point at its page.
const helpRe = /\/\/% blockId=(\w+).*\n(?:\s*\/\/%.*\n)*?\s*\/\/% help=github:francor-maqueen\/docs\/([\w-]+)/g;
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

// pxt.json "files" must list every page (the editor only knows listed files).
const pxtPath = join(root, "pxt.json");
const pxt = JSON.parse(readFileSync(pxtPath, "utf8"));
const wanted = [...pxt.files.filter((f) => !f.startsWith("docs/")), ...Object.keys(files).sort()];
const same = JSON.stringify(wanted) === JSON.stringify(pxt.files);

if (check) {
    if (!same) problems.push("pxt.json files does not list the docs pages (run node tools/gen-docs.mjs)");
    for (const [path, text] of Object.entries(files)) {
        const p = join(root, path);
        if (!existsSync(p) || readFileSync(p, "utf8") !== text) problems.push(`${path} is out of date (run node tools/gen-docs.mjs)`);
    }
} else {
    for (const [path, text] of Object.entries(files)) {
        mkdirSync(dirname(join(root, path)), { recursive: true });
        writeFileSync(join(root, path), text);
    }
    if (!same) writeFileSync(pxtPath, JSON.stringify({ ...pxt, files: wanted }, null, 4) + "\n");
}
if (problems.length) {
    console.error(problems.join("\n"));
    process.exit(1);
}
console.log(`${check ? "Docs OK" : "Wrote"}: ${blocks.length} blocks x 2 languages`);
