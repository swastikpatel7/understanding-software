import { useEffect, useState } from 'react';

const LayeredStackSVG = () => {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  const [floatOffset, setFloatOffset] = useState(0);

  useEffect(() => {
    let frame: number;
    let time = 0;
    
    const animate = () => {
      time += 0.02;
      setFloatOffset(Math.sin(time) * 3);
      frame = requestAnimationFrame(animate);
    };
    
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const layers = [
    { name: 'UI LAYER', color: 'fill-background', y: 0 },
    { name: 'LOGIC LAYER', color: 'fill-secondary', y: 45 },
    { name: 'DATA LAYER', color: 'fill-secondary', y: 90 },
    { name: 'NETWORK', color: 'fill-background', y: 135 },
  ];

  return (
    <div className="relative">
      <span className="figure-label absolute -left-6 top-1/2 -translate-y-1/2">FIG.004</span>
      <svg viewBox="0 0 350 260" className="w-full max-w-sm">
        {/* Isometric grid lines (background) */}
        <g className="stroke-primary/10 stroke-[0.5]">
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`h-${i}`} x1="50" y1={40 + i * 20} x2="300" y2={40 + i * 20} />
          ))}
        </g>

        {/* Stacked layers with isometric effect */}
        {layers.map((layer, index) => {
          const isHovered = hoveredLayer === index;
          const baseY = 60 + layer.y;
          const offset = floatOffset * (0.5 + index * 0.2);
          
          return (
            <g 
              key={layer.name}
              onMouseEnter={() => setHoveredLayer(index)}
              onMouseLeave={() => setHoveredLayer(null)}
              style={{ 
                transform: `translateY(${offset}px)`,
                transition: 'transform 0.3s ease-out'
              }}
              className="cursor-pointer"
            >
              {/* Side face (left) */}
              <path
                d={`M 80 ${baseY + 35} L 80 ${baseY + 15} L 175 ${baseY - 10} L 175 ${baseY + 10} Z`}
                className={`${layer.color} stroke-primary stroke-[1.5] transition-all duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-70'
                }`}
              />
              {/* Side face (right) */}
              <path
                d={`M 175 ${baseY + 10} L 175 ${baseY - 10} L 270 ${baseY + 15} L 270 ${baseY + 35} Z`}
                className={`${layer.color} stroke-primary stroke-[1.5] transition-all duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-70'
                }`}
              />
              {/* Top face */}
              <path
                d={`M 80 ${baseY + 15} L 175 ${baseY - 10} L 270 ${baseY + 15} L 175 ${baseY + 40} Z`}
                className={`${isHovered ? 'fill-primary/20' : layer.color} stroke-primary stroke-2 transition-all duration-300`}
              />
              {/* Label */}
              <text
                x="175"
                y={baseY + 18}
                textAnchor="middle"
                className="fill-primary font-mono text-[9px] uppercase pointer-events-none"
              >
                {layer.name}
              </text>
            </g>
          );
        })}

        {/* Annotation arrows */}
        <g className="stroke-primary/60 stroke-[1]">
          <path d="M 290 75 L 320 75" />
          <text x="325" y="78" className="fill-primary font-mono text-[8px]">FRONTEND</text>
          
          <path d="M 290 165 L 320 165" />
          <text x="325" y="168" className="fill-primary font-mono text-[8px]">BACKEND</text>
        </g>

        {/* Title */}
        <text x="175" y="245" textAnchor="middle" className="fill-primary font-mono text-[10px] uppercase">
          Application Architecture
        </text>
      </svg>
    </div>
  );
};

export default LayeredStackSVG;
