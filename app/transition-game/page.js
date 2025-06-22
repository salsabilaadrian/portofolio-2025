'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SkyHop() {
  const [charX, setCharX] = useState(150);
  const [charY, setCharY] = useState(100);
  const [velocityY, setVelocityY] = useState(0);
  const [platforms, setPlatforms] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const containerRef = useRef(null);
  const router = useRouter();

  // Buat 5 platform dengan posisi horizontal lebih dekat ke tengah dan vertikal lebih longgar
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const screenWidth = window.innerWidth;
    const generated = Array.from({ length: 5 }).map((_, i) => ({
      x: screenWidth * 0.2 + Math.random() * screenWidth * 0.2, // horizontal: dekat tengah
      y: i * 120, // vertical: lebih longgar
      width: 120,
    }));
    setPlatforms(generated);
  }, []);

  // Gravitasi & gerakan vertikal (lebih ringan)
  useEffect(() => {
    if (!gameStarted || finished) return;

    const interval = setInterval(() => {
      setVelocityY((v) => v + 0.3);
      setCharY((y) => {
        const nextY = y - velocityY;
        return nextY < 0 ? 0 : nextY;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [velocityY, gameStarted, finished]);

  // Deteksi tabrakan dan selesai
  useEffect(() => {
    if (!gameStarted || finished || typeof window === 'undefined') return;

    platforms.forEach((p, i) => {
      if (
        charY <= p.y + 10 &&
        charY >= p.y - 10 &&
        charX + 50 > p.x &&
        charX < p.x + p.width
      ) {
        setVelocityY(-12); // bounce lebih tinggi

        if (i === platforms.length - 1) {
          setTimeout(() => setFinished(true), 300);
        }
      }
    });

    if (charY > window.innerHeight) {
      setIsGameOver(true);
      setGameStarted(false);
    }
  }, [charY, charX, platforms, gameStarted, finished]);

  // Keyboard control
  useEffect(() => {
    const handleKey = (e) => {
      if (!gameStarted || finished) return;
      if (e.key === 'ArrowLeft' || e.key === 'a') setCharX((x) => x - 15);
      if (e.key === 'ArrowRight' || e.key === 'd') setCharX((x) => x + 15);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameStarted, finished]);

  // Gyroscope (mobile)
  useEffect(() => {
    const handleTilt = (e) => {
      if (!gameStarted || finished) return;
      const tilt = e.gamma ?? 0;
      if (Math.abs(tilt) > 1) {
        setCharX((x) => x + tilt / 2);
      }
    };
    window.addEventListener('deviceorientation', handleTilt);
    return () => window.removeEventListener('deviceorientation', handleTilt);
  }, [gameStarted, finished]);

  const handleStart = () => {
    setGameStarted(true);
    setIsGameOver(false);
    setCharX(150);
    setCharY(100);
    setVelocityY(0);
  };

  const goToNext = () => {
    router.push('/experience');
  };

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen relative overflow-hidden"
    >
        
      {/* ========== UI ========== */}

      {!gameStarted && !isGameOver && !finished && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-60">
          <button
            onClick={handleStart}
            className="px-8 py-4 bg-green-600 text-white font-bold text-xl rounded-lg hover:bg-green-700 shadow-lg"
          >
            Start Game
          </button>
        </div>
      )}

      {isGameOver && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black bg-opacity-60 space-y-4">
          <div className="text-3xl font-bold text-white bg-red-600 px-6 py-4 rounded-lg shadow-lg">
            Game Over
          </div>
          <button
            onClick={handleStart}
            className="px-6 py-3 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100"
          >
            Restart
          </button>
        </div>
      )}

      {finished && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black bg-opacity-60 space-y-4">
          <div className="text-3xl font-bold text-white bg-blue-600 px-6 py-4 rounded-lg shadow-lg">
            🎉 Kamu selesai!
          </div>
          <button
            onClick={goToNext}
            className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg shadow hover:bg-yellow-500"
          >
            Next Stage
          </button>
        </div>
      )}

      {/* ========== Game Elements ========== */}

      <div
        className="absolute z-10 transition-all duration-75"
        style={{
          left: `${charX}px`,
          bottom: `${charY}px`,
          width: '50px',
          height: '50px',
          filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.4))',
        }}
      >
        <Image src="/images/char.png" alt="char" width={50} height={50} />
      </div>

      {platforms.map((p, idx) => (
        <div
          key={idx}
          className="absolute z-10 h-3 bg-green-600 rounded-md"
          style={{
            left: `${p.x}px`,
            bottom: `${p.y}px`,
            width: `${p.width}px`,
          }}
        />
      ))}
    </div>
  );
}


// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import CloudLayer from '../components/Cloud';

// export default function TransitionGame() {
//   const router = useRouter();
//   const [charY, setCharY] = useState(200);
//   const [charX, setCharX] = useState(100);
//   const [velocity, setVelocity] = useState(0);
//   const [lives, setLives] = useState(3);
//   const [obstacleX, setObstacleX] = useState(100);
//   const gravity = 1.5;
//   const jumpStrength = -10;

//   const [isMouseDown, setIsMouseDown] = useState(false);

//   const charRef = useRef(null);
//   const obstacleRef = useRef(null);

//   // Jump on click
//   const handleClick = () => {
//     setVelocity(jumpStrength);
//   };

//   // Hold to enable horizontal movement
//   useEffect(() => {
//     const handleMouseDown = () => setIsMouseDown(true);
//     const handleMouseUp = () => setIsMouseDown(false);

//     const handleMouseMove = (e) => {
//       if (isMouseDown) {
//         const newX = (e.clientX / window.innerWidth) * 100;
//         setCharX((newX / 100) * window.innerWidth);
//       }
//     };

//     window.addEventListener('mousedown', handleMouseDown);
//     window.addEventListener('mouseup', handleMouseUp);
//     window.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       window.removeEventListener('mousedown', handleMouseDown);
//       window.removeEventListener('mouseup', handleMouseUp);
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, [isMouseDown]);

//   // Game Loop
//   useEffect(() => {
//     const loop = setInterval(() => {
//       setCharY((prev) => {
//         const next = Math.max(0, prev - velocity);
//         return next > 400 ? 400 : next;
//       });
//       setVelocity((v) => v + gravity);
//       setObstacleX((prev) => (prev <= -20 ? 110 : prev - 1.5));
//     }, 30);
//     return () => clearInterval(loop);
//   }, [velocity]);

//   // Collision & Finish
//   useEffect(() => {
//     const check = setInterval(() => {
//       const char = charRef.current?.getBoundingClientRect();
//       const obs = obstacleRef.current?.getBoundingClientRect();
//       const finishLineX = window.innerWidth - 40;

//       if (char?.right >= finishLineX) router.push('/experience');

//       if (
//         char &&
//         obs &&
//         obs.left < char.right &&
//         obs.right > char.left &&
//         obs.bottom > char.top &&
//         char.bottom > obs.top
//       ) {
//         setLives((prev) => {
//           const next = prev - 1;
//           if (next <= 0) router.push('/transition-text');
//           return next;
//         });
//         setObstacleX(110);
//       }
//     }, 100);
//     return () => clearInterval(check);
//   }, [router]);

//   return (
//     <div
//       onClick={handleClick}
//       className="w-screen h-screen bg-white relative overflow-hidden select-none"
//     >
//       {/* Awan + Kota */}
//       <CloudLayer animation="animate-clouds" />
//       <CloudLayer animation="animate-clouds-2" top={40} />
//       <div className="absolute bottom-0 w-full z-0">
//         <Image
//           src="/images/city.png"
//           alt="City"
//           width={1920}
//           height={200}
//           className="w-full h-auto object-contain"
//         />
//       </div>

//       {/* Finish Line */}
//       <div className="absolute top-0 bottom-0 w-2 bg-green-500 right-0 z-10" />

//       {/* Karakter */}
//       <div
//         ref={charRef}
//         className="absolute z-10 transition-all duration-75"
//         style={{
//           bottom: `${charY}px`,
//           left: `${charX}px`,
//           filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.5))',
//         }}
//       >
//         <Image src="/images/char.png" alt="char" width={100} height={100} />
//       </div>

//       {/* Bola Merah */}
//       <div
//         ref={obstacleRef}
//         className="absolute bottom-[40px] z-10 rounded-full"
//         style={{
//           left: `${obstacleX}%`,
//           width: '120px',
//           height: '120px',
//           backgroundColor: '#ff0000',
//           filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.5))',
//         }}
//       ></div>

//       {/* HUD */}
//       <div className="absolute top-4 left-4 text-black font-bold text-lg">❤️ Lives: {lives}</div>
//     </div>
//   );
// }
