'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import PropTypes from 'prop-types';

const NavLink = ({ href, className, children }) => {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={`${className} ${path.startsWith(href) ? 'navlink  navlink-active' : 'navlink'}`}
    >
      {children}
    </Link>
  );
};

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
};

export default NavLink;
