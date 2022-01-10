import Link from 'next/link';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import Cart from './Cart';
import Nav from './Nav';

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
    <header className="min-w-full border-b border-black">
      <div className="xs:px-0 md:px-0 xl:px-6 2xl:px-6 border-b-10 border-black flex flex-col items-center xl:flex-row xl:items-stretch">
        <h1 className="my-3 bg-slick text-white inline-block p-2 uppercase text-3.5xl transform -skew-x-7">
          <Link href="/">
            <span className="hover:underline">Slick fits</span>
          </Link>
        </h1>
        <div className="my-4 flex-1 flex flex-wrap justify-center items-center xl:my-0 xl:justify-end">
          <Nav />
        </div>
      </div>
      <Cart />
    </header>
  );
}

ClientOnly.propTypes = {
  children: PropTypes.any,
};
