import { motion } from 'framer-motion';
import type { EvolutionPath } from '../types';

interface EvolutionTreeProps {
  path: EvolutionPath;
  evolveStage: number;
  canEvolve: boolean;
  onEvolve: () => void;
}

export function EvolutionTree({ path, evolveStage, canEvolve, onEvolve }: EvolutionTreeProps) {
  const accent = path.colors.accent;
  const stages = path.stages;
  const activeUpTo = stages ? stages[evolveStage].treeUpTo : path.treeNodes.length - 1;

  return (
    <div className="flex flex-col items-center gap-0 p-6 h-full justify-center">
      <h2
        className="text-sm uppercase tracking-[0.3em] font-medium mb-8 self-start"
        style={{ color: accent }}
      >
        Evolution
      </h2>

      <div className="flex flex-col items-center gap-0">
        {/* Origin node */}
        <TreeNode
          label="Human"
          accent="#888888"
          delay={0}
          isOrigin
        />
        <ConnectorLine accent={accent} delay={0.1} />

        {/* Evolution stages */}
        {path.treeNodes.map((label, i) => {
          const isReached = i <= activeUpTo;
          const isCurrent = i === activeUpTo;
          const nodeAccent = isReached ? accent : '#444444';

          return (
            <div key={label} className="flex flex-col items-center">
              {i > 0 && <ConnectorLine accent={nodeAccent} delay={0.1 + i * 0.1} />}
              <TreeNode
                label={label}
                accent={nodeAccent}
                delay={0.15 + i * 0.1}
                isFinal={isCurrent}
                dimmed={!isReached}
              />
            </div>
          );
        })}
      </div>

      {/* Evolve button */}
      {canEvolve && (
        <motion.button
          className="mt-8 px-5 py-2 rounded-lg text-sm uppercase tracking-[0.15em] font-medium cursor-pointer
                     border transition-colors"
          style={{
            borderColor: accent,
            color: accent,
            backgroundColor: accent + '10',
          }}
          whileHover={{ scale: 1.05, backgroundColor: accent + '20' }}
          whileTap={{ scale: 0.97 }}
          onClick={onEvolve}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          Evolve
        </motion.button>
      )}
    </div>
  );
}

function TreeNode({
  label,
  accent,
  delay,
  isOrigin,
  isFinal,
  dimmed,
}: {
  label: string;
  accent: string;
  delay: number;
  isOrigin?: boolean;
  isFinal?: boolean;
  dimmed?: boolean;
}) {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: dimmed ? 0.35 : 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut', delay }}
    >
      <motion.div
        className="w-3 h-3 rounded-full border-2 shrink-0"
        style={{
          borderColor: accent,
          backgroundColor: isFinal || isOrigin ? accent : 'transparent',
        }}
        animate={
          isFinal
            ? {
                boxShadow: [
                  `0 0 4px ${accent}40`,
                  `0 0 12px ${accent}60`,
                  `0 0 4px ${accent}40`,
                ],
              }
            : {}
        }
        transition={
          isFinal
            ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            : {}
        }
      />
      <span
        className={`text-sm uppercase tracking-widest ${
          isFinal ? 'font-semibold' : isOrigin ? 'text-gray-500' : 'text-gray-400'
        }`}
        style={isFinal ? { color: accent } : undefined}
      >
        {label}
      </span>
    </motion.div>
  );
}

function ConnectorLine({ accent, delay }: { accent: string; delay: number }) {
  return (
    <motion.div
      className="w-0.5 h-6"
      style={{ backgroundColor: accent + '40' }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut', delay }}
    />
  );
}
