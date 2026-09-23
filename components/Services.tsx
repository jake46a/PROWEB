'use client';

import React from 'react';
import { Sparkles, Bot, Wallet, Zap, CreditCard, ArrowRight } from 'lucide-react';

interface ServicesProps {
  onOpenConsultation: (track: string) => void;
}

export default function Services({ onOpenConsultation }: ServicesProps) {
  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-indigo-400 tracking-wider uppercase">
            CORE SPECIALIZATION FOR SMALL BUSINESSES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2 mb-4">
            Two Disciplines. Built Specifically for Growing Businesses.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We eliminate repetitive manual busywork and rescue small businesses from fragile WordPress setups using Google AI Studio.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT SERVICE: Custom Web Application Development */}
          <div
            id="custom-apps"
            className="relative rounded-2xl bg-[#0d1322] border border-slate-800 p-8 sm:p-10 flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-300 shadow-xl group"
          >
            <div className="absolute -top-px -right-px w-32 h-32 bg-indigo-500/10 rounded-tr-2xl blur-xl pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-indigo-400 tracking-wider">SERVICE 01 · AI-POWERED</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                Custom Web Applications (via Google AI Studio)
              </h3>

              <p className="text-slate-300 leading-relaxed mb-6">
                Bespoke operational web apps built in 7–14 days. We replace messy spreadsheets, endless phone tag, and overpriced $300/user/mo software subscriptions with custom web apps tailored strictly to your business workflow.
              </p>

              {/* Technical Pillars for SMBs */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded bg-indigo-500/10 text-indigo-400 shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Google AI Studio &amp; Gemini 3.8 Flash Intelligence</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Automated photo quote estimations, instant customer intake categorization, and 24/7 intelligent SMS/email booking bots.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded bg-indigo-500/10 text-indigo-400 shrink-0">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Zero Ongoing Software Seat Fees</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      You own 100% of the code. Never pay per-user monthly license fees to Salesforce, ServiceTitan, or Jobber again.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded bg-indigo-500/10 text-indigo-400 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Rapid 7 to 14-Day Delivery</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Our specialized AI Studio engineering workflow delivers working production web applications in days, not months.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded bg-indigo-500/10 text-indigo-400 shrink-0">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Built-in Payments &amp; Client Portals</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      One-click Stripe invoice links, customer service history vaults, and Google Calendar 2-way dispatch synchronization.
                    </p>
                  </div>
                </div>
              </div>

              {/* Deliverable Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80 mb-8 text-xs font-mono text-slate-400">
                <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-indigo-300">Google AI Studio</span>
                <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded">Gemini 3.8 Flash</span>
                <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded">Next.js 15</span>
                <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded">Stripe Payments</span>
                <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded">100% Code Ownership</span>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => onOpenConsultation('Custom Small Business Web App (Google AI Studio)')}
                className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-sm font-semibold tracking-wide border border-slate-700 hover:border-indigo-500 transition-all flex items-center justify-center gap-2 group-hover:bg-indigo-600 cursor-pointer"
              >
                <span>Get Custom Small Business App Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT SERVICE: WordPress to Web Application Migration */}
          <div
            id="wordpress-migration"
            className="relative rounded-2xl bg-[#0d1322] border border-slate-800 p-8 sm:p-10 flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-300 shadow-xl group"
          >
            <div className="absolute -top-px -right-px w-32 h-32 bg-emerald-500/10 rounded-tr-2xl blur-xl pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-emerald-400 tracking-wider">SERVICE 02 · SPEED MODERNIZATION</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                WordPress to Sub-Second Web App Modernization
              </h3>

              <p className="text-slate-300 leading-relaxed mb-6">
                Keep the familiar WordPress dashboard your non-technical team already knows, while replacing the slow, fragile theme with a blazing-fast decoupled web app hosted on global edge CDN.
              </p>

              {/* Core Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80">
                  <div className="text-xs font-mono text-emerald-400">EASY FOR YOUR STAFF</div>
                  <div className="text-sm font-semibold text-white mt-0.5">Keep WP Content Editor</div>
                  <div className="text-xs text-slate-400 mt-1">Your team still edits pages in WordPress. We turn it into clean API data automatically.</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80">
                  <div className="text-xs font-mono text-emerald-400">ZERO PLUGIN HEADACHES</div>
                  <div className="text-sm font-semibold text-white mt-0.5">Eliminate 30+ Plugins</div>
                  <div className="text-xs text-slate-400 mt-1">No more plugin update anxiety, broken layouts, or expensive WP Engine hosting bills.</div>
                </div>
              </div>

              {/* Side-by-Side Before/After Mini-Table for SMBs */}
              <div className="mb-8 rounded-xl border border-slate-800 overflow-hidden bg-slate-950/60">
                <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold uppercase text-slate-300">Small Business Modernization Matrix</span>
                  <span className="text-[11px] font-mono text-emerald-400">Legacy WP vs Modern Web App</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-slate-800 text-slate-400 bg-slate-900/40">
                      <tr>
                        <th className="p-2.5 font-medium">Business Impact</th>
                        <th className="p-2.5 font-medium text-rose-400">Sluggish WordPress</th>
                        <th className="p-2.5 font-medium text-emerald-400">PROWEB Decoupled App</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                      <tr>
                        <td className="p-2.5 font-sans font-medium text-slate-200">Mobile Page Load</td>
                        <td className="p-2.5 text-rose-300">4.5s – 7.2s (Losing Leads)</td>
                        <td className="p-2.5 text-emerald-300 font-semibold">&lt; 0.4s (Instant)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-medium text-slate-200">Monthly Hosting Cost</td>
                        <td className="p-2.5 text-rose-300">$80 – $250 / month</td>
                        <td className="p-2.5 text-emerald-300 font-semibold">$0 – $15 / month (Edge)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-medium text-slate-200">Security &amp; Maintenance</td>
                        <td className="p-2.5 text-rose-300">Weekly plugin update fear</td>
                        <td className="p-2.5 text-emerald-300 font-semibold">Zero plugin attack surface</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-medium text-slate-200">Google SEO Rank</td>
                        <td className="p-2.5 text-rose-300">Penalized by Core Web Vitals</td>
                        <td className="p-2.5 text-emerald-300 font-semibold">100/100 PageSpeed Boost</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => onOpenConsultation('WordPress Modernization for Small Business')}
                className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-sm font-semibold tracking-wide border border-slate-700 hover:border-emerald-500 transition-all flex items-center justify-center gap-2 group-hover:bg-emerald-600 cursor-pointer"
              >
                <span>Inquire WordPress Modernization</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
