import { NextResponse } from 'next/server';

// In-memory persistent store fallback for Handwork Products API
let memoryProducts: any[] = [];

export async function GET() {
  return NextResponse.json({ success: true, count: memoryProducts.length, data: memoryProducts });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newProduct = {
      id: `hw-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString().split('T')[0]
    };
    memoryProducts.unshift(newProduct);
    return NextResponse.json({ success: true, message: 'Product created successfully', data: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;
    memoryProducts = memoryProducts.map((p) => (p.id === id ? { ...p, ...updates } : p));
    return NextResponse.json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update product' }, { status: 500 });
  }
}
