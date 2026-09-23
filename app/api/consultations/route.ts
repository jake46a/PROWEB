import { NextResponse } from 'next/server';
import { getInquiries } from '@/lib/inquiries';

export async function GET() {
  const inquiries = getInquiries();
  return NextResponse.json({
    count: inquiries.length,
    inquiries,
  });
}
