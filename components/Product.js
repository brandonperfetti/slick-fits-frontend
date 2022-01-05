import Link from 'next/link';
import { PropTypes } from 'prop-types';
import formatMoney from '../utils/formatMoney';
import AddToCart from './AddToCart';
import DeleteProduct from './DeleteProduct';
import RequireSignIn from './RequireSignIn';

export default function Product({ product }) {
  return (
    <div className="w-auto max-w-5xl bg-white border-2 relative shadow-bs m-auto">
      <img
        className="w-full h-100 object-cover"
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <h3 className="-mt-8 mb-4 text-white text-center transform -skew-x-5 -rotate-1">
        <div className="bg-slick max-w-;g mx-auto inline leading-tight text-shadow text-4.5xl text-center	pt-0 pb-2 px-3">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </div>
      </h3>
      <span className="bg-slick shadow-bs flex flex-col transform rotate-3 text-white font-semibold p-2 leading-none text-3xl absolute -top-1 -right-1">
        {formatMoney(product.price)}
      </span>
      <p className="py-4 px-8 leading-8 flex-1">{product.description}</p>
      <div className="grid grid-cols-3 border-t border-gray-300 divide-x divide-gray-300">
        <RequireSignIn>
          <button className="p-3 hover:bg-gray-100" type="button">
            <Link
              href={{
                pathname: '/update',
                query: {
                  id: product.id,
                },
              }}
            >
              Edit ✏️
            </Link>
          </button>
          <button className="p-3 hover:bg-gray-100" type="button">
            <AddToCart id={product.id} />
          </button>
          <button className="p-3 hover:bg-gray-100" type="button">
            <DeleteProduct id={product.id}>Delete</DeleteProduct>
          </button>
        </RequireSignIn>
      </div>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.any,
};
