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
const actions = require("./actions");

window.AudioContext = window.AudioContext || window.webkitAudioContext;

window.addEventListener("DOMContentLoaded", () => {
  const store = redux.createStore(reducer);
  const Container = connect(state => state, dispatch => {
    return { actions: bindActionCreators(actions, dispatch) };
  })(App);

  const audioContext = new AudioContext();
  const sequencer = new Sequencer(audioContext);

  sequencer.setState(store.getState());
  // シーケンサーの進捗
  sequencer.on("tick", (index) => {
    store.dispatch(actions.tick(index));
  });
  // データに変更があったらシーケンサーに通知
  store.subscribe(() => {
    sequencer.setState(store.getState());
  });

  ReactDom.render(<Provider store={ store }><Container /></Provider>, document.getElementById("app"));
});
