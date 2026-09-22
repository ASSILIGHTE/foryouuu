import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const SkyBackground = ({ scrollProgress }) => {
  // Generate static positions for twinkling stars in sunset section
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const starList = Array.from({ length: 45 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 80,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setStars(starList);
  }, []);

  // Calculate sunset interpolations:
  // scrollProgress ranges 0 to 1.
  // Below 0.65 -> Daytime Sky
  // 0.65 to 1.0 -> Sunset Soft Pink/Purple/Orange Gradient
  const sunsetFactor = Math.max(0, Math.min(1, (scrollProgress - 0.55) / 0.35));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Daytime Sky Base */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{
          background: 'linear-gradient(180deg, #bae6fd 0%, #e0f2fe 40%, #f0f9ff 100%)',
          opacity: 1 - sunsetFactor,
        }}
      />

      {/* Sunset Romantic Sky Layer */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{
          background: 'linear-gradient(180deg, #311b92 0%, #6b21a8 25%, #c084fc 45%, #f472b6 70%, #ff8a65 100%)',
          opacity: sunsetFactor,
        }}
      />

      {/* Soft Ambient Radial Sun/Glow */}
      <div
        className="absolute rounded-full blur-3xl transition-all duration-1000"
        style={{
          top: `${15 + sunsetFactor * 35}%`,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '75vw',
          height: '45vh',
          background: sunsetFactor > 0.3 
            ? 'radial-gradient(circle, rgba(253, 186, 116, 0.45) 0%, rgba(244, 114, 182, 0.25) 50%, rgba(0,0,0,0) 80%)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, rgba(186, 230, 253, 0.3) 50%, rgba(0,0,0,0) 80%)',
        }}
      />

      {/* Twinkling Stars (visible as sunset grows) */}
      {sunsetFactor > 0.2 && (
        <div 
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: sunsetFactor }}
        >
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white shadow-sm shadow-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
              animate={{
                opacity: [0.2, 0.9, 0.2],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
