import { motion } from 'framer-motion';
import type { PathId } from '../types';
import { PATHS, SELECTABLE_PATHS } from '../data/paths';

interface PathSelectorProps {
  activePath: PathId;
  lockedPath: PathId;
  onHover: (id: PathId) => void;
  onLeave: () => void;
  onClick: (id: PathId) => void;
}

export function PathSelector({ activePath, lockedPath, onHover, onLeave, onClick }: PathSelectorProps) {
  return (
    <div className="flex justify-center gap-6 py-6 px-4">
      {SELECTABLE_PATHS.map((id) => {
        const path = PATHS[id];
        const isActive = activePath === id;
        const isLocked = lockedPath === id;

        return (
          <motion.button
            key={id}
            className={`relative flex flex-col items-center gap-2 px-6 py-3 rounded-lg cursor-pointer
                       bg-white/[0.03] border transition-colors ${
                         isLocked ? 'border-current' : 'border-white/[0.06]'
                       }`}
            style={isLocked ? { borderColor: path.colors.accent } : undefined}
            onMouseEnter={() => onHover(id)}
            onMouseLeave={onLeave}
            onClick={() => onClick(id)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span
              className="text-sm uppercase tracking-[0.2em] font-medium"
              style={{ color: isActive ? path.colors.accent : '#666' }}
            >
              {path.label}
            </span>

            {/* Active indicator */}
            <motion.div
              className="absolute -bottom-px left-1/4 right-1/4 h-0.5 rounded-full"
              style={{ backgroundColor: path.colors.accent }}
              initial={false}
              animate={{ opacity: isActive ? 1 : 0, scaleX: isActive ? 1 : 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />

            {/* Glow effect */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  boxShadow: `0 0 20px ${path.colors.accent}20, inset 0 0 20px ${path.colors.accent}08`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
