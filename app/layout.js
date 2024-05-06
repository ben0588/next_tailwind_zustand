import { Inter } from 'next/font/google';
import './globals.css';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next_Todolist',
  description: 'next.測試.todo.react.tailwind.zustand',
};

export default function RootLayout({ children }) {

  return (
    <html lang='zh-Hant-TW' className='scroll-smooth'>
      <body className={inter.className}>
          <div className='flex min-h-screen max-w-full flex-col'>
            <Header />
            <main className='container mx-auto my-28 flex-grow bg-slate-50'>{children}</main>
            <Footer />
          </div>
      </body>
    </html>
  );
}
