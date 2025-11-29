const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "240hdfarmS",
  host: "localhost",
  port: 5432,
  database: "soccer_rentals"
});

module.exports = pool;
