import PasswordReset from '../components/PasswordReset';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

export default function SignInPage() {
  return (
    <div className="grid grid-cols-sign-in gap-8">
      <SignIn />
      <PasswordReset />
      <SignUp />
    </div>
  );
}
