/**
 * Preset leaf specimens for quick testing and demonstration of plant disease recognition.
 */
export interface SampleSpecimen {
  id: string;
  name: string;
  crop: string;
  expectedDisease: string;
  isHealthy: boolean;
  dataUrl: string;
}

// Generates crisp SVG data URIs representing distinct diseased and healthy crop leaves
function createLeafSvgDataUrl(bgHue: string, spotColor: string, isHealthy: boolean, label: string): string {
  const spots = isHealthy
    ? ''
    : `
      <circle cx="150" cy="120" r="18" fill="${spotColor}" opacity="0.85" />
      <circle cx="150" cy="120" r="26" fill="${spotColor}" opacity="0.25" />
      <circle cx="190" cy="160" r="12" fill="${spotColor}" opacity="0.9" />
      <circle cx="110" cy="180" r="15" fill="${spotColor}" opacity="0.85" />
      <circle cx="130" cy="220" r="20" fill="${spotColor}" opacity="0.8" />
      <circle cx="170" cy="240" r="14" fill="${spotColor}" opacity="0.85" />
      <circle cx="210" cy="200" r="10" fill="${spotColor}" opacity="0.75" />
      <!-- Necrotic ring halo -->
      <ellipse cx="145" cy="170" rx="45" ry="30" fill="none" stroke="${spotColor}" stroke-width="3" stroke-dasharray="4,4" opacity="0.6" />
    `;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="600" height="600">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f8fafc"/>
        <stop offset="100%" stop-color="#e2e8f0"/>
      </linearGradient>
      <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgHue}"/>
        <stop offset="100%" stop-color="#14532d"/>
      </linearGradient>
    </defs>
    <rect width="300" height="300" fill="url(#bgGrad)" />
    <!-- Leaf Stem -->
    <path d="M 150 280 C 150 220 150 180 150 40" stroke="#166534" stroke-width="5" stroke-linecap="round" fill="none"/>
    <!-- Leaf Blade -->
    <path d="M 150 40 C 230 90 250 200 150 270 C 50 200 70 90 150 40 Z" fill="url(#leafGrad)" stroke="#14532d" stroke-width="2" />
    <!-- Veins -->
    <path d="M 150 80 Q 190 100 215 120 M 150 120 Q 200 145 225 170 M 150 160 Q 200 185 220 210 M 150 200 Q 185 220 200 240" stroke="#166534" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.7"/>
    <path d="M 150 80 Q 110 100 85 120 M 150 120 Q 100 145 75 170 M 150 160 Q 100 185 80 210 M 150 200 Q 115 220 100 240" stroke="#166534" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.7"/>
    ${spots}
    <!-- Label Banner -->
    <rect x="15" y="15" width="270" height="28" rx="6" fill="#0f172a" opacity="0.85" />
    <text x="150" y="33" fill="#ffffff" font-size="11" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">${label}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const SAMPLE_SPECIMENS: SampleSpecimen[] = [
  {
    id: 'sample-tomato-blight',
    name: 'Tomato Early Blight',
    crop: 'Tomato (Solanum lycopersicum)',
    expectedDisease: 'Early Blight (Alternaria solani)',
    isHealthy: false,
    dataUrl: createLeafSvgDataUrl('#4ade80', '#78350f', false, 'Tomato Leaf · Early Blight Specimen'),
  },
  {
    id: 'sample-potato-late-blight',
    name: 'Potato Late Blight',
    crop: 'Potato (Solanum tuberosum)',
    expectedDisease: 'Late Blight (Phytophthora infestans)',
    isHealthy: false,
    dataUrl: createLeafSvgDataUrl('#22c55e', '#1c1917', false, 'Potato Leaf · Late Blight Specimen'),
  },
  {
    id: 'sample-rice-blast',
    name: 'Rice Leaf Blast',
    crop: 'Rice / Paddy (Oryza sativa)',
    expectedDisease: 'Rice Blast (Magnaporthe oryzae)',
    isHealthy: false,
    dataUrl: createLeafSvgDataUrl('#86efac', '#991b1b', false, 'Rice Leaf · Blast Lesion Specimen'),
  },
  {
    id: 'sample-wheat-rust',
    name: 'Wheat Leaf Rust',
    crop: 'Wheat (Triticum aestivum)',
    expectedDisease: 'Leaf Rust (Puccinia triticina)',
    isHealthy: false,
    dataUrl: createLeafSvgDataUrl('#6ee7b7', '#b45309', false, 'Wheat Leaf · Brown Rust Pustules'),
  },
  {
    id: 'sample-healthy-pepper',
    name: 'Healthy Pepper Leaf',
    crop: 'Bell Pepper (Capsicum annuum)',
    expectedDisease: 'Healthy Leaf (No Pathogen)',
    isHealthy: true,
    dataUrl: createLeafSvgDataUrl('#16a34a', '', true, 'Bell Pepper · Healthy Foliage Specimen'),
  },
];
