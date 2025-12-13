import { useState, ReactNode, cloneElement, isValidElement } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface InteractiveSVGWrapperProps {
  children: ReactNode;
  className?: string;
}

const InteractiveSVGWrapper = ({ children, className = '' }: InteractiveSVGWrapperProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [key, setKey] = useState(0);

  const handleReset = () => {
    setKey(prev => prev + 1);
    setIsPaused(false);
  };

  // Clone the child and pass isPaused prop
  const childWithProps = isValidElement(children)
    ? cloneElement(children as React.ReactElement<{ isPaused?: boolean }>, { 
        isPaused,
        key 
      })
    : children;

  return (
    <div 
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SVG content with hover effect */}
      <div className={`
        transition-all duration-300 ease-out
        ${isHovered ? 'scale-[1.02]' : 'scale-100'}
      `}>
        {childWithProps}
      </div>

      {/* Control overlay */}
      <div className={`
        absolute bottom-2 right-2 flex items-center gap-1
        transition-all duration-300
        ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
      `}>
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-1.5 bg-background/80 backdrop-blur-sm border border-primary/30 rounded-md
                     hover:bg-primary/10 hover:border-primary/50 transition-all duration-200
                     text-primary"
          aria-label={isPaused ? 'Play animation' : 'Pause animation'}
        >
          {isPaused ? (
            <Play className="w-3 h-3" />
          ) : (
            <Pause className="w-3 h-3" />
          )}
        </button>
        <button
          onClick={handleReset}
          className="p-1.5 bg-background/80 backdrop-blur-sm border border-primary/30 rounded-md
                     hover:bg-primary/10 hover:border-primary/50 transition-all duration-200
                     text-primary"
          aria-label="Reset animation"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      {/* Interaction hint */}
      <div className={`
        absolute top-2 left-2 
        font-mono text-[8px] uppercase tracking-wider text-primary/60
        transition-all duration-300
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `}>
        Interactive
      </div>
    </div>
  );
};

export default InteractiveSVGWrapper;
