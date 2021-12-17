import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../utils/useForm';
import { CURRENT_USER_QUERY } from './User';
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
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Forgot Password?</h2>
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link.</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <DisplayError error={error} />
        <button type="submit">Reset</button>
      </fieldset>
    </Form>
  );
}
