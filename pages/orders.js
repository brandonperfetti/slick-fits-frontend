import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import ErrorMessage from '../components/ErrorMessage';
import formatMoney from '../utils/formatMoney';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

function countItemsInAnOrder(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

export default function OrdersPage() {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { allOrders } = data;
  return (
    <div className="xs:px-1 xs:text-xs md:text-md lg:text-lg overflow-auto 2xl:px-100">
      <Head>
        <title>Your Orders ({allOrders.length})</title>
      </Head>
      <h2 className="border-b-2 border-slick mt-0 mb-8 pb-8 ">
        You have {allOrders.length} orders!
      </h2>
      <ul className="grid xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-16">
        {allOrders.map((order) => (
          <li className="shadow-bs list-none p-8 border-2 border-slate-200">
            <Link href={`/order/${order.id}`}>
              <a>
                <p className="bg-slate-100 mb-4 p-4">ID: {order.id}</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <p className="bg-slate-100 m-0 p-4">
                    {countItemsInAnOrder(order)} Items
                  </p>
                  <p className="bg-slate-100 m-0 p-4">
                    {order.items.length} Product
                    {order.items.length === 1 ? '' : 's'}
                  </p>
                  <p className="bg-slate-100 m-0 p-4">
                    {formatMoney(order.total)}
                  </p>
                </div>
                <div className="grid gap-3 grid-cols-order-meta mt-4">
                  {order.items.map((item) => (
                    <img
                      className="h-48 w-full object-cover max-w-lg"
                      key={`image-${item.id}`}
                      src={item.photo?.image?.publicUrlTransformed}
                      alt={item.name}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
