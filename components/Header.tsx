'use client';

import React, { useState } from 'react';
import { Sparkles, Database, ArrowRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenConsultation: (track?: string) => void;
  onOpenStatus: () => void;
  onOpenInquiries: () => void;
}

export default function Header({
  onOpenConsultation,
  onOpenStatus,
  onOpenInquiries,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#070b14]/90 border-b border-slate-800/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Wordmark */}
        <a href="#" className="flex items-center gap-3 group text-white">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center p-0.5 shadow-sm group-hover:shadow-indigo-500/20 transition-all">
            <div className="w-full h-full bg-[#070b14] rounded-[7px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-400 group-hover:text-emerald-400 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-white font-mono leading-none">
              PROWEB<span className="text-indigo-400">.AGENCY</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mt-0.5">
              Small Business Engineering
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#ai-blueprint"
            className="text-indigo-400 hover:text-white hover:underline underline-offset-8 decoration-indigo-500 transition-colors flex items-center gap-1.5 font-mono text-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI App Generator</span>
          </a>
          <a
            href="#custom-apps"
            className="hover:text-white hover:underline underline-offset-8 decoration-indigo-500 transition-colors"
          >
            Custom Apps
          </a>
          <a
            href="#wordpress-migration"
            className="hover:text-white hover:underline underline-offset-8 decoration-emerald-500 transition-colors"
          >
            WordPress Modernization
          </a>
          <a
            href="#scope-tool"
            className="hover:text-white hover:underline underline-offset-8 decoration-indigo-500 transition-colors"
          >
            Pricing &amp; Scope
          </a>
          <a
            href="#faq"
            className="hover:text-white hover:underline underline-offset-8 decoration-indigo-500 transition-colors"
          >
            SMB FAQs
          </a>
        </nav>

        {/* CTA & Status & Mobile Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenStatus}
            title="View Real-Time Edge Status"
            className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>GOOGLE AI STUDIO: ACTIVE</span>
          </button>

          <button
            onClick={onOpenInquiries}
            title="View Stored Architecture Inquiries"
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-mono text-indigo-300 hover:bg-indigo-500/20 transition-all cursor-pointer"
          >
            <Database className="w-3 h-3" />
            <span>SMB INQUIRIES</span>
          </button>

          <button
            onClick={() => onOpenConsultation('Small Business App Consultation')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg transition-all shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 whitespace-nowrap cursor-pointer"
          >
            <span>Get Free Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#070b14]/98 px-6 py-5 space-y-4">
          <a
            href="#ai-blueprint"
            className="block text-base font-medium text-indigo-400 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            ✨ AI App Generator (Google AI Studio)
          </a>
          <a
            href="#custom-apps"
            className="block text-base font-medium text-slate-300 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Custom Web Apps for Small Businesses
          </a>
          <a
            href="#wordpress-migration"
            className="block text-base font-medium text-slate-300 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            WordPress Modernization
          </a>
          <a
            href="#scope-tool"
            className="block text-base font-medium text-slate-300 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Pricing &amp; Scope Calculator
          </a>
          <a
            href="#faq"
            className="block text-base font-medium text-slate-300 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Small Business FAQs
          </a>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => {
                onOpenStatus();
                setMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 text-center text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg cursor-pointer"
            >
              ● Google AI Engine
            </button>
            <button
              onClick={() => {
                onOpenInquiries();
                setMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 text-center text-xs font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-lg cursor-pointer"
            >
              SMB Inquiries
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                onOpenConsultation('Mobile Nav Trigger');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-white bg-indigo-600 rounded-lg shadow-sm cursor-pointer"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
