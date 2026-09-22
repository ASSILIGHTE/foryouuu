import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Mail, Sun, Star } from 'lucide-react';
import { config } from '../../config';
import { globalAudioSynth } from '../AudioController';
import { TypewriterText } from '../TypewriterText';

export const SunsetSection = ({ onOpenLetter }) => {
  const sunsetData = config.sunsetSection;

  const handleOpenClick = () => {
    globalAudioSynth.playChime();
    onOpenLetter();
  };

  return (
    <section 
      id="section-sunset"
      className="relative min-h-screen py-24 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col items-center justify-center text-center z-20 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        className="w-full flex flex-col items-center relative z-10"
      >
        {/* Top Sunset Glow Badge */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/25 backdrop-blur-lg text-amber-100 text-xs sm:text-sm font-semibold tracking-wide border border-white/40 shadow-xl mb-8 group cursor-pointer"
        >
          <Sun size={17} className="text-amber-300 animate-spin" style={{ animationDuration: '10s' }} />
          <span>{sunsetData.badge}</span>
        </motion.div>

        {/* Section Heading */}
        <h2 className="text-4xl sm:text-6xl font-serif-title font-bold text-white drop-shadow-lg mb-3">
          {sunsetData.title}
        </h2>
        <p className="text-base sm:text-xl text-amber-100/90 font-light italic mb-10 max-w-lg leading-relaxed">
          {sunsetData.subtitle}
        </p>

        {/* Central Polaroid Photo Frame with 3D Tilt */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2, rotateY: 8 }}
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
          className="relative p-4 sm:p-5 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl shadow-purple-950/60 border border-white max-w-sm w-full mb-10 transform -rotate-1 transition-all duration-500 cursor-pointer group"
        >
          <div className="overflow-hidden rounded-2xl aspect-4/5 bg-purple-100 mb-3 relative">
            <img
              src={sunsetData.mainPhoto}
              alt="Sunset Portrait"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3 text-white text-xs font-semibold">
              <span>Momen Terindah 🌅</span>
            </div>
          </div>
          <p className="font-script text-2xl sm:text-3xl text-purple-950 font-bold drop-shadow-sm">
            Selamanya Bersamamu 🌅
          </p>
        </motion.div>

        {/* Main Message Card with Typewriter Effect */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="glass-modal rounded-3xl p-6 sm:p-10 max-w-2xl w-full border border-white/90 shadow-2xl mb-12 text-sky-950 relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-300/20 rounded-full blur-2xl pointer-events-none" />
          <TypewriterText
            text={sunsetData.mainMessage}
            speed={40}
            delay={300}
            className="text-base sm:text-xl font-serif-title leading-relaxed text-slate-800 font-medium"
          />
        </motion.div>

        {/* Interactive "Open My Last Message 💙" Button with Pulsing Glow */}
        <div className="relative group">
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 blur-lg opacity-80 group-hover:opacity-100 transition duration-500 animate-pulse-glow" />

          <motion.button
            onClick={handleOpenClick}
            whileHover={{ scale: 1.07, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex items-center gap-3 px-9 py-4.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-sky-500 text-white font-bold text-lg shadow-2xl shadow-pink-500/50 transition-all duration-300 cursor-pointer overflow-hidden border border-white/90"
          >
            {/* Pulsing glow background sweep */}
            <span className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />

            <Mail size={22} className="animate-bounce text-pink-100" />
            <span>{sunsetData.letterButtonText}</span>
            <Heart size={20} className="fill-white text-white group-hover:scale-130 transition-transform" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};
