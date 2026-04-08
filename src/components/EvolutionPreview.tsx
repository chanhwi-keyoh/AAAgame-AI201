import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useEvolutionState } from '../hooks/useEvolutionState';
import { CharacterDisplay } from './CharacterDisplay';
import { StatusPanel } from './StatusPanel';
import { EvolutionTree } from './EvolutionTree';
import { PathSelector } from './PathSelector';
import { PATHS } from '../data/paths';

export function EvolutionPreview() {
  const { activePath, lockedPath, currentPath, displayKey, evolveStage, canEvolve, selectPath, selectPathImmediate, lockPath, evolve } = useEvolutionState();

  // Preload all character images
  useEffect(() => {
    Object.values(PATHS).forEach((path) => {
      const img = new Image();
      img.src = path.image;
      path.stages?.forEach((stage) => {
        const stageImg = new Image();
        stageImg.src = stage.image;
      });
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
        <CharacterDisplay path={currentPath} displayKey={displayKey} />

        {/* Right: Evolution tree */}
        <div className="flex items-center">
          <EvolutionTree path={currentPath} evolveStage={evolveStage} canEvolve={canEvolve} onEvolve={evolve} />
        </div>
      </div>

      {/* Bottom: Path selector */}
      <PathSelector
        activePath={activePath}
        lockedPath={lockedPath}
        onHover={selectPath}
        onLeave={() => selectPathImmediate(lockedPath)}
        onClick={lockPath}
      />
    </div>
  );
}
