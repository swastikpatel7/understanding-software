import { ReactNode, useState, useCallback } from 'react';

interface MicroInteractionProps {
  children: ReactNode;
  variant?: 'lift' | 'scale' | 'glow' | 'border' | 'tilt';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function MicroInteraction({
  children,
  variant = 'lift',
  className = '',
  as: Component = 'div',
}: MicroInteractionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (variant !== 'tilt') return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
    });
  }, [variant]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    });
  }, []);

  const variantStyles: Record<string, React.CSSProperties> = {
    lift: {
      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      boxShadow: isHovered
        ? '0 4px 12px hsl(var(--primary) / 0.15)'
        : '0 0 0 transparent',
    },
    scale: {
      transform: isHovered ? 'scale(1.02)' : 'scale(1)',
    },
    glow: {
      boxShadow: isHovered
        ? '0 0 20px hsl(var(--primary) / 0.3)'
        : '0 0 0 transparent',
    },
    border: {
      borderColor: isHovered
        ? 'hsl(var(--primary))'
        : 'hsl(var(--border))',
    },
    tilt: tiltStyle,
  };

  const style: React.CSSProperties = {
    ...variantStyles[variant],
    transition: variant === 'tilt'
      ? 'transform 0.1s ease-out'
      : 'all 0.2s ease-out',
  };

  return (
    <Component
      className={className}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {children}
    </Component>
  );
}
