import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { PropTypes } from 'prop-types';
import { perPage } from '../config';
import Product from './Product';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Products({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p> Error: {error.message}</p>;
  return (
    <div className="grid xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-16">
      {data.allProducts.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
Products.propTypes = {
  page: PropTypes.number,
};
