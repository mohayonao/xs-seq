"use strict";

require("run-with-mocha");

const assert = require("assert");
const reducer = require("../src/reducer");

const initState = (opts) => {
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
    const expected = initState({ matrix: actual.matrix });

    assert.deepEqual(actual, expected);
  });

  it("should handle SET_PLAYING_STATE", () => {
    const actual = reducer(initState(), { type: "SET_PLAYING_STATE", state: true });
    const expected = initState({ isPlaying: true });

    assert.deepEqual(actual, expected);
  });

  it("should handle CHANGE_BPM", () => {
    const actual = reducer(initState(), { type: "CHANGE_BPM", bpm: 140 });
    const expected = initState({ bpm: 140 });

    assert.deepEqual(actual, expected);
  });

  it("should handle TOGGLE", () => {
    const actual = reducer(initState(), { type: "TOGGLE", row: 1, col: 2 });
    const expected = initState();

    expected.matrix[1][2] = 1;
    assert.deepEqual(actual, expected);
  });

  it("should handle TICK", () => {
    const actual = reducer(initState(), { type: "TICK", index: 1 });
    const expected = initState({ index: 1 });

    assert.deepEqual(actual, expected);
  });
});
