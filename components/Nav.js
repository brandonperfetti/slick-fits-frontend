import Link from 'next/link';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();
  return (
    <div className="flex items-center">
      <Link href="/products">
        <span className="relative px-4 text-sm uppercase flex-shrink-0 lg:px-6 lg:text-lg xl:px-8 xl:text-xl">
          <span className="absolute top-0 left-0 w-1 h-full bg-gray-200" />
          Products
        </span>
      </Link>
      {user && (
        <>
          <Link href="/sell">
            <span className="relative px-4 text-sm uppercase flex-shrink-0 lg:px-6 lg:text-lg xl:px-8 xl:text-xl">
              <span className="absolute top-0 left-0 w-1 h-full bg-gray-200" />
              Sell
            </span>
          </Link>
          <Link href="/orders">
            <span className="relative px-4 text-sm uppercase flex-shrink-0 lg:px-6 lg:text-lg xl:px-8 xl:text-xl">
              <span className="absolute top-0 left-0 w-1 h-full bg-gray-200" />
              Orders
            </span>
          </Link>
          <Link href="/account">
            <span className="relative px-4 text-sm uppercase flex-shrink-0 lg:px-6 lg:text-lg xl:px-8 xl:text-xl">
              <span className="absolute top-0 left-0 w-1 h-full bg-gray-200" />
              Account
            </span>
          </Link>
          <span className="relative px-4 text-sm uppercase flex-shrink-0 lg:px-6 lg:text-lg xl:px-8 xl:text-xl">
            <button className="uppercase" type="button" onClick={openCart}>
              <span className="absolute top-0 left-0 w-1 h-full bg-gray-200" />
              My Cart
              <CartCount
                count={user.cart.reduce(
                  (tally, cartItem) =>
                    tally + (cartItem.product ? cartItem.quantity : 0),
                  0
                )}
              />
            </button>
          </span>
          <SignOut />
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </div>
  );
}
