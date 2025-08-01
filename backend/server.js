const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb+srv://pardo00:rrozfTgZFXhsW9of@cluster0.tsei59m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conexión a MongoDB exitosa.'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean
});

const Task = mongoose.model('Task', taskSchema);

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ... (El resto de tus rutas POST, PUT, DELETE sin cambios) ...

// Esta condición evita que el servidor se inicie automáticamente durante las pruebas
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
  });
}

module.exports = app; // Exportamos la app para usarla en las pruebas