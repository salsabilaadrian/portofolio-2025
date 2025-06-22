'use client'

import { useEffect, useRef, useState } from 'react'
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid'

export default function BackgroundAudio({
  src,
  volume = 0.5,
  delay = 2500,
  className = '' // ✅ bebas override dari luar
}) {
  const audioRef = useRef(null)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = volume
        audioRef.current.play().catch((err) => {
          console.warn('Autoplay blocked:', err)
        })
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [src, volume, delay])

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
    setIsMuted(!isMuted)
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop />
      <button
        onClick={toggleMute}
        className={`p-2 hover:text-gray-900 transition ${className}`}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <SpeakerXMarkIcon className="w-6 h-6 text-gray-800" />
        ) : (
          <SpeakerWaveIcon className="w-6 h-6 text-gray-800" />
        )}
      </button>
    </>
  )
}
