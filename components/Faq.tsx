'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'custom' | 'migration' | 'commercial';
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'custom',
    question: 'How do you build custom web apps so quickly and affordably with Google AI Studio?',
    answer:
      'We utilize Google AI Studio (specifically Gemini 3.8 Flash) directly in our engineering and code-generation pipelines. This accelerates boilerplate architecture, database schema provisioning, and frontend-to-backend orchestration by 5x. Instead of billing 200 hours of redundant scaffolding, our senior engineers focus exclusively on your business logic, security rules, and third-party integrations (Stripe, Twilio, Google Calendar).',
  },
  {
    id: 'faq-2',
    category: 'custom',
    question: 'Do we truly own 100% of the code, or are there hidden monthly SaaS fees?',
    answer:
      'You own 100% of the intellectual property, code repository, and database from day one. Unlike SaaS platforms like Salesforce, ServiceTitan, or Jobber that charge $150–$350 per employee per month forever, our web apps have zero monthly user seat licenses. You only pay minimal raw infrastructure costs (typically $0 to $15/month on Vercel or Cloudflare Edge).',
  },
  {
    id: 'faq-3',
    category: 'migration',
    question: 'Will our team still be able to edit our website in the WordPress dashboard?',
    answer:
      'Yes, 100%. We configure WordPress strictly as a "Headless CMS". Your marketing or office staff logs into the same WordPress dashboard they already know to publish blog posts, update team bios, or change prices. The moment they hit "Publish", our Next.js frontend rebuilds that page on the edge in seconds.',
  },
  {
    id: 'faq-4',
    category: 'migration',
    question: 'Will migrating away from our slow WordPress theme hurt our Google SEO or local map rankings?',
    answer:
      'No—it does the exact opposite. We guarantee 100% SEO parity by carrying over your exact URL paths, meta tags, schema markup, and sitemaps. Furthermore, because Google uses Core Web Vitals and mobile page speed as direct ranking factors, replacing a 5-second WordPress site with a sub-second Next.js web app regularly produces immediate organic ranking gains.',
  },
  {
    id: 'faq-5',
    category: 'commercial',
    question: 'What happens after launch? Do you provide warranties and ongoing support?',
    answer:
      'Every project includes an unconditional 30-day post-launch bug warranty and dedicated Slack/phone support with your lead architect. After the warranty period, we offer optional lightweight monthly maintenance SLAs covering security updates, dependency upgrades, and feature expansions.',
  },
  {
    id: 'faq-6',
    category: 'custom',
    question: 'Can custom web apps connect to our QuickBooks, Stripe, Square, or Google Calendar?',
    answer:
      'Yes, absolutely. We regularly connect custom web applications to QuickBooks Online, Stripe, Square, Twilio SMS, Google Calendar, and industry-specific tools. When a client books an appointment or pays an invoice in your custom app, your accounting, calendar, and text messages sync automatically in real time with zero manual double-entry.',
  },
];

interface FaqProps {
  onOpenConsultation: (track: string) => void;
}

export default function Faq({ onOpenConsultation }: FaqProps) {
  const [filter, setFilter] = useState<'all' | 'custom' | 'migration' | 'commercial'>('all');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const filteredFaqs = FAQS.filter((f) => filter === 'all' || f.category === filter);

  return (
    <section id="faq" className="py-20 md:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-indigo-400 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>TRANSPARENT SMALL BUSINESS ADVISORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Clear, honest answers about Google AI Studio development, code ownership, WordPress modernization, and timelines.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {(['all', 'custom', 'migration', 'commercial'] as const).map((cat) => {
            const labels = {
              all: 'All FAQs',
              custom: 'Custom AI Studio Apps',
              migration: 'WordPress Modernization',
              commercial: 'Pricing & Code Ownership',
            };
            const isSelected = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm border border-indigo-500'
                    : 'bg-slate-900/70 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {labels[cat]}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="rounded-xl bg-[#0d1322] border border-slate-800 transition-all duration-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleOpen(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group focus:outline-none cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {faq.question}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700/60 flex items-center justify-center text-slate-400 group-hover:text-white shrink-0 transition-transform">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/40">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Prompt Card */}
        <div className="mt-12 rounded-xl bg-[#0d1322] border border-slate-800 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-white">Have a specific operational workflow or software constraint?</h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Consult directly with a principal engineer. We provide upfront viability evaluations without pushy sales pitching.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenConsultation('Technical FAQ Advisory Inquiry')}
            className="shrink-0 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask an Architect</span>
          </button>
        </div>
      </div>
    </section>
  );
}
