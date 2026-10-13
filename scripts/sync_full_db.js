const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:thind26ff@localhost:5432/cortex_db',
});

async function syncAll() {
  console.log('--- 1. Updating Profile in PostgreSQL ---');
  await pool.query(`
    UPDATE jeenu_profiles SET
      name = 'Jeenu Soni',
      bio = 'Professional Digital Creator & Design Vlogger based in Gajsinghpur. Specializing in high-end brand collaborations, fashion vlogging, visual storytelling, and creative direction.',
      profile_image = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
      cover_image = 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1600&auto=format&fit=crop',
      instagram_url = 'https://www.instagram.com/jot_soni_0_0?stkn=MXhvY29mdmlsY3JpeA==',
      facebook_url = 'https://www.facebook.com/jeenu.soni.5',
      youtube_url = 'https://youtube.com/@jeenusoni',
      whatsapp_number = '9351696681',
      contact_number = '9351696681',
      location = 'Gajsinghpur, Rajasthan • Digital Creator',
      hero_title = 'Jeenu Soni',
      hero_subtitle = 'Design Vlogs • Creative Profession • Style',
      preset = 'luxury-love',
      is_published = true,
      updated_at = NOW()
    WHERE slug = 'jeenusoni'
  `);

  console.log('--- 2. Updating Social Links in PostgreSQL ---');
  await pool.query('DELETE FROM jeenu_social_links');
  const socials = [
    { id: 'soc-1', platform: 'Instagram', url: 'https://www.instagram.com/jot_soni_0_0?stkn=MXhvY29mdmlsY3JpeA==', label: '@jot_soni_0_0 (Primary Profile)', icon: 'instagram', sort_order: 1 },
    { id: 'soc-2', platform: 'YouTube', url: 'https://youtube.com/@jeenusoni', label: 'Jeenu Soni Official Channel', icon: 'youtube', sort_order: 2 },
    { id: 'soc-3', platform: 'WhatsApp', url: 'https://wa.me/919351696681', label: 'WhatsApp Ad Inquiries (9351696681)', icon: 'whatsapp', sort_order: 3 },
    { id: 'soc-4', platform: 'Facebook', url: 'https://www.facebook.com/jeenu.soni.5', label: 'Jeenu Soni Facebook Profile', icon: 'facebook', sort_order: 4 },
  ];
  for (const s of socials) {
    await pool.query(`
      INSERT INTO jeenu_social_links (id, platform, url, label, icon, sort_order, is_active, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, true, NOW(), NOW())
    `, [s.id, s.platform, s.url, s.label, s.icon, s.sort_order]);
  }

  console.log('--- 3. Updating Galleries in PostgreSQL (Clean 4 lookbooks) ---');
  await pool.query('DELETE FROM jeenu_galleries');
  const galleries = [
    { id: 'gal-1', image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop', title: 'Golden Hour Elegance', caption: 'Basking in sunset light in silk and gold accents.', sort_order: 1 },
    { id: 'gal-2', image_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop', title: 'Couture Dreams', caption: 'Embracing soft pink textures and timeless silhouettes.', sort_order: 2 },
    { id: 'gal-3', image_url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop', title: 'Chic Urban Glamour', caption: 'Modern street glamour in high-fashion black & rose tones.', sort_order: 3 },
    { id: 'gal-4', image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop', title: 'Radiant Smiles', caption: 'Pure joy and intimate romantic stories captured.', sort_order: 4 },
  ];
  for (const g of galleries) {
    await pool.query(`
      INSERT INTO jeenu_galleries (id, image_url, title, caption, sort_order, published, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, true, NOW(), NOW())
    `, [g.id, g.image_url, g.title, g.caption, g.sort_order]);
  }

  console.log('--- 4. Checking Vlogs in PostgreSQL ---');
  const vlogsRes = await pool.query('SELECT count(*) FROM jeenu_vlogs');
  console.log('Vlogs count:', vlogsRes.rows[0].count);

  console.log('--- DONE: Database fully synchronized with authentic Jeenu Soni data! ---');
  await pool.end();
}

syncAll().catch((err) => {
  console.error(err);
  pool.end();
});
