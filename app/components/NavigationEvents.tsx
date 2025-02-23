'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useLoading } from '../context/LoadingContext'

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { setIsLoading } = useLoading()

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true)
    }
    const handleStop = () => {
      setIsLoading(false)
    }

    window.addEventListener('beforeunload', handleStart)
    window.addEventListener('load', handleStop)

    return () => {
      window.removeEventListener('beforeunload', handleStart)
      window.removeEventListener('load', handleStop)
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
