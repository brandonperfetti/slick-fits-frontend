import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { PropTypes } from 'prop-types';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default function AddToCart({ id }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button
      className="p-3 hover:bg-gray-100 xs:text-xs sm:text-sm lg:text-lg xl:text-xl"
      disabled={loading}
      type="button"
      onClick={addToCart}
    >
      Add {loading && 'ing'}to Cart 🛍️
    </button>
  );
}

AddToCart.propTypes = {
  id: PropTypes.string,
};
