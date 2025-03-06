'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useLoading } from '../context/LoadingContext'

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { setIsLoading } = useLoading()

  useEffect(() => {
    
    
    // Set loading to true immediately when component mounts (page loads)
    setIsLoading(true)
    
    const handleStart = () => {
      setIsLoading(true)
    }
    
    const handleStop = () => {
      setIsLoading(false)
    }

    // Add event listeners for navigation
    window.addEventListener('beforeunload', handleStart)
    document.addEventListener('DOMContentLoaded', () => {
      // This ensures we catch the initial page load
      setIsLoading(true)
      
      // Delay turning off loading to ensure content is fully rendered
      setTimeout(handleStop, 1000)
    })
    
    // Use a timeout to ensure the loading overlay appears on initial page load
    const initialLoadTimeout = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // Longer timeout for initial page load

    return () => {
      window.removeEventListener('beforeunload', handleStart)
      clearTimeout(initialLoadTimeout)
    }
  }, [setIsLoading])

  useEffect(() => {
    setIsLoading(true)
    // Add a small delay to show loading state
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timeout)
  }, [pathname, searchParams, setIsLoading])

  return null
}
