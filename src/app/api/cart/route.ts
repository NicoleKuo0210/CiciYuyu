import { NextResponse } from 'next/server';
import { db } from '@/app/db';
import { cartTable, productsTable } from '@/app/db/schema';
import { eq } from 'drizzle-orm';

// === POST: Add to cart ===
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

// === PUT: Update quantity in cart ===
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { productId, quantity } = data;

    if (!productId || quantity === undefined || quantity < 0) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, productId))
      .execute();

    const [cartItem] = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.productId, productId))
      .execute();

    if (!product || !cartItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    //REMOVE ALL FROM CART
    if (quantity === 0) {
      await db
        .delete(cartTable)
        .where(eq(cartTable.productId, productId))
        .execute();

      // Restore the entire cart quantity to product stock
      await db
        .update(productsTable)
        .set({ quantity: product.quantity + cartItem.quantity })
        .where(eq(productsTable.id, productId))
        .execute();

      return NextResponse.json({ success: true, deleted: true });
    }

    // ADD TO CART
    const quantityDelta = quantity - cartItem.quantity;

    if (quantityDelta > 0 && product.quantity < quantityDelta) {
      return NextResponse.json({ error: 'Not enough stock' }, { status: 400 });
    }

    await db
      .update(cartTable)
      .set({ quantity })
      .where(eq(cartTable.productId, productId))
      .execute();

    await db
      .update(productsTable)
      .set({ quantity: product.quantity - quantityDelta })
      .where(eq(productsTable.id, productId))
      .execute();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// export async function DELETE(req: Request) {
//   try {
//     const { productId, quantity } = await req.json();

//     if (!productId) {
//       return NextResponse.json({ error: "Missing productId" }, { status: 400 });
//     }

//     const [product] = await db
//       .select()
//       .from(productsTable)
//       .where(eq(productsTable.id, productId))
//       .execute();

//     await db
//       .delete(cartTable)
//       .where(eq(cartTable.productId, productId))
//       .execute();
//     await db
//       .update(productsTable)
//       .set({ quantity: product.quantity + quantity })
//       .where(eq(productsTable.id, productId))
//       .execute();

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Server error' }, { status: 500 });
//   }
// }