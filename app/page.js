'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import RoleRotate from './components/RoleRotate'
import MenuLinks from './components/MenuLinks'
import Cloud from './components/Cloud'
import BackgroundAudio from './components/Audio'
import SocialLinks from './components/SocialLinks'

const socialLinks = [
  { href: '/CV.pdf', icon: '/logo/cv.svg', alt: 'CV' },
  { href: 'https://wa.me/6285795281890', icon: '/logo/wa.png', alt: 'WhatsApp' },
  {
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=cacasalsabilaadrian@gmail.com',
    icon: '/logo/gmail.png',
    alt: 'Gmail',
  },
  {
    href: 'https://www.linkedin.com/in/salsabila-adrian-a66741226/',
    icon: '/logo/linkedin.png',
    alt: 'LinkedIn',
  },
  {
    href: 'https://medium.com/@salsabilaadrian',
    icon: '/logo/medium.png',
    alt: 'Medium',
  },
  {
    href: 'https://github.com/salsabilaadrian',
    icon: '/logo/github.png',
    alt: 'Github',
  },
]

export default function HomePage() {
   useEffect(() => {
    import('./lib/trackEvent').then(({ trackEvent }) => {
      trackEvent('pageview', '/')
    });
  }, []);
  
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timeout)
  }, [])

  const fadeClass = (delay = 0) =>
    `${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700 ease-out delay-[${delay}ms]`

  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-white text-black font-pressStart">
      <BackgroundAudio
        src="/audio/home.mp3"
        volume={1.0}
        delay={0}
        className="fixed right-4 z-10"
      />

      {/* Cloud Layers */}
      <Cloud top={30} direction="left" speed={120} opacity={0.5} delay={2100} />
      <Cloud top={80} direction="right" speed={50} opacity={0.3} delay={2100} />

      {/* Character */}
      <div className={`hidden z-5 lg:block absolute bottom-[160px] left-3/4 translate-x-1/2 ${fadeClass(600)}`}>
        <Image
          src="/images/char.png"
          alt="Character"
          width={100}
          height={100}
          className="animate-charMove"
          priority
        />
      </div>

      {/* Content */}
      <div className={`relative z-5 max-w-7xl mx-auto pt-28 px-6 grid gap-8 grid-cols-1 lg:grid-cols-3 ${fadeClass(900)}`}>
        <div className="flex flex-col gap-2">
          <RoleRotate />
          <SocialLinks links={socialLinks} />
        </div>
        <div className="lg:pl-20 lg:col-span-2">
          <p className="text-xl sm:text-2xl xl:text-4xl mb-2">Welcome, Player!</p>
          <p className="text-sm sm:text-lg xl:text-2xl pb-5">Ready to embark on a journey through the quests?</p>
          <p className="text-sm sm:text-lg xl:text-2xl mb-4">Choose your stage and begin the adventure!</p>
          <MenuLinks />
        </div>
      </div>

      {/* Ground */}
      <div className={`absolute bottom-0 w-full ${fadeClass(200)}`}>
        <Image
          src="/images/ground.png"
          alt="Ground"
          width={1600}
          height={200}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </main>
  )
}
