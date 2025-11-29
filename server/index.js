const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ============================================
// RUTAS DE PRUEBA
// ============================================
app.get("/", (req, res) => {
  res.send("API funcionando ✅");
});

// ============================================
// RUTAS DE CANCHAS (FIELDS)
// ============================================

// GET - Obtener todas las canchas
app.get("/fields", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM fields ORDER BY field_id");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al obtener las canchas" });
  }
});

// GET - Obtener una cancha por ID
app.get("/fields/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM fields WHERE field_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Cancha no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al obtener la cancha" });
  }
});

// POST - Crear nueva cancha
app.post("/fields", async (req, res) => {
  try {
    const {
      complex_id,
      name,
      sports,
      football_types,
      start_rounding,
      floor_type,
      attributes
    } = req.body;

    const result = await pool.query(
      `INSERT INTO fields 
       (complex_id, name, sports, football_types, start_rounding, floor_type, attributes) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [complex_id, name, sports, football_types, start_rounding, floor_type, attributes]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// PUT - Actualizar cancha
app.put("/fields/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      complex_id,
      name,
      sports,
      football_types,
      start_rounding,
      floor_type,
      attributes
    } = req.body;

    const result = await pool.query(
      `UPDATE fields 
       SET complex_id = $1, name = $2, sports = $3, football_types = $4, 
           start_rounding = $5, floor_type = $6, attributes = $7 
       WHERE field_id = $8 
       RETURNING *`,
      [complex_id, name, sports, football_types, start_rounding, floor_type, attributes, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "La cancha no existe" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error PUT:", err.message);
    res.status(500).json({ error: "Error al actualizar la cancha" });
  }
});

// DELETE - Eliminar cancha
app.delete("/fields/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM fields WHERE field_id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Cancha no encontrada" });
    }

    res.json({ message: "Cancha eliminada correctamente" });
  } catch (err) {
    console.error("Error DELETE:", err.message);
    res.status(500).json({ error: "Error al eliminar la cancha" });
  }
});

// ============================================
// SERVIDOR
// ============================================
app.listen(5000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:5000");
});