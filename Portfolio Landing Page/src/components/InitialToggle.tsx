import { useState, useEffect } from 'react';
import { motion, useMotionValue, animate, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ViewMode } from '../App';
import { TypewriterText } from './TypewriterText';
import { AnimatedHeading } from './AnimatedHeading';
import storytellingSticker from 'figma:asset/7a1a5ceaf227302937ed1a617ff6e24d0997fd6f.png';
import uiuxSticker from 'figma:asset/8da381af067d13778d59539d2184a8adffe6742c.png';

interface InitialToggleProps {
  selectedMode: ViewMode;
  onModeSelect: (mode: 'storytelling' | 'uiux') => void;
  onProceed: () => void;
  isAnimating?: boolean;
  hasSelected?: boolean;
  onModeChange?: (mode: 'storytelling' | 'uiux') => void;
}

export function InitialToggle({ 
  selectedMode, 
  onModeSelect, 
  onProceed, 
  isAnimating,
  hasSelected,
  onModeChange 
}: InitialToggleProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [toggleCursorPosition, setToggleCursorPosition] = useState({ x: 0, y: 0 });
  const [isToggleHovering, setIsToggleHovering] = useState(false);
  const [orbs, setOrbs] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);
  const [clickOrigin, setClickOrigin] = useState<{ x: number; y: number } | null>(null);
  const [gradientProgress, setGradientProgress] = useState(0);
  
  // Generate floating orbs
  useEffect(() => {
    const generateOrbs = () => {
      const orbCount = isDesktop ? 8 : 5;
      return Array.from({ length: orbCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 200 + 100,
        duration: Math.random() * 20 + 15,
      }));
    };
    setOrbs(generateOrbs());
  }, [isDesktop]);

  // Check screen size - desktop is 1024px and above
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Handle scroll for size changes when sticky
  useEffect(() => {
    if (hasSelected) {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [hasSelected]);

  // SINGLE unified transition configuration - SAME FOR ALL ELEMENTS
  const TRANSITION = { 
    duration: 0.4,
    ease: [0.25, 0.1, 0.25, 1]
  };

  // Sizes for different states
  const getToggleWidth = () => {
    if (hasSelected) {
      return isDesktop ? (scrolled ? 340 : 400) : (scrolled ? 240 : 280);
    }
    return isDesktop ? 480 : 320;
  };

  const getToggleHeight = () => {
    if (hasSelected) {
      return isDesktop ? (scrolled ? 52 : 60) : (scrolled ? 48 : 56);
    }
    return isDesktop ? 80 : 64;
  };

  const toggleWidth = getToggleWidth();
  const toggleHeight = getToggleHeight();
  
  // Calculate dynamic values - ALL based on current dimensions
  const padding = 8;
  const availableWidth = toggleWidth - (padding * 2);
  const knobWidth = availableWidth / 2;
  const knobHeight = toggleHeight - (padding * 2);
  const maxDrag = availableWidth - knobWidth;
  const midpoint = maxDrag / 2;
  
  const x = useMotionValue(selectedMode === 'uiux' ? maxDrag : 0);

  // Update x position when selectedMode or dimensions change
  useEffect(() => {
    const targetX = selectedMode === 'uiux' ? maxDrag : 0;
    animate(x, targetX, { type: 'spring', stiffness: 500, damping: 30 });
  }, [selectedMode, maxDrag, x]);

  // Transform x position for smooth text opacity changes
  const storytellingOpacity = useTransform(x, [0, midpoint, maxDrag], [1, 0.3, 0.3]);
  const uiuxOpacity = useTransform(x, [0, midpoint, maxDrag], [0.3, 0.3, 1]);

  // Project descriptions for each mode
  const projectText = {
    storytelling: "Explore my storytelling side, my poems,\nmy stories, my animations and my short films",
    uiux: "Explore my emotion-centered user research and\nexperience design solutions"
  };

  const handleDragEnd = (_: any, info: any) => {
    const currentX = x.get();
    const handler = hasSelected ? onModeChange : onModeSelect;
    
    // Determine which side based on position
    if (currentX < midpoint) {
      animate(x, 0, { type: 'spring', stiffness: 500, damping: 30 });
      handler?.('storytelling');
    } else {
      animate(x, maxDrag, { type: 'spring', stiffness: 500, damping: 30 });
      handler?.('uiux');
    }
  };

  const handleToggleClick = (mode: 'storytelling' | 'uiux') => {
    const targetX = mode === 'storytelling' ? 0 : maxDrag;
    animate(x, targetX, { type: 'spring', stiffness: 500, damping: 30 });
    
    const handler = hasSelected ? onModeChange : onModeSelect;
    handler?.(mode);
  };

  // Font sizes based on state
  const getFontSize = () => {
    return isDesktop ? 20 : 16;
  };

  // Don't render if hasSelected - just fade out and unmount
  if (hasSelected) return null;

  return (
    <>
      {/* Initial Landing Screen - Simple fade out when arrow clicked */}
      <motion.div
        className="relative flex items-center justify-center z-50 h-screen overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Ambient Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Mesh Gradient Background - shifts with mode selection */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: selectedMode === 'storytelling' 
                ? 'radial-gradient(at 20% 30%, rgba(255, 62, 50, 0.15) 0%, transparent 50%), radial-gradient(at 80% 70%, rgba(255, 100, 80, 0.1) 0%, transparent 50%), radial-gradient(at 40% 80%, rgba(255, 150, 120, 0.08) 0%, transparent 50%)'
                : selectedMode === 'uiux'
                ? 'radial-gradient(at 20% 30%, rgba(19, 88, 182, 0.15) 0%, transparent 50%), radial-gradient(at 80% 70%, rgba(40, 120, 220, 0.1) 0%, transparent 50%), radial-gradient(at 40% 80%, rgba(60, 150, 255, 0.08) 0%, transparent 50%)'
                : 'radial-gradient(at 50% 50%, rgba(247, 236, 213, 0.05) 0%, transparent 50%)'
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
          
          {/* Floating Orbs */}
          {orbs.map((orb) => (
            <motion.div
              key={orb.id}
              className="absolute rounded-full"
              style={{
                width: orb.size,
                height: orb.size,
                left: `${orb.x}%`,
                top: `${orb.y}%`,
                filter: 'blur(60px)',
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                background: selectedMode === 'storytelling'
                  ? ['rgba(255, 62, 50, 0.2)', 'rgba(255, 100, 80, 0.3)', 'rgba(255, 62, 50, 0.2)']
                  : selectedMode === 'uiux'
                  ? ['rgba(19, 88, 182, 0.2)', 'rgba(40, 120, 220, 0.3)', 'rgba(19, 88, 182, 0.2)']
                  : ['rgba(247, 236, 213, 0.1)', 'rgba(247, 236, 213, 0.15)', 'rgba(247, 236, 213, 0.1)']
              }}
              transition={{
                duration: orb.duration,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Subtle gradient overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
            }}
          />

          {/* Grain texture for premium feel */}
          <div
            className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="flex flex-col items-center w-full relative z-10">
          {/* Title */}
          <AnimatedHeading 
            isDesktop={isDesktop}
            isAnimating={isAnimating}
            maxWidth={toggleWidth}
          />

          {/* Toggle and Arrow Container - RESPONSIVE LAYOUT */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              isAnimating
                ? { opacity: 0 }
                : { opacity: 1 }
            }
            transition={{ delay: 0, duration: 0.6 }}
            className={`flex items-center ${isDesktop ? 'flex-row gap-4' : 'flex-col gap-5'}`}
          >
            {/* Arrow Button - Appears FIRST with pop animation - only visible when not selected */}
            {!hasSelected && (
              <motion.button
                onClick={onProceed}
                disabled={!selectedMode}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setCursorPosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                  });
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="relative flex-shrink-0 w-16 h-16 lg:w-16 lg:h-16 rounded-full backdrop-blur-xl flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] overflow-hidden"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.15)',
                  order: isDesktop ? 2 : 2, // Desktop: right side, Mobile: below toggle
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.25), inset 0 1px 2px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.15)'
                }}
                whileHover={{ scale: selectedMode ? 1.15 : 1 }}
                whileTap={{ scale: selectedMode ? 0.95 : 1 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1,
                  opacity: 1 
                }}
                transition={{ 
                  delay: 0.3,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 150,
                  damping: 12
                }}
              >
                {/* Cursor-following glow effect */}
                {isHovering && selectedMode && (
                  <motion.div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: '120px',
                      height: '120px',
                      left: cursorPosition.x - 60,
                      top: cursorPosition.y - 60,
                      background: 'radial-gradient(circle, rgba(247, 236, 213, 0.4) 0%, rgba(247, 236, 213, 0.2) 30%, transparent 70%)',
                      filter: 'blur(8px)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                )}
                <ArrowRight className="w-6 h-6 relative z-10" style={{ color: '#F7ECD5' }} />
              </motion.button>
            )}
            
            {/* ONE TOGGLE BAR - Clean fade + scale from center */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                width: toggleWidth,
                height: toggleHeight,
                scale: 1,
                opacity: 1,
              }}
              transition={{
                width: TRANSITION,
                height: TRANSITION,
                scale: { 
                  delay: 0.9, 
                  duration: 0.7, 
                  ease: [0.34, 1.56, 0.64, 1] // Bounce effect
                },
                opacity: { 
                  delay: 0.9, 
                  duration: 0.5 
                }
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setToggleCursorPosition({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                });
              }}
              onMouseEnter={() => setIsToggleHovering(true)}
              onMouseLeave={() => setIsToggleHovering(false)}
              onClick={(e) => {
                // Set click origin for gradient animation
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                setClickOrigin({ x, y });
                setGradientProgress(0);
                // Animate gradient expansion
                animate(gradientProgress, 1, {
                  duration: 0.8,
                  ease: 'easeOut',
                  onUpdate: (v) => setGradientProgress(v)
                });
              }}
              className="relative backdrop-blur-xl rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] border border-white/20 overflow-hidden cursor-pointer"
              style={{ 
                order: isDesktop ? 1 : 1,
                transformOrigin: 'center center',
                padding: 8,
                background: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.25), inset 0 1px 2px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.2)'
              }}
            >
              {/* Gradient color change effect from click/leave origin */}
              {clickOrigin && gradientProgress > 0 && (
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${clickOrigin.x}px ${clickOrigin.y}px, 
                      ${selectedMode === 'storytelling' 
                        ? `rgba(255, 62, 50, ${0.15 * gradientProgress})` 
                        : selectedMode === 'uiux'
                        ? `rgba(19, 88, 182, ${0.15 * gradientProgress})`
                        : `rgba(247, 236, 213, ${0.08 * gradientProgress})`
                      } 0%, 
                      transparent ${Math.min(gradientProgress * 100, 80)}%)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Shimmer Effect - 4s loop */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.25) 50%, transparent 100%)',
                  width: '200%',
                }}
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatDelay: 1
                }}
              />

              {/* Animated Gradient Border Glow - 5s loop */}
              <motion.div
                className="absolute inset-[-2px] rounded-full pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(247, 236, 213, 0.6), rgba(247, 236, 213, 0.1), rgba(247, 236, 213, 0.6))',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  padding: '2px',
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              {/* Top Highlight for depth */}
              <div
                className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, transparent 100%)',
                }}
              />

              {/* Clickable background areas */}
              <motion.div 
                className="absolute inset-2 flex items-center justify-between z-10"
                animate={{
                  width: availableWidth,
                  height: knobHeight,
                }}
                transition={TRANSITION}
              >
                <motion.button
                  onClick={() => handleToggleClick('storytelling')}
                  animate={{
                    width: knobWidth,
                    height: knobHeight,
                  }}
                  transition={TRANSITION}
                  className="rounded-full cursor-pointer"
                  aria-label="Select Storytelling"
                />
                <motion.button
                  onClick={() => handleToggleClick('uiux')}
                  animate={{
                    width: knobWidth,
                    height: knobHeight,
                  }}
                  transition={TRANSITION}
                  className="rounded-full cursor-pointer"
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
                  left: padding, 
                  top: padding,
                  background: '#171927' // Dark navy knob
                }}
                animate={{
                  width: knobWidth,
                  height: knobHeight,
                }}
                transition={TRANSITION}
                className="absolute rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.4)] cursor-grab active:cursor-grabbing z-20"
                whileTap={{ scale: 0.98 }}
              />

              {/* Text labels */}
              <motion.div 
                className="absolute inset-2 flex items-center justify-between pointer-events-none z-30"
                animate={{
                  width: availableWidth,
                  height: knobHeight,
                }}
                transition={TRANSITION}
              >
                <motion.div
                  style={{ 
                    opacity: storytellingOpacity, 
                    color: '#F7ECD5',
                    fontFamily: 'Gilroy, sans-serif',
                    fontWeight: 700 // Bold
                  }}
                  animate={{
                    width: knobWidth,
                    height: knobHeight,
                    fontSize: getFontSize(),
                  }}
                  transition={TRANSITION}
                  className="flex items-center justify-center"
                >
                  Storytelling
                </motion.div>
                <motion.div
                  style={{ 
                    opacity: uiuxOpacity, 
                    color: '#F7ECD5',
                    fontFamily: 'Gilroy, sans-serif',
                    fontWeight: 700 // Bold
                  }}
                  animate={{
                    width: knobWidth,
                    height: knobHeight,
                    fontSize: getFontSize(),
                  }}
                  transition={TRANSITION}
                  className="flex items-center justify-center"
                >
                  UI/UX
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Animated Project Description - only visible when not selected */}
          {!hasSelected && (
            <motion.div
              className="mt-10 lg:mt-12 w-full mx-auto min-h-[70px] lg:min-h-[80px] flex items-center justify-center px-6 lg:px-4"
              initial={{ opacity: 0 }}
              animate={
                isAnimating
                  ? { opacity: 0, y: -20 }
                  : { opacity: 1, y: 0 }
              }
              transition={
                isAnimating
                  ? { duration: 0.4 }
                  : { delay: 3.5, duration: 0.5 }
              }
              style={{ maxWidth: `${toggleWidth}px` }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <TypewriterText
                    text={
                      selectedMode === 'storytelling' 
                        ? projectText.storytelling 
                        : selectedMode === 'uiux' 
                        ? projectText.uiux
                        : "Drag the toggle or click to choose, then click the arrow to proceed"
                    }
                    speed={30}
                    style={{
                      fontFamily: 'Gilroy, sans-serif',
                      fontWeight: 400,
                      fontSize: isDesktop ? '14px' : '12px',
                      lineHeight: 1.6,
                      color: '#F7ECD5'
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Character Stickers - Pop up from sides when mode is selected but not proceeded */}
        {!hasSelected && (
          <AnimatePresence mode="wait">
            {selectedMode === 'storytelling' && (
              <motion.img
                key="storytelling-sticker"
                src={storytellingSticker}
                alt="Storytelling character"
                className="fixed pointer-events-none z-30"
                style={{
                  left: isDesktop ? '1%' : '-2%',
                  bottom: isDesktop ? '5%' : '5%',
                  width: isDesktop ? '340px' : window.innerWidth < 768 ? '200px' : '260px',
                  height: 'auto',
                  transformOrigin: 'bottom left',
                  maxHeight: isDesktop ? 'none' : '40vh',
                }}
                initial={{ 
                  x: -200, 
                  y: 200,
                  opacity: 0,
                  rotate: 15,
                  scale: 0.8
                }}
                animate={{ 
                  x: 0, 
                  y: 0,
                  opacity: 1,
                  rotate: 8,
                  scale: 1
                }}
                exit={{ 
                  x: -200, 
                  y: 200,
                  opacity: 0,
                  rotate: 15,
                  scale: 0.8
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  mass: 1
                }}
              />
            )}
            {selectedMode === 'uiux' && (
              <motion.img
                key="uiux-sticker"
                src={uiuxSticker}
                alt="UI/UX character"
                className="fixed pointer-events-none z-30"
                style={{
                  right: isDesktop ? '1%' : '-2%',
                  bottom: isDesktop ? '2%' : '2%',
                  width: isDesktop ? '420px' : window.innerWidth < 768 ? '260px' : '320px',
                  height: 'auto',
                  transform: 'scaleX(-1)',
                  transformOrigin: 'bottom right',
                  maxHeight: isDesktop ? 'none' : '40vh',
                }}
                initial={{ 
                  x: 200, 
                  y: 200,
                  opacity: 0,
                  rotate: -15,
                  scale: 0.8
                }}
                animate={{ 
                  x: 0, 
                  y: 0,
                  opacity: 1,
                  rotate: -8,
                  scale: 1
                }}
                exit={{ 
                  x: 200, 
                  y: 200,
                  opacity: 0,
                  rotate: -15,
                  scale: 0.8
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  mass: 1
                }}
              />
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </>
  );
}