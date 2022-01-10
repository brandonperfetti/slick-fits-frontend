import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { PropTypes } from 'prop-types';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  console.log(payload);
  console.log('running the update function after delete');
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });
  return (
    <button
      className="p-3 hover:bg-gray-100 xs:text-xs sm:text-sm lg:text-lg xl:text-xl"
      type="button"
      disabled={loading}
      onClick={() => {
        if (window.confirm('Are you sure you want to delete this item?')) {
          // go ahead and delete the item
          console.log('DELETE');
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}
DeleteProduct.propTypes = {
  id: PropTypes.string,
  children: PropTypes.any,
};
