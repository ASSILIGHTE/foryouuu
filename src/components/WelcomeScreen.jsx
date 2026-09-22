import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Gift, Cloud } from 'lucide-react';
import { config } from '../config';

export const WelcomeScreen = ({ onOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-sky-300 via-sky-100 to-pink-100 px-4 text-center overflow-hidden"
    >
      {/* Background Animated Clouds */}
      <motion.div
        animate={{ y: [-10, 10, -10], x: [-15, 15, -15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-12 left-10 text-white/60 pointer-events-none hidden sm:block"
      >
        <Cloud size={110} />
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10], x: [15, -15, 15] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-16 right-10 text-white/50 pointer-events-none hidden sm:block"
      >
        <Cloud size={140} />
      </motion.div>

      {/* Central Interactive Welcome Envelope Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, type: 'spring', stiffness: 180 }}
        className="glass-modal max-w-md w-full rounded-3xl p-7 sm:p-10 shadow-2xl border border-white/90 relative z-10 flex flex-col items-center text-sky-950"
      >
        {/* Floating Photo Frame (hero.jpeg) */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-pink-300 via-sky-200 to-indigo-300 shadow-xl shadow-pink-200/60 mb-5 border-2 border-white relative group cursor-pointer"
        >
          <img 
            src="/images/hero.jpeg" 
            alt={config.partnerName} 
            className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500" 
          />
          <span className="absolute -top-1 -right-1 text-xl">✨</span>
        </motion.div>

        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sky-100/80 text-sky-800 text-xs font-bold uppercase tracking-widest mb-4 border border-sky-200/60 shadow-sm">
          <Sparkles size={13} className="text-sky-500 animate-spin" />
          <span>SPECIAL BIRTHDAY SURPRISE ☁️</span>
        </div>

        {/* Invitation Title */}
        <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-sky-950 mb-2 leading-tight">
          {' '}
          <span className="font-script text-4xl sm:text-5xl animate-text-shimmer block sm:inline mt-1">
            {config.partnerName}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-sky-800/80 font-medium mb-8 leading-relaxed">
          Hari ini adalah tentang kamu, tentang senyummu, dan tentang satu hari indah yang pantas dirayakan. 🤍🌸
        </p>

        {/* Open Button */}
        <div className="relative group w-full">
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-400 via-pink-400 to-sky-400 blur-md opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse-glow" />

          <motion.button
            onClick={onOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-full py-4 px-6 rounded-full bg-gradient-to-r from-sky-400 via-sky-500 to-indigo-400 text-white font-bold text-base sm:text-lg shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-white/80 flex items-center justify-center gap-2.5"
          >
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            <Heart size={20} className="fill-white text-white animate-pulse" />
            <span>Buka Kejutan 💌</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
