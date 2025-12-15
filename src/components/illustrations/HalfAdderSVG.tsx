import { useState, useEffect } from 'react';

interface HalfAdderSVGProps {
  isPaused?: boolean;
}

const HalfAdderSVG = ({ isPaused = false }: HalfAdderSVGProps) => {
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);
  const [cyclePhase, setCyclePhase] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCyclePhase((prev) => {
        const next = (prev + 1) % 4;
        setInputA(next >= 2);
        setInputB(next % 2 === 1);
        return next;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const sum = inputA !== inputB; // XOR
  const carry = inputA && inputB; // AND

  const wireColor = (active: boolean) => active ? 'stroke-primary' : 'stroke-primary/30';
  const fillColor = (active: boolean) => active ? 'fill-primary/30' : 'fill-primary/5';

  return (
    <div className="relative w-full">
      <span className="figure-label absolute -left-4 top-1/2 -translate-y-1/2 md:-left-6">FIG.014</span>

      <svg viewBox="0 0 550 380" className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Background grid */}
        <defs>
          <pattern id="adderGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="0.5" cy="0.5" r="0.3" className="fill-primary/10" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#adderGrid)" />

        {/* Title */}
        <text x="275" y="25" textAnchor="middle" className="fill-primary font-mono text-[10px] uppercase tracking-wider">
          Combinational Circuit — Half Adder
        </text>

        {/* Input panel */}
        <g transform="translate(30, 50)">
          <rect x="0" y="0" width="100" height="80" className="fill-primary/5 stroke-primary" strokeWidth="1" />
          <text x="50" y="15" textAnchor="middle" className="fill-primary font-mono text-[8px] uppercase">Inputs</text>

          <g transform="translate(15, 30)">
            <rect
              x="0" y="0" width="30" height="20"
              className={`stroke-primary ${inputA ? 'fill-primary/40' : 'fill-primary/10'}`}
              strokeWidth="1"
            />
            <text x="15" y="14" textAnchor="middle" className="fill-primary font-mono text-[10px]">A={inputA ? '1' : '0'}</text>
          </g>

          <g transform="translate(55, 30)">
            <rect
              x="0" y="0" width="30" height="20"
              className={`stroke-primary ${inputB ? 'fill-primary/40' : 'fill-primary/10'}`}
              strokeWidth="1"
            />
            <text x="15" y="14" textAnchor="middle" className="fill-primary font-mono text-[10px]">B={inputB ? '1' : '0'}</text>
          </g>

          <text x="50" y="70" textAnchor="middle" className="fill-primary/50 font-mono text-[7px]">
            Binary Addition: {inputA ? '1' : '0'} + {inputB ? '1' : '0'}
          </text>
        </g>

        {/* Half Adder Circuit */}
        <g transform="translate(160, 60)">
          <text x="100" y="-10" textAnchor="middle" className="fill-primary font-mono text-[9px] uppercase">Half Adder Circuit</text>

          {/* Input A wire */}
          <line x1="0" y1="30" x2="30" y2="30" className={wireColor(inputA)} strokeWidth="2" />
          <text x="-10" y="34" textAnchor="end" className="fill-primary font-mono text-[9px]">A</text>

          {/* Input A branch point */}
          <circle cx="30" cy="30" r="3" className={`${fillColor(inputA)} stroke-primary`} strokeWidth="1" />

          {/* Input B wire */}
          <line x1="0" y1="80" x2="30" y2="80" className={wireColor(inputB)} strokeWidth="2" />
          <text x="-10" y="84" textAnchor="end" className="fill-primary font-mono text-[9px]">B</text>

          {/* Input B branch point */}
          <circle cx="30" cy="80" r="3" className={`${fillColor(inputB)} stroke-primary`} strokeWidth="1" />

          {/* XOR Gate for Sum */}
          <g transform="translate(60, 15)">
            <text x="35" y="-8" textAnchor="middle" className="fill-primary/60 font-mono text-[7px]">XOR</text>

            {/* Wires to XOR */}
            <line x1="-30" y1="15" x2="10" y2="15" className={wireColor(inputA)} strokeWidth="1.5" />
            <line x1="-30" y1="65" x2="-15" y2="65" className={wireColor(inputB)} strokeWidth="1.5" />
            <line x1="-15" y1="65" x2="-15" y2="35" className={wireColor(inputB)} strokeWidth="1.5" />
            <line x1="-15" y1="35" x2="10" y2="35" className={wireColor(inputB)} strokeWidth="1.5" />

            {/* XOR gate shape */}
            <path
              d="M 5 5 Q 15 25 5 45"
              className="fill-none stroke-primary"
              strokeWidth="1.5"
            />
            <path
              d="M 10 5 Q 20 25 10 45 Q 40 40 60 25 Q 40 10 10 5"
              className={`${fillColor(sum)} stroke-primary`}
              strokeWidth="1.5"
            />

            {/* Output wire */}
            <line x1="60" y1="25" x2="100" y2="25" className={wireColor(sum)} strokeWidth="2" />
          </g>

          {/* AND Gate for Carry */}
          <g transform="translate(60, 85)">
            <text x="35" y="-8" textAnchor="middle" className="fill-primary/60 font-mono text-[7px]">AND</text>

            {/* Wires to AND */}
            <line x1="-30" y1="-55" x2="-25" y2="-55" className={wireColor(inputA)} strokeWidth="1.5" />
            <line x1="-25" y1="-55" x2="-25" y2="15" className={wireColor(inputA)} strokeWidth="1.5" />
            <line x1="-25" y1="15" x2="10" y2="15" className={wireColor(inputA)} strokeWidth="1.5" />
            <line x1="-30" y1="-5" x2="-20" y2="-5" className={wireColor(inputB)} strokeWidth="1.5" />
            <line x1="-20" y1="-5" x2="-20" y2="35" className={wireColor(inputB)} strokeWidth="1.5" />
            <line x1="-20" y1="35" x2="10" y2="35" className={wireColor(inputB)} strokeWidth="1.5" />

            {/* AND gate shape */}
            <path
              d="M 10 5 L 10 45 L 40 45 Q 60 45 60 25 Q 60 5 40 5 Z"
              className={`${fillColor(carry)} stroke-primary`}
              strokeWidth="1.5"
            />

            {/* Output wire */}
            <line x1="60" y1="25" x2="100" y2="25" className={wireColor(carry)} strokeWidth="2" />
          </g>

          {/* Output labels */}
          <g transform="translate(165, 40)">
            <text x="0" y="0" className="fill-primary font-mono text-[9px]">Sum</text>
            <rect x="30" y="-12" width="30" height="18" className={`stroke-primary ${sum ? 'fill-primary/40' : 'fill-primary/10'}`} strokeWidth="1" />
            <text x="45" y="2" textAnchor="middle" className="fill-primary font-mono text-[10px]">{sum ? '1' : '0'}</text>
          </g>

          <g transform="translate(165, 110)">
            <text x="0" y="0" className="fill-primary font-mono text-[9px]">Carry</text>
            <rect x="30" y="-12" width="30" height="18" className={`stroke-primary ${carry ? 'fill-primary/40' : 'fill-primary/10'}`} strokeWidth="1" />
            <text x="45" y="2" textAnchor="middle" className="fill-primary font-mono text-[10px]">{carry ? '1' : '0'}</text>
          </g>

          {/* Result explanation */}
          <g transform="translate(210, 60)">
            <rect x="0" y="0" width="100" height="50" className="fill-primary/5 stroke-primary" strokeWidth="1" />
            <text x="50" y="15" textAnchor="middle" className="fill-primary font-mono text-[8px]">Binary Result</text>
            <text x="50" y="35" textAnchor="middle" className="fill-primary font-mono text-[12px]">
              {carry ? '1' : '0'}{sum ? '1' : '0'}₂ = {(carry ? 2 : 0) + (sum ? 1 : 0)}₁₀
            </text>
          </g>
        </g>

        {/* Truth Table */}
        <g transform="translate(30, 200)">
          <text x="0" y="0" className="fill-primary font-mono text-[9px] uppercase">Truth Table</text>

          <g transform="translate(0, 15)">
            <rect x="0" y="0" width="200" height="120" className="fill-primary/5 stroke-primary" strokeWidth="1" />

            {/* Headers */}
            <line x1="0" y1="20" x2="200" y2="20" className="stroke-primary/50" strokeWidth="0.5" />
            <line x1="50" y1="0" x2="50" y2="120" className="stroke-primary/50" strokeWidth="0.5" />
            <line x1="100" y1="0" x2="100" y2="120" className="stroke-primary/50" strokeWidth="0.5" />
            <line x1="150" y1="0" x2="150" y2="120" className="stroke-primary/50" strokeWidth="0.5" />

            <text x="25" y="14" textAnchor="middle" className="fill-primary font-mono text-[8px]">A</text>
            <text x="75" y="14" textAnchor="middle" className="fill-primary font-mono text-[8px]">B</text>
            <text x="125" y="14" textAnchor="middle" className="fill-primary font-mono text-[8px]">Sum</text>
            <text x="175" y="14" textAnchor="middle" className="fill-primary font-mono text-[8px]">Carry</text>

            {/* Data rows */}
            {[[0, 0, 0, 0], [0, 1, 1, 0], [1, 0, 1, 0], [1, 1, 0, 1]].map(([a, b, s, c], i) => {
              const isCurrentRow = (inputA ? 1 : 0) === a && (inputB ? 1 : 0) === b;
              return (
                <g key={`row-${i}`} transform={`translate(0, ${30 + i * 22})`}>
                  {isCurrentRow && (
                    <rect x="1" y="-2" width="198" height="20" className="fill-primary/20" />
                  )}
                  <text x="25" y="12" textAnchor="middle" className={`font-mono text-[9px] ${isCurrentRow ? 'fill-primary' : 'fill-primary/60'}`}>{a}</text>
                  <text x="75" y="12" textAnchor="middle" className={`font-mono text-[9px] ${isCurrentRow ? 'fill-primary' : 'fill-primary/60'}`}>{b}</text>
                  <text x="125" y="12" textAnchor="middle" className={`font-mono text-[9px] ${isCurrentRow ? 'fill-primary' : 'fill-primary/60'}`}>{s}</text>
                  <text x="175" y="12" textAnchor="middle" className={`font-mono text-[9px] ${isCurrentRow ? 'fill-primary' : 'fill-primary/60'}`}>{c}</text>
                </g>
              );
            })}
          </g>
        </g>

        {/* Boolean Equations */}
        <g transform="translate(260, 200)">
          <text x="0" y="0" className="fill-primary font-mono text-[9px] uppercase">Boolean Equations</text>

          <g transform="translate(0, 20)">
            <rect x="0" y="0" width="250" height="80" className="fill-primary/5 stroke-primary" strokeWidth="1" />

            <text x="20" y="25" className="fill-primary font-mono text-[10px]">Sum = A ⊕ B</text>
            <text x="140" y="25" className="fill-primary/50 font-mono text-[8px]">(XOR)</text>

            <text x="20" y="50" className="fill-primary font-mono text-[10px]">Carry = A · B</text>
            <text x="140" y="50" className="fill-primary/50 font-mono text-[8px]">(AND)</text>

            <text x="20" y="70" className="fill-primary/50 font-mono text-[7px]">Total gates: 1 XOR + 1 AND = 2 gates</text>
          </g>
        </g>

        {/* Ripple Carry Extension hint */}
        <g transform="translate(30, 345)">
          <text x="0" y="0" className="fill-primary/60 font-mono text-[7px]">
            Chain multiple full adders (half adder + carry-in) to build N-bit ripple carry adders
          </text>
          <text x="0" y="12" className="fill-primary/50 font-mono text-[7px]">
            Critical path delay: O(n) — carry must propagate through all stages
          </text>
        </g>

        {/* Corner markers */}
        <g className="stroke-primary/30" strokeWidth="0.5">
          <path d="M 5 20 L 5 5 L 20 5" fill="none" />
          <path d="M 545 20 L 545 5 L 530 5" fill="none" />
          <path d="M 5 360 L 5 375 L 20 375" fill="none" />
          <path d="M 545 360 L 545 375 L 530 375" fill="none" />
        </g>
      </svg>
    </div>
  );
};

export default HalfAdderSVG;
