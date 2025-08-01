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

// Ruta para OBTENER todas las tareas
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para CREAR una nueva tarea
app.post('/api/tasks', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    completed: false
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para ACTUALIZAR una tarea por su ID
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.completed = req.body.completed;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para ELIMINAR una tarea por su ID
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Esta condición evita que el servidor se inicie automáticamente durante las pruebas
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
  });
}

module.exports = app;