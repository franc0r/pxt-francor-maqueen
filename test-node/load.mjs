// Loads logic.ts in Node: transpile with TypeScript, run in a vm (no pxt APIs available).
import ts from "typescript";
import vm from "node:vm";
import fs from "node:fs";
const src = fs.readFileSync(new URL("../logic.ts", import.meta.url), "utf8");
const js = ts.transpileModule(src, { compilerOptions: { target: ts.ScriptTarget.ES2019 } }).outputText;
const ctx = vm.createContext({});
vm.runInContext(js + "\nthis.__m = francorMaqueen; this.__l = francorLidar;", ctx);
export const { __m: m, __l: l } = ctx;
