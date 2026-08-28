import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const outDir = path.resolve('public', 'icons');
fs.mkdirSync(outDir, { recursive: true });

// Helper to create a valid uncompressed PNG buffer using Node's zlib
function createPng(width, height, drawFn) {
  // RGBA buffer
  const buffer = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const [r, g, b, a] = drawFn(x, y, width, height);
      buffer[idx] = r;
      buffer[idx + 1] = g;
      buffer[idx + 2] = b;
      buffer[idx + 3] = a;
    }
  }

  // PNG Filter type 0 (None) before every scanline
  const scanlines = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    scanlines[y * (width * 4 + 1)] = 0; // Filter: None
    buffer.copy(
      scanlines,
      y * (width * 4 + 1) + 1,
      y * width * 4,
      (y + 1) * width * 4
    );
  }

  const idatData = zlib.deflateSync(scanlines);

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth: 8
  ihdr[9] = 6; // Color type: RGBA
  ihdr[10] = 0; // Compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', idatData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(len + 12);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4);
  data.copy(chunk, 8);

  const crc = crc32(chunk.subarray(4, len + 8));
  chunk.writeUInt32BE(crc >>> 0, len + 8);
  return chunk;
}

// CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Draw Agro AI Sprout Icon
function drawAgroIcon(x, y, w, h, isMaskable = false) {
  const cx = w / 2;
  const cy = h / 2;
  const scale = w / 100;

  const nx = (x - cx) / scale;
  const ny = (y - cy) / scale;

  // Background
  let bgR = 15, bgG = 23, bgB = 42, bgA = 255; // #0f172a slate-900
  
  if (!isMaskable) {
    // Rounded squircle
    const distSq = Math.pow(Math.abs(x - cx) / (w * 0.46), 4) + Math.pow(Math.abs(y - cy) / (h * 0.46), 4);
    if (distSq > 1.0) {
      return [0, 0, 0, 0];
    }
  }

  // Draw vibrant gradient background
  const grad = (y / h);
  bgR = Math.round(15 * (1 - grad) + 5 * grad);
  bgG = Math.round(23 * (1 - grad) + 40 * grad + 20 * (1 - grad));
  bgB = Math.round(42 * (1 - grad) + 25 * grad);

  // Sprout Leaf geometry
  // Leaf 1 (Left arch)
  const dLeafLeft = Math.hypot(nx + 12, ny + 5);
  // Leaf 2 (Right arch)
  const dLeafRight = Math.hypot(nx - 12, ny - 5);
  // Stem
  const inStem = Math.abs(nx) < 3.5 && ny > -10 && ny < 35;

  // Central Sprout shape
  // (x/28)^2 + ((y - 5)/38)^2 < 1 and ny < 30
  const inMainLeaf = (Math.pow(nx / 26, 2) + Math.pow((ny + 5) / 32, 2) < 1) && (ny + Math.abs(nx) * 0.5 < 28);
  
  // Left leaf lobe
  const inLeftLobe = (Math.pow((nx + 15) / 18, 2) + Math.pow((ny - 5) / 14, 2) < 1) && nx < 0;
  // Right leaf lobe
  const inRightLobe = (Math.pow((nx - 15) / 18, 2) + Math.pow((ny - 12) / 14, 2) < 1) && nx > 0;

  // Yellow sun/energy core
  const inSunCore = Math.hypot(nx, ny - 2) < 8;

  if (inSunCore) {
    return [250, 204, 21, 255]; // amber-400
  }

  if (inStem) {
    return [21, 128, 61, 255]; // emerald-700
  }

  if (inMainLeaf || inLeftLobe || inRightLobe) {
    // Emerald gradient
    const leafGrad = (ny + 30) / 60;
    const lr = Math.round(34 + 20 * leafGrad);
    const lg = Math.round(197 - 40 * leafGrad);
    const lb = Math.round(94 - 30 * leafGrad);
    return [lr, lg, lb, 255];
  }

  // Subtle outer glow
  const dCenter = Math.hypot(nx, ny);
  if (dCenter < 38) {
    const glow = (1 - dCenter / 38) * 0.25;
    return [
      Math.round(bgR + (16 - bgR) * glow),
      Math.round(bgG + (185 - bgG) * glow),
      Math.round(bgB + (129 - bgB) * glow),
      255
    ];
  }

  return [bgR, bgG, bgB, bgA];
}

// Generate PNGs
const sizes = [
  { name: 'icon-192.png', size: 192, maskable: false },
  { name: 'icon-512.png', size: 512, maskable: false },
  { name: 'icon-maskable-192.png', size: 192, maskable: true },
  { name: 'icon-maskable-512.png', size: 512, maskable: true },
  { name: 'apple-touch-icon.png', size: 180, maskable: true },
  { name: 'favicon-32.png', size: 32, maskable: false },
];

for (const { name, size, maskable } of sizes) {
  const png = createPng(size, size, (x, y, w, h) => drawAgroIcon(x, y, w, h, maskable));
  fs.writeFileSync(path.join(outDir, name), png);
  console.log(`Generated ${name} (${size}x${size})`);
}

// Also write SVG icon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#022c22" />
    </linearGradient>
    <linearGradient id="leafGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#34d399" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="16" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#bg)"/>
  <circle cx="256" cy="256" r="180" fill="#10b981" opacity="0.12" filter="url(#glow)"/>
  <!-- Stem -->
  <path d="M256 260 L256 420" stroke="#047857" stroke-width="24" stroke-linecap="round"/>
  <!-- Leaves -->
  <path d="M256 90 C150 180 110 300 256 400 C402 300 362 180 256 90 Z" fill="url(#leafGrad)"/>
  <!-- Left Sub Leaf -->
  <path d="M256 280 C180 260 140 310 180 360 C220 370 250 320 256 280 Z" fill="#10b981" opacity="0.9"/>
  <!-- Right Sub Leaf -->
  <path d="M256 240 C330 210 370 260 340 310 C300 330 265 280 256 240 Z" fill="#34d399" opacity="0.9"/>
  <!-- Energy Core / Sun -->
  <circle cx="256" cy="245" r="42" fill="url(#sunGrad)" filter="url(#glow)"/>
  <circle cx="256" cy="245" r="28" fill="#ffffff" opacity="0.3"/>
</svg>`;

fs.writeFileSync(path.join(outDir, 'icon.svg'), svgContent);
fs.writeFileSync(path.resolve('public', 'favicon.svg'), svgContent);
console.log('Generated SVG icons successfully');
