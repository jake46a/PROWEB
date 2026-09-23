'use client';

import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

export interface BlueprintData {
  appName: string;
  tagline: string;
  summary: string;
  coreModules: { name: string; description: string }[];
  googleAiStudioFeatures: string[];
  estimatedTimeline: string;
  fixedPriceRange: string;
  weeklyHoursSaved: string;
  conversionGain: string;
  architectureStack?: string;
  businessType?: string;
  painPoint?: string;
}

const DEFAULT_BLUEPRINT: BlueprintData = {
  appName: 'ServicePulse AI Dispatch & Quoting Web App',
  tagline: 'Instant customer photo/text quoting and automated technician dispatch built in 8 days.',
  summary:
    'Designed specifically for HVAC & Home Trades, this custom web app replaces manual phone tag with a self-service customer portal that analyzes repair requests and estimates work orders instantly.',
  coreModules: [
    {
      name: 'AI Photo & Description Estimator',
      description: 'Homeowners take a picture of their furnace or pipe; Gemini drafts a preliminary parts and labor estimate.',
    },
    {
      name: 'Real-Time Schedule & Dispatch Board',
      description: 'Syncs with Google Calendar to route emergency or scheduled calls directly to available service vans.',
    },
    {
      name: 'Automated SMS Confirmation & Invoicing',
      description: 'Sends one-click Stripe payment links and real-time technician arrival tracking to customer phones.',
    },
    {
      name: 'Customer Service History Vault',
      description: 'Zero-paperwork access to prior service tickets, warranties, and equipment serial numbers.',
    },
  ],
  googleAiStudioFeatures: [
    'Gemini 3.8 Flash visual analysis to classify equipment and diagnostic error codes',
    'Natural language job note transcription to generate polished client invoice summaries',
    'Intelligent dispatch routing based on technician skill level and GPS radius',
  ],
  estimatedTimeline: '8 – 10 Days',
  fixedPriceRange: '$2,800 – $3,600',
  weeklyHoursSaved: '18 hours/week',
  conversionGain: '+42% quote acceptance',
  businessType: 'HVAC, Plumbing & Electrical Trades',
  painPoint: 'Chasing phone leads & manual quote calculation',
};

const INDUSTRY_PRESETS = [
  'HVAC, Plumbing & Electrical Trades',
  'Dental, Medical & Health Clinic',
  'Law Firm & Legal Practice',
  'Specialty Boutique E-Commerce',
  'Fitness Studio & Wellness Salon',
];

const BOTTLENECK_PRESETS = [
  'Chasing phone leads & manual quote calculation',
  'Slow WordPress website that takes 6s to load and loses customers',
  'Messy spreadsheets, paper invoices, and manual dispatch',
  'Need secure client portal for document uploads and status tracking',
];

interface BlueprintGeneratorProps {
  onScheduleBlueprint: (bp: BlueprintData) => void;
}

export default function BlueprintGenerator({ onScheduleBlueprint }: BlueprintGeneratorProps) {
  const [industry, setIndustry] = useState('HVAC, Plumbing & Electrical Trades');
  const [bottleneck, setBottleneck] = useState('Chasing phone leads & manual quote calculation');
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState('Google AI Studio Engine (Gemini 3.8 Flash)');
  const [blueprint, setBlueprint] = useState<BlueprintData>(DEFAULT_BLUEPRINT);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/ai/blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessType: industry,
          painPoint: bottleneck || 'Manual processes and slow website',
          targetOutcome: 'Save 15+ hours/week and increase conversion rate',
        }),
      });

      const data = await res.json();
      if (data && data.blueprint) {
        setBlueprint({
          ...data.blueprint,
          businessType: industry,
          painPoint: bottleneck,
        });
        if (data.source) {
          setSource(data.source);
        }
      }
    } catch (err) {
      console.error('Error generating AI blueprint:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="ai-blueprint"
      className="py-16 md:py-24 bg-gradient-to-b from-[#070b14] via-[#0b101e] to-[#070b14] border-b border-slate-800/80 relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DEVELOPED WITH GOOGLE AI STUDIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Interactive Custom App Blueprint Generator
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Tell us your business trade and primary operational bottleneck. Our Google AI Studio engine will
            instantly architect your custom application blueprint, modules, and fixed investment range.
          </p>
        </div>

        {/* Interactive Generator Box */}
        <div className="rounded-2xl bg-[#0d1322] border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <form onSubmit={handleGenerate} className="space-y-6 relative z-10">
            {/* Step 1: Industry Preset Chips */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2 uppercase tracking-wider">
                1. Your Business Industry / Trade:
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {INDUSTRY_PRESETS.map((p) => {
                  const isSelected = industry === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setIndustry(p)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600/20 border border-indigo-500 text-indigo-300'
                          : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-indigo-500'
                      }`}
                    >
                      {p.split(',')[0]}
                    </button>
                  );
                })}
              </div>
              <input
                type="text"
                required
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="Or type your custom business (e.g. Commercial Roofing, Boutique Bakery...)"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:border-indigo-500 focus:outline-none font-mono"
              />
            </div>

            {/* Step 2: Primary Bottleneck Preset Chips */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2 uppercase tracking-wider">
                2. Your Biggest Daily Headache / Bottleneck:
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {BOTTLENECK_PRESETS.map((bp) => {
                  const isSelected = bottleneck === bp;
                  return (
                    <button
                      key={bp}
                      type="button"
                      onClick={() => setBottleneck(bp)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600/20 border border-indigo-500 text-indigo-300'
                          : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-indigo-500'
                      }`}
                    >
                      {bp.slice(0, 32)}...
                    </button>
                  );
                })}
              </div>
              <input
                type="text"
                required
                value={bottleneck}
                onChange={(e) => setBottleneck(e.target.value)}
                placeholder="Describe your primary daily bottleneck..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:border-indigo-500 focus:outline-none font-mono"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Architecting via Google AI Studio...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Custom App Blueprint</span>
                  </>
                )}
              </button>
              <span className="text-xs text-slate-500 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero commitment · Instant technical specification</span>
              </span>
            </div>
          </form>

          {/* Generated Blueprint Display Area */}
          <div className="mt-8 pt-8 border-t border-slate-800/80">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/60 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{source}</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{blueprint.appName}</h3>
                <p className="text-xs font-mono text-indigo-300 mt-1">{blueprint.tagline}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[11px] font-mono text-slate-400">ESTIMATED FIXED INVESTMENT</div>
                  <div className="text-lg font-bold font-mono text-emerald-400">{blueprint.fixedPriceRange}</div>
                </div>
                <div className="text-right pl-3 border-l border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400">DELIVERY TIMELINE</div>
                  <div className="text-lg font-bold font-mono text-white">{blueprint.estimatedTimeline}</div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">{blueprint.summary}</p>

            {/* 4 Modules Grid */}
            <div className="mb-6">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                Core Application Modules:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {blueprint.coreModules.map((mod, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs font-bold text-white">{mod.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{mod.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Google AI Studio Specific Advantages */}
            <div className="mb-6 p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20">
              <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider flex items-center gap-1.5 mb-2 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Google AI Studio Capabilities Integrated:</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {blueprint.googleAiStudioFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"></span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact & Action Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-6 text-xs font-mono">
                <div>
                  <span className="text-slate-400">Projected Time Saved:</span>
                  <span className="text-emerald-400 font-bold ml-1">{blueprint.weeklyHoursSaved}</span>
                </div>
                <div>
                  <span className="text-slate-400">Conversion Gain:</span>
                  <span className="text-indigo-300 font-bold ml-1">{blueprint.conversionGain}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onScheduleBlueprint(blueprint)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <span>Schedule This Build with Lead Architect</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
