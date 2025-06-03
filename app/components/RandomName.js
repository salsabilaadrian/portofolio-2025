'use client';

import { useEffect, useState } from 'react';

const NAMES = ['Salsabila Adrian', 'Caca', 'Sasa'];

export default function RandomName() {
  const [displayedText, setDisplayedText] = useState('');
  const [nameIndex, setNameIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentName = NAMES[nameIndex];

    if (charIndex < currentName.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentName[charIndex]);
        setCharIndex(charIndex + 1);
      }, 100); // kecepatan ketik per huruf

      return () => clearTimeout(timeout);
    } else {
      // Setelah selesai ketik nama, tunggu lalu reset
      const waitBeforeNext = setTimeout(() => {
        setCharIndex(0);
        setDisplayedText('');
        setNameIndex((prev) => (prev + 1) % NAMES.length);
      }, 2000); // tunggu 2 detik sebelum ganti nama

      return () => clearTimeout(waitBeforeNext);
    }
  }, [charIndex, nameIndex]);

  return (
    <span className="inline-block border-r-2 border-black pr-1 animate-pulse">
      {displayedText}
    </span>
  );
}
