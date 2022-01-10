import { useRouter } from 'next/dist/client/router';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';
import Search from '../../components/Search';

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

export default function OrderPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);
  return (
    <div>
      <ClientOnly>
        <Search />
      </ClientOnly>
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </div>
  );
}

ClientOnly.propTypes = {
  children: PropTypes.any,
};
