import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useEvolutionState } from '../hooks/useEvolutionState';
import { CharacterDisplay } from './CharacterDisplay';
import { StatusPanel } from './StatusPanel';
import { EvolutionTree } from './EvolutionTree';
import { PathSelector } from './PathSelector';
import { PATHS } from '../data/paths';

export function EvolutionPreview() {
  const { activePath, currentPath, selectPath, selectPathImmediate } = useEvolutionState();

  // Preload all character images
  useEffect(() => {
    Object.values(PATHS).forEach((path) => {
      const img = new Image();
      img.src = path.image;
    });
  }, []);

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: `radial-gradient(ellipse at center 40%, ${currentPath.colors.bg} 0%, #0a0a0f 100%)`,
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* Main content grid */}
      <div className="flex-1 grid grid-cols-[240px_1fr_240px] min-h-0">
        {/* Left: Status panel */}
        <div className="flex items-center">
          <StatusPanel path={currentPath} />
        </div>

        {/* Center: Character */}
        <CharacterDisplay path={currentPath} />

        {/* Right: Evolution tree */}
        <div className="flex items-center">
          <EvolutionTree path={currentPath} />
        </div>
      </div>

      {/* Bottom: Path selector */}
      <PathSelector
        activePath={activePath}
        onHover={selectPath}
        onLeave={() => selectPathImmediate('human')}
      />
    </div>
  );
}
