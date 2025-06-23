'use client'

import Image from 'next/image'
import RandomName from '../components/RandomName'
import SocialLinks from '../components/SocialLinks'

const socialLinksForAbout = [
  { href: '/CV.pdf', 
    icon: '/logo/cv.svg', 
    alt: 'CV' 
  },
  { href: 'https://wa.me/6285795281890', 
    icon: '/logo/wa.png', 
    alt: 'WhatsApp' 
  },
  {
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=cacasalsabilaadrian@gmail.com',
    icon: '/logo/gmail.png',
    alt: 'Gmail',
  },
  {
    href: 'https://www.linkedin.com/in/salsabila-adrian-a66741226/',
    icon: '/logo/linkedin.png',
    alt: 'LinkedIn',
  },
]

export const aboutPages = [
  {
    content: (
      <>
        <div className="text-sm flex flex-row items-center gap-6">
          <Image src="/images/caca.png" width={90} height={90} alt="Avatar" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">
              <RandomName /> 🎮
            </h2>
            <p className="text-sm text-gray-400 pt-2 pb-2">Jakarta, ID</p>
            <SocialLinks links={socialLinksForAbout} />
          </div>
        </div>

        <p className="pt-4">
          Computer Science grad from BINUS with real-world experience as a Business Analyst and Product Management, skilled in turning business needs into smart, user-friendly solutions.
          <br />
          <br />
          I’ve led cross-functional teams, delivered projects using Scrum, and worked with tools like Figma, Draw.io, JIRA, and SQL to design, test, and improve products. Experienced about building efficient systems, solving problems with tech, and making sure users actually love what they use.
        </p>
      </>
    ),
    info: (
      <div className="bg-gray-300/80 border-2 rounded p-2">
        <ul>
          <li>🎯 Interests: Business Analyst, System Analyst, IT Project Management, UI/UX Design, Data Analyst, QA</li>
        </ul>
      </div>
    ),
  },

  {
    content: (
      <>
        <a
          href="https://graduation.apps.binus.ac.id/graduates/2440112033/?ref"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-1"
        >
          <h2 className="text-xl font-bold lg:text-2xl">Bina Nusantara</h2>
          <p>(2020 - 2024)</p>
          <p className='text-gray-500'>Bachelor of Computer Science (3.62/4.00)</p>
        </a>

        <p className="pt-2">Research:</p>
        <a
          href="https://ieeexplore.ieee.org/document/10762027"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-800"
        >
          Analysis of the Potential for Solar Panel Development on House Roofs in West Jakarta, Indonesia using GIS Applications and the Mask R-CNN Model
        </a>

        <p className="pt-2">
          This study analyzes the potential for solar panel development in West Jakarta by detecting rooftops using the Mask R-CNN model,
          comparing the accuracy of ResNet 34 and ResNet 50. The results show that ResNet 50&apos;s performs better with 40% accuracy compared to
          ResNet 34&apos;s 7.9%, generating a potential of over 6,800 MWh of electricity per year to support sustainable energy goals.
        </p>
      </>
    ),
    info: (
      <p className="bg-gray-300/80 border-2 rounded p-2">
        <a
          href="https://ieeexplore.ieee.org/xpl/conhome/10761122/proceeding"
          target="_blank"
          rel="noopener noreferrer"
        >
          Published in:{' '}
          <p className="underline">
            2024 International Conference on Information Technology and Computing (ICITCOM)
          </p>
        </a>
      </p>
    ),
  },
]
