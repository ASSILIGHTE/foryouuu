import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, Heart } from 'lucide-react';
import { config } from '../../config';

export const TimelineSection = () => {
  const moments = config.momentsSection;

  return (
    <section 
      id="section-moments"
      className="relative min-h-screen py-24 px-4 sm:px-6 max-w-5xl mx-auto z-20"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full bg-sky-200/70 text-sky-900 text-xs font-bold tracking-widest uppercase mb-3 border border-sky-300/50 shadow-sm"
        >
          📖 {moments.badge}
        </motion.span>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-serif-title font-bold text-sky-950 mb-3 drop-shadow-sm"
        >
          {moments.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-sky-800/90 font-medium"
        >
          {moments.subtitle}
        </motion.p>
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative">
        {/* Central Glowing Timeline Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-sky-300 via-sky-400 to-pink-400 -translate-x-1/2 rounded-full opacity-70 shadow-lg shadow-sky-200" />

        <div className="space-y-12 sm:space-y-20">
          {moments.timeline.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: index * 0.12, ease: 'easeOut' }}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Anchor Node (Pulsing Cloud Icon) */}
                <motion.div 
                  whileHover={{ scale: 1.25, rotate: 10 }}
                  className="absolute left-6 md:left-1/2 top-0 md:top-8 -translate-x-1/2 z-20 flex items-center justify-center w-13 h-13 rounded-full glass-cloud border-2 border-white shadow-xl text-sky-600 text-xl cursor-pointer"
                >
                  <span>{item.icon}</span>
                </motion.div>

                {/* Content Card (Left or Right) */}
                <div className={`w-full md:w-[calc(50%-2.5rem)] pl-16 md:pl-0 ${
                  isEven ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'
                }`}>
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ type: "spring", stiffness: 250, damping: 20 }}
                    className="glass-card rounded-3xl p-6 sm:p-7 shadow-2xl shadow-sky-100/70 border border-white/90 hover:bg-white/90 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                  >
                    
                    {/* Date Tag */}
                    {item.date && (
                      <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-100 to-pink-100 text-sky-800 text-xs font-bold mb-3 shadow-inner ${
                        isEven ? 'md:ml-auto' : ''
                      }`}>
                        <Calendar size={14} className="text-sky-500 animate-pulse" />
                        <span>{item.date}</span>
                      </div>
                    )}

                    <h3 className="text-xl sm:text-2xl font-bold text-sky-950 mb-1 group-hover:text-sky-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-4">
                      {item.tagline}
                    </p>

                    {/* Image Preview with Zoom effect */}
                    <div className="overflow-hidden rounded-2xl bg-sky-50 aspect-16/10 mb-4 shadow-inner relative group/img">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-sky-950/40 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                    </div>

                    <p className="text-sm text-sky-900/90 leading-relaxed font-sans font-normal">
                      {item.description}
                    </p>
                  </motion.div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
