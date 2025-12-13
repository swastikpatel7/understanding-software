import { useEffect, useState } from 'react';

const SortingAlgorithmSVG = () => {
  const [step, setStep] = useState(0);
  const [comparing, setComparing] = useState<[number, number] | null>(null);

  const initialBars = [65, 35, 85, 45, 95, 25, 55];
  const sortingSteps = [
    [65, 35, 85, 45, 95, 25, 55],
    [35, 65, 85, 45, 95, 25, 55],
    [35, 65, 45, 85, 95, 25, 55],
    [35, 45, 65, 85, 95, 25, 55],
    [35, 45, 65, 85, 25, 95, 55],
    [25, 35, 45, 65, 85, 55, 95],
    [25, 35, 45, 55, 65, 85, 95],
  ];

  const comparisons: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 6]
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % sortingSteps.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setComparing(comparisons[step]);
    const timeout = setTimeout(() => setComparing(null), 700);
    return () => clearTimeout(timeout);
  }, [step]);

  const currentBars = sortingSteps[step];
  const barWidth = 25;
  const gap = 8;
  const startX = 50;

  return (
    <svg
      viewBox="0 0 280 180"
      className="w-full max-w-xs mx-auto"
      style={{ filter: 'drop-shadow(0 4px 6px rgba(79, 70, 229, 0.1))' }}
    >
      {/* Base line */}
      <line x1="40" y1="140" x2="240" y2="140" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />

      {/* Bars */}
      {currentBars.map((height, index) => {
        const isComparing = comparing && (comparing[0] === index || comparing[1] === index);
        const isSorted = step === sortingSteps.length - 1;

        return (
          <g key={index}>
            <rect
              x={startX + index * (barWidth + gap)}
              y={140 - height}
              width={barWidth}
              height={height}
              fill={isSorted ? 'hsl(var(--accent))' : isComparing ? 'hsl(var(--primary))' : 'none'}
              fillOpacity={isSorted ? 0.3 : isComparing ? 0.2 : 0}
              stroke={isSorted ? 'hsl(var(--accent))' : 'hsl(var(--primary))'}
              strokeWidth="1.5"
              rx="2"
              className="transition-all duration-500"
            />
            {/* Value label */}
            <text
              x={startX + index * (barWidth + gap) + barWidth / 2}
              y={135 - height}
              textAnchor="middle"
              fontSize="8"
              fill="hsl(var(--primary))"
              fontFamily="monospace"
              opacity="0.7"
            >
              {height}
            </text>
          </g>
        );
      })}

      {/* Comparison arrows */}
      {comparing && comparing[0] !== comparing[1] && (
        <g className="animate-pulse">
          <path
            d={`M${startX + comparing[0] * (barWidth + gap) + barWidth / 2} 150 
                Q${startX + (comparing[0] + comparing[1]) / 2 * (barWidth + gap) + barWidth / 2} 165 
                ${startX + comparing[1] * (barWidth + gap) + barWidth / 2} 150`}
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <text
            x={startX + (comparing[0] + comparing[1]) / 2 * (barWidth + gap) + barWidth / 2}
            y="175"
            textAnchor="middle"
            fontSize="8"
            fill="hsl(var(--accent))"
            fontFamily="monospace"
          >
            compare & swap
          </text>
        </g>
      )}

      {/* Title */}
      <text x="140" y="20" textAnchor="middle" fontSize="9" fill="hsl(var(--primary))" fontFamily="monospace" opacity="0.7">
        BUBBLE SORT
      </text>

      {/* Step indicator */}
      <text x="140" y="35" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
        Step {step + 1} / {sortingSteps.length}
      </text>
    </svg>
  );
};

export default SortingAlgorithmSVG;
