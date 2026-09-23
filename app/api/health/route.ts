import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'operational',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    service: 'PROWEB.AGENCY Next.js Edge Gateway',
    version: '3.0.0',
    framework: 'Next.js 15 (App Router)',
    nodeVersion: process.version,
  });
}
