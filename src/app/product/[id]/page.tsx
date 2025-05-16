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
    <div className="p-8 mx-auto">
      <div className="bg-white rounded-3xl shadow-xl p-10 flex flex-col md:flex-row gap-12 items-start">
        {/* Product Image */}
        <div className="self-center w-full md:w-[400px] h-[400px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="mt-6 flex-1">
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold text-gray-900">{product.name}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
            <p className="text-3xl font-bold text-green-600">${product.price}</p>
          </div>
          {/* Add to Cart Button */}
          <div className="mt-30">
            <AddToCartButton
              productId={product.id}
              availableQuantity={product.quantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
