'use server';
import { LuListTodo } from "react-icons/lu";

import Link from 'next/link';
import Navbar from './Navbar';

export default async function Header() {
  return (
    <header className='fixed top-0 z-50 w-full bg-white opacity-80 shadow transition duration-300 hover:shadow-lg hover:shadow-zinc-400/50'>
      <nav className='mx-auto flex flex-wrap items-center justify-between py-4 md:container px-3'>
        <h1 className='py-2'>
          <Link href='/' className='flex items-center text-4xl'>
            <LuListTodo className='text-4xl mr-2' />
            Todolist
          </Link>
        </h1>

        <Navbar />
      </nav>
    </header>
  );
}
