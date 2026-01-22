'use client'

import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'

interface LandingPageProps {
  onNext: () => void
}

export default function LandingPage({ onNext }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const startX = typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1920
          const startY = typeof window !== 'undefined' ? window.innerHeight + 100 : 1080 + 100
          const endX = typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1920
          
          return (
            <motion.div
              key={i}
              className="absolute text-pink-300 opacity-30"
              initial={{
                x: startX,
                y: startY,
                scale: Math.random() * 0.5 + 0.3,
              }}
              animate={{
                y: -100,
                x: endX,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: Math.random() * 3 + 5,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <Heart className="w-6 h-6 fill-pink-300" />
            </motion.div>
          )
        })}
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => {
          const x = typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1920
          const y = typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1080
          
          return (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x,
                y,
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
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </motion.div>
          )
        })}
      </div>

      {/* Main content */}
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-romantic text-pink-600 mb-4 md:mb-6 text-shadow-lg px-2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
        >
          Happy Anniversary
        </motion.h1>
        
        <motion.div
          className="flex items-center justify-center gap-2 sm:gap-4 mb-6 md:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-pink-500 fill-pink-500" />
          </motion.div>
          <motion.p
            className="text-xl sm:text-2xl md:text-4xl font-handwriting text-pink-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            My Love
          </motion.p>
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          >
            <Heart className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-pink-500 fill-pink-500" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            onClick={onNext}
            className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4 bg-gradient-to-r from-pink-400 to-rose-400 text-white text-base sm:text-lg md:text-xl font-handwriting rounded-full shadow-lg hover:shadow-xl transition-all duration-300 glow hover:glow-strong relative overflow-hidden group mx-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2 flex-wrap justify-center">
              <span className="whitespace-nowrap">Bắt đầu hành trình</span>
              <span className="whitespace-nowrap">yêu thương</span>
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white flex-shrink-0" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-pink-400 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-pink-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  )
}
