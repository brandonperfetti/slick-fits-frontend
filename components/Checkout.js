import { useMutation } from '@apollo/client';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import gql from 'graphql-tag';
import { useRouter } from 'next/dist/client/router';
import nProgress from 'nprogress';
import { useState } from 'react';
import { useCart } from '../lib/cartState';
import { CURRENT_USER_QUERY } from './User';

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { closeCart } = useCart();
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  async function handleSubmit(e) {
    // 1. Stop the form from submitting and turn the loader on
    e.preventDefault();
    setLoading(true);
    // console.log('We got work to do...');

    // 2. Start the page transition
    nProgress.start();

    // 3. Create payment method via stripe (token comes back here if successful)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);

    // 4. Handle any errors from stripe
    if (error) {
      setError(error);
      nProgress.done();
      return; // stops the checkout from happening
    }

    // 5.Send the token from step 3 to our keystone server via a custom mutation!
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });
    console.log(`Finished with the order!`);
    console.log(order);

    // 6. Change the page to view the order
    router.push({
      pathname: `/order/[id]`,
      query: { id: order.data.checkout.id },
    });

    // 7. Close Cart
    closeCart();

    // 8. Turn the loader off
    setLoading(false);
    nProgress.done();
  }

  return (
    <form
      className="border-2 p-4 grid gap-4 rounded-lg shadow-bs"
      onSubmit={handleSubmit}
    >
      {error && <p style={{ fontSize: 12, color: 'red' }}>{error.message}</p>}
      {graphQLError && (
        <p style={{ fontSize: 12, color: 'red' }}>{graphQLError.message}</p>
      )}

      <CardElement />
      <button
        className="bg-slick text-white font-medium border-0 border-r-0 uppercase text-2xl py-1 px-1 transform -skew-x-2 inline-block transition-all disabled:opacity-50"
        type="submit"
        // TODO: Figure out how to disable check out button if no items or cc are present
        // disabled={!CardElement}
      >
        Check Out !
      </button>
    </form>
  );
}

function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}

export { Checkout };
