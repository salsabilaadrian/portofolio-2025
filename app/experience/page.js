'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { experienceData } from '../data/experienceData';
import HamburgerMenu from '../components/HamburgerMenu';
import Cloud from '../components/Cloud';
import BackgroundAudio from '../components/Audio';
import { trackEvent } from '../lib/trackEvent'
import {
  DocumentIcon,
  GlobeAltIcon,
  CodeBracketIcon,
  LinkIcon
} from '@heroicons/react/24/solid'

export default function ExperiencePage() {
  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'page-view',
        url: '/experience'
      })
    })
  }, [])

  const [page, setPage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const [openItems, setOpenItems] = useState({});

  const current = experienceData[page];
  const isLastPage = page === experienceData.length - 1;

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleItem = (key) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 2500);
    return () => clearTimeout(timeout);
  }, []);

  const menu = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Experience', href: '/experience' },
    { label: 'Porto', href: '/porto' },
    { label: 'Certificate', href: '/certificate' }
  ];

  function getIconForLabel(label) {
  const lower = label.toLowerCase()

  if (lower.includes('certificate')) return <DocumentIcon className="w-4 h-4 inline-block mr-1" />
  if (lower.includes('project') || lower.includes('demo') || lower.includes('preview')) return <GlobeAltIcon className="w-4 h-4 inline-block mr-1" />
  if (lower.includes('github')) return <CodeBracketIcon className="w-4 h-4 inline-block mr-1" />
  
  // default icon
  return <LinkIcon className="w-4 h-4 inline-block mr-1" />
}

  return (
    <div className="relative w-screen h-screen bg-cover bg-center flex items-center justify-center overflow-hidden">
      <HamburgerMenu menuItems={menu} />
      <BackgroundAudio src="/audio/about.mp3" volume={1.0} delay={2500} className='fixed top-4 right-10 mr-4'/>
      
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

      <div className={`relative z-20 w-[90%] max-w-screen-md flex flex-col items-stretch rounded-xl shadow-2xl shadow-black/60 bg-gray-100/80 overflow-hidden transition-all duration-700 ease-out transform
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <div className={`flex items-center justify-between border-b border-gray-300 bg-gray-200/70 px-4 pt-4 transition-all duration-700 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="flex gap-2">
            {experienceData.map((item, index) => (
              <button
                key={index}
                onClick={() => setPage(index)}
                className={`px-4 py-3 rounded-t-md border border-gray-400 border-b-0
                  hover:bg-white transition-all duration-300 text-sm
                  ${index === page ? 'bg-white text-black font-semibold shadow-inner' : 'bg-gray-100 text-gray-400'}`}
              >
                {item.year}
              </button>
            ))}
          </div>

          <Link
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center gap-2 text-sm px-3 py-2 mb-1 border border-gray-400 rounded-md hover:bg-white bg-gray-100 text-gray-700 hover:text-black font-medium"
            onClick={() => trackEvent('download-cv', '/cv.pdf')}
          >
            <span>↓</span>
          </Link>
        </div>

        <div className={`relative h-[500px] px-6 py-4 overflow-y-auto text-sm space-y-4 transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="top-4 left-4 flex gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(0, prev - 1))}
              disabled={page === 0}
              className="text-lg cursor-pointer border border-gray-500 rounded-md px-3 py-1 hover:bg-gray-200 disabled:opacity-30"
            >
              {'<'}
            </button>
            <button
              onClick={() => setPage((prev) => Math.min(experienceData.length - 1, prev + 1))}
              disabled={isLastPage}
              className="text-lg cursor-pointer border border-gray-500 rounded-md px-3 py-1 hover:bg-gray-200 disabled:opacity-30"
            >
              {'>'}
            </button>
          </div>

          {isLastPage && (
            <div className="absolute top-4 right-4">
              <Link href="/porto">
                <button className="text-lg cursor-pointer border border-gray-500 rounded-md px-3 py-1 hover:bg-gray-200">
                  Next
                </button>
              </Link>
            </div>
          )}

          {Object.entries(current.sections).map(([sectionTitle, items], idx) => (
            <div key={idx} className="border border-gray-300 rounded-md bg-white overflow-hidden">
              <button
                className="w-full text-left px-4 py-2 bg-gray-200 font-semibold flex justify-between items-center"
                onClick={() => toggleSection(sectionTitle)}
              >
                <span>{sectionTitle}</span>
                <span>{openSections[sectionTitle] ? '▾' : '▸'}</span>
              </button>

              {openSections[sectionTitle] && (
                <ul className="divide-y divide-gray-200">
                  {items.map((item, index) => {
                    const key = `${sectionTitle}-${index}`;
                    const isOpen = openItems[key];

                    return (
                      <li key={key} className="px-4 py-3">
                        <button
                          onClick={() => toggleItem(key)}
                          className="w-full text-left font-medium flex justify-between items-center"
                        >
                          <div className="flex gap-4">
                            <span>
                              <h1 className='font-bold pb-1'>{item.title}</h1>
                              <p className="text-gray-800">{item.position}</p>
                              <p className="text-gray-800/60">({item.date})</p>
                              <p className="italic text-gray-600">{item.location}</p>
                            </span>
                          </div>
                          <span>{isOpen ? '▾' : '▸'}</span>
                        </button>

                        {isOpen && (
                          <div className="mt-2 text-sm space-y-2 pt-4 space-y-4">
                            <ul className="list-disc list-inside space-y-6 text-xs">
                              {item.description.map((desc, i) => (
                                <li key={i} className="text-gray-800">
                                  <span className="font-bold text-gray-600">{desc.subtitle}</span>
                                  <p className="pt-2 text-gray-500">{desc.subdesc}</p>
                                </li>
                              ))}
                              {item.links?.length > 0 && (
                                <div className="pt-2 text-gray-600">
                                  <strong>Links:</strong>
                                  <ul className="list-disc ml-5 mt-1 space-y-1">
                                    {item.links.map((linkObj, index) => (
                                      <li key={index}>
                                        <a
                                          href={linkObj.url}
                                          className="text-blue-500 underline hover:text-blue-700 transition-colors"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {getIconForLabel(linkObj.label)}
                                          {linkObj.label}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </ul>

                            {item.skills && (
                              <p className=' text-xs border border-gray-400 rounded-xl p-3'>
                                <strong>🎮 Skills:</strong>
                                <p className='text-gray-500 pt-1'>{item.skills.join(', ')}</p>
                              </p>
                            )}

                            {item.tools && (
                              <p className='text-xs border border-gray-400 rounded-xl p-3'>
                                <strong>⚒ Tools:</strong> 
                                <p className='text-gray-500 pt-1'>{item.tools.join(', ')}</p>
                              </p>
                            )}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
