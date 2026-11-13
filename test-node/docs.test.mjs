import test from "node:test";
import assert from "node:assert/strict";
import { title, paramOrder, sortParams, sentence } from "../tools/docs-lib.mjs";

test("title: literal percent signs and parameters", () => {
    assert.equal(title("drive left %left |\\% right %right |\\%"), "drive left …% right …%");
    assert.equal(title("fahre links %left |\\% rechts %right |\\%"), "fahre links …% rechts …%");
});

test("title: $name parameters and shadow blocks", () => {
    assert.equal(title("when crossing number $nr reached"), "when crossing number … reached");
    assert.equal(title("set light %led to %color=francor_colors"), "set light … to …");
});

test("title: a block that is only a parameter becomes a bare gap", () => {
    assert.equal(title("%d"), "…");
});

test("paramOrder and sortParams follow the block text, handlers last", () => {
    assert.deepEqual(paramOrder("red %r green %g blue %b"), ["r", "g", "b"]);
    assert.deepEqual(sortParams(["b", "g", "r"], "red %r green %g blue %b"), ["r", "g", "b"]);
    assert.deepEqual(sortParams(["handler", "nr"], "when crossing number $nr reached"), ["nr", "handler"]);
    assert.deepEqual(sortParams(["color", "led"], "set light %led to %color=francor_colors"), ["led", "color"]);
});

test("sentence: capital letter and e.g.", () => {
    assert.equal(sentence("speed of the left wheel in percent, eg: 50"), "Speed of the left wheel in percent, e.g. 50");
});
