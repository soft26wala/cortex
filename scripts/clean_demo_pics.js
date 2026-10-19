const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:thind26ff@localhost:5432/cortex_db',
});

async function cleanDemoPics() {
  try {
    console.log('Connecting to PostgreSQL...');
    // 1. Remove demo profile pic
    const profRes = await pool.query(`
      UPDATE jeenu_profiles
      SET profile_image = ''
      WHERE profile_image LIKE '%unsplash%' OR profile_image LIKE '%photo-1534528741775%'
      RETURNING id, name, profile_image
    `);
    console.log('Updated profile_image in jeenu_profiles:', profRes.rows);

    // 2. Delete demo gallery pictures
    const galRes = await pool.query(`
      DELETE FROM jeenu_galleries
      WHERE image_url LIKE '%unsplash%' OR id IN ('gal-1', 'gal-2', 'gal-3', 'gal-4')
      RETURNING id, title
    `);
    console.log('Deleted demo galleries from jeenu_galleries:', galRes.rows);

    // Verify
    const checkProf = await pool.query(`SELECT id, name, profile_image FROM jeenu_profiles`);
    console.log('Current profile in DB:', checkProf.rows);

    const checkGal = await pool.query(`SELECT id, title, image_url FROM jeenu_galleries`);
    console.log('Current galleries in DB:', checkGal.rows);

    console.log('Demo pictures successfully cleaned from database!');
  } catch (err) {
    console.error('Error cleaning demo pics:', err);
  } finally {
    await pool.end();
  }
}

cleanDemoPics();
