import { Montserrat } from 'next/font/google';
import ReduxProvider from './ReduxProvider';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'], 
  display: 'swap',                
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={montserrat.className} suppressHydrationWarning>
      <body><ReduxProvider>{children}</ReduxProvider></body>
    </html>
  )
}
