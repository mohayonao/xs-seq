"use strict";

module.exports = {
  togglePlay() {
    return { type: "TOGGLE_PLAY" };
  },
  changeBPM(bpm) {
    return { type: "CHANGE_BPM", bpm };
  },
  toggleMatrix(row, col) {
    return { type: "TOGGLE_MATRIX", row, col };
  },
  tick(index) {
    return { type: "TICK", index };
  }
};
