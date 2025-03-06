'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useLoading } from '../context/LoadingContext'
import { useState, useEffect } from 'react'

export default function LoadingOverlay() {
  const { isLoading } = useLoading()
  
  // Force loading state on initial render
  const [initialLoad, setInitialLoad] = useState(true)
  
  useEffect(() => {
    // After component mounts, check if we're refreshing
    const isRefreshing = typeof window !== 'undefined' && window.sessionStorage.getItem('is_refreshing') === 'true'
    
    // If not a refresh and not already loading, set initial load to false
    if (!isRefreshing && !isLoading) {
      const timer = setTimeout(() => setInitialLoad(false), 1000)
      return () => clearTimeout(timer)
    }
    
    return () => {}
  }, [isLoading])

  return (
    <AnimatePresence>
      {(isLoading || initialLoad) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#1D053F]/95 backdrop-blur-md z-[999999] flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
              }}
              transition={{ 
                duration: 0.3,
              }}
              className="relative w-32 h-32 drop-shadow-[0_0_15px_rgba(129,38,255,0.5)]"
            >
              <Image
                src="/images/BalticSlots.png"
                alt="Baltic Slots logo"
                fill
                className="object-contain filter brightness-110"
              />
            </motion.div>
            
            <div className="flex justify-center mt-4">
              <div className="relative">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      rotate: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      },
                      scale: {
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.2
                      },
                      opacity: {
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.2
                      }
                    }}
                    className={`absolute top-0 left-0 w-${8 + index * 2} h-${8 + index * 2} -ml-${4 + index} -mt-${4 + index}`}
                    style={{
                      width: `${20 + index * 8}px`,
                      height: `${20 + index * 8}px`,
                      marginLeft: `-${10 + index * 4}px`,
                      marginTop: `-${10 + index * 4}px`,
                      filter: `drop-shadow(0 0 ${5 + index * 2}px rgba(129,38,255,0.${7 - index * 2}))`
                    }}
                  >
                    <Image
                      src="/images/star.svg"
                      alt="Star"
                      width={20 + index * 8}
                      height={20 + index * 8}
                      className={`w-full h-full ${index === 0 ? 'opacity-90' : index === 1 ? 'opacity-70' : 'opacity-50'}`}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
