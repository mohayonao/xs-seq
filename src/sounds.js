"use strict";

module.exports = {
  sine(destination, playbackTime, { frequency, duration }) {
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
};
