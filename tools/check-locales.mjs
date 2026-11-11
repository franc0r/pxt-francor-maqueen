// Checks that the German translation covers every translatable string.
//
// 1. `npx pxt gendocs --locs` makes pxt write the English string files
//    _locales/francor-maqueen-strings.json and _locales/francor-maqueen-jsdoc-strings.json
//    (found with `npx pxt help gendocs`: "--locs  produce localization files").
//    These generated files are committed so changes show up in diffs.
// 2. Every key of those files must exist in _locales/de/<same name>, with a
//    non-empty value and the same set of %name / $name placeholders.
//
// Notes on pxt's output: group keys ({id:group}Name) and category keys
// ({id:category}Name, from the namespace name with a capital first letter) are
// only generated once a block uses them. German entries without an English
// counterpart are therefore not an error; they are listed as a hint.
import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const files = ["francor-maqueen-strings.json", "francor-maqueen-jsdoc-strings.json"];

execSync("npx pxt gendocs --locs", { cwd: root, stdio: "pipe" });

const placeholders = (s) => (s.match(/[%$][A-Za-z_]\w*/g) || []).sort().join(",");
const problems = [];
const hints = [];

for (const f of files) {
    const enPath = join(root, "_locales", f);
    const dePath = join(root, "_locales", "de", f);
    if (!existsSync(enPath)) { problems.push(`${f}: pxt did not generate the English file`); continue; }
    if (!existsSync(dePath)) { problems.push(`${f}: German file missing`); continue; }
    const en = JSON.parse(readFileSync(enPath, "utf8"));
    const de = JSON.parse(readFileSync(dePath, "utf8"));
    for (const [key, enVal] of Object.entries(en)) {
        if (!(key in de)) { problems.push(`${f}: missing German key  ${key}`); continue; }
        const deVal = de[key];
        if (typeof deVal !== "string" || deVal.trim() === "") { problems.push(`${f}: empty German value  ${key}`); continue; }
        if (placeholders(enVal) !== placeholders(deVal)) {
            problems.push(`${f}: placeholders differ  ${key}  (en: "${enVal}" / de: "${deVal}")`);
        }
    }
    for (const key of Object.keys(de)) if (!(key in en)) hints.push(`${f}: ${key}`);
}

if (hints.length) console.log("Hint, German keys without English counterpart (not an error):\n  " + hints.join("\n  "));
if (problems.length) {
    console.error("Locale check FAILED:\n  " + problems.join("\n  "));
    process.exit(1);
}
console.log("Locale check OK");
