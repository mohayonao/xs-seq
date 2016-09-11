"use strict";

require("run-with-mocha");

const assert = require("assert");
const reducer = require("../src/reducer");

const createState = (opts) => {
  return Object.assign({
    isPlaying: false,
    bpm: 120,
    matrix: [
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    ],
    index: -1
  }, opts);
};

describe("reducer", () => {
  it("should handle initial state", () => {
    const actual = reducer(undefined, {});
    const expected = createState({ matrix: actual.matrix });

    assert.deepEqual(actual, expected);
  });

  it("should handle PLAY", () => {
    const actual = reducer(createState(), { type: "PLAY" });
    const expected = Object.assign(createState({ isPlaying: true }));

    assert.deepEqual(actual, expected);
  });

  it("should handle CHANGE_BPM", () => {
    const actual = reducer(createState(), { type: "CHANGE_BPM", bpm: 140 });
    const expected = Object.assign(createState({ bpm: 140 }));

    assert.deepEqual(actual, expected);
  });

  it("should handle TOGGLE", () => {
    const actual = reducer(createState(), { type: "TOGGLE", row: 1, col: 2 });
    const expected = createState();

    expected.matrix[1][2] = 1;
    assert.deepEqual(actual, expected);
  });

  it("should handle TICK", () => {
    const actual = reducer(createState(), { type: "TICK", index: 1 });
    const expected = Object.assign(createState({ index: 1 }));

    assert.deepEqual(actual, expected);
  });
});
