import { useEffect, useState } from 'react';

interface NeuralNetworkSVGProps {
  isPaused?: boolean;
}

const NeuralNetworkSVG = ({ isPaused = false }: NeuralNetworkSVGProps) => {
  const [activeConnections, setActiveConnections] = useState<number[]>([]);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      const newActive = Array.from({ length: 3 }, () => Math.floor(Math.random() * 24));
      setActiveConnections(newActive);
    }, 1500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const inputNodes = [
    { x: 80, y: 60 },
    { x: 80, y: 140 },
    { x: 80, y: 220 },
    { x: 80, y: 300 },
  ];

  const hiddenNodes = [
    { x: 220, y: 100 },
    { x: 220, y: 180 },
    { x: 220, y: 260 },
  ];

  const outputNodes = [
    { x: 360, y: 140 },
    { x: 360, y: 220 },
  ];

  let connectionIndex = 0;
  const connections: JSX.Element[] = [];

  // Input to hidden
  inputNodes.forEach((input, i) => {
    hiddenNodes.forEach((hidden, j) => {
      const isActive = activeConnections.includes(connectionIndex);
      connections.push(
        <line
          key={`i-h-${i}-${j}`}
          x1={input.x}
          y1={input.y}
          x2={hidden.x}
          y2={hidden.y}
          className={`stroke-primary transition-all duration-500 ${isActive ? 'stroke-[3] opacity-100' : 'stroke-[1] opacity-30'}`}
        />
      );
      connectionIndex++;
    });
  });

  // Hidden to output
  hiddenNodes.forEach((hidden, i) => {
    outputNodes.forEach((output, j) => {
      const isActive = activeConnections.includes(connectionIndex);
      connections.push(
        <line
          key={`h-o-${i}-${j}`}
          x1={hidden.x}
          y1={hidden.y}
          x2={output.x}
          y2={output.y}
          className={`stroke-primary transition-all duration-500 ${isActive ? 'stroke-[3] opacity-100' : 'stroke-[1] opacity-30'}`}
        />
      );
      connectionIndex++;
    });
  });

  return (
    <div className="relative">
      <span className="figure-label absolute -left-6 top-1/2 -translate-y-1/2">FIG.001</span>
      <svg 
        viewBox="0 0 440 360" 
        className="w-full max-w-md"
      >
        {/* Connections */}
        {connections}

        {/* Input layer */}
        {inputNodes.map((node, i) => (
          <g key={`input-${i}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r="20"
              className="fill-background stroke-primary stroke-2"
            />
            <text
              x={node.x}
              y={node.y + 4}
              textAnchor="middle"
              className="fill-primary font-mono text-xs"
            >
              x{i + 1}
            </text>
          </g>
        ))}

        {/* Hidden layer */}
        {hiddenNodes.map((node, i) => (
          <g key={`hidden-${i}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r="24"
              className="fill-secondary stroke-primary stroke-2 animate-pulse-subtle"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
            <text
              x={node.x}
              y={node.y + 4}
              textAnchor="middle"
              className="fill-primary font-mono text-xs"
            >
              h{i + 1}
            </text>
          </g>
        ))}

        {/* Output layer */}
        {outputNodes.map((node, i) => (
          <g key={`output-${i}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r="20"
              className="fill-background stroke-primary stroke-2"
            />
            <text
              x={node.x}
              y={node.y + 4}
              textAnchor="middle"
              className="fill-primary font-mono text-xs"
            >
              y{i + 1}
            </text>
          </g>
        ))}

        {/* Labels */}
        <text x="80" y="340" textAnchor="middle" className="fill-primary font-mono text-[10px] uppercase">
          Input Layer
        </text>
        <text x="220" y="340" textAnchor="middle" className="fill-primary font-mono text-[10px] uppercase">
          Hidden Layer
        </text>
        <text x="360" y="340" textAnchor="middle" className="fill-primary font-mono text-[10px] uppercase">
          Output Layer
        </text>
      </svg>
    </div>
  );
};

export default NeuralNetworkSVG;
