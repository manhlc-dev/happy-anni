'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react'

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [volume, setVolume] = useState(0.5)
    const [showPlayer, setShowPlayer] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        // Tạo audio element
        if (typeof window !== 'undefined' && !audioRef.current) {
            audioRef.current = new Audio()

            // Thử các đường dẫn khác nhau
            const musicPaths = [
                '/music/until-you.mp3',
                '/music/until-you.mp3',
                '/music/until-you.mp3',
            ]

            let currentPathIndex = 0

            const tryLoadMusic = (pathIndex: number) => {
                if (pathIndex >= musicPaths.length) {
                    console.error('Không tìm thấy file nhạc. Vui lòng kiểm tra file trong public/music/')
                    return
                }

                if (audioRef.current) {
                    audioRef.current.src = musicPaths[pathIndex]
                    audioRef.current.loop = true
                    audioRef.current.volume = volume

                    // Kiểm tra khi load thành công và tự động phát
                    audioRef.current.addEventListener('canplaythrough', async () => {
                        console.log('✅ Nhạc đã load thành công:', musicPaths[pathIndex])

                        // Thử phát tự động ngay lập tức
                        try {
                            // Set volume trước khi phát
                            audioRef.current!.volume = volume
                            await audioRef.current!.play()
                            setIsPlaying(true)
                            setShowPlayer(true)
                            console.log('🎵 Nhạc đã tự động phát')
                        } catch (error) {
                            console.log('⚠️ Browser chặn auto-play, sẽ thử phát khi user tương tác')
                            // Nếu bị chặn, sẽ thử lại khi user tương tác
                        }
                    })

                    // Thử phát ngay khi load xong (không đợi canplaythrough)
                    audioRef.current.addEventListener('loadeddata', async () => {
                        if (audioRef.current && audioRef.current.paused) {
                            try {
                                audioRef.current.volume = volume
                                await audioRef.current.play()
                                setIsPlaying(true)
                                setShowPlayer(true)
                                console.log('🎵 Nhạc đã phát sớm')
                            } catch (error) {
                                // Bị chặn, sẽ thử lại sau
                            }
                        }
                    })

                    // Thử phát khi user tương tác lần đầu (nếu auto-play bị chặn)
                    const tryAutoPlayOnInteraction = async () => {
                        if (audioRef.current && audioRef.current.paused) {
                            try {
                                await audioRef.current.play()
                                setIsPlaying(true)
                                setShowPlayer(true)
                                console.log('🎵 Nhạc đã phát sau khi user tương tác')
                            } catch (error) {
                                console.log('⚠️ Vẫn không thể phát nhạc')
                            }
                        }
                    }

                    // Lắng nghe tương tác đầu tiên của user (nếu auto-play bị chặn)
                    setTimeout(() => {
                        if (audioRef.current && audioRef.current.paused) {
                            document.addEventListener('click', tryAutoPlayOnInteraction, { once: true })
                            document.addEventListener('scroll', tryAutoPlayOnInteraction, { once: true })
                            document.addEventListener('touchstart', tryAutoPlayOnInteraction, { once: true })
                        }
                    }, 1000)

                    // Xử lý lỗi
                    audioRef.current.addEventListener('error', (e) => {
                        console.warn(`⚠️ Không tìm thấy: ${musicPaths[pathIndex]}, thử đường dẫn khác...`)
                        if (pathIndex < musicPaths.length - 1) {
                            tryLoadMusic(pathIndex + 1)
                        } else {
                            console.error('❌ Không tìm thấy file nhạc ở bất kỳ đường dẫn nào')
                        }
                    })

                    // Load nhạc
                    audioRef.current.load()
                }
            }

            tryLoadMusic(0)
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
            }
        }
    }, [])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume
        }
    }, [volume, isMuted])

    const togglePlay = async () => {
        if (!audioRef.current) {
            console.error('Audio element chưa được khởi tạo')
            return
        }

        try {
            if (isPlaying) {
                audioRef.current.pause()
                setIsPlaying(false)
            } else {
                // Kiểm tra xem file đã load chưa
                if (audioRef.current.readyState < 2) {
                    console.log('Đang load nhạc...')
                    await audioRef.current.load()
                }
                await audioRef.current.play()
                setIsPlaying(true)
                setShowPlayer(true)
                console.log('✅ Nhạc đang phát:', audioRef.current.src)
            }
        } catch (error) {
            console.error('❌ Lỗi khi phát nhạc:', error)
            console.log('Đường dẫn hiện tại:', audioRef.current.src)
            // Nếu auto-play bị chặn, vẫn hiển thị player
            setShowPlayer(true)
            alert('Không thể phát nhạc. Vui lòng kiểm tra file nhạc trong public/music/ hoặc xem console để biết thêm chi tiết.')
        }
    }

    const toggleMute = () => {
        setIsMuted(!isMuted)
    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value)
        setVolume(newVolume)
        setIsMuted(newVolume === 0)
    }

    return (
        <>
            {/* Floating music button */}
            <motion.button
                onClick={togglePlay}
                className="hidden fixed bottom-6 left-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 text-white shadow-lg hover:shadow-xl transition-all duration-300 glow hover:glow-strong flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
                <AnimatePresence mode="wait">
                    {isPlaying ? (
                        <motion.div
                            key="pause"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="play"
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: -180 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-0.5" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Music player panel */}
            <AnimatePresence>
                {showPlayer && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ duration: 0.3 }}
                        className="hidden fixed bottom-24 left-6 z-50 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl min-w-[280px] sm:min-w-[320px]"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                                <Music className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="font-handwriting text-lg text-pink-700 font-semibold">
                                    7 Years
                                </p>
                                <p className="text-xs text-gray-500">Lukas Graham</p>
                            </div>
                            <button
                                onClick={() => setShowPlayer(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Close player"
                            >
                                ×
                            </button>
                        </div>

                        {/* Volume control */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={toggleMute}
                                className="text-pink-600 hover:text-pink-700 transition-colors"
                                aria-label={isMuted ? 'Unmute' : 'Mute'}
                            >
                                {isMuted ? (
                                    <VolumeX className="w-5 h-5" />
                                ) : (
                                    <Volume2 className="w-5 h-5" />
                                )}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="flex-1 h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                                style={{
                                    background: `linear-gradient(to right, #f472b6 0%, #f472b6 ${(isMuted ? 0 : volume) * 100}%, #fce7f3 ${(isMuted ? 0 : volume) * 100}%, #fce7f3 100%)`,
                                }}
                            />
                            <span className="text-xs text-gray-500 w-8 text-right">
                                {Math.round((isMuted ? 0 : volume) * 100)}%
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
