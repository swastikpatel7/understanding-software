import { useEffect, useState } from 'react';

interface EncryptionSVGProps {
  isPaused?: boolean;
}

const EncryptionSVG = ({ isPaused = false }: EncryptionSVGProps) => {
  const [phase, setPhase] = useState<'plain' | 'encrypting' | 'encrypted' | 'decrypting'>('plain');

  useEffect(() => {
    if (isPaused) return;
    
    const phases: ('plain' | 'encrypting' | 'encrypted' | 'decrypting')[] = ['plain', 'encrypting', 'encrypted', 'decrypting'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % phases.length;
      setPhase(phases[currentIndex]);
    }, 1500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const isEncrypting = phase === 'encrypting';
  const isEncrypted = phase === 'encrypted';
  const isDecrypting = phase === 'decrypting';

  return (
    <svg
      viewBox="0 0 320 160"
      className="w-full max-w-md mx-auto"
      style={{ filter: 'drop-shadow(0 4px 6px rgba(79, 70, 229, 0.1))' }}
    >
      {/* Plain text box */}
      <g>
        <rect
          x="10"
          y="50"
          width="70"
          height="50"
          rx="4"
          fill={phase === 'plain' ? 'hsl(var(--primary))' : 'none'}
          fillOpacity={phase === 'plain' ? 0.1 : 0}
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          className="transition-all duration-300"
        />
        <text x="45" y="72" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontFamily="monospace">
          HELLO
        </text>
        <text x="45" y="85" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          plaintext
        </text>
      </g>

      {/* Encryption arrow & key */}
      <g className={`transition-all duration-300 ${isEncrypting ? 'opacity-100' : 'opacity-40'}`}>
        <path
          d="M85 75 L125 75"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="1.5"
          markerEnd="url(#encArrow)"
          className={isEncrypting ? 'animate-pulse' : ''}
        />
        {/* Key symbol */}
        <circle cx="105" cy="55" r="8" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
        <rect x="103" y="63" width="4" height="12" fill="hsl(var(--primary))" />
        <rect x="107" y="68" width="6" height="2" fill="hsl(var(--primary))" />
        <rect x="107" y="72" width="4" height="2" fill="hsl(var(--primary))" />
        <text x="105" y="95" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          encrypt
        </text>
      </g>

      {/* Algorithm box */}
      <g>
        <rect
          x="130"
          y="45"
          width="60"
          height="60"
          rx="4"
          fill={isEncrypting || isDecrypting ? 'hsl(var(--accent))' : 'none'}
          fillOpacity={isEncrypting || isDecrypting ? 0.1 : 0}
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeDasharray={isEncrypting || isDecrypting ? "4 2" : "0"}
          className="transition-all duration-300"
        />
        {/* Gear/algorithm symbol */}
        <g className={isEncrypting || isDecrypting ? 'animate-spin-slow' : ''} style={{ transformOrigin: '160px 75px' }}>
          <circle cx="160" cy="75" r="12" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
          <circle cx="160" cy="75" r="5" fill="hsl(var(--primary))" fillOpacity="0.3" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <rect
              key={angle}
              x="157"
              y="60"
              width="6"
              height="6"
              fill="hsl(var(--primary))"
              transform={`rotate(${angle} 160 75)`}
            />
          ))}
        </g>
        <text x="160" y="115" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          AES-256
        </text>
      </g>

      {/* Decryption arrow & key */}
      <g className={`transition-all duration-300 ${isDecrypting ? 'opacity-100' : 'opacity-40'}`}>
        <path
          d="M195 75 L235 75"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="1.5"
          markerEnd="url(#decArrow)"
          className={isDecrypting ? 'animate-pulse' : ''}
        />
        {/* Key symbol */}
        <circle cx="215" cy="55" r="8" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
        <rect x="213" y="63" width="4" height="12" fill="hsl(var(--primary))" />
        <rect x="217" y="68" width="6" height="2" fill="hsl(var(--primary))" />
        <rect x="217" y="72" width="4" height="2" fill="hsl(var(--primary))" />
        <text x="215" y="95" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          decrypt
        </text>
      </g>

      {/* Cipher text / Output box */}
      <g>
        <rect
          x="240"
          y="50"
          width="70"
          height="50"
          rx="4"
          fill={isEncrypted ? 'hsl(var(--accent))' : 'none'}
          fillOpacity={isEncrypted ? 0.1 : 0}
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          className="transition-all duration-300"
        />
        <text x="275" y="72" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontFamily="monospace">
          {isEncrypted ? 'x#9$k' : phase === 'plain' || isDecrypting ? 'HELLO' : '...'}
        </text>
        <text x="275" y="85" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
          {isEncrypted ? 'ciphertext' : 'output'}
        </text>
      </g>

      {/* Phase indicator */}
      <text x="160" y="145" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="monospace">
        {phase === 'plain' && '● ready to encrypt'}
        {phase === 'encrypting' && '◐ encrypting...'}
        {phase === 'encrypted' && '● encrypted'}
        {phase === 'decrypting' && '◑ decrypting...'}
      </text>

      <defs>
        <marker id="encArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="hsl(var(--accent))" />
        </marker>
        <marker id="decArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="hsl(var(--accent))" />
        </marker>
      </defs>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
      `}</style>
    </svg>
  );
};

export default EncryptionSVG;
