'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Heart, RefreshCw } from 'lucide-react'

const quotes = [
  {
    text: 'Tình yêu không phải là tìm một người hoàn hảo, mà là học cách nhìn một người không hoàn hảo một cách hoàn hảo.',
    author: 'Sam Keen',
  },
  {
    text: 'Yêu không phải là nhìn nhau, mà là cùng nhìn về một hướng.',
    author: 'Antoine de Saint-Exupéry',
  },
  {
    text: 'Tình yêu là khi hạnh phúc của người khác quan trọng hơn hạnh phúc của chính mình.',
    author: 'H. Jackson Brown Jr.',
  },
  {
    text: 'Yêu là tìm thấy nơi mình thuộc về.',
    author: 'Unknown',
  },
  {
    text: 'Tình yêu đích thực là khi bạn chấp nhận tất cả những gì đã, đang và sẽ xảy ra.',
    author: 'Unknown',
  },
  {
    text: 'Yêu là khi em là người đầu tiên anh nghĩ đến khi thức dậy và người cuối cùng trước khi ngủ.',
    author: 'Unknown',
  },
  {
    text: 'Tình yêu không phải là số lượng thời gian, mà là chất lượng thời gian bên nhau.',
    author: 'Unknown',
  },
  {
    text: 'Yêu là khi em làm cho những ngày bình thường trở nên đặc biệt.',
    author: 'Unknown',
  },
]

export default function LoveQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 5000) // Đổi quote mỗi 5 giây

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="max-w-4xl w-full">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-romantic text-pink-600 mb-4 text-shadow-lg">
            Câu nói về tình yêu 💭
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl font-handwriting text-pink-700">
            Những câu nói đẹp về tình yêu
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-6 left-6 opacity-20">
                <Quote className="w-16 h-16 text-pink-400" />
              </div>
              <div className="absolute bottom-6 right-6 opacity-20">
                <Heart className="w-12 h-12 text-rose-400 fill-rose-400" />
              </div>

              <div className="relative z-10">
                <motion.p
                  className="text-xl sm:text-2xl md:text-3xl font-handwriting text-gray-800 leading-relaxed mb-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  "{quotes[currentQuote].text}"
                </motion.p>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-lg sm:text-xl font-handwriting text-pink-600">
                    — {quotes[currentQuote].author}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={nextQuote}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next quote"
            >
              <RefreshCw className="w-5 h-5" />
            </motion.button>

            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`px-4 py-2 rounded-full font-handwriting text-sm transition-all ${
                isAutoPlay
                  ? 'bg-pink-300 text-pink-800'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {isAutoPlay ? '⏸️ Tạm dừng' : '▶️ Tự động'}
            </button>
          </div>

          {/* Quote indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {quotes.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentQuote
                    ? 'w-8 bg-pink-500'
                    : 'w-2 bg-pink-300'
                }`}
                animate={{
                  width: index === currentQuote ? 32 : 8,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
