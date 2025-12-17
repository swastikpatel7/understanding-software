import { useState, useEffect } from 'react';

interface ClockSignalSVGProps {
  isPaused?: boolean;
}

const ClockSignalSVG = ({ isPaused = false }: ClockSignalSVGProps) => {
  const [phase, setPhase] = useState(0);
  const [jitter, setJitter] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % 100);
      // Add small random jitter occasionally
      if (Math.random() > 0.9) {
        setJitter((prev) =>
          prev.map(() => (Math.random() - 0.5) * 4)
        );
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentCycle = Math.floor(phase / 12.5);
  const frequency = "3.6 GHz";
  const period = "278 ps";

  return (
    <div className="relative w-full">
      <span className="figure-label absolute -left-4 top-1/2 -translate-y-1/2 md:-left-6">FIG.016</span>

      <svg viewBox="0 0 600 420" className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Background grid */}
        <defs>
          <pattern id="clockGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="0.5" cy="0.5" r="0.3" className="fill-primary/10" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#clockGrid)" />

        {/* Title */}
        <text x="300" y="25" textAnchor="middle" className="fill-primary font-mono text-[10px] uppercase tracking-wider">
          Clock Signal — The Heartbeat of Digital Systems
        </text>

        {/* Ideal Clock Waveform */}
        <g transform="translate(40, 50)">
          <text x="0" y="0" className="fill-primary font-mono text-[9px] uppercase">Ideal Clock</text>

          <g transform="translate(60, 10)">
            <rect x="0" y="0" width="480" height="60" className="fill-primary/5 stroke-primary/30" strokeWidth="0.5" />

            {/* Perfect square wave */}
            <path
              d={`M 0 45 ${Array.from({ length: 8 }, (_, i) => {
                const x = i * 60;
                const pulsePhase = (phase + i * 12.5) % 100;
                const high = pulsePhase < 50;
                return high
                  ? `L ${x} 45 L ${x} 15 L ${x + 30} 15 L ${x + 30} 45`
                  : `L ${x} 45 L ${x + 30} 45`;
              }).join(' ')} L 480 45`}
              className="fill-none stroke-primary"
              strokeWidth="2"
            />

            {/* Period markers */}
            <line x1="0" y1="55" x2="60" y2="55" className="stroke-primary/50" strokeWidth="1" />
            <line x1="0" y1="52" x2="0" y2="58" className="stroke-primary/50" strokeWidth="1" />
            <line x1="60" y1="52" x2="60" y2="58" className="stroke-primary/50" strokeWidth="1" />
            <text x="30" y="67" textAnchor="middle" className="fill-primary/60 font-mono text-[7px]">Period (T)</text>

            {/* Duty cycle markers */}
            <line x1="0" y1="8" x2="30" y2="8" className="stroke-primary/40" strokeWidth="1" />
            <text x="15" y="5" textAnchor="middle" className="fill-primary/50 font-mono text-[6px]">50% duty</text>

            {/* Rising edge indicator */}
            <polygon points="0,70 -4,78 4,78" className="fill-primary/50" />
            <text x="0" y="88" textAnchor="middle" className="fill-primary/50 font-mono text-[6px]">↑ rising</text>

            {/* Falling edge indicator */}
            <polygon points="30,70 26,78 34,78" className="fill-primary/50" />
            <text x="30" y="88" textAnchor="middle" className="fill-primary/50 font-mono text-[6px]">↓ falling</text>
          </g>

          {/* Specs */}
          <g transform="translate(60, 95)">
            <text x="0" y="0" className="fill-primary/70 font-mono text-[8px]">Frequency: {frequency}</text>
            <text x="150" y="0" className="fill-primary/70 font-mono text-[8px]">Period: {period}</text>
            <text x="280" y="0" className="fill-primary/70 font-mono text-[8px]">Duty Cycle: 50%</text>
          </g>
        </g>

        {/* Clock with Jitter */}
        <g transform="translate(40, 165)">
          <text x="0" y="0" className="fill-primary font-mono text-[9px] uppercase">Real Clock (with Jitter)</text>

          <g transform="translate(60, 10)">
            <rect x="0" y="0" width="480" height="60" className="fill-primary/5 stroke-primary/30" strokeWidth="0.5" />

            {/* Jittery square wave */}
            <path
              d={`M 0 45 ${Array.from({ length: 8 }, (_, i) => {
                const x = i * 60 + jitter[i];
                return `L ${x} 45 L ${x} 15 L ${x + 30} 15 L ${x + 30} 45`;
              }).join(' ')} L 480 45`}
              className="fill-none stroke-primary"
              strokeWidth="2"
            />

            {/* Jitter indicators */}
            {jitter.slice(0, 4).map((j, i) => (
              <g key={`jitter-${i}`} transform={`translate(${i * 60}, 0)`}>
                <line x1={j} y1="45" x2={j} y2="70" className="stroke-primary/30" strokeWidth="0.5" strokeDasharray="2 1" />
                <text x={j} y="80" textAnchor="middle" className="fill-primary/40 font-mono text-[5px]">
                  {j > 0 ? '+' : ''}{j.toFixed(1)}ps
                </text>
              </g>
            ))}
          </g>

          <g transform="translate(60, 90)">
            <text x="0" y="0" className="fill-primary/60 font-mono text-[7px]">
              Jitter: Random variation in edge timing. Sources: power supply noise, thermal variation, PLL instability
            </text>
          </g>
        </g>

        {/* Clock Distribution Tree */}
        <g transform="translate(40, 265)">
          <text x="0" y="0" className="fill-primary font-mono text-[9px] uppercase">Clock Distribution (H-Tree)</text>

          <g transform="translate(150, 20)">
            {/* Clock source */}
            <rect x="95" y="0" width="50" height="25" className="fill-primary/20 stroke-primary" strokeWidth="1" />
            <text x="120" y="16" textAnchor="middle" className="fill-primary font-mono text-[7px]">CLK SRC</text>

            {/* Main trunk */}
            <line x1="120" y1="25" x2="120" y2="45" className="stroke-primary" strokeWidth="2" />

            {/* First branch */}
            <line x1="60" y1="45" x2="180" y2="45" className="stroke-primary" strokeWidth="1.5" />

            {/* Second level */}
            <line x1="60" y1="45" x2="60" y2="65" className="stroke-primary" strokeWidth="1.5" />
            <line x1="180" y1="45" x2="180" y2="65" className="stroke-primary" strokeWidth="1.5" />

            {/* Third level branches */}
            <line x1="30" y1="65" x2="90" y2="65" className="stroke-primary" strokeWidth="1" />
            <line x1="150" y1="65" x2="210" y2="65" className="stroke-primary" strokeWidth="1" />

            {/* Fourth level */}
            {[30, 90, 150, 210].map((x) => (
              <g key={`branch-${x}`}>
                <line x1={x} y1="65" x2={x} y2="80" className="stroke-primary" strokeWidth="1" />
                <line x1={x - 15} y1="80" x2={x + 15} y2="80" className="stroke-primary" strokeWidth="0.75" />
              </g>
            ))}

            {/* Flip-flops at leaves */}
            {[15, 45, 75, 105, 135, 165, 195, 225].map((x, i) => (
              <g key={`ff-${i}`} transform={`translate(${x}, 85)`}>
                <line x1="0" y1="-5" x2="0" y2="0" className="stroke-primary" strokeWidth="0.75" />
                <rect x="-8" y="0" width="16" height="12" className="fill-primary/10 stroke-primary" strokeWidth="0.5" />
                <text x="0" y="9" textAnchor="middle" className="fill-primary/60 font-mono text-[5px]">FF</text>
              </g>
            ))}

            {/* Skew annotation */}
            <text x="120" y="115" textAnchor="middle" className="fill-primary/50 font-mono text-[7px]">
              H-tree ensures equal path lengths → minimal skew
            </text>
          </g>
        </g>

        {/* Timing Constraints */}
        <g transform="translate(340, 265)">
          <text x="0" y="0" className="fill-primary font-mono text-[9px] uppercase">Timing Constraints</text>

          <g transform="translate(0, 15)">
            <rect x="0" y="0" width="220" height="100" className="fill-primary/5 stroke-primary" strokeWidth="1" />

            {/* Setup and hold diagram */}
            <g transform="translate(20, 20)">
              {/* Clock edge */}
              <line x1="90" y1="0" x2="90" y2="60" className="stroke-primary" strokeWidth="1" strokeDasharray="3 2" />
              <text x="90" y="70" textAnchor="middle" className="fill-primary font-mono text-[6px]">CLK edge</text>

              {/* Setup time */}
              <line x1="40" y1="15" x2="90" y2="15" className="stroke-primary/60" strokeWidth="1" />
              <line x1="40" y1="12" x2="40" y2="18" className="stroke-primary/60" strokeWidth="1" />
              <text x="65" y="12" textAnchor="middle" className="fill-primary/50 font-mono text-[6px]">t_setup</text>

              {/* Hold time */}
              <line x1="90" y1="35" x2="130" y2="35" className="stroke-primary/60" strokeWidth="1" />
              <line x1="130" y1="32" x2="130" y2="38" className="stroke-primary/60" strokeWidth="1" />
              <text x="110" y="32" textAnchor="middle" className="fill-primary/50 font-mono text-[6px]">t_hold</text>

              {/* Stable region */}
              <rect x="40" y="45" width="90" height="10" className="fill-primary/20 stroke-primary/50" strokeWidth="0.5" />
              <text x="85" y="63" textAnchor="middle" className="fill-primary/60 font-mono text-[5px]">DATA MUST BE STABLE</text>
            </g>
          </g>
        </g>

        {/* PLL block */}
        <g transform="translate(340, 50)">
          <text x="0" y="0" className="fill-primary font-mono text-[9px] uppercase">PLL (Frequency Multiplier)</text>

          <g transform="translate(0, 15)">
            <rect x="0" y="0" width="220" height="90" className="fill-primary/5 stroke-primary" strokeWidth="1" />

            {/* Reference input */}
            <text x="10" y="45" className="fill-primary font-mono text-[7px]">REF</text>
            <text x="10" y="55" className="fill-primary/50 font-mono text-[6px]">100MHz</text>
            <line x1="45" y1="50" x2="60" y2="50" className="stroke-primary" strokeWidth="1" />

            {/* Phase detector */}
            <rect x="60" y="35" width="35" height="30" className="fill-primary/10 stroke-primary" strokeWidth="0.5" />
            <text x="77" y="53" textAnchor="middle" className="fill-primary/60 font-mono text-[5px]">PD</text>

            {/* Loop filter */}
            <line x1="95" y1="50" x2="105" y2="50" className="stroke-primary" strokeWidth="1" />
            <rect x="105" y="35" width="25" height="30" className="fill-primary/10 stroke-primary" strokeWidth="0.5" />
            <text x="117" y="53" textAnchor="middle" className="fill-primary/60 font-mono text-[5px]">LPF</text>

            {/* VCO */}
            <line x1="130" y1="50" x2="140" y2="50" className="stroke-primary" strokeWidth="1" />
            <rect x="140" y="35" width="30" height="30" className="fill-primary/10 stroke-primary" strokeWidth="0.5" />
            <text x="155" y="53" textAnchor="middle" className="fill-primary/60 font-mono text-[5px]">VCO</text>

            {/* Output */}
            <line x1="170" y1="50" x2="210" y2="50" className="stroke-primary" strokeWidth="1" />
            <text x="195" y="45" className="fill-primary font-mono text-[7px]">OUT</text>
            <text x="195" y="58" className="fill-primary/50 font-mono text-[6px]">3.6GHz</text>

            {/* Feedback divider */}
            <line x1="185" y1="50" x2="185" y2="75" className="stroke-primary" strokeWidth="1" />
            <line x1="77" y1="75" x2="185" y2="75" className="stroke-primary" strokeWidth="1" />
            <line x1="77" y1="65" x2="77" y2="75" className="stroke-primary" strokeWidth="1" />
            <rect x="115" y="70" width="30" height="15" className="fill-primary/10 stroke-primary" strokeWidth="0.5" />
            <text x="130" y="80" textAnchor="middle" className="fill-primary/60 font-mono text-[5px]">÷36</text>
          </g>
        </g>

        {/* Footer */}
        <text x="300" y="405" textAnchor="middle" className="fill-primary/50 font-mono text-[7px]">
          Clock frequency determines maximum operations per second — 3.6 GHz = 3.6 billion state changes/second
        </text>

        {/* Corner markers */}
        <g className="stroke-primary/30" strokeWidth="0.5">
          <path d="M 5 20 L 5 5 L 20 5" fill="none" />
          <path d="M 595 20 L 595 5 L 580 5" fill="none" />
          <path d="M 5 400 L 5 415 L 20 415" fill="none" />
          <path d="M 595 400 L 595 415 L 580 415" fill="none" />
        </g>
      </svg>
    </div>
  );
};

export default ClockSignalSVG;
