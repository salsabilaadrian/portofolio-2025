'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Cloud({
  top = 0,
  direction = 'left',
  speed = 150,
  opacity = 0.7,
  zIndex = 0,
  delay = 0,          // optional delay before fade in (ms)
  duration = 700      // optional fade in duration (ms)
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  const animationName = direction === 'left' ? 'cloud-move-left' : 'cloud-move-right'

  const fadeClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
  const transitionClass = `transition-all ease-out duration-[${duration}ms]`

  return (
    <div
      className={`absolute w-full h-24 overflow-hidden pointer-events-none ${fadeClass} ${transitionClass}`}
      style={{ top, zIndex }}
    >
      <div
        className="w-[150%] h-full relative"
        style={{
          animation: `${animationName} ${speed}s linear infinite`,
        }}
      >
        <Image
          src="/images/cloud.png"
          alt="Cloud"
          fill
          className="object-contain"
          style={{ opacity }}
          sizes="100vw"
          priority
        />
      </div>
    </div>
  )
}
