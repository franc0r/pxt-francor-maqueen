// Compiles every example of tools/doc-examples.json (each wrapped in a function) with pxt.
// test.ts is replaced for the build and restored afterwards.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const examples = JSON.parse(readFileSync(join(root, "tools", "doc-examples.json"), "utf8"));
const testPath = join(root, "test.ts");
const original = existsSync(testPath) ? readFileSync(testPath, "utf8") : null;
const code = Object.entries(examples)
    .map(([key, src]) => `function example_${key.replace(/\W/g, "_")}() {\n${src.replace(/^/gm, "    ")}\n}\n`)
    .join("\n");
let ok = true;
try {
    writeFileSync(testPath, code);
    execSync("npx pxt build", { cwd: root, stdio: "pipe" });
    console.log(`Examples OK: ${Object.keys(examples).length} compile`);
} catch (e) {
    ok = false;
    console.error(String(e.stdout || e.message).split("\n").filter((l) => /error|example_/i.test(l)).slice(0, 20).join("\n"));
} finally {
    if (original !== null) writeFileSync(testPath, original);
}
process.exit(ok ? 0 : 1);
