'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function FloatingHearts() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
      
      const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight })
      }
      
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300 opacity-20"
          initial={{
            x: Math.random() * dimensions.width,
            y: dimensions.height + 100,
            scale: Math.random() * 0.5 + 0.3,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: -100,
            x: Math.random() * dimensions.width,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: Math.random() * 5 + 8,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'linear',
          }}
        >
          <Heart className="w-6 h-6 fill-pink-300" />
        </motion.div>
      ))}
    </div>
  )
}
