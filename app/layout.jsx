import {
  Inter,
  Space_Grotesk,
  Playfair_Display,
  IBM_Plex_Sans_Arabic,
  Great_Vibes,
  Corinthia,
} from 'next/font/google';

import { ThemeProvider } from '@/components/ThemeProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700', '900'],
});

const corinthia = Corinthia({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-signature',
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-arabic',
});

export const metadata = {
  title: 'Anamul Islam — Network Engineer & MERN Stack Developer',
  description:
    'Network Engineer with CCNA training, MikroTik expertise, and hands-on Cisco Packet Tracer labs. Also a MERN Stack Developer building modern web applications.',
  metadataBase: new URL('https://anamul-islam.vercel.app'),
  alternates: {
    canonical: 'https://anamul-islam.vercel.app',
  },
  openGraph: {
    type: 'website',
    url: 'https://anamul-islam.vercel.app',
    title: 'Anamul Islam — Network Engineer & MERN Stack Developer',
    description:
      'Network Engineer with CCNA training, MikroTik expertise, and hands-on Cisco Packet Tracer labs. Also builds modern full-stack web applications.',
    siteName: 'Anamul Islam Portfolio',
    images: [
      {
        url: '/image/anamul islam.png',
        width: 1200,
        height: 630,
        alt: 'Anamul Islam — Network Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anamul Islam — Network Engineer & MERN Stack Developer',
    description:
      'Network Engineer with CCNA training, MikroTik expertise, and hands-on Cisco labs. Also a MERN Stack Developer.',
    images: ['/image/anamul islam.png'],
    creator: '@anamul_islam1',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/anam.png', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${playfairDisplay.variable} ${corinthia.variable} ${ibmPlexSansArabic.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="bg-black text-white font-sans antialiased overflow-x-hidden"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          storageKey="anam-portfolio-theme"
        >
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}