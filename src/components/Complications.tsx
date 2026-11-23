import React from 'react';
import { Compass, Sparkles, Orbit, Clock, ShieldAlert } from 'lucide-react';

const COMPLICATIONS = [
  {
    number: '01',
    title: 'The Equation of Time',
    french: "L'Équation du Temps Marchante",
    description:
      'Earth’s true solar orbit is elliptical, causing solar days to vary by up to -14 to +16 minutes versus standard mean civil time (24:00:00). Caliber AE-90 integrates a micro-machined kidney-shaped annual cam that directly computes this celestial differential in real time.',
    stat: '± 0.1 sec/yr',
    statLabel: 'Cam Calculation Drift',
  },
  {
    number: '02',
    title: 'Sidereal Sky Chart',
    french: 'Voûte Céleste & Temps Sidéral',
    description:
      'Synchronized with the vernal equinox, the dial features a rotating disc completing one rotation every 23 hours, 56 minutes, and 4.091 seconds (one true sidereal day). It plots the northern hemisphere stars and constellations exactly as visible above Geneva.',
    stat: '88',
    statLabel: 'Constellations Mapped',
  },
  {
    number: '03',
    title: 'Tri-Axial Gyrotourbillon',
    french: 'Tourbillon Tri-Axial Multi-Gimbal',
    description:
      'Traditional tourbillons only compensate for gravity in a single vertical orientation. Our tri-axial spherical cage rotates on three independent axes (30s, 60s, 120s), nullifying earth’s gravitational pull regardless of wrist attitude.',
    stat: '0.28 g',
    statLabel: 'Total Cage Mass',
  },
];

export const Complications: React.FC = () => {
  return (
    <section id="complications-section" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-gold tracking-widest uppercase">
          <Orbit className="w-3.5 h-3.5" />
          <span>CELESTIAL REPERTOIRE • HAUTE HORLOGERIE</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-light text-titanium-light">
          Astronomy Encapsulated In <span className="font-serif italic text-gold font-normal">Metal</span>
        </h2>
        <p className="text-xs sm:text-sm text-titanium-dark leading-relaxed font-sans">
          Each mechanical complication in the AETHERIS Caliber AE-90 is an homage to mathematical astronomy and Swiss micromechanical ingenuity.
        </p>
      </div>

      {/* Complications Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {COMPLICATIONS.map((comp) => (
          <div
            key={comp.number}
            className="group p-8 rounded-3xl glass-panel hover:border-gold/30 transition-all duration-300 flex flex-col justify-between space-y-8 relative overflow-hidden"
          >
            {/* Top Index & French Nomenclature */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-2xl text-gold font-light">{comp.number}</span>
                <span className="font-serif italic text-xs text-titanium-dark">{comp.french}</span>
              </div>
              <h3 className="font-display text-xl text-titanium-light group-hover:text-gold transition-colors">
                {comp.title}
              </h3>
              <p className="text-xs text-titanium-dark leading-relaxed font-sans">
                {comp.description}
              </p>
            </div>

            {/* Bottom Spec Metric */}
            <div className="pt-6 border-t border-white/5 font-mono">
              <div className="text-2xl font-light text-titanium-light">{comp.stat}</div>
              <div className="text-[10px] text-gold tracking-widest uppercase mt-0.5">
                {comp.statLabel}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
