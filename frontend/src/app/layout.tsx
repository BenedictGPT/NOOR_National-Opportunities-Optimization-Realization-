import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NOOR Platform - National Opportunities Optimization & Realization',
  description: 'UAE National Workforce Development Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

