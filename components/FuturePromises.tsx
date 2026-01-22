'use client'

import { motion } from 'framer-motion'
import { Heart, Star, Sparkles, Rainbow } from 'lucide-react'

interface Promise {
  icon: React.ReactNode
  text: string
  color: string
}

const promises: Promise[] = [
  {
    icon: <Heart className="w-8 h-8" />,
    text: 'Anh sẽ luôn yêu thương em mỗi ngày',
    color: 'from-pink-400 to-rose-400',
  },
  {
    icon: <Star className="w-8 h-8" />,
    text: 'Anh sẽ làm em cười mỗi khi em buồn',
    color: 'from-yellow-400 to-orange-400',
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    text: 'Anh sẽ tạo ra những kỷ niệm đẹp cùng em',
    color: 'from-purple-400 to-pink-400',
  },
  {
    icon: <Rainbow className="w-8 h-8" />,
    text: 'Anh sẽ cùng em đi khắp nơi trên thế giới',
    color: 'from-blue-400 to-purple-400',
  },
  {
    icon: <Heart className="w-8 h-8" />,
    text: 'Anh sẽ luôn lắng nghe và thấu hiểu em',
    color: 'from-rose-400 to-pink-400',
  },
  {
    icon: <Star className="w-8 h-8" />,
    text: 'Anh sẽ làm em cảm thấy mình đặc biệt nhất',
    color: 'from-orange-400 to-yellow-400',
  },
]

export default function FuturePromises() {
  return (
    <div className="min-h-screen py-12 sm:py-16 md:py-20 px-4 relative">
      <motion.div
        className="text-center mb-8 sm:mb-12 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-romantic text-pink-600 mb-3 sm:mb-4 text-shadow-lg px-2">
          Lời hứa tương lai 🌈
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl font-handwriting text-pink-700 px-2">
          Những điều anh hứa sẽ làm cho em
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {promises.map((promise, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className={`bg-gradient-to-br ${promise.color} rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group h-full`}>
                {/* Decorative background */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <motion.div
                    className="text-white mb-3 sm:mb-4"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8">
                      {promise.icon}
                    </div>
                  </motion.div>
                  
                  <p className="text-white text-base sm:text-lg md:text-xl font-handwriting leading-relaxed break-words">
                    {promise.text}
                  </p>
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full"
                      initial={{
                        x: '50%',
                        y: '50%',
                        scale: 0,
                      }}
                      animate={{
                        x: `${50 + (Math.random() - 0.5) * 100}%`,
                        y: `${50 + (Math.random() - 0.5) * 100}%`,
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.1,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
