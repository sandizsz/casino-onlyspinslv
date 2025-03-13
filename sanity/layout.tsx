"use client"; // This is OK because only admins will see these pages.
import React from "react";
import { useEffect } from "react";

export default function SanityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    
  useEffect(() => {
    // More robust approach to find and hide the Sanity studio header
    const hideHeader = () => {
      // Try multiple selectors that might target the Sanity header
      const headerSelectors = [
        "header",                          // Standard header tag
        ".sanity-navbar",                 // Common Sanity class
        ".navbar",                        // Generic navbar class
        "[data-ui='Navbar']",             // Sanity data attribute
        "[data-ui='ToolMenu']",           // Sanity tool menu
        ".studioHeader",                  // Newer Sanity class
        "[class*='navbar']",              // Any class containing 'navbar'
        "[class*='header']",              // Any class containing 'header'
        "[class*='Header']",              // Any class containing 'Header'
        "nav[role='navigation']",         // Navigation role
        ".sanity-studio-navbar"           // Another possible class
      ];
      
      // Try each selector individually for better targeting
      headerSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          if (element && element instanceof HTMLElement) {
            element.style.display = "none";
            console.log(`Hidden Sanity header element with selector: ${selector}`);
          }
        });
      });
      
      // Also add CSS to ensure headers stay hidden
      const style = document.createElement('style');
      style.textContent = `
        header, .sanity-navbar, .navbar, [data-ui='Navbar'], [data-ui='ToolMenu'],
        .studioHeader, [class*='navbar'], [class*='header'], [class*='Header'],
        nav[role='navigation'], .sanity-studio-navbar {
          display: none !important;
        }
        
        /* Adjust body to account for missing header */
        body {
          padding-top: 0 !important;
        }

        /* Add z-index to the sanity div */
        #sanity {
          z-index: 100 !important;
        }
      `;
      document.head.appendChild(style);
    };
    
    // Try immediately
    hideHeader();
    
    // Try multiple times with increasing delays to catch late-rendered elements
    const timeouts = [
      setTimeout(hideHeader, 100),
      setTimeout(hideHeader, 500),
      setTimeout(hideHeader, 1000),
      setTimeout(hideHeader, 2000)
    ];
    
    // Set up a MutationObserver to watch for dynamically added header elements
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
          hideHeader();
        }
      }
    });
    
    // Start observing the document body for DOM changes
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      // Clean up all timeouts and disconnect observer
      timeouts.forEach(clearTimeout);
      observer.disconnect();
    };
  }, []);

  return <div>{children}</div>;
}
