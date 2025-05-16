import { db } from "@/app/db";
import { productsTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton"

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const product = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, Number(id)))
    .limit(1)
    .then((res) => res[0]);

  if (!product) {
    return notFound();
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 rounded-lg shadow-md object-cover"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-semibold text-green-600">${product.price}</p>
          <AddToCartButton productId={product.id} availableQuantity={product.quantity} />
        </div>
      </div>
    </div>
  );
}