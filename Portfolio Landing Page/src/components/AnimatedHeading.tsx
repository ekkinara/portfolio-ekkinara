import { motion } from 'motion/react';
import { RotatingWords } from './RotatingWords';

interface AnimatedHeadingProps {
  isDesktop: boolean;
  isAnimating?: boolean;
  maxWidth: number;
}

export function AnimatedHeading({ isDesktop, isAnimating, maxWidth }: AnimatedHeadingProps) {
  // Split the heading into words
  const wordsLine1 = ['Which', 'part', 'of', 'my', 'work'];
  const rotatingWords = ['interests', 'excites', 'fascinates', 'captivates', 'intrigues'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isAnimating ? { y: -20, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={
        isAnimating
          ? { duration: 0.4 }
          : { delay: 1.9, duration: 0.6 }
      }
      className="text-center mb-10 lg:mb-12 px-6 lg:px-4"
      style={{ maxWidth: `${maxWidth}px` }}
    >
      <p 
        className="font-[Fraunces]"
        style={{ 
          fontSize: isDesktop ? '24px' : '20px',
          fontWeight: 700,
          lineHeight: 1.4,
          color: '#F7ECD5'
        }}
      >
        {wordsLine1.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.9 + index * 0.15,
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            style={{ display: 'inline-block', marginRight: '0.3em' }}
          >
            {word}
          </motion.span>
        ))}
        <br />
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.9 + wordsLine1.length * 0.15,
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          style={{ display: 'inline-block', marginRight: '0.3em' }}
        >
          <RotatingWords 
            words={rotatingWords} 
            interval={2500}
            style={{
              fontFamily: 'Fraunces',
              fontSize: isDesktop ? '24px' : '20px',
              fontWeight: 700,
              color: '#F7ECD5'
            }}
          />
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.9 + (wordsLine1.length + 1) * 0.15,
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          style={{ display: 'inline-block' }}
        >
          you?
        </motion.span>
      </p>
    </motion.div>
  );
}