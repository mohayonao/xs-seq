"use strict";

require("run-with-mocha");

const assert = require("assert");
const sinon = require("sinon");
const React = require("react");
const { shallow } = require("enzyme");
const App = require("../src/App");

function setup({ state, actions }) {
  state = Object.assign({
    isPlaying: false,
    bpm: 120,
    matrix: [
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    ],
    index: -1
  }, state);
  actions = actions || {};

  const component = shallow(
    <App actions={ actions } bpm={ state.bpm } matrix={ state.matrix } index={ state.index } />
  );

  return { component, state, actions };
}

describe("App", () => {
  it("has a start button", () => {
    const { component, actions } = setup({ actions: { play: sinon.spy() } });
    const elem = component.find("button");

    assert(elem.length === 1);

    elem.simulate("click");
    assert(actions.play.callCount === 1);
  });

  it("has a bpm changer", () => {
    const { component, actions } = setup({ actions: { changeBPM: sinon.spy() } });
    const elem = component.find("input[type='range']");

    assert(elem.length === 1);

    elem.simulate("change", { target: { value: 180 } });
    assert(actions.changeBPM.callCount === 1);
    assert(actions.changeBPM.args[0][0] === 180);
  });

  it("has toggle buttons", () => {
    const { component, actions } = setup({ actions: { toggle: sinon.spy() } });
    const elems = component.find("span");

    assert(elems.length === 64);

    elems.at(2 * 16 + 3).simulate("click");
    assert(actions.toggle.callCount === 1);
    assert(actions.toggle.args[0][0] === 2);
    assert(actions.toggle.args[0][1] === 3);
  });

  it("has a matrix controller", () => {
    const { component } = setup({ state: { matrix: [ [ 0, 1 ], [ 1, 0 ] ], index: 1 } });
    const elems = component.find("span");

    assert(elems.at(0).text() === "□");
    assert(elems.at(1).text() === "■");
    assert(elems.at(2).text() === "■");
    assert(elems.at(3).text() === "□");

    // ???
    assert(elems.at(0).html().match(/color:black/));
    assert(elems.at(1).html().match(/color:red/));
    assert(elems.at(2).html().match(/color:black/));
    assert(elems.at(3).html().match(/color:red/));
  });
});
