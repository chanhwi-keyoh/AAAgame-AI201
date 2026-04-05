import { motion } from 'framer-motion';

interface StatBarProps {
  label: string;
  value: number;
  accent: string;
  delay: number;
}

export function StatBar({ label, value, accent, delay }: StatBarProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs uppercase tracking-widest">
        <span className="text-gray-500">{label}</span>
        <span style={{ color: accent }}>{value}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: accent }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: 'easeOut', delay }}
        />
      </div>
    </div>
  );
}
