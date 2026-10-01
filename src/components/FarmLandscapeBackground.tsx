import React from 'react';

export const FarmLandscapeBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none opacity-30 sm:opacity-35 transition-opacity duration-1000"
    >
      {/* Sky & Atmospheric Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100/40 via-emerald-50/20 to-amber-900/10" />

      {/* Sun & Light Rays in Top Right */}
      <div className="absolute -top-16 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-amber-300/25 via-yellow-200/15 to-transparent blur-3xl" />

      {/* Distant Flying Birds */}
      <div className="absolute top-12 left-1/4 animate-birds-fly opacity-60">
        <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bird 1 */}
          <path d="M 10 20 Q 20 10 30 20 Q 40 10 50 20" stroke="#4a5568" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Bird 2 */}
          <path d="M 55 12 Q 62 5 70 12 Q 78 5 85 12" stroke="#4a5568" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          {/* Bird 3 */}
          <path d="M 85 24 Q 92 18 100 24 Q 108 18 115 24" stroke="#4a5568" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* Drifting Clouds */}
      <div className="absolute top-8 left-[-10%] w-[120%] animate-clouds-drift opacity-40">
        <svg width="100%" height="90" viewBox="0 0 1400 90" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M 100 60 Q 140 20 190 40 Q 240 10 290 35 Q 340 25 380 60 Z"
            fill="url(#cloudGrad1)"
          />
          <path
            d="M 700 70 Q 750 30 810 50 Q 870 20 920 45 Q 970 30 1020 70 Z"
            fill="url(#cloudGrad1)"
          />
          <defs>
            <linearGradient id="cloudGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d1fae5" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Layer 1: Distant Rolling Green & Gold Hills with Coconut Palms */}
      <div className="absolute bottom-0 left-0 right-0 h-[480px]">
        <svg
          className="w-full h-full"
          viewBox="0 0 1600 480"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="distantHills" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.4" />
            </linearGradient>

            <linearGradient id="midFurrowField" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#84cc16" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#65a30d" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#4d7c0f" stopOpacity="0.6" />
            </linearGradient>

            <linearGradient id="ploughedSoilBase" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#854d0e" stopOpacity="0.55" />
              <stop offset="40%" stopColor="#713f12" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#451a03" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="furrowRidgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3d1e06" />
              <stop offset="50%" stopColor="#854d0e" />
              <stop offset="100%" stopColor="#3d1e06" />
            </linearGradient>

            <pattern id="soilLines" width="40" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
              <line x1="0" y1="10" x2="40" y2="10" stroke="#542e0c" strokeWidth="2.5" opacity="0.6" />
              <line x1="0" y1="18" x2="40" y2="18" stroke="#a16207" strokeWidth="1" opacity="0.4" />
            </pattern>
          </defs>

          {/* Far Distant Mountain Ridges */}
          <path
            d="M 0 160 Q 250 80 550 140 Q 850 190 1150 110 Q 1400 70 1600 130 L 1600 480 L 0 480 Z"
            fill="url(#distantHills)"
          />

          {/* Silhouette Palm Trees on Ridge */}
          <g opacity="0.5" fill="#047857">
            {/* Tree cluster 1 */}
            <path d="M 220 120 Q 225 90 230 65 L 233 65 Q 228 90 224 120 Z" />
            <path d="M 230 65 Q 210 50 195 60 Q 212 56 230 65 Z" />
            <path d="M 230 65 Q 220 40 210 42 Q 225 48 230 65 Z" />
            <path d="M 230 65 Q 240 38 250 42 Q 238 48 230 65 Z" />
            <path d="M 230 65 Q 255 52 265 62 Q 248 58 230 65 Z" />

            {/* Tree cluster 2 */}
            <path d="M 1280 110 Q 1284 85 1290 60 L 1293 60 Q 1287 85 1284 110 Z" />
            <path d="M 1290 60 Q 1270 45 1255 55 Q 1272 51 1290 60 Z" />
            <path d="M 1290 60 Q 1300 35 1310 40 Q 1298 46 1290 60 Z" />
            <path d="M 1290 60 Q 1315 50 1325 60 Q 1308 55 1290 60 Z" />
          </g>

          {/* Midground Green Fields */}
          <path
            d="M 0 210 Q 350 160 700 220 Q 1100 270 1600 190 L 1600 480 L 0 480 Z"
            fill="url(#midFurrowField)"
          />

          {/* Foreground Deep Terracotta Ploughed Earth & Soil Furrows */}
          <path
            d="M 0 280 Q 400 240 850 290 Q 1300 330 1600 270 L 1600 480 L 0 480 Z"
            fill="url(#ploughedSoilBase)"
          />

          {/* Ploughed Earth Texture Overlay */}
          <path
            d="M 0 280 Q 400 240 850 290 Q 1300 330 1600 270 L 1600 480 L 0 480 Z"
            fill="url(#soilLines)"
          />

          {/* Multiple Curved Ploughed Soil Furrow Ridges */}
          <g fill="none" stroke="url(#furrowRidgeGrad)" strokeLinecap="round">
            <path d="M -50 310 Q 400 270 900 320 Q 1350 360 1650 300" strokeWidth="6" opacity="0.8" />
            <path d="M -50 345 Q 420 300 950 355 Q 1400 395 1650 335" strokeWidth="7" opacity="0.85" />
            <path d="M -50 385 Q 450 335 1000 390 Q 1450 435 1650 375" strokeWidth="8" opacity="0.9" />
            <path d="M -50 430 Q 480 375 1050 435 Q 1500 480 1650 420" strokeWidth="10" opacity="0.95" />
            <path d="M -50 475 Q 500 420 1100 480 L 1650 470" strokeWidth="12" opacity="1" />
          </g>

          {/* Little Sprouting Green Shoots in Furrows */}
          <g fill="#4ade80" opacity="0.8">
            <path d="M 120 378 Q 115 368 122 362 Q 125 372 120 378 Z" />
            <path d="M 123 378 Q 130 370 125 364 Q 120 372 123 378 Z" />

            <path d="M 340 422 Q 335 412 342 406 Q 345 416 340 422 Z" />
            <path d="M 343 422 Q 350 414 345 408 Q 340 416 343 422 Z" />

            <path d="M 680 382 Q 675 372 682 366 Q 685 376 680 382 Z" />
            <path d="M 683 382 Q 690 374 685 368 Q 680 376 683 382 Z" />

            <path d="M 1120 426 Q 1115 416 1122 410 Q 1125 420 1120 426 Z" />
            <path d="M 1123 426 Q 1130 418 1125 412 Q 1120 420 1123 426 Z" />

            <path d="M 1410 366 Q 1405 356 1412 350 Q 1415 360 1410 366 Z" />
            <path d="M 1413 366 Q 1420 358 1415 352 Q 1410 360 1413 366 Z" />
          </g>
        </svg>
      </div>

      {/* 2. ANIMATED TRACTOR PLOUGHING THE FIELD (Driving left to right along the furrow line) */}
      <div className="absolute bottom-18 left-0 w-full animate-tractor-drive pointer-events-none">
        <div className="relative w-56 h-28 transform -scale-x-100">
          {/* Tractor Vehicle Body and Chassis */}
          <svg viewBox="0 0 220 120" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="tractorRedBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="50%" stopColor="#991b1b" />
                <stop offset="100%" stopColor="#7f1d1d" />
              </linearGradient>

              <linearGradient id="tractorGreenHood" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#16a34a" />
                <stop offset="60%" stopColor="#15803d" />
                <stop offset="100%" stopColor="#14532d" />
              </linearGradient>

              <radialGradient id="wheelRubberGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#52525b" />
                <stop offset="60%" stopColor="#27272a" />
                <stop offset="100%" stopColor="#09090b" />
              </radialGradient>

              <linearGradient id="steelBlade" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="60%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
            </defs>

            {/* Attached Steel Plough Behind Tractor (Left in flipped view) */}
            <g id="ploughMechanism">
              {/* Tow Hitch Bar */}
              <line x1="30" y1="75" x2="60" y2="70" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
              {/* Curved Plough Frame */}
              <path d="M 30 75 Q 18 85 10 98" stroke="#334155" strokeWidth="4.5" fill="none" />
              <path d="M 22 78 Q 12 88 5 102" stroke="#334155" strokeWidth="4.5" fill="none" />
              {/* Plough Share Blades / Discs cutting into ground */}
              <polygon points="10,96 16,106 4,108" fill="url(#steelBlade)" stroke="#0f172a" strokeWidth="1" />
              <polygon points="5,100 11,110 -1,112" fill="url(#steelBlade)" stroke="#0f172a" strokeWidth="1" />

              {/* Ploughed Dirt / Turned Soil Spraying from Plough */}
              <g className="animate-soil-spray">
                <circle cx="2" cy="106" r="3" fill="#713f12" />
                <circle cx="-4" cy="102" r="2.5" fill="#854d0e" />
                <circle cx="-8" cy="107" r="2" fill="#a16207" />
                <circle cx="-3" cy="111" r="3.5" fill="#451a03" />
                <circle cx="-12" cy="104" r="1.5" fill="#854d0e" />
              </g>
            </g>

            {/* Tractor Driver Silhouette */}
            <g id="farmerDriver">
              {/* Head / Turban */}
              <circle cx="88" cy="32" r="8" fill="#f59e0b" />
              {/* Face/Beard */}
              <circle cx="91" cy="34" r="5" fill="#b45309" />
              {/* Body / Shirt */}
              <path d="M 80 44 L 96 44 L 94 65 L 78 65 Z" fill="#ffffff" />
              {/* Arms reaching for steering wheel */}
              <path d="M 88 48 L 102 52" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* Tractor Cabin / Roll Cage Bars */}
            <path
              d="M 62 70 L 66 22 L 104 22 L 108 55"
              stroke="#e2e8f0"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Canopy Roof */}
            <path d="M 60 22 L 112 22 L 110 18 L 62 18 Z" fill="#047857" />

            {/* Steering Column & Wheel */}
            <line x1="98" y1="58" x2="105" y2="48" stroke="#18181b" strokeWidth="3" />
            <ellipse cx="106" cy="47" rx="3" ry="7" fill="#27272a" />

            {/* Tractor Main Engine Hood / Body (Green Agro styling) */}
            <path
              d="M 104 55 L 175 55 Q 182 55 184 62 L 186 78 L 104 78 Z"
              fill="url(#tractorGreenHood)"
              stroke="#064e3b"
              strokeWidth="1.5"
            />
            {/* Engine Grille / Headlight */}
            <polygon points="184,62 186,78 181,78 179,62" fill="#0f172a" />
            <circle cx="182" cy="66" r="3.5" fill="#fef08a" />
            {/* Yellow Agro Racing Stripe */}
            <line x1="110" y1="67" x2="182" y2="67" stroke="#facc15" strokeWidth="2.5" />

            {/* Exhaust Chimney Pipe */}
            <path d="M 160 55 L 160 30 L 164 27" stroke="#334155" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            {/* Exhaust Smoke Animation */}
            <g className="animate-exhaust-puff">
              <circle cx="166" cy="24" r="3.5" fill="#94a3b8" opacity="0.6" />
              <circle cx="170" cy="18" r="5" fill="#cbd5e1" opacity="0.4" />
              <circle cx="175" cy="10" r="7" fill="#e2e8f0" opacity="0.25" />
            </g>

            {/* Mudguards / Fenders */}
            <path
              d="M 52 75 Q 75 42 100 75"
              stroke="#15803d"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 152 76 Q 168 58 185 76"
              stroke="#15803d"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Large Rear Tractor Treaded Wheel */}
            <g className="animate-wheel-spin origin-[76px_78px]">
              <circle cx="76" cy="78" r="28" fill="url(#wheelRubberGrad)" stroke="#18181b" strokeWidth="2" />
              {/* Wheel Deep Grooves / Heavy Treads */}
              <circle cx="76" cy="78" r="26" stroke="#09090b" strokeWidth="3" strokeDasharray="6 6" fill="none" />
              {/* Yellow Hub Rim */}
              <circle cx="76" cy="78" r="14" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
              {/* Center Axle Nut */}
              <circle cx="76" cy="78" r="5" fill="#451a03" />
              <line x1="66" y1="78" x2="86" y2="78" stroke="#713f12" strokeWidth="2.5" />
              <line x1="76" y1="68" x2="76" y2="88" stroke="#713f12" strokeWidth="2.5" />
            </g>

            {/* Front Steering Wheel */}
            <g className="animate-wheel-spin origin-[168px_82px]">
              <circle cx="168" cy="82" r="16" fill="url(#wheelRubberGrad)" stroke="#18181b" strokeWidth="2" />
              {/* Treads */}
              <circle cx="168" cy="82" r="14" stroke="#09090b" strokeWidth="2" strokeDasharray="4 4" fill="none" />
              {/* Yellow Hub Rim */}
              <circle cx="168" cy="82" r="8" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
              <circle cx="168" cy="82" r="3" fill="#451a03" />
            </g>
          </svg>
        </div>
      </div>

      {/* 3. ANIMATED FARMER SOWING SEEDS (Walking rhythmically across the furrow & scattering seeds) */}
      <div className="absolute bottom-14 right-1/4 animate-farmer-sow pointer-events-none">
        <div className="relative w-28 h-36">
          <svg viewBox="0 0 100 130" className="w-full h-full overflow-visible">
            {/* Farmer Character Silhouette / Illustration */}
            <g id="farmerWalkingMan">
              {/* Traditional Headgear (Paghadi / Thalapa) */}
              <path
                d="M 44 22 Q 50 14 58 18 Q 66 14 70 24 Q 58 20 44 22 Z"
                fill="#f59e0b"
                stroke="#d97706"
                strokeWidth="1"
              />
              <circle cx="56" cy="23" r="8" fill="#d97706" />

              {/* Farmer Head / Face */}
              <circle cx="56" cy="27" r="7" fill="#92400e" />

              {/* Upper Body (Traditional Cotton Kurta / Vest) */}
              <path
                d="M 46 35 L 66 35 L 68 64 L 44 64 Z"
                fill="#f8fafc"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />

              {/* Left Arm Holding Wicker Seed Basket (Vithai Koodai) */}
              <path d="M 48 38 L 40 48 L 46 54" stroke="#92400e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              {/* Wicker Basket */}
              <ellipse cx="38" cy="54" rx="9" ry="6" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
              <path d="M 29 54 Q 38 64 47 54 Z" fill="#92400e" />
              {/* Seeds piled in basket */}
              <ellipse cx="38" cy="52" rx="7" ry="3" fill="#fde047" />

              {/* Right Arm: Sowing Motion Scattering Seeds (Animated Arm Sweep) */}
              <g className="animate-sow-arm origin-[64px_38px]">
                <path d="M 64 38 L 76 46 L 86 42" stroke="#92400e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                {/* Hand casting seeds */}
                <circle cx="87" cy="42" r="2.5" fill="#92400e" />

                {/* Floating Scattered Seeds Falling onto Earth */}
                <g className="animate-seeds-fall">
                  <circle cx="92" cy="44" r="1.6" fill="#facc15" />
                  <circle cx="98" cy="50" r="1.4" fill="#fef08a" />
                  <circle cx="94" cy="58" r="1.5" fill="#eab308" />
                  <circle cx="104" cy="62" r="1.3" fill="#facc15" />
                  <circle cx="90" cy="68" r="1.4" fill="#ca8a04" />
                  <circle cx="102" cy="75" r="1.5" fill="#facc15" />
                  <circle cx="96" cy="85" r="1.6" fill="#eab308" />
                </g>
              </g>

              {/* Traditional White Dhoti / Veshti (Tucked for Farm Work) */}
              <path
                d="M 44 64 L 68 64 L 64 90 L 48 90 Z"
                fill="#f1f5f9"
                stroke="#cbd5e1"
                strokeWidth="1.2"
              />

              {/* Walking Legs Cycle */}
              <g className="animate-legs-walk">
                {/* Left Leg */}
                <path d="M 50 88 L 46 110 L 42 116" stroke="#92400e" strokeWidth="4" fill="none" strokeLinecap="round" />
                {/* Right Leg */}
                <path d="M 62 88 L 68 108 L 74 114" stroke="#92400e" strokeWidth="4" fill="none" strokeLinecap="round" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* Subtle Golden Horizon Sunlight Gradient Band */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-950/20 via-emerald-950/10 to-transparent pointer-events-none" />
    </div>
  );
};
