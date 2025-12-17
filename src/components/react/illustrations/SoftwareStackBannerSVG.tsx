import { useState, useEffect } from 'react';

interface CPUSchematicSVGProps {
  isPaused?: boolean;
}

const SoftwareStackBannerSVG = ({ isPaused = false }: CPUSchematicSVGProps) => {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const [dataPulse, setDataPulse] = useState(0);
  const [registerValues, setRegisterValues] = useState(['0xDEAD', '0xBEEF', '0xCAFE', '0x1337']);

  // Data pulse animation along buses - smooth and slow
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDataPulse(prev => (prev + 1) % 200);
    }, 80);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Register value flicker - subtle and slow
  useEffect(() => {
    if (isPaused) return;
    const hexChars = '0123456789ABCDEF';
    const interval = setInterval(() => {
      setRegisterValues(prev => prev.map((val) => {
        if (Math.random() > 0.85) {
          const newHex = Array.from({ length: 4 }, () => hexChars[Math.floor(Math.random() * 16)]).join('');
          return `0x${newHex}`;
        }
        return val;
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const isHovered = (id: string) => hoveredComponent === id;

  // Annotation with leader line
  const Annotation = ({ x, y, label, align = 'left', small = false }: { x: number; y: number; label: string; align?: 'left' | 'right'; small?: boolean }) => (
    <text
      x={x}
      y={y}
      textAnchor={align === 'left' ? 'start' : 'end'}
      className={`fill-primary font-mono ${small ? 'text-[5px]' : 'text-[6px]'} uppercase`}
    >
      {label}
    </text>
  );

  // Leader line helper
  const LeaderLine = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-primary/40" strokeWidth="0.5" />
  );

  // CPU Core component
  const CPUCore = ({ x, y, coreId }: { x: number; y: number; coreId: number }) => (
    <g
      transform={`translate(${x}, ${y})`}
      onMouseEnter={() => setHoveredComponent(`core${coreId}`)}
      onMouseLeave={() => setHoveredComponent(null)}
      className="cursor-pointer"
    >
      {/* Core outline */}
      <rect
        x="0" y="0" width="100" height="120"
        className={`fill-primary/5 stroke-primary transition-all duration-200 ${isHovered(`core${coreId}`) ? 'fill-primary/15' : ''}`}
        strokeWidth="1"
      />

      {/* Core label */}
      <text x="50" y="12" textAnchor="middle" className="fill-primary font-mono text-[7px] uppercase">
        CORE {coreId}
      </text>
      <line x1="10" y1="16" x2="90" y2="16" className="stroke-primary/30" strokeWidth="0.5" />

      {/* Fetch Unit */}
      <rect x="8" y="22" width="40" height="18" className="fill-none stroke-primary/60" strokeWidth="0.5" />
      <text x="28" y="33" textAnchor="middle" className="fill-primary/80 font-mono text-[5px]">FETCH</text>

      {/* Decode Unit */}
      <rect x="52" y="22" width="40" height="18" className="fill-none stroke-primary/60" strokeWidth="0.5" />
      <text x="72" y="33" textAnchor="middle" className="fill-primary/80 font-mono text-[5px]">DECODE</text>

      {/* ALU */}
      <rect x="20" y="44" width="60" height="24" className="fill-primary/10 stroke-primary" strokeWidth="0.75" />
      <text x="50" y="58" textAnchor="middle" className="fill-primary font-mono text-[6px]">ALU</text>

      {/* Registers (grid) */}
      <g transform="translate(8, 72)">
        <text x="0" y="-2" className="fill-primary/60 font-mono text-[4px]">REGISTERS</text>
        {[0, 1, 2, 3].map((row) => (
          [0, 1, 2, 3].map((col) => (
            <rect
              key={`reg-${row}-${col}`}
              x={col * 10}
              y={row * 8}
              width="8"
              height="6"
              className="fill-primary/10 stroke-primary/40"
              strokeWidth="0.3"
            />
          ))
        ))}
      </g>

      {/* L1 Cache indicator */}
      <g transform="translate(52, 72)">
        <rect x="0" y="0" width="40" height="14" className="fill-primary/5 stroke-primary/60" strokeWidth="0.5" strokeDasharray="2 1" />
        <text x="20" y="9" textAnchor="middle" className="fill-primary/70 font-mono text-[4px]">L1: 64KB</text>
        <rect x="0" y="18" width="40" height="14" className="fill-primary/5 stroke-primary/60" strokeWidth="0.5" strokeDasharray="2 1" />
        <text x="20" y="27" textAnchor="middle" className="fill-primary/70 font-mono text-[4px]">L2: 512KB</text>
      </g>

      {/* Pipeline stages indicator */}
      <g transform="translate(8, 108)">
        {[0, 1, 2, 3, 4].map((i) => (
          <circle
            key={`pipe-${i}`}
            cx={8 + i * 18}
            cy="4"
            r="2"
            className={`stroke-primary/60 ${(dataPulse + coreId * 40) % 200 > i * 40 ? 'fill-primary/35' : 'fill-none'}`}
            strokeWidth="0.5"
          />
        ))}
      </g>
    </g>
  );

  return (
    <div className="relative w-full">
      <span className="figure-label absolute -left-4 top-1/2 -translate-y-1/2 md:-left-6">FIG.001</span>

      <svg viewBox="0 0 1000 450" className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Background grid - subtle */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="0.5" cy="0.5" r="0.3" className="fill-primary/10" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* ==================== MEMORY SUBSYSTEM (LEFT) ==================== */}
        <g transform="translate(30, 60)">
          {/* Memory Controller */}
          <g
            onMouseEnter={() => setHoveredComponent('memctrl')}
            onMouseLeave={() => setHoveredComponent(null)}
            className="cursor-pointer"
          >
            <rect
              x="0" y="0" width="80" height="140"
              className={`fill-primary/5 stroke-primary transition-all duration-200 ${isHovered('memctrl') ? 'fill-primary/15' : ''}`}
              strokeWidth="1"
            />
            <text x="40" y="16" textAnchor="middle" className="fill-primary font-mono text-[7px] uppercase">Memory</text>
            <text x="40" y="26" textAnchor="middle" className="fill-primary font-mono text-[7px] uppercase">Controller</text>
            <line x1="8" y1="32" x2="72" y2="32" className="stroke-primary/30" strokeWidth="0.5" />

            {/* Channel indicators */}
            <text x="12" y="46" className="fill-primary/70 font-mono text-[5px]">CH-A</text>
            <rect x="12" y="50" width="56" height="8" className="fill-primary/10 stroke-primary/40" strokeWidth="0.5" />
            <text x="12" y="68" className="fill-primary/70 font-mono text-[5px]">CH-B</text>
            <rect x="12" y="72" width="56" height="8" className="fill-primary/40 stroke-primary/40" strokeWidth="0.5" />

            {/* Timing info */}
            <text x="12" y="95" className="fill-primary/50 font-mono text-[4px]">CAS LATENCY: 16</text>
            <text x="12" y="103" className="fill-primary/50 font-mono text-[4px]">tRCD: 16</text>
            <text x="12" y="111" className="fill-primary/50 font-mono text-[4px]">tRP: 16</text>
            <text x="12" y="119" className="fill-primary/50 font-mono text-[4px]">tRAS: 36</text>

            {/* Address space */}
            <text x="12" y="133" className="fill-primary/60 font-mono text-[4px]">0x0000_0000</text>
          </g>

          {/* DRAM Modules */}
          <g transform="translate(0, 160)">
            <text x="40" y="-4" textAnchor="middle" className="fill-primary/60 font-mono text-[5px]">DDR5 DIMM SLOTS</text>
            {[0, 1, 2, 3].map((i) => (
              <g key={`dimm-${i}`} transform={`translate(0, ${i * 28})`}>
                <rect x="0" y="0" width="80" height="24" className="fill-none stroke-primary/60" strokeWidth="0.5" />
                {/* Memory chips representation */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((chip) => (
                  <rect
                    key={`chip-${chip}`}
                    x={4 + chip * 9}
                    y="4"
                    width="7"
                    height="16"
                    className="fill-primary/10 stroke-primary/30"
                    strokeWidth="0.3"
                  />
                ))}
                <text x="84" y="14" className="fill-primary/50 font-mono text-[4px]">{i < 2 ? '16GB' : 'EMPTY'}</text>
              </g>
            ))}
          </g>

          {/* Annotations */}
          <LeaderLine x1="80" y1="70" x2="100" y2="70" />
          <Annotation x={102} y={72} label="64-BIT BUS" small />

          <LeaderLine x1="80" y1="30" x2="100" y2="20" />
          <Annotation x={102} y={22} label="IMC" small />
        </g>

        {/* Memory to CPU bus */}
        <g className="stroke-primary/60" strokeWidth="1">
          <line x1="110" y1="130" x2="200" y2="130" strokeDasharray="4 2" />
          <line x1="110" y1="140" x2="200" y2="140" />
          <line x1="110" y1="150" x2="200" y2="150" strokeDasharray="4 2" />
          {/* Data pulse - smooth */}
          <circle cx={110 + (dataPulse % 100) * 0.9} cy="140" r="2.5" className="fill-primary/50" />
        </g>
        <Annotation x={155} y={122} label="DATA" small />
        <Annotation x={155} y={162} label="ADDR" small />

        {/* ==================== CPU DIE (CENTER) ==================== */}
        <g transform="translate(200, 30)">
          {/* CPU Die outline */}
          <rect
            x="0" y="0" width="540" height="380"
            className="fill-none stroke-primary"
            strokeWidth="1.5"
          />

          {/* Die label */}
          <text x="270" y="-8" textAnchor="middle" className="fill-primary font-mono text-[8px] uppercase tracking-wider">
            CPU Die — 7nm Process
          </text>

          {/* Pin array (top) */}
          <g transform="translate(20, -12)">
            {Array.from({ length: 50 }).map((_, i) => (
              <rect key={`pin-t-${i}`} x={i * 10} y="0" width="6" height="10" className="fill-primary/20 stroke-primary/40" strokeWidth="0.3" />
            ))}
          </g>

          {/* Pin array (bottom) */}
          <g transform="translate(20, 382)">
            {Array.from({ length: 50 }).map((_, i) => (
              <rect key={`pin-b-${i}`} x={i * 10} y="0" width="6" height="10" className="fill-primary/20 stroke-primary/40" strokeWidth="0.3" />
            ))}
          </g>

          {/* Pin array (left) */}
          <g transform="translate(-12, 20)">
            {Array.from({ length: 34 }).map((_, i) => (
              <rect key={`pin-l-${i}`} x="0" y={i * 10} width="10" height="6" className="fill-primary/20 stroke-primary/40" strokeWidth="0.3" />
            ))}
          </g>

          {/* Pin array (right) */}
          <g transform="translate(542, 20)">
            {Array.from({ length: 34 }).map((_, i) => (
              <rect key={`pin-r-${i}`} x="0" y={i * 10} width="10" height="6" className="fill-primary/20 stroke-primary/40" strokeWidth="0.3" />
            ))}
          </g>

          {/* CPU Cores */}
          <CPUCore x={20} y={20} coreId={0} />
          <CPUCore x={140} y={20} coreId={1} />
          <CPUCore x={260} y={20} coreId={2} />
          <CPUCore x={380} y={20} coreId={3} />

          {/* Ring Bus / Interconnect */}
          <g transform="translate(20, 150)">
            <rect x="0" y="0" width="500" height="30" className="fill-primary/5 stroke-primary" strokeWidth="1" strokeDasharray="6 3" />
            <text x="250" y="19" textAnchor="middle" className="fill-primary font-mono text-[6px]">RING BUS INTERCONNECT — 256-BIT</text>

            {/* Data flow indicators - smooth flowing dots */}
            {[0, 1, 2].map((i) => {
              const xPos = ((dataPulse * 2.5) + i * 160) % 480 + 10;
              return (
                <circle
                  key={`flow-${i}`}
                  cx={xPos}
                  cy="15"
                  r="3"
                  className="fill-primary/30"
                />
              );
            })}
          </g>

          {/* L3 Cache */}
          <g transform="translate(20, 195)">
            <rect x="0" y="0" width="500" height="60" className="fill-primary/5 stroke-primary" strokeWidth="1" />
            <text x="250" y="16" textAnchor="middle" className="fill-primary font-mono text-[7px] uppercase">L3 Shared Cache</text>
            <text x="250" y="28" textAnchor="middle" className="fill-primary/60 font-mono text-[5px]">8MB — 16-WAY SET ASSOCIATIVE</text>

            {/* Cache line visualization - deterministic pattern */}
            <g transform="translate(10, 36)">
              {Array.from({ length: 24 }).map((_, i) => (
                <rect
                  key={`cache-${i}`}
                  x={i * 20}
                  y="0"
                  width="18"
                  height="14"
                  className={`stroke-primary/30 ${[0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20, 22].includes(i) ? 'fill-primary/12' : 'fill-none'}`}
                  strokeWidth="0.3"
                />
              ))}
            </g>

            {/* Cache stats */}
            <text x="490" y="45" textAnchor="end" className="fill-primary/50 font-mono text-[4px]">HIT RATE: 94.2%</text>
            <text x="490" y="53" textAnchor="end" className="fill-primary/50 font-mono text-[4px]">LATENCY: 42 CYC</text>
          </g>

          {/* Uncore / System Agent */}
          <g transform="translate(20, 270)">
            <rect x="0" y="0" width="240" height="90" className="fill-primary/5 stroke-primary" strokeWidth="1" />
            <text x="120" y="14" textAnchor="middle" className="fill-primary font-mono text-[6px] uppercase">System Agent</text>
            <line x1="10" y1="20" x2="230" y2="20" className="stroke-primary/30" strokeWidth="0.5" />

            {/* PCIe Root Complex */}
            <rect x="10" y="28" width="70" height="28" className="fill-none stroke-primary/60" strokeWidth="0.5" />
            <text x="45" y="44" textAnchor="middle" className="fill-primary/70 font-mono text-[5px]">PCIe ROOT</text>

            {/* DMI */}
            <rect x="90" y="28" width="60" height="28" className="fill-none stroke-primary/60" strokeWidth="0.5" />
            <text x="120" y="44" textAnchor="middle" className="fill-primary/70 font-mono text-[5px]">DMI 4.0</text>

            {/* Display Engine */}
            <rect x="160" y="28" width="70" height="28" className="fill-none stroke-primary/60" strokeWidth="0.5" />
            <text x="195" y="44" textAnchor="middle" className="fill-primary/70 font-mono text-[5px]">DISPLAY</text>

            {/* Power Management */}
            <rect x="10" y="62" width="100" height="20" className="fill-none stroke-primary/60" strokeWidth="0.5" />
            <text x="60" y="75" textAnchor="middle" className="fill-primary/70 font-mono text-[5px]">POWER MGMT</text>

            {/* Thermal */}
            <rect x="120" y="62" width="110" height="20" className="fill-none stroke-primary/60" strokeWidth="0.5" />
            <text x="175" y="75" textAnchor="middle" className="fill-primary/70 font-mono text-[5px]">THERMAL: 65°C</text>
          </g>

          {/* Clock Distribution */}
          <g transform="translate(280, 270)">
            <rect x="0" y="0" width="240" height="90" className="fill-primary/5 stroke-primary" strokeWidth="1" />
            <text x="120" y="14" textAnchor="middle" className="fill-primary font-mono text-[6px] uppercase">Clock & Power</text>
            <line x1="10" y1="20" x2="230" y2="20" className="stroke-primary/30" strokeWidth="0.5" />

            {/* PLL */}
            <rect x="10" y="28" width="60" height="28" className="fill-none stroke-primary/60" strokeWidth="0.5" />
            <text x="40" y="44" textAnchor="middle" className="fill-primary/70 font-mono text-[5px]">PLL</text>

            {/* Clock waveform */}
            <g transform="translate(80, 30)">
              <text x="0" y="-2" className="fill-primary/50 font-mono text-[4px]">BASE CLK</text>
              <polyline
                points="0,12 5,12 5,0 15,0 15,12 25,12 25,0 35,0 35,12 45,12 45,0 55,0 55,12 65,12"
                className="fill-none stroke-primary/60"
                strokeWidth="0.5"
              />
              <text x="70" y="8" className="fill-primary/60 font-mono text-[4px]">100MHz</text>
            </g>

            {/* Frequencies */}
            <g transform="translate(10, 62)">
              <text x="0" y="8" className="fill-primary/50 font-mono text-[4px]">CORE: 4.8GHz</text>
              <text x="0" y="16" className="fill-primary/50 font-mono text-[4px]">UNCORE: 2.4GHz</text>
              <text x="80" y="8" className="fill-primary/50 font-mono text-[4px]">RING: 3.6GHz</text>
              <text x="80" y="16" className="fill-primary/50 font-mono text-[4px]">MEM: 3200MT/s</text>
              <text x="160" y="8" className="fill-primary/50 font-mono text-[4px]">VCC: 1.25V</text>
              <text x="160" y="16" className="fill-primary/50 font-mono text-[4px]">TDP: 125W</text>
            </g>
          </g>

          {/* Annotations for CPU die */}
          <LeaderLine x1={120} y1={75} x2={-20} y2={60} />
          <text x="-25" y="58" textAnchor="end" className="fill-primary font-mono text-[5px]">FETCH UNIT</text>

          <LeaderLine x1={70} y1={108} x2={-20} y2={100} />
          <text x="-25" y="98" textAnchor="end" className="fill-primary font-mono text-[5px]">REGISTER FILE</text>

          <LeaderLine x1={520} y1={220} x2={560} y2={210} />
          <text x="565" y="208" className="fill-primary font-mono text-[5px]">L3 CACHE</text>
        </g>

        {/* ==================== I/O SUBSYSTEM (RIGHT) ==================== */}
        <g transform="translate(780, 60)">
          {/* I/O Controller */}
          <g
            onMouseEnter={() => setHoveredComponent('ioctrl')}
            onMouseLeave={() => setHoveredComponent(null)}
            className="cursor-pointer"
          >
            <rect
              x="0" y="0" width="180" height="320"
              className={`fill-primary/5 stroke-primary transition-all duration-200 ${isHovered('ioctrl') ? 'fill-primary/15' : ''}`}
              strokeWidth="1"
            />
            <text x="90" y="16" textAnchor="middle" className="fill-primary font-mono text-[7px] uppercase">I/O Hub</text>
            <line x1="10" y1="22" x2="170" y2="22" className="stroke-primary/30" strokeWidth="0.5" />

            {/* PCIe Slots */}
            <g transform="translate(10, 32)">
              <text x="0" y="8" className="fill-primary/60 font-mono text-[5px]">PCIe 5.0 LANES</text>

              <rect x="0" y="14" width="160" height="22" className="fill-primary/10 stroke-primary/60" strokeWidth="0.5" />
              <text x="5" y="28" className="fill-primary font-mono text-[5px]">x16 — GPU</text>
              <text x="130" y="28" className="fill-primary/50 font-mono text-[4px]">64GB/s</text>

              <rect x="0" y="40" width="80" height="18" className="fill-primary/5 stroke-primary/60" strokeWidth="0.5" />
              <text x="5" y="52" className="fill-primary/70 font-mono text-[5px]">x8 — NVMe</text>

              <rect x="85" y="40" width="75" height="18" className="fill-primary/5 stroke-primary/60" strokeWidth="0.5" />
              <text x="90" y="52" className="fill-primary/70 font-mono text-[5px]">x4 — NET</text>

              <rect x="0" y="62" width="40" height="14" className="fill-none stroke-primary/40" strokeWidth="0.5" />
              <text x="5" y="72" className="fill-primary/50 font-mono text-[4px]">x1</text>
              <rect x="45" y="62" width="40" height="14" className="fill-none stroke-primary/40" strokeWidth="0.5" />
              <text x="50" y="72" className="fill-primary/50 font-mono text-[4px]">x1</text>
              <rect x="90" y="62" width="40" height="14" className="fill-none stroke-primary/40" strokeWidth="0.5" />
              <text x="95" y="72" className="fill-primary/50 font-mono text-[4px]">x1</text>
            </g>

            {/* USB Controller */}
            <g transform="translate(10, 120)">
              <text x="0" y="8" className="fill-primary/60 font-mono text-[5px]">USB CONTROLLER</text>
              <rect x="0" y="12" width="160" height="36" className="fill-none stroke-primary/60" strokeWidth="0.5" />

              <text x="8" y="26" className="fill-primary/70 font-mono text-[5px]">USB 3.2 Gen2</text>
              <g transform="translate(8, 30)">
                {[0, 1, 2, 3].map((i) => (
                  <rect key={`usb3-${i}`} x={i * 18} y="0" width="14" height="10" className="fill-primary/20 stroke-primary/40" strokeWidth="0.3" />
                ))}
              </g>

              <text x="90" y="26" className="fill-primary/70 font-mono text-[5px]">USB 2.0</text>
              <g transform="translate(90, 30)">
                {[0, 1, 2, 3].map((i) => (
                  <rect key={`usb2-${i}`} x={i * 14} y="0" width="10" height="10" className="fill-primary/10 stroke-primary/30" strokeWidth="0.3" />
                ))}
              </g>
            </g>

            {/* SATA Controller */}
            <g transform="translate(10, 175)">
              <text x="0" y="8" className="fill-primary/60 font-mono text-[5px]">SATA 6Gb/s</text>
              <g transform="translate(0, 12)">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <g key={`sata-${i}`} transform={`translate(${i * 26}, 0)`}>
                    <rect x="0" y="0" width="22" height="16" className="fill-none stroke-primary/50" strokeWidth="0.5" />
                    <text x="11" y="11" textAnchor="middle" className="fill-primary/50 font-mono text-[4px]">{i}</text>
                  </g>
                ))}
              </g>
            </g>

            {/* Network */}
            <g transform="translate(10, 215)">
              <text x="0" y="8" className="fill-primary/60 font-mono text-[5px]">ETHERNET</text>
              <rect x="0" y="12" width="80" height="24" className="fill-primary/10 stroke-primary/60" strokeWidth="0.5" />
              <text x="40" y="27" textAnchor="middle" className="fill-primary/70 font-mono text-[5px]">2.5GbE</text>

              {/* Link status */}
              <circle cx="70" cy="24" r="3" className="fill-primary/40 stroke-primary" strokeWidth="0.5">
                <animate attributeName="opacity" values="1;0.4;1" dur="2.5s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Audio */}
            <g transform="translate(10, 255)">
              <text x="0" y="8" className="fill-primary/60 font-mono text-[5px]">HD AUDIO</text>
              <rect x="0" y="12" width="60" height="20" className="fill-none stroke-primary/50" strokeWidth="0.5" />
              <text x="30" y="25" textAnchor="middle" className="fill-primary/50 font-mono text-[4px]">CODEC</text>
            </g>

            {/* SPI/BIOS */}
            <g transform="translate(10, 290)">
              <rect x="0" y="0" width="50" height="18" className="fill-primary/10 stroke-primary/60" strokeWidth="0.5" />
              <text x="25" y="12" textAnchor="middle" className="fill-primary/70 font-mono text-[4px]">SPI FLASH</text>
              <text x="55" y="12" className="fill-primary/50 font-mono text-[4px]">32MB</text>
            </g>
          </g>
        </g>

        {/* CPU to I/O bus */}
        <g className="stroke-primary/60" strokeWidth="1">
          <line x1="740" y1="200" x2="780" y2="200" />
          <line x1="740" y1="210" x2="780" y2="210" strokeDasharray="4 2" />
          <polygon points="775,200 780,205 775,210" className="fill-primary/60" />
        </g>

        {/* ==================== SYSTEM BUS (BOTTOM) ==================== */}
        <g transform="translate(30, 420)">
          <line x1="0" y1="0" x2="940" y2="0" className="stroke-primary" strokeWidth="1.5" />
          <line x1="0" y1="8" x2="940" y2="8" className="stroke-primary/60" strokeWidth="1" strokeDasharray="8 4" />
          <line x1="0" y1="14" x2="940" y2="14" className="stroke-primary/40" strokeWidth="0.5" />

          {/* Bus labels */}
          <text x="0" y="-4" className="fill-primary font-mono text-[5px]">SYSTEM BUS</text>
          <text x="100" y="24" className="fill-primary/50 font-mono text-[4px]">ADDRESS [63:0]</text>
          <text x="250" y="24" className="fill-primary/50 font-mono text-[4px]">DATA [255:0]</text>
          <text x="400" y="24" className="fill-primary/50 font-mono text-[4px]">CONTROL</text>
          <text x="550" y="24" className="fill-primary/50 font-mono text-[4px]">CLK</text>

          {/* Data packets animation - smooth flow */}
          {[0, 1].map((i) => {
            const xPos = ((dataPulse * 4.5) + i * 450) % 900 + 20;
            return (
              <rect
                key={`packet-${i}`}
                x={xPos}
                y="2"
                width="16"
                height="4"
                className="fill-primary/40"
                rx="1"
              />
            );
          })}
        </g>

        {/* ==================== DECORATIVE ELEMENTS ==================== */}

        {/* Register values display */}
        <g transform="translate(30, 15)">
          <text x="0" y="0" className="fill-primary/40 font-mono text-[5px]">REGISTERS:</text>
          {registerValues.map((val, i) => (
            <text key={`regval-${i}`} x={60 + i * 50} y="0" className="fill-primary/60 font-mono text-[5px]">
              R{i}: {val}
            </text>
          ))}
        </g>

        {/* Binary decoration */}
        <g transform="translate(850, 15)">
          <text x="0" y="0" className="fill-primary/25 font-mono text-[5px]">
            1011001110100101
          </text>
        </g>

        {/* Title */}
        <text x="500" y="445" textAnchor="middle" className="fill-primary font-mono text-[8px] uppercase tracking-wider">
          Modern CPU Architecture — Simplified Schematic
        </text>

        {/* Corner markers */}
        <g className="stroke-primary/30" strokeWidth="0.5">
          <path d="M 5 20 L 5 5 L 20 5" fill="none" />
          <path d="M 995 20 L 995 5 L 980 5" fill="none" />
          <path d="M 5 430 L 5 445 L 20 445" fill="none" />
          <path d="M 995 430 L 995 445 L 980 445" fill="none" />
        </g>
      </svg>
    </div>
  );
};

export default SoftwareStackBannerSVG;
