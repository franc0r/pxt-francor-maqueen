import test from "node:test";
import assert from "node:assert";
import { m, l } from "./load.mjs";

test('linePosition examples from Martin', () => {
  assert.equal(m.linePositionFromState(0x04), 0)
  assert.equal(m.linePositionFromState(0x04|0x08), 0.5)
  assert.equal(m.linePositionFromState(0x08), 1)
  assert.equal(m.linePositionFromState(0x08|0x10), 1.5)
  assert.equal(m.linePositionFromState(0x10), 2)
  assert.equal(m.linePositionFromState(0x04|0x02), -0.5)
  assert.equal(m.linePositionFromState(0x08|0x04|0x02), 0)
  assert.equal(m.linePositionFromState(0x1F), 0)
  assert.equal(m.linePositionFromState(0), 100)
})
test('linePosition covers all 32 patterns', () => {
  for (let s = 0; s < 32; s++) { const v = m.linePositionFromState(s)
    assert.ok(Number.isFinite(v)); assert.ok(s === 0 ? v === 100 : v >= -2 && v <= 2) }
})
test('motor percent', () => {
  assert.deepEqual([m.motorDir(100), m.motorSpeed(100)], [0, 255])
  assert.deepEqual([m.motorDir(-100), m.motorSpeed(-100)], [1, 255])
  assert.deepEqual([m.motorDir(0), m.motorSpeed(0)], [0, 0])
  assert.equal(m.motorSpeed(50), 128)
})
test('motorSpeed clamps far out of range', () => {
  assert.deepEqual([m.motorDir(-1960), m.motorSpeed(-1960)], [1, 255])
  assert.equal(m.motorSpeed(250), 255)
})
test('NO_VALUE is never an obstacle', () => { assert.ok(!(l.NO_VALUE < 200)); assert.ok(l.NO_VALUE > 4000) })
test('lidar frames', () => {
  assert.deepEqual(m.lidarRequest(6, []), [0x55, 0, 1, 6])
  assert.deepEqual(m.lidarRequest(7, [0, 200]), [0x55, 0, 3, 7, 0, 200])
  assert.deepEqual(m.lidarObstacle([3, 0, 0x2C, 0x01, 0xC8, 0x00, 0x10, 0x27]), [3, 300, 200, 10000])
})
