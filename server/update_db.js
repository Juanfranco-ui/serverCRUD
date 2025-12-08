const pool = require("./db");

async function updateSchema() {
  try {
    console.log("Dropping tables...");
    await pool.query("DROP TABLE IF EXISTS fields");
    await pool.query("DROP TABLE IF EXISTS complexes");

    console.log("Creating complexes table...");
    await pool.query(`
      CREATE TABLE complexes (
        complex_id SERIAL PRIMARY KEY,
        owner_id INTEGER,
        name VARCHAR(100),
        address VARCHAR(255),
        coordinates VARCHAR(100),
        phone VARCHAR(50),
        status VARCHAR(20),
        mercado_pago BOOLEAN DEFAULT FALSE,
        beelup BOOLEAN DEFAULT FALSE,
        hours JSONB,
        services TEXT[],
        logo_url VARCHAR(255),
        cover_url VARCHAR(255)
      );
    `);

    console.log("Creating fields table...");
    await pool.query(`
      CREATE TABLE fields (
        field_id SERIAL PRIMARY KEY,
        complex_id INTEGER REFERENCES complexes(complex_id),
        name VARCHAR(100),
        sports TEXT[],
        football_types TEXT[],
        start_rounding VARCHAR(50),
        floor_type VARCHAR(50),
        attributes TEXT[]
      );
    `);

    console.log("Schema updated successfully!");
  } catch (err) {
    console.error("Error updating schema:", err);
  } finally {
    pool.end();
  }
}

updateSchema();
