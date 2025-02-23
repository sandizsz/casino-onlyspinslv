'use client'

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export default function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0,
  direction = 'up' 
}: AnimatedSectionProps) {
  
  const directionVariants = {
    up: { initial: { y: 50 }, animate: { y: 0 } },
    down: { initial: { y: -50 }, animate: { y: 0 } },
    left: { initial: { x: -50 }, animate: { x: 0 } },
    right: { initial: { x: 50 }, animate: { x: 0 } },
  };

  const selectedVariant = directionVariants[direction];

  return (
    <motion.section 
      initial={{ 
        opacity: 0,
        ...selectedVariant.initial
      }}
      whileInView={{ 
        opacity: 1,
        ...selectedVariant.animate
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`${className} relative`}
    >
      {children}
    </motion.section>
  )
}