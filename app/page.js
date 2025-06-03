'use client';

import Image from 'next/image';
import RoleRotate from './components/RoleRotate';
import MenuLinks from './components/MenuLinks';
import HamburgerMenu from './components/HamburgerMenu';

export default function HomePage() {
  const menu = [
    { label: 'CV', href: '/cv.pdf', isPDF: true },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/salsabila-adrian-a66741226/', isExternal: true },
    { label: 'Medium', href: 'https://medium.com/@salsabilaadrian', isExternal: true },
    { label: 'Github', href: 'https://github.com/', isExternal: true }
  ];

  return (
    <main>
      <HamburgerMenu menuItems={menu} />

    {/* Background Ground */}
      <div className="absolute bottom-0 w-full z-0">
          <Image
            src="/images/ground.png"
            alt="Ground"
            width={1920}
            height={200}
            className="w-full h-auto object-contain"
            priority
        />
      </div>

      <div className="relative w-full h-screen overflow-hidden p-5">
        {/* Character */}
        <div className="hidden lg:block absolute bottom-[160px] left-1/2 transform -translate-x-1/2 z-10">
          <Image
            src="/images/char.png"
            alt="Character"
            width={100}
            height={100}
            className="animate-charMove"
            priority
          />
        </div>

        {/* Content Grid */}
        <div className="relative z-20 grid sm:grid-cols-2 xl:grid-cols-3 gap-4 p-5 xl:p-10">
          <RoleRotate />
          <div className="col-span-2 xl:pl-20">
            <p className="text-2xl xl:text-5xl mb-2">Welcome, Player!</p>
            <p className="text-lg xl:text-2xl pb-5">
              Ready to embark on a journey through the quests?
            </p>
            <p className="text-lg xl:text-2xl mb-4">
              Choose your stage and begin the adventure!
            </p>
            <MenuLinks />
          </div>
        </div>
      </div>
    </main>
  );
}
