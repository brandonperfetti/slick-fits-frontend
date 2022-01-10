import Link from 'next/link';
import Cart from './Cart';

export default function Footer() {
  return (
    <footer className="min-w-full border-t h-14 border-black p-4">
      <div className="text-right">
        <p className="text-sm">
          Crafted by <Link href="https://sansfaux.com">Sans Faux Studios</Link>
        </p>
      </div>
      <Cart />
    </footer>
  );
}
