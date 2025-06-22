import './styles/globals.css';
import Loader from './components/Loader';
// import CustomCursor from './components/CustomCursor'

export const metadata = {
  title: 'Salsabila Adrian',
  description: 'Portofolio bertema game retro',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <CustomCursor /> */}
        <Loader/>
        {children}
      </body>
    </html>
  );
}
