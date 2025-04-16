import { ReactNode } from 'react';

export default function Home({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <h1 className="text-2xl font-bold">shopEE</h1>
        <div className="flex items-center gap-4">
          <button className="text-xl">🛒</button>
          <button className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
            Login
          </button>
        </div>
      </header>

      {/* Category Navigation */}
      <nav className="flex justify-center gap-4 bg-gray-100 py-3 border-b">
        {['Electronics', 'Clothing', 'Home', 'Toys', 'Books'].map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 bg-white rounded shadow hover:bg-gray-200"
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="p-6">{children}</main>
    </div>
  );
}

