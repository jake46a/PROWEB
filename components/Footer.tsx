'use client';

import React from 'react';
import { Terminal, Database, Mail } from 'lucide-react';

interface FooterProps {
  onOpenWhitepaper: (docType: string) => void;
  onOpenInquiries: () => void;
  onOpenStatus: () => void;
  onOpenPolicy: (type: 'privacy' | 'terms') => void;
}

export default function Footer({
  onOpenWhitepaper,
  onOpenInquiries,
  onOpenStatus,
  onOpenPolicy,
}: FooterProps) {
  return (
    <footer className="bg-[#05080f] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Wordmark & Statement */}
          <div className="space-y-4 md:col-span-1">
            <a href="#" className="flex items-center gap-2 text-white">
              <div className="w-7 h-7 rounded bg-gradient-to-tr from-indigo-600 to-emerald-500 flex items-center justify-center text-white">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold tracking-tight font-mono text-base">
                PROWEB<span className="text-indigo-400">.AGENCY</span>
              </span>
            </a>
            <p className="text-xs text-slate-400 leading-relaxed">
              Engineering studio building custom small business web applications and headless WordPress transitions via Google AI Studio.
            </p>
            <div className="text-xs font-mono text-slate-500">
              Google AI Studio Powered · TypeScript First · Edge Native
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-200">Core Services</div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#custom-apps" className="hover:text-white transition-colors">
                  Custom Web App Development
                </a>
              </li>
              <li>
                <a href="#ai-blueprint" className="hover:text-white transition-colors">
                  AI App Blueprint Generator
                </a>
              </li>
              <li>
                <a href="#wordpress-migration" className="hover:text-white transition-colors">
                  WordPress to Headless Next.js
                </a>
              </li>
              <li>
                <a href="#wordpress-migration" className="hover:text-white transition-colors">
                  Decoupled WooCommerce Scaling
                </a>
              </li>
              <li>
                <a href="#benchmarks" className="hover:text-white transition-colors">
                  Performance &amp; Core Web Vitals Audit
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Architecture & Tools */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-200">Engineering Specs</div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#scope-tool" className="hover:text-white transition-colors">
                  Interactive Scope Estimator
                </a>
              </li>
              <li>
                <a href="#benchmarks" className="hover:text-white transition-colors">
                  Small Business Benchmarks
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Technical FAQs &amp; SLA Guide
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenWhitepaper('architecture')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Request Architecture Whitepaper
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenWhitepaper('security')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Security &amp; Code Isolation Protocol
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenInquiries}
                  className="text-indigo-400 hover:text-indigo-300 font-mono transition-colors flex items-center gap-1.5 pt-1 cursor-pointer"
                >
                  <Database className="w-3 h-3" />
                  <span>Backend Inquiries Ledger &rarr;</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Engagement */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-200">Engagement</div>
            <div className="text-xs text-slate-400 leading-relaxed">
              Accepting 3 new small business build engagements this month to maintain senior architect dedication.
            </div>
            <div className="pt-1">
              <a
                href="mailto:contact@proweb.agency"
                className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 hover:text-indigo-300"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>contact@proweb.agency</span>
              </a>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              Direct Architect Response &lt; 4 Hours
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; 2026 PROWEB.AGENCY. All rights reserved. Precision engineering for small businesses.
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-slate-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-slate-400 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={onOpenStatus}
              className="hover:text-emerald-400 text-emerald-400/90 font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>System Status (99.99%)</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
