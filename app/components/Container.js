'use client';

import Image from 'next/image';
import React from 'react';

export default function Container({
  photoSrc,
  photoAlt = '',
  photoSize = {},
  photoPosition = 'left',
  content,
  info,
  onNext,
  onBack,
  showNext = true,
  showBack = true,
}) {
  const isHorizontal = photoPosition === 'left' || photoPosition === 'right';
  const hasPhoto = !!photoSrc;

  return (
    <div
      className={`mx-auto bg-white/90 p-6 shadow-lg rounded-xl flex flex-col justify-between
        w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-3xl
        h-auto lg:h-[700px]
      `}
    >
      <div className={`flex ${isHorizontal ? 'flex-row' : 'flex-col'} items-center gap-6`}>
        {/* Photo on Left or Top */}
        {hasPhoto && (photoPosition === 'left' || photoPosition === 'top') && (
          <div className="flex-shrink-0">
            <Image
              src={photoSrc}
              alt={photoAlt}
              width={photoSize.width}
              height={photoSize.height}
              className="rounded-lg object-cover"
              priority
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 text-gray-800">
          <div className="mb-4">{content}</div>
          {info && <div className="text-sm text-gray-600">{info}</div>}
        </div>

        {/* Photo on Right or Bottom */}
        {hasPhoto && (photoPosition === 'right' || photoPosition === 'bottom') && (
          <div className="flex-shrink-0">
            <Image
              src={photoSrc}
              alt={photoAlt}
              width={photoSize.width}
              height={photoSize.height}
              className="rounded-lg object-cover"
              priority
            />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        {showBack && (
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50 pixel"
          >
            &larr; Back
          </button>
        )}
        {showNext && (
          <button
            onClick={onNext}
            className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50 pixel"
          >
            Next &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
