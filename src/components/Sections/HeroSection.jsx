import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown, Heart, Cloud, Star } from 'lucide-react';
import { config } from '../../config';
import { globalAudioSynth } from '../AudioController';
import { CountdownTimer } from '../CountdownTimer';

export const HeroSection = ({ onStartJourney }) => {
  const hero = config.hero;

  const handleClick = () => {
    globalAudioSynth.playChime();
    onStartJourney();
  };

  return (
    <section 
      id="section-hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-12 pb-20 text-center z-20 overflow-hidden"
    >
      {/* Animated Floating Decorative Accents */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-8 sm:left-24 text-sky-300/40 pointer-events-none hidden md:block"
      >
        <Cloud size={80} />
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 right-8 sm:right-24 text-pink-300/40 pointer-events-none hidden md:block"
      >
        <Cloud size={100} />
      </motion.div>

      <motion.div
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-36 right-1/4 text-amber-300/60 pointer-events-none"
      >
        <Star size={24} fill="currentColor" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-48 left-1/4 text-pink-400/50 pointer-events-none"
      >
        <Heart size={20} fill="currentColor" />
      </motion.div>

      {/* Hero Central Content */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-3xl mx-auto flex flex-col items-center relative z-10"
      >
        {/* Floating Badge */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-cloud text-sky-900 text-xs sm:text-sm font-semibold tracking-wide shadow-lg shadow-sky-100/50 border border-white/90 mb-6 group cursor-pointer hover:scale-105 transition-transform"
        >
          <Sparkles size={16} className="text-sky-500 animate-spin" />
          <span className="bg-gradient-to-r from-sky-700 via-pink-600 to-sky-700 bg-clip-text text-transparent font-bold">
            {hero.badge}
          </span>
        </motion.div>

        {/* Main Title with Animated Shimmer */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif-title font-bold text-sky-950 tracking-normal leading-normal mb-2 drop-shadow-sm px-2">
          Happy Birthday,{' '}
          <motion.span 
            className="inline-block font-script animate-text-shimmer font-normal text-4xl sm:text-6xl md:text-7xl px-3 py-2 leading-relaxed drop-shadow overflow-visible"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {config.partnerName}
          </motion.span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-sky-800/90 font-light max-w-xl mb-6 leading-relaxed font-sans px-4">
          {hero.subtitle}
        </p>

        {/* Live Countdown Timer Widget */}
        <CountdownTimer />

        {/* Start Journey Button with Pulsing Outer Ring */}
        <div className="relative mt-4 group">
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-400 via-pink-400 to-sky-400 blur-md opacity-70 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse-glow" />
          
          <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex items-center gap-3 px-9 py-4.5 rounded-full bg-gradient-to-r from-sky-400 via-sky-500 to-indigo-400 text-white font-bold text-base sm:text-lg shadow-xl shadow-sky-300/60 transition-all duration-300 cursor-pointer overflow-hidden border border-white/80"
          >
            {/* Button shine animation */}
            <span className="absolute inset-0 bg-white/25 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            
            <span>{hero.ctaButton}</span>
            <span className="transform group-hover:translate-y-1 transition-transform text-xl">☁️</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Down Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 flex flex-col items-center text-sky-600/80 text-xs gap-1 cursor-pointer font-semibold group hover:text-sky-800"
        onClick={handleClick}
      >
        <span>Gulir Ke Bawah</span>
        <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
      </motion.div>
    </section>
  );
};
