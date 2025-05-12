import { NextResponse } from 'next/server';
import { db } from '@/app/db'; // Adjust your path
import { productsTable } from '@/app/db/schema'; // Adjust your path

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { name, description, price, quantity, image, category } = data;

    if (!name || !description || !price || !quantity || !image || !category) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const product = req.body;

    // Log the result or return it in the response
    const result = await db.insert(productsTable).values({
      name,
      description,
      price,
      quantity,
      image,
      category,
    });
    console.log('Inserted product:', result); // Logs to console

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
