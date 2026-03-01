import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Juho - Software Engineer',
  description:
    'Portfolio of Juho. Software Engineer building tools and applications with modern technologies.',
  openGraph: {
    title: 'Juho - Software Engineer',
    description:
      'Portfolio of Juho. Software Engineer building tools and applications with modern technologies.',
    url: 'https://juho.page',
    siteName: 'juho.page',
    locale: 'en_US',
    type: 'website',
  },
  metadataBase: new URL('https://juho.page'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
