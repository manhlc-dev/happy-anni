'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function ClickHeart() {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [clickCount, setClickCount] = useState(0)

  const handleClick = (e: React.MouseEvent) => {
    // Không tạo tim nếu click vào button hoặc interactive element
    const target = e.target as HTMLElement
    if (
      target.tagName === 'BUTTON' ||
      target.closest('button') ||
      target.tagName === 'A' ||
      target.closest('a') ||
      target.closest('[role="button"]') ||
      target.closest('.cursor-pointer')
    ) {
      return
    }

    const newHeart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    }
    setHearts((prev) => [...prev, newHeart])
    setClickCount((prev) => prev + 1)

    // Remove heart after animation
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id))
    }, 2000)

    // Easter egg: 10 clicks
    if (clickCount === 9) {
      // Trigger special animation
      const width = typeof window !== 'undefined' ? window.innerWidth : 1920
      const height = typeof window !== 'undefined' ? window.innerHeight : 1080
      
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          const easterEggHeart = {
            id: Date.now() + i,
            x: Math.random() * width,
            y: Math.random() * height,
          }
          setHearts((prev) => [...prev, easterEggHeart])
          setTimeout(() => {
            setHearts((prev) => prev.filter((h) => h.id !== easterEggHeart.id))
          }, 2000)
        }, i * 50)
      }
      setClickCount(0)
    }
  }

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      onClick={handleClick}
      style={{ pointerEvents: 'auto' }}
    >
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute pointer-events-none"
            style={{
              left: heart.x,
              top: heart.y,
            }}
            initial={{
              scale: 0,
              opacity: 1,
              x: -20,
              y: -20,
            }}
            animate={{
              scale: [0, 1.5, 1],
              opacity: [1, 1, 0],
              y: heart.y - 100,
              x: heart.x + (Math.random() - 0.5) * 50,
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: 2,
              ease: 'easeOut',
            }}
          >
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
