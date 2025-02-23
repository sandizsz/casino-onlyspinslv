'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useLoading } from '../context/LoadingContext'

export default function LoadingOverlay() {
  const { isLoading } = useLoading()

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0D0D0D]/95 backdrop-blur-sm z-[999999] flex items-center justify-center"
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
              className="relative w-32 h-32"
            >
              <Image
                src="/images/loco-bonus.png"
                alt="GambleStrike Logo"
                fill
                className="object-contain"
              />
            </motion.div>
            
            <div className="flex gap-3">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 0
                }}
                className="w-3 h-3 bg-[#C1FF72] rounded-full"
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 0.2
                }}
                className="w-3 h-3 bg-[#C1FF72] rounded-full"
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 0.4
                }}
                className="w-3 h-3 bg-[#C1FF72] rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
