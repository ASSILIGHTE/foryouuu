import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { config } from './config';
import { LoadingScreen } from './components/LoadingScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SkyBackground } from './components/SkyBackground';
import { CloudLayer } from './components/CloudLayer';
import { BirdFlock } from './components/BirdFlock';
import { AudioController, globalAudioSynth } from './components/AudioController';
import { LetterModal } from './components/LetterModal';
import { ClickSparkles } from './components/ClickSparkles';
import { ShootingStars } from './components/ShootingStars';

import { HeroSection } from './components/Sections/HeroSection';
import { LoveSection } from './components/Sections/LoveSection';
import { TimelineSection } from './components/Sections/TimelineSection';
import { SunsetSection } from './components/Sections/SunsetSection';

export function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStartedAudio, setHasStartedAudio] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  // Track window scroll progress (0 to 1)
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = window.scrollY / totalScroll;
        setScrollProgress(Math.max(0, Math.min(1, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenWelcome = () => {
    globalAudioSynth.playChime();
    setHasStartedAudio(true);
    setShowWelcome(false);
    setIsLoading(true);
  };

  const handleStartJourney = () => {
    setHasStartedAudio(true);
    const target = document.getElementById('section-love');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLetter = () => {
    setIsLetterOpen(true);
  };

  return (
    <div className="relative min-h-screen selection:bg-pink-200 selection:text-pink-900">
      {/* Interactive Click Sparkles & Hearts Burst */}
      <ClickSparkles />

      {/* 1. Welcome Screen & Loading Screen Transitions */}
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <WelcomeScreen key="welcome" onOpen={handleOpenWelcome} />
        ) : isLoading ? (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        ) : null}
      </AnimatePresence>

      {/* 2. Interactive Sky Engine Layers & Shooting Stars */}
      <SkyBackground scrollProgress={scrollProgress} />
      <CloudLayer scrollProgress={scrollProgress} />
      <BirdFlock scrollProgress={scrollProgress} />
      <ShootingStars scrollProgress={scrollProgress} />

      {/* 3. Audio Controller */}
      <AudioController
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        hasStarted={hasStartedAudio}
        setHasStarted={setHasStartedAudio}
      />

      {/* 4. Main Page Sections */}
      <main className="relative z-20">
        <HeroSection onStartJourney={handleStartJourney} />
        <LoveSection />
        <TimelineSection />
        <SunsetSection onOpenLetter={handleOpenLetter} />
      </main>

      {/* 5. Letter Modal */}
      <LetterModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
      />

      {/* 6. Footer */}
      <footer className="relative z-20 py-8 text-center text-xs text-white/80 font-medium border-t border-white/10 backdrop-blur-sm">
        <p className="font-serif-title italic">
          Sky of Us — Perjalanan Ulang Tahun Spesial Untuk {config.partnerName} ☁️✨
        </p>
        <p className="mt-1 text-white/60">
          Made with 💙 by {config.senderName}
        </p>
      </footer>
    </div>
  );
}

export default App;
