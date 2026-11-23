import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExplodedMovement } from './components/ExplodedMovement';
import { Complications } from './components/Complications';
import { Configurator } from './components/Configurator';
import { CommissionModal } from './components/CommissionModal';
import { Footer } from './components/Footer';

export function App() {
  const [isCommissionOpen, setIsCommissionOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  const scrollToExploded = () => {
    const el = document.getElementById('exploded-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-void text-titanium font-sans bg-noise selection:bg-gold selection:text-void">
      <Navbar onOpenCommission={() => setIsCommissionOpen(true)} />
      
      <main id="main-content">
        <Hero
          onExploreExploded={scrollToExploded}
          onOpenCommission={() => setIsCommissionOpen(true)}
        />
        
        <ExplodedMovement />
        
        <Complications />
        
        <Configurator onOpenCommission={() => setIsCommissionOpen(true)} />
      </main>

      <Footer />

      <CommissionModal
        isOpen={isCommissionOpen}
        onClose={() => setIsCommissionOpen(false)}
      />
    </div>
  );
}

export default App;
