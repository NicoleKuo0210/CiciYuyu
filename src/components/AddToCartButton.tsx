'use client';

import { useState, useTransition } from "react";

export default function AddToCartButton({
  productId,
  availableQuantity,
}: {
  productId: number;
  availableQuantity: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [quantity, setQuantity] = useState(1);
  const [stockLeft, setStockLeft] = useState(availableQuantity);

  const handleAddToCart = () => {
    if (quantity <= 0 || quantity > stockLeft) return;

    startTransition(async () => {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (res.ok) {
        setStockLeft((prev) => prev - quantity);
        setQuantity(1); // Reset input
      }
    });
  };

  const increment = () => {
    if (quantity < stockLeft) setQuantity((q) => q + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex items-center border rounded px-1">
        <button
          onClick={decrement}
          className="px-2 text-sm text-gray-700 hover:text-black"
        >
          −
        </button>
        <input
          type="number"
          min={1}
          max={stockLeft}
          value={quantity}
          onChange={(e) => {
            const val = Math.max(1, Math.min(stockLeft, Number(e.target.value)));
            setQuantity(val);
          }}
          className="w-12 text-center border-none outline-none"
        />
        <button
          onClick={increment}
          className="px-2 text-sm text-gray-700 hover:text-black"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        disabled={isPending || stockLeft === 0}
      >
        {stockLeft === 0 ? "Out of stock" : isPending ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
