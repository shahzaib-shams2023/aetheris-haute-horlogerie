import React from 'react';
import { WatchCanvas } from './WatchCanvas';
import { ChevronDown, Orbit, Disc, Compass, Award } from 'lucide-react';

interface HeroProps {
  onExploreExploded: () => void;
  onOpenCommission: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreExploded, onOpenCommission }) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-4 sm:px-8 overflow-hidden bg-radial-vignette">
      {/* Decorative Celestial Grid & Star Map Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-gold/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full border border-titanium/5 border-dashed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] rounded-full border border-gold/5" />
      </div>

      {/* Main Grid: Left Typographic Narrative & Right Interactive 3D Canvas */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
        {/* Left Column: Monolithic Editorial Typography */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 text-left">
          <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 w-fit">
            <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
            <span className="font-mono text-[11px] tracking-widest text-gold uppercase">
              PIÈCE UNIQUE N° 01/01
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light tracking-wide text-titanium-light leading-[1.08]">
            Celestial <br />
            <span className="italic font-serif text-gold font-normal">Architecture</span> <br />
            In Motion.
          </h1>

          <p className="font-sans text-sm sm:text-base text-titanium-dark max-w-md font-light leading-relaxed">
            The Caliber AE-90. A tri-axial gyroscopic tourbillon synchronizing sidereal astronomical time, equation of time, and lunar precession within high-grade sculpted titanium.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreExploded}
              className="px-6 py-3 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-void font-display text-xs tracking-astral uppercase transition-all duration-300 shadow-sm shadow-gold/10 flex items-center space-x-2"
            >
              <span>EXPLODE MOVEMENT</span>
              <Disc className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenCommission}
              className="px-6 py-3 rounded-full bg-surfaceLight/80 hover:bg-surfaceLight text-titanium font-sans text-xs tracking-wider uppercase transition-all duration-200 border border-white/5"
            >
              VIEW ATELIER ALLOCATION
            </button>
          </div>

          {/* Quick Technical Horology Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 font-mono text-xs">
            <div>
              <span className="block text-[10px] text-titanium-dark tracking-widest uppercase">FREQUENCY</span>
              <span className="text-titanium-light font-semibold text-sm">28,800 vph</span>
              <span className="text-[10px] text-gold block">4 Hz ESCAPEMENT</span>
            </div>
            <div>
              <span className="block text-[10px] text-titanium-dark tracking-widest uppercase">COMPLICATIONS</span>
              <span className="text-titanium-light font-semibold text-sm">7 Astral</span>
              <span className="text-[10px] text-breguet block">TRI-AXIAL TOURBILLON</span>
            </div>
            <div>
              <span className="block text-[10px] text-titanium-dark tracking-widest uppercase">RESERVE</span>
              <span className="text-titanium-light font-semibold text-sm">120 Hours</span>
              <span className="text-[10px] text-titanium-dark block">CO-AXIAL TWIN BARREL</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Real-Time Watch Showcase */}
        <div className="lg:col-span-7 h-[450px] sm:h-[550px] lg:h-[650px] relative flex items-center justify-center">
          <WatchCanvas
            explodeDistance={0}
            activeLayer={null}
            materialTheme="titanium"
            interactive={true}
            className="w-full h-full"
          />

          {/* Floating 3D Control Hints */}
          <div className="absolute bottom-4 right-4 glass-panel px-3.5 py-2 rounded-xl text-[11px] font-mono text-titanium-dark flex items-center space-x-2 pointer-events-none">
            <Orbit className="w-3.5 h-3.5 text-gold animate-spin-slow" />
            <span>DRAG TO ROTATE 360° • HOVER FOR PBR SPECULARITY</span>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar: Scroll Indicator & Swiss Made Seal */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 flex items-center justify-between text-xs font-mono text-titanium-dark border-t border-white/5">
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-gold" />
          <span className="tracking-widest uppercase">SWISS CHRONOMÈTRE CERTIFIED (COSC)</span>
        </div>

        <button
          onClick={onExploreExploded}
          className="flex items-center space-x-2 text-titanium hover:text-gold transition-colors tracking-widest uppercase"
        >
          <span>EXPLORE CALIBER STRATA</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
