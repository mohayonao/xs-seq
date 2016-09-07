"use strict";

const events = require("events");
const WebAudioScheduler = require("web-audio-scheduler");
const timerAPI = require("worker-timer");

const NOTE_NUMBERS = [ 72, 76, 79, 83 ].reverse();

class Sequencer extends events.EventEmitter {
  constructor(context) {
    super();
    this.context = context;
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
    const duration = computeDurationFromBPM(this.bpm, 8);
    const t0 = playbackTime;
    const t1 = t0 + duration;

    NOTE_NUMBERS.forEach((midi, track) => {
      if (this.matrix[track][this.index]) {
        playNote(this.context.destination, playbackTime, {
          frequency: mtof(midi),
          duration: duration * 0.8
        });
      }
    });

    this.emit("tick", this.index);

    this.index = (this.index + 1) % this.matrix[0].length;

    // 次のスケジュールを登録してループする
    this.sched.insert(t1, this.sequence);
  }
}

function computeDurationFromBPM(bpm, len = 4) {
  return (60 / bpm) * (4 / len);
}

function mtof(m) {
  return 440 * Math.pow(2, (m - 69) / 12);
}

function playNote(destination, playbackTime, { frequency, duration }) {
  const t0 = playbackTime;
  const t1 = t0 + duration * 0.4;
  const t2 = t1 + duration * 0.6;
  const audioContext = destination.context;
  const oscillator1 = audioContext.createOscillator();
  const oscillator2 = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator1.frequency.value = frequency;
  oscillator1.detune.value = 20;
  oscillator1.start(t0);
  oscillator1.stop(t2);
  oscillator1.connect(gain);
  oscillator1.onended = () => {
    oscillator1.disconnect();
    oscillator2.disconnect();
    gain.disconnect();
  };

  oscillator2.frequency.value = frequency;
  oscillator2.detune.value = -20;
  oscillator2.start(t0);
  oscillator2.stop(t2);
  oscillator2.connect(gain);

  gain.gain.setValueAtTime(0.1, t0);
  gain.gain.setValueAtTime(0.1, t1);
  gain.gain.linearRampToValueAtTime(0, t2);
  gain.connect(destination);
}

module.exports = Sequencer;
