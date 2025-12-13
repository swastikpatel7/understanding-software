import { useEffect, useState } from 'react';

interface BinaryTreeSVGProps {
  isPaused?: boolean;
}

const BinaryTreeSVG = ({ isPaused = false }: BinaryTreeSVGProps) => {
  const [highlightedPath, setHighlightedPath] = useState<number[]>([0]);

  useEffect(() => {
    if (isPaused) return;
    
    const paths = [
      [0, 1, 3],
      [0, 1, 4],
      [0, 2, 5],
      [0, 2, 6],
    ];
    let pathIndex = 0;

    const interval = setInterval(() => {
      setHighlightedPath(paths[pathIndex]);
      pathIndex = (pathIndex + 1) % paths.length;
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const nodes = [
    { id: 0, x: 200, y: 40, value: '50' },
    { id: 1, x: 100, y: 120, value: '25' },
    { id: 2, x: 300, y: 120, value: '75' },
    { id: 3, x: 50, y: 200, value: '10' },
    { id: 4, x: 150, y: 200, value: '35' },
    { id: 5, x: 250, y: 200, value: '60' },
    { id: 6, x: 350, y: 200, value: '90' },
  ];

  const edges = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 2, to: 5 },
    { from: 2, to: 6 },
  ];

  const isNodeHighlighted = (id: number) => highlightedPath.includes(id);
  const isEdgeHighlighted = (from: number, to: number) => {
    const fromIndex = highlightedPath.indexOf(from);
    const toIndex = highlightedPath.indexOf(to);
    return fromIndex !== -1 && toIndex !== -1 && Math.abs(fromIndex - toIndex) === 1;
  };

  return (
    <div className="relative">
      <span className="figure-label absolute -left-6 top-1/2 -translate-y-1/2">FIG.002</span>
      <svg viewBox="0 0 400 280" className="w-full max-w-md">
        {/* Edges */}
        {edges.map(({ from, to }) => {
          const fromNode = nodes.find(n => n.id === from)!;
          const toNode = nodes.find(n => n.id === to)!;
          const highlighted = isEdgeHighlighted(from, to);
          
          return (
            <line
              key={`${from}-${to}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              className={`transition-all duration-300 ${
                highlighted 
                  ? 'stroke-primary stroke-[3]' 
                  : 'stroke-primary/40 stroke-[1.5]'
              }`}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const highlighted = isNodeHighlighted(node.id);
          
          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="24"
                className={`transition-all duration-300 stroke-2 ${
                  highlighted 
                    ? 'fill-primary stroke-primary' 
                    : 'fill-background stroke-primary'
                }`}
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                className={`font-mono text-sm transition-all duration-300 ${
                  highlighted ? 'fill-primary-foreground' : 'fill-primary'
                }`}
              >
                {node.value}
              </text>
            </g>
          );
        })}

        {/* Annotations */}
        <g className="font-mono text-[9px] fill-primary uppercase">
          <text x="200" y="275">Binary Search Tree</text>
        </g>

        {/* Arrow annotations */}
        <g className="stroke-primary/60 stroke-[1]">
          <path d="M 30 40 L 50 40" markerEnd="url(#arrowhead)" />
          <text x="10" y="44" className="fill-primary font-mono text-[8px]">ROOT</text>
        </g>
      </svg>
    </div>
  );
};

export default BinaryTreeSVG;
