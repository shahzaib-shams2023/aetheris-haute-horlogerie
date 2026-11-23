// Web Audio API Synthesizer for Precision Mechanical Horology
class HorologyAudio {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private tickInterval: number | null = null;
  private tickHigh: boolean = true;

  constructor() {
    // Initialized upon user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleSound(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.startEscapement();
      this.playMechanicalClick();
    } else {
      this.stopEscapement();
    }
    return !this.isMuted;
  }

  public getStatus(): boolean {
    return !this.isMuted;
  }

  private startEscapement() {
    this.stopEscapement();
    // 4Hz balance wheel produces 8 beats per second (semi-oscillations)
    // We simulate a crisp 2 beats/sec audible escapement tick for elegant listening
    this.tickInterval = window.setInterval(() => {
      this.playTick(this.tickHigh ? 1800 : 1550);
      this.tickHigh = !this.tickHigh;
    }, 500);
  }

  private stopEscapement() {
    if (this.tickInterval) {
      clearInterval(this.tickInterval);
      this.tickInterval = null;
    }
  }

  public playTick(freq: number = 1800) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Bandpass filter to mimic acoustic metal escapement pallet fork impact
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq, now);
      filter.Q.setValueAtTime(8, now);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Audio playback gracefully suppressed
    }
  }

  public playMechanicalClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(3200, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.03);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Audio gracefully caught
    }
  }
}

export const soundManager = new HorologyAudio();
