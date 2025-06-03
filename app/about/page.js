'use client';

import Image from 'next/image';
import { useState } from 'react';
import { aboutPages } from '../data/aboutPages';

export default function AboutPage() {
  const [page, setPage] = useState(0);
  const totalPages = aboutPages.length;
  const current = aboutPages[page];

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handleBack = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <div className="relative bg-blue-100 w-screen h-screen bg-cover bg-center flex items-center justify-center overflow-hidden">

      {/* BACKGROUND AWAN */}
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

      {/* BACKGROUND CITY */}
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

      {/* KONTEN UTAMA FIX 1000x500 */}
      <div className="relative z-20 w-[1000px] h-[500px] bg-white/80 p-6 rounded-xl shadow-lg flex flex-col justify-between overflow-hidden">
        {/* Gambar dan Konten */}
        <div className={`flex ${current.photoPosition === 'right' ? 'flex-row-reverse' : 'flex-row'} items-start gap-6`}>
          {current.photoSrc && (
            <Image
              src={current.photoSrc}
              alt="Section Image"
              width={current.photoSize?.width || 120}
              height={current.photoSize?.height || 120}
              className="rounded-lg"
            />
          )}
          <div className="flex-1 text-sm">{current.content}</div>
        </div>

        {/* Info */}
        {current.info && (
          <div className="mt-2 text-sm">{current.info}</div>
        )}

        {/* Tombol navigasi */}
        <div className="flex gap-4 mt-4 justify-end w-full">
          <button
            onClick={handleBack}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50 pixel"
          >
            &larr; Back
          </button>
          <button
            onClick={handleNext}
            disabled={page === totalPages - 1}
            className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50 pixel"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
