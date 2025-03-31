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
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M9MCBK34');`
        }} />
        {/* End Google Tag Manager */}
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
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M9MCBK34"
        height="0" width="0" style={{display:"none",visibility:"hidden"}}></iframe></noscript>
        {/* End Google Tag Manager (noscript) */}
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