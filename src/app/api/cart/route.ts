import { NextResponse } from 'next/server';
import { db } from '@/app/db';
import { cartTable, productsTable } from '@/app/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { productId, quantity } = data;

    if (!productId || !quantity || quantity <= 0) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, productId))
      .execute();

    if (!product || product.quantity < quantity) {
      return NextResponse.json({ error: 'Not enough stock' }, { status: 400 });
    }

    // Add or update cart item
    const [existing] = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.productId, productId))
      .execute();

    if (existing) {
      await db
        .update(cartTable)
        .set({ quantity: existing.quantity + quantity })
        .where(eq(cartTable.productId, productId))
        .execute();
    } else {
      await db.insert(cartTable).values({ productId, quantity }).execute();
    }

    // Decrease stock from product table
    await db
      .update(productsTable)
      .set({ quantity: product.quantity - quantity })
      .where(eq(productsTable.id, productId))
      .execute();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
