const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000; // Usa el puerto de Render, o 3000 si es local

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conexión a MongoDB exitosa.'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean
});

const Task = mongoose.model('Task', taskSchema);

// --- Rutas de la API (sin cambios) ---
app.get('/api/tasks', async (req, res) => { /* ... tu código ... */ });
app.post('/api/tasks', async (req, res) => { /* ... tu código ... */ });
app.put('/api/tasks/:id', async (req, res) => { /* ... tu código ... */ });
app.delete('/api/tasks/:id', async (req, res) => { /* ... tu código ... */ });
app.get('/', (req, res) => { res.send('¡Backend funcionando!'); });


app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});

module.exports = app;