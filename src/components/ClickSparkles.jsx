import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EMOJIS = ['✨', '💖', '☁️', '🌸', '💙', '⭐', '💫'];

export const ClickSparkles = () => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      // Create 6 floating burst particles per click
      const newBurst = Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2 + (Math.random() * 0.5 - 0.25);
        const distance = Math.random() * 60 + 30;
        return {
          id: `${Date.now()}-${i}-${Math.random()}`,
          x: e.clientX,
          y: e.clientY,
          targetX: e.clientX + Math.cos(angle) * distance,
          targetY: e.clientY + Math.sin(angle) * distance - 40, // float upwards slightly
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
          size: Math.random() * 14 + 14,
          rotation: Math.random() * 360 - 180,
        };
      });

      setSparkles((prev) => [...prev.slice(-24), ...newBurst]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleAnimationComplete = (id) => {
    setSparkles((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.span
            key={s.id}
            initial={{
              opacity: 1,
              scale: 0.2,
              x: s.x - s.size / 2,
              y: s.y - s.size / 2,
              rotate: 0,
            }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0.3, 1.2, 0.8],
              x: s.targetX - s.size / 2,
              y: s.targetY - s.size / 2,
              rotate: s.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onAnimationComplete={() => handleAnimationComplete(s.id)}
            className="absolute select-none font-sans"
            style={{ fontSize: `${s.size}px` }}
          >
            {s.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};
