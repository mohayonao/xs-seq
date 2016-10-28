"use strict";

const React = require("react");
const ReactDom = require("react-dom");
const { createStore, applyMiddleware, bindActionCreators } = require("redux");
const { Provider, connect } = require("react-redux");
const App = require("./App");
const inject = require("./inject");
const Sequencer = require("./Sequencer");
const reducer = require("./reducer");
const actionCreators = require("./actions");

window.AudioContext = window.AudioContext || window.webkitAudioContext;

window.addEventListener("DOMContentLoaded", () => {
  const store = createStore(reducer, applyMiddleware(inject(audioHandler)));
  const actions = bindActionCreators(actionCreators, store.dispatch);
  const Container = connect(state => state)(App);

  const audioContext = new AudioContext();
  const sequencer = new Sequencer(audioContext, actions);

  sequencer.setState(store.getState());

  function audioHandler(action) {
    sequencer.doAction(action);
  }

  store.subscribe(() => {
    sequencer.setState(store.getState());
  });

  ReactDom.render(
    <Provider store={ store }>
      <Container actions={ actions }/>
    </Provider>
  , document.getElementById("app"));
});
