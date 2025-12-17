import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxLayerProps {
  speed?: number;
  className?: string;
  children: ReactNode;
  direction?: 'vertical' | 'horizontal';
}

export default function ParallaxLayer({
  speed = 0.5,
  className = '',
  children,
  direction = 'vertical',
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        [direction === 'vertical' ? 'y' : 'x']: () => `${speed * 100}%`,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [speed, direction]);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 pointer-events-none ${className}`}
    >
      {children}
    </div>
  );
}
