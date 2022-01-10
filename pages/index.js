import { useQuery } from '@apollo/client';
import { ALL_PRODUCTS_QUERY } from '../components/Products';
import ProductsPage from './products';

export default function HomePage() {
  const { loading, error, data } = useQuery(ALL_PRODUCTS_QUERY);

  if (loading) return 'loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <main className="max-w-full mx-auto p-6 mb-4 ">
      <ProductsPage />
    </main>
  );
}
