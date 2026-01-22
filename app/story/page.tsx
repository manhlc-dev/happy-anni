'use client'

import { useState, useEffect, useRef } from 'react'
import WelcomeQuestion from '@/components/WelcomeQuestion'
import CinematicSection from '@/components/CinematicSection'
import LandingPage from '@/components/LandingPage'
import BurnableLetter from '@/components/BurnableLetter'
import Timeline from '@/components/Timeline'
import CountdownTimer from '@/components/CountdownTimer'
import MemoryQuizGame from '@/components/MemoryQuizGame'
import MiniGame from '@/components/MiniGame'
import PhotoAlbum from '@/components/PhotoAlbum'
import MemoryBox from '@/components/MemoryBox'
import FuturePromises from '@/components/FuturePromises'
import LoveQuotes from '@/components/LoveQuotes'
import TimeCapsule from '@/components/TimeCapsule'
import EndingPage from '@/components/EndingPage'
import FloatingHearts from '@/components/FloatingHearts'
import ClickHeart from '@/components/ClickHeart'
import DarkModeToggle from '@/components/DarkModeToggle'
import MusicPlayer from '@/components/MusicPlayer'
import LogoHeart from '@/components/LogoHeart'
import ConfettiCelebration from '@/components/ConfettiCelebration'

export default function StoryPage() {
    const [viewMode, setViewMode] = useState<'together' | 'alone' | null>(null)
    const [darkMode, setDarkMode] = useState(false)
    const [currentChapter, setCurrentChapter] = useState(0)
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
                        setCurrentChapter(index)
                    }
                }
            })
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const chapters = [
        { title: 'Khởi đầu', number: 1 },
        { title: 'Thư tình', number: 2 },
        { title: 'Hành trình', number: 3 },
        { title: 'Đếm ngược', number: 4 },
        { title: 'Trò chơi kỷ niệm', number: 5 },
        { title: 'Hộp quà', number: 6 },
        { title: 'Khoảnh khắc', number: 7 },
        { title: 'Hộp kỷ niệm', number: 8 },
        { title: 'Lời hứa', number: 9 },
        { title: 'Câu nói yêu thương', number: 10 },
        { title: 'Time Capsule', number: 11 },
        { title: 'Kết thúc', number: 12 },
    ]

    if (viewMode === null) {
        return <WelcomeQuestion onAnswer={setViewMode} />
    }

    return (
        <main className={`min-h-screen transition-colors duration-500 ${darkMode
            ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800'
            : 'bg-gradient-to-br from-rose-pastel via-pink-pastel to-lavender'
            }`}>
            <LogoHeart />
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            <FloatingHearts />
            <ClickHeart />
            <MusicPlayer />
            <ConfettiCelebration trigger={confettiTrigger} onComplete={() => setConfettiTrigger(false)} />

            <div className="relative z-20">
                <CinematicSection
                    chapter={chapters[0].title}
                    chapterNumber={chapters[0].number}
                    isActive={currentChapter === 0}
                >
                    <div ref={(el) => { sectionRefs.current[0] = el }}>
                        <LandingPage onNext={() => {
                            setConfettiTrigger(true)
                            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
                        }} />
                    </div>
                </CinematicSection>

                <CinematicSection
                    chapter={chapters[1].title}
                    chapterNumber={chapters[1].number}
                    isActive={currentChapter === 1}
                >
                    <div ref={(el) => { sectionRefs.current[1] = el }}>
                        <BurnableLetter />
                    </div>
                </CinematicSection>

                <CinematicSection
                    chapter={chapters[2].title}
                    chapterNumber={chapters[2].number}
                    isActive={currentChapter === 2}
                >
                    <div ref={(el) => { sectionRefs.current[2] = el }}>
                        <Timeline />
                    </div>
                </CinematicSection>

                <CinematicSection
                    chapter={chapters[3].title}
                    chapterNumber={chapters[3].number}
                    isActive={currentChapter === 3}
                >
                    <div ref={(el) => { sectionRefs.current[3] = el }}>
                        <CountdownTimer
                            targetDate="2025-12-31"
                            title={viewMode === 'together'
                                ? 'Đếm ngược đến ngày kỷ niệm tiếp theo cùng nhau'
                                : 'Đếm ngược đến ngày kỷ niệm tiếp theo'
                            }
                        />
                    </div>
                </CinematicSection>

                <CinematicSection
                    chapter={chapters[4].title}
                    chapterNumber={chapters[4].number}
                    isActive={currentChapter === 4}
                >
                    <div ref={(el) => { sectionRefs.current[4] = el }}>
                        <MemoryQuizGame />
                    </div>
                </CinematicSection>

                <CinematicSection
                    chapter={chapters[5].title}
                    chapterNumber={chapters[5].number}
                    isActive={currentChapter === 5}
                >
                    <div ref={(el) => { sectionRefs.current[5] = el }}>
                        <MiniGame />
                    </div>
                </CinematicSection>

                <CinematicSection
                    chapter={chapters[6].title}
                    chapterNumber={chapters[6].number}
                    isActive={currentChapter === 6}
                >
                    <div ref={(el) => { sectionRefs.current[6] = el }}>
                        <PhotoAlbum />
                    </div>
                </CinematicSection>

                <CinematicSection
                    chapter={chapters[7].title}
                    chapterNumber={chapters[7].number}
                    isActive={currentChapter === 7}
                >
                    <div ref={(el) => { sectionRefs.current[7] = el }}>
                        <MemoryBox />
                    </div>
                </CinematicSection>

                <CinematicSection
                    chapter={chapters[8].title}
                    chapterNumber={chapters[8].number}
                    isActive={currentChapter === 8}
                >
                    <div ref={(el) => { sectionRefs.current[8] = el }}>
                        <FuturePromises />
                    </div>
                </CinematicSection>

                <CinematicSection
                    chapter={chapters[9].title}
                    chapterNumber={chapters[9].number}
                    isActive={currentChapter === 9}
                >
                    <div ref={(el) => { sectionRefs.current[9] = el }}>
                        <LoveQuotes />
                    </div>
                </CinematicSection>

                <CinematicSection
                    chapter={chapters[10].title}
                    chapterNumber={chapters[10].number}
                    isActive={currentChapter === 10}
                >
                    <div ref={(el) => { sectionRefs.current[10] = el }}>
                        <TimeCapsule
                            targetDate="2026-12-31"
                            message={viewMode === 'together'
                                ? `Gửi em yêu dấu,\n\nMột năm đã trôi qua kể từ ngày em đọc tin nhắn này. Anh hy vọng chúng ta vẫn đang ở bên nhau, vẫn yêu thương nhau như ngày đầu.\n\nNếu em đang đọc điều này, có nghĩa là chúng ta đã cùng nhau vượt qua một năm đầy kỷ niệm. Anh cảm ơn em vì đã ở bên anh.\n\nYêu em nhiều,\nAnh của em ❤️`
                                : `Gửi em yêu dấu,\n\nMột năm đã trôi qua. Anh hy vọng em vẫn nhớ đến anh, vẫn giữ những kỷ niệm đẹp trong tim.\n\nNếu em đang đọc điều này, anh muốn nói rằng anh vẫn yêu em như ngày đầu. Dù có chuyện gì xảy ra, em vẫn là người đặc biệt nhất trong lòng anh.\n\nYêu em nhiều,\nAnh của em ❤️`
                            }
                        />
                    </div>
                </CinematicSection>

                <CinematicSection
                    chapter={chapters[11].title}
                    chapterNumber={chapters[11].number}
                    isActive={currentChapter === 11}
                >
                    <div ref={(el) => { sectionRefs.current[11] = el }}>
                        <EndingPage />
                    </div>
                </CinematicSection>
            </div>
        </main>
    )
}
