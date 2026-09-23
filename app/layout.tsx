import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PROWEB.AGENCY — Custom Web Apps & WordPress Modernization for Small Businesses',
  description: 'Custom web application engineering and headless WordPress modernization for small businesses, powered by Google AI Studio.',
  openGraph: {
    title: 'PROWEB.AGENCY — Custom Web Apps & WordPress Modernization for Small Businesses',
    description: 'Custom web application engineering and headless WordPress modernization for small businesses, powered by Google AI Studio.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PROWEB.AGENCY — Custom Web Apps & WordPress Modernization for Small Businesses',
    description: 'Custom web application engineering and headless WordPress modernization for small businesses, powered by Google AI Studio.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#070b14] text-slate-200 antialiased selection:bg-indigo-600 selection:text-white min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
