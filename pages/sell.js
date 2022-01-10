import CreateProduct from '../components/CreateProduct';
import PleaseSignIn from '../components/PleaseSignIn';

export default function SellPage() {
  return (
    <div className="grid grid-cols-sign-in gap-8 xl:px-100 2xl:px-100">
      <PleaseSignIn>
        <CreateProduct />
      </PleaseSignIn>
    </div>
  );
}
