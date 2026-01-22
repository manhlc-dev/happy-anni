'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Lock, Unlock, Gift, Sparkles } from 'lucide-react'

interface Memory {
  id: number
  title: string
  content: string
  date: string
  icon: React.ReactNode
  color: string
  locked: boolean
}

const memories: Memory[] = [
  {
    id: 1,
    title: 'Kỷ niệm đầu tiên',
    content: 'Chắc là kỉ niệm anh chở em đi ra biển, à mà không phải em đòi ra xong ra ngủ luôn, chắc cho ý đồ gì đó ha. Nhưng mà dù sao thì cũng ấm áp he ngủ giấc rồi về ha',
    date: 'Ngày đặc biệt',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-pink-400 to-rose-400',
    locked: false,
  },
  {
    id: 2,
    title: 'Lần đầu ngủ chung',
    content: 'Không phải đâu tại lúc đó trời tối đi về xa sợ nên xin ở lại thôi nè. Tối ngủ bị mớ xong tự quay qua ôm chứ không phải cố ý đâu nha',
    date: 'HEHE',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-rose-400 to-pink-400',
    locked: false,
  },
  {
    id: 3,
    title: 'Lần đầu bị chửi',
    content: 'Chắc về nhà Mạnh, Mạnh đòi ấy không cho xong chửi đòi về nè. May mà Mạnh kéo lại không là không có ngày hôm nay rồi nè',
    date: 'Chửiiiii',
    icon: <Gift className="w-6 h-6" />,
    color: 'from-purple-400 to-pink-400',
    locked: true,
  },
  {
    id: 4,
    title: 'Tối đi đèo chơi chơi',
    content: 'Lần đó buồn nên lên đèo đi hóng gió cho mát nè ai dè cũng có người quan tâm nè. Hạnh phúc nè may là lên đèo chớ ở nhà thì chắc cũng không có ngày hôm nay luôn rồi nè.',
    date: 'Lời hứa',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-yellow-400 to-orange-400',
    locked: true,
  },
]

export default function MemoryBox() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
  const [unlockedMemories, setUnlockedMemories] = useState<number[]>([1, 2])

  const unlockMemory = (id: number) => {
    if (!unlockedMemories.includes(id)) {
      setUnlockedMemories([...unlockedMemories, id])
    }
  }

  const isUnlocked = (id: number) => unlockedMemories.includes(id)

  return (
    <div className="min-h-screen py-20 px-4 relative">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-romantic text-pink-600 mb-4 text-shadow-lg">
          Hộp kỷ niệm 💝
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl font-handwriting text-pink-700">
          Những kỷ niệm đặc biệt của chúng ta
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {memories.map((memory, index) => {
            const unlocked = isUnlocked(memory.id)
            return (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative"
              >
                <motion.div
                  className={`bg-gradient-to-br ${memory.color} rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group cursor-pointer h-full`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => {
                    if (unlocked) {
                      setSelectedMemory(memory)
                    } else {
                      unlockMemory(memory.id)
                    }
                  }}
                >
                  {/* Lock overlay */}
                  {!unlocked && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center z-20 group-hover:bg-black/50 transition-all">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Lock className="w-12 h-12 text-white" />
                      </motion.div>
                      <p className="absolute bottom-4 text-white font-handwriting text-sm">
                        Click để mở khóa
                      </p>
                    </div>
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-white">
                        {memory.icon}
                      </div>
                      {unlocked && (
                        <Unlock className="w-5 h-5 text-white/80" />
                      )}
                    </div>

                    <h3 className="text-2xl font-romantic text-white mb-2">
                      {memory.title}
                    </h3>

                    <p className="text-white/90 text-sm font-handwriting mb-4">
                      {memory.date}
                    </p>

                    {unlocked && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white/80 text-sm font-handwriting line-clamp-3"
                      >
                        {memory.content.substring(0, 100)}...
                      </motion.p>
                    )}
                  </div>

                  {/* Sparkles effect */}
                  {unlocked && (
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute text-white"
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
                        >
                          <Sparkles className="w-3 h-3" />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              className={`bg-gradient-to-br ${selectedMemory.color} rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl relative overflow-hidden`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
              >
                ×
              </button>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-white">
                    {selectedMemory.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-romantic text-white">
                      {selectedMemory.title}
                    </h3>
                    <p className="text-white/80 font-handwriting">
                      {selectedMemory.date}
                    </p>
                  </div>
                </div>

                <p className="text-white text-lg font-handwriting leading-relaxed whitespace-pre-line">
                  {selectedMemory.content}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
