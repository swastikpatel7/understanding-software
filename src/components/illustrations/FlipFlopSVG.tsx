import { useState, useEffect } from 'react';

interface FlipFlopSVGProps {
  isPaused?: boolean;
}

const FlipFlopSVG = ({ isPaused = false }: FlipFlopSVGProps) => {
  const [clockPhase, setClockPhase] = useState(0);
  const [dataInput, setDataInput] = useState(false);
  const [qOutput, setQOutput] = useState(false);
  const [risingEdge, setRisingEdge] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setClockPhase((prev) => {
        const next = (prev + 1) % 40;
        // Data changes at various points
        if (next === 5) setDataInput(true);
        if (next === 15) setDataInput(false);
        if (next === 25) setDataInput(true);
        if (next === 35) setDataInput(false);

        // Rising edge detection (transition from LOW to HIGH)
        const wasLow = Math.floor(prev / 10) % 2 === 1;
        const isHigh = Math.floor(next / 10) % 2 === 0 && next % 10 < 5;
        if (wasLow && isHigh) {
          setRisingEdge(true);
          setQOutput(dataInput); // Capture on rising edge
          setTimeout(() => setRisingEdge(false), 200);
        }

        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPaused, dataInput]);

  const clockHigh = Math.floor(clockPhase / 10) % 2 === 0 && clockPhase % 10 < 5;

  return (
    <div className="relative w-full">
      <span className="figure-label absolute -left-4 top-1/2 -translate-y-1/2 md:-left-6">FIG.015</span>

      <svg viewBox="0 0 550 400" className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Background grid */}
        <defs>
          <pattern id="ffGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="0.5" cy="0.5" r="0.3" className="fill-primary/10" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ffGrid)" />

        {/* Title */}
        <text x="275" y="25" textAnchor="middle" className="fill-primary font-mono text-[10px] uppercase tracking-wider">
          D Flip-Flop — Edge-Triggered Memory Element
        </text>

        {/* Main D Flip-Flop Symbol */}
        <g transform="translate(180, 80)">
          <rect
            x="0"
            y="0"
            width="120"
            height="100"
            className={`stroke-primary ${risingEdge ? 'fill-primary/20' : 'fill-primary/5'}`}
            strokeWidth="2"
          />

          {/* D input */}
          <line x1="-30" y1="30" x2="0" y2="30" className={`${dataInput ? 'stroke-primary' : 'stroke-primary/30'}`} strokeWidth="2" />
          <text x="-35" y="34" textAnchor="end" className="fill-primary font-mono text-[10px]">D</text>

          {/* Clock input with edge symbol */}
          <line x1="-30" y1="70" x2="0" y2="70" className={`${clockHigh ? 'stroke-primary' : 'stroke-primary/30'}`} strokeWidth="2" />
          <polygon points="0,65 10,70 0,75" className="fill-primary" />
          <text x="-35" y="74" textAnchor="end" className="fill-primary font-mono text-[10px]">CLK</text>

          {/* Q output */}
          <line x1="120" y1="30" x2="150" y2="30" className={`${qOutput ? 'stroke-primary' : 'stroke-primary/30'}`} strokeWidth="2" />
          <text x="155" y="34" className="fill-primary font-mono text-[10px]">Q</text>

          {/* Q-bar output */}
          <line x1="120" y1="70" x2="150" y2="70" className={`${!qOutput ? 'stroke-primary' : 'stroke-primary/30'}`} strokeWidth="2" />
          <text x="155" y="74" className="fill-primary font-mono text-[10px]">Q̄</text>

          {/* Internal labels */}
          <text x="60" y="55" textAnchor="middle" className="fill-primary font-mono text-[9px]">D-FF</text>

          {/* Rising edge indicator */}
          {risingEdge && (
            <circle cx="60" cy="50" r="20" className="fill-primary/20 stroke-primary" strokeWidth="1">
              <animate attributeName="r" values="15;25;15" dur="0.3s" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="0.3s" />
            </circle>
          )}
        </g>

        {/* Signal values display */}
        <g transform="translate(370, 90)">
          <rect x="0" y="0" width="140" height="80" className="fill-primary/5 stroke-primary" strokeWidth="1" />
          <text x="70" y="15" textAnchor="middle" className="fill-primary font-mono text-[8px] uppercase">Current State</text>

          <g transform="translate(15, 30)">
            <text x="0" y="0" className="fill-primary/70 font-mono text-[9px]">D (input)</text>
            <rect x="60" y="-12" width="50" height="18" className={`stroke-primary ${dataInput ? 'fill-primary/40' : 'fill-primary/10'}`} strokeWidth="1" />
            <text x="85" y="2" textAnchor="middle" className="fill-primary font-mono text-[10px]">{dataInput ? '1' : '0'}</text>
          </g>

          <g transform="translate(15, 55)">
            <text x="0" y="0" className="fill-primary/70 font-mono text-[9px]">Q (output)</text>
            <rect x="60" y="-12" width="50" height="18" className={`stroke-primary ${qOutput ? 'fill-primary/40' : 'fill-primary/10'}`} strokeWidth="1" />
            <text x="85" y="2" textAnchor="middle" className="fill-primary font-mono text-[10px]">{qOutput ? '1' : '0'}</text>
          </g>
        </g>

        {/* Timing Diagram */}
        <g transform="translate(40, 220)">
          <text x="0" y="0" className="fill-primary font-mono text-[9px] uppercase">Timing Diagram</text>

          {/* Clock signal */}
          <g transform="translate(0, 20)">
            <text x="0" y="20" className="fill-primary font-mono text-[8px]">CLK</text>
            <g transform="translate(50, 0)">
              <rect x="0" y="0" width="420" height="30" className="fill-primary/5 stroke-primary/30" strokeWidth="0.5" />
              {/* Clock waveform */}
              <path
                d={`M 0 25 ${Array.from({ length: 8 }, (_, i) =>
                  `L ${i * 50 + 10} 25 L ${i * 50 + 10} 5 L ${i * 50 + 35} 5 L ${i * 50 + 35} 25`
                ).join(' ')} L 420 25`}
                className="fill-none stroke-primary"
                strokeWidth="1.5"
              />
              {/* Rising edge markers */}
              {[10, 60, 110, 160, 210, 260, 310, 360].map((x, i) => (
                <g key={`edge-${i}`}>
                  <line x1={x} y1="0" x2={x} y2="30" className="stroke-primary/30" strokeWidth="0.5" strokeDasharray="2 2" />
                  <polygon points={`${x},32 ${x-3},38 ${x+3},38`} className="fill-primary/50" />
                </g>
              ))}
            </g>
          </g>

          {/* D signal */}
          <g transform="translate(0, 60)">
            <text x="0" y="20" className="fill-primary font-mono text-[8px]">D</text>
            <g transform="translate(50, 0)">
              <rect x="0" y="0" width="420" height="30" className="fill-primary/5 stroke-primary/30" strokeWidth="0.5" />
              {/* D waveform - changes at various points */}
              <path
                d="M 0 25 L 25 25 L 25 5 L 150 5 L 150 25 L 250 25 L 250 5 L 350 5 L 350 25 L 420 25"
                className="fill-none stroke-primary"
                strokeWidth="1.5"
              />
            </g>
          </g>

          {/* Q signal */}
          <g transform="translate(0, 100)">
            <text x="0" y="20" className="fill-primary font-mono text-[8px]">Q</text>
            <g transform="translate(50, 0)">
              <rect x="0" y="0" width="420" height="30" className="fill-primary/5 stroke-primary/30" strokeWidth="0.5" />
              {/* Q waveform - captures D at rising edges */}
              <path
                d="M 0 25 L 60 25 L 60 5 L 160 5 L 160 25 L 260 25 L 260 5 L 360 5 L 360 25 L 420 25"
                className="fill-none stroke-primary"
                strokeWidth="1.5"
              />
              {/* Capture indicators */}
              <text x="60" y="45" textAnchor="middle" className="fill-primary/50 font-mono text-[6px]">capture</text>
              <text x="160" y="45" textAnchor="middle" className="fill-primary/50 font-mono text-[6px]">capture</text>
              <text x="260" y="45" textAnchor="middle" className="fill-primary/50 font-mono text-[6px]">capture</text>
              <text x="360" y="45" textAnchor="middle" className="fill-primary/50 font-mono text-[6px]">capture</text>
            </g>
          </g>
        </g>

        {/* Key properties */}
        <g transform="translate(40, 370)">
          <text x="0" y="0" className="fill-primary font-mono text-[8px] uppercase">Key Properties</text>
          <text x="0" y="15" className="fill-primary/70 font-mono text-[7px]">• Output Q only changes on rising clock edge</text>
          <text x="200" y="15" className="fill-primary/70 font-mono text-[7px]">• Data must be stable during setup/hold window</text>
          <text x="400" y="15" className="fill-primary/70 font-mono text-[7px]">• Holds value between clock edges</text>
        </g>

        {/* Corner markers */}
        <g className="stroke-primary/30" strokeWidth="0.5">
          <path d="M 5 20 L 5 5 L 20 5" fill="none" />
          <path d="M 545 20 L 545 5 L 530 5" fill="none" />
          <path d="M 5 380 L 5 395 L 20 395" fill="none" />
          <path d="M 545 380 L 545 395 L 530 395" fill="none" />
        </g>
      </svg>
    </div>
  );
};

export default FlipFlopSVG;
