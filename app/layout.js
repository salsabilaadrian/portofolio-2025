import './styles/globals.css';
import Loader from './components/Loader';

export const metadata = {
  title: 'Salsabila Adrian',
  description: 'Portofolio bertema game retro',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Loader/>
      <body>{children}</body>
    </html>
  );
}
