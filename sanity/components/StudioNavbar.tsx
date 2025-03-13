'use client'

import { useEffect } from 'react'

// This component specifically targets and removes the page header
export function StudioNavbar() {
  useEffect(() => {
    // Function to hide the page header and adjust z-index
    const removePageHeader = () => {
      // Set z-index for the Sanity div
      const sanityDiv = document.getElementById('sanity')
      if (sanityDiv) {
        sanityDiv.style.zIndex = '100'
      }
      
      // Target and hide the page header (not the Sanity navbar)
      const headerSelectors = [
        '.site-header',
        '.main-header', 
        '.page-header',
        'header:not([data-ui])',
        'nav:not([data-ui])',
        '.header-wrapper',
        // Add more selectors as needed
      ]
      
      headerSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector)
        elements.forEach(element => {
          if (element instanceof HTMLElement) {
            element.style.display = 'none'
            console.log(`Hidden header element with selector: ${selector}`)
          }
        })
      })
      
      // Ensure proper spacing for content below fixed elements
      // This addresses the memory about fixed navbar overlapping content on mobile
      const adjustContentSpacing = () => {
        // Get the Sanity navbar height if it exists
        const navbar = document.querySelector('[data-ui="Navbar"]')
        const navbarHeight = navbar instanceof HTMLElement ? navbar.offsetHeight : 0
        
        // Add some extra padding for mobile browsers with search bars at top
        document.documentElement.style.setProperty('--safe-top-padding', `${navbarHeight + 10}px`)
        
        // Apply spacing to relevant containers
        const contentContainers = document.querySelectorAll('.sanity-studio-content, #sanity')
        contentContainers.forEach(container => {
          if (container instanceof HTMLElement) {
            container.style.marginTop = 'var(--safe-top-padding, 10px)'
          }
        })
      }
      
      adjustContentSpacing()
    }
    
    // Apply immediately and with delays to catch dynamically loaded elements
    removePageHeader()
    
    // Set multiple timeouts to ensure we catch elements that load later
    const timeouts = [
      setTimeout(removePageHeader, 100),
      setTimeout(removePageHeader, 500),
      setTimeout(removePageHeader, 1000),
      setTimeout(removePageHeader, 2000)
    ]
    
    // Set up a MutationObserver to watch for DOM changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
          removePageHeader()
        }
      }
    })
    
    // Start observing the document body
    observer.observe(document.body, { childList: true, subtree: true })
    
    // Clean up function
    return () => {
      timeouts.forEach(clearTimeout)
      observer.disconnect()
    }
  }, [])
  
  // This component doesn't render anything visible
  return null
}
