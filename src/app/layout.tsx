import { Montserrat } from 'next/font/google';
import ReduxProvider from './ReduxProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={montserrat.className} suppressHydrationWarning>
      <body>
        <ReduxProvider>
          {children}{' '}
          <ToastContainer position="top-right" autoClose={3000} />{' '}
        </ReduxProvider>
      </body>
    </html>
  );
}
