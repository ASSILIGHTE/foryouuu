import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';
import { config } from '../config';

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const target = new Date(config.targetDate || '2026-09-23T00:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full max-w-md my-6 p-4 sm:p-5 rounded-3xl glass-cloud border border-white/80 shadow-lg shadow-sky-200/40 text-center"
    >
      <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700 mb-3">
        <Clock size={14} className="text-sky-500 animate-pulse" />
        <span>{config.hero.countdownTitle || "Countdown 23 September 2026"}</span>
      </div>

      {timeLeft.isPassed ? (
        <div className="py-2 text-sky-900 font-bold text-lg flex items-center justify-center gap-2">
          <Sparkles className="text-amber-400" />
          <span>Hari Spesial Telah Tiba! 🎉</span>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {timeUnits.map((unit, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white shadow-sm hover:scale-105 transition-transform"
            >
              <span className="text-xl sm:text-2xl font-bold font-mono text-sky-950 leading-none">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-sky-600 mt-1 uppercase tracking-wide">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
