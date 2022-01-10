import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../utils/useForm';
import DisplayError from './ErrorMessage';

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });
  const [signUp, { data, loading, error }] = useMutation(SIGN_UP_MUTATION, {
    variables: inputs,
    // refetch the current user
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting
    console.log(inputs);
    const res = await signUp().catch(console.error);
    console.log(res);
    console.log({ data, loading, error });
    resetForm();
    // Send the email and password to the gql api
  }
  return (
    <form
      className=" shadow-bs bg-gray-100 border-4 border-white p-5 text-base leading-6 font-semibold"
      method="POST"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl">
        Sign Up
        <div className="my-2 bg-gradient-to-r from-slick to-amber-400 h-3 mb-4" />
      </h2>
      <fieldset className="border-0 p-0">
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please go ahead and sign
            in!
          </p>
        )}
        <label className="block mb-4 text-xl" htmlFor="name">
          Name
          <input
            className="w-full my-2 p-3 text-sm border-2 border-slate-900"
            type="name"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label className="block mb-4 text-xl" htmlFor="email">
          Email
          <input
            className="w-full my-2 p-3 text-sm border-2 border-slate-900"
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label className="block mb-4 text-xl" htmlFor="password">
          Password
          <input
            className="w-full my-2 p-3 text-sm border-2 border-slate-900"
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <DisplayError error={error} />
        <button
          className="rounded-xl w-fit bg-slick text-white border-0 text-2xl font-semibold px-4 py-4"
          type="submit"
        >
          Sign Up!
        </button>
      </fieldset>
    </form>
  );
}

export { SIGN_UP_MUTATION };
