'use client'

import { useState, useEffect, useRef } from 'react'
import LandingPage from '@/components/LandingPage'
import LoveLetter from '@/components/LoveLetter'
import Timeline from '@/components/Timeline'
import CountdownTimer from '@/components/CountdownTimer'
import MiniGame from '@/components/MiniGame'
import LoveMeter from '@/components/LoveMeter'
import PhotoAlbum from '@/components/PhotoAlbum'
import MemoryBox from '@/components/MemoryBox'
import FuturePromises from '@/components/FuturePromises'
import LoveQuotes from '@/components/LoveQuotes'
import EndingPage from '@/components/EndingPage'
import FloatingHearts from '@/components/FloatingHearts'
import ClickHeart from '@/components/ClickHeart'
import DarkModeToggle from '@/components/DarkModeToggle'
import MusicPlayer from '@/components/MusicPlayer'
import ConfettiCelebration from '@/components/ConfettiCelebration'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [confettiTrigger, setConfettiTrigger] = useState(false)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const { offsetTop, offsetHeight } = ref
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(index)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className={`min-h-screen transition-colors duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800' 
        : 'bg-gradient-to-br from-rose-pastel via-pink-pastel to-lavender'
    }`}>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <FloatingHearts />
      <ClickHeart />
      <MusicPlayer />
      <ConfettiCelebration trigger={confettiTrigger} onComplete={() => setConfettiTrigger(false)} />
      
      <div className="relative z-20">
        <div ref={(el) => (sectionRefs.current[0] = el)}>
          <LandingPage onNext={() => {
            scrollToSection(1)
            setConfettiTrigger(true)
          }} />
        </div>
        
        <div ref={(el) => (sectionRefs.current[1] = el)}>
          <LoveLetter />
        </div>
        
        <div ref={(el) => (sectionRefs.current[2] = el)}>
          <Timeline />
        </div>
        
        <div ref={(el) => (sectionRefs.current[3] = el)}>
          <CountdownTimer targetDate="2025-12-31" title="Đếm ngược đến ngày kỷ niệm tiếp theo" />
        </div>
        
        <div ref={(el) => (sectionRefs.current[4] = el)}>
          <MiniGame />
        </div>
        
        <div ref={(el) => (sectionRefs.current[5] = el)}>
          <LoveMeter />
        </div>
        
        <div ref={(el) => (sectionRefs.current[6] = el)}>
          <PhotoAlbum />
        </div>
        
        <div ref={(el) => (sectionRefs.current[7] = el)}>
          <MemoryBox />
        </div>
        
        <div ref={(el) => (sectionRefs.current[8] = el)}>
          <FuturePromises />
        </div>
        
        <div ref={(el) => (sectionRefs.current[9] = el)}>
          <LoveQuotes />
        </div>
        
        <div ref={(el) => (sectionRefs.current[10] = el)}>
          <EndingPage />
        </div>
      </div>

      {/* Navigation dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index
                ? 'bg-pink-500 w-8 glow'
                : 'bg-pink-300 hover:bg-pink-400'
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
    </main>
  )
}
