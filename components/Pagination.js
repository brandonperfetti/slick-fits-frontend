import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import { PropTypes } from 'prop-types';
import { perPage } from '../config';
import DisplayError from './ErrorMessage';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  if (loading) return 'Loading...';
  if (error) return <DisplayError error={error} />;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  return (
    <div
      className="p-8 text-center grid-cols-4 gap-3.5 items-stretch justify-center mt-4 mb-auto "
      data-testid="pagination"
    >
      <Head>
        <title>
          Slick Fits - Page {page} of {pageCount}
        </title>
      </Head>
      <div className=" inline-flex border rounded-lg divide-x xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-xl">
        <Link href={`/products/${page - 1}`}>
          <a className="px-7 py-4 text-gray-500" aria-disabled={page <= 1}>
            ← Prev
          </a>
        </Link>
        <p className="px-7 py-4 hidden sm:block ">
          Page {page} of <span data-testid="pageCount">{pageCount}</span>
        </p>
        <p className="px-7 py-4 hidden sm:block">{count} Items Total</p>
        <Link href={`/products/${page + 1}`}>
          <a
            className="px-7 py-4 text-gray-500"
            aria-disabled={page >= pageCount}
          >
            Next →
          </a>
        </Link>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
};
