import type { EvolutionPath, PathId } from '../types';

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
    treeNodes: ['Infected', 'Turned', 'Undying', 'Apex Revenant'],
    stages: [
      {
        image: '/images/zombie.png',
        tagline: 'Embrace the infection',
        stats: { strength: 80, agility: 45, control: 20, endurance: 90, perception: 35 },
        treeUpTo: 1,
      },
      {
        image: '/images/zombie2.png',
        tagline: 'Death is only the beginning',
        stats: { strength: 95, agility: 50, control: 15, endurance: 100, perception: 40 },
        treeUpTo: 3,
      },
    ],
  },
  tech: {
    id: 'tech',
    label: 'Tech',
    tagline: 'Transcend through augmentation',
    image: '/images/tech1.png',
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
    treeNodes: ['Enhanced', 'Augmented', 'Cybernetic', 'Singularity'],
    stages: [
      {
        image: '/images/tech1.png',
        tagline: 'Transcend through augmentation',
        stats: { strength: 40, agility: 55, control: 95, endurance: 50, perception: 85 },
        treeUpTo: 1,
      },
      {
        image: '/images/tech2.png',
        tagline: 'Beyond machine, beyond human',
        stats: { strength: 50, agility: 65, control: 100, endurance: 60, perception: 95 },
        treeUpTo: 3,
      },
    ],
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
    treeNodes: ['Feral', 'Mutant', 'Apex', 'Alpha Predator'],
    stages: [
      {
        image: '/images/beast.png',
        tagline: 'Unleash the primal mutation',
        stats: { strength: 95, agility: 85, control: 25, endurance: 70, perception: 60 },
        treeUpTo: 1,
      },
      {
        image: '/images/beast2.png',
        tagline: 'The apex of all predators',
        stats: { strength: 100, agility: 95, control: 20, endurance: 85, perception: 75 },
        treeUpTo: 3,
      },
    ],
  },
  evolution: {
    id: 'evolution',
    label: 'Evolution',
    tagline: 'Awaken what lies within',
    image: '/images/evolution.png',
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
    treeNodes: ['Aware', 'Ascended', 'Enlightened', 'Transcendent'],
    stages: [
      {
        image: '/images/evolution.png',
        tagline: 'Awaken what lies within',
        stats: { strength: 60, agility: 60, control: 80, endurance: 60, perception: 90 },
        treeUpTo: 1,
      },
      {
        image: '/images/evolution2.png',
        tagline: 'Beyond the limits of humanity',
        stats: { strength: 75, agility: 75, control: 95, endurance: 75, perception: 100 },
        treeUpTo: 3,
      },
    ],
  },
};

export const SELECTABLE_PATHS: PathId[] = ['zombie', 'tech', 'beast', 'evolution'];
