import { db } from '@/app/db';
import { productsTable } from "@/app/db/schema";
import ProductCard from "@/components/ProductCard";

export default async function ProductsPage() {
  const products = await db
    .select({
      id: productsTable.id,
      name: productsTable.name,
      description: productsTable.description,
      price: productsTable.price,
      quantity: productsTable.quantity,
      image: productsTable.image,
    })
    .from(productsTable)
    .execute();

  return (
        <div className="grid grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}  // Assuming 'content' is the product description
              price={product.price}
              quantity={product.quantity}
              image={product.image}  // Assuming 'image' is the URL/path to the product image
            />
          ))}
        </div>
  );
}