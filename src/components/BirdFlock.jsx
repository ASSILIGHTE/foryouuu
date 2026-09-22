import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// SVG Animated Bird Component with realistic wing flap motion
const AnimatedSvgBird = ({ scale = 1, flapSpeed = '0.4s', opacity = 0.85, color = '#0284c7' }) => {
  return (
    <div 
      className="inline-block transform-gpu"
      style={{ transform: `scale(${scale})`, opacity }}
    >
      <svg 
        viewBox="0 0 100 60" 
        className="w-10 h-6 overflow-visible"
      >
        {/* Left Wing */}
        <g className="origin-[45px_30px]" style={{ animation: `wingFlap ${flapSpeed} ease-in-out infinite alternate` }}>
          <path
            d="M 45 30 Q 25 5 5 18 Q 20 28 45 30 Z"
            fill={color}
          />
        </g>
        {/* Right Wing */}
        <g className="origin-[45px_30px]" style={{ animation: `wingFlap ${flapSpeed} ease-in-out infinite alternate-reverse` }}>
          <path
            d="M 45 30 Q 65 5 85 18 Q 70 28 45 30 Z"
            fill={color}
          />
        </g>
        {/* Bird Body & Tail */}
        <path
          d="M 45 30 Q 45 38 42 50 Q 45 42 48 50 Q 45 35 45 30 Z"
          fill={color}
        />
        {/* Head */}
        <circle cx="45" cy="28" r="3" fill={color} />
      </svg>
    </div>
  );
};

export const BirdFlock = ({ scrollProgress }) => {
  const [birds, setBirds] = useState([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    // Mobile: 3 birds/flocks, Desktop: 7 birds/flocks
    const birdCount = isMobile ? 3 : 7;

    const generatedBirds = Array.from({ length: birdCount }, (_, idx) => {
      const isDistant = Math.random() > 0.4;
      const isFlockLeader = idx === 0 || idx === 3;
      const scale = isDistant ? Math.random() * 0.3 + 0.35 : Math.random() * 0.4 + 0.7;
      const duration = isDistant ? Math.random() * 12 + 18 : Math.random() * 8 + 10;
      const startY = Math.random() * 70 + 10; // Top % position
      const endY = startY + (Math.random() * 30 - 15);
      const midY = startY + (Math.random() * 40 - 20); // Curve wave trajectory
      const delay = Math.random() * 10;
      const flapSpeed = `${(Math.random() * 0.2 + 0.3).toFixed(2)}s`;

      return {
        id: idx,
        isFlockLeader,
        scale,
        duration,
        startY,
        midY,
        endY,
        delay,
        flapSpeed,
        opacity: isDistant ? 0.6 : 0.9,
        // Optional sub-birds for flocking 3-5 group effect
        hasFlockGroup: isFlockLeader && !isMobile,
      };
    });

    setBirds(generatedBirds);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {birds.map((bird) => (
        <motion.div
          key={bird.id}
          initial={{
            x: '-10vw',
            y: `${bird.startY}vh`,
            rotate: 5,
          }}
          animate={{
            x: ['-10vw', '50vw', '110vw'],
            y: [`${bird.startY}vh`, `${bird.midY}vh`, `${bird.endY}vh`],
            rotate: [5, -3, 8],
          }}
          transition={{
            duration: bird.duration,
            repeat: Infinity,
            delay: bird.delay,
            ease: 'linear',
          }}
          className="absolute"
        >
          {/* Main Bird */}
          <AnimatedSvgBird
            scale={bird.scale}
            flapSpeed={bird.flapSpeed}
            opacity={bird.opacity}
            color={scrollProgress > 0.6 ? '#fbcfe8' : '#0284c7'}
          />

          {/* Flocking group of 3-4 trailing birds */}
          {bird.hasFlockGroup && (
            <div className="relative">
              <div className="absolute -top-4 -left-8">
                <AnimatedSvgBird
                  scale={bird.scale * 0.8}
                  flapSpeed={bird.flapSpeed}
                  opacity={bird.opacity * 0.85}
                  color={scrollProgress > 0.6 ? '#fbcfe8' : '#0369a1'}
                />
              </div>
              <div className="absolute top-6 -left-12">
                <AnimatedSvgBird
                  scale={bird.scale * 0.75}
                  flapSpeed={bird.flapSpeed}
                  opacity={bird.opacity * 0.8}
                  color={scrollProgress > 0.6 ? '#f472b6' : '#38bdf8'}
                />
              </div>
              <div className="absolute -top-8 -left-16">
                <AnimatedSvgBird
                  scale={bird.scale * 0.65}
                  flapSpeed={bird.flapSpeed}
                  opacity={bird.opacity * 0.7}
                  color={scrollProgress > 0.6 ? '#fda4af' : '#7dd3fc'}
                />
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};
