import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { LoadingProvider } from './context/LoadingContext'
import LoadingOverlay from './components/LoadingOverlay'
import { NavigationEvents } from './components/NavigationEvents'
import { Suspense } from 'react'

const alexandria = localFont({
  src: "./fonts/Alexandria-VariableFont.ttf",
  variable: "--font-alexandria",
  weight: "100 900",
});

const drukTextWideBold = localFont({
  src: "./fonts/druknew.otf",
  variable: "--font-druk-text-wide-bold",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Baltic Slots",
  description: "Labākā kazino salīdzināšanas platforma Latvijā",
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
      <body className={`${alexandria.variable} ${drukTextWideBold.variable} bg-[#0D1117] text-white min-h-screen`}>
        <LoadingProvider>
          <Suspense>
            <NavigationEvents />
          </Suspense>
          <LoadingOverlay />
          <Navbar />
          {children}
          <Footer />
         
        </LoadingProvider>
      </body>
    </html>
  )
}
