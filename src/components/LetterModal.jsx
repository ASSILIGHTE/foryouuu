import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { config } from '../config';
import { TypewriterText } from './TypewriterText';

export const LetterModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Trigger romantic multi-wave confetti explosion
      const count = 200;
      const defaults = {
        origin: { y: 0.7 }
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ['#f472b6', '#38bdf8', '#fbbf24']
      });
      fire(0.2, {
        spread: 60,
        colors: ['#ffffff', '#fbcfe8', '#bae6fd']
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        colors: ['#e0e7ff', '#ec4899', '#38bdf8']
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });

      // Continuous side bursts
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;

      const sideInterval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(sideInterval);
        }
        confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#f472b6', '#38bdf8'] });
        confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#fbbf24', '#f472b6'] });
      }, 250);

      return () => clearInterval(sideInterval);
    }
  }, [isOpen]);

  const letter = config.sunsetSection.secretLetter;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-sky-950/50 backdrop-blur-md cursor-pointer"
          />

          {/* Envelope Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 50, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', damping: 22, stiffness: 220 }}
            className="relative w-full max-w-lg glass-modal rounded-3xl p-6 sm:p-9 shadow-2xl border border-white text-sky-950 z-10 my-auto overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              aria-label="Tutup Surat"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-sky-600 hover:text-sky-900 transition-colors shadow-md cursor-pointer z-20"
            >
              <X size={18} />
            </button>

            {/* Top Stamp / Heart Decoration */}
            <div className="flex items-center gap-3.5 mb-6 border-b border-sky-100 pb-4 relative z-10">
              <motion.div 
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-pink-300 via-rose-200 to-sky-200 flex items-center justify-center shadow-inner text-pink-600 border border-white"
              >
                <Heart size={26} className="fill-pink-500 animate-pulse" />
              </motion.div>
              <div>
                <span className="text-xs font-bold tracking-wider text-sky-600 uppercase flex items-center gap-1">
                  <Sparkles size={13} className="text-amber-400" /> {letter.title}
                </span>
                <p className="text-xs text-slate-500 font-medium">Spesial untuk {config.partnerName}</p>
              </div>
            </div>

            {/* Letter Content */}
            <div className="space-y-4 text-sky-900 leading-relaxed font-sans text-sm sm:text-base relative z-10">
              {/* Highlight Quote */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-pink-50 border border-sky-100/90 italic text-sky-800 font-serif-title text-base sm:text-lg text-center leading-snug shadow-sm"
              >
                "{letter.quote}"
              </motion.div>

              {/* Main Body with Typewriter Effect */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="pt-2 text-slate-700 font-normal leading-relaxed"
              >
                <TypewriterText
                  text={letter.body}
                  speed={30}
                  delay={400}
                  triggerOnView={false}
                />
              </motion.div>

              {/* Final Note */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-4 border-t border-sky-100 text-right"
              >
                <p className="text-xs text-sky-600 font-bold">{letter.closing}</p>
                <p className="text-2xl sm:text-3xl font-script text-sky-900 font-bold mt-1">
                  {config.senderName} 💙
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
