import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { LoadingProvider } from './context/LoadingContext'
import LoadingOverlay from './components/LoadingOverlay'
import { NavigationEvents } from './components/NavigationEvents'
import { Suspense } from 'react'
import CookieConsentBanner from './components/CookieConsent';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';

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
        {/* Session Storage Script */}
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
      </head>
      <body className={`${alexandria.variable} ${drukTextWideBold.variable} bg-[#0D1117] text-white min-h-screen`}>
        {/* Optimized Google Tag Manager */}
        <GoogleTagManager gtmId="GTM-M9MCBK34" />
        {/* Optimized Google Analytics */}
        <GoogleAnalytics gaId="G-98JEYEN7YR" />
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