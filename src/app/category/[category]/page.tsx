import { db } from "@/app/db";
import { productsTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import Link from 'next/link';

import { Category } from "@/lib/category"
import { notFound } from "next/navigation";

export default async function ProductsPage({ params }: { params: { category: string } }) {
  const categoryParam = params.category;

  const products = await db
    .select({
      id: productsTable.id,
      name: productsTable.name,
      description: productsTable.description,
      price: productsTable.price,
      quantity: productsTable.quantity,
      image: productsTable.image,
      category: productsTable.category,
    })
    .from(productsTable)
    .where(eq(productsTable.category, categoryParam as Category))
    .execute();

  if (products.length === 0) {
    return (<h1 className="text-2xl font-bold mb-4 capitalize">empty</h1>
    )
  }
  else {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <div className="grid grid-cols-3 gap-6">
          {products.map((product) => (
            <div className="w-[500px] p-4 bg-white rounded hover:bg-gray-200  shadow h-full block">
              <Link
                href={`/product/${product.id}`}>
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  quantity={product.quantity}
                  image={product.image}
                />
              </Link>
              <AddToCartButton productId={product.id} availableQuantity={product.quantity} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}