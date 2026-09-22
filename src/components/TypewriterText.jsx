import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export const TypewriterText = ({
  text = '',
  speed = 35,
  delay = 300,
  className = '',
  showCursor = true,
  triggerOnView = true,
  onComplete,
}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const shouldStart = triggerOnView ? isInView : true;
    if (!shouldStart || !text) return;

    let timeoutId;
    let currentIndex = 0;

    const startTimeout = setTimeout(() => {
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          const char = text[currentIndex];
          currentIndex++;
          setDisplayedText(text.slice(0, currentIndex));

          // Natural typing pauses after punctuation for ultra-smooth rhythm
          let pause = speed;
          if (['.', '!', '?', '\n'].includes(char)) {
            pause += 200;
          } else if ([',', ';', ':'].includes(char)) {
            pause += 100;
          }

          timeoutId = setTimeout(typeNextChar, pause);
        } else {
          setIsTypingComplete(true);
          if (onComplete) onComplete();
        }
      };

      typeNextChar();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
    };
  }, [isInView, text, speed, delay, triggerOnView, onComplete]);

  return (
    <div ref={containerRef} className={className}>
      <span className="whitespace-pre-line transition-all duration-75">{displayedText}</span>
      {showCursor && (
        <span
          className={`inline-block ml-1 font-bold text-sky-500 animate-pulse transition-opacity duration-500 ${
            isTypingComplete ? 'opacity-30' : 'opacity-100'
          }`}
        >
          |
        </span>
      )}
    </div>
  );
};
