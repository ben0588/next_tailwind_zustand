'use client';
import { AiOutlineClose } from 'react-icons/ai';

import NavLink from '../common/NavLink';
import { useEffect, useState } from 'react';
import { LuMenu } from 'react-icons/lu';

const Navbar = () => {
  const [navWidth, setNavWidth] = useState(0);
  const [menuIconToggle, setMenuIconToggle] = useState(false);

  const navbarList = [
    { path: '/test', text: '測試分頁' },
  ];

  useEffect(() => {
    const updateWidth = () => setNavWidth(window.innerWidth);

    window.addEventListener('resize', updateWidth);
    updateWidth(); // 初次取得

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const toggleMenu = () => setMenuIconToggle(!menuIconToggle);
  return (
    <>
      {navWidth <= 640 && navWidth !== 0 ? (
        menuIconToggle ? (
          <AiOutlineClose className= 'cursor-pointer text-5xl' onClick={toggleMenu} />
        ) : (
          <LuMenu className='cursor-pointer text-5xl' onClick={toggleMenu} />
        )
      ) : (
        <div>
          <ul className='flex space-x-5'>
            {navbarList.map((item, index) => (
              <li key={index}>
                <NavLink href={item.path} className='text-xl font-bold'>
                  <div className='flex items-center'>
                    <span > {item.icon}</span>
                    <span> {item.text}</span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={`${menuIconToggle ? 'w-full border-t-2' : 'hidden'}`}>
        <ul className='flex flex-col items-center space-y-2 pb-4 pt-8'>
          {navbarList.map((item, index) => (
            <li key={index} onClick={toggleMenu}>
              <NavLink href={item.path} className='text-xl font-bold'>
                <div className='flex items-center'>
                  <span className='mr-1'> {item.icon}</span>
                  <span> {item.text}</span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Navbar;
