'use client'

import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function EndingPage() {
  const [showMusicNote, setShowMusicNote] = useState(false)

  useEffect(() => {
    setShowMusicNote(true)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => {
          const width = typeof window !== 'undefined' ? window.innerWidth : 1920
          const height = typeof window !== 'undefined' ? window.innerHeight : 1080
          
          return (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * width,
                y: Math.random() * height,
                opacity: 0.3,
              }}
              animate={{
                x: Math.random() * width,
                y: Math.random() * height,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-pink-300 fill-pink-300" />
            </motion.div>
          )
        })}
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => {
          const width = typeof window !== 'undefined' ? window.innerWidth : 1920
          const height = typeof window !== 'undefined' ? window.innerHeight : 1080
          
          return (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * width,
                y: Math.random() * height,
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300" />
            </motion.div>
          )
        })}
      </div>

      {/* Main content */}
      <motion.div
        className="text-center z-10 max-w-4xl mx-auto px-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="mb-6 sm:mb-8"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 text-pink-500 fill-pink-500 mx-auto" />
        </motion.div>

        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-romantic text-pink-600 mb-4 sm:mb-6 text-shadow-lg break-words"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Cảm ơn em vì đã ở bên anh
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-handwriting text-pink-700 mb-6 sm:mb-8 break-words"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Em là điều tuyệt vời nhất trong cuộc đời anh
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-1 sm:gap-2 text-2xl sm:text-3xl md:text-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 15, -15, 0],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-pink-500 fill-pink-500" />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl font-handwriting text-pink-600 mt-8 sm:mt-10 md:mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Yêu em mãi mãi ❤️
        </motion.p>

        {/* Music note animation */}
        {showMusicNote && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-pink-300"
                initial={{
                  x: '50%',
                  y: '50%',
                  scale: 0,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 200}%`,
                  y: `${50 + (Math.random() - 0.5) * 200}%`,
                  scale: [0, 1, 0],
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.3,
                  repeat: Infinity,
                }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
