import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut() {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button type="button" onClick={signout}>
      <span className="relative px-4 text-sm uppercase flex-shrink-0 lg:px-6 lg:text-lg xl:px-8 xl:text-xl">
        <span className="absolute top-0 left-0 w-1 h-full bg-gray-200" />
        Sign Out!
      </span>
    </button>
  );
}
