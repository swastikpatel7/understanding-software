import { useEffect, useState } from 'react';

interface HTTPRequestSVGProps {
  isPaused?: boolean;
}

const HTTPRequestSVG = ({ isPaused = false }: HTTPRequestSVGProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 1200);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="relative">
      <span className="figure-label absolute -left-6 top-1/2 -translate-y-1/2">FIG.003</span>
      <svg viewBox="0 0 500 300" className="w-full max-w-lg">
        {/* Client */}
        <g>
          <rect
            x="40"
            y="100"
            width="100"
            height="120"
            rx="4"
            className="fill-background stroke-primary stroke-2"
          />
          <rect
            x="50"
            y="110"
            width="80"
            height="50"
            className="fill-secondary stroke-primary stroke-[1]"
          />
          <rect
            x="70"
            y="170"
            width="40"
            height="40"
            className="fill-background stroke-primary stroke-[1]"
          />
          <text x="90" y="240" textAnchor="middle" className="fill-primary font-mono text-[10px] uppercase">
            Client
          </text>
        </g>

        {/* Server */}
        <g>
          <rect
            x="360"
            y="80"
            width="100"
            height="160"
            rx="4"
            className="fill-background stroke-primary stroke-2"
          />
          {/* Server slots */}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x="370"
              y={90 + i * 28}
              width="80"
              height="20"
              className={`stroke-primary stroke-[1] ${
                step >= 2 && i < 2 ? 'fill-primary/20' : 'fill-secondary'
              }`}
            />
          ))}
          <text x="410" y="260" textAnchor="middle" className="fill-primary font-mono text-[10px] uppercase">
            Server
          </text>
        </g>

        {/* Request arrow */}
        <g className={`transition-all duration-500 ${step === 1 ? 'opacity-100' : 'opacity-0'}`}>
          <path
            d="M 150 140 L 350 140"
            className="stroke-primary stroke-2"
            markerEnd="url(#arrowhead)"
            strokeDasharray="8 4"
          />
          <rect
            x="200"
            y="120"
            width="100"
            height="30"
            rx="2"
            className="fill-background stroke-primary stroke-[1]"
          />
          <text x="250" y="140" textAnchor="middle" className="fill-primary font-mono text-[9px]">
            GET /api/data
          </text>
        </g>

        {/* Response arrow */}
        <g className={`transition-all duration-500 ${step === 3 ? 'opacity-100' : 'opacity-0'}`}>
          <path
            d="M 350 180 L 150 180"
            className="stroke-primary stroke-2"
            markerEnd="url(#arrowhead)"
            strokeDasharray="8 4"
          />
          <rect
            x="200"
            y="165"
            width="100"
            height="30"
            rx="2"
            className="fill-secondary stroke-primary stroke-[1]"
          />
          <text x="250" y="185" textAnchor="middle" className="fill-primary font-mono text-[9px]">
            200 OK
          </text>
        </g>

        {/* Processing indicator */}
        <g className={`transition-all duration-500 ${step === 2 ? 'opacity-100' : 'opacity-0'}`}>
          <circle
            cx="410"
            cy="160"
            r="15"
            className="fill-none stroke-primary stroke-2 animate-pulse-subtle"
          />
          <text x="410" y="164" textAnchor="middle" className="fill-primary font-mono text-[8px]">
            ...
          </text>
        </g>

        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              className="fill-primary"
            />
          </marker>
        </defs>

        {/* Connection line */}
        <path
          d="M 90 100 L 90 60 L 410 60 L 410 80"
          className="stroke-primary/30 stroke-[1] fill-none"
          strokeDasharray="4 4"
        />
        <text x="250" y="55" textAnchor="middle" className="fill-primary/60 font-mono text-[8px] uppercase">
          TCP/IP Connection
        </text>
      </svg>
    </div>
  );
};

export default HTTPRequestSVG;
