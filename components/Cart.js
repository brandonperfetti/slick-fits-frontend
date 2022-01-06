import { PropTypes } from 'prop-types';
import { useCart } from '../lib/cartState';
import calcTotalPrice from '../utils/calcTotalPrice';
import formatMoney from '../utils/formatMoney';
import { Checkout } from './Checkout';
import RemoveFromCart from './RemoveFromCart';
import CartStyles from './styles/CartStyles';
import { useUser } from './User';

function CartItem({ cartItem }) {
  const { product } = cartItem;
  if (!product) return null;
  return (
    <li className="h-fit py-4 px-2 border-b-2 border-black grid grid-cols-cart-item hover:bg-gray-100 xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-xl">
      <img
        className="mr-4"
        width="100"
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p className="m-0">
          {formatMoney(product.price * cartItem.quantity)}-
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </li>
  );
}

export default function Cart() {
  const me = useUser();
  const { cartOpen, closeCart } = useCart();
  if (!me) return null;
  return (
    <div className="min-w-full">
      <CartStyles open={cartOpen}>
        <header className="h-full border-b-4 border-black pt-2 mb-2 pb-6">
          <div className=" grid xs:text-xs sm:text-xl md:text-1.5xl lg:text-2.5xl xl:text-3.5xl 2xl:text-4xl">
            <h3 className="bg-slick h-max w-fit text-white inline-block py-8 px-6 transform -skew-x-3 m-0 leading-10">
              {me.name}'s Cart
            </h3>
            <button
              className="bg-black text-white text-4.5xl border-0 absolute p-2 z-10 justify-self-end transform -skew-x-3 hover:text-slick leading-10"
              type="button"
              onClick={closeCart}
            >
              &times;
            </button>
          </div>
        </header>
        <ul className=" xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl m-0 p-0 list-none overflow-scroll">
          {me.cart.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))}
        </ul>
        <footer className="xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl border-t-10 border-black mt-6 pt-6 items-center text-4.5xl font-black">
          <p className="m-0 p-2 xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-3xl">
            Total: {formatMoney(calcTotalPrice(me.cart))}
          </p>
          <Checkout />
        </footer>
      </CartStyles>
    </div>
  );
}

CartItem.propTypes = {
  cartItem: PropTypes.any,
};
