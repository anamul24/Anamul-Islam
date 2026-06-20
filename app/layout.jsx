import {
  Inter,
  Space_Grotesk,
  Playfair_Display,
  IBM_Plex_Sans_Arabic,
  Great_Vibes,
  Corinthia,
} from 'next/font/google';

import { ThemeProvider } from '@/components/ThemeProvider';
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
  title: 'Anamul Islam',
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
        </ThemeProvider>
      </body>
    </html>
  );
}