import React, { useState } from 'react';
import { Wind } from 'lucide-react';

interface LeafItem {
  id: number;
  type: 'green-birch' | 'emerald-mango' | 'golden-teak' | 'sakura-petal' | 'lime-sprout' | 'amber-maple' | 'olive-willow';
  animationClass: string;
  duration: number; // in seconds
  delay: number; // in seconds
  topPercent: number;
  scale: number;
  opacity: number;
}

const INITIAL_LEAVES: LeafItem[] = [
  // Fast Wind Gust Leaves (West -> East)
  { id: 1, type: 'emerald-mango', animationClass: 'animate-leaf-gust-east', duration: 8.5, delay: 0, topPercent: 12, scale: 1.1, opacity: 0.95 },
  { id: 2, type: 'sakura-petal', animationClass: 'animate-leaf-gust-east', duration: 7.2, delay: 1.8, topPercent: 28, scale: 0.85, opacity: 0.9 },
  { id: 3, type: 'golden-teak', animationClass: 'animate-leaf-gust-east', duration: 9.0, delay: 3.5, topPercent: 64, scale: 1.05, opacity: 0.92 },
  { id: 4, type: 'green-birch', animationClass: 'animate-leaf-gust-east', duration: 8.0, delay: 5.2, topPercent: 42, scale: 0.95, opacity: 0.9 },
  { id: 5, type: 'sakura-petal', animationClass: 'animate-leaf-gust-east', duration: 6.8, delay: 7.0, topPercent: 80, scale: 0.75, opacity: 0.85 },

  // Swirling Wind Vortex (Eddies & Loops)
  { id: 6, type: 'amber-maple', animationClass: 'animate-leaf-swirl-vortex', duration: 13.0, delay: 0.5, topPercent: 20, scale: 1.25, opacity: 0.95 },
  { id: 7, type: 'green-birch', animationClass: 'animate-leaf-swirl-vortex', duration: 12.5, delay: 3.2, topPercent: 50, scale: 1.0, opacity: 0.9 },
  { id: 8, type: 'sakura-petal', animationClass: 'animate-leaf-swirl-vortex', duration: 11.0, delay: 6.0, topPercent: 35, scale: 0.8, opacity: 0.88 },
  { id: 9, type: 'lime-sprout', animationClass: 'animate-leaf-swirl-vortex', duration: 14.0, delay: 8.5, topPercent: 70, scale: 0.9, opacity: 0.92 },

  // Diagonal Wind Drift with 3D Tumbling
  { id: 10, type: 'emerald-mango', animationClass: 'animate-leaf-drift-diagonal', duration: 11.5, delay: 1.0, topPercent: 5, scale: 1.15, opacity: 0.9 },
  { id: 11, type: 'olive-willow', animationClass: 'animate-leaf-drift-diagonal', duration: 12.0, delay: 4.0, topPercent: 18, scale: 1.0, opacity: 0.88 },
  { id: 12, type: 'sakura-petal', animationClass: 'animate-leaf-drift-diagonal', duration: 10.5, delay: 7.5, topPercent: 30, scale: 0.75, opacity: 0.85 },
  { id: 13, type: 'golden-teak', animationClass: 'animate-leaf-drift-diagonal', duration: 13.5, delay: 10.0, topPercent: 10, scale: 1.2, opacity: 0.95 },

  // Fast Somersault Tumbling Leaves
  { id: 14, type: 'green-birch', animationClass: 'animate-leaf-tumble', duration: 7.5, delay: 0.8, topPercent: 25, scale: 1.05, opacity: 0.92 },
  { id: 15, type: 'amber-maple', animationClass: 'animate-leaf-tumble', duration: 8.2, delay: 3.8, topPercent: 55, scale: 1.1, opacity: 0.9 },
  { id: 16, type: 'sakura-petal', animationClass: 'animate-leaf-tumble', duration: 6.5, delay: 6.2, topPercent: 75, scale: 0.8, opacity: 0.85 },
  { id: 17, type: 'lime-sprout', animationClass: 'animate-leaf-tumble', duration: 7.8, delay: 8.8, topPercent: 15, scale: 0.9, opacity: 0.9 },

  // Updraft Thermal Lift (Rising on Wind)
  { id: 18, type: 'olive-willow', animationClass: 'animate-leaf-updraft', duration: 15.0, delay: 1.5, topPercent: 85, scale: 1.1, opacity: 0.9 },
  { id: 19, type: 'sakura-petal', animationClass: 'animate-leaf-updraft', duration: 13.5, delay: 4.5, topPercent: 90, scale: 0.85, opacity: 0.88 },
  { id: 20, type: 'emerald-mango', animationClass: 'animate-leaf-updraft', duration: 16.0, delay: 8.0, topPercent: 80, scale: 1.0, opacity: 0.9 },

  // Harmonic Wave Flutter
  { id: 21, type: 'golden-teak', animationClass: 'animate-leaf-flutter-wave', duration: 11.0, delay: 2.0, topPercent: 40, scale: 1.05, opacity: 0.9 },
  { id: 22, type: 'sakura-petal', animationClass: 'animate-leaf-flutter-wave', duration: 9.8, delay: 5.5, topPercent: 60, scale: 0.8, opacity: 0.85 },
  { id: 23, type: 'green-birch', animationClass: 'animate-leaf-flutter-wave', duration: 12.2, delay: 9.0, topPercent: 22, scale: 0.95, opacity: 0.92 },

  // Counter-Breeze (East -> West gentle swirl)
  { id: 24, type: 'amber-maple', animationClass: 'animate-leaf-counter-breeze', duration: 16.5, delay: 2.5, topPercent: 15, scale: 1.15, opacity: 0.85 },
  { id: 25, type: 'sakura-petal', animationClass: 'animate-leaf-counter-breeze', duration: 14.0, delay: 7.0, topPercent: 48, scale: 0.75, opacity: 0.8 },
  { id: 26, type: 'lime-sprout', animationClass: 'animate-leaf-counter-breeze', duration: 15.5, delay: 11.0, topPercent: 78, scale: 0.9, opacity: 0.88 }
];

export const FlyingLeavesBackground: React.FC = () => {
  const [breezeBoost, setBreezeBoost] = useState(false);

  const triggerBreeze = () => {
    setBreezeBoost(true);
    setTimeout(() => setBreezeBoost(false), 2000);
  };

  const renderLeafSvg = (type: LeafItem['type']) => {
    switch (type) {
      case 'emerald-mango':
        return (
          <svg width="42" height="42" viewBox="0 0 100 100" fill="none" className="drop-shadow-sm filter">
            <defs>
              <linearGradient id="leafGradMango" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="50%" stopColor="#16a34a" />
                <stop offset="100%" stopColor="#14532d" />
              </linearGradient>
            </defs>
            {/* Curved Broad Leaf */}
            <path
              d="M 50 5 Q 85 25 80 65 Q 75 90 50 95 Q 25 90 20 65 Q 15 25 50 5 Z"
              fill="url(#leafGradMango)"
              stroke="#15803d"
              strokeWidth="2"
            />
            {/* Center Midrib */}
            <path d="M 50 8 Q 50 55 50 92" stroke="#bbf7d0" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
            {/* Side Veins */}
            <path d="M 50 30 Q 68 25 74 38" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
            <path d="M 50 45 Q 70 42 75 56" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
            <path d="M 50 62 Q 68 62 70 74" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
            <path d="M 50 30 Q 32 25 26 38" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
            <path d="M 50 45 Q 30 42 25 56" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
            <path d="M 50 62 Q 32 62 30 74" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
            {/* Stem */}
            <path d="M 50 94 Q 48 99 44 102" stroke="#14532d" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case 'green-birch':
        return (
          <svg width="36" height="36" viewBox="0 0 100 100" fill="none" className="drop-shadow-sm filter">
            <defs>
              <linearGradient id="leafGradBirch" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="60%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>
            </defs>
            {/* Serrated margin leaf shape */}
            <path
              d="M 50 8 C 65 18, 85 35, 82 62 C 78 85, 60 92, 50 94 C 40 92, 22 85, 18 62 C 15 35, 35 18, 50 8 Z"
              fill="url(#leafGradBirch)"
              stroke="#16a34a"
              strokeWidth="2"
            />
            {/* Veins */}
            <path d="M 50 12 L 50 92" stroke="#dcfce7" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <path d="M 50 35 L 72 45 M 50 35 L 28 45" stroke="#bbf7d0" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <path d="M 50 52 L 74 65 M 50 52 L 26 65" stroke="#bbf7d0" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <path d="M 50 70 L 68 80 M 50 70 L 32 80" stroke="#bbf7d0" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          </svg>
        );

      case 'golden-teak':
        return (
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" className="drop-shadow-sm filter">
            <defs>
              <linearGradient id="leafGradTeak" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
            </defs>
            <path
              d="M 50 6 Q 88 28 84 66 Q 78 88 50 95 Q 22 88 16 66 Q 12 28 50 6 Z"
              fill="url(#leafGradTeak)"
              stroke="#a16207"
              strokeWidth="2"
            />
            <path d="M 50 10 Q 50 50 50 93" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
            <path d="M 50 32 Q 70 30 76 42 M 50 32 Q 30 30 24 42" stroke="#fef9c3" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
            <path d="M 50 52 Q 72 50 77 65 M 50 52 Q 28 50 23 65" stroke="#fef9c3" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
            <path d="M 50 72 Q 68 70 70 80 M 50 72 Q 32 70 30 80" stroke="#fef9c3" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
          </svg>
        );

      case 'amber-maple':
        return (
          <svg width="44" height="44" viewBox="0 0 100 100" fill="none" className="drop-shadow-sm filter">
            <defs>
              <linearGradient id="leafGradMaple" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="50%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>
            {/* Multi-point Maple lobe outline */}
            <path
              d="M 50 8 L 56 26 L 70 20 L 68 34 L 86 38 L 74 52 L 82 68 L 64 66 L 58 84 L 50 76 L 42 84 L 36 66 L 18 68 L 26 52 L 14 38 L 32 34 L 30 20 L 44 26 Z"
              fill="url(#leafGradMaple)"
              stroke="#9a3412"
              strokeWidth="2"
            />
            <path d="M 50 12 L 50 94" stroke="#fed7aa" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            <path d="M 50 48 L 76 36 M 50 48 L 24 36" stroke="#ffedd5" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
            <path d="M 50 60 L 78 64 M 50 60 L 22 64" stroke="#ffedd5" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
          </svg>
        );

      case 'sakura-petal':
        return (
          <svg width="30" height="30" viewBox="0 0 100 100" fill="none" className="drop-shadow-xs filter">
            <defs>
              <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbcfe8" />
                <stop offset="50%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#db2777" />
              </linearGradient>
            </defs>
            {/* Delicate notched cherry blossom petal */}
            <path
              d="M 50 90 C 30 80, 12 55, 18 32 C 24 10, 42 12, 48 24 C 50 20, 52 20, 54 24 C 60 12, 78 10, 84 32 C 90 55, 72 80, 50 90 Z"
              fill="url(#petalGrad)"
              opacity="0.9"
            />
            {/* Center blush fold */}
            <path d="M 50 26 Q 50 55 50 86" stroke="#fdf2f8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </svg>
        );

      case 'olive-willow':
        return (
          <svg width="34" height="34" viewBox="0 0 100 100" fill="none" className="drop-shadow-sm filter">
            <defs>
              <linearGradient id="leafGradWillow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a3e635" />
                <stop offset="60%" stopColor="#65a30d" />
                <stop offset="100%" stopColor="#3f6212" />
              </linearGradient>
            </defs>
            {/* Long Slender Wind Blade */}
            <path
              d="M 50 4 Q 72 35 64 78 Q 58 96 50 98 Q 42 96 36 78 Q 28 35 50 4 Z"
              fill="url(#leafGradWillow)"
              stroke="#4d7c0f"
              strokeWidth="1.8"
            />
            <path d="M 50 6 L 50 95" stroke="#ecfccb" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </svg>
        );

      case 'lime-sprout':
      default:
        return (
          <svg width="32" height="32" viewBox="0 0 100 100" fill="none" className="drop-shadow-sm filter">
            <defs>
              <linearGradient id="leafGradLime" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#bef264" />
                <stop offset="60%" stopColor="#84cc16" />
                <stop offset="100%" stopColor="#4d7c0f" />
              </linearGradient>
            </defs>
            <path
              d="M 50 10 C 75 25, 80 60, 68 82 C 60 92, 50 96, 50 96 C 50 96, 40 92, 32 82 C 20 60, 25 25, 50 10 Z"
              fill="url(#leafGradLime)"
              stroke="#65a30d"
              strokeWidth="2"
            />
            <path d="M 50 15 L 50 93" stroke="#f7fee7" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </svg>
        );
    }
  };

  return (
    <div
      aria-hidden="true"
      onClick={triggerBreeze}
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden select-none transition-all duration-700 ${
        breezeBoost ? 'scale-[1.01]' : 'scale-100'
      }`}
    >
      {/* 🌸 PALE PINK ATMOSPHERIC BACKGROUND BASE 🌸 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fff2f5] via-[#fde7ee] to-[#fce4ec] pointer-events-none" />

      {/* Subtle Blush / Rose Glow Orbs in the Breeze Sky */}
      <div className="absolute -top-24 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-[#fbcfe8]/40 via-[#fda4af]/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-[#fce7f3]/50 via-[#fbcfe8]/30 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#ffe4e6]/60 via-[#fde2e4]/30 to-transparent blur-3xl pointer-events-none" />

      {/* 🌬️ ANIMATED WIND GUST STREAM CURVES 🌬️ */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-45">
        {/* Wind Gust Layer 1 */}
        <div className="absolute top-[15%] left-0 w-full animate-wind-stream-1 pointer-events-none">
          <svg className="w-full h-24" viewBox="0 0 1200 100" fill="none" preserveAspectRatio="none">
            <path
              d="M -100 50 Q 200 10 500 55 Q 800 95 1100 35 Q 1250 10 1400 45"
              stroke="url(#windRoseGrad1)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="14 12"
              fill="none"
            />
            <path
              d="M -50 35 Q 300 80 700 20 Q 1000 -10 1350 40"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="8 16"
              opacity="0.7"
              fill="none"
            />
            <defs>
              <linearGradient id="windRoseGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f472b6" stopOpacity="0" />
                <stop offset="30%" stopColor="#ec4899" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#f43f5e" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#fda4af" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Wind Gust Layer 2 */}
        <div className="absolute top-[45%] left-0 w-full animate-wind-stream-2 pointer-events-none">
          <svg className="w-full h-28" viewBox="0 0 1200 120" fill="none" preserveAspectRatio="none">
            <path
              d="M -150 70 Q 250 110 600 40 Q 950 -20 1350 60"
              stroke="url(#windRoseGrad2)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="20 15"
              fill="none"
            />
            <path
              d="M 50 85 Q 400 30 800 80 Q 1100 120 1400 50"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="12 18"
              opacity="0.8"
              fill="none"
            />
            <defs>
              <linearGradient id="windRoseGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fb7185" stopOpacity="0" />
                <stop offset="40%" stopColor="#f472b6" stopOpacity="0.9" />
                <stop offset="80%" stopColor="#e11d48" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#ffe4e6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Wind Gust Layer 3 (Low Altitude Swirl) */}
        <div className="absolute top-[72%] left-0 w-full animate-wind-stream-3 pointer-events-none">
          <svg className="w-full h-24" viewBox="0 0 1200 100" fill="none" preserveAspectRatio="none">
            <path
              d="M -80 40 Q 300 -10 650 60 Q 1000 110 1380 30"
              stroke="url(#windRoseGrad1)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="16 14"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* 🌸 FLOATING PINK PETAL DUST PARTICLES 🌸 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <div
            key={`dust-${i}`}
            className="absolute rounded-full bg-rose-400/40 animate-petal-dust"
            style={{
              width: `${4 + (i % 4) * 2}px`,
              height: `${4 + (i % 4) * 2}px`,
              top: `${(i * 6.2) % 95}%`,
              left: `${(i * 7.8) % 95}%`,
              animationDuration: `${5 + (i % 5) * 1.5}s`,
              animationDelay: `${(i * 0.4)}s`,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </div>

      {/* 🍃 3D ANIMATED FLYING LEAVES ("FLYING HERE AND THERE CAUSE OF WIND") 🍃 */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" style={{ perspective: 1200 }}>
        {INITIAL_LEAVES.map((leaf) => (
          <div
            key={leaf.id}
            className={`absolute ${leaf.animationClass}`}
            style={
              {
                top: `${leaf.topPercent}%`,
                left: 0,
                opacity: leaf.opacity,
                transform: `scale(${leaf.scale})`,
                '--leaf-duration': `${leaf.duration}s`,
                '--leaf-delay': `${leaf.delay}s`,
              } as React.CSSProperties
            }
          >
            {renderLeafSvg(leaf.type)}
          </div>
        ))}
      </div>

      {/* Wind Direction Indicator Badge in Bottom Corner */}
      <div className="absolute bottom-4 right-6 pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-100/80 border border-pink-300/60 shadow-xs backdrop-blur-xs text-pink-900 text-xs font-semibold select-none opacity-60 hover:opacity-100 transition-opacity">
        <Wind className="w-3.5 h-3.5 text-pink-600 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Gentle Farm Breeze • Flying Leaves</span>
      </div>
    </div>
  );
};
