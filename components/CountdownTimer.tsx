'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Heart, Sparkles } from 'lucide-react'

interface CountdownTimerProps {
  targetDate: string // Format: 'YYYY-MM-DD'
  title?: string
}

export default function CountdownTimer({ 
  targetDate, 
  title = 'Đếm ngược đến ngày kỷ niệm tiếp theo' 
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime()
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        setIsExpired(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const timeUnits = [
    { label: 'Ngày', value: timeLeft.days, icon: Calendar },
    { label: 'Giờ', value: timeLeft.hours, icon: Heart },
    { label: 'Phút', value: timeLeft.minutes, icon: Sparkles },
    { label: 'Giây', value: timeLeft.seconds, icon: Heart },
  ]

  if (isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-6"
          >
            <Heart className="w-20 h-20 md:w-24 md:h-24 text-pink-500 fill-pink-500 mx-auto" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-romantic text-pink-600 mb-4 text-shadow-lg">
            🎉 Đã đến ngày kỷ niệm! 🎉
          </h2>
          <p className="text-xl sm:text-2xl font-handwriting text-pink-700">
            Chúc mừng chúng ta! 💖
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="max-w-4xl w-full">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-romantic text-pink-600 mb-4 text-shadow-lg">
            {title}
          </h2>
          <p className="text-lg sm:text-xl font-handwriting text-pink-700">
            Còn lại bao nhiêu thời gian nữa nhỉ? ⏰
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {timeUnits.map((unit, index) => {
            const Icon = unit.icon
            return (
              <motion.div
                key={unit.label}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-rose-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 text-center">
                  <motion.div
                    className="mb-3 flex justify-center"
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  >
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500" />
                  </motion.div>
                  
                  <motion.div
                    className="text-4xl sm:text-5xl md:text-6xl font-romantic text-pink-600 mb-2"
                    key={unit.value}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {unit.value.toString().padStart(2, '0')}
                  </motion.div>
                  
                  <p className="text-sm sm:text-base md:text-lg font-handwriting text-gray-600">
                    {unit.label}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-lg sm:text-xl font-handwriting text-pink-700">
            Mỗi giây trôi qua là một giây gần hơn với em ❤️
          </p>
        </motion.div>
      </div>
    </div>
  )
}
