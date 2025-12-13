import { useEffect, useState } from 'react';

const DatabaseSVG = () => {
  const [activeRow, setActiveRow] = useState(0);
  const [queryActive, setQueryActive] = useState(false);

  useEffect(() => {
    const rowInterval = setInterval(() => {
      setActiveRow(prev => (prev + 1) % 4);
    }, 1200);

    const queryInterval = setInterval(() => {
      setQueryActive(true);
      setTimeout(() => setQueryActive(false), 600);
    }, 2400);

    return () => {
      clearInterval(rowInterval);
      clearInterval(queryInterval);
    };
  }, []);

  return (
    <svg
      viewBox="0 0 280 200"
      className="w-full max-w-xs mx-auto"
      style={{ filter: 'drop-shadow(0 4px 6px rgba(79, 70, 229, 0.1))' }}
    >
      {/* Database cylinder */}
      <ellipse cx="140" cy="40" rx="60" ry="15" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <path d="M80 40 L80 140 Q80 155 140 155 Q200 155 200 140 L200 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <ellipse cx="140" cy="140" rx="60" ry="15" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      
      {/* Internal partition lines */}
      <ellipse cx="140" cy="70" rx="60" ry="12" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.4" />
      <ellipse cx="140" cy="100" rx="60" ry="12" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.4" />

      {/* Data rows representation */}
      {[0, 1, 2, 3].map((row) => (
        <g key={row}>
          <rect
            x="95"
            y={50 + row * 22}
            width="90"
            height="16"
            rx="2"
            fill={activeRow === row ? 'hsl(var(--primary))' : 'none'}
            fillOpacity={activeRow === row ? 0.2 : 0}
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            opacity={activeRow === row ? 1 : 0.3}
            className="transition-all duration-300"
          />
          {/* Row cells */}
          <line x1="120" y1={50 + row * 22} x2="120" y2={66 + row * 22} stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3" />
          <line x1="155" y1={50 + row * 22} x2="155" y2={66 + row * 22} stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3" />
        </g>
      ))}

      {/* Query arrow */}
      <g className={`transition-all duration-300 ${queryActive ? 'opacity-100' : 'opacity-0'}`}>
        <path
          d="M40 90 L75 90"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="2"
          markerEnd="url(#queryArrow)"
        />
        <text x="20" y="75" fontSize="8" fill="hsl(var(--primary))" fontFamily="monospace">SELECT</text>
      </g>

      {/* Result arrow */}
      <g className={`transition-all duration-500 ${queryActive ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '200ms' }}>
        <path
          d="M205 90 L240 90"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="2"
          markerEnd="url(#resultArrow)"
        />
        <text x="245" y="93" fontSize="8" fill="hsl(var(--primary))" fontFamily="monospace">{`{ }`}</text>
      </g>

      {/* Labels */}
      <text x="140" y="175" textAnchor="middle" fontSize="9" fill="hsl(var(--primary))" fontFamily="monospace" opacity="0.7">
        RELATIONAL DATABASE
      </text>

      <defs>
        <marker id="queryArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="hsl(var(--accent))" />
        </marker>
        <marker id="resultArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="hsl(var(--accent))" />
        </marker>
      </defs>
    </svg>
  );
};

export default DatabaseSVG;
