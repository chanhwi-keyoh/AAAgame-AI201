import { useState, useCallback, useRef } from 'react';
import type { PathId } from '../types';
import { PATHS } from '../data/paths';

const DEBOUNCE_MS = 60;

const EVOLUTION_SOUNDS: Record<string, string> = {
  'human-to-zombie': '/sounds/human-to-zombie.mp3',
  'human-to-tech': '/sounds/human-to-tech.mp3',
  'human-to-beast': '/sounds/human-to-beast.mp3',
  'human-to-evolution': '/sounds/human-to-evolution.mp3',
  'zombie-to-human': '/sounds/zombie-to-human.mp3',
  'tech-to-human': '/sounds/tech-to-human.mp3',
  'beast-to-human': '/sounds/beast-to-human.mp3',
  'evolution-to-human': '/sounds/evolution-to-human.mp3',
};

let currentAudio: HTMLAudioElement | null = null;
let transitionTimer: ReturnType<typeof setTimeout> | null = null;

function stopCurrentSound() {
  if (transitionTimer) {
    clearTimeout(transitionTimer);
    transitionTimer = null;
  }
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

function playSoundFile(src: string): HTMLAudioElement {
  const audio = new Audio(src);
  currentAudio = audio;
  audio.play();
  return audio;
}

function getSoundSrc(from: PathId, to: PathId): string | undefined {
  return EVOLUTION_SOUNDS[`${from}-to-${to}`];
}

export function useEvolutionState() {
  const [activePath, setActivePath] = useState<PathId>('human');
  const [lockedPath, setLockedPath] = useState<PathId>('human');
  const [evolveStage, setEvolveStage] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRef = useRef<PathId>('human');

  // Transition through human: from → human (with sound + visual), then human → to
  const transitionViaHuman = useCallback((from: PathId, to: PathId, lock: boolean) => {
    stopCurrentSound();
    setTransitioning(true);

    // Step 1: go back to human
    const returnSrc = getSoundSrc(from, 'human');
    activeRef.current = 'human';
    setActivePath('human');

    const goToTarget = () => {
      // Step 2: go to target
      const forwardSrc = getSoundSrc('human', to);
      if (forwardSrc) {
        playSoundFile(forwardSrc);
      }
      activeRef.current = to;
      setActivePath(to);
      if (lock) {
        setLockedPath(to);
      }
      setTransitioning(false);
    };

    if (returnSrc) {
      const audio = playSoundFile(returnSrc);
      audio.onended = goToTarget;
      // Fallback in case onended doesn't fire
      transitionTimer = setTimeout(goToTarget, 2500);
    } else {
      goToTarget();
    }
  }, []);

  const selectPath = useCallback((id: PathId) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      if (activeRef.current === id) return;

      const from = activeRef.current;
      // Direct transition if going from/to human
      if (from === 'human' || id === 'human') {
        stopCurrentSound();
        const src = getSoundSrc(from, id);
        if (src) playSoundFile(src);
        activeRef.current = id;
        setActivePath(id);
      } else {
        // Non-human to non-human: go through human
        transitionViaHuman(from, id, false);
      }
    }, DEBOUNCE_MS);
  }, [transitionViaHuman]);

  const selectPathImmediate = useCallback((id: PathId) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    if (activeRef.current === id) return;

    const from = activeRef.current;
    if (from === 'human' || id === 'human') {
      stopCurrentSound();
      const src = getSoundSrc(from, id);
      if (src) playSoundFile(src);
      activeRef.current = id;
      setActivePath(id);
    } else {
      transitionViaHuman(from, id, false);
    }
  }, [transitionViaHuman]);

  const lockPath = useCallback((id: PathId) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    if (id === lockedPath) {
      // Deselect: go back to human
      stopCurrentSound();
      const src = getSoundSrc(id, 'human');
      if (src) playSoundFile(src);
      activeRef.current = 'human';
      setLockedPath('human');
      setActivePath('human');
      setEvolveStage(0);
    } else {
      // Lock this path (hover already moved us here, just lock it)
      setLockedPath(id);
      setEvolveStage(0);
      // Ensure active state matches in case hover hasn't caught up
      if (activeRef.current !== id) {
        stopCurrentSound();
        const src = getSoundSrc(activeRef.current, id);
        if (src) playSoundFile(src);
        activeRef.current = id;
        setActivePath(id);
      }
    }
  }, [lockedPath]);

  const basePath = PATHS[activePath];
  const stageData = basePath.stages?.[evolveStage];
  const currentPath = stageData
    ? { ...basePath, image: stageData.image, tagline: stageData.tagline, stats: stageData.stats }
    : basePath;
  const displayKey = `${activePath}-${evolveStage}`;

  const evolve = useCallback(() => {
    const path = PATHS[activePath];
    if (path.stages && evolveStage < path.stages.length - 1) {
      stopCurrentSound();
      const src = getSoundSrc('human', activePath);
      if (src) playSoundFile(src);
      setEvolveStage(evolveStage + 1);
    }
  }, [activePath, evolveStage]);

  const canEvolve = basePath.stages ? evolveStage < basePath.stages.length - 1 : false;

  return { activePath, lockedPath, currentPath, displayKey, evolveStage, canEvolve, selectPath, selectPathImmediate, lockPath, evolve };
}
