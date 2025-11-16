import { useState, useEffect } from 'react';
import { motion, useMotionValue, animate, useTransform } from 'motion/react';
import { ViewMode } from '../App';

interface HeaderProps {
  currentMode: 'storytelling' | 'uiux';
  onModeChange: (mode: 'storytelling' | 'uiux') => void;
  selectedMode: ViewMode;
  isVisible: boolean;
}

export function Header({ currentMode, onModeChange, selectedMode, isVisible }: HeaderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toggleCursorPosition, setToggleCursorPosition] = useState({ x: 0, y: 0 });
  const [isToggleHovering, setIsToggleHovering] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Match landing page breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll for size changes
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Responsive drag values - smaller than landing page
  // State 2 (top): 280px mobile, 400px desktop
  // State 3 (scrolled): 240px mobile, 340px desktop
  const baseWidth = isMobile ? (scrolled ? 240 : 280) : (scrolled ? 340 : 400);
  const baseHeight = isMobile ? (scrolled ? 48 : 56) : (scrolled ? 52 : 60);
  
  // Calculate knob width to fit properly (roughly half the available space minus padding)
  const padding = 8; // p-2 = 8px padding on each side
  const availableWidth = baseWidth - (padding * 2);
  const knobWidth = Math.floor(availableWidth / 2);
  const knobHeight = baseHeight - (padding * 2);
  const maxDrag = availableWidth - knobWidth;
  const midpoint = maxDrag / 2;

  const x = useMotionValue(currentMode === 'uiux' ? maxDrag : 0);

  // Update x position when mode changes (not on initial mount)
  useEffect(() => {
    // Don't animate on first render, let the initial value be set
    const timer = setTimeout(() => {
      const targetX = currentMode === 'uiux' ? maxDrag : 0;
      if (x.get() !== targetX) {
        animate(x, targetX, { type: 'spring', stiffness: 500, damping: 30 });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [currentMode]);

  // Update x position when maxDrag changes due to scrolling
  useEffect(() => {
    const targetX = currentMode === 'uiux' ? maxDrag : 0;
    animate(x, targetX, { type: 'spring', stiffness: 300, damping: 30, duration: 0.3 });
  }, [maxDrag]);

  // Transform x position for smooth text opacity changes
  const storytellingOpacity = useTransform(x, [0, midpoint, maxDrag], [1, 0.3, 0.3]);
  const uiuxOpacity = useTransform(x, [0, midpoint, maxDrag], [0.3, 0.3, 1]);

  const handleDragEnd = (_: any, info: any) => {
    const currentX = x.get();

    // Determine which side based on position
    if (currentX < midpoint) {
      animate(x, 0, { type: 'spring', stiffness: 500, damping: 30 });
      onModeChange('storytelling');
    } else {
      animate(x, maxDrag, { type: 'spring', stiffness: 500, damping: 30 });
      onModeChange('uiux');
    }
  };

  const handleToggleClick = (mode: 'storytelling' | 'uiux') => {
    const targetX = mode === 'storytelling' ? 0 : maxDrag;
    animate(x, targetX, { type: 'spring', stiffness: 500, damping: 30 });
    onModeChange(mode);
  };

  // Unified transition config for all animations
  const sizeTransition = { duration: 0.3, ease: 'easeInOut' };

  if (!isVisible) return null;

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pointer-events-none"
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        paddingTop: isMobile ? 16 : 24,
      }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
    >
      {/* Apple-inspired liquid glass toggle */}
      <motion.div
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setToggleCursorPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }}
        onMouseEnter={() => setIsToggleHovering(true)}
        onMouseLeave={() => setIsToggleHovering(false)}
        animate={{
          width: baseWidth,
          height: baseHeight,
        }}
        transition={sizeTransition}
        className="relative backdrop-blur-xl rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] border border-white/20 pointer-events-auto overflow-hidden"
        style={{ 
          padding: 8,
          background: 'rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Cursor-following glow effect on toggle bar */}
        {isToggleHovering && (
          <motion.div
            className="absolute rounded-full pointer-events-none z-5"
            style={{
              width: '180px',
              height: '180px',
              left: toggleCursorPosition.x - 90,
              top: toggleCursorPosition.y - 90,
              background: 'radial-gradient(circle, rgba(247, 236, 213, 0.25) 0%, rgba(247, 236, 213, 0.15) 30%, transparent 70%)',
              filter: 'blur(12px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}

        {/* Clickable background areas */}
        <motion.div
          className="absolute inset-2 flex items-center justify-between z-10"
          animate={{
            width: availableWidth,
            height: baseHeight - (padding * 2),
          }}
          transition={sizeTransition}
        >
          <button
            onClick={() => handleToggleClick('storytelling')}
            style={{ width: knobWidth, height: knobHeight }}
            className="rounded-full cursor-pointer transition-all"
            aria-label="Select Storytelling"
          />
          <button
            onClick={() => handleToggleClick('uiux')}
            style={{ width: knobWidth, height: knobHeight }}
            className="rounded-full cursor-pointer transition-all"
            aria-label="Select UI/UX"
          />
        </motion.div>

        {/* Draggable knob */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: maxDrag }}
          dragElastic={0.05}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 30 }}
          onDragEnd={handleDragEnd}
          style={{ 
            x,
            background: '#171927' // Dark navy knob - matches InitialToggle
          }}
          animate={{
            width: knobWidth,
            height: knobHeight,
          }}
          transition={sizeTransition}
          className="absolute left-2 top-2 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.4)] cursor-grab active:cursor-grabbing z-20"
          whileTap={{ scale: 0.98 }}
        />

        {/* Text labels */}
        <motion.div
          className="absolute inset-2 flex items-center justify-between pointer-events-none z-30"
          animate={{
            width: availableWidth,
            height: baseHeight - (padding * 2),
          }}
          transition={sizeTransition}
        >
          <motion.div
            style={{ 
              opacity: storytellingOpacity,
              color: '#F7ECD5',
              fontFamily: 'Gilroy, sans-serif',
              fontWeight: 700
            }}
            animate={{
              width: knobWidth,
              fontSize: scrolled ? (isMobile ? '12px' : '15px') : (isMobile ? '14px' : '16px'),
            }}
            transition={sizeTransition}
            className="flex items-center justify-center"
          >
            Storytelling
          </motion.div>
          <motion.div
            style={{ 
              opacity: uiuxOpacity,
              color: '#F7ECD5',
              fontFamily: 'Gilroy, sans-serif',
              fontWeight: 700
            }}
            animate={{
              width: knobWidth,
              fontSize: scrolled ? (isMobile ? '12px' : '15px') : (isMobile ? '14px' : '16px'),
            }}
            transition={sizeTransition}
            className="flex items-center justify-center"
          >
            UI/UX
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}