import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 600);
          return 100;
        }
        return prev + 10;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-sky-200 via-sky-100 to-sky-50 overflow-hidden"
    >
      {/* Cloud graphics opening up */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <div className="w-20 h-20 mb-6 rounded-full bg-white/70 backdrop-blur-md shadow-xl shadow-sky-200 flex items-center justify-center border border-white">
          <span className="text-4xl animate-bounce">☁️</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-serif-title font-semibold text-sky-900 mb-2 tracking-wide">
          Sky of Us
        </h2>
        <p className="text-sm text-sky-600/80 font-medium mb-6 font-script text-lg">
          Membuka langit kenangan...
        </p>

        {/* Progress Bar */}
        <div className="w-48 h-2 bg-sky-200/80 rounded-full overflow-hidden p-0.5 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 to-sky-300 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          />
        </div>
      </motion.div>

      {/* Decorative Cloud Curtains */}
      <motion.div
        className="absolute -left-20 top-0 bottom-0 w-2/3 bg-white/40 blur-2xl rounded-r-full pointer-events-none"
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 top-0 bottom-0 w-2/3 bg-white/40 blur-2xl rounded-l-full pointer-events-none"
        animate={{ x: [20, -20, 20] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
};
