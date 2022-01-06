import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import Cart from './Cart';
import Search from './Search';

const links = [
  { name: 'Products', target: '/products' },
  { name: 'Sell', target: '/sell' },
  { name: 'Orders', target: '/orders' },
  { name: 'Account', target: '/account' },
  { name: 'Sign Out', target: '/' },
  { name: 'My Cart', target: '/' },
];

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

export default function NewHeader() {
  return (
    <header className="mb-8">
      <div className="px-6 border-b-8 border-black flex flex-col items-center xl:flex-row">
        <h1 className="my-6 bg-slick text-white inline-block p-2 uppercase text-4.5xl transform -skew-x-7">
          <a href="/">Slick fits</a>
        </h1>
        <nav className="mt-4 flex-1 flex xl:mt-0 xl:justify-end">
          {links.map((link) => (
            <a
              className="relative px-4 text-sm uppercase flex-shrink-0 flex items-center lg:px-6 lg:text-lg xl:px-8 xl:text-xl"
              key={link.name}
              href={link.target}
            >
              <span className="absolute top-0 left-0 w-1 h-full bg-gray-200" />
              {link.name}
            </a>
          ))}
        </nav>
      </div>
      <div className="sub-bar">
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
