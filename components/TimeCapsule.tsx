'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lock, Unlock, Calendar, Heart } from 'lucide-react'

interface TimeCapsuleProps {
  targetDate: string // Format: 'YYYY-MM-DD'
  message: string
}

export default function TimeCapsule({ targetDate, message }: TimeCapsuleProps) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const checkTime = () => {
      const target = new Date(targetDate).getTime()
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        setIsUnlocked(true)
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      })
    }

    checkTime()
    const timer = setInterval(checkTime, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="max-w-2xl w-full text-center">
        {!isUnlocked ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="mb-8"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Lock className="w-20 h-20 md:w-24 md:h-24 text-pink-500 mx-auto" />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-romantic text-pink-600 mb-6 text-shadow-lg">
              Time Capsule ⏳
            </h2>

            <p className="text-lg sm:text-xl font-handwriting text-pink-700 mb-8">
              Tin nhắn này sẽ mở sau:
            </p>

            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Ngày', value: timeLeft.days },
                { label: 'Giờ', value: timeLeft.hours },
                { label: 'Phút', value: timeLeft.minutes },
                { label: 'Giây', value: timeLeft.seconds },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-romantic text-pink-600 mb-2">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm font-handwriting text-gray-600">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-base font-handwriting text-pink-600">
              Hãy đợi đến ngày đặc biệt đó nhé! 💕
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
            <motion.div
              className="mb-6"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Unlock className="w-16 h-16 text-pink-500 mx-auto" />
            </motion.div>

            <div className="flex items-center justify-center gap-2 mb-6">
              <Calendar className="w-6 h-6 text-pink-500" />
              <h2 className="text-3xl md:text-4xl font-romantic text-pink-600">
                Đã đến lúc mở Time Capsule! 🎉
              </h2>
            </div>

            <motion.div
              className="font-handwriting text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-line mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {message}
            </motion.div>

            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-12 h-12 text-pink-500 fill-pink-500 mx-auto" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
