import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface CommissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommissionModal: React.FC<CommissionModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    metal: 'Grade 5 Titanium',
    engraving: 'ASTRA INCLINANT',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playMechanicalClick();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-void/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl glass-panel-gold border border-gold/40 shadow-2xl text-titanium">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-titanium-dark hover:text-gold transition-colors"
          aria-label="Close Commission Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-gold tracking-widest uppercase">
                ATELIER HORLOGER GENEVOIS • PRIVATE COMMISSION
              </span>
              <h3 className="font-display text-2xl font-light text-titanium-light">
                Request Allocation
              </h3>
              <p className="text-xs text-titanium-dark font-sans leading-relaxed">
                Caliber AE-90 is restricted to 12 bespoke executions per annum. Enter your details to reserve your private assembly slot.
              </p>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-titanium-dark uppercase mb-1">COLLECTOR FULL NAME</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Lord Alistair Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface/80 border border-white/10 text-titanium focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-titanium-dark uppercase mb-1">CONFIDENTIAL CONTACT EMAIL</label>
                <input
                  required
                  type="email"
                  placeholder="collector@residence.ch"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface/80 border border-white/10 text-titanium focus:border-gold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-titanium-dark uppercase mb-1">CASE FINISH</label>
                  <select
                    value={formData.metal}
                    onChange={(e) => setFormData({ ...formData, metal: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-surface/80 border border-white/10 text-titanium focus:border-gold focus:outline-none"
                  >
                    <option value="Grade 5 Titanium">Grade 5 Titanium</option>
                    <option value="18K Rose Gold">18K Rose Gold</option>
                    <option value="DLC Obsidian Carbon">DLC Obsidian Carbon</option>
                    <option value="950 Platinum">950 Platinum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-titanium-dark uppercase mb-1">CUSTOM CASEBACK MOTTO</label>
                  <input
                    type="text"
                    maxLength={24}
                    placeholder="ASTRA INCLINANT"
                    value={formData.engraving}
                    onChange={(e) => setFormData({ ...formData, engraving: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-surface/80 border border-white/10 text-titanium focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-light via-gold to-gold-dark text-void font-display text-xs tracking-astral uppercase font-semibold hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-gold/20 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>SUBMIT ALLOCATION PETITION</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold text-gold flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl text-titanium-light">
              Allocation Received
            </h3>
            <p className="text-xs text-titanium-dark font-sans leading-relaxed max-w-sm mx-auto">
              Master Horologist Marc-Aurèle and our Geneva concierge will review your petition for the Caliber AE-90 within 24 business hours.
            </p>
            <div className="font-mono text-[11px] text-gold p-3 rounded-xl bg-surface/50 border border-white/5">
              ALLOCATION DOSSIER N° {Math.floor(100000 + Math.random() * 900000)}
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-2 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-void font-mono text-xs uppercase transition-all"
            >
              RETURN TO ATELIER
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
