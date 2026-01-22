'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Mail, Lock } from 'lucide-react'

const letterContent = `Gửi em yêu dấu của anh,

Hôm nay là một ngày đặc biệt - ngày kỷ niệm tình yêu của chúng ta. Anh muốn dành những lời này để nói với em rằng em có ý nghĩa như thế nào đối với anh.

Từ ngày gặp em, cuộc sống của anh đã thay đổi hoàn toàn. Em mang đến cho anh niềm vui, tiếng cười và cảm giác hạnh phúc mà anh chưa từng biết đến trước đây.

Mỗi ngày bên em là một món quà. Mỗi nụ cười của em là ánh nắng làm ấm trái tim anh. Mỗi khoảnh khắc cùng em là kỷ niệm đẹp nhất.

Anh hứa sẽ luôn yêu thương, chăm sóc và bảo vệ em. Anh hứa sẽ làm em cười mỗi ngày và làm em cảm thấy mình là người đặc biệt nhất thế giới.

Cảm ơn em vì đã ở bên anh. Cảm ơn em vì đã yêu anh. Cảm ơn em vì đã là em.

Yêu em nhiều,
Anh Mạnh của em ❤️`

export default function BurnableLetter() {
    const [isOpened, setIsOpened] = useState(false)
    const [isBurning, setIsBurning] = useState(false)
    const [isBurned, setIsBurned] = useState(false)
    const [displayedText, setDisplayedText] = useState('')
    const [isTyping, setIsTyping] = useState(false)

    // Check if letter was already opened
    useEffect(() => {
        const opened = localStorage.getItem('loveLetterOpened')
        if (opened === 'true') {
            setIsBurned(true)
        }
    }, [])

    const handleOpen = () => {
        if (isBurned) {
            alert('Thư này chỉ có thể mở một lần. Em đã đọc rồi mà! 💕')
            return
        }
        setIsOpened(true)
        localStorage.setItem('loveLetterOpened', 'true')

        // Calculate reading time (30ms per character)
        const readingTime = letterContent.length * 30
        const burningDuration = 8000 // 8 seconds for burning

        // Start typing effect
        setIsTyping(true)
        let index = 0
        const timer = setInterval(() => {
            if (index < letterContent.length) {
                setDisplayedText(letterContent.slice(0, index + 1))
                index++
            } else {
                clearInterval(timer)
                setIsTyping(false)

                // Start burning immediately after reading finishes
                // Burning will take 8 seconds, synchronized with reading
                setIsBurning(true)
                setTimeout(() => {
                    setIsBurned(true)
                    setIsOpened(false)
                }, burningDuration)
            }
        }, 30)
    }

    if (isBurned) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 py-20">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mb-6"
                    >
                        <Heart className="w-16 h-16 text-pink-500 fill-pink-500 mx-auto" />
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-romantic text-pink-600 mb-4">
                        Thư đã được đọc 💌
                    </h2>
                    <p className="text-lg font-handwriting text-pink-700">
                        Những lời yêu thương đã được gửi đến trái tim em ❤️
                    </p>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
            {!isOpened ? (
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

                    <h2 className="text-4xl md:text-5xl font-romantic text-pink-600 mb-6 text-shadow-lg">
                        Một bức thư từ trái tim 💌
                    </h2>

                    <motion.div
                        className="mb-4 text-pink-600 font-handwriting"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        ⚠️ Thư này chỉ có thể mở một lần
                    </motion.div>

                    <motion.button
                        onClick={handleOpen}
                        className="px-8 py-4 bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xl font-handwriting rounded-full shadow-lg hover:shadow-xl transition-all duration-300 glow hover:glow-strong relative z-30"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Mở phong thư
                    </motion.button>
                </motion.div>
            ) : (
                <AnimatePresence>
                    {!isBurned && (
                        <motion.div
                            className="relative max-w-2xl w-full"
                            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                            animate={{
                                opacity: isBurning ? 0 : 1,
                                scale: isBurning ? 0.8 : 1,
                                rotateY: 0,
                            }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: isBurning ? 8 : 0.8, ease: isBurning ? 'easeIn' : 'easeOut' }}
                        >
                            {/* Letter paper with burning effect */}
                            <div className="bg-gradient-to-br from-cream to-rose-pastel p-8 md:p-12 rounded-lg shadow-2xl relative overflow-hidden">
                                {/* Burning mask - cháy từ dưới lên */}
                                {isBurning && (
                                    <>
                                        {/* Fire gradient overlay - cháy từ dưới lên dần */}
                                        <motion.div
                                            className="absolute inset-0 pointer-events-none z-30"
                                            style={{
                                                background: 'linear-gradient(to top, rgba(255,100,0,0.9) 0%, rgba(255,50,0,0.7) 20%, rgba(255,0,0,0.5) 40%, rgba(200,0,0,0.3) 60%, rgba(100,0,0,0.1) 80%, transparent 100%)',
                                            }}
                                            initial={{
                                                clipPath: 'inset(100% 0% 0% 0%)',
                                            }}
                                            animate={{
                                                clipPath: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
                                            }}
                                            transition={{
                                                duration: 8,
                                                ease: [0.25, 0.1, 0.25, 1], // Ease in out - cháy chậm dần ở đầu, nhanh ở cuối
                                            }}
                                        />

                                        {/* Burned paper effect */}
                                        <motion.div
                                            className="absolute inset-0 pointer-events-none z-35"
                                            style={{
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(50,50,50,0.7) 20%, rgba(100,100,100,0.5) 40%, rgba(150,150,150,0.3) 60%, rgba(200,200,200,0.1) 80%, transparent 100%)',
                                            }}
                                            initial={{
                                                clipPath: 'inset(100% 0% 0% 0%)',
                                            }}
                                            animate={{
                                                clipPath: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
                                            }}
                                            transition={{
                                                duration: 8,
                                                ease: [0.25, 0.1, 0.25, 1],
                                                delay: 0.5, // Bắt đầu cháy đen sau lửa một chút
                                            }}
                                        />

                                        {/* Fire particles from bottom */}
                                        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                                            {[...Array(30)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="absolute"
                                                    style={{
                                                        left: `${20 + (i % 10) * 8}%`,
                                                        bottom: 0,
                                                    }}
                                                    initial={{
                                                        y: 0,
                                                        x: 0,
                                                        scale: 0,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        y: [-50, -150, -250],
                                                        x: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 90],
                                                        scale: [0, 1.5, 0.5, 0],
                                                        opacity: [0, 1, 0.8, 0],
                                                        rotate: [0, Math.random() * 360],
                                                    }}
                                                    transition={{
                                                        duration: 3 + Math.random() * 2,
                                                        delay: (i % 10) * 0.1 + Math.random() * 0.5,
                                                        ease: 'easeOut',
                                                        repeat: Infinity,
                                                        repeatDelay: 0.5,
                                                    }}
                                                >
                                                    {/* Fire shape */}
                                                    <div className="relative">
                                                        <div className="w-3 h-4 bg-orange-500 rounded-full blur-sm" />
                                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-3 bg-yellow-400 rounded-full blur-sm" />
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Burning edge glow */}
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-25"
                                            style={{
                                                background: 'linear-gradient(to top, rgba(255,100,0,0.8) 0%, rgba(255,50,0,0.4) 50%, transparent 100%)',
                                            }}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: [0, 1, 1, 0],
                                                height: [0, 128, 256, 0],
                                            }}
                                            transition={{
                                                duration: 8,
                                                ease: [0.4, 0, 0.2, 1],
                                            }}
                                        />
                                    </>
                                )}

                                {/* Content - bị cháy từ dưới lên */}
                                <motion.div
                                    className="relative z-10"
                                    initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                                    animate={isBurning ? {
                                        clipPath: ['inset(0% 0% 0% 0%)', 'inset(100% 0% 0% 0%)'],
                                    } : {}}
                                    transition={isBurning ? {
                                        duration: 8,
                                        ease: [0.25, 0.1, 0.25, 1], // Cháy chậm dần
                                    } : {}}
                                >
                                    <div className="flex items-center gap-2 mb-6">
                                        <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                                        <h3 className="text-3xl font-romantic text-pink-700">Thư tình gửi em</h3>
                                    </div>

                                    <div className="font-handwriting text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-line">
                                        {displayedText}
                                        {isTyping && (
                                            <motion.span
                                                animate={{ opacity: [1, 0] }}
                                                transition={{ duration: 0.8, repeat: Infinity }}
                                                className="inline-block w-1 h-6 bg-pink-500 ml-1"
                                            />
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    )
}
