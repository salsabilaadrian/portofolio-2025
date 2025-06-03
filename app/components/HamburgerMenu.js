"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HamburgerMenu({ menuItems = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Tombol Hamburger */}
      <button
        onClick={() => setIsOpen(true)}
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

      {/* Overlay Menu */}
      {isOpen && (
        <>
          {/* Latar belakang blur */}
          <div
            className="fixed inset-0 bg-white/20 z-40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Popup Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative bg-gray-300 border-[4px] border-black w-[300px] sm:w-[400px] px-6 pt-8 pb-6 shadow-sm shadow-black flex flex-col items-start text-sm text-black rounded-4xl">
              {/* Tombol Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 w-8 h-8 rounded-full bg-black hover:bg-gray-300 text-white text-lg leading-none flex items-center justify-center shadow-md"
                aria-label="Close Menu"
              >
                ✕
              </button>

              {/* Judul atau Header */}
              <div className="text-lg pt-2 font-bold mb-4 w-full pb-2">
                MENU
              </div>

              {/* Daftar Menu */}
              <div className="space-y-2 w-full">
                {menuItems.map((item, index) => {
                  const linkClass =
                    "block hover:text-blue-700 text-black text-left transition-all";

                  if (item.isPDF || item.isExternal) {
                    return (
                      <a
                        key={index}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        ▸ {item.label}
                      </a>
                    );
                  }

                  return (
                    <Link key={index} href={item.href} className={linkClass}>
                      ▸ {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
