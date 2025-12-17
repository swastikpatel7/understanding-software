import { useState, useEffect } from 'react';

interface NetworkPacketSVGProps {
  isPaused?: boolean;
}

const NetworkPacketSVG = ({ isPaused = false }: NetworkPacketSVGProps) => {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  const [transmitPhase, setTransmitPhase] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setTransmitPhase(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, [isPaused]);

  const layers = [
    { name: 'APPLICATION', protocol: 'HTTP/HTTPS', color: 'hsl(var(--accent))', bytes: '~2KB' },
    { name: 'TRANSPORT', protocol: 'TCP/UDP', color: 'hsl(var(--primary))', bytes: '20B' },
    { name: 'NETWORK', protocol: 'IP', color: 'hsl(var(--primary))', bytes: '20B' },
    { name: 'DATA LINK', protocol: 'ETHERNET', color: 'hsl(var(--primary))', bytes: '18B' },
  ];

  const layerHeight = 35;
  const startY = 70;

  return (
    <svg
      viewBox="0 0 400 340"
      className="w-full max-w-md mx-auto"
      style={{ filter: 'drop-shadow(0 4px 6px rgba(79, 70, 229, 0.1))' }}
    >
      {/* Title */}
      <text x="200" y="20" textAnchor="middle" fontSize="10" fill="hsl(var(--primary))" fontFamily="monospace" opacity="0.6">
        FIG.003
      </text>
      <text x="200" y="38" textAnchor="middle" fontSize="12" fill="hsl(var(--primary))" fontFamily="monospace" fontWeight="500">
        NETWORK PACKET ENCAPSULATION
      </text>

      {/* Packet layers */}
      {layers.map((layer, i) => {
        const y = startY + i * layerHeight;
        const padding = i * 15;
        const isHovered = hoveredLayer === i;
        
        return (
          <g 
            key={i}
            onMouseEnter={() => setHoveredLayer(i)}
            onMouseLeave={() => setHoveredLayer(null)}
            className="cursor-pointer"
          >
            {/* Layer rectangle */}
            <rect
              x={30 + padding}
              y={y}
              width={280 - padding * 2}
              height={layerHeight - 5}
              fill={isHovered ? layer.color : 'none'}
              fillOpacity={isHovered ? 0.15 : 0}
              stroke={layer.color}
              strokeWidth={isHovered ? 2 : 1}
              rx="2"
            />
            
            {/* Layer name */}
            <text
              x={40 + padding}
              y={y + 20}
              fontSize="8"
              fill="hsl(var(--primary))"
              fontFamily="monospace"
              fontWeight="500"
            >
              {layer.name}
            </text>
            
            {/* Protocol badge */}
            <rect
              x={140}
              y={y + 8}
              width={50}
              height={14}
              fill="none"
              stroke={layer.color}
              strokeWidth="0.5"
              rx="2"
              opacity="0.7"
            />
            <text
              x={165}
              y={y + 18}
              textAnchor="middle"
              fontSize="7"
              fill="hsl(var(--muted-foreground))"
              fontFamily="monospace"
            >
              {layer.protocol}
            </text>
            
            {/* Byte size annotation */}
            <text
              x={320}
              y={y + 18}
              textAnchor="start"
              fontSize="7"
              fill="hsl(var(--muted-foreground))"
              fontFamily="monospace"
            >
              {layer.bytes}
            </text>
          </g>
        );
      })}

      {/* Header labels */}
      <text x="320" y={startY - 8} fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
        HEADER SIZE
      </text>

      {/* Wire visualization */}
      <g transform="translate(30, 220)">
        <text x="0" y="0" fontSize="8" fill="hsl(var(--primary))" fontFamily="monospace" fontWeight="500">
          PHYSICAL TRANSMISSION
        </text>
        
        {/* Wire */}
        <line x1="0" y1="20" x2="340" y2="20" stroke="hsl(var(--primary))" strokeWidth="2" />
        
        {/* Signal wave */}
        <path
          d={`M0,20 ${Array.from({ length: 17 }, (_, i) => {
            const x = i * 20;
            const bit = Math.random() > 0.5;
            return `L${x},${bit ? 10 : 30} L${x + 10},${bit ? 10 : 30}`;
          }).join(' ')}`}
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="1.5"
          strokeDasharray="340"
          strokeDashoffset={340 - (transmitPhase * 6.8)}
          opacity="0.8"
        />
        
        {/* Bit labels */}
        <g transform="translate(0, 45)">
          {['1', '0', '1', '1', '0', '0', '1', '0', '1', '0', '1', '1', '0', '1', '0', '1', '0'].map((bit, i) => (
            <text
              key={i}
              x={i * 20 + 5}
              y="0"
              fontSize="6"
              fill="hsl(var(--muted-foreground))"
              fontFamily="monospace"
              opacity={0.6}
            >
              {bit}
            </text>
          ))}
        </g>
      </g>

      {/* Annotations */}
      <g transform="translate(30, 280)">
        <line x1="-20" y1="0" x2="360" y2="0" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3" />
        
        <g transform="translate(0, 15)">
          <rect x="0" y="-6" width="8" height="8" fill="hsl(var(--accent))" fillOpacity="0.3" stroke="hsl(var(--accent))" strokeWidth="0.5" />
          <text x="12" y="0" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">PAYLOAD DATA</text>
        </g>
        
        <g transform="translate(100, 15)">
          <rect x="0" y="-6" width="8" height="8" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
          <text x="12" y="0" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">PROTOCOL HEADERS</text>
        </g>
        
        <text x="0" y="35" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          MTU: 1500 BYTES • TRANSMISSION RATE: 1 Gbps • LATENCY: ~1ms
        </text>
      </g>

      {/* Side annotation */}
      <g transform="translate(375, 140) rotate(90)">
        <text x="0" y="0" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace" opacity="0.5">
          OSI MODEL LAYERS 4-7
        </text>
      </g>
    </svg>
  );
};

export default NetworkPacketSVG;
