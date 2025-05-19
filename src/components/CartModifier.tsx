'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function CartModifier({
    productId,
    initialQuantity,
    maxQuantity,
}: {
    productId: number;
    initialQuantity: number;
    maxQuantity: number;
}) {
    const [quantity, setQuantity] = useState(initialQuantity);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const increment = () => {
        if (quantity < maxQuantity) setQuantity((q) => q + 1);
    };

    const decrement = () => {
        if (quantity > 0) setQuantity((q) => q - 1); // Allow 0
    };

    const handleUpdate = async () => {
        if (quantity === initialQuantity) return; // No change
        else {
            // PUT update quantity
            await fetch('/api/cart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, quantity }),
            });
        }
        startTransition(() => {
            router.refresh(); // Refresh page to reflect changes
        });
    }

    return (
        <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center border-2 border-teal-600 rounded px-2 bg-white">
                <button
                    onClick={decrement}
                    className="px-2 text-xl text-gray-700 hover:text-black"
                >
                    −
                </button>
                <input
                    type="number"
                    min={0}
                    max={maxQuantity}
                    value={quantity}
                    onChange={(e) => {
                        const val = Math.max(0, Math.min(maxQuantity, Number(e.target.value)));
                        setQuantity(val);
                    }}
                    className="w-12 text-xl text-center text-gray-700 border-none outline-none"
                />
                <button
                    onClick={increment}
                    className="px-2 text-xl text-gray-700 hover:text-black"
                >
                    +
                </button>
            </div>

            <button
                onClick={handleUpdate}
                disabled={isPending}
                className={`text-white px-4 py-2 rounded transition ${quantity === 0
                    ? 'bg-red-500 hover:bg-red-700'
                    : 'bg-teal-500 hover:bg-teal-700'
                    }`}
            >
                {quantity === 0 ? 'Remove' : 'Change'}
            </button>
        </div>
    );
}

