import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, ChevronRight, Bookmark } from 'lucide-react';
import { config } from '../../config';
import { globalAudioSynth } from '../AudioController';

export const LoveSection = () => {
  const loveData = config.loveSection;
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    globalAudioSynth.playChime();
    setSelectedCard(card);
  };

  return (
    <section 
      id="section-love"
      className="relative min-h-screen py-24 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col justify-center z-20"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full bg-sky-200/70 text-sky-900 text-xs font-bold tracking-widest uppercase mb-3 border border-sky-300/50 shadow-sm"
        >
          ✨ {loveData.badge}
        </motion.span>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-serif-title font-bold text-sky-950 mb-4 drop-shadow-sm"
        >
          {loveData.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-sky-900/90 font-serif-title italic leading-relaxed px-6 py-4 rounded-3xl glass-cloud border border-white/80 shadow-lg shadow-sky-100/60"
        >
          "{loveData.mainQuote}"
        </motion.p>
      </div>

      {/* Main Content Grid: Polaroid Photo + Cloud Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Romantic Polaroid Photo Frame with 3D Tilt */}
        <motion.div 
          initial={{ opacity: 0, x: -40, rotate: -3 }}
          whileInView={{ opacity: 1, x: 0, rotate: -2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center perspective-1000"
        >
          <motion.div 
            whileHover={{ rotateY: 10, rotateX: -6, scale: 1.04 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative group p-4 sm:p-5 bg-white/95 rounded-3xl shadow-2xl shadow-sky-300/50 border border-white max-w-sm w-full cursor-pointer transform-gpu"
          >
            {/* Tape Effect Accent */}
            <motion.div 
              animate={{ rotate: [2, -1, 2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-8 bg-sky-100/80 backdrop-blur-md border border-white/90 rounded-sm shadow-sm z-10 flex items-center justify-center text-[10px] font-bold text-sky-600 uppercase tracking-widest"
            >
              MEMORIES 💖
            </motion.div>

            {/* Polaroid Image */}
            <div className="overflow-hidden rounded-2xl bg-sky-50 aspect-4/5 mb-4 relative group">
              <img
                src={loveData.polaroidPhoto}
                alt={loveData.polaroidCaption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs font-semibold flex items-center gap-1">
                  <Sparkles size={12} className="text-amber-300" /> Klik Kartu Di Samping 🌸
                </span>
              </div>
            </div>

            <div className="text-center font-script text-2xl sm:text-3xl text-sky-900 font-bold drop-shadow-sm">
              {loveData.polaroidCaption}
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Cloud Cards Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {loveData.cloudCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 18, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              onClick={() => handleCardClick(card)}
              className="glass-card rounded-3xl p-5 sm:p-6 cursor-pointer group hover:bg-white/90 border border-white/90 shadow-xl shadow-sky-100/60 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Card Top Light Sweep effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <motion.span 
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    className="text-3xl p-3 rounded-2xl bg-gradient-to-br from-sky-100 to-pink-100 shadow-inner flex items-center justify-center"
                  >
                    {card.icon}
                  </motion.span>
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-200/60 px-3 py-1 rounded-full uppercase tracking-wider border border-sky-300/40">
                    {card.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-sky-950 mb-1 group-hover:text-sky-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-sky-800/80 font-medium">
                  {card.shortText}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-sky-100/80 flex items-center justify-between text-xs text-sky-600 font-bold group-hover:text-sky-800">
                <span>Baca Selengkapnya</span>
                <ChevronRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cloud Card Popup Modal */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
              className="absolute inset-0 bg-sky-950/40 backdrop-blur-md cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: "spring", damping: 22, stiffness: 250 }}
              className="relative w-full max-w-md glass-modal rounded-3xl p-7 shadow-2xl z-10 border border-white text-sky-950"
            >
              <button
                onClick={() => setSelectedCard(null)}
                aria-label="Tutup Detail"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center hover:bg-sky-200 hover:text-sky-900 transition-colors shadow-sm cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-200 to-pink-200 flex items-center justify-center text-3xl mb-4 shadow-inner">
                {selectedCard.icon}
              </div>

              <span className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-1 block">
                {selectedCard.tag}
              </span>

              <h3 className="text-2xl font-serif-title font-bold text-sky-950 mb-3">
                {selectedCard.title}
              </h3>

              <p className="text-sky-900 leading-relaxed text-sm sm:text-base font-normal bg-sky-50/70 p-4 rounded-2xl border border-sky-100">
                {selectedCard.fullMessage}
              </p>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="px-5 py-2 rounded-full bg-sky-500 text-white font-semibold text-xs hover:bg-sky-600 transition-colors cursor-pointer"
                >
                  Tutup ✨
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
