'use client';

import { useState } from 'react';
import { categoryList, Category } from "@/lib/category"

export default function CreateProductPage() {
const [form, setForm] = useState<{
  name: string;
  description: string;
  price: string;
  quantity: string;
  image: string;
  category: Category;
}>({
  name: '',
  description: '',
  price: '',
  quantity: '',
  image: '',
  category: categoryList[0], // default value
});

const [loading, setLoading] = useState(false);
const [message, setMessage] = useState('');

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async () => {
  setLoading(true);
  setMessage('');
  try {
    const res = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify({
        ...form,
        price: parseInt(form.price),
        quantity: parseInt(form.quantity),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.log(text);
      // const body = await res.json();
      // throw new Error(body.error);
    }
    setLoading(false); // true -> false: to avoid double click, D-DOS  
    setMessage('Product created!');
    setForm({
      name: '',
      description: '',
      price: '',
      quantity: '',
      image: '',
      category: categoryList[0],
    });
  } catch (err) {
    if (err instanceof Error) {
      setMessage('Error: ' + err.message);
    } else {
      setMessage('An unknown error occurred');
    }
  }
};

return (
  <div className="p-6 max-w-xl mx-auto">
    <h1 className="text-2xl font-bold mb-4">Create Product</h1>

    <input
      name="name"
      value={form.name}
      onChange={handleChange}
      placeholder="Name"
      className="border p-2 mb-2 w-full"
    />
    <textarea
      name="description"
      value={form.description}
      onChange={handleChange}
      placeholder="Description"
      className="border p-2 mb-2 w-full"
    />
    <input
      name="price"
      value={form.price}
      onChange={handleChange}
      placeholder="Price"
      type="number"
      className="border p-2 mb-2 w-full"
    />
    <input
      name="quantity"
      value={form.quantity}
      onChange={handleChange}
      placeholder="Quantity"
      type="number"
      className="border p-2 mb-2 w-full"
    />
    <input
      name="image"
      value={form.image}
      onChange={handleChange}
      placeholder="Image URL"
      className="border p-2 mb-4 w-full"
    />

    <select
      name="category"
      value={form.category}
      onChange={handleChange}
      className="border p-2 mb-4 w-full"
    >
      {categoryList.map((cat) => (
        <option key={cat} value={cat} className='text-gray-700'>
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </option>
      ))}
    </select>

    <button
      onClick={handleSubmit}
      disabled={loading}
      className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
    >
      {loading ? 'Creating...' : 'Create Product'}
    </button>
    {message && <p className="mt-4">{message}</p>}
  </div>
);
}
