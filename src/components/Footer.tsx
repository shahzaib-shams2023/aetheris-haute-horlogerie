import React from 'react';
import { Compass, Award, Shield, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-void border-t border-white/10 pt-16 pb-12 px-4 sm:px-8 text-titanium-dark font-sans text-xs">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Atelier Brand Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Compass className="w-5 h-5 text-gold" />
              <span className="font-display tracking-astral text-base text-titanium-light font-semibold">
                AETHERIS
              </span>
            </div>
            <p className="text-xs text-titanium-dark/80 leading-relaxed font-sans">
              Haute Horlogerie & Astronomical Chronometry. Handcrafted in the canton of Geneva, Switzerland.
            </p>
            <div className="font-mono text-[10px] text-gold/80">
              COSC CHRONOMÈTRE CERTIFIED • GENEVA HALLMARK
            </div>
          </div>

          {/* Horological Innovations */}
          <div className="space-y-3 font-mono">
            <h4 className="text-titanium-light text-xs tracking-widest uppercase">HOROLOGICAL SPEC</h4>
            <ul className="space-y-2 text-[11px]">
              <li>Caliber AE-90 Co-Axial Twin Barrel</li>
              <li>28,800 vph (4 Hz) Escapement</li>
              <li>Tri-Axial Gyroscopic Tourbillon</li>
              <li>Equation of Time Mechanical Cam</li>
              <li>Aventurine Celestial Star Vault</li>
            </ul>
          </div>

          {/* Atelier Coordinates */}
          <div className="space-y-3 font-mono">
            <h4 className="text-titanium-light text-xs tracking-widest uppercase">SALON GENÈVE</h4>
            <div className="space-y-1 text-[11px]">
              <div>Rue du Rhône 42</div>
              <div>1204 Genève, Suisse</div>
              <div className="text-titanium-dark/70">GPS: 46°12′09″N • 06°08′44″E</div>
              <div className="text-gold pt-1">concierge@aetheris-horlogerie.ch</div>
            </div>
          </div>

          {/* Provenance & Legal */}
          <div className="space-y-3">
            <h4 className="text-titanium-light font-mono text-xs tracking-widest uppercase">PROVENANCE</h4>
            <p className="text-[11px] leading-relaxed">
              Designed as an original haute horlogerie digital experience adhering to Awwwards creative web standards.
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-gold hover:text-gold transition-colors font-mono text-[11px]"
              >
                <span>ASCEND TO ORBIT</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px]">
          <div>
            © {new Date().getFullYear()} AETHERIS MANUFACTURE HORLOGÈRE S.A. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-6 text-titanium-dark/70">
            <span>SWISS MADE</span>
            <span>WCAG 2.1 AA COMPLIANT</span>
            <span>THREE.JS REAL-TIME PBR</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
