import { useEffect, useState } from 'react';

interface LayeredStackSVGProps {
  isPaused?: boolean;
}

const LayeredStackSVG = ({ isPaused = false }: LayeredStackSVGProps) => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [assemblyProgress, setAssemblyProgress] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    
    let frame: number;
    let time = 0;
    
    const animate = () => {
      time += 0.008;
      setAssemblyProgress((Math.sin(time) + 1) / 2);
      frame = requestAnimationFrame(animate);
    };
    
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isPaused]);

  const explodeOffset = assemblyProgress * 25;

  return (
    <div className="relative">
      <span className="figure-label absolute -left-8 top-1/2 -translate-y-1/2 writing-mode-vertical">FIG.004</span>
      <svg viewBox="0 0 500 450" className="w-full max-w-lg">
        <defs>
          {/* Arrow marker for annotations */}
          <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="0" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" className="fill-primary" />
          </marker>
          
          {/* Dotted line pattern */}
          <pattern id="grid-dots" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" className="fill-primary/20" />
          </pattern>
        </defs>

        {/* Background grid */}
        <rect x="40" y="20" width="420" height="400" fill="url(#grid-dots)" />

        {/* ===== BROWSER LAYER (TOP) ===== */}
        <g 
          className="cursor-pointer transition-all duration-500"
          style={{ transform: `translateY(-${explodeOffset * 3}px)` }}
          onMouseEnter={() => setHoveredPart('browser')}
          onMouseLeave={() => setHoveredPart(null)}
        >
          {/* Browser window frame - isometric */}
          <path
            d="M 120 60 L 280 35 L 380 60 L 380 120 L 280 145 L 120 120 Z"
            className={`fill-background stroke-primary stroke-[1.5] transition-all duration-300 ${
              hoveredPart === 'browser' ? 'fill-primary/10' : ''
            }`}
          />
          {/* Browser top bar */}
          <path
            d="M 120 60 L 280 35 L 380 60 L 280 85 Z"
            className="fill-secondary/50 stroke-primary stroke-[1]"
          />
          {/* Window controls */}
          <circle cx="145" cy="55" r="3" className="fill-primary/60" />
          <circle cx="158" cy="53" r="3" className="fill-primary/40" />
          <circle cx="171" cy="51" r="3" className="fill-primary/40" />
          
          {/* Tab indicator */}
          <path d="M 200 48 L 260 40 L 260 50 L 200 58 Z" className="fill-primary/20 stroke-primary stroke-[0.5]" />
          
          {/* Content area with DOM representation */}
          <g className="stroke-primary/40 stroke-[0.5]">
            <rect x="145" y="75" width="50" height="8" rx="1" className="fill-primary/10" />
            <rect x="145" y="88" width="80" height="5" rx="1" className="fill-primary/5" />
            <rect x="145" y="96" width="65" height="5" rx="1" className="fill-primary/5" />
            <rect x="230" y="75" width="30" height="30" rx="2" className="fill-primary/10" />
          </g>
          
          {/* Right side face */}
          <path
            d="M 380 60 L 380 120 L 280 145 L 280 85 Z"
            className="fill-secondary/30 stroke-primary stroke-[1]"
          />
        </g>

        {/* Browser annotation */}
        <g className="stroke-primary stroke-[0.5]" style={{ transform: `translateY(-${explodeOffset * 3}px)` }}>
          <path d="M 90 70 L 115 70" strokeDasharray="2,2" markerEnd="url(#arrowhead)" />
          <text x="30" y="65" className="fill-primary font-mono text-[7px] uppercase">BROWSER</text>
          <text x="30" y="74" className="fill-primary/60 font-mono text-[6px]">DOM + CSS</text>
        </g>

        {/* ===== JAVASCRIPT RUNTIME ===== */}
        <g 
          className="cursor-pointer transition-all duration-500"
          style={{ transform: `translateY(-${explodeOffset * 2}px)` }}
          onMouseEnter={() => setHoveredPart('runtime')}
          onMouseLeave={() => setHoveredPart(null)}
        >
          {/* Runtime container */}
          <path
            d="M 140 145 L 260 125 L 360 145 L 360 185 L 260 205 L 140 185 Z"
            className={`fill-background stroke-primary stroke-[1.5] transition-all duration-300 ${
              hoveredPart === 'runtime' ? 'fill-primary/10' : ''
            }`}
          />
          
          {/* Call stack visualization */}
          <g className="stroke-primary stroke-[0.5]">
            <rect x="155" y="150" width="40" height="10" className="fill-primary/20" />
            <text x="160" y="158" className="fill-primary font-mono text-[5px]">main()</text>
            <rect x="155" y="162" width="40" height="10" className="fill-primary/15" />
            <text x="160" y="170" className="fill-primary font-mono text-[5px]">fetch()</text>
            <rect x="155" y="174" width="40" height="10" className="fill-primary/10" />
            <text x="160" y="182" className="fill-primary font-mono text-[5px]">render()</text>
          </g>
          
          {/* Event loop circle */}
          <circle cx="250" cy="165" r="18" className="fill-none stroke-primary stroke-[1]" strokeDasharray="4,2" />
          <path d="M 250 147 A 18 18 0 0 1 268 165" className="fill-none stroke-primary stroke-[1.5]" />
          <circle cx="268" cy="165" r="2" className="fill-primary" />
          
          {/* Heap representation */}
          <g className="stroke-primary/50 stroke-[0.5]">
            <rect x="285" y="150" width="12" height="12" className="fill-primary/10" />
            <rect x="300" y="155" width="8" height="8" className="fill-primary/15" />
            <rect x="290" y="165" width="15" height="10" className="fill-primary/10" />
            <rect x="310" y="160" width="10" height="18" className="fill-primary/15" />
          </g>
          
          {/* Right face */}
          <path
            d="M 360 145 L 360 185 L 260 205 L 260 165 Z"
            className="fill-secondary/30 stroke-primary stroke-[1]"
          />
        </g>

        {/* Runtime annotations */}
        <g className="stroke-primary stroke-[0.5]" style={{ transform: `translateY(-${explodeOffset * 2}px)` }}>
          <path d="M 395 150 L 365 150" strokeDasharray="2,2" markerEnd="url(#arrowhead)" />
          <text x="400" y="145" className="fill-primary font-mono text-[7px] uppercase">V8 ENGINE</text>
          <text x="400" y="154" className="fill-primary/60 font-mono text-[6px]">Call Stack</text>
          
          <path d="M 220 165 L 232 165" strokeDasharray="2,2" />
          <text x="200" y="168" className="fill-primary/60 font-mono text-[5px]" textAnchor="end">EVENT</text>
          <text x="200" y="175" className="fill-primary/60 font-mono text-[5px]" textAnchor="end">LOOP</text>
        </g>

        {/* ===== HTTP/API LAYER ===== */}
        <g 
          className="cursor-pointer transition-all duration-500"
          style={{ transform: `translateY(-${explodeOffset}px)` }}
          onMouseEnter={() => setHoveredPart('api')}
          onMouseLeave={() => setHoveredPart(null)}
        >
          {/* API gateway box */}
          <path
            d="M 160 215 L 250 200 L 340 215 L 340 245 L 250 260 L 160 245 Z"
            className={`fill-background stroke-primary stroke-[1.5] transition-all duration-300 ${
              hoveredPart === 'api' ? 'fill-primary/10' : ''
            }`}
          />
          
          {/* HTTP methods */}
          <g className="font-mono text-[5px]">
            <rect x="175" y="218" width="25" height="8" className="fill-primary/30 stroke-primary stroke-[0.5]" />
            <text x="180" y="225" className="fill-primary">GET</text>
            <rect x="205" y="218" width="25" height="8" className="fill-primary/20 stroke-primary stroke-[0.5]" />
            <text x="208" y="225" className="fill-primary">POST</text>
            <rect x="235" y="218" width="25" height="8" className="fill-primary/15 stroke-primary stroke-[0.5]" />
            <text x="238" y="225" className="fill-primary">PUT</text>
          </g>
          
          {/* Request/Response arrows */}
          <g className="stroke-primary stroke-[1]">
            <path d="M 190 235 L 220 235" markerEnd="url(#arrowhead)" />
            <path d="M 280 238 L 250 238" markerEnd="url(#arrowhead)" />
          </g>
          <text x="205" y="233" className="fill-primary/50 font-mono text-[4px]">REQ</text>
          <text x="255" y="242" className="fill-primary/50 font-mono text-[4px]">RES</text>
          
          {/* Right face */}
          <path
            d="M 340 215 L 340 245 L 250 260 L 250 230 Z"
            className="fill-secondary/30 stroke-primary stroke-[1]"
          />
        </g>

        {/* API annotations */}
        <g className="stroke-primary stroke-[0.5]" style={{ transform: `translateY(-${explodeOffset}px)` }}>
          <path d="M 130 225 L 155 225" strokeDasharray="2,2" markerEnd="url(#arrowhead)" />
          <text x="70" y="220" className="fill-primary font-mono text-[7px] uppercase">REST API</text>
          <text x="70" y="229" className="fill-primary/60 font-mono text-[6px]">HTTP/HTTPS</text>
        </g>

        {/* ===== SERVER LAYER ===== */}
        <g 
          className="cursor-pointer transition-all duration-500"
          onMouseEnter={() => setHoveredPart('server')}
          onMouseLeave={() => setHoveredPart(null)}
        >
          {/* Server chassis */}
          <path
            d="M 130 275 L 250 250 L 370 275 L 370 325 L 250 350 L 130 325 Z"
            className={`fill-background stroke-primary stroke-[1.5] transition-all duration-300 ${
              hoveredPart === 'server' ? 'fill-primary/10' : ''
            }`}
          />
          
          {/* Server internals - CPU */}
          <g>
            <rect x="155" y="280" width="30" height="25" className="fill-primary/15 stroke-primary stroke-[0.5]" />
            <g className="stroke-primary/30 stroke-[0.3]">
              {[0,1,2,3,4].map(i => (
                <line key={`cpu-h-${i}`} x1="158" y1={283 + i*5} x2="182" y2={283 + i*5} />
              ))}
              {[0,1,2,3,4].map(i => (
                <line key={`cpu-v-${i}`} x1={158 + i*6} y1="283" x2={158 + i*6} y2="302" />
              ))}
            </g>
            <text x="170" y="318" className="fill-primary/60 font-mono text-[5px]" textAnchor="middle">CPU</text>
          </g>
          
          {/* Memory modules */}
          <g>
            {[0,1,2,3].map(i => (
              <rect key={`ram-${i}`} x={200 + i*12} y="285" width="8" height="20" className="fill-primary/20 stroke-primary stroke-[0.5]" />
            ))}
            <text x="225" y="318" className="fill-primary/60 font-mono text-[5px]" textAnchor="middle">RAM</text>
          </g>
          
          {/* Storage */}
          <g>
            <rect x="270" y="280" width="35" height="25" rx="2" className="fill-primary/10 stroke-primary stroke-[0.5]" />
            <circle cx="287" cy="292" r="8" className="fill-none stroke-primary stroke-[0.5]" />
            <circle cx="287" cy="292" r="3" className="fill-primary/30" />
            <text x="287" y="318" className="fill-primary/60 font-mono text-[5px]" textAnchor="middle">SSD</text>
          </g>
          
          {/* Network ports */}
          <g>
            {[0,1,2].map(i => (
              <rect key={`port-${i}`} x={320 + i*10} y="290" width="8" height="12" className="fill-primary/25 stroke-primary stroke-[0.5]" />
            ))}
            <text x="335" y="318" className="fill-primary/60 font-mono text-[5px]" textAnchor="middle">NIC</text>
          </g>
          
          {/* Right face */}
          <path
            d="M 370 275 L 370 325 L 250 350 L 250 300 Z"
            className="fill-secondary/30 stroke-primary stroke-[1]"
          />
          
          {/* Bottom face hint */}
          <path
            d="M 130 325 L 250 350 L 370 325"
            className="fill-none stroke-primary stroke-[1]"
          />
        </g>

        {/* Server annotations */}
        <g className="stroke-primary stroke-[0.5]">
          <path d="M 400 285 L 375 285" strokeDasharray="2,2" markerEnd="url(#arrowhead)" />
          <text x="405" y="280" className="fill-primary font-mono text-[7px] uppercase">SERVER</text>
          <text x="405" y="289" className="fill-primary/60 font-mono text-[6px]">Node.js Runtime</text>
        </g>

        {/* ===== DATABASE LAYER (BOTTOM) ===== */}
        <g 
          className="cursor-pointer transition-all duration-500"
          style={{ transform: `translateY(${explodeOffset}px)` }}
          onMouseEnter={() => setHoveredPart('database')}
          onMouseLeave={() => setHoveredPart(null)}
        >
          {/* Database cylinder top */}
          <ellipse
            cx="250"
            cy="370"
            rx="90"
            ry="20"
            className={`fill-background stroke-primary stroke-[1.5] transition-all duration-300 ${
              hoveredPart === 'database' ? 'fill-primary/10' : ''
            }`}
          />
          
          {/* Database cylinder body */}
          <path
            d="M 160 370 L 160 410 A 90 20 0 0 0 340 410 L 340 370"
            className="fill-background stroke-primary stroke-[1.5]"
          />
          
          {/* Database cylinder bottom */}
          <ellipse
            cx="250"
            cy="410"
            rx="90"
            ry="20"
            className="fill-secondary/30 stroke-primary stroke-[1]"
          />
          
          {/* Table rows representation */}
          <g className="stroke-primary/40 stroke-[0.5]">
            <line x1="180" y1="380" x2="320" y2="380" />
            <line x1="180" y1="390" x2="320" y2="390" />
            <line x1="180" y1="400" x2="320" y2="400" />
            
            {/* Column separators */}
            <line x1="220" y1="375" x2="220" y2="405" strokeDasharray="2,1" />
            <line x1="280" y1="375" x2="280" y2="405" strokeDasharray="2,1" />
          </g>
          
          {/* Data cells */}
          <g className="fill-primary/30">
            <rect x="185" y="382" width="30" height="6" rx="1" />
            <rect x="225" y="382" width="50" height="6" rx="1" className="fill-primary/20" />
            <rect x="285" y="382" width="25" height="6" rx="1" className="fill-primary/15" />
            
            <rect x="185" y="392" width="30" height="6" rx="1" />
            <rect x="225" y="392" width="40" height="6" rx="1" className="fill-primary/20" />
            <rect x="285" y="392" width="30" height="6" rx="1" className="fill-primary/15" />
          </g>
          
          {/* Index indicator */}
          <g>
            <path d="M 175 375 L 175 405" className="stroke-primary/60 stroke-[1]" />
            <text x="172" y="390" className="fill-primary/40 font-mono text-[4px]" textAnchor="end">IDX</text>
          </g>
        </g>

        {/* Database annotations */}
        <g className="stroke-primary stroke-[0.5]" style={{ transform: `translateY(${explodeOffset}px)` }}>
          <path d="M 130 395 L 155 395" strokeDasharray="2,2" markerEnd="url(#arrowhead)" />
          <text x="70" y="390" className="fill-primary font-mono text-[7px] uppercase">DATABASE</text>
          <text x="70" y="399" className="fill-primary/60 font-mono text-[6px]">PostgreSQL</text>
        </g>

        {/* ===== CONNECTION LINES ===== */}
        <g className="stroke-primary/30 stroke-[1]" strokeDasharray="4,4">
          <line x1="250" y1="145" x2="250" y2="125" style={{ transform: `translateY(-${explodeOffset * 2.5}px)` }} />
          <line x1="250" y1="205" x2="250" y2="200" style={{ transform: `translateY(-${explodeOffset * 1.5}px)` }} />
          <line x1="250" y1="260" x2="250" y2="250" style={{ transform: `translateY(-${explodeOffset * 0.5}px)` }} />
          <line x1="250" y1="350" x2="250" y2="370" style={{ transform: `translateY(${explodeOffset * 0.5}px)` }} />
        </g>

        {/* ===== SIDE LABELS ===== */}
        <g className="fill-primary font-mono text-[6px] uppercase">
          <text x="475" y="90" className="writing-mode-vertical" style={{ writingMode: 'vertical-rl' }}>[ CLIENT ]</text>
          <text x="475" y="290" className="writing-mode-vertical" style={{ writingMode: 'vertical-rl' }}>[ SERVER ]</text>
        </g>

        {/* Divider line between client/server */}
        <line x1="100" y1="205" x2="400" y2="205" className="stroke-primary/20 stroke-[0.5]" strokeDasharray="8,4" style={{ transform: `translateY(-${explodeOffset * 1.5}px)` }} />

        {/* Title */}
        <text x="250" y="440" textAnchor="middle" className="fill-primary font-mono text-[9px] uppercase tracking-wider">
          Full-Stack Application Architecture
        </text>
        
        {/* Specs box */}
        <g className="fill-primary/50 font-mono text-[5px]">
          <text x="40" y="435">LAYERS: 5</text>
          <text x="40" y="442">PROTOCOL: HTTPS</text>
          <text x="120" y="435">CACHE: REDIS</text>
          <text x="120" y="442">AUTH: JWT</text>
        </g>
      </svg>
      
      {/* Right side spec label */}
      <span className="absolute -right-4 top-1/2 -translate-y-1/2 font-mono text-[8px] text-primary/60 uppercase" style={{ writingMode: 'vertical-rl' }}>
        [ WEB APPLICATION STACK ]
      </span>
    </div>
  );
};

export default LayeredStackSVG;
