import { NextResponse } from 'next/server';

let memoryVideos: any[] = [
  {
    id: 'vid-01',
    title: 'Handmade Resin Frame Crafting & Gold Leaf Inlay',
    youtubeUrl: 'https://www.youtube.com/watch?v=l917j0L-t8A',
    youtubeId: 'l917j0L-t8A',
    description: 'Watch how master artisans craft optical resin photo frames with gold leaf flecks and preserved crimson roses.',
    category: 'Handmade Frames',
    featured: true,
    createdAt: '2026-02-10'
  },
  {
    id: 'vid-02',
    title: 'Personalized Resin Name Plate Making Process',
    youtubeUrl: 'https://www.youtube.com/watch?v=rX7Q_Z3o8iE',
    youtubeId: 'rX7Q_Z3o8iE',
    description: 'Step-by-step casting of champagne gold acrylic typography in deep obsidian resin with white baby breath flowers.',
    category: 'Name Plates',
    featured: true,
    createdAt: '2026-02-15'
  }
];

export async function GET() {
  return NextResponse.json({ success: true, count: memoryVideos.length, data: memoryVideos });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, youtubeUrl, description, category } = body;
    const match = youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    const youtubeId = match ? match[1] : 'l917j0L-t8A';

    const newVideo = {
      id: `vid-${Date.now()}`,
      title,
      youtubeUrl,
      youtubeId,
      description: description || '',
      category: category || 'Craft Process',
      featured: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    memoryVideos.unshift(newVideo);
    return NextResponse.json({ success: true, message: 'Video added successfully', data: newVideo }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to add video' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    memoryVideos = memoryVideos.filter((v) => v.id !== id);
    return NextResponse.json({ success: true, message: 'Video deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete video' }, { status: 500 });
  }
}
