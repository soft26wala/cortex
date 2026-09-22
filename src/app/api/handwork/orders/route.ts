import { NextResponse } from 'next/server';

let memoryOrders: any[] = [];

export async function GET() {
  return NextResponse.json({ success: true, count: memoryOrders.length, data: memoryOrders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderNum = `HW-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      ...body,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    memoryOrders.unshift(newOrder);
    return NextResponse.json({ success: true, message: 'Order submitted successfully', data: newOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status, adminNotes, totalPrice } = body;
    memoryOrders = memoryOrders.map((o) =>
      o.id === id ? { ...o, ...(status ? { status } : {}), ...(adminNotes ? { adminNotes } : {}), ...(totalPrice ? { totalPrice } : {}) } : o
    );
    return NextResponse.json({ success: true, message: 'Order updated successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update order' }, { status: 500 });
  }
}
