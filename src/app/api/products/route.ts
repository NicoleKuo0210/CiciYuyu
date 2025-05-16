import { NextResponse } from 'next/server';
import { db } from '@/app/db';
import { productsTable } from '@/app/db/schema';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { name, description, price, quantity, image, category } = data;

    if (!name || !description || !price || !quantity || !image || !category) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const result = await db.insert(productsTable).values({
      name,
      description,
      price,
      quantity,
      image,
      category,
    });

    console.log('Inserted product:', result);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Product insert error:', e);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
