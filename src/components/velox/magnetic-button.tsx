'use client';

import { useCallback, useRef } from 'react';
import gsap from 'gsap';

export function MagneticButton({
  children,
  className = '',
  href,
  strength = 0.3,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  strength?: number;
  style?: React.CSSProperties;
}) {
  const btnRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btnRef.current, {
      x: x * strength, y: y * strength,
      duration: 0.4, ease: 'power2.out',
    });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0, y: 0,
      duration: 0.6, ease: 'elastic.out(1, 0.4)',
    });
  }, []);

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      ref={btnRef as React.Ref<HTMLAnchorElement & HTMLButtonElement>}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`cursor-hover inline-flex items-center ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
