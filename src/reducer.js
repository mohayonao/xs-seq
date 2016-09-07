"use strict";

const redux = require("redux");
const nmap = require("nmap");

const N = 4;
const M = 16;
const initMatrix = nmap(N, () => nmap(M, () => Math.round(Math.random())));

module.exports = redux.combineReducers({
  isPlaying(state = 0, action) {
    if (action.type === "PLAY") {
      return state ? 0 : 1;
    }
    return state;
  },
  bpm(state = 120, action) {
    if (action.type === "CHANGE_BPM") {
      return action.bpm;
    }
    return state;
  },
  matrix(state = initMatrix, action) {
    if (action.type === "TOGGLE") {
      state = JSON.parse(JSON.stringify(state));
      state[action.row][action.col] = 1 - state[action.row][action.col];
      return state;
    }
    return state;
  },
  index(state = -1, action) {
    if (action.type === "TICK") {
      return action.index;
    }
    return state;
  },
});
