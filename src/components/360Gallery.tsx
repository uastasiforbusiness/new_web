'use client';
import { useEffect, useState } from 'react';
import styles from './360Gallery.module.css';

type Props = {
  frames: string[];
  /** Duration each frame stays visible (ms) */
  durationMs?: number;
};

const TRANSITION_DURATION = 800; // must match CSS transition duration

export default function Gallery360({ frames, durationMs = 3000 }: Props) {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);
  const transitioning = next !== null;

  useEffect(() => {
    const timer = setInterval(() => {
      if (!transitioning) {
        setNext((current + 1) % frames.length);
      }
    }, durationMs);
    return () => clearInterval(timer);
  }, [frames.length, durationMs, current, transitioning]);

  // When next is set, wait for the CSS transition to finish, then update current
  useEffect(() => {
    if (next === null) return;
    const timeout = setTimeout(() => {
      setCurrent(next);
      setNext(null);
    }, TRANSITION_DURATION);
    return () => clearTimeout(timeout);
  }, [next]);

  return (
    <div className={styles.gallery}>
      <div className={styles.wrapper}>
        {/* Current frame — fades out when next appears */}
        <img
          src={frames[current]}
          alt={`frame ${current + 1}`}
          className={`${styles.image} ${next !== null ? styles.inactive : styles.active}`}
        />
        {/* Next frame — fades in */}
        {next !== null && (
          <img
            src={frames[next]}
            alt={`frame ${next + 1}`}
            className={`${styles.image} ${styles.active}`}
          />
        )}
      </div>
    </div>
  );
}
