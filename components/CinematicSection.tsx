'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface CinematicSectionProps {
  children: ReactNode
  chapter: string
  chapterNumber: number
  isActive: boolean
}

export default function CinematicSection({ 
  children, 
  chapter, 
  chapterNumber,
  isActive 
}: CinematicSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // Cinematic effects
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [10, 0, 0, 10])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Chapter title */}
      <motion.div
        className="absolute top-20 left-0 right-0 z-10 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-md rounded-full">
          <span className="text-sm text-pink-600 font-handwriting">
            Chương {chapterNumber}
          </span>
          <h2 className="text-2xl md:text-3xl font-romantic text-pink-700">
            {chapter}
          </h2>
        </div>
      </motion.div>

      {/* Content with cinematic effects */}
      <motion.div
        style={{
          opacity,
          scale,
          filter: `blur(${blur}px)`,
          y,
        }}
        className="w-full relative z-0"
      >
        {children}
      </motion.div>

      {/* Depth effect - background blur */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0, 0.3]),
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/50 to-rose-200/50 backdrop-blur-2xl" />
      </motion.div>
    </section>
  )
}
