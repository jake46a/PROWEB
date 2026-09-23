'use client';

import React, { useState } from 'react';
import { Layers, Zap, CheckCircle, Check } from 'lucide-react';

interface ScopeEstimatorProps {
  onLockInScope: (track: string, summary: string) => void;
}

export default function ScopeEstimator({ onLockInScope }: ScopeEstimatorProps) {
  const [mode, setMode] = useState<'custom' | 'migration'>('custom');
  const [appTier, setAppTier] = useState<'mvp' | 'commercial' | 'enterprise'>('mvp');
  const [wpTopology, setWpTopology] = useState<'edge' | 'private'>('edge');

  // Custom App Inputs
  const [userStep, setUserStep] = useState(2);
  const [checkPayment, setCheckPayment] = useState(true);
  const [checkRealtime, setCheckRealtime] = useState(true);
  const [checkCustomCloud, setCheckCustomCloud] = useState(false);

  // WP Migration Inputs
  const [postStep, setPostStep] = useState(2);
  const [checkWoo, setCheckWoo] = useState(false);
  const [checkMember, setCheckMember] = useState(false);
  const [checkRedirect, setCheckRedirect] = useState(true);

  // Calculations
  let timeline = '7 – 10 Business Days';
  let stack = 'Next.js 15 + Google AI Studio (Gemini Flash)';
  let team = '1 Dedicated Principal AI Engineer';
  let perf = 'Sub-second page load · 99.9% Uptime';
  let budget = '$1,800 – $2,600';
  let deliverables: string[] = [];

  const usersMap = ['1–5 Staff / 500 Clients', '10–25 Staff / 2,500 Clients', '50+ Staff / 10k Clients', 'Multi-Branch Operation'];
  const postMap = ['< 50 Pages', '100 – 500 Pages & Posts', '1,000+ Pages & Posts', 'Large Product Catalog'];

  if (mode === 'custom') {
    let baseDaysMin = 7;
    let baseDaysMax = 10;
    let baseCostMin = 1800;
    let baseCostMax = 2600;

    if (appTier === 'commercial') {
      baseDaysMin = 10;
      baseDaysMax = 14;
      baseCostMin = 3200;
      baseCostMax = 4600;
      stack = 'Next.js + Gemini 3.8 Flash + Stripe + Postgres';
      team = '1 Lead Architect + 1 AI App Dev';
    } else if (appTier === 'enterprise') {
      baseDaysMin = 14;
      baseDaysMax = 21;
      baseCostMin = 5200;
      baseCostMax = 7400;
      stack = 'Multi-Location Next.js + AI Dispatch + Cloud SQL';
      team = '1 Lead Architect + 2 Full-Stack Devs';
    }

    if (userStep >= 3) {
      baseDaysMax += 2;
      baseCostMin += 400;
      baseCostMax += 600;
    }
    if (checkPayment) {
      baseCostMin += 300;
      baseCostMax += 400;
    }
    if (checkCustomCloud) {
      baseDaysMax += 1;
      baseCostMin += 400;
      baseCostMax += 600;
    }

    timeline = `${baseDaysMin} – ${baseDaysMax} Business Days`;
    budget = `$${baseCostMin.toLocaleString()} – $${baseCostMax.toLocaleString()}`;
    deliverables = [
      'Custom web app built with Google AI Studio & Gemini 3.8 Flash',
      '100% small business code ownership (No monthly SaaS seat fees)',
      'Automated customer booking, intake, or quoting workflow',
      '30-day post-launch warranty & direct phone/Slack support',
    ];
  } else {
    let baseDaysMin = 7;
    let baseDaysMax = 10;
    let baseCostMin = 1600;
    let baseCostMax = 2400;
    stack = 'Decoupled Next.js 15 + WP REST API';
    team = '1 Senior Modernization Engineer';
    perf = 'Page load < 0.4s · 100/100 Mobile PageSpeed';

    if (postStep >= 3) {
      baseDaysMin += 2;
      baseDaysMax += 3;
      baseCostMin += 500;
      baseCostMax += 800;
    }
    if (checkWoo) {
      baseDaysMin += 3;
      baseDaysMax += 4;
      baseCostMin += 1200;
      baseCostMax += 1800;
      stack = 'Headless Woo + Stripe Checkout + Edge CDN';
      team = '1 Modernization Lead + 1 E-Comm Dev';
    }
    if (checkMember) {
      baseDaysMin += 2;
      baseDaysMax += 2;
      baseCostMin += 500;
      baseCostMax += 700;
    }
    if (wpTopology === 'private') {
      baseCostMin += 300;
      baseCostMax += 500;
      stack += ' + Managed Cloud Container';
    }

    timeline = `${baseDaysMin} – ${baseDaysMax} Business Days`;
    budget = `$${baseCostMin.toLocaleString()} – $${baseCostMax.toLocaleString()}`;
    deliverables = [
      'Retain your easy WordPress admin dashboard for editing',
      'Sub-second decoupled frontend that loads instantly on mobile',
      '100% SEO Google Local Map & organic ranking guarantee',
      'Eliminate fragile plugins and slash hosting to $0–$15/month',
    ];
  }

  const handleLockIn = () => {
    const label = mode === 'custom' ? 'Custom Web App (Google AI Studio)' : 'WordPress to Web App Modernization';
    const trackDescription = `${label} [${timeline} / ${budget}] - Stack: ${stack}`;
    const summaryNotes = `Estimated Scope: ${label}\nTimeline: ${timeline}\nIndicative Budget: ${budget}\nStack: ${stack}`;
    onLockInScope(trackDescription, summaryNotes);
  };

  return (
    <section id="scope-tool" className="py-20 md:py-28 bg-[#0a0f1d] border-y border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono text-indigo-400 tracking-wider uppercase">
            INTERACTIVE CALCULATOR
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2 mb-3">
            Dynamic Architecture &amp; Scope Estimator
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Select your development trajectory to generate an instant engineering blueprint, timeline, and team composition model.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="rounded-2xl bg-[#0d1322] border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-2xl">
          {/* Service Mode Selector Tabs */}
          <div className="flex items-center p-1.5 bg-slate-950 rounded-xl border border-slate-800 max-w-md mx-auto mb-10">
            <button
              type="button"
              onClick={() => setMode('custom')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                mode === 'custom' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Custom Web App</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('migration')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                mode === 'migration' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>WordPress Migration</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Configuration Controls (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-8">
              {mode === 'custom' ? (
                <div className="space-y-6">
                  {/* Scale / Tier */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      1. Small Business Application Scope
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['mvp', 'commercial', 'enterprise'] as const).map((tier) => {
                        const isSelected = appTier === tier;
                        const titles = {
                          mvp: 'Starter Web App',
                          commercial: 'Business Portal',
                          enterprise: 'Multi-Location Ops',
                        };
                        const subtitles = {
                          mvp: '7–10 Days · Core Flow',
                          commercial: '10–14 Days · Full Engine',
                          enterprise: '14–21 Days · Multi-Branch',
                        };
                        return (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => setAppTier(tier)}
                            className={`py-3 px-3 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'border-indigo-500/40 bg-indigo-600/10 text-white'
                                : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="font-bold text-white">{titles[tier]}</div>
                            <div className="text-[11px] text-slate-400 mt-1">{subtitles[tier]}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Users Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                        2. Team Size &amp; Monthly Active Customer Load
                      </label>
                      <span className="text-xs font-mono font-bold text-indigo-400">
                        {usersMap[userStep - 1]}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={4}
                      value={userStep}
                      onChange={(e) => setUserStep(parseInt(e.target.value))}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1.5">
                      <span>1–5 Staff</span>
                      <span>10–25 Staff</span>
                      <span>50+ Staff</span>
                      <span>Multi-Branch</span>
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      3. Google AI Studio &amp; Business Automation Add-Ons
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                        <input
                          type="checkbox"
                          checked={checkPayment}
                          onChange={(e) => setCheckPayment(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-indigo-600"
                        />
                        <span className="text-xs font-medium text-slate-200">
                          Google AI Studio Gemini 3.8 Flash (Auto Photo Quoting &amp; Invoice Extraction)
                        </span>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                        <input
                          type="checkbox"
                          checked={checkRealtime}
                          onChange={(e) => setCheckRealtime(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-indigo-600"
                        />
                        <span className="text-xs font-medium text-slate-200">
                          Customer Self-Service Portal + Stripe Automated Billing &amp; Receipts
                        </span>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                        <input
                          type="checkbox"
                          checked={checkCustomCloud}
                          onChange={(e) => setCheckCustomCloud(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-indigo-600"
                        />
                        <span className="text-xs font-medium text-slate-200">
                          Two-Way SMS / WhatsApp Dispatch &amp; Real-time Calendar Sync
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* WP Posts Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                        1. Current WordPress Page &amp; Post Volume
                      </label>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {postMap[postStep - 1]}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={4}
                      value={postStep}
                      onChange={(e) => setPostStep(parseInt(e.target.value))}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1.5">
                      <span>&lt; 50 Pages</span>
                      <span>100–500 Pages</span>
                      <span>1,000+ Pages</span>
                      <span>Large Catalog</span>
                    </div>
                  </div>

                  {/* WP Features */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      2. Small Business Features in WordPress
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                        <input
                          type="checkbox"
                          checked={checkWoo}
                          onChange={(e) => setCheckWoo(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-emerald-500"
                        />
                        <span className="text-xs font-medium text-slate-200">
                          Decoupled WooCommerce Storefront / Fast Stripe Checkout
                        </span>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                        <input
                          type="checkbox"
                          checked={checkMember}
                          onChange={(e) => setCheckMember(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-emerald-500"
                        />
                        <span className="text-xs font-medium text-slate-200">
                          Private Customer Intake &amp; Documents Vault
                        </span>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                        <input
                          type="checkbox"
                          checked={checkRedirect}
                          onChange={(e) => setCheckRedirect(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-emerald-500"
                        />
                        <span className="text-xs font-medium text-slate-200">
                          SEO 301 Redirect Vault (100% Google Local Map &amp; Rank Guarantee)
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Hosting Strategy */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      3. Modern Edge Hosting Strategy
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setWpTopology('edge')}
                        className={`py-3 px-3 rounded-xl border text-xs font-medium text-left cursor-pointer transition-all ${
                          wpTopology === 'edge'
                            ? 'border-emerald-500/40 bg-emerald-600/10 text-white'
                            : 'border-slate-800 bg-slate-900/60 text-slate-300'
                        }`}
                      >
                        <div className="font-bold text-white">Cloudflare Edge ($0-$10/mo)</div>
                        <div className="text-[11px] text-slate-400 mt-1">Instant Speed &amp; Free CDN</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setWpTopology('private')}
                        className={`py-3 px-3 rounded-xl border text-xs font-medium text-left cursor-pointer transition-all ${
                          wpTopology === 'private'
                            ? 'border-emerald-500/40 bg-emerald-600/10 text-white'
                            : 'border-slate-800 bg-slate-900/60 text-slate-300'
                        }`}
                      >
                        <div className="font-bold text-white">Managed Container ($20/mo)</div>
                        <div className="text-[11px] text-slate-400 mt-1">Private Automated Backups</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic Output Card (lg:col-span-5) */}
            <div className="lg:col-span-5">
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-6 relative overflow-hidden shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                      PROWEB SPEC SHEET
                    </span>
                    <h4 className="text-base font-bold text-white font-mono">
                      {mode === 'custom' ? 'Custom Small Business App' : 'WordPress to Web App Migration'}
                    </h4>
                  </div>
                  <span
                    className={`text-xs font-mono px-2.5 py-1 rounded border ${
                      mode === 'custom'
                        ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}
                  >
                    ESTIMATE
                  </span>
                </div>

                {/* Key Metric Outputs */}
                <div className="space-y-4 mb-6 text-xs">
                  <div className="flex items-center justify-between py-2 border-b border-slate-900">
                    <span className="text-slate-400">Engineering Velocity:</span>
                    <span className="font-mono font-bold text-white tabular-nums">{timeline}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-900">
                    <span className="text-slate-400">Recommended Architecture:</span>
                    <span className="font-mono font-bold text-indigo-300 text-right">{stack}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-900">
                    <span className="text-slate-400">Squad Composition:</span>
                    <span className="font-mono text-slate-200 text-right">{team}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-900">
                    <span className="text-slate-400">Projected Performance:</span>
                    <span className="font-mono font-semibold text-emerald-400 text-right">{perf}</span>
                  </div>

                  <div className="flex items-center justify-between py-2.5 pt-3">
                    <span className="text-slate-300 font-semibold">Indicative Fixed Budget:</span>
                    <span className="text-lg font-mono font-extrabold text-white tabular-nums">{budget}</span>
                  </div>
                </div>

                {/* Architecture Deliverables */}
                <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800/80 mb-6 text-xs">
                  <div className="font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Guaranteed In Scope</span>
                  </div>
                  <ul className="text-slate-400 space-y-1 list-disc list-inside text-[11px]">
                    {deliverables.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Lock-In Scope Action Button */}
                <button
                  type="button"
                  onClick={handleLockIn}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Lock In Scope &amp; Book Review</span>
                </button>

                <div className="text-[11px] text-center text-slate-500 mt-3 font-mono">
                  Direct architect engagement. Zero sales intermediaries.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
