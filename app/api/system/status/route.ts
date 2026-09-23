import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    systemHealth: '100% Operational',
    globalAvailabilitySla: '99.994%',
    activeEdgeClusters: [
      { region: 'US East (N. Virginia)', status: 'Operational', latencyMs: 19, nodes: 12 },
      { region: 'US West (Oregon)', status: 'Operational', latencyMs: 16, nodes: 10 },
      { region: 'EU Central (Frankfurt)', status: 'Operational', latencyMs: 32, nodes: 14 },
      { region: 'AP East (Tokyo)', status: 'Operational', latencyMs: 58, nodes: 8 },
      { region: 'AP Southeast (Singapore)', status: 'Operational', latencyMs: 54, nodes: 8 },
    ],
    currentMetrics: {
      avgTtfbGlobal: '48ms',
      p99Latency: '82ms',
      cacheHitRatio: '98.7%',
      http3Negotiation: 'Enabled (BBRv3 Congestion Control)',
    },
    lastUpdated: new Date().toISOString(),
  });
}
