'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import HamburgerMenu from '../components/HamburgerMenu';
import Cloud from '../components/Cloud';
import BackgroundAudio from '../components/Audio';
import { certificateData } from '../data/certificateData.js';

export default function CertificatePage() {
  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'page-view',
        url: '/certificate'
      })
    })
  }, [])
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const menu = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Experience', href: '/experience' },
    { label: 'Porto', href: '/porto' },
    { label: 'Certificate', href: '/certificate' }
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind sm = 640px
    };

    handleResize(); // initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 2500);
    return () => clearTimeout(timeout);
  }, []);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % certificateData.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + certificateData.length) % certificateData.length);
  };

  const current = certificateData[currentIndex];

  return (
    <div className="relative w-screen h-screen bg-cover bg-center flex items-center justify-center overflow-hidden">
      <HamburgerMenu menuItems={menu} />
      <BackgroundAudio src="/audio/certificate.mp3" volume={1.0} delay={2500} className='fixed top-4 right-10 mr-4'/>

      <Cloud top={0} direction="left" speed={150} opacity={0.2} delay={2725} />
      <Cloud top={25} direction="right" speed={40} opacity={0.2} delay={2725} />
      <Cloud top={120} direction="left" speed={100} opacity={0.5} delay={2725} />
      <Cloud top={170} direction="left" speed={50} opacity={0.3} delay={2725} />
      <Cloud top={250} direction="right" speed={100} opacity={0.5} delay={2725} />

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

      <div
  className={`relative z-20 w-[90%] max-w-screen-md flex flex-col items-center justify-center px-6 py-8 space-y-4 transition-all duration-700 ease-out transform
  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
>
  {/* Gambar */}
  <Image
    src={current.image}
    alt={current.alt}
    width={600}
    height={400}
    className="rounded shadow-md object-contain shadow-xl shadow-black/60"
  />

  {/* Tombol */}
  {isMobile ? (
    <div className="flex gap-4 mt-4">
      <button
        onClick={prev}
        className="text-lg shadow-2xl shadow-black border border-gray-500 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        {'<'}
      </button>
      <button
        onClick={next}
        className="text-lg shadow-2xl shadow-black border border-gray-500 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        {'>'}
      </button>
    </div>
  ) : (
    <div className="flex items-center justify-center gap-6 mt-4">
      <button
        onClick={prev}
        className="text-lg shadow-2xl shadow-black border border-gray-500 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        {'<'}
      </button>
      <button
        onClick={next}
        className="text-lg shadow-2xl shadow-black border border-gray-500 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        {'>'}
      </button>
    </div>
  )}
</div>

    </div>
  );
}
