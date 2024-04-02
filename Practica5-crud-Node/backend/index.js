const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'user_postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'pass_postgres',
  port: 5432, 
});

app.get('/categorias', async (req, res) => {
  try {
    const result = await pool.query('SELECT name FROM category');
    res.json(result.rows);
    console.log(result.rows)
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
});

app.get('/subcategorias', async (req, res) => {
  try {
    const result = await pool.query('SELECT name FROM subcategory');
    res.json(result.rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
