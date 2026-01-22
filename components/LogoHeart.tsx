'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, Star } from 'lucide-react'

interface LogoHeartProps {
  onEasterEgg?: () => void
}

export default function LogoHeart({ onEasterEgg }: LogoHeartProps) {
  const [clickCount, setClickCount] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [lastClickTime, setLastClickTime] = useState(0)

  useEffect(() => {
    // Reset click count after 3 seconds of no clicks
    const timer = setTimeout(() => {
      if (clickCount > 0 && clickCount < 10) {
        setClickCount(0)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [clickCount])

  const handleClick = () => {
    const now = Date.now()
    
    // Check if clicks are within 2 seconds (rapid clicking)
    if (now - lastClickTime < 2000) {
      const newCount = clickCount + 1
      setClickCount(newCount)
      
      if (newCount === 10) {
        setShowMessage(true)
        onEasterEgg?.()
        
        // Random message based on time and clicks
        const hour = new Date().getHours()
        const messages = [
          'Anh biết em tò mò mà 😘',
          'Em thật dễ thương khi tò mò như vậy 💕',
          'Anh đã biết em sẽ click nhiều lần! 😄',
          'Em là người đặc biệt nhất trong lòng anh ❤️',
          hour < 12 
            ? 'Chào buổi sáng em yêu! Anh biết em sẽ tìm thấy điều này 🌅'
            : hour < 18
            ? 'Buổi chiều vui vẻ! Em thật tò mò nhỉ 😊'
            : 'Buổi tối ấm áp! Anh yêu em nhiều lắm 🌙',
        ]
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)]
        
        setTimeout(() => {
          alert(randomMessage)
          setShowMessage(false)
          setClickCount(0)
        }, 500)
      }
    } else {
      // Reset if too much time passed
      setClickCount(1)
    }
    
    setLastClickTime(now)
  }

  return (
    <>
      <motion.button
        onClick={handleClick}
        className="fixed top-6 left-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={clickCount > 0 && clickCount < 10 ? {
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        } : {}}
        transition={{ duration: 0.3 }}
        aria-label="Logo"
      >
        <Heart className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors ${
          clickCount >= 10 
            ? 'text-red-500 fill-red-500' 
            : clickCount > 0
            ? 'text-pink-500 fill-pink-500'
            : 'text-pink-400 fill-pink-400'
        }`} />
      </motion.button>

      {/* Click counter hint */}
      {clickCount > 0 && clickCount < 10 && (
        <motion.div
          className="fixed top-20 left-6 z-50 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <p className="text-xs font-handwriting text-pink-600">
            {10 - clickCount} lần nữa... 👀
          </p>
        </motion.div>
      )}

      {/* Easter egg animation */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: '50%',
                  y: '50%',
                  scale: 0,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 200}%`,
                  y: `${50 + (Math.random() - 0.5) * 200}%`,
                  scale: [0, 1, 0],
                  rotate: Math.random() * 720,
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5,
                }}
              >
                {i % 3 === 0 ? (
                  <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                ) : i % 3 === 1 ? (
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                ) : (
                  <Star className="w-6 h-6 text-purple-400 fill-purple-400" />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
