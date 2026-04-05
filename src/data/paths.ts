import { EvolutionPath, PathId } from '../types';

export const PATHS: Record<PathId, EvolutionPath> = {
  human: {
    id: 'human',
    label: 'Human',
    tagline: 'The origin of all paths',
    image: '/images/human.png',
    stats: {
      strength: 50,
      agility: 50,
      control: 50,
      endurance: 50,
      perception: 50,
    },
    colors: {
      bg: '#0a0a0f',
      accent: '#888888',
    },
    treeNodes: ['Survivor', 'Adapted', 'Awakened'],
  },
  zombie: {
    id: 'zombie',
    label: 'Zombie',
    tagline: 'Embrace the infection',
    image: '/images/zombie.png',
    stats: {
      strength: 80,
      agility: 45,
      control: 20,
      endurance: 90,
      perception: 35,
    },
    colors: {
      bg: '#1a0505',
      accent: '#ff2d6a',
    },
    treeNodes: ['Infected', 'Turned', 'Apex Revenant'],
  },
  tech: {
    id: 'tech',
    label: 'Tech',
    tagline: 'Transcend through augmentation',
    image: '/images/tech.png',
    stats: {
      strength: 40,
      agility: 55,
      control: 95,
      endurance: 50,
      perception: 85,
    },
    colors: {
      bg: '#051a1a',
      accent: '#00d4ff',
    },
    treeNodes: ['Enhanced', 'Augmented', 'Singularity'],
  },
  beast: {
    id: 'beast',
    label: 'Beast',
    tagline: 'Unleash the primal mutation',
    image: '/images/beast.png',
    stats: {
      strength: 95,
      agility: 85,
      control: 25,
      endurance: 70,
      perception: 60,
    },
    colors: {
      bg: '#1a1205',
      accent: '#ffcc00',
    },
    treeNodes: ['Feral', 'Mutant', 'Alpha Predator'],
  },
  evolution: {
    id: 'evolution',
    label: 'Evolution',
    tagline: 'Awaken what lies within',
    image: '/images/human.png', // placeholder until Evolution image is provided
    stats: {
      strength: 60,
      agility: 60,
      control: 80,
      endurance: 60,
      perception: 90,
    },
    colors: {
      bg: '#0f0a1a',
      accent: '#b088ff',
    },
    treeNodes: ['Aware', 'Ascended', 'Transcendent'],
  },
};

export const SELECTABLE_PATHS: PathId[] = ['zombie', 'tech', 'beast', 'evolution'];
