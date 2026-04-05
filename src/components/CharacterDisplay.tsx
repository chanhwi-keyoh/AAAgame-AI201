import { AnimatePresence, motion } from 'framer-motion';
import { EvolutionPath } from '../types';

interface CharacterDisplayProps {
  path: EvolutionPath;
}

export function CharacterDisplay({ path }: CharacterDisplayProps) {
  return (
    <div className="relative flex items-center justify-center h-full w-full overflow-hidden">
      {/* Radial accent glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse at center 60%, ${path.colors.accent}15 0%, transparent 60%)`,
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* Character image */}
      <AnimatePresence mode="popLayout">
        <motion.img
          key={path.id}
          src={path.image}
          alt={path.label}
          className="absolute max-h-[70vh] max-w-full object-contain drop-shadow-lg"
          style={{
            filter: `drop-shadow(0 0 40px ${path.colors.accent}40)`,
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Tagline */}
      <AnimatePresence mode="wait">
        <motion.p
          key={path.id + '-tagline'}
          className="absolute bottom-8 text-lg italic tracking-wide"
          style={{ color: path.colors.accent + '99' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {path.tagline}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
