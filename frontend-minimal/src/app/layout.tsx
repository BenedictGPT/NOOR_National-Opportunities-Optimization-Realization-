import './globals.css';

export const metadata = {
  title: 'NOOR Platform - UAE National Workforce Development',
  description: 'National Opportunities Optimization & Realization Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}

