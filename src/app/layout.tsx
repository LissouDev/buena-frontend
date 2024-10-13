import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Buena Form App',
  description: 'Form app for Buena',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
