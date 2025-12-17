import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  variant?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale';
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.8,
  stagger = 0,
  className = '',
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const animations: Record<string, gsap.TweenVars> = {
      'fade-up': { y: 40, opacity: 0 },
      'fade-in': { opacity: 0 },
      'slide-left': { x: -60, opacity: 0 },
      'slide-right': { x: 60, opacity: 0 },
      'scale': { scale: 0.9, opacity: 0 },
    };

    const elements = stagger > 0
      ? ref.current.children
      : [ref.current];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        animations[variant],
        {
          y: 0,
          x: 0,
          scale: 1,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [variant, delay, duration, stagger, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
