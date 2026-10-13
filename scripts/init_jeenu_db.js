const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:thind26ff@localhost:5432/cortex_db',
});

async function init() {
  console.log('Connecting to PostgreSQL cortex_db...');
  const client = await pool.connect();
  try {
    console.log('Creating tables...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS jeenu_profiles (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL DEFAULT 'Jeenu Soni',
        slug TEXT UNIQUE NOT NULL DEFAULT 'jeenusoni',
        bio TEXT,
        profile_image TEXT,
        cover_image TEXT,
        instagram_url TEXT,
        facebook_url TEXT,
        youtube_url TEXT,
        whatsapp_number TEXT,
        contact_number TEXT,
        location TEXT DEFAULT 'Gajsinghpur, Rajasthan • Digital Creator',
        hero_title TEXT DEFAULT 'Jeenu Soni',
        hero_subtitle TEXT DEFAULT 'Moments • Stories • Style • Love',
        preset TEXT DEFAULT 'luxury-love',
        custom_theme JSONB DEFAULT '{}',
        custom_hero JSONB DEFAULT '{}',
        custom_layout JSONB DEFAULT '{}',
        is_published BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS jeenu_vlogs (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT NOT NULL,
        thumbnail TEXT NOT NULL,
        video_url TEXT NOT NULL,
        category TEXT DEFAULT 'Lifestyle',
        published BOOLEAN DEFAULT TRUE,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS jeenu_galleries (
        id TEXT PRIMARY KEY,
        image_url TEXT NOT NULL,
        title TEXT,
        caption TEXT,
        sort_order INT DEFAULT 0,
        published BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS jeenu_social_links (
        id TEXT PRIMARY KEY,
        platform TEXT NOT NULL,
        url TEXT NOT NULL,
        label TEXT NOT NULL,
        icon TEXT,
        sort_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS jeenu_ad_leads (
        id TEXT PRIMARY KEY,
        client_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        location TEXT NOT NULL,
        business_name TEXT,
        advertisement_type TEXT,
        budget TEXT,
        message TEXT,
        contact_method TEXT,
        status TEXT DEFAULT 'NEW',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_jeenu_vlogs_slug ON jeenu_vlogs(slug);
      CREATE INDEX IF NOT EXISTS idx_jeenu_vlogs_published ON jeenu_vlogs(published);
      CREATE INDEX IF NOT EXISTS idx_jeenu_vlogs_sort_order ON jeenu_vlogs(sort_order);
      CREATE INDEX IF NOT EXISTS idx_jeenu_galleries_published ON jeenu_galleries(published);
      CREATE INDEX IF NOT EXISTS idx_jeenu_galleries_sort_order ON jeenu_galleries(sort_order);
      CREATE INDEX IF NOT EXISTS idx_jeenu_ad_leads_status ON jeenu_ad_leads(status);
      CREATE INDEX IF NOT EXISTS idx_jeenu_ad_leads_created_at ON jeenu_ad_leads(created_at DESC);
    `);
    console.log('Tables created successfully.');

    // Seed Profile if empty
    const profCheck = await client.query('SELECT COUNT(*) FROM jeenu_profiles');
    if (parseInt(profCheck.rows[0].count) === 0) {
      console.log('Seeding Jeenu Soni profile...');
      await client.query(`
        INSERT INTO jeenu_profiles (
          id, name, slug, bio, profile_image, cover_image, instagram_url, facebook_url, youtube_url,
          whatsapp_number, contact_number, location, hero_title, hero_subtitle, preset, is_published, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW(), NOW()
        )
      `, [
        'jeenu-prof-1',
        'Jeenu Soni',
        'jeenusoni',
        'Professional Digital Creator & Design Vlogger based in Gajsinghpur. Specializing in high-end brand collaborations, fashion vlogging, visual storytelling, and creative direction.',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1600&auto=format&fit=crop',
        'https://www.instagram.com/jot_soni_0_0?stkn=MXhvY29mdmlsY3JpeA==',
        'https://facebook.com/jeenusoni.official',
        'https://youtube.com/@jeenusoni',
        '+919876543210',
        '+919876543210',
        'Gajsinghpur, Rajasthan • Digital Creator',
        'Jeenu Soni',
        'Design Vlogs • Creative Profession • Style',
        'luxury-love',
        true
      ]);
    }

    // Seed Vlogs if empty
    const vlogCheck = await client.query('SELECT COUNT(*) FROM jeenu_vlogs');
    if (parseInt(vlogCheck.rows[0].count) === 0) {
      console.log('Seeding initial vlogs...');
      const initialVlogs = [
        {
          id: 'vlog-1',
          title: 'Jeenu Soni (@jot_soni_0_0) — Elegant Evening & Haute Couture Design Vlog',
          slug: 'jeenu-soni-design-vlog-reel',
          description: 'A cinematic behind-the-scenes look into exclusive luxury tailoring, styling masterclass, and digital influencer aesthetics with Jeenu Soni.',
          thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          category: 'Fashion & Style',
          published: true,
          sort_order: 1,
        },
        {
          id: 'vlog-2',
          title: 'Jeenu Soni (@jot_soni_0_0) — Behind The Scenes Luxury Brand Collab',
          slug: 'jeenu-soni-brand-collab-reel',
          description: 'Exclusive partnership campaign with premium jewelry, haute couture garments, and creative styling showcase.',
          thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          category: 'Brand Collab',
          published: true,
          sort_order: 2,
        },
        {
          id: 'vlog-3',
          title: 'Jeenu Soni (@jot_soni_0_0) — Royal Heritage Staycation & Design Story',
          slug: 'jeenu-soni-royal-staycation-reel',
          description: 'Exploring architecture, royal palettes, and timeless aesthetics on location in Rajasthan.',
          thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          category: 'Travel & Lifestyle',
          published: true,
          sort_order: 3,
        },
      ];

      for (const v of initialVlogs) {
        await client.query(`
          INSERT INTO jeenu_vlogs (id, title, slug, description, thumbnail, video_url, category, published, sort_order, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
          ON CONFLICT (slug) DO NOTHING
        `, [v.id, v.title, v.slug, v.description, v.thumbnail, v.videoUrl, v.category, v.published, v.sort_order]);
      }
    }

    // Seed Gallery if empty
    const galCheck = await client.query('SELECT COUNT(*) FROM jeenu_galleries');
    if (parseInt(galCheck.rows[0].count) === 0) {
      console.log('Seeding initial galleries...');
      const initialGalleries = [
        { id: 'gal-1', image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop', title: 'Golden Hour Elegance', caption: 'Basking in sunset light in silk and gold accents.', sort_order: 1 },
        { id: 'gal-2', image_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop', title: 'Couture Dreams', caption: 'Embracing soft pink textures and timeless silhouettes.', sort_order: 2 },
        { id: 'gal-3', image_url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop', title: 'Chic Urban Glamour', caption: 'Modern street glamour in high-fashion black & rose tones.', sort_order: 3 },
        { id: 'gal-4', image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop', title: 'Radiant Smiles', caption: 'Pure joy and intimate romantic stories captured.', sort_order: 4 },
      ];

      for (const g of initialGalleries) {
        await client.query(`
          INSERT INTO jeenu_galleries (id, image_url, title, caption, sort_order, published, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, true, NOW(), NOW())
          ON CONFLICT (id) DO NOTHING
        `, [g.id, g.image_url, g.title, g.caption, g.sort_order]);
      }
    }

    // Seed Social Links if empty
    const socCheck = await client.query('SELECT COUNT(*) FROM jeenu_social_links');
    if (parseInt(socCheck.rows[0].count) === 0) {
      console.log('Seeding initial social links...');
      const initialSocials = [
        { id: 'soc-1', platform: 'Instagram', url: 'https://www.instagram.com/jot_soni_0_0?stkn=MXhvY29mdmlsY3JpeA==', label: '@jot_soni_0_0 (Primary Profile)', icon: 'instagram', sort_order: 1 },
        { id: 'soc-2', platform: 'YouTube', url: 'https://youtube.com/@jeenusoni', label: 'Jeenu Soni Official Channel', icon: 'youtube', sort_order: 2 },
        { id: 'soc-3', platform: 'WhatsApp', url: 'https://wa.me/919876543210', label: 'WhatsApp Ad Inquiries', icon: 'whatsapp', sort_order: 3 },
        { id: 'soc-4', platform: 'Facebook', url: 'https://facebook.com/jeenusoni.official', label: 'Jeenu Soni Verified Page', icon: 'facebook', sort_order: 4 },
      ];

      for (const s of initialSocials) {
        await client.query(`
          INSERT INTO jeenu_social_links (id, platform, url, label, icon, sort_order, is_active, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, $6, true, NOW(), NOW())
          ON CONFLICT (id) DO NOTHING
        `, [s.id, s.platform, s.url, s.label, s.icon, s.sort_order]);
      }
    }

    // Seed Demo Leads if empty
    const leadCheck = await client.query('SELECT COUNT(*) FROM jeenu_ad_leads');
    if (parseInt(leadCheck.rows[0].count) === 0) {
      console.log('Seeding initial demo leads...');
      const initialLeads = [
        {
          id: 'lead-1',
          client_name: 'Rajveer Singhania',
          phone: '+919811223344',
          location: 'Jaipur, Rajasthan',
          business_name: 'Singhania Heritage Silks & Jewels',
          advertisement_type: 'Sponsored Reel & Story',
          budget: '₹50,000 - ₹1,00,000',
          message: 'Looking for a royal traditional lookbook promotion for our upcoming festive Diwali collection.',
          contact_method: 'WhatsApp',
          status: 'NEW',
        },
        {
          id: 'lead-2',
          client_name: 'Simran Arora',
          phone: '+919988776655',
          location: 'Delhi NCR',
          business_name: 'LuxeGlow Skincare Studio',
          advertisement_type: 'Full Vlog Feature & Product Placement',
          budget: '₹1,00,000+',
          message: 'Want to collaborate with Jeenu for a dedicated skincare aesthetic vlog series and unboxing.',
          contact_method: 'Phone',
          status: 'CONTACTED',
        },
      ];

      for (const l of initialLeads) {
        await client.query(`
          INSERT INTO jeenu_ad_leads (id, client_name, phone, location, business_name, advertisement_type, budget, message, contact_method, status, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
          ON CONFLICT (id) DO NOTHING
        `, [l.id, l.client_name, l.phone, l.location, l.business_name, l.advertisement_type, l.budget, l.message, l.contact_method, l.status]);
      }
    }

    console.log('PostgreSQL database cortex_db fully initialized & seeded!');
  } finally {
    client.release();
    await pool.end();
  }
}

init().catch(console.error);
