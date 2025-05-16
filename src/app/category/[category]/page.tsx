import { db } from "@/app/db";
import { productsTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import Link from 'next/link';

import { categoryList, Category } from "@/lib/category"
import { notFound } from "next/navigation";

export default async function ProductsPage({ params }: { params: { category: string } }) {
  console.log("📦 category param:", params); // should log during server render
  const categoryParam = params.category;

  if (!categoryList.includes(categoryParam as Category)) {
    notFound(); // shows 404 page
  }

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
    return (
      <h1 className="p-4 text-2xl font-bold mb-4">Empty</h1>
    )
  }
  else {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          {categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}
        </h1>
        <div className="grid grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="w-[500px] p-4 bg-white rounded hover:bg-gray-200  shadow h-full block">
              <Link
                href={`/product/${product.id}`}>
                <ProductCard
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