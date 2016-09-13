"use strict";

const React = require("react");
const ReactDom = require("react-dom");
const redux = require("redux");
const { bindActionCreators } = require("redux");
const { connect } = require("react-redux");
const { Provider } = require("react-redux");
const App = require("./App");
const Sequencer = require("./Sequencer");
const reducer = require("./reducer");
const actionCreators = require("./actions");

window.AudioContext = window.AudioContext || window.webkitAudioContext;

window.addEventListener("DOMContentLoaded", () => {
  const store = redux.createStore(reducer);
  const actions = bindActionCreators(actionCreators, store.dispatch);
  const Container = connect(state => state, () => ({ actions }))(App);

  const audioContext = new AudioContext();
  const sequencer = new Sequencer(audioContext, actions);

  sequencer.setState(store.getState());
  store.subscribe(() => {
    sequencer.setState(store.getState());
  });

  ReactDom.render(<Provider store={ store }><Container /></Provider>, document.getElementById("app"));
});
