import { useState, useEffect } from 'react';

interface TransistorSVGProps {
  isPaused?: boolean;
}

const TransistorSVG = ({ isPaused = false }: TransistorSVGProps) => {
  const [gateVoltage, setGateVoltage] = useState(0);
  const [electronFlow, setElectronFlow] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setGateVoltage((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setElectronFlow((prev) => (prev + 2) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, [isPaused]);

  const isOn = gateVoltage > 50;
  const voltageLevel = gateVoltage > 50 ? ((gateVoltage - 50) / 50) : 0;

  return (
    <div className="relative w-full">
      <span className="figure-label absolute -left-4 top-1/2 -translate-y-1/2 md:-left-6">FIG.011</span>

      <svg viewBox="0 0 500 400" className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Background grid */}
        <defs>
          <pattern id="transistorGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="0.5" cy="0.5" r="0.3" className="fill-primary/10" />
          </pattern>
          <linearGradient id="channelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={isOn ? 0.4 : 0.05} />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity={isOn ? 0.6 : 0.05} />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={isOn ? 0.4 : 0.05} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#transistorGrid)" />

        {/* Title */}
        <text x="250" y="25" textAnchor="middle" className="fill-primary font-mono text-[10px] uppercase tracking-wider">
          MOSFET Transistor — Voltage-Controlled Switch
        </text>

        {/* Main transistor structure */}
        <g transform="translate(100, 60)">
          {/* Substrate (P-type) */}
          <rect x="0" y="180" width="300" height="80" className="fill-primary/5 stroke-primary" strokeWidth="1" />
          <text x="150" y="230" textAnchor="middle" className="fill-primary/60 font-mono text-[8px]">P-TYPE SUBSTRATE</text>

          {/* Source region (N+) */}
          <rect x="20" y="140" width="60" height="40" className="fill-primary/20 stroke-primary" strokeWidth="1" />
          <text x="50" y="165" textAnchor="middle" className="fill-primary font-mono text-[8px]">N+</text>
          <text x="50" y="125" textAnchor="middle" className="fill-primary font-mono text-[9px]">SOURCE</text>

          {/* Drain region (N+) */}
          <rect x="220" y="140" width="60" height="40" className="fill-primary/20 stroke-primary" strokeWidth="1" />
          <text x="250" y="165" textAnchor="middle" className="fill-primary font-mono text-[8px]">N+</text>
          <text x="250" y="125" textAnchor="middle" className="fill-primary font-mono text-[9px]">DRAIN</text>

          {/* Channel region */}
          <rect
            x="80"
            y="150"
            width="140"
            height="30"
            fill="url(#channelGradient)"
            className="stroke-primary/50"
            strokeWidth="0.5"
            strokeDasharray={isOn ? "0" : "4 2"}
          />
          <text x="150" y="170" textAnchor="middle" className={`font-mono text-[7px] ${isOn ? 'fill-primary' : 'fill-primary/40'}`}>
            {isOn ? 'CHANNEL (CONDUCTING)' : 'CHANNEL (OFF)'}
          </text>

          {/* Gate oxide */}
          <rect x="60" y="120" width="180" height="20" className="fill-primary/10 stroke-primary" strokeWidth="1" />
          <text x="150" y="133" textAnchor="middle" className="fill-primary/70 font-mono text-[7px]">GATE OXIDE (SiO₂)</text>

          {/* Gate metal */}
          <rect x="80" y="90" width="140" height="30" className="fill-primary/30 stroke-primary" strokeWidth="1.5" />
          <text x="150" y="110" textAnchor="middle" className="fill-primary font-mono text-[9px]">GATE</text>

          {/* Connection terminals */}
          {/* Source terminal */}
          <line x1="50" y1="140" x2="50" y2="50" className="stroke-primary" strokeWidth="2" />
          <circle cx="50" cy="45" r="5" className="fill-background stroke-primary" strokeWidth="1.5" />
          <text x="50" y="35" textAnchor="middle" className="fill-primary font-mono text-[8px]">S</text>

          {/* Drain terminal */}
          <line x1="250" y1="140" x2="250" y2="50" className="stroke-primary" strokeWidth="2" />
          <circle cx="250" cy="45" r="5" className="fill-background stroke-primary" strokeWidth="1.5" />
          <text x="250" y="35" textAnchor="middle" className="fill-primary font-mono text-[8px]">D</text>

          {/* Gate terminal */}
          <line x1="150" y1="90" x2="150" y2="50" className="stroke-primary" strokeWidth="2" />
          <circle cx="150" cy="45" r="5" className={`stroke-primary ${isOn ? 'fill-primary' : 'fill-background'}`} strokeWidth="1.5" />
          <text x="150" y="35" textAnchor="middle" className="fill-primary font-mono text-[8px]">G</text>

          {/* Electron flow animation when ON */}
          {isOn && (
            <>
              {[0, 1, 2, 3, 4].map((i) => {
                const xPos = 50 + ((electronFlow + i * 20) % 200);
                return (
                  <circle
                    key={`electron-${i}`}
                    cx={xPos}
                    cy={165}
                    r="3"
                    className="fill-primary"
                    opacity={0.6}
                  />
                );
              })}
              <text x="150" y="195" textAnchor="middle" className="fill-primary font-mono text-[7px]">
                e⁻ → → →
              </text>
            </>
          )}

          {/* Depletion region indicators */}
          <path
            d="M 80 180 Q 90 185, 80 190 Q 70 195, 80 200"
            className="fill-none stroke-primary/30"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <path
            d="M 220 180 Q 210 185, 220 190 Q 230 195, 220 200"
            className="fill-none stroke-primary/30"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        </g>

        {/* Voltage control panel */}
        <g transform="translate(30, 320)">
          <rect x="0" y="0" width="180" height="60" className="fill-primary/5 stroke-primary" strokeWidth="1" />
          <text x="90" y="15" textAnchor="middle" className="fill-primary font-mono text-[8px] uppercase">Gate Voltage</text>

          {/* Voltage bar */}
          <rect x="15" y="25" width="150" height="10" className="fill-primary/10 stroke-primary/50" strokeWidth="0.5" />
          <rect x="15" y="25" width={gateVoltage * 1.5} height="10" className="fill-primary/40" />

          {/* Threshold marker */}
          <line x1="90" y1="23" x2="90" y2="37" className="stroke-primary" strokeWidth="1" strokeDasharray="2 1" />
          <text x="90" y="48" textAnchor="middle" className="fill-primary/60 font-mono text-[7px]">Vth</text>

          <text x="15" y="55" className="fill-primary/50 font-mono text-[7px]">0V</text>
          <text x="165" y="55" textAnchor="end" className="fill-primary/50 font-mono text-[7px]">Vdd</text>
        </g>

        {/* State indicator */}
        <g transform="translate(290, 320)">
          <rect x="0" y="0" width="180" height="60" className="fill-primary/5 stroke-primary" strokeWidth="1" />
          <text x="90" y="15" textAnchor="middle" className="fill-primary font-mono text-[8px] uppercase">Transistor State</text>

          <rect
            x="15"
            y="25"
            width="70"
            height="25"
            className={`stroke-primary ${!isOn ? 'fill-primary/20' : 'fill-none'}`}
            strokeWidth={!isOn ? "2" : "1"}
          />
          <text x="50" y="42" textAnchor="middle" className={`font-mono text-[9px] ${!isOn ? 'fill-primary' : 'fill-primary/50'}`}>OFF</text>

          <rect
            x="95"
            y="25"
            width="70"
            height="25"
            className={`stroke-primary ${isOn ? 'fill-primary/20' : 'fill-none'}`}
            strokeWidth={isOn ? "2" : "1"}
          />
          <text x="130" y="42" textAnchor="middle" className={`font-mono text-[9px] ${isOn ? 'fill-primary' : 'fill-primary/50'}`}>ON</text>
        </g>

        {/* Annotations */}
        <g className="fill-primary/60 font-mono text-[7px]">
          <text x="420" y="100">When Vg {'<'} Vth:</text>
          <text x="420" y="112">No channel forms</text>
          <text x="420" y="124">No current flows</text>
          <text x="420" y="136">Output = 0</text>

          <text x="420" y="160">When Vg {'>'} Vth:</text>
          <text x="420" y="172">Channel conducts</text>
          <text x="420" y="184">Current: S → D</text>
          <text x="420" y="196">Output = 1</text>
        </g>

        {/* Corner markers */}
        <g className="stroke-primary/30" strokeWidth="0.5">
          <path d="M 5 20 L 5 5 L 20 5" fill="none" />
          <path d="M 495 20 L 495 5 L 480 5" fill="none" />
          <path d="M 5 380 L 5 395 L 20 395" fill="none" />
          <path d="M 495 380 L 495 395 L 480 395" fill="none" />
        </g>
      </svg>
    </div>
  );
};

export default TransistorSVG;
