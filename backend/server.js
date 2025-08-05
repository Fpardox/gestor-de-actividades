const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- CONFIGURACIÓN DE CORS EXPLÍCITA ---
const corsOptions = {
  origin: 'https://gestor-tareas-frontend.netlify.app', // Reemplaza si tu URL de Netlify es otra
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
// --- FIN DE LA CONFIGURACIÓN DE CORS ---

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

// ... (El resto de tus rutas GET, POST, PUT, DELETE no cambia) ...

app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});

app.get('/api/tasks', async (req, res) => {
    // ...
});

app.post('/api/tasks', async (req, res) => {
    // ...
});

app.put('/api/tasks/:id', async (req, res) => {
    // ...
});

app.delete('/api/tasks/:id', async (req, res) => {
    // ...
});


app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});

module.exports = app;