import './styles/globals.css'
import { Press_Start_2P } from 'next/font/google'
import Loader from './components/Loader'

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pressStart',
})

export const metadata = {
  title: 'Salsabila Adrian',
  description: 'Portofolio bertema game retro',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={pressStart.variable}>
      <body>
        <Loader />
        {children}
      </body>
    </html>
  )
}
