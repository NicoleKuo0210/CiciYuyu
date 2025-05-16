import Link from 'next/link';

import { categoryList } from '@/lib/category'

export default function Header() {
    return (
        <div>
            {/* Header */}
            < header className="flex justify-between items-center px-6 py-6 border-b mt-2" >
                <Link href="/">
                    <h1 className="text-5xl font-bold font-serif">
                    <span className="text-gray-100">⚡Shop</span>
                    <span className="text-teal-400">EE⚡</span>
                    </h1>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/cart">
                        <button className="text-4xl" aria-label="Go to cart">🛒</button>
                    </Link>
                    <button className="px-4 py-2 text-xl font-bold text-gray-200 bg-teal-600 rounded hover:bg-teal-800">
                        Login
                    </button>
                </div>
            </header >

            {/* Category Navigation */}
            <nav className="flex justify-center gap-4 py-3 border-b bg-gray-100">
                {categoryList.map((cat) => (
                    <Link key={cat} href={`/category/${cat}`}>
                        <button className="px-4 py-2 shadow rounded text-xl font-bold text-gray-200 bg-teal-600 hover:bg-teal-800" aria-label={`Go to ${cat}`}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    </Link>
                ))}

                <Link href="/sell">
                    <button className="px-4 py-2 shadow rounded text-xl font-bold text-gray-200 bg-sky-600 hover:bg-sky-800" aria-label="Go to Sell page">
                        Sell
                    </button>
                </Link>
            </nav>
        </div>
    );
}