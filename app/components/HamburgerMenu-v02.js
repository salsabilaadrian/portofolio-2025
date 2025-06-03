'use client'; 

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HamburgerMenu({ menuItems = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setIsImageLoaded(false); // reset ketika dibuka
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Preload Popup Image */}
      <div className="hidden">
        <Image
          src="/images/popup.png"
          alt="Preload Popup"
          width={400}
          height={500}
          priority
        />
      </div>

      {/* Tombol Hamburger */}
      <button
        onClick={handleOpen}
        className="fixed top-4 right-4 w-10 h-10 z-50"
        aria-label="Open Menu"
      >
        <Image
          src="/images/hamburger.png"
          alt="Hamburger"
          fill
          className="object-contain"
          priority
        />
      </button>

      {/* Popup */}
      {isOpen && (
        <>
          {/* Latar belakang blur putih */}
          <div
            className="fixed inset-0 bg-white/80 z-40 backdrop-blur-sm transition-opacity duration-300"
            onClick={handleClose}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative w-[300px] h-[400px] sm:w-[400px] sm:h-[500px]">
              <Image
                src="/images/popup.png"
                alt="Popup Menu"
                fill
                className="object-contain"
                onLoadingComplete={() => setIsImageLoaded(true)}
                priority
              />
              {/* Tombol Close */}
              <button
                onClick={handleClose}
                className="absolute top-16 right-9 xl:top-18 xl:right-14 w-6 h-6"
                aria-label="Close Menu"
              >
                <span className="w-full h-full text-white text-3xl xl:text-5xl text-center leading-5 cursor-pointer">×</span>
              </button>

              {/* Menu Dinamis, tampil setelah gambar termuat */}
              {isImageLoaded && (
                <div className="absolute left-5 top-20 xl:left-10 w-full space-y-3 px-4">
                  {menuItems.map((item, index) => {
                    if (item.isPDF || item.isExternal) {
                      return (
                        <a
                          key={index}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-sm xl:text-lg text-gray-500 hover:text-white transition"
                        >
                          &gt; {item.label}
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={index}
                        href={item.href}
                        className="block text-sm xl:text-lg text-gray-500 hover:text-white transition"
                      >
                       &gt; {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}