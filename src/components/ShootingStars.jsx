import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const ShootingStars = ({ scrollProgress }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Spawn a shooting star every 2.5 - 5 seconds
    const interval = setInterval(() => {
      const newStar = {
        id: Date.now(),
        top: Math.random() * 40, // upper sky
        left: Math.random() * 70 + 10,
        length: Math.random() * 80 + 70,
        speed: Math.random() * 0.6 + 0.7,
      };

      setStars((prev) => [...prev.slice(-3), newStar]);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const handleComplete = (id) => {
    setStars((prev) => prev.filter((s) => s.id !== id));
  };

  // Only show when reaching late sky / sunset (scrollProgress > 0.4)
  if (scrollProgress < 0.35) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            x: [-50, star.length * 2.5],
            y: [0, star.length * 1.8],
            opacity: [0, 1, 0],
            scale: [0.8, 1, 0.4],
          }}
          transition={{
            duration: star.speed,
            ease: 'easeOut',
          }}
          onAnimationComplete={() => handleComplete(star.id)}
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-pink-200 shadow-md shadow-white rounded-full"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.length}px`,
            transform: 'rotate(-35deg)',
          }}
        />
      ))}
    </div>
  );
};
