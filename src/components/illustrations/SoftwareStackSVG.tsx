import { useEffect, useState } from 'react';

interface SoftwareStackSVGProps {
  isPaused?: boolean;
}

const SoftwareStackSVG = ({ isPaused = false }: SoftwareStackSVGProps) => {
  const [floatOffsets, setFloatOffsets] = useState([0, 0, 0, 0, 0]);
  const [dataFlowOffset, setDataFlowOffset] = useState(0);

  useEffect(() => {
    if (isPaused) return;

    let frame: number;
    let time = 0;

    const animate = () => {
      time += 0.015;
      // Each layer floats at slightly different rates for parallax
      setFloatOffsets([
        Math.sin(time * 0.8) * 2,
        Math.sin(time * 0.9 + 0.5) * 2.5,
        Math.sin(time * 1.0 + 1) * 3,
        Math.sin(time * 1.1 + 1.5) * 3.5,
        Math.sin(time * 1.2 + 2) * 4,
      ]);
      setDataFlowOffset((time * 30) % 20);
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isPaused]);

  // Layer base positions (Y coordinates, bottom to top)
  const layerY = [380, 300, 220, 140, 60];
  const layerHeight = 55;
  const layerWidth = 280;
  const centerX = 450;

  // Isometric helpers
  const isoX = (x: number, y: number) => centerX + (x - y) * 0.866;
  const isoY = (baseY: number, x: number, y: number) => baseY + (x + y) * 0.5;

  return (
    <div className="relative w-full">
      <span className="figure-label absolute -left-2 md:left-4 top-1/2 -translate-y-1/2 z-10">FIG.005</span>
      
      <svg viewBox="0 0 900 480" className="w-full max-w-5xl mx-auto">
        {/* Background isometric grid */}
        <defs>
          <pattern id="isoGrid" width="40" height="23.1" patternUnits="userSpaceOnUse">
            <path 
              d="M 0 11.55 L 20 0 L 40 11.55 M 20 23.1 L 20 0" 
              className="stroke-primary/5" 
              strokeWidth="0.5" 
              fill="none"
            />
          </pattern>
          
          {/* Gradient for data flow lines */}
          <linearGradient id="dataFlowGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.6" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <rect x="100" y="20" width="700" height="440" fill="url(#isoGrid)" />

        {/* Data flow lines between layers */}
        <g className="text-primary">
          {[0, 1, 2, 3].map((i) => (
            <g key={`flow-${i}`}>
              {/* Left connector */}
              <line
                x1={centerX - 80}
                y1={layerY[i] + floatOffsets[i] - 5}
                x2={centerX - 80}
                y2={layerY[i + 1] + floatOffsets[i + 1] + layerHeight + 5}
                className="stroke-primary/30"
                strokeWidth="1"
                strokeDasharray="4 4"
                strokeDashoffset={-dataFlowOffset}
              />
              {/* Right connector */}
              <line
                x1={centerX + 80}
                y1={layerY[i] + floatOffsets[i] - 5}
                x2={centerX + 80}
                y2={layerY[i + 1] + floatOffsets[i + 1] + layerHeight + 5}
                className="stroke-primary/30"
                strokeWidth="1"
                strokeDasharray="4 4"
                strokeDashoffset={-dataFlowOffset}
              />
              {/* Connection dots */}
              <circle
                cx={centerX - 80}
                cy={layerY[i] + floatOffsets[i] - 5}
                r="3"
                className="fill-primary/40 animate-pulse-subtle"
              />
              <circle
                cx={centerX + 80}
                cy={layerY[i] + floatOffsets[i] - 5}
                r="3"
                className="fill-primary/40 animate-pulse-subtle"
              />
            </g>
          ))}
        </g>

        {/* === LAYER 1: HARDWARE (Bottom) === */}
        <g 
          style={{ transform: `translateY(${floatOffsets[0]}px)` }}
          className="transition-transform duration-100"
        >
          {/* Main platform */}
          <path
            d={`M ${centerX - 140} ${layerY[0] + 25}
                L ${centerX} ${layerY[0]}
                L ${centerX + 140} ${layerY[0] + 25}
                L ${centerX} ${layerY[0] + 50}
                Z`}
            className="fill-secondary stroke-primary stroke-[1.5]"
          />
          {/* Left side */}
          <path
            d={`M ${centerX - 140} ${layerY[0] + 25}
                L ${centerX - 140} ${layerY[0] + 45}
                L ${centerX} ${layerY[0] + 70}
                L ${centerX} ${layerY[0] + 50}
                Z`}
            className="fill-background stroke-primary stroke-[1.5]"
          />
          {/* Right side */}
          <path
            d={`M ${centerX + 140} ${layerY[0] + 25}
                L ${centerX + 140} ${layerY[0] + 45}
                L ${centerX} ${layerY[0] + 70}
                L ${centerX} ${layerY[0] + 50}
                Z`}
            className="fill-background stroke-primary stroke-[1.5]"
          />

          {/* CPU Die - simplified grid */}
          <g>
            <rect
              x={centerX - 50}
              y={layerY[0] + 10}
              width="40"
              height="25"
              className="fill-primary/10 stroke-primary stroke-[1]"
              rx="2"
            />
            {/* Transistor grid inside CPU */}
            {[0, 1, 2].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <rect
                  key={`cpu-${row}-${col}`}
                  x={centerX - 46 + col * 9}
                  y={layerY[0] + 14 + row * 7}
                  width="5"
                  height="4"
                  className="fill-primary/30 animate-pulse-subtle"
                  style={{ animationDelay: `${(row + col) * 0.1}s` }}
                />
              ))
            )}
            <text
              x={centerX - 30}
              y={layerY[0] + 45}
              className="fill-primary font-mono text-[7px] uppercase"
              textAnchor="middle"
            >
              CPU
            </text>
          </g>

          {/* RAM Chips */}
          <g>
            {[0, 1].map((i) => (
              <g key={`ram-${i}`}>
                <rect
                  x={centerX + 15 + i * 25}
                  y={layerY[0] + 12}
                  width="18"
                  height="22"
                  className="fill-background stroke-primary stroke-[1]"
                  rx="1"
                />
                {/* RAM lines */}
                {[0, 1, 2, 3, 4].map((line) => (
                  <line
                    key={`ram-line-${i}-${line}`}
                    x1={centerX + 18 + i * 25}
                    y1={layerY[0] + 16 + line * 4}
                    x2={centerX + 30 + i * 25}
                    y2={layerY[0] + 16 + line * 4}
                    className="stroke-primary/40"
                    strokeWidth="1"
                  />
                ))}
              </g>
            ))}
            <text
              x={centerX + 37}
              y={layerY[0] + 45}
              className="fill-primary font-mono text-[7px] uppercase"
              textAnchor="middle"
            >
              RAM
            </text>
          </g>

          {/* SSD */}
          <g>
            <rect
              x={centerX - 100}
              y={layerY[0] + 15}
              width="35"
              height="18"
              className="fill-background stroke-primary stroke-[1]"
              rx="2"
            />
            <rect
              x={centerX - 95}
              y={layerY[0] + 19}
              width="25"
              height="10"
              className="fill-primary/15"
              rx="1"
            />
            <text
              x={centerX - 82}
              y={layerY[0] + 45}
              className="fill-primary font-mono text-[7px] uppercase"
              textAnchor="middle"
            >
              SSD
            </text>
          </g>

          {/* Layer label */}
          <text
            x={centerX}
            y={layerY[0] + 85}
            className="fill-primary font-mono text-[9px] uppercase tracking-wider"
            textAnchor="middle"
          >
            Hardware Layer
          </text>

          {/* Annotation */}
          <g className="stroke-primary/50">
            <line x1={centerX + 160} y1={layerY[0] + 30} x2={centerX + 220} y2={layerY[0] + 30} />
            <circle cx={centerX + 160} cy={layerY[0] + 30} r="2" className="fill-primary/50" />
            <text
              x={centerX + 225}
              y={layerY[0] + 33}
              className="fill-primary font-mono text-[8px] uppercase"
            >
              Physical Layer
            </text>
          </g>
        </g>

        {/* === LAYER 2: KERNEL === */}
        <g 
          style={{ transform: `translateY(${floatOffsets[1]}px)` }}
          className="transition-transform duration-100"
        >
          {/* Main platform */}
          <path
            d={`M ${centerX - 130} ${layerY[1] + 22}
                L ${centerX} ${layerY[1]}
                L ${centerX + 130} ${layerY[1] + 22}
                L ${centerX} ${layerY[1] + 44}
                Z`}
            className="fill-secondary stroke-primary stroke-[1.5]"
          />
          {/* Left side */}
          <path
            d={`M ${centerX - 130} ${layerY[1] + 22}
                L ${centerX - 130} ${layerY[1] + 40}
                L ${centerX} ${layerY[1] + 62}
                L ${centerX} ${layerY[1] + 44}
                Z`}
            className="fill-background stroke-primary stroke-[1.5]"
          />
          {/* Right side */}
          <path
            d={`M ${centerX + 130} ${layerY[1] + 22}
                L ${centerX + 130} ${layerY[1] + 40}
                L ${centerX} ${layerY[1] + 62}
                L ${centerX} ${layerY[1] + 44}
                Z`}
            className="fill-background stroke-primary stroke-[1.5]"
          />

          {/* Process Scheduler - boxes */}
          <g>
            {[0, 1, 2].map((i) => (
              <rect
                key={`sched-${i}`}
                x={centerX - 90 + i * 22}
                y={layerY[1] + 10 + (i === 1 ? -3 : 0)}
                width="18"
                height="14"
                className={`fill-primary/${20 + i * 10} stroke-primary stroke-[0.75]`}
                rx="1"
              />
            ))}
            <text
              x={centerX - 57}
              y={layerY[1] + 38}
              className="fill-primary font-mono text-[6px] uppercase"
              textAnchor="middle"
            >
              Scheduler
            </text>
          </g>

          {/* Memory Map - grid */}
          <g>
            {[0, 1].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <rect
                  key={`mem-${row}-${col}`}
                  x={centerX - 15 + col * 12}
                  y={layerY[1] + 8 + row * 10}
                  width="10"
                  height="8"
                  className={`fill-primary/${10 + (row + col) * 8} stroke-primary/50 stroke-[0.5]`}
                />
              ))
            )}
            <text
              x={centerX + 9}
              y={layerY[1] + 38}
              className="fill-primary font-mono text-[6px] uppercase"
              textAnchor="middle"
            >
              Memory
            </text>
          </g>

          {/* I/O Queue */}
          <g>
            <path
              d={`M ${centerX + 55} ${layerY[1] + 8} 
                  L ${centerX + 95} ${layerY[1] + 8}
                  L ${centerX + 95} ${layerY[1] + 28}
                  L ${centerX + 55} ${layerY[1] + 28}
                  Z`}
              className="fill-background stroke-primary stroke-[0.75]"
            />
            {/* Queue items */}
            {[0, 1, 2].map((i) => (
              <rect
                key={`io-${i}`}
                x={centerX + 58 + i * 12}
                y={layerY[1] + 12}
                width="10"
                height="12"
                className="fill-primary/20 stroke-primary/40 stroke-[0.5]"
              />
            ))}
            <text
              x={centerX + 75}
              y={layerY[1] + 38}
              className="fill-primary font-mono text-[6px] uppercase"
              textAnchor="middle"
            >
              I/O
            </text>
          </g>

          {/* Layer label */}
          <text
            x={centerX}
            y={layerY[1] + 75}
            className="fill-primary font-mono text-[9px] uppercase tracking-wider"
            textAnchor="middle"
          >
            Operating System Kernel
          </text>

          {/* Annotation */}
          <g className="stroke-primary/50">
            <line x1={centerX - 150} y1={layerY[1] + 25} x2={centerX - 200} y2={layerY[1] + 25} />
            <circle cx={centerX - 150} cy={layerY[1] + 25} r="2" className="fill-primary/50" />
            <text
              x={centerX - 205}
              y={layerY[1] + 28}
              className="fill-primary font-mono text-[8px] uppercase"
              textAnchor="end"
            >
              Ring 0
            </text>
          </g>
        </g>

        {/* === LAYER 3: RUNTIME === */}
        <g 
          style={{ transform: `translateY(${floatOffsets[2]}px)` }}
          className="transition-transform duration-100"
        >
          {/* Main platform */}
          <path
            d={`M ${centerX - 120} ${layerY[2] + 20}
                L ${centerX} ${layerY[2]}
                L ${centerX + 120} ${layerY[2] + 20}
                L ${centerX} ${layerY[2] + 40}
                Z`}
            className="fill-secondary stroke-primary stroke-[1.5]"
          />
          {/* Left side */}
          <path
            d={`M ${centerX - 120} ${layerY[2] + 20}
                L ${centerX - 120} ${layerY[2] + 36}
                L ${centerX} ${layerY[2] + 56}
                L ${centerX} ${layerY[2] + 40}
                Z`}
            className="fill-background stroke-primary stroke-[1.5]"
          />
          {/* Right side */}
          <path
            d={`M ${centerX + 120} ${layerY[2] + 20}
                L ${centerX + 120} ${layerY[2] + 36}
                L ${centerX} ${layerY[2] + 56}
                L ${centerX} ${layerY[2] + 40}
                Z`}
            className="fill-background stroke-primary stroke-[1.5]"
          />

          {/* Interpreter/VM Box */}
          <g>
            <rect
              x={centerX - 85}
              y={layerY[2] + 6}
              width="45"
              height="24"
              className="fill-background stroke-primary stroke-[1]"
              rx="2"
            />
            <text
              x={centerX - 62}
              y={layerY[2] + 20}
              className="fill-primary font-mono text-[8px]"
              textAnchor="middle"
            >
              V8
            </text>
            <text
              x={centerX - 62}
              y={layerY[2] + 43}
              className="fill-primary font-mono text-[6px] uppercase"
              textAnchor="middle"
            >
              Engine
            </text>
          </g>

          {/* Event Loop Circle */}
          <g>
            <circle
              cx={centerX + 5}
              cy={layerY[2] + 18}
              r="14"
              className="fill-background stroke-primary stroke-[1]"
            />
            {/* Rotating arrow inside */}
            <path
              d={`M ${centerX + 5} ${layerY[2] + 8}
                  A 10 10 0 1 1 ${centerX - 5} ${layerY[2] + 18}`}
              className="stroke-primary/60 animate-dash"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <polygon
              points={`${centerX - 5},${layerY[2] + 14} ${centerX - 5},${layerY[2] + 22} ${centerX - 9},${layerY[2] + 18}`}
              className="fill-primary/60"
            />
            <text
              x={centerX + 5}
              y={layerY[2] + 43}
              className="fill-primary font-mono text-[6px] uppercase"
              textAnchor="middle"
            >
              Event Loop
            </text>
          </g>

          {/* Garbage Collector */}
          <g>
            <rect
              x={centerX + 40}
              y={layerY[2] + 6}
              width="40"
              height="24"
              className="fill-background stroke-primary stroke-[1]"
              rx="2"
            />
            {/* GC visualization - blocks being collected */}
            <rect x={centerX + 45} y={layerY[2] + 10} width="8" height="8" className="fill-primary/20" />
            <rect x={centerX + 56} y={layerY[2] + 10} width="8" height="8" className="fill-primary/40" />
            <rect x={centerX + 67} y={layerY[2] + 10} width="8" height="8" className="fill-primary/10 stroke-primary/30 stroke-[0.5] stroke-dasharray-2" />
            <rect x={centerX + 45} y={layerY[2] + 20} width="8" height="8" className="fill-primary/30" />
            <text
              x={centerX + 60}
              y={layerY[2] + 43}
              className="fill-primary font-mono text-[6px] uppercase"
              textAnchor="middle"
            >
              GC
            </text>
          </g>

          {/* Layer label */}
          <text
            x={centerX}
            y={layerY[2] + 68}
            className="fill-primary font-mono text-[9px] uppercase tracking-wider"
            textAnchor="middle"
          >
            Runtime Environment
          </text>

          {/* Annotation */}
          <g className="stroke-primary/50">
            <line x1={centerX + 140} y1={layerY[2] + 25} x2={centerX + 200} y2={layerY[2] + 25} />
            <circle cx={centerX + 140} cy={layerY[2] + 25} r="2" className="fill-primary/50" />
            <text
              x={centerX + 205}
              y={layerY[2] + 28}
              className="fill-primary font-mono text-[8px] uppercase"
            >
              Execution Context
            </text>
          </g>
        </g>

        {/* === LAYER 4: FRAMEWORK === */}
        <g 
          style={{ transform: `translateY(${floatOffsets[3]}px)` }}
          className="transition-transform duration-100"
        >
          {/* Main platform */}
          <path
            d={`M ${centerX - 110} ${layerY[3] + 18}
                L ${centerX} ${layerY[3]}
                L ${centerX + 110} ${layerY[3] + 18}
                L ${centerX} ${layerY[3] + 36}
                Z`}
            className="fill-secondary stroke-primary stroke-[1.5]"
          />
          {/* Left side */}
          <path
            d={`M ${centerX - 110} ${layerY[3] + 18}
                L ${centerX - 110} ${layerY[3] + 32}
                L ${centerX} ${layerY[3] + 50}
                L ${centerX} ${layerY[3] + 36}
                Z`}
            className="fill-background stroke-primary stroke-[1.5]"
          />
          {/* Right side */}
          <path
            d={`M ${centerX + 110} ${layerY[3] + 18}
                L ${centerX + 110} ${layerY[3] + 32}
                L ${centerX} ${layerY[3] + 50}
                L ${centerX} ${layerY[3] + 36}
                Z`}
            className="fill-background stroke-primary stroke-[1.5]"
          />

          {/* Component Tree */}
          <g>
            {/* Root node */}
            <circle cx={centerX - 55} cy={layerY[3] + 8} r="5" className="fill-primary/30 stroke-primary stroke-[0.75]" />
            {/* Child nodes */}
            <line x1={centerX - 55} y1={layerY[3] + 13} x2={centerX - 70} y2={layerY[3] + 23} className="stroke-primary/50" strokeWidth="0.75" />
            <line x1={centerX - 55} y1={layerY[3] + 13} x2={centerX - 40} y2={layerY[3] + 23} className="stroke-primary/50" strokeWidth="0.75" />
            <circle cx={centerX - 70} cy={layerY[3] + 26} r="4" className="fill-primary/20 stroke-primary stroke-[0.5]" />
            <circle cx={centerX - 40} cy={layerY[3] + 26} r="4" className="fill-primary/20 stroke-primary stroke-[0.5]" />
            {/* Grandchildren */}
            <line x1={centerX - 70} y1={layerY[3] + 30} x2={centerX - 78} y2={layerY[3] + 36} className="stroke-primary/30" strokeWidth="0.5" />
            <line x1={centerX - 70} y1={layerY[3] + 30} x2={centerX - 62} y2={layerY[3] + 36} className="stroke-primary/30" strokeWidth="0.5" />
            <circle cx={centerX - 78} cy={layerY[3] + 38} r="2" className="fill-primary/15" />
            <circle cx={centerX - 62} cy={layerY[3] + 38} r="2" className="fill-primary/15" />
            <text
              x={centerX - 55}
              y={layerY[3] + 52}
              className="fill-primary font-mono text-[6px] uppercase"
              textAnchor="middle"
            >
              Components
            </text>
          </g>

          {/* State Container */}
          <g>
            <rect
              x={centerX + 10}
              y={layerY[3] + 4}
              width="50"
              height="30"
              className="fill-background stroke-primary stroke-[1]"
              rx="3"
            />
            {/* State representation - key:value pairs */}
            <text x={centerX + 15} y={layerY[3] + 15} className="fill-primary/60 font-mono text-[6px]">user:</text>
            <rect x={centerX + 35} y={layerY[3] + 9} width="20" height="8" className="fill-primary/15" rx="1" />
            <text x={centerX + 15} y={layerY[3] + 26} className="fill-primary/60 font-mono text-[6px]">data:</text>
            <rect x={centerX + 35} y={layerY[3] + 20} width="20" height="8" className="fill-primary/15" rx="1" />
            <text
              x={centerX + 35}
              y={layerY[3] + 52}
              className="fill-primary font-mono text-[6px] uppercase"
              textAnchor="middle"
            >
              State
            </text>
          </g>

          {/* Layer label */}
          <text
            x={centerX}
            y={layerY[3] + 68}
            className="fill-primary font-mono text-[9px] uppercase tracking-wider"
            textAnchor="middle"
          >
            Application Framework
          </text>

          {/* Annotation */}
          <g className="stroke-primary/50">
            <line x1={centerX - 130} y1={layerY[3] + 22} x2={centerX - 180} y2={layerY[3] + 22} />
            <circle cx={centerX - 130} cy={layerY[3] + 22} r="2" className="fill-primary/50" />
            <text
              x={centerX - 185}
              y={layerY[3] + 25}
              className="fill-primary font-mono text-[8px] uppercase"
              textAnchor="end"
            >
              Abstraction Layer
            </text>
          </g>
        </g>

        {/* === LAYER 5: APPLICATION (Top) === */}
        <g 
          style={{ transform: `translateY(${floatOffsets[4]}px)` }}
          className="transition-transform duration-100"
        >
          {/* Window frame */}
          <rect
            x={centerX - 70}
            y={layerY[4]}
            width="140"
            height="50"
            className="fill-background stroke-primary stroke-[1.5]"
            rx="4"
          />
          
          {/* Title bar */}
          <rect
            x={centerX - 70}
            y={layerY[4]}
            width="140"
            height="12"
            className="fill-secondary stroke-primary stroke-[1.5]"
            rx="4"
          />
          <rect
            x={centerX - 70}
            y={layerY[4] + 8}
            width="140"
            height="4"
            className="fill-secondary"
          />
          
          {/* Window controls */}
          <circle cx={centerX - 58} cy={layerY[4] + 6} r="3" className="fill-primary/20 stroke-primary/50 stroke-[0.5]" />
          <circle cx={centerX - 48} cy={layerY[4] + 6} r="3" className="fill-primary/20 stroke-primary/50 stroke-[0.5]" />
          <circle cx={centerX - 38} cy={layerY[4] + 6} r="3" className="fill-primary/20 stroke-primary/50 stroke-[0.5]" />
          
          {/* Window title */}
          <text
            x={centerX}
            y={layerY[4] + 9}
            className="fill-primary font-mono text-[7px]"
            textAnchor="middle"
          >
            My App
          </text>
          
          {/* UI Elements inside window */}
          {/* Sidebar */}
          <rect
            x={centerX - 65}
            y={layerY[4] + 16}
            width="30"
            height="30"
            className="fill-primary/5 stroke-primary/30 stroke-[0.5]"
          />
          {/* Menu items */}
          {[0, 1, 2].map((i) => (
            <rect
              key={`menu-${i}`}
              x={centerX - 62}
              y={layerY[4] + 20 + i * 8}
              width="24"
              height="5"
              className="fill-primary/15"
              rx="1"
            />
          ))}
          
          {/* Content area */}
          <rect
            x={centerX - 30}
            y={layerY[4] + 16}
            width="90"
            height="30"
            className="fill-background"
          />
          {/* Content lines */}
          {[0, 1, 2].map((i) => (
            <rect
              key={`content-${i}`}
              x={centerX - 25}
              y={layerY[4] + 20 + i * 8}
              width={70 - i * 15}
              height="4"
              className="fill-primary/10"
              rx="1"
            />
          ))}
          
          {/* Button */}
          <rect
            x={centerX + 30}
            y={layerY[4] + 36}
            width="28"
            height="10"
            className="fill-primary/20 stroke-primary stroke-[0.5]"
            rx="2"
          />

          {/* Layer label */}
          <text
            x={centerX}
            y={layerY[4] + 68}
            className="fill-primary font-mono text-[9px] uppercase tracking-wider"
            textAnchor="middle"
          >
            User Application
          </text>

          {/* Annotation */}
          <g className="stroke-primary/50">
            <line x1={centerX + 90} y1={layerY[4] + 25} x2={centerX + 140} y2={layerY[4] + 25} />
            <circle cx={centerX + 90} cy={layerY[4] + 25} r="2" className="fill-primary/50" />
            <text
              x={centerX + 145}
              y={layerY[4] + 28}
              className="fill-primary font-mono text-[8px] uppercase"
            >
              User Space
            </text>
          </g>
        </g>

        {/* Main title */}
        <text
          x={centerX}
          y={460}
          className="fill-primary font-mono text-[11px] uppercase tracking-widest"
          textAnchor="middle"
        >
          Software Architecture Stack
        </text>

        {/* Vertical scale indicator */}
        <g className="stroke-primary/40">
          <line x1="80" y1="60" x2="80" y2="420" strokeDasharray="2 4" />
          <text
            x="75"
            y="240"
            className="fill-primary/60 font-mono text-[7px]"
            textAnchor="end"
            transform="rotate(-90, 75, 240)"
          >
            ABSTRACTION LEVEL
          </text>
          <polygon points="80,55 76,65 84,65" className="fill-primary/40" />
          <polygon points="80,425 76,415 84,415" className="fill-primary/40" />
        </g>
      </svg>
    </div>
  );
};

export default SoftwareStackSVG;


