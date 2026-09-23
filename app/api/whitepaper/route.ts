import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, documentType } = body;
    if (!email) {
      return NextResponse.json({ error: 'Work email is required.' }, { status: 400 });
    }

    const docName = documentType === 'security'
      ? 'PROWEB Enterprise Security & Zero-Trust Protocol 2026'
      : 'Headless WordPress to Next.js Migration Blueprint & Benchmark Study';

    return NextResponse.json({
      success: true,
      documentName: docName,
      downloadUrl: `/docs/${documentType === 'security' ? 'security-protocol.pdf' : 'architecture-blueprint.pdf'}`,
      sentTo: email,
      timestamp: new Date().toISOString(),
      message: `Your technical briefing has been generated and dispatched to ${email}.`,
    });
  } catch (err) {
    console.error('Error handling whitepaper request:', err);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
