import PasswordReset from '../components/PasswordReset';
import ResetPass from '../components/ResetPass';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry you must supply a token</p>
        <PasswordReset />
      </div>
    );
  }
  return (
    <div>
      <p>RESET YOUR PASSWORD {query.token}</p>
      <ResetPass token={query.token} />
    </div>
  );
}
