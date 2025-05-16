import { NextResponse } from 'next/server';
import { db } from '@/app/db';
import { cartTable, productsTable } from '@/app/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function POST() {
  try {
    // 1. Fetch all cart items with product info
    const cartItems = await db
      .select({
        productId: cartTable.productId,
        cartQuantity: cartTable.quantity,
        stock: productsTable.quantity,
      })
      .from(cartTable)
      .innerJoin(productsTable, eq(cartTable.productId, productsTable.id));

    // 2. Update product quantities
    for (const item of cartItems) {
      if (item.stock <= 0) {
        // Delete product if stock is 0 or less
        await db.delete(cartTable).where(eq(cartTable.productId, item.productId));
        await db.delete(productsTable).where(eq(productsTable.id, item.productId));
      }
    }

    // 3. Clear the cart
    await db.delete(cartTable);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Checkout failed:', e);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
