"use strict";

require("run-with-mocha");

const assert = require("assert");
const actions = require("../src/actions");

describe("actions", () => {
  it("play should create PLAY action", () => {
    assert.deepEqual(actions.play(), { type: "PLAY" });
  });

  it("changeBPM should create CHANGE_BPM action", () => {
    assert.deepEqual(actions.changeBPM(140), { type: "CHANGE_BPM", bpm: 140 });
  });

  it("toggle should create TOGGLE action", () => {
    assert.deepEqual(actions.toggle(1, 2), { type: "TOGGLE", row: 1, col: 2 });
  });

  it("tick should create TICK action", () => {
    assert.deepEqual(actions.tick(1), { type: "TICK", index: 1 });
  });
});
