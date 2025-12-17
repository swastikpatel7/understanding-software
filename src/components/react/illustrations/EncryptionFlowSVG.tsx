import { useState, useEffect } from 'react';

interface EncryptionFlowSVGProps {
  isPaused?: boolean;
}

const EncryptionFlowSVG = ({ isPaused = false }: EncryptionFlowSVGProps) => {
  const [phase, setPhase] = useState(0);
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setPhase(prev => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const plaintext = "HELLO";
  const ciphertext = "KHOOR";

  return (
    <svg
      viewBox="0 0 400 360"
      className="w-full max-w-md mx-auto"
      style={{ filter: 'drop-shadow(0 4px 6px rgba(79, 70, 229, 0.1))' }}
    >
      {/* Title */}
      <text x="200" y="20" textAnchor="middle" fontSize="10" fill="hsl(var(--primary))" fontFamily="monospace" opacity="0.6">
        FIG.005
      </text>
      <text x="200" y="38" textAnchor="middle" fontSize="12" fill="hsl(var(--primary))" fontFamily="monospace" fontWeight="500">
        SYMMETRIC ENCRYPTION PROCESS
      </text>

      {/* Plaintext block */}
      <g 
        onMouseEnter={() => setHoveredBlock('plain')}
        onMouseLeave={() => setHoveredBlock(null)}
        className="cursor-pointer"
      >
        <rect
          x="30"
          y="70"
          width="100"
          height="60"
          fill={hoveredBlock === 'plain' || phase === 0 ? 'hsl(var(--accent))' : 'none'}
          fillOpacity={hoveredBlock === 'plain' || phase === 0 ? 0.1 : 0}
          stroke="hsl(var(--primary))"
          strokeWidth={phase === 0 ? 2 : 1}
          rx="2"
        />
        <text x="80" y="90" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          PLAINTEXT
        </text>
        <text x="80" y="115" textAnchor="middle" fontSize="14" fill="hsl(var(--primary))" fontFamily="monospace" fontWeight="500">
          {plaintext}
        </text>
      </g>

      {/* Arrow to encryption */}
      <g opacity={phase >= 1 ? 1 : 0.3} className="transition-opacity duration-500">
        <line x1="130" y1="100" x2="155" y2="100" stroke="hsl(var(--accent))" strokeWidth="1.5" markerEnd="url(#arrow)" />
      </g>

      {/* Encryption algorithm box */}
      <g 
        onMouseEnter={() => setHoveredBlock('encrypt')}
        onMouseLeave={() => setHoveredBlock(null)}
        className="cursor-pointer"
      >
        <rect
          x="160"
          y="60"
          width="80"
          height="80"
          fill={hoveredBlock === 'encrypt' || phase === 1 ? 'hsl(var(--primary))' : 'none'}
          fillOpacity={hoveredBlock === 'encrypt' || phase === 1 ? 0.1 : 0}
          stroke="hsl(var(--primary))"
          strokeWidth={phase === 1 ? 2 : 1}
          rx="2"
        />
        {/* Gear icon */}
        <circle cx="200" cy="90" r="12" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
        <circle cx="200" cy="90" r="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1={200 + Math.cos(angle * Math.PI / 180) * 12}
            y1={90 + Math.sin(angle * Math.PI / 180) * 12}
            x2={200 + Math.cos(angle * Math.PI / 180) * 16}
            y2={90 + Math.sin(angle * Math.PI / 180) * 16}
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
        ))}
        <text x="200" y="120" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontFamily="monospace">
          AES-256
        </text>
        <text x="200" y="130" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          ENCRYPTION
        </text>
      </g>

      {/* Key input */}
      <g 
        onMouseEnter={() => setHoveredBlock('key')}
        onMouseLeave={() => setHoveredBlock(null)}
        className="cursor-pointer"
      >
        <rect
          x="165"
          y="160"
          width="70"
          height="35"
          fill={hoveredBlock === 'key' ? 'hsl(var(--accent))' : 'none'}
          fillOpacity={hoveredBlock === 'key' ? 0.15 : 0}
          stroke="hsl(var(--accent))"
          strokeWidth="1"
          rx="2"
        />
        <text x="200" y="175" textAnchor="middle" fontSize="7" fill="hsl(var(--accent))" fontFamily="monospace">
          SECRET KEY
        </text>
        <text x="200" y="187" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          256 bits
        </text>
        <line x1="200" y1="160" x2="200" y2="140" stroke="hsl(var(--accent))" strokeWidth="1" markerEnd="url(#arrow2)" />
      </g>

      {/* Arrow to ciphertext */}
      <g opacity={phase >= 2 ? 1 : 0.3} className="transition-opacity duration-500">
        <line x1="240" y1="100" x2="265" y2="100" stroke="hsl(var(--accent))" strokeWidth="1.5" markerEnd="url(#arrow)" />
      </g>

      {/* Ciphertext block */}
      <g 
        onMouseEnter={() => setHoveredBlock('cipher')}
        onMouseLeave={() => setHoveredBlock(null)}
        className="cursor-pointer"
      >
        <rect
          x="270"
          y="70"
          width="100"
          height="60"
          fill={hoveredBlock === 'cipher' || phase >= 2 ? 'hsl(var(--primary))' : 'none'}
          fillOpacity={hoveredBlock === 'cipher' || phase >= 2 ? 0.1 : 0}
          stroke="hsl(var(--primary))"
          strokeWidth={phase === 2 ? 2 : 1}
          rx="2"
        />
        <text x="320" y="90" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          CIPHERTEXT
        </text>
        <text x="320" y="115" textAnchor="middle" fontSize="14" fill="hsl(var(--primary))" fontFamily="monospace" fontWeight="500">
          {phase >= 2 ? ciphertext : "?????"}
        </text>
      </g>

      {/* Byte transformation detail */}
      <g transform="translate(30, 210)">
        <text x="0" y="0" fontSize="8" fill="hsl(var(--primary))" fontFamily="monospace" fontWeight="500">
          BYTE SUBSTITUTION (S-BOX)
        </text>
        
        <g transform="translate(0, 15)">
          {/* Input bytes */}
          {plaintext.split('').map((char, i) => (
            <g key={i}>
              <rect
                x={i * 32}
                y="0"
                width="28"
                height="24"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="0.5"
              />
              <text x={i * 32 + 14} y="10" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontFamily="monospace">
                {char}
              </text>
              <text x={i * 32 + 14} y="20" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
                0x{char.charCodeAt(0).toString(16).toUpperCase()}
              </text>
            </g>
          ))}
          
          {/* Arrows */}
          {plaintext.split('').map((_, i) => (
            <line key={i} x1={i * 32 + 14} y1="28" x2={i * 32 + 14} y2="40" stroke="hsl(var(--accent))" strokeWidth="0.5" />
          ))}
          
          {/* S-box */}
          <rect x="0" y="42" width="156" height="20" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" rx="2" />
          <text x="78" y="55" textAnchor="middle" fontSize="7" fill="hsl(var(--accent))" fontFamily="monospace">
            SUBSTITUTION TABLE (16×16)
          </text>
          
          {/* Output bytes */}
          {ciphertext.split('').map((char, i) => (
            <g key={i}>
              <line x1={i * 32 + 14} y1="62" x2={i * 32 + 14} y2="74" stroke="hsl(var(--accent))" strokeWidth="0.5" />
              <rect
                x={i * 32}
                y="76"
                width="28"
                height="24"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="0.5"
              />
              <text x={i * 32 + 14} y="86" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontFamily="monospace">
                {char}
              </text>
              <text x={i * 32 + 14} y="96" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
                0x{char.charCodeAt(0).toString(16).toUpperCase()}
              </text>
            </g>
          ))}
        </g>
      </g>

      {/* Side annotations */}
      <g transform="translate(220, 220)">
        <text x="0" y="0" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          ROUNDS: 14
        </text>
        <text x="0" y="12" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          BLOCK SIZE: 128 bits
        </text>
        <text x="0" y="24" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          KEY SIZE: 256 bits
        </text>
        <text x="0" y="42" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          OPERATIONS:
        </text>
        <text x="0" y="54" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          • SubBytes
        </text>
        <text x="0" y="64" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          • ShiftRows
        </text>
        <text x="0" y="74" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          • MixColumns
        </text>
        <text x="0" y="84" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          • AddRoundKey
        </text>
      </g>

      {/* Bottom annotation */}
      <g transform="translate(10, 330)">
        <line x1="0" y1="0" x2="380" y2="0" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3" />
        <text x="0" y="18" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          CIPHER: AES (ADVANCED ENCRYPTION STANDARD) • MODE: CBC • PADDING: PKCS7
        </text>
      </g>

      {/* Arrow markers */}
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="hsl(var(--accent))" />
        </marker>
        <marker id="arrow2" markerWidth="5" markerHeight="5" refX="2.5" refY="5" orient="auto">
          <path d="M0,5 L2.5,0 L5,5 Z" fill="hsl(var(--accent))" />
        </marker>
      </defs>
    </svg>
  );
};

export default EncryptionFlowSVG;
