import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

type SoundType = 'hover' | 'click' | 'success' | 'error' | 'notification' | 'charge-start' | 'charge-loop' | 'charge-end';

interface SoundContextType {
  playSound: (type: SoundType) => void;
  startContinuous: (type: 'charge') => void;
  updateContinuous: (type: 'charge', value: number) => void; // value 0-1
  stopContinuous: () => void;
  playBGM: (type: 'ambient' | 'tense') => void;
  stopBGM: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const continuousOscillatorRef = useRef<OscillatorNode | null>(null);
  const continuousGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Initialize AudioContext on first user interaction to comply with browser autoplay policies
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };
    window.addEventListener('click', initAudio, { once: true });
    return () => window.removeEventListener('click', initAudio);
  }, []);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
    if (audioContextRef.current) {
      if (!isMuted) {
        audioContextRef.current.suspend();
      } else {
        audioContextRef.current.resume();
      }
    }
  };

  const playSound = (type: SoundType) => {
    if (isMuted || !audioContextRef.current) return;
    const ctx = audioContextRef.current;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    switch (type) {
      case 'hover':
        // Short high blip
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
        break;

      case 'click':
        // Mechanical click
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
        break;

      case 'success':
        // Major chord arpeggio
        [440, 554.37, 659.25].forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'sine';
          o.connect(g);
          g.connect(ctx.destination);
          o.frequency.value = freq;
          g.gain.setValueAtTime(0, now);
          g.gain.linearRampToValueAtTime(0.1, now + 0.1 + i * 0.05);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.8 + i * 0.05);
          o.start(now + i * 0.05);
          o.stop(now + 1.0);
        });
        break;

      case 'error':
        // Low buzz
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.linearRampToValueAtTime(50, now + 0.3);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        break;

      case 'notification':
        // Gentle bell
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
        break;
    }
  };

  const startContinuous = (type: 'charge') => {
    if (isMuted || !audioContextRef.current) return;
    if (continuousOscillatorRef.current) return; // Already playing

    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    continuousOscillatorRef.current = osc;
    continuousGainRef.current = gain;
  };

  const updateContinuous = (type: 'charge', value: number) => {
    if (!audioContextRef.current || !continuousOscillatorRef.current) return;
    // Value 0-1, map to frequency 100Hz - 800Hz
    const freq = 100 + (value * 700);
    // Add some vibrato/instability as it gets higher
    continuousOscillatorRef.current.frequency.setTargetAtTime(freq, audioContextRef.current.currentTime, 0.1);
  };

  const bgmRef = useRef<{ oscs: OscillatorNode[], gain: GainNode } | null>(null);

  const playBGM = (type: 'ambient' | 'tense') => {
    if (isMuted || !audioContextRef.current) return;
    if (bgmRef.current) return; // Already playing

    const ctx = audioContextRef.current;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2); // Fade in
    masterGain.connect(ctx.destination);

    const oscs: OscillatorNode[] = [];

    const createOsc = (freq: number, type: OscillatorType, detune: number = 0) => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = freq;
      osc.detune.value = detune; // Detune for thickness
      osc.connect(masterGain);
      osc.start();
      return osc;
    };

    if (type === 'ambient') {
      // Chord: Cmaj7 (C3, E3, G3, B3) spread out
      oscs.push(createOsc(130.81, 'sine', -5)); // C3
      oscs.push(createOsc(130.81, 'sine', 5));  // C3 detuned
      oscs.push(createOsc(196.00, 'sine', 0));  // G3
      oscs.push(createOsc(246.94, 'triangle', 0)); // B3 (soft)
    } else {
      // Tense drone
      oscs.push(createOsc(110.00, 'sawtooth', -10)); // A2
      oscs.push(createOsc(110.00, 'sawtooth', 10));  // A2
      oscs.push(createOsc(164.81, 'sine', 0)); // E3
    }

    bgmRef.current = { oscs, gain: masterGain };
  };

  const stopBGM = () => {
    if (!bgmRef.current) return;
    const { oscs, gain } = bgmRef.current;
    const ctx = audioContextRef.current;

    if (ctx) {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2); // Fade out
    }

    setTimeout(() => {
      oscs.forEach(o => { try { o.stop(); o.disconnect(); } catch (e) { } });
      try { gain.disconnect(); } catch (e) { }
    }, 2000);

    bgmRef.current = null;
  };

  // Re-run BGM check when muted changes
  useEffect(() => {
    if (isMuted && bgmRef.current) {
      // Just suspend context handled by global toggle, but here we can lower volume
      if (audioContextRef.current) audioContextRef.current.suspend();
    } else if (!isMuted && audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  }, [isMuted]);

  const stopContinuous = () => {
    if (!audioContextRef.current || !continuousOscillatorRef.current || !continuousGainRef.current) return;
    const ctx = audioContextRef.current;
    const gain = continuousGainRef.current;
    const osc = continuousOscillatorRef.current;

    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);

    setTimeout(() => {
      try { osc.stop(); osc.disconnect(); } catch (e) { }
      try { gain.disconnect(); } catch (e) { }
    }, 200);

    continuousOscillatorRef.current = null;
    continuousGainRef.current = null;
  };

  return (
    <SoundContext.Provider value={{ playSound, startContinuous, updateContinuous, stopContinuous, playBGM, stopBGM, isMuted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};