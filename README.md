# 🌾 AGRO UZHAVAN (அக்ரோ உழவன்)
### *Next-Gen AI-Powered Precision Agriculture & Farm Intelligence Platform*

[![React 19](https://img.shields.io/badge/React-19.0.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.14-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Gemini 2.5/3.7](https://img.shields.io/badge/Google%20Gemini-GenAI%20SDK-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)

---

## 📖 Overview

**Agro Uzhavan** is an intelligent agronomy and crop care platform built for farmers, agronomists, and agricultural researchers. It combines computer vision, multimodal generative AI (Gemini), real-time high-resolution hyper-local weather forecasting, satellite microclimate telemetry, live Mandi commodity pricing, and multilingual voice assistance.

---

## ✨ Key Features

1. 🔬 **Leaf & Crop Disease Diagnostic Scanner**:
   - Instant multimodal visual diagnosis with confidence scoring.
   - Severity level, symptoms breakdown, biological cause, and chemical + organic remedies.
   - One-click PDF diagnostic report download for farmers.

2. 🌦️ **Hyper-Local Precision Weather & Microclimate Advisory**:
   - Live temperature, apparent feels-like, relative humidity, precipitation, wind speed/direction, surface pressure, solar radiation, and UV index.
   - 14-day daily and 48-hour hourly forecasts.
   - Agricultural spraying condition indices (Optimal / Caution / Unfavorable).
   - Soil temperature (0 cm) and topsoil moisture estimation (0–1 cm).
   - Integrated OpenWeatherMap & high-resolution Open-Meteo multi-tier fallback.

3. 📈 **Mandi Market Rates & APMC Price Trends**:
   - Real-time commodity price tracking across regional agricultural markets.
   - Price velocity trends (bullish/bearish), arrivals volume, and minimum/maximum MSP comparison.

4. 🤖 **AI Agronomist Chat & Voice Assistant**:
   - Multi-turn agricultural reasoning in **Tamil (தமிழ்)**, **English**, **Hindi (हिंदी)**, **Telugu (తెలుగు)**, **Kannada (ಕನ್ನಡ)**, and **Malayalam (മലയാളം)**.
   - Real-time crop care, fertilizer scheduling, pest control, and irrigation optimization.

5. 🗺️ **Interactive Farm Geospatial Mapping**:
   - GPS-enabled interactive farm plot demarcation with Leaflet.
   - Microclimate radar sweeps and real-time sensor overlays.

---

## 🛠️ Environment Configuration (`.env`)

Create a `.env` file in the root directory (or copy `.env.example` to `.env`):

```bash
# GEMINI_API_KEY: Required for crop diagnostics, AI agronomic advisory, and audio reasoning.
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
VITE_GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# OPENWEATHER_API_KEY: Optional (defaults to high-accuracy Open-Meteo live data automatically if omitted)
OPENWEATHER_API_KEY="YOUR_OPENWEATHER_API_KEY"
VITE_OPENWEATHER_API_KEY="YOUR_OPENWEATHER_API_KEY"

# APP_URL: The local or production base URL
APP_URL="http://localhost:3000"
```

> **Note**: Both `GEMINI_API_KEY` (server-side proxy) and `VITE_GEMINI_API_KEY` (client fallback) are supported for seamless offline/online execution.

---

## 🚀 How to Run the Project

### 1. Prerequisites
- **Node.js**: v20.0.0 or higher
- **npm** / **yarn** / **pnpm**

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

*Or run directly via Node:*
```bash
node ./node_modules/vite/bin/vite.js --port=3000 --host=0.0.0.0
```

### 4. Open in Your Browser
- **Primary Port**: `http://localhost:3000/`
- *(If Port 3000 is occupied by another process, Vite automatically opens on `http://localhost:3001/`)*

---

## 📁 Project Structure

```
AGRO-UZHAVAN-main/
├── .env                  # Active environment variables (API keys)
├── .env.example          # Environment variable template
├── index.html            # Main HTML entrypoint
├── package.json          # Project metadata and dependencies
├── tsconfig.json         # TypeScript compiler configuration
├── vite.config.ts        # Vite configuration & server-side API middleware
├── public/               # Static assets & icons
└── src/
    ├── main.tsx          # React application root
    ├── App.tsx           # Main application view container
    ├── index.css         # Global design system & Tailwind styling
    ├── components/       # Reusable UI widgets, navigation & modal dialogs
    │   ├── views/        # Page views (DiseaseScanner, Weather, Mandi, FarmProfile)
    │   └── common/       # Common buttons, charts, badges, cards
    ├── lib/              # Utilities, i18n translations, weather client, PDF generator
    ├── server/           # Integrated server logic (Gemini GenAI & Weather API proxy)
    └── types/            # TypeScript interfaces for agricultural data models
```

---

## 🔧 Troubleshooting

- **Port already in use:**
  If port 3000 is busy, Vite will automatically select `3001` or `3002`. Check your terminal output for the active URL (`http://localhost:3001/`).
- **Disk Space (ENOSPC error with npm cache):**
  If your system drive is low on storage, use `node ./node_modules/vite/bin/vite.js --port=3000 --host=0.0.0.0` to start Vite directly without invoking npm cache writes.
- **Weather showing fallback data:**
  Ensure internet connectivity is active. The system automatically queries OpenWeatherMap (if API key is present) and seamlessly cascades to Open-Meteo global meteorological satellites for accurate real-time values.

---

## 📄 License
This project is licensed under the MIT License.
