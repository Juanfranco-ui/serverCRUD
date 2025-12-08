const pool = require("./db");

async function checkSchema() {
    try {
        const res = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'fields';
    `);
        console.log("Columns in 'fields' table:");
        res.rows.forEach(row => {
            console.log(`- ${row.column_name} (${row.data_type})`);
        });
    } catch (err) {
        console.error("Error checking schema:", err.message);
    } finally {
        pool.end();
    }
}

checkSchema();
