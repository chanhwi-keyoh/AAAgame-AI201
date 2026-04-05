export type PathId = 'human' | 'zombie' | 'tech' | 'beast' | 'evolution';

export interface PathStats {
  strength: number;
  agility: number;
  control: number;
  endurance: number;
  perception: number;
}

export interface EvolutionPath {
  id: PathId;
  label: string;
  tagline: string;
  image: string;
  stats: PathStats;
  colors: {
    bg: string;
    accent: string;
  };
  treeNodes: string[];
}
