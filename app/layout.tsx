import type { Metadata } from 'next';
import './globals.css';
import 'katex/dist/katex.min.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export const metadata: Metadata = {
  title: 'PhysicsSim – Simulate. Derive. Understand.',
  description: 'Interactive physics simulations for university students. Simulate first, derive second, understand always.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen">
        <Header />
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
