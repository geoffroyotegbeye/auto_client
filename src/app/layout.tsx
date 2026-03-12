import React from 'react';
import type { Metadata, Viewport } from 'next';
import ConditionalLayout from '@/components/ConditionalLayout';
import { ConfigProvider } from '@/contexts/ConfigContext';
import ReviewButton from '@/components/ReviewButton';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Mig Motors - Vente de véhicules neufs au Bénin',
    template: '%s | Mig Motors'
  },
  description: 'Mig Motors, votre concessionnaire automobile de confiance au Bénin. Découvrez notre large sélection de véhicules neufs, services SAV professionnels et financement sur mesure. Livraison rapide à Cotonou, Porto-Novo et partout au Bénin.',
  keywords: ['Mig Motors', 'véhicules neufs Bénin', 'voitures neuves Cotonou', 'concessionnaire automobile Bénin', 'SAV auto Bénin', 'financement voiture neuve', 'livraison véhicule Bénin', 'voitures neuves Porto-Novo'],
  authors: [{ name: 'Mig Motors' }],
  creator: 'Mig Motors',
  publisher: 'Mig Motors',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://migmotors.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Mig Motors - Vente de véhicules neufs au Bénin',
    description: 'Découvrez notre large sélection de véhicules neufs au Bénin. Services SAV professionnels et financement sur mesure.',
    url: 'https://migmotors.com',
    siteName: 'Mig Motors',
    locale: 'fr_BJ',
    type: 'website',
    images: [
      {
        url: '/assets/image/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mig Motors - Concessionnaire de véhicules neufs au Bénin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mig Motors - Vente de véhicules neufs au Bénin',
    description: 'Votre concessionnaire de véhicules neufs de confiance au Bénin',
    images: ['/assets/image/og-image.jpg'],
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
      { url: '/assets/image/app_logo.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/assets/image/app_logo.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <ConfigProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
          <ReviewButton />
        </ConfigProvider>

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fvehiclemar5623back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.17" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" />
      </body>
    </html>
  );
}
