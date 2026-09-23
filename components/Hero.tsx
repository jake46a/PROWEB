'use client';

import React from 'react';
import { Sparkles, Sliders } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-18 md:pt-20 md:pb-24 border-b border-slate-800/60">
      {/* Ambient background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-emerald-500/10 to-transparent blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Category Indicator Line */}
        <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 tracking-wide mb-6 bg-slate-900/60 px-3.5 py-1.5 rounded-full border border-slate-800">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-emerald-400 font-semibold">BUILT FOR SMALL BUSINESSES</span>
          <span aria-hidden="true" className="text-slate-600">/</span>
          <span className="text-indigo-400">POWERED BY GOOGLE AI STUDIO</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.14] mb-6 max-w-4xl mx-auto text-balance">
          Big-Tech Web Apps &amp; AI Power, Built Specifically for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-emerald-300 to-emerald-400">
            Small Businesses.
          </span>
        </h1>

        {/* Value Proposition */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 font-normal">
          We engineer custom web applications and modernize clunky, slow WordPress sites using{' '}
          <strong className="text-white font-medium">Google AI Studio</strong>. Eliminate repetitive manual work, ditch
          expensive software seat subscriptions, and launch in 7–14 days—at transparent fixed pricing small businesses
          can actually afford.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
            href="#ai-blueprint"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Custom App Blueprint (AI Studio)</span>
          </a>
          <a
            href="#scope-tool"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 hover:text-white border border-slate-700/80 rounded-xl transition-all"
          >
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>Transparent SMB Pricing &amp; Scope</span>
          </a>
        </div>

        {/* Metric Highlights for SMBs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-800/80 max-w-4xl mx-auto">
          <div className="text-left">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-indigo-400 tabular-nums tracking-tight">
              7 – 14 Days
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
              Rapid AI Studio Launch
            </div>
          </div>
          <div className="text-left">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 tabular-nums tracking-tight">
              15+ Hours
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
              Saved Weekly in Manual Work
            </div>
          </div>
          <div className="text-left">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums tracking-tight">
              From $1,800
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
              Fixed Transparent Pricing
            </div>
          </div>
          <div className="text-left">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 tabular-nums tracking-tight">
              100% Own
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
              Zero Monthly SaaS Lock-In
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
