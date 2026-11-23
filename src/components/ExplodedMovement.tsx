import React, { useState } from 'react';
import { WatchCanvas, MaterialTheme } from './WatchCanvas';
import { Layers, Sliders, ShieldCheck, Cpu, Eye, Info } from 'lucide-react';
import { soundManager } from '../utils/audio';

const CALIBER_STRATA = [
  {
    id: 0,
    name: 'Sapphire Crystal Dome',
    french: 'Glace Saphir Bombée',
    description:
      'Double-domed synthetic sapphire with multi-layer interior and exterior anti-reflective treatment. Vickers hardness of 2,200 HV ensures scratch immunity.',
    tolerance: '± 0.002 mm',
    spec: 'Synthetic Corundum • 2.4 mm thickness • 5 ATM pressure seal',
  },
  {
    id: 1,
    name: 'Celestial Dial Ring & Star Chart',
    french: 'Cadran Équatorial & Carte Stellaire',
    description:
      'Laser-ablated celestial equator depicting 88 northern constellations in luminescent Super-LumiNova Grade X1. Hand-polished Breguet hands in flame-blued titanium.',
    tolerance: '± 0.005 mm',
    spec: 'Aventurine Quartz substrate • 24h Sidereal Ring • Blued Hands',
  },
  {
    id: 2,
    name: 'Caliber AE-90 Gear Train',
    french: 'Rouage & Échappement Co-Axial',
    description:
      'High-efficiency involute gearing with cycloidal tooth profiles in beryllium copper and treated German silver. Optimizes kinetic torque across twin mainspring barrels.',
    tolerance: '± 0.001 mm',
    spec: '28,800 vph • 47 Synthetic Rubies • 120 hr Co-Axial Twin Barrels',
  },
  {
    id: 3,
    name: 'Tri-Axial Gyroscopic Tourbillon',
    french: 'Tourbillon Tri-Axial Gyroscopique',
    description:
      'Counteracts gravitational rate drift across three spatial dimensions. Rotates on axes in 30s, 60s, and 120s respectively. Total carriage weight: 0.28 grams.',
    tolerance: '± 0.0005 mm',
    spec: 'Grade 5 Titanium Cage • Free-Sprung Glucydur Balance • Breguet Overcoil',
  },
  {
    id: 4,
    name: 'Grade 5 Forged Titanium Chassis',
    french: 'Platine & Ponts en Titane Forgé',
    description:
      'Monolithic baseplate micro-sandblasted and hand-finished with traditional Côtes de Genève stripes and 45° hand-chamfered anglage.',
    tolerance: '± 0.003 mm',
    spec: 'Grade 5 Ti-6Al-4V • Hand-Anglage • Geneva Hallmark Standard',
  },
];

export const ExplodedMovement: React.FC = () => {
  const [explodeSlider, setExplodeSlider] = useState<number>(0.65);
  const [activeLayer, setActiveLayer] = useState<number | null>(3); // Tourbillon selected by default
  const [material, setMaterial] = useState<MaterialTheme>('titanium');

  const handleLayerSelect = (id: number) => {
    soundManager.playMechanicalClick();
    setActiveLayer(id === activeLayer ? null : id);
  };

  const handleSliderChange = (val: number) => {
    setExplodeSlider(val);
  };

  const currentStratum = activeLayer !== null ? CALIBER_STRATA[activeLayer] : null;

  return (
    <section id="exploded-section" className="relative py-24 px-4 sm:px-8 bg-abyss border-t border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-gold tracking-widest uppercase mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>HOROLOGICAL DISSECTION • 5 CALIBRATED STRATA</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-light text-titanium-light">
              Exploded Caliber <span className="font-serif italic text-gold font-normal">AE-90</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-titanium-dark font-sans leading-relaxed">
            Scrub the disassembly distance to inspect each microscopic sub-assembly in real-time 3D, from the sapphire crystal dome down to the titanium baseplate.
          </p>
        </div>

        {/* 3D Exploded Stage with Overlay Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Center: Interactive 3D Canvas */}
          <div className="lg:col-span-8 h-[500px] sm:h-[600px] relative rounded-3xl overflow-hidden glass-panel border border-white/10">
            <WatchCanvas
              explodeDistance={explodeSlider}
              activeLayer={activeLayer}
              materialTheme={material}
              interactive={true}
              className="w-full h-full"
            />

            {/* In-Canvas Scrubbing Slider */}
            <div className="absolute bottom-6 left-6 right-6 glass-panel px-6 py-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <Sliders className="w-4 h-4 text-gold" />
                <span className="font-mono text-xs text-titanium tracking-wider uppercase">
                  DISASSEMBLY DISTANCE: {(explodeSlider * 100).toFixed(0)}%
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explodeSlider}
                onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
                className="w-full sm:w-64 accent-gold cursor-pointer"
                aria-label="Explode Caliber Distance"
              />

              <button
                onClick={() => handleSliderChange(explodeSlider === 0 ? 0.85 : 0)}
                className="text-[11px] font-mono text-gold hover:underline whitespace-nowrap"
              >
                {explodeSlider === 0 ? 'EXPLODE ALL' : 'COLLAPSE'}
              </button>
            </div>
          </div>

          {/* Right Column: Layer Inspection Selector & CAD Specs */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="font-mono text-xs text-titanium-dark tracking-widest uppercase flex items-center justify-between pb-2 border-b border-white/10">
              <span>SELECT LAYER TO INSPECT</span>
              <span>CALIBER AE-90</span>
            </div>

            {/* List of 5 Layers */}
            <div className="space-y-2">
              {CALIBER_STRATA.map((stratum) => {
                const isSelected = activeLayer === stratum.id;
                return (
                  <button
                    key={stratum.id}
                    onClick={() => handleLayerSelect(stratum.id)}
                    className={`w-full text-left p-3.5 rounded-xl transition-all duration-200 border ${
                      isSelected
                        ? 'glass-panel-gold border-gold/50 text-titanium-light'
                        : 'bg-surface/50 border-white/5 text-titanium-dark hover:border-white/20 hover:text-titanium'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                          isSelected ? 'bg-gold text-void font-bold' : 'bg-surfaceLight text-titanium-dark'
                        }`}>
                          0{stratum.id + 1}
                        </span>
                        <span className="font-display tracking-wider text-xs sm:text-sm font-medium">
                          {stratum.name}
                        </span>
                      </div>
                      <Eye className={`w-3.5 h-3.5 ${isSelected ? 'text-gold' : 'text-titanium-dark/50'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Layer Technical Inspector */}
            {currentStratum && (
              <div className="mt-4 p-5 rounded-2xl glass-panel border border-gold/20 space-y-3">
                <div className="flex items-center justify-between font-mono text-xs text-gold">
                  <span>STRATUM 0{currentStratum.id + 1} SPECIFICATION</span>
                  <span className="text-titanium-dark">{currentStratum.tolerance}</span>
                </div>
                <h4 className="font-serif italic text-lg text-titanium-light">
                  {currentStratum.french}
                </h4>
                <p className="text-xs text-titanium-dark leading-relaxed font-sans">
                  {currentStratum.description}
                </p>
                <div className="pt-2 border-t border-white/5 font-mono text-[11px] text-breguet">
                  {currentStratum.spec}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
