// src/components/CustomCursor.js
'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      className="fixed z-50 pointer-events-none transition-transform duration-75"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Ganti src ini dengan cursor lucu kamu */}
      <img src="/images/cursor.png" alt="cursor" className="w-10 h-10" />
    </div>
  )
}
