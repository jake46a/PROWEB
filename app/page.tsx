'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BlueprintGenerator, { BlueprintData } from '@/components/BlueprintGenerator';
import Services from '@/components/Services';
import ScopeEstimator from '@/components/ScopeEstimator';
import Benchmarks from '@/components/Benchmarks';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import Modals from '@/components/Modals';

export default function Home() {
  // Modal states
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [serviceTrack, setServiceTrack] = useState('Small Business App Consultation');
  const [initialNotes, setInitialNotes] = useState('');

  const [statusOpen, setStatusOpen] = useState(false);
  const [inquiriesOpen, setInquiriesOpen] = useState(false);

  const [whitepaperOpen, setWhitepaperOpen] = useState(false);
  const [whitepaperDocType, setWhitepaperDocType] = useState('architecture');

  const [policyOpen, setPolicyOpen] = useState(false);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms'>('privacy');

  // Handlers
  const handleOpenConsultation = (track?: string, notes?: string) => {
    setServiceTrack(track || 'Small Business App Consultation');
    setInitialNotes(notes || '');
    setConsultationOpen(true);
  };

  const handleScheduleBlueprint = (bp: BlueprintData) => {
    const trackTitle = `AI Studio Custom App: ${bp.appName} [${bp.estimatedTimeline || '7-10 Days'} / ${bp.fixedPriceRange || '$2,800'}]`;
    const notesContent = [
      `Target App: ${bp.appName}`,
      `Industry: ${bp.businessType || 'Small Business'}`,
      `Key Bottleneck: ${bp.painPoint || 'Manual workflow and slow website'}`,
      `Estimated Timeline: ${bp.estimatedTimeline || '8-10 Days'}`,
      `Expected Fixed Investment: ${bp.fixedPriceRange || '$2,800 - $3,600'}`,
      `Google AI Studio Capabilities: ${
        bp.googleAiStudioFeatures ? bp.googleAiStudioFeatures.slice(0, 2).join('; ') : 'Gemini 3.8 Flash Vision Quoting'
      }`,
    ].join('\n');

    handleOpenConsultation(trackTitle, notesContent);
  };

  const handleLockInScope = (track: string, summary: string) => {
    handleOpenConsultation(track, summary);
  };

  const handleOpenWhitepaper = (docType: string) => {
    setWhitepaperDocType(docType);
    setWhitepaperOpen(true);
  };

  const handleOpenPolicy = (type: 'privacy' | 'terms') => {
    setPolicyType(type);
    setPolicyOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <Header
        onOpenConsultation={handleOpenConsultation}
        onOpenStatus={() => setStatusOpen(true)}
        onOpenInquiries={() => setInquiriesOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow pt-20">
        <Hero />
        <BlueprintGenerator onScheduleBlueprint={handleScheduleBlueprint} />
        <Services onOpenConsultation={handleOpenConsultation} />
        <ScopeEstimator onLockInScope={handleLockInScope} />
        <Benchmarks onOpenConsultation={handleOpenConsultation} />
        <Faq onOpenConsultation={handleOpenConsultation} />
      </main>

      {/* Footer */}
      <Footer
        onOpenWhitepaper={handleOpenWhitepaper}
        onOpenInquiries={() => setInquiriesOpen(true)}
        onOpenStatus={() => setStatusOpen(true)}
        onOpenPolicy={handleOpenPolicy}
      />

      {/* Modals */}
      <Modals
        consultationOpen={consultationOpen}
        onCloseConsultation={() => setConsultationOpen(false)}
        serviceTrack={serviceTrack}
        initialNotes={initialNotes}
        statusOpen={statusOpen}
        onCloseStatus={() => setStatusOpen(false)}
        inquiriesOpen={inquiriesOpen}
        onCloseInquiries={() => setInquiriesOpen(false)}
        onOpenConsultationWithTrack={(track) => handleOpenConsultation(track)}
        whitepaperOpen={whitepaperOpen}
        whitepaperDocType={whitepaperDocType}
        onCloseWhitepaper={() => setWhitepaperOpen(false)}
        policyOpen={policyOpen}
        policyType={policyType}
        onClosePolicy={() => setPolicyOpen(false)}
      />
    </div>
  );
}
