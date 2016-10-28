"use strict";

module.exports = {
  play() {
    return { type: "PLAY" };
  },
  setPlayingState(state) {
    return { type: "SET_PLAYING_STATE", state };
  },
  changeBPM(bpm) {
    return { type: "CHANGE_BPM", bpm };
  },
  toggle(row, col) {
    return { type: "TOGGLE", row, col };
  },
  tick(index) {
    return { type: "TICK", index };
  }
};
