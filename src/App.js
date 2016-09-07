"use strict";

const React = require("react");

class App extends React.Component {
  render() {
    const { actions, bpm, matrix, index } = this.props;
    const matrixElem = matrix.map((track, i) => {
      const trackElem = track.map((value, j) => {
        const style = { color: (index === j) ? "red" : "black" };
        const onClick = () => actions.toggle(i, j);
        return (<span key={ j } style={ style } onClick={ onClick }>{ value ? "■" : "□" }</span>);
      });
      return (<div key={ i }>{ trackElem }</div>);
    });
    const changeBPM = e => actions.changeBPM(+e.target.value);
    return (
      <div>
        <button onClick={ actions.play }>start</button>
        <div>
        BPM: <input type="range" value={ bpm } min="80" max="200" onChange={ changeBPM } />
        </div>
        <div>{ matrixElem }</div>
      </div>
    );
  }
}

App.propTypes = {
  actions: React.PropTypes.object.isRequired,
  bpm    : React.PropTypes.number.isRequired,
  matrix : React.PropTypes.array.isRequired,
  index  : React.PropTypes.number.isRequired,
};

module.exports = App;
