# AETHERIS — Haute Horlogerie & Celestial Chronometry

> An Awwwards-inspired luxury digital experience engineered for high-precision Swiss astronomical horology.

![AETHERIS Preview](https://raw.githubusercontent.com/shahzaib-shams2023/aetheris-horlogerie/main/public/og-image.png)

## Overview

AETHERIS presents the **Caliber AE-90**, an astronomical complication masterpiece featuring:
- **Real-Time 3D WebGL Caliber:** Interactive 5-layer exploded movement with real-time PBR lighting, rotating gears, and a 4Hz vibrating tri-axial tourbillon.
- **Interactive Disassembly Scrubbing:** Dynamically explode the timepiece to inspect its sapphire crystal dome, celestial star chart, gear train, tourbillon carriage, and titanium chassis.
- **Bespoke Metallurgy Atelier:** Real-time PBR material customization (Grade 5 Titanium, 18K 4N Rose Gold, DLC Obsidian Carbon, 950 Platinum).
- **Procedural Mechanical Sound:** Web Audio API synthesis generating the audible 4Hz mechanical escapement ticks and tactile clicks.
- **Lenis Smooth Inertial Scrolling:** Fluid kinetic scroll physics and editorial responsiveness.

## Tech Stack

- **Framework:** React 18, Vite, TypeScript
- **Styling:** Tailwind CSS, Custom Glassmorphism, CSS Grid
- **3D & Graphics:** Three.js (r173) with ACES Filmic tone mapping and dynamic specular lighting
- **Smooth Scroll:** Lenis Smooth Scroll
- **Audio:** Web Audio API procedural synthesis
- **Icons:** Lucide React

## Getting Started

```bash
# Install dependencies
pnpm install # or npm install

# Start development server
pnpm dev

# Build production bundle
pnpm build

# Preview production build
pnpm preview
```

## Licensing

- Code: MIT License
- Fonts: SIL Open Font License
- Details: See [ASSET_CREDITS.md](./ASSET_CREDITS.md)
