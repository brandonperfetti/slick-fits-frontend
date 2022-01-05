import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Cart from './Cart';
import Nav from './Nav';
import Search from './Search';

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  background: red;
  transform: skew(-7deg);
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
  }
`;

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
    <header className="mb-8 min-w-full">
      <div className="pl-6 border-b-10 border-black flex flex-col items-center xl:flex-row xl:items-stretch">
        <h1 className="my-7 bg-slick text-white inline-block p-2 uppercase text-4.5xl transform -skew-x-7">
          <Link href="/">Slick fits</Link>
        </h1>
        <nav className="mt-4 flex-1 flex flex-wrap justify-center items-center xl:mt-0 xl:justify-end">
          <Nav />
        </nav>
      </div>
      <div className="">
        <ClientOnly>
          <Search />
        </ClientOnly>
      </div>
      <Cart />
    </header>
  );
}
