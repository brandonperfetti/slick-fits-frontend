import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import Cart from './Cart';
import Nav from './Nav';
import Search from './Search';

function ClientOnly({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <div {...delegated}>{children}</div>;
}

export default function Header() {
  return (
    <header className="mb-8 min-w-full border-b border-black">
      <div className="pl-6 border-b-10 border-black flex flex-col items-center xl:flex-row xl:items-stretch">
        <h1 className="my-7 bg-slick text-white inline-block p-2 uppercase text-4.5xl transform -skew-x-7">
          <Link href="/">
            <span className="hover:underline">Slick fits</span>
          </Link>
        </h1>
        <nav className="my-4 flex-1 flex flex-wrap justify-center items-center xl:my-0 xl:justify-end">
          <Nav />
        </nav>
      </div>
      <div>
        <ClientOnly>
          <Search />
        </ClientOnly>
      </div>
      <Cart />
    </header>
  );
}

ClientOnly.propTypes = {
  children: PropTypes.any,
};
