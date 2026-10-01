import React from 'react';

export const FarmLandscapeBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none opacity-60 sm:opacity-75 transition-opacity duration-700"
    >
      {/* Golden Sunrise / Sunburst Glow in Top Right */}
      <div className="absolute -top-12 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-amber-300/30 via-yellow-100/20 to-transparent blur-3xl pointer-events-none" />

      {/* Sky & Horizon Soft Color Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/60 via-emerald-50/30 to-amber-950/15 pointer-events-none" />

      {/* Flock of Birds Soaring Across the Sky */}
      <div className="absolute top-16 left-0 w-full animate-birds-fly pointer-events-none">
        <svg width="180" height="50" viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70">
          <path d="M 10 25 Q 22 12 35 25 Q 48 12 60 25" stroke="#334155" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M 65 15 Q 75 5 86 15 Q 97 5 108 15" stroke="#334155" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 115 28 Q 124 20 134 28 Q 144 20 154 28" stroke="#334155" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* Drifting Morning Clouds */}
      <div className="absolute top-6 left-[-5%] w-[110%] animate-clouds-drift pointer-events-none opacity-50">
        <svg width="100%" height="80" viewBox="0 0 1400 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M 120 50 Q 160 15 210 35 Q 260 10 310 30 Q 360 20 400 50 Z" fill="white" opacity="0.85" />
          <path d="M 750 60 Q 800 20 860 40 Q 920 15 970 38 Q 1020 25 1070 60 Z" fill="white" opacity="0.8" />
        </svg>
      </div>

      {/* FULL-HEIGHT ROLLING HILLS, PLOUGHED FURROWS & TERRACED FIELDS */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <svg
          className="w-full h-full min-h-[900px]"
          viewBox="0 0 1600 1000"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Distant Hills Gradient */}
            <linearGradient id="hillGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#86efac" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#4ade80" stopOpacity="0.3" />
            </linearGradient>

            {/* Mid Terrace Farm Gradient */}
            <linearGradient id="midFieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#65a30d" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#4d7c0f" stopOpacity="0.5" />
            </linearGradient>

            {/* Ploughed Earth Ground Gradient */}
            <linearGradient id="earthSoilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#92400e" stopOpacity="0.5" />
              <stop offset="35%" stopColor="#78350f" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#542807" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#301503" stopOpacity="0.95" />
            </linearGradient>

            {/* Ploughed Furrow Ridge Lines Gradient */}
            <linearGradient id="furrowLinesGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#451a03" />
              <stop offset="25%" stopColor="#9a3412" />
              <stop offset="50%" stopColor="#b45309" />
              <stop offset="75%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#3d1a04" />
            </linearGradient>

            {/* Earthen Soil Repeating Line Texture */}
            <pattern id="soilStrips" width="50" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(-6)">
              <line x1="0" y1="12" x2="50" y2="12" stroke="#451a03" strokeWidth="3" opacity="0.65" />
              <line x1="0" y1="20" x2="50" y2="20" stroke="#b45309" strokeWidth="1.5" opacity="0.45" />
            </pattern>
          </defs>

          {/* 1. Distant Serene Hills */}
          <path
            d="M 0 280 Q 300 180 650 250 Q 1000 320 1300 220 Q 1480 180 1600 240 L 1600 1000 L 0 1000 Z"
            fill="url(#hillGrad1)"
          />

          {/* Silhouette Palm & Banyan Trees along Horizon */}
          <g opacity="0.6" fill="#047857">
            {/* Left Palm Cluster */}
            <path d="M 280 240 Q 286 190 292 140 L 296 140 Q 290 190 284 240 Z" />
            <path d="M 292 140 Q 268 120 250 135 Q 270 128 292 140 Z" />
            <path d="M 292 140 Q 280 105 268 110 Q 286 118 292 140 Z" />
            <path d="M 292 140 Q 306 102 320 108 Q 304 118 292 140 Z" />
            <path d="M 292 140 Q 325 122 338 138 Q 315 130 292 140 Z" />

            {/* Right Palm Cluster */}
            <path d="M 1320 220 Q 1326 175 1332 130 L 1336 130 Q 1330 175 1324 220 Z" />
            <path d="M 1332 130 Q 1308 112 1290 125 Q 1310 118 1332 130 Z" />
            <path d="M 1332 130 Q 1345 98 1360 105 Q 1344 114 1332 130 Z" />
            <path d="M 1332 130 Q 1365 115 1378 130 Q 1355 122 1332 130 Z" />
          </g>

          {/* 2. Midground Lush Agricultural Terraces */}
          <path
            d="M 0 360 Q 400 290 850 370 Q 1250 440 1600 340 L 1600 1000 L 0 1000 Z"
            fill="url(#midFieldGrad)"
          />

          {/* 3. Foreground Deep Ploughed Soil Bed */}
          <path
            d="M 0 460 Q 450 390 950 480 Q 1350 540 1600 450 L 1600 1000 L 0 1000 Z"
            fill="url(#earthSoilGrad)"
          />

          {/* Earthen Soil Pattern */}
          <path
            d="M 0 460 Q 450 390 950 480 Q 1350 540 1600 450 L 1600 1000 L 0 1000 Z"
            fill="url(#soilStrips)"
          />

          {/* Rhythmic Deep Curved Furrow Ridges */}
          <g fill="none" stroke="url(#furrowLinesGrad)" strokeLinecap="round">
            <path d="M -50 490 Q 450 420 980 505 Q 1400 560 1650 480" strokeWidth="7" opacity="0.85" />
            <path d="M -50 540 Q 480 465 1020 560 Q 1430 620 1650 535" strokeWidth="8.5" opacity="0.9" />
            <path d="M -50 600 Q 510 520 1070 620 Q 1470 685 1650 595" strokeWidth="10" opacity="0.92" />
            <path d="M -50 670 Q 540 580 1120 690 Q 1500 750 1650 660" strokeWidth="11" opacity="0.95" />
            <path d="M -50 750 Q 570 650 1180 770 Q 1530 825 1650 735" strokeWidth="13" opacity="0.97" />
            <path d="M -50 840 Q 600 730 1240 855 Q 1560 900 1650 820" strokeWidth="15" opacity="1" />
            <path d="M -50 930 Q 630 820 1300 945 L 1650 910" strokeWidth="17" opacity="1" />
          </g>

          {/* Sprouting Green Crops Growing Along Ploughed Ridges */}
          <g fill="#22c55e" opacity="0.9">
            <path d="M 140 585 Q 132 570 144 560 Q 148 574 140 585 Z" />
            <path d="M 145 585 Q 156 572 148 562 Q 141 574 145 585 Z" />

            <path d="M 380 652 Q 372 636 384 624 Q 388 640 380 652 Z" />
            <path d="M 385 652 Q 396 638 388 626 Q 381 640 385 652 Z" />

            <path d="M 720 605 Q 712 590 724 580 Q 728 594 720 605 Z" />
            <path d="M 725 605 Q 736 592 728 582 Q 721 594 725 605 Z" />

            <path d="M 1180 670 Q 1172 654 1184 642 Q 1188 658 1180 670 Z" />
            <path d="M 1185 670 Q 1196 656 1188 644 Q 1181 658 1185 670 Z" />

            <path d="M 1450 580 Q 1442 566 1454 556 Q 1458 570 1450 580 Z" />
            <path d="M 1455 580 Q 1466 568 1458 558 Q 1451 570 1455 580 Z" />
          </g>
        </svg>
      </div>

      {/* 2. ANIMATED TRACTOR ACTIVELY PLOUGHING THE LAND (Drives continuously across midground field) */}
      <div className="absolute top-[480px] sm:top-[420px] left-0 w-full animate-tractor-drive pointer-events-none z-10">
        <div className="relative w-64 h-32 sm:w-72 sm:h-36 transform -scale-x-100 filter drop-shadow-md">
          <svg viewBox="0 0 240 130" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="tractorRedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>

              <linearGradient id="tractorGreenHoodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="50%" stopColor="#16a34a" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>

              <radialGradient id="heavyTireGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#52525b" />
                <stop offset="65%" stopColor="#27272a" />
                <stop offset="100%" stopColor="#09090b" />
              </radialGradient>

              <linearGradient id="bladeSteel" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f1f5f9" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>

            {/* Connected Multi-Disc Plough Behind Tractor */}
            <g id="ploughMechanism">
              {/* Heavy Metal Hitch Tow Bar */}
              <line x1="28" y1="80" x2="65" y2="76" stroke="#0f172a" strokeWidth="5.5" strokeLinecap="round" />
              {/* Triangular Steel Hitch Brackets */}
              <polygon points="36,78 22,96 46,92" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
              {/* Curved Heavy Steel Plough Shares */}
              <path d="M 28 80 Q 14 94 4 110" stroke="#1e293b" strokeWidth="5" fill="none" />
              <path d="M 40 82 Q 26 98 16 114" stroke="#1e293b" strokeWidth="5" fill="none" />
              {/* High-Grade Steel Cutting Blades in Ground */}
              <polygon points="4,106 14,118 -2,120" fill="url(#bladeSteel)" stroke="#0f172a" strokeWidth="1.5" />
              <polygon points="16,110 26,122 10,124" fill="url(#bladeSteel)" stroke="#0f172a" strokeWidth="1.5" />

              {/* Dynamic Ploughed Soil Spray Particles */}
              <g className="animate-soil-spray">
                <circle cx="2" cy="116" r="4.5" fill="#713f12" />
                <circle cx="-6" cy="110" r="3.5" fill="#854d0e" />
                <circle cx="-12" cy="116" r="3" fill="#a16207" />
                <circle cx="-4" cy="122" r="5" fill="#451a03" />
                <circle cx="-18" cy="112" r="2.5" fill="#78350f" />
                <circle cx="-24" cy="117" r="2" fill="#9a3412" />
              </g>
            </g>

            {/* Tractor Driver in Traditional Headwear */}
            <g id="tractorDriverFigure">
              {/* Saffron Turban / Paghadi */}
              <circle cx="94" cy="34" r="9" fill="#f59e0b" />
              <path d="M 86 32 Q 94 22 104 28 Q 98 38 86 32 Z" fill="#d97706" />
              {/* Face */}
              <circle cx="98" cy="37" r="6" fill="#92400e" />
              {/* White Shirt */}
              <path d="M 86 46 L 104 46 L 102 70 L 84 70 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
              {/* Hands on Steering Wheel */}
              <path d="M 94 52 L 110 56" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
            </g>

            {/* Tractor Safety Roll Cage & Canopy Roof */}
            <path
              d="M 68 76 L 72 24 L 114 24 L 118 62"
              stroke="#e2e8f0"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Green Canopy Top */}
            <polygon points="66,24 120,24 118,18 68,18" fill="#15803d" stroke="#166534" strokeWidth="1.5" />

            {/* Steering Wheel Assembly */}
            <line x1="106" y1="64" x2="114" y2="52" stroke="#18181b" strokeWidth="3.5" />
            <ellipse cx="115" cy="51" rx="3.5" ry="8" fill="#27272a" />

            {/* Main Engine Hood (High-Luster Agro Green) */}
            <path
              d="M 114 60 L 190 60 Q 198 60 200 68 L 202 85 L 114 85 Z"
              fill="url(#tractorGreenHoodGradient)"
              stroke="#0f172a"
              strokeWidth="2"
            />
            {/* Chrome/Yellow Racing Decal */}
            <line x1="120" y1="72" x2="198" y2="72" stroke="#facc15" strokeWidth="3" />
            {/* Front Grill & Bright Headlamp */}
            <polygon points="200,68 202,85 197,85 195,68" fill="#0f172a" />
            <circle cx="198" cy="72" r="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />

            {/* Exhaust Chimney & Smoke */}
            <path d="M 174 60 L 174 32 L 179 28" stroke="#334155" strokeWidth="4" fill="none" strokeLinecap="round" />
            <g className="animate-exhaust-puff">
              <circle cx="182" cy="24" r="4.5" fill="#94a3b8" opacity="0.7" />
              <circle cx="188" cy="16" r="6.5" fill="#cbd5e1" opacity="0.5" />
              <circle cx="195" cy="8" r="9" fill="#f1f5f9" opacity="0.35" />
            </g>

            {/* Rear & Front Heavy Mudguards */}
            <path d="M 56 82 Q 82 46 110 82" stroke="#15803d" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M 164 84 Q 182 62 202 84" stroke="#15803d" strokeWidth="6" fill="none" strokeLinecap="round" />

            {/* Large Heavy-Duty Rear Wheel with Animated Spin */}
            <g className="animate-wheel-spin origin-[82px_85px]">
              <circle cx="82" cy="85" r="32" fill="url(#heavyTireGrad)" stroke="#09090b" strokeWidth="2.5" />
              {/* Deep Agricultural Treads */}
              <circle cx="82" cy="85" r="29" stroke="#000000" strokeWidth="4.5" strokeDasharray="8 6" fill="none" />
              {/* Bright Yellow Metallic Hub */}
              <circle cx="82" cy="85" r="16" fill="#facc15" stroke="#ca8a04" strokeWidth="2.5" />
              {/* Center Axle Bolts */}
              <circle cx="82" cy="85" r="6" fill="#451a03" />
              <line x1="72" y1="85" x2="92" y2="85" stroke="#713f12" strokeWidth="3" />
              <line x1="82" y1="75" x2="82" y2="95" stroke="#713f12" strokeWidth="3" />
            </g>

            {/* Front Steering Wheel with Animated Spin */}
            <g className="animate-wheel-spin origin-[184px_90px]">
              <circle cx="184" cy="90" r="18" fill="url(#heavyTireGrad)" stroke="#09090b" strokeWidth="2" />
              <circle cx="184" cy="90" r="16" stroke="#000000" strokeWidth="3" strokeDasharray="5 5" fill="none" />
              <circle cx="184" cy="90" r="9" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
              <circle cx="184" cy="90" r="4" fill="#451a03" />
            </g>
          </svg>
        </div>
      </div>

      {/* 3. ANIMATED FARMER SOWING SEEDS ACROSS THE FURROWS */}
      <div className="absolute top-[620px] sm:top-[560px] right-[15%] sm:right-[22%] animate-farmer-sow pointer-events-none z-10">
        <div className="relative w-36 h-48 sm:w-44 sm:h-56 filter drop-shadow-md">
          <svg viewBox="0 0 120 150" className="w-full h-full overflow-visible">
            {/* Farmer Character */}
            <g id="farmerWalkingMan">
              {/* Traditional Golden/Orange Turban */}
              <path
                d="M 52 24 Q 60 14 70 18 Q 80 14 84 26 Q 70 22 52 24 Z"
                fill="#f59e0b"
                stroke="#b45309"
                strokeWidth="1.5"
              />
              <circle cx="68" cy="25" r="9" fill="#d97706" />

              {/* Farmer Head & Face */}
              <circle cx="68" cy="30" r="8.5" fill="#92400e" />

              {/* Traditional White Kurta / Field Shirt */}
              <path
                d="M 56 40 L 80 40 L 82 75 L 54 75 Z"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="1.8"
              />

              {/* Left Arm Carrying Wicker Seed Basket (Vithai Koodai) */}
              <path d="M 58 44 L 48 56 L 56 64" stroke="#92400e" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              {/* Wicker Basket Full of Seeds */}
              <ellipse cx="46" cy="64" rx="12" ry="8" fill="#b45309" stroke="#78350f" strokeWidth="2" />
              <path d="M 34 64 Q 46 76 58 64 Z" fill="#92400e" />
              {/* Golden Seeds in Basket */}
              <ellipse cx="46" cy="61" rx="9.5" ry="4.5" fill="#fde047" />

              {/* Right Arm Sowing Motion (Casting Seeds across soil) */}
              <g className="animate-sow-arm origin-[78px_44px]">
                <path d="M 78 44 L 94 54 L 108 48" stroke="#92400e" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                <circle cx="109" cy="48" r="3.5" fill="#92400e" />

                {/* Sparkling Golden Seeds Floating and Showering into Earth */}
                <g className="animate-seeds-fall">
                  <circle cx="114" cy="50" r="2.2" fill="#facc15" />
                  <circle cx="122" cy="58" r="2" fill="#fef08a" />
                  <circle cx="116" cy="68" r="2.2" fill="#eab308" />
                  <circle cx="128" cy="74" r="1.8" fill="#facc15" />
                  <circle cx="110" cy="82" r="2" fill="#ca8a04" />
                  <circle cx="126" cy="92" r="2.2" fill="#facc15" />
                  <circle cx="118" cy="106" r="2.4" fill="#eab308" />
                </g>
              </g>

              {/* Traditional White Dhoti / Veshti */}
              <path
                d="M 54 75 L 82 75 L 78 106 L 58 106 Z"
                fill="#f8fafc"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />

              {/* Stepping Legs Cycle */}
              <g className="animate-legs-walk">
                {/* Back Leg */}
                <path d="M 62 104 L 56 128 L 50 136" stroke="#92400e" strokeWidth="5" fill="none" strokeLinecap="round" />
                {/* Front Leg */}
                <path d="M 74 104 L 82 126 L 90 134" stroke="#92400e" strokeWidth="5" fill="none" strokeLinecap="round" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
