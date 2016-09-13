"use strict";

const WebAudioScheduler = require("web-audio-scheduler");
const timerAPI = require("worker-timer");
const sounds = require("./sounds");

const NOTE_NUMBERS = [ 72, 76, 79, 83 ].reverse();

class Sequencer {
  constructor(context, actions) {
    this.context = context;
    this.actions = actions;
    this.sched = new WebAudioScheduler({ context, timerAPI });
    this.bpm = 0;
    this.matrix = null;
    this.index = 0;
    this.sequence = this.sequence.bind(this);
  }

  setState(state) {
    this.bpm = state.bpm;
    this.matrix = state.matrix;
    this.play(state.isPlaying);
  }

  play(state = true) {
    if (this.sched.state === "suspended" && state) {
      this.sched.start(this.sequence);
    }
    if (this.sched.state === "running" && !state) {
      this.sched.stop();
    }
  }

  sequence({ playbackTime }) {
    const duration = (60 / this.bpm) * (4 / 8);
    const nextPlaybackTime = playbackTime + duration;

    NOTE_NUMBERS.forEach((midi, track) => {
      if (this.matrix[track][this.index]) {
        sounds.sine(this.context.destination, playbackTime, {
          frequency: 440 * Math.pow(2, (midi - 69) / 12),
          duration: duration * 0.8
        });
      }
    });
    this.actions.tick(this.index);

    this.index = (this.index + 1) % this.matrix[0].length;
    this.sched.insert(nextPlaybackTime, this.sequence);
  }
}

module.exports = Sequencer;
