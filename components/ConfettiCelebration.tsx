'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Heart, Star } from 'lucide-react'

interface ConfettiCelebrationProps {
  trigger: boolean
  onComplete?: () => void
}

export default function ConfettiCelebration({ trigger, onComplete }: ConfettiCelebrationProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (trigger) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
        onComplete?.()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [trigger, onComplete])

  if (!show) return null

  const confettiItems = [
    { icon: Heart, color: 'text-pink-500', count: 30 },
    { icon: Star, color: 'text-yellow-400', count: 20 },
    { icon: Sparkles, color: 'text-purple-400', count: 25 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiItems.map((item, groupIndex) => {
        const Icon = item.icon
        return (
          <div key={groupIndex}>
            {[...Array(item.count)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute ${item.color}`}
                initial={{
                  x: '50%',
                  y: '50%',
                  scale: 0,
                  rotate: 0,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 200}%`,
                  y: `${50 + (Math.random() - 0.5) * 200}%`,
                  scale: [0, 1, 0],
                  rotate: Math.random() * 720,
                }}
                transition={{
                  duration: 2 + Math.random(),
                  delay: Math.random() * 0.5,
                  ease: 'easeOut',
                }}
              >
                <Icon className="w-6 h-6 fill-current" />
              </motion.div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
