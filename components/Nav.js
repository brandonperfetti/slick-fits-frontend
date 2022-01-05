import Link from 'next/link';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';
import SignOut from './SignOut';
import { useUser } from './User';

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();
  return (
    <>
      <button
        className=" uppercase relative group px-4 text-sm lg:px-6 lg:text-lg xl:px-8 xl:text-xl"
        type="button"
      >
        <Link href="/products">
          <div>
            <div className="absolute top-0 left-0 w-0.5 h-full bg-gray-200 transform -skew-x-20" />
            <div className="">Products</div>
            <span className="absolute w-full h-1 bg-slick -bottom-1 left-0 rounded-sm transform scale-x-0 group-hover:scale-x-100 transition ease-bloop duration-400 group-hover:bg-slick" />
          </div>
        </Link>
      </button>
      {user && (
        <>
          <button
            className="uppercase relative px-4 text-sm lg:px-6 lg:text-lg xl:px-8 xl:text-xl"
            type="button"
          >
            <Link href="/sell">
              <div>
                <div className="absolute top-0 left-0 w-0.5 h-full bg-gray-200 transform -skew-x-20" />
                <span className="">Sell</span>
                <span className="absolute w-full h-1 bg-slick -bottom-1 left-0 rounded-sm transform scale-x-0 group-hover:scale-x-100 group-hover:bg-slick" />
              </div>
            </Link>
          </button>
          <button
            className="uppercase relative px-4 text-sm lg:px-6 lg:text-lg xl:px-8 xl:text-xl"
            type="button"
          >
            <Link href="/orders">
              <div>
                <div className="absolute top-0 left-0 w-0.5 h-full bg-gray-200 transform -skew-x-20" />
                Orders
              </div>
            </Link>
          </button>
          <button
            className="uppercase relative px-4 text-sm lg:px-6 lg:text-lg xl:px-8 xl:text-xl"
            type="button"
          >
            <Link href="/account">
              <div>
                <div className="absolute top-0 left-0 w-0.5 h-full bg-gray-200 transform -skew-x-20" />
                Account
              </div>
            </Link>
          </button>
          <SignOut />
          <button
            className="relative h-7 uppercase text-sm lg:px-6 lg:text-lg xl:px-8 xl:text-xl flex items-center"
            type="button"
            onClick={openCart}
          >
            <div>
              <div className="absolute top-0 left-0 w-0.5 h-full bg-gray-200 transform -skew-x-20" />
              <span className="flex items-center space-x-2">
                <span>My Cart</span>
                <span className="bg-slick text-white h-8 w-8 rounded-full flex items-center justify-center">
                  <CartCount
                    count={user.cart.reduce(
                      (tally, cartItem) =>
                        tally + (cartItem.product ? cartItem.quantity : 0),
                      0
                    )}
                  />
                </span>
              </span>
            </div>
          </button>
        </>
      )}
      {!user && (
        <>
          <button
            className="uppercase relative px-4 text-sm lg:px-6 lg:text-lg xl:px-8 xl:text-xl"
            type="button"
          >
            <Link href="/signin">
              <div>
                <div className="absolute top-0 left-0 w-0.5 h-full bg-gray-200 transform -skew-x-20" />
                <span data-testid="signIn">Sign In</span>
              </div>
            </Link>
          </button>
        </>
      )}
    </>
  );
}
