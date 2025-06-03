'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { preloadPage } from '../utils/preloadHelper';

export default function PageTransitionLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);

    // Preload the target page
    preloadPage(pathname);

    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed bg-white inset-0 z-50 flex items-center justify-center bg-transparent">
      {/* Awan kecil dan responsif */}
      <div className="absolute top-0 left-0 w-full h-24 z-10 overflow-hidden pointer-events-none">
        <div className="w-[150%] h-full animate-clouds relative">
          <Image
            src="/images/cloud.png"
            alt="Clouds"
            fill
            className="object-contain opacity-70"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* Progress Container */}
      <div className="z-30 flex flex-col items-center xl:pb-50">
        {/* Karakter */}
        <div className="mb-4">
          <Image
            src="/images/char.png"
            alt="Character"
            width={64}
            height={64}
            className="animate-bounce"
            priority
          />
        </div>

        {/* Progress Bar */}
        <div className="text-center">
          <p className="text-lg font-bold text-gray-700 animate-pulse">Loading</p>
          <div className="w-64 max-w-[80vw] h-3 bg-gray-300 rounded-full mt-2 overflow-hidden relative">
            <div className="absolute inset-0 w-full h-full animate-progress bg-gradient-to-r from-blue-900 to-blue-300" />
          </div>
        </div>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 w-full z-20">
        <Image
          src="/images/ground.png"
          alt="Ground"
          width={1920}
          height={200}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </div>
  );
}
