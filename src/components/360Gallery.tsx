'use client';
import { useEffect, useState } from 'react';
import styles from './360Gallery.module.css';

type Props = {
  frames: string[];
  /** Duration each frame stays visible (ms) */
  durationMs?: number;
};

export default function 360Gallery({ frames, durationMs = 3000 }: Props) {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => {
        const nxt = (prev + 1) % frames.length;
        setNext(nxt);
        return nxt;
      });
    }, durationMs);
    return () => clearInterval(timer);
  }, [frames, durationMs]);

  return (
    <div className={styles.gallery}>
      <div className={styles.wrapper}>
        {/* Current frame */}
        <img
          src={frames[current]}
          alt={`frame ${current + 1}`}
          className={`${styles.image} ${current === next ? styles.active : styles.inactive}`}
        />
        {/* Next frame (hidden until transition) */}
        {current !== next && (
          <img
            src={frames[next]}
            alt={`frame ${next + 1}`}
            className={`${styles.image} ${current === next ? styles.active : styles.inactive}`}
          />
        )}
      </div>
    </div>
  );
}