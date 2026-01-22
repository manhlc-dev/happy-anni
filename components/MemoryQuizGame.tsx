'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, Gift, Sparkles, CheckCircle, XCircle } from 'lucide-react'

interface Question {
    question: string
    options: string[]
    correctAnswer: number
    reward: string
    penalty: string
}

const questions: Question[] = [
    {
        question: 'Chúng ta gặp nhau lần đầu ở đâu?',
        options: ['Quán cà phê', 'Công viên', 'Trường học', 'Bữa tiệc'],
        correctAnswer: 0,
        reward: '🎁 Quà đặc biệt: Một buổi hẹn hò lãng mạn!',
        penalty: '😅 Phạt: Phải nấu bữa tối cho anh!',
    },
    {
        question: 'Anh đã yêu em từ khi nào?',
        options: ['Ngày đầu gặp', 'Sau 1 tuần', 'Sau 1 tháng', 'Không nhớ'],
        correctAnswer: 0,
        reward: '💖 Quà: Một nụ hôn thật lâu!',
        penalty: '😘 Phạt: Phải hôn anh 10 cái!',
    },
    {
        question: 'Kỷ niệm đẹp nhất của chúng ta là gì?',
        options: ['Lần đầu nắm tay', 'Lần đầu hẹn hò', 'Lần đầu nói yêu', 'Tất cả đều đẹp'],
        correctAnswer: 3,
        reward: '⭐ Quà: Một ngày chỉ dành cho em!',
        penalty: '💕 Phạt: Phải ôm anh thật chặt!',
    },
]

export default function MemoryQuizGame() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [showResult, setShowResult] = useState(false)
    const [score, setScore] = useState(0)
    const [gameFinished, setGameFinished] = useState(false)

    const question = questions[currentQuestion]

    const handleAnswer = (index: number) => {
        if (showResult) return

        setSelectedAnswer(index)
        setShowResult(true)

        if (index === question.correctAnswer) {
            setScore(score + 1)
        }
    }

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
            setSelectedAnswer(null)
            setShowResult(false)
        } else {
            setGameFinished(true)
        }
    }

    if (gameFinished) {
        const percentage = Math.round((score / questions.length) * 100)
        return (
            <div className="min-h-screen flex items-center justify-center px-4 py-20">
                <motion.div
                    className="text-center max-w-2xl w-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="mb-8"
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Gift className="w-24 h-24 text-pink-500 mx-auto" />
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-romantic text-pink-600 mb-6 text-shadow-lg">
                        Kết quả: {score}/{questions.length} 🎉
                    </h2>

                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8">
                        <div className="text-6xl mb-4">{percentage >= 70 ? '🏆' : percentage >= 50 ? '🎁' : '💕'}</div>
                        <p className="text-2xl md:text-3xl font-handwriting text-pink-700 mb-4">
                            {percentage >= 70
                                ? 'Xuất sắc! Em nhớ rất rõ kỷ niệm của chúng ta!'
                                : percentage >= 50
                                    ? 'Tốt lắm! Em nhớ khá nhiều đấy!'
                                    : 'Không sao! Quan trọng là chúng ta đang ở bên nhau!'
                            }
                        </p>
                        <p className="text-lg font-handwriting text-gray-600">
                            {percentage >= 70
                                ? 'Phần thưởng đặc biệt đang chờ em! 💖'
                                : 'Em vẫn là người đặc biệt nhất! 💕'
                            }
                        </p>
                    </div>

                    <motion.button
                        onClick={() => {
                            setCurrentQuestion(0)
                            setSelectedAnswer(null)
                            setShowResult(false)
                            setScore(0)
                            setGameFinished(false)
                        }}
                        className="px-8 py-4 bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xl font-handwriting rounded-full shadow-lg hover:shadow-xl transition-all duration-300 glow"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Chơi lại 🎮
                    </motion.button>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
            <div className="max-w-3xl w-full">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-romantic text-pink-600 mb-4 text-shadow-lg">
                        Trò chơi kỷ niệm 💭
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl font-handwriting text-pink-700">
                        Em có nhớ những kỷ niệm của chúng ta không?
                    </p>
                    <div className="mt-4 text-pink-600 font-handwriting">
                        Câu {currentQuestion + 1}/{questions.length}
                    </div>
                </motion.div>

                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
                    <h3 className="text-2xl md:text-3xl font-romantic text-pink-700 mb-8 text-center">
                        {question.question}
                    </h3>

                    <div className="space-y-4 mb-8">
                        {question.options.map((option, index) => {
                            const isCorrect = index === question.correctAnswer
                            const isSelected = selectedAnswer === index
                            const showCorrect = showResult && isCorrect
                            const showWrong = showResult && isSelected && !isCorrect

                            return (
                                <motion.button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    disabled={showResult}
                                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 relative overflow-hidden ${showCorrect
                                            ? 'bg-green-100 border-2 border-green-500'
                                            : showWrong
                                                ? 'bg-red-100 border-2 border-red-500'
                                                : isSelected
                                                    ? 'bg-pink-100 border-2 border-pink-500'
                                                    : 'bg-white border-2 border-pink-200 hover:border-pink-400'
                                        } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                                    whileHover={!showResult ? { scale: 1.02, x: 5 } : {}}
                                    whileTap={!showResult ? { scale: 0.98 } : {}}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-handwriting text-lg text-gray-800">
                                            {option}
                                        </span>
                                        {showResult && (
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                            >
                                                {showCorrect ? (
                                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                                ) : showWrong ? (
                                                    <XCircle className="w-6 h-6 text-red-500" />
                                                ) : null}
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.button>
                            )
                        })}
                    </div>

                    <AnimatePresence>
                        {showResult && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mb-6 p-6 rounded-xl text-center"
                                style={{
                                    background: selectedAnswer === question.correctAnswer
                                        ? 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)'
                                        : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                                }}
                            >
                                <div className="text-4xl mb-3">
                                    {selectedAnswer === question.correctAnswer ? '🎉' : '😅'}
                                </div>
                                <p className="text-xl font-handwriting text-pink-700 mb-2">
                                    {selectedAnswer === question.correctAnswer
                                        ? question.reward
                                        : question.penalty}
                                </p>
                                {selectedAnswer !== question.correctAnswer && (
                                    <p className="text-sm text-gray-600">
                                        Đáp án đúng: {question.options[question.correctAnswer]}
                                    </p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {showResult && (
                        <motion.button
                            onClick={handleNext}
                            className="w-full px-8 py-4 bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xl font-handwriting rounded-full shadow-lg hover:shadow-xl transition-all duration-300 glow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {currentQuestion < questions.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả 🎁'}
                        </motion.button>
                    )}
                </div>
            </div>
        </div>
    )
}
