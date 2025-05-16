import { db } from "@/app/db";
import { cartTable, productsTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

export default async function CartPage() {
  const cartItems = await db
    .select({
      id: productsTable.id,
      name: productsTable.name,
      description: productsTable.description,
      price: productsTable.price,
      image: productsTable.image,
      stock: productsTable.quantity,
      quantity: cartTable.quantity, // the quantity added to cart
    })
    .from(cartTable)
    .innerJoin(productsTable, eq(cartTable.productId, productsTable.id));

  if (cartItems.length === 0) {
    notFound(); // optional: redirect to 404 or empty cart page
  }

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="flex flex-col gap-6 items-center">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="w-[1200px] p-4 bg-white rounded hover:bg-gray-200 shadow h-full"
          >
            <div className="flex items-center justify-between">
              <div className="flex-shrink-0">
                <ProductCard
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  quantity={item.stock} // Consider renaming this to make meaning clearer
                  image={item.image}
                />
              </div>
              {/* Right side info */}
              <div className="ml-6 text-right pr-8">
                <p className="text-xl">
                  <span className="text-gray-600 font-bold">{item.quantity}</span>{" "}
                  <span className="text-gray-600">in cart</span>
                </p>
                <p className="text-xl mt-2">
                 <span className="text-gray-600 font-bold">Subtotal</span>
                  <span className="text-3xl ml-20 text-green-600 font-bold">{item.price*item.quantity}</span>{" "}
                  <span className="ml-5 text-gray-600 font-bold"> NTD</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
