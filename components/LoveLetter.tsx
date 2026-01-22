'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Heart, Mail } from 'lucide-react'

const letterContent = `Gửi em yêu dấu của anh,

Hôm nay là một ngày thật đặc biệt – ngày kỷ niệm tình yêu của chúng ta. Anh ngồi viết những dòng này và chợt nhận ra, để có được hôm nay, chúng ta đã cùng nhau đi qua không ít những ngày khó khăn.

Lúc mới bên nhau, không phải lúc nào mọi thứ cũng êm đềm. Đã có những lần giận hờn, hiểu lầm, những lúc cả hai đều mệt mỏi và tổn thương. Có khi anh đã vụng về, có khi em đã buồn nhiều hơn anh nghĩ. Nhưng sau tất cả, chúng ta vẫn chọn nắm tay nhau, chọn ở lại và học cách yêu nhau tốt hơn mỗi ngày.

Từ ngày có em, cuộc sống của anh đã thay đổi rất nhiều. Em mang đến cho anh niềm vui, tiếng cười, và cả cảm giác bình yên mà trước đây anh chưa từng có. Em không chỉ là người anh yêu, mà còn là người anh muốn chia sẻ mọi điều trong cuộc sống – dù là niềm vui hay những lúc yếu lòng nhất.

Mỗi ngày bên em là một món quà mà anh luôn trân trọng. Nụ cười của em làm trái tim anh dịu lại, còn những lúc em ở bên, anh cảm thấy mình mạnh mẽ hơn rất nhiều. Chính em đã dạy anh cách yêu thương, nhẫn nại và trưởng thành hơn.

Anh không hứa sẽ là người hoàn hảo, nhưng anh hứa sẽ luôn cố gắng vì em. Anh hứa sẽ yêu thương, chăm sóc và bảo vệ em bằng tất cả những gì anh có. Anh hứa sẽ ở bên em không chỉ trong những ngày hạnh phúc, mà cả khi chúng ta lại vô tình giận nhau thêm lần nữa.

Cảm ơn em vì đã không buông tay anh trong những lúc khó khăn.
Cảm ơn em vì đã yêu anh theo cách rất riêng của em.
Và cảm ơn em, vì đã đến và ở lại trong cuộc đời anh.

Yêu em rất nhiều,
Anh Mạnh của em ❤️`

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (isOpen && !isTyping) {
      setIsTyping(true)
      let index = 0
      const timer = setInterval(() => {
        if (index < letterContent.length) {
          setDisplayedText(letterContent.slice(0, index + 1))
          index++
        } else {
          clearInterval(timer)
          setIsTyping(false)
        }
      }, 30)
      return () => clearInterval(timer)
    }
  }, [isOpen])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="max-w-2xl w-full">
        {!isOpen ? (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="mb-8"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Mail className="w-24 h-24 text-pink-500 mx-auto" />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-romantic text-pink-600 mb-4 md:mb-6 text-shadow-lg px-2">
              Một bức thư từ trái tim 💌
            </h2>

            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(true)
              }}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-pink-400 to-rose-400 text-white text-lg sm:text-xl font-handwriting rounded-full shadow-lg hover:shadow-xl transition-all duration-300 glow hover:glow-strong relative z-30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Mở phong thư
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Letter paper */}
            <div className="bg-gradient-to-br from-cream to-rose-pastel p-4 sm:p-6 md:p-8 lg:p-12 rounded-lg shadow-2xl relative overflow-hidden">
              {/* Paper texture */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />

              {/* Letter content */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 fill-pink-500 flex-shrink-0" />
                  <h3 className="text-2xl sm:text-3xl font-romantic text-pink-700">Thư tình gửi em</h3>
                </div>

                <div className="font-handwriting text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-line break-words overflow-wrap-anywhere">
                  {displayedText}
                  {isTyping && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-1 h-4 sm:h-6 bg-pink-500 ml-1"
                    />
                  )}
                </div>
              </div>

              {/* Decorative hearts */}
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 opacity-20">
                <Heart className="w-10 h-10 sm:w-16 sm:h-16 text-pink-400 fill-pink-400" />
              </div>
              <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 opacity-20">
                <Heart className="w-8 h-8 sm:w-12 sm:h-12 text-rose-400 fill-rose-400" />
              </div>
            </div>

            {/* Close button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
                setDisplayedText('')
              }}
              className="mt-4 sm:mt-6 mx-auto block px-5 py-2.5 sm:px-6 sm:py-3 bg-pink-300 text-pink-800 rounded-full font-handwriting text-base sm:text-lg hover:bg-pink-400 transition-colors relative z-30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Đóng thư
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
