import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface RotatingWordsProps {
  words: string[];
  interval?: number; // milliseconds between word changes
  className?: string;
  style?: React.CSSProperties;
}

export function RotatingWords({ 
  words, 
  interval = 2500, 
  className = '', 
  style = {} 
}: RotatingWordsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Start the rotation after a brief delay
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, 500);

    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval, hasStarted]);

  return (
    <span className={`inline-block ${className}`} style={{ position: 'relative', ...style }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          style={{ 
            display: 'inline-block',
            ...style 
          }}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
