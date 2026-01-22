'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Gift, Heart, Sparkles, Star, Smile, Coins } from 'lucide-react'

interface GiftItem {
  type: 'message' | 'kiss' | 'promise' | 'surprise'
  content: string
  icon: React.ReactNode
  color: string
}

const gifts: GiftItem[] = [
  {
    type: 'message',
    content: 'Chở em đi xem phim! 💖',
    icon: <Heart className="w-12 h-12" />,
    color: 'from-pink-400 to-rose-400',
  },
  {
    type: 'kiss',
    content: 'Gửi em ngàn nụ hôn 😘💋',
    icon: <Smile className="w-12 h-12" />,
    color: 'from-rose-400 to-pink-400',
  },
  {
    type: 'promise',
    content: 'Chở em đi ăn món thật ngon! ✨',
    icon: <Star className="w-12 h-12" />,
    color: 'from-yellow-400 to-orange-400',
  },
  {
    type: 'message',
    content: 'Chở em đi mua món đồ em thích nhất! 🌈',
    icon: <Heart className="w-12 h-12" />,
    color: 'from-pink-400 to-rose-400',
  },
  {
    type: 'kiss',
    content: '+1 ly trà sữa ngay và luôn! 👼💕',
    icon: <Smile className="w-12 h-12" />,
    color: 'from-rose-400 to-pink-400',
  },
  {
    type: 'surprise',
    content: 'Em là điều tuyệt vời nhất đã xảy ra với anh! ⭐',
    icon: <Gift className="w-12 h-12" />,
    color: 'from-purple-400 to-pink-400',
  },
]

export default function MiniGame() {
  const [isShaking, setIsShaking] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [currentGift, setCurrentGift] = useState<GiftItem | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [openCount, setOpenCount] = useState(0)
  const [showLuckyMoney, setShowLuckyMoney] = useState(false)
  const [luckyMoneyAmount, setLuckyMoneyAmount] = useState<number | null>(null)
  const [isRolling, setIsRolling] = useState(false)

  useEffect(() => {
    const count = localStorage.getItem('giftOpenCount')
    if (count) {
      setOpenCount(parseInt(count))
    }
  }, [])

  const handleOpenGift = () => {
    if (isOpen) return

    const currentCount = openCount + 1

    // Nếu đã mở 3 lần, hiển thị gift đặc biệt
    if (currentCount >= 4) {
      setIsShaking(true)
      setTimeout(() => {
        setCurrentGift({
          type: 'surprise',
          content: 'Tết nay được lì xì. Nhưng mà không biết bao nhiêu nhỉ! 🎁',
          icon: <Gift className="w-12 h-12" />,
          color: 'from-purple-400 to-pink-400',
        })
        setIsShaking(false)
        setIsOpen(true)
        setShowLuckyMoney(true)
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)
      }, 1500)
      return
    }

    setIsShaking(true)
    setOpenCount(currentCount)
    localStorage.setItem('giftOpenCount', currentCount.toString())

    setTimeout(() => {
      const randomGift = gifts[Math.floor(Math.random() * gifts.length)]
      setCurrentGift(randomGift)
      setIsShaking(false)
      setIsOpen(true)
      setShowConfetti(true)

      setTimeout(() => setShowConfetti(false), 3000)
    }, 1500)
  }

  const handleReset = () => {
    setIsOpen(false)
    setCurrentGift(null)
    setShowLuckyMoney(false)
    setLuckyMoneyAmount(null)
  }

  const generateLuckyMoney = () => {
    setIsRolling(true)

    // Weighted random: 70% chance từ 1-2 triệu, 30% chance dưới 1 triệu nhưng vẫn cao
    const random = Math.random()
    let amount: number

    if (random < 0.7) {
      // 70%: 1,000,000 - 2,000,000
      amount = 1000000 + Math.floor(Math.random() * 1000000)
    } else if (random < 0.9) {
      // 20%: 800,000 - 1,000,000
      amount = 800000 + Math.floor(Math.random() * 200000)
    } else {
      // 10%: 1,200,000 - 2,000,000 (cao hơn)
      amount = 1200000 + Math.floor(Math.random() * 800000)
    }

    // Animation rolling effect
    const rollDuration = 2000
    const startTime = Date.now()
    const rollInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      if (elapsed < rollDuration) {
        // Show random numbers while rolling
        const tempAmount = 1000000 + Math.floor(Math.random() * 1000000)
        setLuckyMoneyAmount(tempAmount)
      } else {
        clearInterval(rollInterval)
        setLuckyMoneyAmount(amount)
        setIsRolling(false)
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)
      }
    }, 50)
  }

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ'
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="text-center max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-romantic text-pink-600 mb-3 sm:mb-4 text-shadow-lg px-2">
            Hộp quà bí mật 🎁
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl font-handwriting text-pink-700 px-2">
            Click để mở quà và nhận điều bất ngờ!
          </p>
        </motion.div>

        {/* Gift box */}
        <div className="relative mb-6 sm:mb-8">
          <motion.div
            className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80"
            animate={isShaking ? {
              rotate: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1],
            } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Gift box */}
            <div className="absolute inset-0">
              <motion.div
                className={`w-full h-full bg-gradient-to-br ${currentGift?.color || 'from-pink-400 to-rose-400'} rounded-2xl shadow-2xl relative overflow-hidden`}
                animate={isOpen ? {
                  scale: [1, 1.2, 1],
                  rotateY: [0, 180, 360],
                } : {}}
                transition={{ duration: 1 }}
              >
                {/* Ribbon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-8 bg-white/30" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-full bg-white/30" />
                </div>

                {/* Bow */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <div className="w-16 h-16 bg-white/40 rounded-full" />
                </div>
              </motion.div>
            </div>

            {/* Gift content when opened */}
            <AnimatePresence>
              {isOpen && currentGift && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0, rotate: 180 }}
                  transition={{ duration: 0.8, type: 'spring' }}
                  className="absolute inset-0 flex flex-col items-center justify-center z-20"
                >
                  {showLuckyMoney ? (
                    <>
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-white mb-4"
                      >
                        <Coins className="w-12 h-12 sm:w-16 sm:h-16" />
                      </motion.div>
                      <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-handwriting text-center px-3 sm:px-4 break-words mb-4">
                        {currentGift.content}
                      </p>
                      {luckyMoneyAmount !== null ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center"
                        >
                          <div className="text-3xl sm:text-4xl md:text-5xl font-romantic text-yellow-300 mb-2 text-shadow-lg">
                            {formatMoney(luckyMoneyAmount)}
                          </div>
                          <p className="text-white/80 text-sm sm:text-base font-handwriting">
                            Chúc em năm mới phát tài! 💰
                          </p>
                        </motion.div>
                      ) : (
                        <motion.button
                          onClick={generateLuckyMoney}
                          disabled={isRolling}
                          className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-handwriting text-lg rounded-full shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          whileHover={{ scale: isRolling ? 1 : 1.05 }}
                          whileTap={{ scale: isRolling ? 1 : 0.95 }}
                        >
                          {isRolling ? 'Đang quay...' : 'Quay số may mắn 🎰'}
                        </motion.button>
                      )}
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-white mb-4"
                      >
                        {currentGift.icon}
                      </motion.div>
                      <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-handwriting text-center px-3 sm:px-4 break-words">
                        {currentGift.content}
                      </p>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Button */}
        {!isOpen ? (
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              handleOpenGift()
            }}
            className="px-5 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4 bg-gradient-to-r from-pink-400 to-rose-400 text-white text-base sm:text-lg md:text-xl font-handwriting rounded-full shadow-lg hover:shadow-xl transition-all duration-300 glow hover:glow-strong relative z-30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {openCount >= 3
              ? 'Mở lì xì đặc biệt 🧧'
              : `Mở quà bí mật 🎲 (${3 - openCount} lần còn lại)`
            }
          </motion.button>
        ) : (
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              handleReset()
            }}
            className="px-5 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4 bg-gradient-to-r from-pink-400 to-rose-400 text-white text-base sm:text-lg md:text-xl font-handwriting rounded-full shadow-lg hover:shadow-xl transition-all duration-300 glow hover:glow-strong relative z-30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {openCount >= 3 ? 'Đóng' : 'Mở quà tiếp theo 🎁'}
          </motion.button>
        )}

        {/* Confetti */}
        <AnimatePresence>
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
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
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 2,
                    delay: Math.random() * 0.5,
                  }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
