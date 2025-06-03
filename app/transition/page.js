'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const storyPages = [
  {
    text: `In a bustling city of Jakarta,\na young Computer Science explorer emerged—equipped with critical thinking, analytical prowess, and a flair for solving digital puzzles.`,
  },
  {
    text: `Meet our hero, a problem-solver, a team player, and a curious mind passionate about transforming business needs into impactful solutions.`,
  },
]

export default function IntroPage() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isFinished, setIsFinished] = useState(false)
  const [isLocked, setIsLocked] = useState(false)

  const intervalRef = useRef(null)
  const textRef = useRef('')
  const indexRef = useRef(0)

  useEffect(() => {
    if (!storyPages[currentPage]) return

    // Hentikan interval sebelumnya
    if (intervalRef.current) clearInterval(intervalRef.current)

    const fullText = storyPages[currentPage].text
    textRef.current = fullText
    indexRef.current = 0
    setDisplayedText('')
    setIsFinished(false)
    setIsLocked(true)

    setTimeout(() => {
      intervalRef.current = setInterval(() => {
        const currentIndex = indexRef.current
        if (currentIndex < textRef.current.length) {
          setDisplayedText((prev) => prev + textRef.current[currentIndex])
          indexRef.current += 1
        } else {
          clearInterval(intervalRef.current)
          setIsFinished(true)
          setIsLocked(false)
        }
      }, 50)
    }, 2500);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [currentPage])

  const handleNext = () => {
    if (!isFinished || isLocked) return
    if (currentPage < storyPages.length - 1) {
      setCurrentPage((prev) => prev + 1)
    } else {
      router.push('/about')
    }
  }

  const handleBack = () => {
    if (isLocked || currentPage === 0) return
    setCurrentPage((prev) => prev - 1)
  }

  const handleSkip = () => {
    router.push('/about')
  }

  const handleGoHome = () => {
    router.push('/')
  }

  const handleTextClick = () => {
    if (!isFinished) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setDisplayedText(textRef.current)
      setIsFinished(true)
      setIsLocked(false)
    }
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-blue-100">
      <div className="absolute bottom-0 w-full z-0">
        <Image
          src="/images/city.png"
          alt="City Background"
          width={1920}
          height={200}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <button
          onClick={handleGoHome}
          className="absolute top-5 left-5 px-6 py-2 rounded hover:bg-gray-600"
        >
          Back to Home
        </button>

        <button
          onClick={handleSkip}
          className="absolute top-5 right-5 px-6 py-2 rounded hover:bg-gray-600"
        >
          Skip
        </button>

        <div
          onClick={handleTextClick}
          className="max-w-3xl cursor-pointer select-none"
        >
          <p className="whitespace-pre-wrap text-lg md:text-xl leading-relaxed pb-80">
            {displayedText}
            {!isFinished && <span className="blinking-cursor">|</span>}
          </p>
        </div>

        <div className="absolute bottom-5 right-5 flex gap-4">
          {currentPage > 0 && (
            <button
              onClick={handleBack}
              className="px-6 py-2 pixel-button bg-gray-600 rounded hover:bg-gray-500"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!isFinished}
            className={`px-6 py-2 pixel-button rounded ${
              isFinished
                ? 'bg-blue-600 hover:bg-blue-500'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
