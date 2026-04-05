import { EvolutionPath } from '../types';
import { StatBar } from './StatBar';

interface StatusPanelProps {
  path: EvolutionPath;
}

const STAT_LABELS: { key: keyof EvolutionPath['stats']; label: string }[] = [
  { key: 'strength', label: 'Strength' },
  { key: 'agility', label: 'Agility' },
  { key: 'control', label: 'Control' },
  { key: 'endurance', label: 'Endurance' },
  { key: 'perception', label: 'Perception' },
];

export function StatusPanel({ path }: StatusPanelProps) {
  return (
    <div className="flex flex-col gap-5 p-6">
      <h2
        className="text-sm uppercase tracking-[0.3em] font-medium"
        style={{ color: path.colors.accent }}
      >
        Status
      </h2>
      <div className="flex flex-col gap-4">
        {STAT_LABELS.map((stat, i) => (
          <StatBar
            key={stat.key}
            label={stat.label}
            value={path.stats[stat.key]}
            accent={path.colors.accent}
            delay={i * 0.05}
          />
        ))}
      </div>
    </div>
  );
}
