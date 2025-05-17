'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCheckout = async () => {
    startTransition(async () => {
      const res = await fetch('/api/checkout', {
        method: 'POST',
      });

      if (!res.ok) {
        alert('Checkout failed!');
      } else {
        alert('Checkout successful!');
        location.reload(); // Refresh the page
      }
    });
    startTransition(() => {
      router.refresh(); // Refresh page to reflect changes
    });
  };

  return (
    <button
      onClick={handleCheckout}
      className="mt-8 px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 disabled:opacity-50"
      disabled={isPending}
    >
      {isPending ? 'Processing...' : 'Checkout'}
    </button>
  );
}
