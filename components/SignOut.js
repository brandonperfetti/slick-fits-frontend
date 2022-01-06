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
    <>
      <button
        className="relative h-7 uppercase text-sm lg:px-6 lg:text-lg xl:px-8 xl:text-xl flex items-center"
        type="button"
        onClick={signout}
      >
        <div>
          <div className="absolute top-0 left-0 w-0.5 h-full bg-gray-200 transform -skew-x-20" />
          <span className="hover:text-slick">Sign Out!</span>
        </div>
      </button>
    </>
  );
}
