"use strict";

const nmap = require("nmap");

const N = 4;
const M = 16;
const initMatrix = nmap(N, () => nmap(M, () => Math.round(Math.random())));
const initState = { isPlaying: false, bpm: 120, matrix: initMatrix, index: -1 };

module.exports = (state = initState, action) => {
  switch (action.type) {
  case "TOGGLE_PLAY":
    return Object.assign({}, state, { isPlaying: !state.isPlaying });
  case "CHANGE_BPM":
    return Object.assign({}, state, { bpm: action.bpm });
  case "TOGGLE_MATRIX": {
    const matrix = JSON.parse(JSON.stringify(state.matrix));
    matrix[action.row][action.col] = 1 - matrix[action.row][action.col];
    return Object.assign({}, state, { matrix });
  }
  case "TICK":
    return Object.assign({} ,state, { index: action.index });
  }
  return state;
};
