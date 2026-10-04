// Created only after a click; reuse one quiet, filtered noise buffer.
export function createShutterSound(duration: number) {
  const context = new AudioContext();
  const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
  const samples = buffer.getChannelData(0);

  for (let index = 0; index < samples.length; index += 1) samples[index] = Math.random() * 2 - 1;

  let source: AudioBufferSourceNode | null = null;

  const stop = () => {
    source?.stop();
    source = null;
  };

  const play = () => {
    stop();
    void context.resume().catch(() => undefined);
    const noise = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const volume = context.createGain();
    const start = context.currentTime;

    noise.buffer = buffer;
    filter.type = 'lowpass';
    filter.frequency.value = 650;
    volume.gain.setValueAtTime(0, start);
    volume.gain.linearRampToValueAtTime(0.035, start + duration * 0.08);
    volume.gain.linearRampToValueAtTime(0, start + duration * 0.4);
    volume.gain.setValueAtTime(0, start + duration * 0.55);
    volume.gain.linearRampToValueAtTime(0.025, start + duration * 0.63);
    volume.gain.linearRampToValueAtTime(0, start + duration);
    noise.connect(filter).connect(volume).connect(context.destination);
    noise.onended = () => {
      noise.disconnect();
      filter.disconnect();
      volume.disconnect();
      if (source === noise) source = null;
    };
    source = noise;
    noise.start();
  };

  const dispose = () => {
    stop();
    void context.close().catch(() => undefined);
  };

  return { play, stop, dispose };
}
