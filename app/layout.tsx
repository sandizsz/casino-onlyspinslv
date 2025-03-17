import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { LoadingProvider } from './context/LoadingContext'
import LoadingOverlay from './components/LoadingOverlay'
import { NavigationEvents } from './components/NavigationEvents'
import { Suspense } from 'react'
import Script from 'next/script';
import CookieConsentBanner from './components/CookieConsent';

const alexandria = localFont({
  src: "./fonts/SofiaProSemiBold.otf",
  variable: "--font-alexandria",
  weight: "700",
});

const drukTextWideBold = localFont({
  src: "./fonts/DrukWideMedium.ttf",
  variable: "--font-druk-text-wide-bold",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Baltic Slots - ekskluzīvi kazino",
  description: "Izbaudi svaigākos un ekskluzīvākos kazino piedāvājumus Latvijā",
  icons: {
    icon: '/images/balticslots2.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Set a flag in sessionStorage to detect page refresh
            if (!sessionStorage.getItem('app_loaded')) {
              sessionStorage.setItem('is_refreshing', 'true');
            }
            window.onload = function() {
              sessionStorage.setItem('app_loaded', 'true');
              setTimeout(function() {
                sessionStorage.removeItem('is_refreshing');
              }, 2000);
            };
          `,
        }} />
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-98JEYEN7YR"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-98JEYEN7YR');
            `,
          }}
        />
      </head>
      <body className={`${alexandria.variable} ${drukTextWideBold.variable} bg-[#0D1117] text-white min-h-screen`}>
        <LoadingProvider>
          <Suspense>
            <NavigationEvents />
          </Suspense>
          <LoadingOverlay />
          <Navbar />
          {children}
          <Footer />
          <CookieConsentBanner />
        </LoadingProvider>
      </body>
    </html>
  )
}