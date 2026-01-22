'use client'

import { motion } from 'framer-motion'
import { Calendar, Heart, Star, Sparkles } from 'lucide-react'

interface TimelineEvent {
  date: string
  title: string
  description: string
  icon: React.ReactNode
}

const timelineEvents: TimelineEvent[] = [
  {
    date: 'Ngày đầu tiên',
    title: 'Chúng ta gặp nhau',
    description: 'Khoảnh khắc đầu tiên anh nhìn thấy em, trái tim anh đã biết rằng em là người đặc biệt.',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    date: 'Ngày yêu nhau',
    title: 'Chúng ta yêu nhau',
    description: 'Ngày em nói "em yêu anh", đó là ngày đẹp nhất trong cuộc đời anh.',
    icon: <Heart className="w-6 h-6" />,
  },
  {
    date: 'Kỷ niệm đáng nhớ',
    title: 'Những khoảnh khắc đẹp',
    description: 'Mỗi khoảnh khắc bên em đều là kỷ niệm quý giá mà anh sẽ trân trọng mãi mãi.',
    icon: <Star className="w-6 h-6" />,
  },
]

export default function Timeline() {
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
          Hành trình tình yêu của chúng ta
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl font-handwriting text-pink-700 px-2">
          Những mốc thời gian đáng nhớ
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={index}
            className="relative mb-8 sm:mb-10 md:mb-12 lg:mb-16"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            {/* Timeline line */}
            {index < timelineEvents.length - 1 && (
              <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-pink-300 to-transparent hidden md:block" />
            )}

            <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
              {/* Icon circle */}
              <motion.div
                className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white shadow-lg glow relative z-10"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6">
                  {event.icon}
                </div>
              </motion.div>

              {/* Content card */}
              <motion.div
                className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Decorative background */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-rose-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 flex-shrink-0" />
                    <span className="text-pink-600 font-semibold text-xs sm:text-sm md:text-base">
                      {event.date}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-romantic text-pink-700 mb-2 sm:mb-3">
                    {event.title}
                  </h3>

                  <p className="text-gray-700 text-sm sm:text-base md:text-lg font-handwriting leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Floating hearts on hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-pink-300"
                      initial={{
                        x: '50%',
                        y: '50%',
                        scale: 0,
                      }}
                      animate={{
                        x: `${50 + (Math.random() - 0.5) * 100}%`,
                        y: `${50 + (Math.random() - 0.5) * 100}%`,
                        scale: [0, 1, 0],
                        rotate: Math.random() * 360,
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.1,
                      }}
                    >
                      <Heart className="w-4 h-4 fill-pink-300" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
