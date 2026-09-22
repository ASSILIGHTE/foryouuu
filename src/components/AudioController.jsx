import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { config } from '../config';

// Web Audio API Ambient Sky Synthesizer
class AmbientSkySynth {
  constructor() {
    this.ctx = null;
    this.oscillators = [];
    this.gainNode = null;
    this.isPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  start() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.isPlaying) return;

    // Soft dreamy ambient chord: F major 9 / Sky harmony (F, A, C, E, G)
    const freqs = [174.61, 220.00, 261.63, 329.63, 392.00]; 
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 3);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 600;

    this.oscillators = freqs.map((f, i) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);
      
      // Gentle LFO pitch wobble for lush dreamy sky feel
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.value = 0.2 + i * 0.05;
      lfoGain.gain.value = 1.5;
      lfo.connect(osc.frequency);
      lfo.start();

      oscGain.gain.value = 0.2;
      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();
      return { osc, lfo };
    });

    filter.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);
    this.isPlaying = true;
  }

  stop() {
    if (!this.isPlaying || !this.gainNode) return;
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
    setTimeout(() => {
      this.oscillators.forEach(({ osc, lfo }) => {
        try {
          osc.stop();
          lfo.stop();
        } catch (e) {}
      });
      this.oscillators = [];
      this.isPlaying = false;
    }, 1500);
  }

  playChime() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    // High sparkling chime
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime); // A5
    osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.15); // A6

    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.8);
  }
}

export const globalAudioSynth = new AmbientSkySynth();

export const AudioController = ({ isMuted, setIsMuted, hasStarted, setHasStarted }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (hasStarted && !isMuted) {
      if (config.bgMusicUrl && audioRef.current) {
        audioRef.current.play().then(() => {
          globalAudioSynth.stop();
          setIsPlaying(true);
        }).catch(() => {
          // Fallback to synth if mp3 playback is blocked or fails
          globalAudioSynth.start();
          setIsPlaying(true);
        });
      } else {
        globalAudioSynth.start();
        setIsPlaying(true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      globalAudioSynth.stop();
      setIsPlaying(false);
    }
  }, [hasStarted, isMuted]);

  const toggleMute = () => {
    globalAudioSynth.playChime();
    if (!hasStarted) {
      setHasStarted(true);
      setIsMuted(false);
    } else {
      setIsMuted(!isMuted);
    }
  };

  const isAudioActive = hasStarted && !isMuted && isPlaying;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {config.bgMusicUrl && (
        <audio ref={audioRef} src={config.bgMusicUrl} loop preload="auto" />
      )}

      {/* Floating Audio Status Pill */}
      <button
        onClick={toggleMute}
        aria-label={!isAudioActive ? "Aktifkan Musik" : "Matikan Musik"}
        className="glass-card hover:scale-105 transition-all duration-300 px-4 py-2.5 rounded-full flex items-center gap-2.5 shadow-lg shadow-sky-200/50 cursor-pointer group border border-white/80 active:scale-95"
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${!isAudioActive ? 'bg-slate-200 text-slate-500' : 'bg-sky-400 text-white animate-pulse-glow'}`}>
          {!isAudioActive ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </div>
        <span className="text-xs font-semibold text-sky-900 group-hover:text-sky-600 transition-colors hidden sm:inline">
          {!isAudioActive ? "Putar Musik 🎵" : "Musik Bermain 🎵"}
        </span>
        {isAudioActive && (
          <span className="flex gap-0.5 items-center">
            <span className="w-1 h-3 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1 h-4 bg-sky-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1 h-2 bg-sky-300 rounded-full animate-bounce"></span>
          </span>
        )}
      </button>
    </div>
  );
};
