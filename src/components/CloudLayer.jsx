import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const CloudLayer = ({ scrollProgress }) => {
  const canvasRef = useRef(null);

  // Canvas light dust particles effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const isMobile = window.innerWidth < 640;
    const particleCount = isMobile ? 25 : 55;

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      speedY: - (Math.random() * 0.3 + 0.1),
      speedX: Math.sin(Math.random() * Math.PI) * 0.2,
      pulse: Math.random() * 0.02 + 0.005,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += Math.sin(Date.now() * p.pulse) * 0.01;

        if (p.y < 0) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(0.8, p.alpha))})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Parallax Y shifts based on scroll position
  const parallaxBg = scrollProgress * -150;
  const parallaxFg = scrollProgress * -320;

  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
      {/* Light Dust Particle Canvas Overlay */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Deep Background Cloud Layer (Slow Drift) */}
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ transform: `translateY(${parallaxBg}px)` }}
      >
        <motion.div
          animate={{ x: ['-10%', '10%', '-10%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-10 left-[-10%] w-[120%] opacity-45 blur-[2px]"
        >
          <svg viewBox="0 0 1440 320" fill="none" className="w-full h-auto">
            <path
              fill="#ffffff"
              d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,192C672,192,768,160,864,154.7C960,149,1056,171,1152,181.3C1248,192,1344,192,1392,192L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
          </svg>
        </motion.div>

        <motion.div
          animate={{ x: ['10%', '-10%', '10%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[40%] right-[-10%] w-[120%] opacity-35 blur-[3px]"
        >
          <svg viewBox="0 0 1440 320" fill="none" className="w-full h-auto">
            <path
              fill="#ffffff"
              d="M0,96L60,117.3C120,139,240,181,360,186.7C480,192,600,160,720,144C840,128,960,128,1080,144C1200,160,1320,192,1380,208L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            />
          </svg>
        </motion.div>
      </div>

      {/* Midground Soft Fluffy Clouds */}
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ transform: `translateY(${parallaxFg}px)` }}
      >
        <motion.div
          animate={{ x: ['-5%', '5%', '-5%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[18%] left-[5%] opacity-60 max-w-sm sm:max-w-md blur-[1px]"
        >
          <svg viewBox="0 0 200 100" className="w-full h-auto fill-white drop-shadow-md">
            <path d="M 20 80 A 30 30 0 0 1 70 50 A 40 40 0 0 1 140 50 A 30 30 0 0 1 180 80 Z" />
          </svg>
        </motion.div>

        <motion.div
          animate={{ x: ['5%', '-5%', '5%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[65%] right-[2%] opacity-55 max-w-sm sm:max-w-lg blur-[1px]"
        >
          <svg viewBox="0 0 240 120" className="w-full h-auto fill-white drop-shadow-lg">
            <path d="M 30 90 A 35 35 0 0 1 85 55 A 45 45 0 0 1 165 55 A 35 35 0 0 1 210 90 Z" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};
