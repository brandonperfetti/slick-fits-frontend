import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../utils/useForm';
import DisplayError from './ErrorMessage';

const PASSWORD_RESET_MUTATION = gql`
  mutation PASSWORD_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function PasswordReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });
  const [signUp, { data, loading, error }] = useMutation(
    PASSWORD_RESET_MUTATION,
    {
      variables: inputs,
      // refetch the current user
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
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
        Forgot Password?
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
            required
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <DisplayError error={error} />

        {data?.sendUserPasswordResetLink === null && (
          <div className="p-4 bg-green-200 opacity-60 rounded-xl my-4">
            <p>Success! Check your email for a link.</p>
          </div>
        )}
        <button
          className="rounded-xl w-fit bg-slick text-white border-0 text-2xl font-semibold px-4 py-4"
          type="submit"
        >
          Reset
        </button>
      </fieldset>
    </form>
  );
}
