'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, Heart, Play, Video } from 'lucide-react'
import Image from 'next/image'

interface MediaItem {
  id: number
  url: string
  title: string
  type: 'image' | 'video'
}

// Tất cả ảnh và video từ public/images
const mediaItems: MediaItem[] = [
  // Ảnh
  {
    id: 1,
    url: '/images/z7458182825864_4b6635dd8797992f0c65e6b6a068a3d9.jpg',
    title: 'Đi teambuilding nè 2 đứa dễ thường hè 🤣',
    type: 'image',
  },
  {
    id: 2,
    url: '/images/z7458182832545_d8086ed09d28a60eb53a2cf9f2a3d3d9.jpg',
    title: 'Uống thử bia Lào nè 😋',
    type: 'image',
  },
  {
    id: 3,
    url: '/images/z7458182834617_2fe4ed29d60122be58d261b1fd62880d.jpg',
    title: 'Đi tình nguyện nè chưa biết gì mà hạnh phúc ghê trời',
    type: 'image',
  },
  {
    id: 4,
    url: '/images/z7458182838502_3e4ee5c9d88d2b7ec8277501f769acbb.jpg',
    title: 'Đi chơi ở Huế nè anh thì đẹp trai em thì cầm ly coca :)))',
    type: 'image',
  },
  {
    id: 5,
    url: '/images/z7458182846011_bf1677556df392bdaa750be85fb00888.jpg',
    title: 'Đi lên Khe Sanh mệt quá dừng lại uống nước 1 tí giờ nhìn lại nhớ ghê :)))',
    type: 'image',
  },
  {
    id: 6,
    url: '/images/z7458182857484_6daeb66c461061888619ee50a5b62748.jpg',
    title: 'Huế mộng mơ nè!!!',
    type: 'image',
  },
  {
    id: 7,
    url: '/images/z7458182876806_9fcf04dc7c84bee72bdabb536ee388c1.jpg',
    title: 'Ngủ nè kkk',
    type: 'image',
  },
  {
    id: 8,
    url: '/images/z7458182883226_735653ffcd3fda6d188ec5d62968cbd0.jpg',
    title: 'Khe Sanh nè!!',
    type: 'image',
  },
  // Video
  {
    id: 14,
    url: '/images/7458182852575.mp4',
    title: 'Nhà anh Mạnh nè',
    type: 'video',
  },
  {
    id: 15,
    url: '/images/7458182866219.mp4',
    title: 'Team building nữa nè',
    type: 'video',
  },
  {
    id: 16,
    url: '/images/7458182872835.mp4',
    title: 'Quay tiktok đồ ha',
    type: 'video',
  },
  {
    id: 17,
    url: '/images/7458182881150.mp4',
    title: 'Hạnh phúc he',
    type: 'video',
  },
  {
    id: 18,
    url: '/images/7458182887025.mp4',
    title: 'Cho dui kk',
    type: 'video',
  },
  {
    id: 19,
    url: '/images/7458182896595.mp4',
    title: 'Cho dui luôn kk',
    type: 'video',
  },
]

export default function PhotoAlbum() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)

  return (
    <div className="min-h-screen py-20 px-4 relative">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-romantic text-pink-600 mb-3 sm:mb-4 text-shadow-lg px-2">
          Album Kỷ Niệm 📷
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl font-handwriting text-pink-700 px-2">
          Những khoảnh khắc đẹp của chúng ta
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onClick={() => setSelectedMedia(item)}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl bg-white">
                {item.type === 'image' ? (
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <video
                    src={item.url}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.currentTarget
                      video.play().catch(() => { })
                    }}
                    onMouseLeave={(e) => {
                      const video = e.currentTarget
                      video.pause()
                      video.currentTime = 0
                    }}
                  />
                )}

                {/* Video play icon */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                  </div>
                )}

                {/* Video badge */}
                {item.type === 'video' && (
                  <div className="absolute top-2 right-2 bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-handwriting flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    Video
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-handwriting text-lg">{item.title}</p>
                </div>

                {/* Floating hearts on hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(3)].map((_, i) => (
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
                        duration: 1.5,
                        delay: i * 0.2,
                        repeat: Infinity,
                      }}
                    >
                      <Heart className="w-4 h-4 fill-pink-300" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full max-h-[90vh] mx-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute -top-10 sm:-top-12 right-0 sm:right-0 text-white hover:text-pink-300 transition-colors z-10 p-2"
              >
                <X className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                {selectedMedia.type === 'image' ? (
                  <Image
                    src={selectedMedia.url}
                    alt={selectedMedia.title}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <video
                    src={selectedMedia.url}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              <p className="text-white text-center mt-3 sm:mt-4 font-handwriting text-lg sm:text-xl md:text-2xl px-2">
                {selectedMedia.title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
