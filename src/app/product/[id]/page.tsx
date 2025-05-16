import { db } from "@/app/db";
import { productsTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

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
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="w-full md:w-[400px] h-[400px] shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-2xl shadow-lg"
          />
        </div>
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-gray-700 text-lg">{product.description}</p>
          <p className="text-2xl font-semibold text-green-700">${product.price}</p>
          <AddToCartButton
            productId={product.id}
            availableQuantity={product.quantity}
          />
        </div>
      </div>
    </div>
  );
}
