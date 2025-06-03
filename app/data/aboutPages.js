import Image from 'next/image';
import RandomName from '../components/RandomName';

export const aboutPages = [
  {
    content: (
      <>
      <div className="text-sm flex flex-row items-center gap-6">
         <Image
          src="/images/caca.png"
          width={90}
          height={90}
          alt="Game Scene"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold">
            <RandomName /> 🎮
          </h2>
        <p className='text-sm text-gray-400 pt-2 pb-2'>
          Jakarta | +62 85795281890
        </p>
        <p>medium</p>
        </div>
      </div>
        <p className='pt-4'>
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
          <li>👾 Interest: Business Analyst, </li>
          <li>🛠️ Tech: Next.js, Tailwind CSS, React</li>
          <li>📧 Email: pixeldev@example.com</li>
        </ul>
      </div>
    ),
  },

  // --- FOTO DI DALAM KONTEN ---
  {
    content: (
      <>
        <h2 className="text-2xl font-bold">Level 2: Game Projects</h2>
        <Image
          src="/images/caca.png"
          width={180}
          height={180}
          alt="Game Scene"
          className="my-4 rounded-md mx-auto"
        />
        <p>
          I’ve built multiple game-inspired UIs including a pixel battle game,
          inventory system, and animated login screens.
        </p>
      </>
    ),
    info: <p>Explore more on my GitHub or itch.io profile!</p>,
  },
];