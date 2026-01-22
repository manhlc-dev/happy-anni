'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, Star } from 'lucide-react'

export default function LoveMeter() {
  const [percentage, setPercentage] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const messages = [
    { min: 0, max: 30, text: 'Còn nhiều điều để khám phá! 💕', emoji: '🌱' },
    { min: 31, max: 50, text: 'Tình yêu đang nảy nở! 🌸', emoji: '💐' },
    { min: 51, max: 70, text: 'Tình yêu đang lớn dần! 🌺', emoji: '🌹' },
    { min: 71, max: 85, text: 'Tình yêu rất sâu đậm! 💖', emoji: '🌷' },
    { min: 86, max: 95, text: 'Tình yêu gần như hoàn hảo! 💝', emoji: '🌻' },
    { min: 96, max: 100, text: 'Tình yêu hoàn hảo 100%! 💯', emoji: '💗' },
  ]

  const getMessage = (percent: number) => {
    return messages.find(m => percent >= m.min && percent <= m.max) || messages[messages.length - 1]
  }

  const calculateLove = () => {
    setIsCalculating(true)
    setShowResult(false)
    
    // Animation tính toán
    let currentPercent = 0
    const interval = setInterval(() => {
      currentPercent += Math.random() * 15
      if (currentPercent >= 100) {
        currentPercent = 100
        clearInterval(interval)
        setIsCalculating(false)
        setShowResult(true)
      }
      setPercentage(Math.min(currentPercent, 100))
    }, 100)

    // Sau 2 giây, set kết quả cuối cùng (luôn là 100% vì tình yêu là hoàn hảo!)
    setTimeout(() => {
      clearInterval(interval)
      setPercentage(100)
      setIsCalculating(false)
      setShowResult(true)
    }, 2000)
  }

  const message = getMessage(percentage)

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-romantic text-pink-600 mb-4 text-shadow-lg">
            Máy đo tình yêu 💕
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl font-handwriting text-pink-700">
            Đo độ tương thích của chúng ta
          </p>
        </motion.div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 to-rose-100/30" />
          
          <div className="relative z-10">
            {/* Love meter circle */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto mb-8">
              <svg className="transform -rotate-90 w-full h-full">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-pink-200"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: percentage / 100 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="100%" stopColor="#fb7185" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-center"
                  animate={{ scale: showResult ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="text-5xl sm:text-6xl md:text-7xl font-romantic text-pink-600 mb-2"
                    key={Math.floor(percentage)}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {Math.floor(percentage)}%
                  </motion.div>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500 fill-pink-500 mx-auto" />
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Message */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-8"
                >
                  <div className="text-6xl mb-4">{message.emoji}</div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-handwriting text-pink-700">
                    {message.text}
                  </p>
                  <p className="text-lg sm:text-xl font-handwriting text-gray-600 mt-4">
                    Chúng ta là một cặp đôi hoàn hảo! 💖
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Button */}
            <motion.button
              onClick={calculateLove}
              disabled={isCalculating}
              className="px-8 py-4 bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xl font-handwriting rounded-full shadow-lg hover:shadow-xl transition-all duration-300 glow hover:glow-strong disabled:opacity-50 disabled:cursor-not-allowed relative z-30"
              whileHover={{ scale: isCalculating ? 1 : 1.05 }}
              whileTap={{ scale: isCalculating ? 1 : 0.95 }}
            >
              {isCalculating ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  Đang tính toán...
                </span>
              ) : showResult ? (
                'Đo lại 💕'
              ) : (
                'Bắt đầu đo tình yêu 💖'
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
