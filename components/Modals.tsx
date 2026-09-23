'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Check,
  Database,
  RefreshCw,
  Plus,
  Download,
  Loader2,
} from 'lucide-react';
import type { Inquiry } from '@/lib/inquiries';

interface ModalsProps {
  // Consultation Modal
  consultationOpen: boolean;
  onCloseConsultation: () => void;
  serviceTrack: string;
  initialNotes?: string;

  // System Status Modal
  statusOpen: boolean;
  onCloseStatus: () => void;

  // Inquiries Modal
  inquiriesOpen: boolean;
  onCloseInquiries: () => void;
  onOpenConsultationWithTrack: (track: string) => void;

  // Whitepaper Modal
  whitepaperOpen: boolean;
  whitepaperDocType: string;
  onCloseWhitepaper: () => void;

  // Policy Modal
  policyOpen: boolean;
  policyType: 'privacy' | 'terms';
  onClosePolicy: () => void;
}

export default function Modals({
  consultationOpen,
  onCloseConsultation,
  serviceTrack,
  initialNotes = '',
  statusOpen,
  onCloseStatus,
  inquiriesOpen,
  onCloseInquiries,
  onOpenConsultationWithTrack,
  whitepaperOpen,
  whitepaperDocType,
  onCloseWhitepaper,
  policyOpen,
  policyType,
  onClosePolicy,
}: ModalsProps) {
  // Consultation form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [consultSubmitting, setConsultSubmitting] = useState(false);
  const [consultError, setConsultError] = useState('');
  const [createdInquiry, setCreatedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    if (initialNotes) {
      setNotes(initialNotes);
    }
  }, [initialNotes]);

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setConsultSubmitting(true);
    setConsultError('');

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceTrack,
          name,
          email,
          url,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || 'Failed to submit inquiry.');
      }

      setCreatedInquiry(data.inquiry);
    } catch (err: any) {
      setConsultError(err.message || 'An error occurred connecting to the backend.');
    } finally {
      setConsultSubmitting(false);
    }
  };

  const handleResetConsultation = () => {
    setName('');
    setEmail('');
    setUrl('');
    setNotes('');
    setCreatedInquiry(null);
    setConsultError('');
    onCloseConsultation();
  };

  // System Status state
  const [systemData, setSystemData] = useState<any>(null);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const fetchStatus = async () => {
    setLoadingStatus(true);
    try {
      const res = await fetch('/api/system/status');
      const data = await res.json();
      setSystemData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    if (statusOpen) {
      fetchStatus();
    }
  }, [statusOpen]);

  // Inquiries Ledger state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const res = await fetch('/api/consultations');
      const data = await res.json();
      setInquiries(data.inquiries || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  useEffect(() => {
    if (inquiriesOpen) {
      fetchInquiries();
    }
  }, [inquiriesOpen]);

  // Whitepaper state
  const [wpEmail, setWpEmail] = useState('');
  const [wpSubmitting, setWpSubmitting] = useState(false);
  const [wpSuccessMessage, setWpSuccessMessage] = useState('');

  const handleWhitepaperSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWpSubmitting(true);
    try {
      const res = await fetch('/api/whitepaper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: wpEmail, documentType: whitepaperDocType }),
      });
      const data = await res.json();
      setWpSuccessMessage(data.message || 'Technical briefing dispatched to your inbox.');
    } catch (err) {
      console.error(err);
    } finally {
      setWpSubmitting(false);
    }
  };

  const handleCloseWhitepaperModal = () => {
    setWpEmail('');
    setWpSuccessMessage('');
    onCloseWhitepaper();
  };

  return (
    <>
      {/* 1. CONSULTATION MODAL */}
      {consultationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0d1322] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
            <button
              onClick={handleResetConsultation}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!createdInquiry ? (
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    <span className="text-xs font-mono text-indigo-400 tracking-wider uppercase">
                      DIRECT ARCHITECT DISCOVERY
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Schedule Architecture Review</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Connect directly with a principal engineer. We evaluate your small business requirements within 4 business hours.
                  </p>
                </div>

                <form onSubmit={handleConsultationSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">SELECTED TRACK</label>
                    <input
                      type="text"
                      readOnly
                      value={serviceTrack}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-indigo-300 font-mono text-xs focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">YOUR NAME *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Vance"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">WORK EMAIL *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      CURRENT WEBSITE OR APPOINTMENT LINK (OPTIONAL)
                    </label>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      PROJECT OBJECTIVES &amp; CONSTRAINTS
                    </label>
                    <textarea
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Describe current latency issues, migration target, or custom feature roadmap..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                    ></textarea>
                  </div>

                  {consultError && (
                    <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-lg">
                      {consultError}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={consultSubmitting}
                      className="w-full py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      {consultSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Registering in Architecture Gateway...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Architecture Review Request</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-center text-slate-500">
                    Strict NDA guaranteed. No marketing spam. Direct engineer correspondence only.
                  </p>
                </form>
              </div>
            ) : (
              <div className="py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-white">Inquiry Recorded in Architecture Gateway</h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                    Your technical discovery specification has been received and persisted in our engineering backend.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-2.5 text-xs font-mono">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-900">
                    <span className="text-slate-400">Ledger Reference:</span>
                    <span className="text-indigo-400 font-bold">{createdInquiry.id}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-900">
                    <span className="text-slate-400">Assigned Architect:</span>
                    <span className="text-slate-200 text-right">{createdInquiry.assignedArchitect}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-900">
                    <span className="text-slate-400">Priority Tier:</span>
                    <span className="text-emerald-400">{createdInquiry.priority}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Contractual SLA Response:</span>
                    <span className="text-indigo-300 font-bold">&lt; 4 Business Hours</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => {
                      handleResetConsultation();
                      // Inquiries modal
                    }}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-semibold font-mono flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Done</span>
                  </button>
                  <button
                    onClick={handleResetConsultation}
                    className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
                  >
                    Return to Site
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. SYSTEM STATUS MODAL */}
      {statusOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0d1322] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
            <button
              onClick={onCloseStatus}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                    LIVE BACKEND TELEMETRY
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">Global Edge Cluster &amp; Google AI Engine Health</h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                99.994% AVAILABILITY SLA
              </span>
            </div>

            {systemData ? (
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[11px] font-mono text-slate-400">Global Avg TTFB</div>
                    <div className="text-lg font-bold font-mono text-emerald-400 mt-1">
                      {systemData.currentMetrics?.avgTtfbGlobal || '48ms'}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[11px] font-mono text-slate-400">Edge Cache Hit Ratio</div>
                    <div className="text-lg font-bold font-mono text-indigo-400 mt-1">
                      {systemData.currentMetrics?.cacheHitRatio || '98.7%'}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[11px] font-mono text-slate-400">P99 Gateway Latency</div>
                    <div className="text-lg font-bold font-mono text-white mt-1">
                      {systemData.currentMetrics?.p99Latency || '82ms'}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                  <div className="px-4 py-2.5 bg-slate-900/60 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex justify-between">
                    <span>ACTIVE EDGE &amp; AI CLUSTERS</span>
                    <span>LIVE PING / HEALTH</span>
                  </div>
                  <div className="divide-y divide-slate-900 text-xs font-mono max-h-56 overflow-y-auto">
                    {systemData.activeEdgeClusters?.map((c: any, i: number) => (
                      <div key={i} className="px-4 py-3 flex items-center justify-between hover:bg-slate-900/40">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          <span className="text-white font-medium">{c.region}</span>
                          <span className="text-[10px] text-slate-500">({c.nodes} Nodes)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-emerald-400 font-bold">{c.latencyMs}ms</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                            {c.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-xs font-mono text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-400" />
                <span>Querying /api/system/status...</span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>Transport: HTTP/3 + TLS 1.3 Strict Zero-Trust</span>
              <button
                onClick={fetchStatus}
                disabled={loadingStatus}
                className="hover:text-indigo-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${loadingStatus ? 'animate-spin' : ''}`} />
                <span>Refresh Ping</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. INQUIRIES LEDGER MODAL */}
      {inquiriesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#0d1322] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <button
              onClick={onCloseInquiries}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                    REST API PERSISTENCE
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">Small Business Architecture Inquiries Ledger</h3>
              </div>
              <div>
                <button
                  onClick={() => {
                    onCloseInquiries();
                    onOpenConsultationWithTrack('New Ledger Inquiry');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>New Inquiry</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Real-time record of consultation requests persisted in the backend (
              <code className="font-mono text-indigo-300">GET /api/consultations</code>). Each submission triggers automated architect assignment and strict SLA tracking.
            </p>

            <div className="overflow-y-auto space-y-3 pr-1 flex-grow">
              {loadingInquiries ? (
                <div className="p-8 text-center text-slate-500 text-xs font-mono">
                  <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-indigo-400" />
                  Loading backend ledger...
                </div>
              ) : inquiries.length === 0 ? (
                <div className="p-6 text-center text-slate-500 text-xs font-mono">
                  No inquiries logged yet. Submit via the consultation modal!
                </div>
              ) : (
                inquiries.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-colors space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-indigo-400">{item.id}</span>
                        <span className="text-xs text-white font-semibold">{item.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">({item.email})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            item.priority.includes('Tier 1')
                              ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {item.priority}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {item.status}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-indigo-200/90 font-mono bg-slate-900/60 p-2 rounded border border-slate-800/60">
                      {item.serviceTrack}
                    </div>

                    {item.notes && <div className="text-xs text-slate-400 italic">"{item.notes}"</div>}

                    <div className="pt-1 flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-mono border-t border-slate-900 gap-2">
                      <div>
                        Lead: <span className="text-slate-300">{item.assignedArchitect}</span>
                      </div>
                      <div>
                        SLA: <span className="text-emerald-400">{item.slaResponseTarget}</span> ·{' '}
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>Showing {inquiries.length} recorded entries</span>
              <button
                onClick={fetchInquiries}
                disabled={loadingInquiries}
                className="hover:text-indigo-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${loadingInquiries ? 'animate-spin' : ''}`} />
                <span>Refresh Ledger</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. WHITEPAPER MODAL */}
      {whitepaperOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0d1322] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
            <button
              onClick={handleCloseWhitepaperModal}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!wpSuccessMessage ? (
              <div>
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mb-4">
                  <Download className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {whitepaperDocType === 'security'
                    ? 'Security & Code Isolation Protocol'
                    : 'Download Architecture Whitepaper'}
                </h3>
                <p className="text-xs text-slate-400 mt-1 mb-5 leading-relaxed">
                  Gain immediate access to our 38-page technical specification covering edge SSR benchmarks, decoupling WooCommerce safely, and Google AI Studio code generation patterns.
                </p>

                <form onSubmit={handleWhitepaperSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">WORK EMAIL *</label>
                    <input
                      type="email"
                      required
                      value={wpEmail}
                      onChange={(e) => setWpEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={wpSubmitting}
                    className="w-full py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {wpSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Generate Technical Briefing</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-slate-500">
                    Dispatched automatically via <code className="font-mono text-indigo-400">POST /api/whitepaper</code>.
                  </p>
                </form>
              </div>
            ) : (
              <div className="py-4 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Technical Briefing Dispatched</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{wpSuccessMessage}</p>
                <div className="pt-2">
                  <button
                    onClick={handleCloseWhitepaperModal}
                    className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. POLICY / TERMS MODAL */}
      {policyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0d1322] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
            <button
              onClick={onClosePolicy}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-white mb-3">
              {policyType === 'privacy'
                ? 'Client Privacy & Data Sovereignty Policy'
                : 'Master Engineering Services Agreement'}
            </h3>
            <div className="text-xs text-slate-300 leading-relaxed space-y-3 max-h-60 overflow-y-auto pr-2">
              {policyType === 'privacy' ? (
                <>
                  <p>
                    <strong>1. Zero Third-Party Telemetry:</strong> PROWEB.AGENCY does not deploy Google Tag Manager, Meta pixels, cross-site cookies, or marketing trackers on client production codebases.
                  </p>
                  <p>
                    <strong>2. Edge Data Confidentiality:</strong> All request payload data handled by our edge proxies is decrypted in ephemeral memory and never logged to persistent disks without explicit client telemetry configuration.
                  </p>
                  <p>
                    <strong>3. Code Privacy:</strong> Repository access granted during architectural review is isolated to dedicated hardware under strict 2FA and revoked upon sprint completion.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. 100% Codebase Ownership:</strong> All proprietary frontend code, microservices, Docker compose manifests, and infrastructure configurations become 100% client intellectual property upon invoice settlement.
                  </p>
                  <p>
                    <strong>2. Production SLA Guarantee:</strong> Retained support contracts include a 99.99% uptime guarantee with direct architect escalation for P0 incidents.
                  </p>
                  <p>
                    <strong>3. Strict Mutual NDA:</strong> All consultations and discovery audits are protected under reciprocal nondisclosure obligations.
                  </p>
                </>
              )}
            </div>
            <div className="pt-5 border-t border-slate-800 mt-4 text-right">
              <button
                onClick={onClosePolicy}
                className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
