import type {Metadata} from 'next';
import './globals.css'; // Global styles
import LenisProvider from './lenis-provider';

export const metadata: Metadata = {
  title: 'SPH Properties | The Infinite Precision of Living',
  description: 'Top-of-the-line luxury UK real estate agency featuring modern brutalist, minimalist, and heritage properties with interactive virtual tours and AI-powered market data analysis.',
  icons: {
    icon: '/images/newUpdatedFinalLogo.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-[#f5f3ef] text-[#0a0b0d] antialiased selection:bg-[#c5a880] selection:text-white">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
