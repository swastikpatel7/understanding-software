import { useState, useEffect } from 'react';

interface LogicGatesSVGProps {
  isPaused?: boolean;
}

const LogicGatesSVG = ({ isPaused = false }: LogicGatesSVGProps) => {
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);
  const [cyclePhase, setCyclePhase] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCyclePhase((prev) => {
        const next = (prev + 1) % 4;
        // Cycle through: 00, 01, 10, 11
        setInputA(next >= 2);
        setInputB(next % 2 === 1);
        return next;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Gate outputs
  const notA = !inputA;
  const andOut = inputA && inputB;
  const orOut = inputA || inputB;
  const nandOut = !(inputA && inputB);
  const norOut = !(inputA || inputB);
  const xorOut = inputA !== inputB;

  const wireColor = (active: boolean) => active ? 'stroke-primary' : 'stroke-primary/30';
  const fillColor = (active: boolean) => active ? 'fill-primary/30' : 'fill-primary/5';

  return (
    <div className="relative w-full">
      <span className="figure-label absolute -left-4 top-1/2 -translate-y-1/2 md:-left-6">FIG.013</span>

      <svg viewBox="0 0 600 450" className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Background grid */}
        <defs>
          <pattern id="gatesGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="0.5" cy="0.5" r="0.3" className="fill-primary/10" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gatesGrid)" />

        {/* Title */}
        <text x="300" y="25" textAnchor="middle" className="fill-primary font-mono text-[10px] uppercase tracking-wider">
          Logic Gates — Boolean Operations in Hardware
        </text>

        {/* Input panel */}
        <g transform="translate(20, 50)">
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
            Phase {cyclePhase + 1}/4
          </text>
        </g>

        {/* NOT Gate */}
        <g transform="translate(150, 55)">
          <text x="40" y="-5" textAnchor="middle" className="fill-primary font-mono text-[9px] uppercase">NOT</text>

          {/* Input wire */}
          <line x1="0" y1="30" x2="20" y2="30" className={wireColor(inputA)} strokeWidth="2" />

          {/* Triangle gate shape */}
          <path
            d="M 20 15 L 60 30 L 20 45 Z"
            className={`${fillColor(!inputA)} stroke-primary`}
            strokeWidth="1.5"
          />

          {/* Bubble (inversion) */}
          <circle cx="65" cy="30" r="5" className={`${fillColor(notA)} stroke-primary`} strokeWidth="1.5" />

          {/* Output wire */}
          <line x1="70" y1="30" x2="90" y2="30" className={wireColor(notA)} strokeWidth="2" />

          {/* Output indicator */}
          <rect x="90" y="22" width="20" height="16" className={`stroke-primary ${notA ? 'fill-primary/40' : 'fill-primary/10'}`} strokeWidth="1" />
          <text x="100" y="34" textAnchor="middle" className="fill-primary font-mono text-[8px]">{notA ? '1' : '0'}</text>

          {/* Equation */}
          <text x="40" y="60" textAnchor="middle" className="fill-primary/60 font-mono text-[7px]">¬A</text>
        </g>

        {/* AND Gate */}
        <g transform="translate(280, 55)">
          <text x="45" y="-5" textAnchor="middle" className="fill-primary font-mono text-[9px] uppercase">AND</text>

          {/* Input wires */}
          <line x1="0" y1="20" x2="20" y2="20" className={wireColor(inputA)} strokeWidth="2" />
          <line x1="0" y1="40" x2="20" y2="40" className={wireColor(inputB)} strokeWidth="2" />

          {/* Gate shape - D-shape */}
          <path
            d="M 20 10 L 20 50 L 50 50 Q 70 50 70 30 Q 70 10 50 10 Z"
            className={`${fillColor(andOut)} stroke-primary`}
            strokeWidth="1.5"
          />

          {/* Output wire */}
          <line x1="70" y1="30" x2="90" y2="30" className={wireColor(andOut)} strokeWidth="2" />

          {/* Output indicator */}
          <rect x="90" y="22" width="20" height="16" className={`stroke-primary ${andOut ? 'fill-primary/40' : 'fill-primary/10'}`} strokeWidth="1" />
          <text x="100" y="34" textAnchor="middle" className="fill-primary font-mono text-[8px]">{andOut ? '1' : '0'}</text>

          <text x="45" y="60" textAnchor="middle" className="fill-primary/60 font-mono text-[7px]">A · B</text>
        </g>

        {/* OR Gate */}
        <g transform="translate(420, 55)">
          <text x="45" y="-5" textAnchor="middle" className="fill-primary font-mono text-[9px] uppercase">OR</text>

          {/* Input wires */}
          <line x1="0" y1="20" x2="25" y2="20" className={wireColor(inputA)} strokeWidth="2" />
          <line x1="0" y1="40" x2="25" y2="40" className={wireColor(inputB)} strokeWidth="2" />

          {/* Gate shape - curved */}
          <path
            d="M 20 10 Q 30 30 20 50 Q 50 45 70 30 Q 50 15 20 10"
            className={`${fillColor(orOut)} stroke-primary`}
            strokeWidth="1.5"
          />

          {/* Output wire */}
          <line x1="70" y1="30" x2="90" y2="30" className={wireColor(orOut)} strokeWidth="2" />

          {/* Output indicator */}
          <rect x="90" y="22" width="20" height="16" className={`stroke-primary ${orOut ? 'fill-primary/40' : 'fill-primary/10'}`} strokeWidth="1" />
          <text x="100" y="34" textAnchor="middle" className="fill-primary font-mono text-[8px]">{orOut ? '1' : '0'}</text>

          <text x="45" y="60" textAnchor="middle" className="fill-primary/60 font-mono text-[7px]">A + B</text>
        </g>

        {/* NAND Gate */}
        <g transform="translate(150, 160)">
          <text x="50" y="-5" textAnchor="middle" className="fill-primary font-mono text-[9px] uppercase">NAND</text>

          {/* Input wires */}
          <line x1="0" y1="20" x2="20" y2="20" className={wireColor(inputA)} strokeWidth="2" />
          <line x1="0" y1="40" x2="20" y2="40" className={wireColor(inputB)} strokeWidth="2" />

          {/* Gate shape */}
          <path
            d="M 20 10 L 20 50 L 50 50 Q 70 50 70 30 Q 70 10 50 10 Z"
            className={`${fillColor(nandOut)} stroke-primary`}
            strokeWidth="1.5"
          />

          {/* Bubble */}
          <circle cx="75" cy="30" r="5" className={`${fillColor(nandOut)} stroke-primary`} strokeWidth="1.5" />

          {/* Output wire */}
          <line x1="80" y1="30" x2="100" y2="30" className={wireColor(nandOut)} strokeWidth="2" />

          {/* Output indicator */}
          <rect x="100" y="22" width="20" height="16" className={`stroke-primary ${nandOut ? 'fill-primary/40' : 'fill-primary/10'}`} strokeWidth="1" />
          <text x="110" y="34" textAnchor="middle" className="fill-primary font-mono text-[8px]">{nandOut ? '1' : '0'}</text>

          <text x="50" y="60" textAnchor="middle" className="fill-primary/60 font-mono text-[7px]">¬(A · B)</text>

          {/* Universal gate indicator */}
          <text x="60" y="75" textAnchor="middle" className="fill-primary/40 font-mono text-[6px]">UNIVERSAL</text>
        </g>

        {/* NOR Gate */}
        <g transform="translate(290, 160)">
          <text x="50" y="-5" textAnchor="middle" className="fill-primary font-mono text-[9px] uppercase">NOR</text>

          {/* Input wires */}
          <line x1="0" y1="20" x2="25" y2="20" className={wireColor(inputA)} strokeWidth="2" />
          <line x1="0" y1="40" x2="25" y2="40" className={wireColor(inputB)} strokeWidth="2" />

          {/* Gate shape */}
          <path
            d="M 20 10 Q 30 30 20 50 Q 50 45 70 30 Q 50 15 20 10"
            className={`${fillColor(norOut)} stroke-primary`}
            strokeWidth="1.5"
          />

          {/* Bubble */}
          <circle cx="75" cy="30" r="5" className={`${fillColor(norOut)} stroke-primary`} strokeWidth="1.5" />

          {/* Output wire */}
          <line x1="80" y1="30" x2="100" y2="30" className={wireColor(norOut)} strokeWidth="2" />

          {/* Output indicator */}
          <rect x="100" y="22" width="20" height="16" className={`stroke-primary ${norOut ? 'fill-primary/40' : 'fill-primary/10'}`} strokeWidth="1" />
          <text x="110" y="34" textAnchor="middle" className="fill-primary font-mono text-[8px]">{norOut ? '1' : '0'}</text>

          <text x="50" y="60" textAnchor="middle" className="fill-primary/60 font-mono text-[7px]">¬(A + B)</text>

          <text x="60" y="75" textAnchor="middle" className="fill-primary/40 font-mono text-[6px]">UNIVERSAL</text>
        </g>

        {/* XOR Gate */}
        <g transform="translate(430, 160)">
          <text x="45" y="-5" textAnchor="middle" className="fill-primary font-mono text-[9px] uppercase">XOR</text>

          {/* Input wires */}
          <line x1="0" y1="20" x2="20" y2="20" className={wireColor(inputA)} strokeWidth="2" />
          <line x1="0" y1="40" x2="20" y2="40" className={wireColor(inputB)} strokeWidth="2" />

          {/* Gate shape - double curved input */}
          <path
            d="M 15 10 Q 25 30 15 50"
            className="fill-none stroke-primary"
            strokeWidth="1.5"
          />
          <path
            d="M 20 10 Q 30 30 20 50 Q 50 45 70 30 Q 50 15 20 10"
            className={`${fillColor(xorOut)} stroke-primary`}
            strokeWidth="1.5"
          />

          {/* Output wire */}
          <line x1="70" y1="30" x2="90" y2="30" className={wireColor(xorOut)} strokeWidth="2" />

          {/* Output indicator */}
          <rect x="90" y="22" width="20" height="16" className={`stroke-primary ${xorOut ? 'fill-primary/40' : 'fill-primary/10'}`} strokeWidth="1" />
          <text x="100" y="34" textAnchor="middle" className="fill-primary font-mono text-[8px]">{xorOut ? '1' : '0'}</text>

          <text x="45" y="60" textAnchor="middle" className="fill-primary/60 font-mono text-[7px]">A ⊕ B</text>
        </g>

        {/* Truth Tables */}
        <g transform="translate(30, 280)">
          <text x="0" y="0" className="fill-primary font-mono text-[8px] uppercase">Truth Tables</text>

          {/* AND truth table */}
          <g transform="translate(0, 15)">
            <text x="35" y="0" textAnchor="middle" className="fill-primary font-mono text-[7px]">AND</text>
            <rect x="0" y="5" width="70" height="75" className="fill-primary/5 stroke-primary" strokeWidth="0.5" />
            <line x1="0" y1="20" x2="70" y2="20" className="stroke-primary/50" strokeWidth="0.5" />
            <line x1="25" y1="5" x2="25" y2="80" className="stroke-primary/50" strokeWidth="0.5" />
            <line x1="45" y1="5" x2="45" y2="80" className="stroke-primary/50" strokeWidth="0.5" />

            <text x="12" y="16" textAnchor="middle" className="fill-primary font-mono text-[6px]">A</text>
            <text x="35" y="16" textAnchor="middle" className="fill-primary font-mono text-[6px]">B</text>
            <text x="57" y="16" textAnchor="middle" className="fill-primary font-mono text-[6px]">Out</text>

            {[[0,0,0], [0,1,0], [1,0,0], [1,1,1]].map(([a, b, out], i) => (
              <g key={`and-${i}`} transform={`translate(0, ${30 + i * 15})`}>
                <text x="12" y="0" textAnchor="middle" className="fill-primary/70 font-mono text-[6px]">{a}</text>
                <text x="35" y="0" textAnchor="middle" className="fill-primary/70 font-mono text-[6px]">{b}</text>
                <text x="57" y="0" textAnchor="middle" className={`font-mono text-[6px] ${out ? 'fill-primary' : 'fill-primary/50'}`}>{out}</text>
              </g>
            ))}
          </g>

          {/* OR truth table */}
          <g transform="translate(90, 15)">
            <text x="35" y="0" textAnchor="middle" className="fill-primary font-mono text-[7px]">OR</text>
            <rect x="0" y="5" width="70" height="75" className="fill-primary/5 stroke-primary" strokeWidth="0.5" />
            <line x1="0" y1="20" x2="70" y2="20" className="stroke-primary/50" strokeWidth="0.5" />
            <line x1="25" y1="5" x2="25" y2="80" className="stroke-primary/50" strokeWidth="0.5" />
            <line x1="45" y1="5" x2="45" y2="80" className="stroke-primary/50" strokeWidth="0.5" />

            <text x="12" y="16" textAnchor="middle" className="fill-primary font-mono text-[6px]">A</text>
            <text x="35" y="16" textAnchor="middle" className="fill-primary font-mono text-[6px]">B</text>
            <text x="57" y="16" textAnchor="middle" className="fill-primary font-mono text-[6px]">Out</text>

            {[[0,0,0], [0,1,1], [1,0,1], [1,1,1]].map(([a, b, out], i) => (
              <g key={`or-${i}`} transform={`translate(0, ${30 + i * 15})`}>
                <text x="12" y="0" textAnchor="middle" className="fill-primary/70 font-mono text-[6px]">{a}</text>
                <text x="35" y="0" textAnchor="middle" className="fill-primary/70 font-mono text-[6px]">{b}</text>
                <text x="57" y="0" textAnchor="middle" className={`font-mono text-[6px] ${out ? 'fill-primary' : 'fill-primary/50'}`}>{out}</text>
              </g>
            ))}
          </g>

          {/* XOR truth table */}
          <g transform="translate(180, 15)">
            <text x="35" y="0" textAnchor="middle" className="fill-primary font-mono text-[7px]">XOR</text>
            <rect x="0" y="5" width="70" height="75" className="fill-primary/5 stroke-primary" strokeWidth="0.5" />
            <line x1="0" y1="20" x2="70" y2="20" className="stroke-primary/50" strokeWidth="0.5" />
            <line x1="25" y1="5" x2="25" y2="80" className="stroke-primary/50" strokeWidth="0.5" />
            <line x1="45" y1="5" x2="45" y2="80" className="stroke-primary/50" strokeWidth="0.5" />

            <text x="12" y="16" textAnchor="middle" className="fill-primary font-mono text-[6px]">A</text>
            <text x="35" y="16" textAnchor="middle" className="fill-primary font-mono text-[6px]">B</text>
            <text x="57" y="16" textAnchor="middle" className="fill-primary font-mono text-[6px]">Out</text>

            {[[0,0,0], [0,1,1], [1,0,1], [1,1,0]].map(([a, b, out], i) => (
              <g key={`xor-${i}`} transform={`translate(0, ${30 + i * 15})`}>
                <text x="12" y="0" textAnchor="middle" className="fill-primary/70 font-mono text-[6px]">{a}</text>
                <text x="35" y="0" textAnchor="middle" className="fill-primary/70 font-mono text-[6px]">{b}</text>
                <text x="57" y="0" textAnchor="middle" className={`font-mono text-[6px] ${out ? 'fill-primary' : 'fill-primary/50'}`}>{out}</text>
              </g>
            ))}
          </g>
        </g>

        {/* Transistor count info */}
        <g transform="translate(320, 280)">
          <text x="0" y="0" className="fill-primary font-mono text-[8px] uppercase">Transistor Count</text>

          <g transform="translate(0, 15)">
            {[
              ['NOT', '2'],
              ['NAND', '4'],
              ['NOR', '4'],
              ['AND', '6'],
              ['OR', '6'],
              ['XOR', '8-12'],
            ].map(([gate, count], i) => (
              <g key={gate} transform={`translate(${(i % 3) * 90}, ${Math.floor(i / 3) * 30 + 10})`}>
                <rect x="0" y="0" width="80" height="22" className="fill-primary/5 stroke-primary/50" strokeWidth="0.5" />
                <text x="10" y="15" className="fill-primary font-mono text-[8px]">{gate}</text>
                <text x="70" y="15" textAnchor="end" className="fill-primary/60 font-mono text-[8px]">{count}</text>
              </g>
            ))}
          </g>
        </g>

        {/* Footer annotation */}
        <text x="300" y="435" textAnchor="middle" className="fill-primary/50 font-mono text-[7px]">
          NAND and NOR are universal gates — any Boolean function can be built using only NAND (or only NOR)
        </text>

        {/* Corner markers */}
        <g className="stroke-primary/30" strokeWidth="0.5">
          <path d="M 5 20 L 5 5 L 20 5" fill="none" />
          <path d="M 595 20 L 595 5 L 580 5" fill="none" />
          <path d="M 5 430 L 5 445 L 20 445" fill="none" />
          <path d="M 595 430 L 595 445 L 580 445" fill="none" />
        </g>
      </svg>
    </div>
  );
};

export default LogicGatesSVG;
