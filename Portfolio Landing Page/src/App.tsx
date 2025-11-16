import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { StorytellingSection } from './components/StorytellingSection';
import { UIUXSection } from './components/UIUXSection';
import { InitialToggle } from './components/InitialToggle';

export type ViewMode = 'storytelling' | 'uiux' | null;

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>(null);
  const [hasSelected, setHasSelected] = useState(false);
  const [selectedMode, setSelectedMode] = useState<ViewMode>('storytelling');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleModeSelect = (mode: 'storytelling' | 'uiux') => {
    setSelectedMode(mode);
  };

  const handleProceed = () => {
    if (selectedMode) {
      setIsAnimating(true);
      // Wait for animation to complete
      setTimeout(() => {
        setHasSelected(true);
        setViewMode(selectedMode);
        setIsAnimating(false);
      }, 800);
    }
  };

  const handleModeChange = (mode: 'storytelling' | 'uiux') => {
    setViewMode(mode);
    setSelectedMode(mode);
  };

  return (
    <motion.div 
      className="min-h-screen"
      animate={{
        background: selectedMode === 'storytelling' 
          ? '#FF3E32' // Storytelling: updated orange
          : selectedMode === 'uiux'
          ? '#1358B6' // UI/UX: updated blue
          : '#F4F1DE' // Neutral cream
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Landing page with toggle - fades out cleanly */}
      <AnimatePresence>
        {!hasSelected && (
          <InitialToggle
            selectedMode={selectedMode}
            onModeSelect={handleModeSelect}
            onProceed={handleProceed}
            isAnimating={isAnimating}
            hasSelected={hasSelected}
            onModeChange={handleModeChange}
          />
        )}
      </AnimatePresence>

      {/* Header slides in from top when content appears */}
      {hasSelected && viewMode && (
        <Header
          currentMode={viewMode}
          onModeChange={handleModeChange}
          selectedMode={selectedMode}
          isVisible={hasSelected}
        />
      )}

      <AnimatePresence mode="wait">
        {hasSelected && (
          <motion.main
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-24"
          >
            <AnimatePresence mode="wait">
              {viewMode === 'storytelling' && (
                <motion.div
                  key="storytelling"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <StorytellingSection />
                </motion.div>
              )}
              {viewMode === 'uiux' && (
                <motion.div
                  key="uiux"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <UIUXSection />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        )}
      </AnimatePresence>
    </motion.div>
  );
}