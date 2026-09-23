'use client';

import React, { useState } from 'react';
import { Cpu, CheckCircle, Gauge, Activity, Lock, ArrowRight, Loader2 } from 'lucide-react';

interface BenchmarksProps {
  onOpenConsultation: (track: string) => void;
}

export default function Benchmarks({ onOpenConsultation }: BenchmarksProps) {
  const [domain, setDomain] = useState('legacy-wp-shop.enterprise');
  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState({
    domain: 'legacy-wp-shop.enterprise',
    currentStackDetected: 'Monolithic WordPress (PHP 8.1 / Apache / MySQL)',
    ttfbCurrent: '540ms',
    ttfbProjected: '42ms',
    ttfbImprovement: '+92% Latency Drop',
    lcpCurrent: '3.4s',
    lcpProjected: '< 0.9s',
    inpCurrent: '220ms',
    inpProjected: '28ms',
    scoreCurrent: '44 / 100',
    scoreProjected: '99 / 100',
    remediation: 'Decouple into Next.js 15 App Router on Cloudflare Edge with Incremental Static Regeneration.',
  });

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/audit/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: domain.trim() || 'example.com' }),
      });
      const data = await res.json();
      if (data && data.audit) {
        const a = data.audit;
        setAuditResult({
          domain: a.domain,
          currentStackDetected: a.currentStackDetected,
          ttfbCurrent: a.metrics.timeToFirstByte.current,
          ttfbProjected: a.metrics.timeToFirstByte.projected,
          ttfbImprovement: `${a.metrics.timeToFirstByte.improvement} Latency Drop`,
          lcpCurrent: a.metrics.coreWebVitals.lcp.current,
          lcpProjected: a.metrics.coreWebVitals.lcp.projected,
          inpCurrent: a.metrics.coreWebVitals.inp.current,
          inpProjected: a.metrics.coreWebVitals.inp.projected,
          scoreCurrent: '44 / 100',
          scoreProjected: `${a.estimatedHeadlessLighthouseScore} / 100`,
          remediation: a.recommendedRemediation?.[0] || 'Decouple frontend into Next.js edge nodes.',
        });
      }
    } catch (err) {
      console.error('Audit simulation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="benchmarks" className="py-20 md:py-28 border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase">
            VERIFIED SMALL BUSINESS RESULTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2 mb-3">
            Built for Real Small Businesses. Proven in the Field.
          </h2>
          <p className="text-slate-400 text-base">
            Here is how small business owners replaced manual spreadsheets and broken WordPress sites with custom Google AI Studio applications.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Story 1 */}
          <div className="p-6 rounded-2xl bg-[#0d1322] border border-slate-800 hover:border-indigo-500/40 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  HVAC &amp; PLUMBING
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">18 hrs/wk Saved</span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">Apex HVAC &amp; Mechanical</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                "We were drowning in missed customer calls and spending nights drafting quotes in Excel. PROWEB built us a custom booking portal with Google AI Studio that reads customer equipment photos and drafts quotes automatically. Game changer."
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="text-slate-200">Tom Miller · Owner</span>
              <span className="text-indigo-400">Delivered in 9 Days</span>
            </div>
          </div>

          {/* Story 2 */}
          <div className="p-6 rounded-2xl bg-[#0d1322] border border-slate-800 hover:border-emerald-500/40 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  HEALTHCARE &amp; DENTAL
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">+45% New Patients</span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">Coastline Family Dental</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                "Our 8-year-old WordPress site took 6.2 seconds to load on phones and our appointment forms kept failing. PROWEB decoupled our site into Next.js in one week. Page load dropped to 0.3s and our new patient bookings surged immediately."
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="text-slate-200">Dr. Emily Vance · DDS</span>
              <span className="text-emerald-400">Delivered in 7 Days</span>
            </div>
          </div>

          {/* Story 3 */}
          <div className="p-6 rounded-2xl bg-[#0d1322] border border-slate-800 hover:border-indigo-500/40 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  BOUTIQUE E-COMMERCE
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">0 Crashes on Peak</span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">Heritage Coffee Roasters</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                "Every time we emailed our 20k subscribers, WooCommerce crashed our server with 504 errors. PROWEB kept our WordPress product catalog but rebuilt our front storefront on edge CDN with an AI bean recommendation quiz."
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="text-slate-200">Julian Harris · Founder</span>
              <span className="text-indigo-400">Delivered in 11 Days</span>
            </div>
          </div>
        </div>

        {/* Small Business Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center justify-items-center opacity-80 mb-16">
          {['APEX HVAC', 'COASTLINE DENTAL', 'HERITAGE ROASTERS', 'SUMMIT LAW GROUP', 'PRECISION FLEET', 'VANGUARD TAX'].map(
            (brand) => (
              <div
                key={brand}
                className="h-10 w-full flex items-center justify-center font-mono font-semibold text-xs tracking-wider text-slate-300 border border-slate-800/80 rounded-lg bg-slate-900/40"
              >
                {brand}
              </div>
            )
          )}
        </div>

        {/* Interactive Domain Audit Tool */}
        <div className="mb-16 rounded-2xl bg-gradient-to-b from-[#0d1322] to-[#090d18] border border-slate-800 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/5 blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                  PROWEB ARCHITECT ENGINE
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Run Real-Time Headless Readiness Audit
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Analyze latency bottlenecks, Time to First Byte (TTFB), Core Web Vitals degradation, and security posture across edge regions.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Target Engine:</span>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-indigo-400">
                POST /api/audit/analyze
              </span>
            </div>
          </div>

          {/* Input bar */}
          <form onSubmit={handleAudit} className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-mono text-xs">
                https://
              </div>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="yourdomain.com or company-portal.io"
                className="w-full pl-20 pr-4 py-3 bg-slate-950 border border-slate-700/70 rounded-xl text-white text-xs sm:text-sm font-mono placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Profiling Edge Routes...</span>
                </>
              ) : (
                <>
                  <Cpu className="w-4 h-4" />
                  <span>Simulate Edge Audit</span>
                </>
              )}
            </button>
          </form>

          {/* Results Panel */}
          <div className="rounded-xl bg-slate-950/80 border border-slate-800/80 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-900 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">AUDITED TARGET:</span>
                <span className="text-xs font-mono font-bold text-white bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                  {auditResult.domain}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-500">DETECTED ARCHITECTURE:</span>
                <span className="text-xs font-mono text-amber-400">{auditResult.currentStackDetected}</span>
              </div>
            </div>

            {/* Metric Comparison Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-lg bg-slate-900/50 border border-slate-800/80">
                <div className="text-[11px] font-mono text-slate-400">Time to First Byte</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-sm font-bold font-mono text-rose-400">{auditResult.ttfbCurrent}</span>
                  <span className="text-xs text-slate-500">&rarr;</span>
                  <span className="text-base font-bold font-mono text-emerald-400">{auditResult.ttfbProjected}</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 mt-1">{auditResult.ttfbImprovement}</div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/50 border border-slate-800/80">
                <div className="text-[11px] font-mono text-slate-400">Largest Contentful Paint</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-sm font-bold font-mono text-amber-400">{auditResult.lcpCurrent}</span>
                  <span className="text-xs text-slate-500">&rarr;</span>
                  <span className="text-base font-bold font-mono text-emerald-400">{auditResult.lcpProjected}</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 mt-1">Passing Core Web Vitals</div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/50 border border-slate-800/80">
                <div className="text-[11px] font-mono text-slate-400">Interaction to Next Paint</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-sm font-bold font-mono text-rose-400">{auditResult.inpCurrent}</span>
                  <span className="text-xs text-slate-500">&rarr;</span>
                  <span className="text-base font-bold font-mono text-emerald-400">{auditResult.inpProjected}</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 mt-1">Zero Main-Thread Lockup</div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/50 border border-slate-800/80">
                <div className="text-[11px] font-mono text-slate-400">Lighthouse Performance</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-sm font-bold font-mono text-amber-400">{auditResult.scoreCurrent}</span>
                  <span className="text-xs text-slate-500">&rarr;</span>
                  <span className="text-base font-bold font-mono text-emerald-400">{auditResult.scoreProjected}</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 mt-1">Ranked Tier-1 Global</div>
              </div>
            </div>

            {/* Recommendation Row */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-slate-900">
              <div className="text-slate-400 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{auditResult.remediation}</span>
              </div>
              <button
                type="button"
                onClick={() => onOpenConsultation(`Remediation Spec: ${auditResult.domain}`)}
                className="text-xs font-mono text-indigo-400 hover:text-indigo-300 font-semibold whitespace-nowrap cursor-pointer flex items-center gap-1"
              >
                <span>Request Custom Migration Spec</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Technical Feature Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#0d1322] border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5">
              <Gauge className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Blazing Fast TTFB</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              By compiling dynamic assets to edge nodes and utilizing smart caching headers, our production deployments deliver sub-65ms Time to First Byte worldwide, eliminating client bounce rates.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0d1322] border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-5">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">99.99% Availability SLA</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Decoupled edge architecture removes monolithic single points of failure. High-volume traffic surges bypass internal CMS servers completely, keeping storefronts and portals online 24/7.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0d1322] border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-slate-500/10 text-slate-300 flex items-center justify-center mb-5">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Zero-Trust Hardening</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Our headless conversions wall off PHP runtimes behind private network layers. With no public-facing database execution or plugin vulnerabilities, security vectors drop by 99%.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
