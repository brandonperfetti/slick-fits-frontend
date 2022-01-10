import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../utils/useForm';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import Form from './styles/Form';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in, and what types are they?
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: '',
    price: 0,
    description: '',
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );
  return (
    <form
      className=" shadow-bs bg-gray-100 border-4 border-white p-5 text-base leading-6 font-semibold"
      onSubmit={async (e) => {
        e.preventDefault();
        // Submit the input fields to the backend
        const res = await createProduct();
        clearForm();
        // Go to that products page!
        Router.push({
          pathname: `/product/${res.data.createProduct.id}`,
        });
      }}
    >
      <h2 className="text-2xl">
        Add a Product{' '}
        <div className="my-2 bg-gradient-to-r from-slick to-amber-400 h-3 mb-4" />
      </h2>
      <fieldset className="border-0 p-0" disabled={loading} aria-busy={loading}>
        <label className="block mb-4 text-xl" htmlFor="image">
          Image
          <input
            className="w-full rounded-xl my-2 p-3 text-sm border-2 border-slate-600"
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </label>
        <label className="block mb-4 text-xl" htmlFor="name">
          Name
          <input
            className="w-full rounded-xl my-2 p-3 text-sm border-2 border-slate-600"
            type="text"
            id="name"
            name="name"
            placeholder=" Product Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label className="block mb-4 text-xl" htmlFor="price">
          Price
          <input
            className="w-full rounded-xl my-2 p-3 text-sm border-2 border-slate-600"
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label className="block mb-4 text-xl" htmlFor="description">
          Description
          <textarea
            className="w-full rounded-xl my-2 p-3 text-sm border-2 border-slate-600"
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <DisplayError error={error} />

        <button
          className="rounded-xl w-fit bg-slick text-white border-0 text-lg font-semibold p-4"
          type="submit"
        >
          + Add Product
        </button>
      </fieldset>
    </form>
  );
}
export { CREATE_PRODUCT_MUTATION };
