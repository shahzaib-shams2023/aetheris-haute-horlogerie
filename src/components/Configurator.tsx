import React, { useState } from 'react';
import { WatchCanvas, MaterialTheme } from './WatchCanvas';
import { Sliders, Sparkles, Check, ShieldCheck, Compass } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ConfiguratorProps {
  onOpenCommission: () => void;
}

const METALS = [
  { id: 'titanium' as MaterialTheme, name: 'Grade 5 Titanium', tag: 'AEROSPACE GRADE', color: '#D0D7DE', weight: '78 g', reserve: '120h' },
  { id: 'rose-gold' as MaterialTheme, name: '18K 4N Rose Gold', tag: 'GENEVOIS ALLOY', color: '#E8A588', weight: '138 g', reserve: '120h' },
  { id: 'obsidian' as MaterialTheme, name: 'DLC Obsidian Carbon', tag: 'DIAMOND-LIKE CARBON', color: '#1F232B', weight: '65 g', reserve: '120h' },
  { id: 'platinum' as MaterialTheme, name: '950 Pure Platinum', tag: 'ROYAL NOBLE DENSITY', color: '#F1F5F9', weight: '162 g', reserve: '120h' },
];

const DIAL_STYLES = [
  { id: 'celestial', name: 'Celestial Star Chart', desc: 'Aventurine deep-blue crystal with Super-LumiNova star maps' },
  { id: 'openwork', name: 'Skeleton Architecture', desc: 'Fully skeletonized bridges exposing tourbillon and gear trains' },
  { id: 'guilloche', name: 'Hand-Turned Guilloché', desc: 'Traditional Clous de Paris geometric engine-turned motif' },
];

const STRAPS = [
  { id: 'alligator', name: 'Matte Alligator Mississippiensis', origin: 'Hand-stitched in Geneva' },
  { id: 'kevlar', name: 'Ballistic Technical Kevlar', origin: 'Hermetic waterproof deployment' },
  { id: 'milanese', name: 'Milanese Mesh Grade 5', origin: 'Interwoven titanium link clasp' },
];

export const Configurator: React.FC<ConfiguratorProps> = ({ onOpenCommission }) => {
  const [selectedMetal, setSelectedMetal] = useState<MaterialTheme>('titanium');
  const [selectedDial, setSelectedDial] = useState<string>('celestial');
  const [selectedStrap, setSelectedStrap] = useState<string>('alligator');

  const activeMetalObj = METALS.find((m) => m.id === selectedMetal)!;

  const handleMetalChange = (metal: MaterialTheme) => {
    soundManager.playMechanicalClick();
    setSelectedMetal(metal);
  };

  return (
    <section id="configurator-section" className="py-24 px-4 sm:px-8 bg-surface/30 border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-gold tracking-widest uppercase">
            <Sliders className="w-3.5 h-3.5" />
            <span>BESPOKE METALLURGY • ATELIER CONFIGURATOR</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-light text-titanium-light">
            Bespoke <span className="font-serif italic text-gold font-normal">Material</span> Atelier
          </h2>
          <p className="text-xs sm:text-sm text-titanium-dark leading-relaxed font-sans">
            Customize case metallurgy, dial horology, and strap architecture in real-time 3D before placing your atelier commission.
          </p>
        </div>

        {/* Configurator Layout: 3D Preview + Selection Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D Preview Canvas */}
          <div className="lg:col-span-7 h-[450px] sm:h-[550px] relative rounded-3xl overflow-hidden glass-panel border border-white/10">
            <WatchCanvas
              explodeDistance={0.15}
              activeLayer={null}
              materialTheme={selectedMetal}
              interactive={true}
              className="w-full h-full"
            />

            <div className="absolute top-6 left-6 glass-panel px-4 py-2 rounded-xl text-xs font-mono">
              <span className="text-titanium-dark block text-[10px] uppercase">MATERIAL ACTIVE</span>
              <span className="text-gold font-semibold">{activeMetalObj.name}</span>
            </div>
          </div>

          {/* Configuration Options */}
          <div className="lg:col-span-5 space-y-6">
            {/* Step 1: Metallurgy */}
            <div className="space-y-3">
              <label className="block text-xs font-mono text-titanium-dark tracking-widest uppercase">
                01 • CASE METALLURGY
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {METALS.map((metal) => {
                  const isSelected = selectedMetal === metal.id;
                  return (
                    <button
                      key={metal.id}
                      onClick={() => handleMetalChange(metal.id)}
                      className={`p-3 rounded-xl text-left transition-all border ${
                        isSelected
                          ? 'border-gold bg-gold/10 text-titanium-light shadow-sm shadow-gold/20'
                          : 'border-white/5 bg-surfaceLight/50 text-titanium-dark hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: metal.color }}
                        />
                        <span className="font-display text-xs font-medium">{metal.name}</span>
                      </div>
                      <span className="block font-mono text-[9px] text-gold/80 mt-1 uppercase">
                        {metal.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Dial Architecture */}
            <div className="space-y-3">
              <label className="block text-xs font-mono text-titanium-dark tracking-widest uppercase">
                02 • DIAL HOROLOGY
              </label>
              <div className="space-y-2">
                {DIAL_STYLES.map((dial) => {
                  const isSelected = selectedDial === dial.id;
                  return (
                    <button
                      key={dial.id}
                      onClick={() => {
                        soundManager.playMechanicalClick();
                        setSelectedDial(dial.id);
                      }}
                      className={`w-full p-3 rounded-xl text-left transition-all border flex items-center justify-between ${
                        isSelected
                          ? 'border-gold bg-gold/10 text-titanium-light'
                          : 'border-white/5 bg-surfaceLight/50 text-titanium-dark hover:border-white/20'
                      }`}
                    >
                      <div>
                        <span className="font-display text-xs font-medium block">{dial.name}</span>
                        <span className="text-[10px] text-titanium-dark font-sans">{dial.desc}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-gold flex-shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Metrics Summary & Commission Button */}
            <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-3">
              <div className="grid grid-cols-3 gap-2 font-mono text-xs text-center border-b border-white/5 pb-3">
                <div>
                  <span className="text-[9px] text-titanium-dark uppercase block">WEIGHT</span>
                  <span className="text-titanium-light font-semibold">{activeMetalObj.weight}</span>
                </div>
                <div>
                  <span className="text-[9px] text-titanium-dark uppercase block">RESERVE</span>
                  <span className="text-titanium-light font-semibold">{activeMetalObj.reserve}</span>
                </div>
                <div>
                  <span className="text-[9px] text-titanium-dark uppercase block">LEAD TIME</span>
                  <span className="text-gold font-semibold">14 Weeks</span>
                </div>
              </div>

              <button
                onClick={onOpenCommission}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-light via-gold to-gold-dark text-void font-display text-xs tracking-astral uppercase font-semibold hover:brightness-110 active:scale-[0.99] transition-all shadow-md shadow-gold/20 flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>CONFIRM BESPOKE COMMISSION</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
