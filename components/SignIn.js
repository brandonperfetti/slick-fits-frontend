import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../utils/useForm';
import DisplayError from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  const [signIn, { data, loading }] = useMutation(SIGN_IN_MUTATION, {
    variables: inputs,
    // refetch the current user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting
    console.log(inputs);
    const res = await signIn();
    console.log(res);
    resetForm();
    // Send the email and password to the gql api
  }
  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;
  return (
    <form
      className=" shadow-bs bg-gray-100 border-4 border-white p-5 text-base leading-6 font-semibold"
      method="POST"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl">
        Sign In{' '}
        <div className="my-2 bg-gradient-to-r from-slick to-amber-400 h-3 mb-4" />
      </h2>

      <fieldset className="border-0 p-0">
        <label className="block mb-4 text-xl" htmlFor="email">
          Email
          <input
            className="w-full rounded-xl my-2 p-3 text-sm border-2 border-slate-600"
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
            className="w-full rounded-xl my-2 p-3 text-sm border-2 border-slate-600"
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
          className="rounded-xl w-fit bg-slick text-white border-0 text-2xl font-semibold p-4"
          type="submit"
        >
          Sign In!
        </button>
      </fieldset>
    </form>
  );
}
