import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { PropTypes } from 'prop-types';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
    // optimisticResponse: {
    //   deleteCartItem: {
    //     __typename: 'CartItem',
    //     id,
    //   },
    // },
  });
  return (
    <button
      className="text-5xl bg-none border-0 hover:text-slick xs:text-sm sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-5xl"
      onClick={removeFromCart}
      disabled={loading}
      type="button"
      title="Remove This Item from Cart"
    >
      &times;
    </button>
  );
}
RemoveFromCart.propTypes = {
  id: PropTypes.string,
};
