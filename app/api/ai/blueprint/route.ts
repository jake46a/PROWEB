import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

let genAI: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    genAI = new GoogleGenAI({ apiKey });
  }
} catch (e) {
  console.warn('[PROWEB.AGENCY] Could not initialize GoogleGenAI client:', e);
}

function generateFallbackBlueprint(bType: string, pPoint: string, outcome: string) {
  const lower = bType.toLowerCase() + ' ' + pPoint.toLowerCase();
  
  if (lower.includes('hvac') || lower.includes('plumb') || lower.includes('electric') || lower.includes('contract') || lower.includes('roof')) {
    return {
      appName: 'ServicePulse AI Dispatch & Quoting Web App',
      tagline: 'Instant customer photo/text quoting and automated technician dispatch built in 8 days.',
      summary: `Designed specifically for ${bType}, this custom web app replaces manual phone tag with a self-service customer portal that analyzes repair requests and estimates work orders instantly.`,
      coreModules: [
        { name: 'AI Photo & Description Estimator', description: 'Homeowners take a picture of their furnace or pipe; Gemini drafts a preliminary parts and labor estimate.' },
        { name: 'Real-Time Schedule & Dispatch Board', description: 'Syncs with Google Calendar to route emergency or scheduled calls directly to available service vans.' },
        { name: 'Automated SMS Confirmation & Invoicing', description: 'Sends one-click Stripe payment links and real-time technician arrival tracking to customer phones.' },
        { name: 'Customer Service History Vault', description: 'Zero-paperwork access to prior service tickets, warranties, and equipment serial numbers.' }
      ],
      googleAiStudioFeatures: [
        'Gemini 3.8 Flash visual analysis to classify HVAC/plumbing equipment and error codes',
        'Natural language job note transcription to generate polished invoice summaries',
        'Intelligent dispatch routing based on technician skill level and GPS radius'
      ],
      estimatedTimeline: '8 – 10 Business Days',
      fixedPriceRange: '$2,800 – $3,600',
      weeklyHoursSaved: '18 hours/week',
      conversionGain: '+42% quote acceptance',
      architectureStack: 'Next.js 15 + Google AI Studio + Twilio SMS + Stripe Billing'
    };
  }

  if (lower.includes('dental') || lower.includes('clinic') || lower.includes('health') || lower.includes('doctor') || lower.includes('therapy')) {
    return {
      appName: 'CareStream Intake & Patient Self-Service Portal',
      tagline: 'Sub-second digital intake forms and intelligent appointment scheduling with zero plugin bloat.',
      summary: `Modernizes ${bType} by replacing slow paper clipboards and fragile WordPress plugins with a HIPAA-ready decoupled patient intake web app.`,
      coreModules: [
        { name: 'Smart Digital Intake & Insurance OCR', description: 'Patients snap a photo of their insurance card; AI extracts policy and copay data into digital charts.' },
        { name: 'Frictionless Online Booking', description: 'Direct self-service booking with automated pre-appointment clinical screening forms.' },
        { name: 'Private Patient Portal', description: 'Clean, mobile-first interface for treatment estimates, post-op instructions, and secure messaging.' },
        { name: 'Automated Recall & Follow-up Workflow', description: 'Automates 6-month hygiene reminders and post-treatment follow-up check-ins.' }
      ],
      googleAiStudioFeatures: [
        'Gemini OCR document parsing for insurance cards and medical history forms',
        'AI-assisted symptom checker to route patients to correct treatment appointment blocks',
        'Automated FAQ assistant handling 80% of routine patient telephone inquiries'
      ],
      estimatedTimeline: '7 – 9 Business Days',
      fixedPriceRange: '$2,400 – $3,200',
      weeklyHoursSaved: '14 hours/week',
      conversionGain: '+50% digital intake completion',
      architectureStack: 'React 19 / Next.js 15 + Google AI Studio + Supabase Private DB'
    };
  }

  if (lower.includes('law') || lower.includes('legal') || lower.includes('account') || lower.includes('tax') || lower.includes('consult')) {
    return {
      appName: 'CaseVault Client Portal & Document Intelligence',
      tagline: 'Secure client onboarding, automated document intake, and case milestone tracking.',
      summary: `Tailored for ${bType}, this custom application eliminates email chaos by giving clients a branded, encrypted portal to upload documents and track progress 24/7.`,
      coreModules: [
        { name: 'Client Onboarding & Conflict Check Flow', description: 'Streamlined intake questionnaire that qualifies leads and flags potential conflicts instantly.' },
        { name: 'Automated Document Classification & Indexing', description: 'AI categorizes uploaded tax forms, bank statements, or court filings and flags missing items.' },
        { name: 'Milestone Progress Tracker', description: 'Transparent timeline showing clients their case or filing status without calling your office.' },
        { name: 'Integrated Retainer & Invoice Checkout', description: 'Built-in payment processor for retainer replenishment and flat-fee billing.' }
      ],
      googleAiStudioFeatures: [
        'Gemini document summarization to extract dates, figures, and key clauses automatically',
        'Automated document completeness audit flagging missing signatures or pages',
        'Client inquiry triage prioritizing urgent court deadlines over standard inquiries'
      ],
      estimatedTimeline: '8 – 11 Business Days',
      fixedPriceRange: '$2,900 – $4,200',
      weeklyHoursSaved: '16 hours/week',
      conversionGain: '+30% retained client onboardings',
      architectureStack: 'Next.js 15 + Google AI Studio + Cloudflare Edge + Stripe'
    };
  }

  return {
    appName: 'GrowthCore Small Business Web App',
    tagline: 'Custom high-performance web app engineered to automate lead capture and streamline operations.',
    summary: `Tailored for ${bType} addressing "${pPoint}". Replaces clunky WordPress plugins with a custom, sub-second web app built using Google AI Studio.`,
    coreModules: [
      { name: 'Smart Customer Intake & Quoting Engine', description: 'Guides prospective clients through a step-by-step interactive quote or booking workflow.' },
      { name: 'Business Owner Operations Dashboard', description: 'Unified hub to view leads, manage orders/jobs, and monitor daily revenue metrics.' },
      { name: 'Automated Customer Notifications', description: 'Instant email/SMS triggers for status updates, review requests, and reminders.' },
      { name: 'Modern Fast-Checkout & Payments', description: 'Frictionless Stripe integration with zero ongoing platform subscription fees.' }
    ],
    googleAiStudioFeatures: [
      'Gemini 3.8 Flash natural language processing to qualify incoming customer inquiries',
      'Smart automated drafting of customized quotes and service proposals',
      'Real-time customer conversational assistant trained on your specific business offerings'
    ],
    estimatedTimeline: '7 – 10 Business Days',
    fixedPriceRange: '$2,200 – $3,400',
    weeklyHoursSaved: '15 hours/week',
    conversionGain: '+38% lead conversion',
    architectureStack: 'React 19 / Next.js 15 + Google AI Studio + Edge Anycast CDN'
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { businessType, painPoint, targetOutcome } = body;

    const bType = (businessType || 'Local Service Business').trim();
    const pPoint = (painPoint || 'Manual phone inquiries and slow WordPress website').trim();
    const outcome = (targetOutcome || 'Automate client bookings and boost conversions').trim();

    if (genAI) {
      try {
        const prompt = `You are a Principal Software Architect at PROWEB.AGENCY specializing in custom web applications for small and medium businesses (SMBs) developed using Google AI Studio.
Generate an actionable, high-converting, pragmatic custom web application technical blueprint for this small business:
- Business Type: "${bType}"
- Primary Bottleneck / Pain Point: "${pPoint}"
- Target Outcome: "${outcome}"

Respond with valid JSON matching this schema:
{
  "appName": "Short, catchy name for their custom app",
  "tagline": "Punchy one-sentence value proposition",
  "summary": "2 sentences explaining how this application eliminates their bottleneck and saves money",
  "coreModules": [
    { "name": "Module Name", "description": "What it does and how it saves time or generates revenue" },
    { "name": "Module Name", "description": "What it does and how it saves time or generates revenue" },
    { "name": "Module Name", "description": "What it does and how it saves time or generates revenue" },
    { "name": "Module Name", "description": "What it does and how it saves time or generates revenue" }
  ],
  "googleAiStudioFeatures": [
    "Specific Google AI Studio / Gemini capability 1 integrated into the app",
    "Specific Google AI Studio / Gemini capability 2 integrated into the app",
    "Specific Google AI Studio / Gemini capability 3 integrated into the app"
  ],
  "estimatedTimeline": "e.g. 7 – 10 Business Days",
  "fixedPriceRange": "e.g. $2,400 – $3,600",
  "weeklyHoursSaved": "e.g. 15–20 hours/week",
  "conversionGain": "e.g. +35% booking rate",
  "architectureStack": "React 19 / Next.js 15 + Google AI Studio Gemini API + Cloudflare Edge + Stripe"
}`;

        const aiResponse = await genAI.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.6,
          },
        });

        const text = aiResponse.text;
        if (text) {
          const parsed = JSON.parse(text);
          return NextResponse.json({
            success: true,
            source: 'gemini-3.8-flash (Google AI Studio Live)',
            blueprint: parsed,
          });
        }
      } catch (aiErr) {
        console.warn('[PROWEB.AGENCY Next.js API] Gemini generation fallback:', aiErr);
      }
    }

    const fallbackBlueprint = generateFallbackBlueprint(bType, pPoint, outcome);
    return NextResponse.json({
      success: true,
      source: 'Google AI Studio Engine (Architect Template)',
      blueprint: fallbackBlueprint,
    });
  } catch (error) {
    console.error('Error generating AI blueprint:', error);
    return NextResponse.json({ error: 'Failed to generate blueprint' }, { status: 500 });
  }
}
