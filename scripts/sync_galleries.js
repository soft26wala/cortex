const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:thind26ff@localhost:5432/cortex_db',
});

async function run() {
  await pool.query('DELETE FROM jeenu_galleries');
  const items = [
    {
      id: 'gal-1',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
      title: 'Golden Hour Elegance',
      caption: 'Basking in sunset light in silk and gold accents.',
      sortOrder: 1,
    },
    {
      id: 'gal-2',
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
      title: 'Couture Dreams',
      caption: 'Embracing soft pink textures and timeless silhouettes.',
      sortOrder: 2,
    },
    {
      id: 'gal-3',
      imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop',
      title: 'Chic Urban Glamour',
      caption: 'Modern street glamour in high-fashion black & rose tones.',
      sortOrder: 3,
    },
    {
      id: 'gal-4',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop',
      title: 'Radiant Smiles',
      caption: 'Pure joy and intimate romantic stories captured.',
      sortOrder: 4,
    },
  ];

  for (const item of items) {
    await pool.query(
      `INSERT INTO jeenu_galleries (id, image_url, title, caption, sort_order, published, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, true, NOW(), NOW())`,
      [item.id, item.imageUrl, item.title, item.caption, item.sortOrder]
    );
  }

  const res = await pool.query('SELECT id, title, image_url, sort_order FROM jeenu_galleries ORDER BY sort_order ASC');
  console.log('Galleries in Postgres updated successfully. Total count:', res.rows.length);
  res.rows.forEach(r => console.log(`- [${r.id}] ${r.title} (${r.image_url.slice(0, 50)}...)`));
  await pool.end();
}

run().catch((err) => {
  console.error(err);
  pool.end();
});
