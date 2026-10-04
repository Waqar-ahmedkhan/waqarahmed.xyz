// One reusable, quiet sliding sound; created only during a user interaction.
export function createShutterSound() {
  const context = new AudioContext();
  const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * 0.5), context.sampleRate);
  const samples = buffer.getChannelData(0);

  for (let index = 0; index < samples.length; index += 1) samples[index] = Math.random() * 2 - 1;

  let source: AudioBufferSourceNode | null = null;
  let volume: GainNode | null = null;

  const stop = () => {
    if (!source || !volume) return;
    volume.gain.setTargetAtTime(0, context.currentTime, 0.02);
    source.stop(context.currentTime + 0.1);
    source = null;
    volume = null;
  };

  const move = (speed: number) => {
    void context.resume().catch(() => undefined);

    if (!source) {
      const noise = context.createBufferSource();
      const lowCut = context.createBiquadFilter();
      const filter = context.createBiquadFilter();
      const gain = context.createGain();
      noise.buffer = buffer;
      noise.loop = true;
      lowCut.type = 'highpass';
      lowCut.frequency.value = 110;
      lowCut.Q.value = 0.4;
      filter.type = 'lowpass';
      filter.frequency.value = 480;
      filter.Q.value = 0.4;
      gain.gain.value = 0;
      noise.connect(lowCut).connect(filter).connect(gain).connect(context.destination);
      noise.onended = () => { noise.disconnect(); lowCut.disconnect(); filter.disconnect(); gain.disconnect(); };
      source = noise;
      volume = gain;
      noise.start();
    }

    volume?.gain.setTargetAtTime(0.003 + Math.min(1, Math.max(0, speed)) * 0.012, context.currentTime, 0.035);
  };

  const dispose = () => {
    stop();
    void context.close().catch(() => undefined);
  };

  return { move, stop, dispose };
}
