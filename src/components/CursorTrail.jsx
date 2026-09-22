import React, { useEffect, useRef } from 'react';

export const CursorTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Disable on touch / mobile screens
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      // Add 2-3 stardust particles per movement
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: e.clientX + (Math.random() * 12 - 6),
          y: e.clientY + (Math.random() * 12 - 6),
          size: Math.random() * 3 + 1,
          color: Math.random() > 0.5 ? 'rgba(224, 242, 254, ' : 'rgba(254, 215, 226, ',
          alpha: 0.9,
          vx: Math.random() * 1 - 0.5,
          vy: Math.random() * 1 - 0.5,
          life: 0,
          maxLife: Math.random() * 25 + 15,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.alpha = 1 - (p.life / p.maxLife);

        if (p.alpha <= 0 || p.life >= p.maxLife) {
          particles.splice(idx, 1);
          return;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40 hidden sm:block"
    />
  );
};
