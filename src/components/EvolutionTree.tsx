import { motion } from 'framer-motion';
import { EvolutionPath } from '../types';

interface EvolutionTreeProps {
  path: EvolutionPath;
}

export function EvolutionTree({ path }: EvolutionTreeProps) {
  const accent = path.colors.accent;

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
        {path.treeNodes.map((label, i) => (
          <div key={label} className="flex flex-col items-center">
            {i > 0 && <ConnectorLine accent={accent} delay={0.1 + i * 0.1} />}
            <TreeNode
              label={label}
              accent={accent}
              delay={0.15 + i * 0.1}
              isFinal={i === path.treeNodes.length - 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function TreeNode({
  label,
  accent,
  delay,
  isOrigin,
  isFinal,
}: {
  label: string;
  accent: string;
  delay: number;
  isOrigin?: boolean;
  isFinal?: boolean;
}) {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
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
