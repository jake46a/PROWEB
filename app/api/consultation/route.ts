import { NextResponse } from 'next/server';
import { getInquiries, saveInquiries, type Inquiry } from '@/lib/inquiries';

const ARCHITECT_ROTATION = [
  'Marcus Vance (Principal Cloud Architect)',
  'Elena Rostova (Head of Headless Infrastructure)',
  'Devon Lee (Principal Frontend & Edge Architect)',
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, url, serviceTrack, notes, scopeSummary } = body;

    if (!name || !email) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          message: 'Name and a valid corporate email are required to route discovery.',
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          error: 'Invalid email format',
          message: 'Please provide a valid work email address.',
        },
        { status: 400 }
      );
    }

    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const id = `PRO-INQ-${randomNum}`;
    const assignedArchitect = ARCHITECT_ROTATION[Math.floor(Math.random() * ARCHITECT_ROTATION.length)];

    let priority: Inquiry['priority'] = 'Standard Advisory';
    const notesLower = (notes || '').toLowerCase();
    const trackLower = (serviceTrack || '').toLowerCase();
    if (trackLower.includes('enterprise') || notesLower.includes('soc2') || notesLower.includes('hipaa') || notesLower.includes('10m')) {
      priority = 'Enterprise Tier 1';
    } else if (trackLower.includes('commercial') || trackLower.includes('woocommerce')) {
      priority = 'Commercial Fast-Track';
    } else if (trackLower.includes('small business') || trackLower.includes('ai dispatch') || trackLower.includes('ai studio')) {
      priority = 'Small Business Priority';
    }

    const newInquiry: Inquiry = {
      id,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      url: url ? String(url).trim() : undefined,
      serviceTrack: serviceTrack || 'Custom Web Application Architecture',
      notes: notes ? String(notes).trim() : undefined,
      scopeSummary: scopeSummary ? String(scopeSummary).trim() : undefined,
      assignedArchitect,
      priority,
      status: 'Architect Assigned',
      slaResponseTarget: '< 4 Business Hours',
      createdAt: new Date().toISOString(),
    };

    const currentList = getInquiries();
    currentList.unshift(newInquiry);
    saveInquiries(currentList);

    return NextResponse.json(
      {
        success: true,
        message: 'Architecture discovery inquiry successfully scheduled.',
        inquiry: newInquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error handling consultation submission:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to record inquiry' },
      { status: 500 }
    );
  }
}
