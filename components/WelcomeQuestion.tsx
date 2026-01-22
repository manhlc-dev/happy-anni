'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Users, User } from 'lucide-react'

interface WelcomeQuestionProps {
  onAnswer: (answer: 'together' | 'alone') => void
}

export default function WelcomeQuestion({ onAnswer }: WelcomeQuestionProps) {
  const [selected, setSelected] = useState<'together' | 'alone' | null>(null)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-rose-pastel via-pink-pastel to-lavender">
      <motion.div
        className="text-center max-w-2xl px-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="mb-8"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart className="w-16 h-16 md:w-20 md:h-20 text-pink-500 fill-pink-500 mx-auto" />
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-romantic text-pink-600 mb-8 text-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Em đang xem cùng anh hay xem một mình? 💕
        </motion.h1>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <motion.button
            onClick={() => {
              setSelected('together')
              setTimeout(() => onAnswer('together'), 500)
            }}
            className={`relative w-full sm:w-64 px-8 py-6 rounded-2xl shadow-xl transition-all duration-300 ${
              selected === 'together'
                ? 'bg-gradient-to-br from-pink-400 to-rose-400 scale-105'
                : 'bg-white/80 hover:bg-white'
            }`}
            whileHover={{ scale: selected ? 1 : 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col items-center gap-3">
              <Users className={`w-12 h-12 ${selected === 'together' ? 'text-white' : 'text-pink-500'}`} />
              <span className={`text-xl font-handwriting ${selected === 'together' ? 'text-white' : 'text-pink-700'}`}>
                Xem cùng anh 💑
              </span>
            </div>
            {selected === 'together' && (
              <motion.div
                className="absolute inset-0 rounded-2xl bg-white/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>

          <motion.button
            onClick={() => {
              setSelected('alone')
              setTimeout(() => onAnswer('alone'), 500)
            }}
            className={`relative w-full sm:w-64 px-8 py-6 rounded-2xl shadow-xl transition-all duration-300 ${
              selected === 'alone'
                ? 'bg-gradient-to-br from-pink-400 to-rose-400 scale-105'
                : 'bg-white/80 hover:bg-white'
            }`}
            whileHover={{ scale: selected ? 1 : 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex flex-col items-center gap-3">
              <User className={`w-12 h-12 ${selected === 'alone' ? 'text-white' : 'text-pink-500'}`} />
              <span className={`text-xl font-handwriting ${selected === 'alone' ? 'text-white' : 'text-pink-700'}`}>
                Xem một mình 👤
              </span>
            </div>
            {selected === 'alone' && (
              <motion.div
                className="absolute inset-0 rounded-2xl bg-white/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        </div>

        {selected && (
          <motion.p
            className="mt-8 text-lg font-handwriting text-pink-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {selected === 'together' 
              ? 'Tuyệt vời! Cùng nhau khám phá nhé 💖'
              : 'Anh hiểu, em cứ từ từ xem nhé 💕'}
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}
