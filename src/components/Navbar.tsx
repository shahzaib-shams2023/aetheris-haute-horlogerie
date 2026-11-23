import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Compass, Shield } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  onOpenCommission: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommission }) => {
  const [genevaTime, setGenevaTime] = useState<string>('');
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Geneva is UTC+1 (or UTC+2 in DST)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Zurich',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setGenevaTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAudioToggle = () => {
    const active = soundManager.toggleSound();
    setIsAudioActive(active);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-4 transition-all duration-300">
      <nav
        className={`mx-auto max-w-7xl flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-300 ${
          scrolled
            ? 'glass-panel shadow-2xl shadow-void/80 border-surfaceLight/80'
            : 'bg-transparent border border-white/5'
        }`}
      >
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center bg-surface/50">
            <Compass className="w-4 h-4 text-gold animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <span className="font-display tracking-astral text-sm sm:text-base font-semibold text-titanium-light">
              AETHERIS
            </span>
            <span className="font-mono text-[9px] tracking-widest text-titanium-dark uppercase -mt-0.5">
              Genève • Chronométrie
            </span>
          </div>
        </div>

        {/* Center: Horological Coordinates & Geneva Time */}
        <div className="hidden md:flex items-center space-x-6 text-xs font-mono text-titanium-dark border-x border-white/10 px-6">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-titanium">GENÈVE: {genevaTime || '12:00:00'} CET</span>
          </div>
          <div className="text-[11px] text-titanium-dark/80">
            46°12′09″N • 06°08′44″E
          </div>
        </div>

        {/* Right Actions: Escapement Audio & Commission Button */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={handleAudioToggle}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border ${
              isAudioActive
                ? 'bg-gold/15 border-gold/40 text-gold shadow-sm shadow-gold/20'
                : 'bg-surface/40 border-white/10 text-titanium-dark hover:text-titanium hover:border-white/20'
            }`}
            title="Toggle mechanical escapement tick synthesis"
            aria-label="Toggle mechanical horology audio"
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-gold animate-pulse" />
                <span className="hidden sm:inline">4 Hz ACTIVE</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ACOUSTIC OFF</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenCommission}
            className="group relative inline-flex items-center space-x-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-medium tracking-wider text-void bg-gradient-to-r from-gold-light via-gold to-gold-dark hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-gold/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-display tracking-widest uppercase">COMMISSION</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
