const request = require('supertest');
const app = require('../server'); // Importamos nuestra app
const mongoose = require('mongoose');

// Desconectarse de la base de datos después de todas las pruebas
afterAll(async () => {
    await mongoose.connection.close();
});

describe('API de Tareas', () => {

  it('debería obtener una lista de tareas de la ruta /api/tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toEqual(200); // Esperamos una respuesta exitosa
    expect(res.body).toBeInstanceOf(Array); // Esperamos que la respuesta sea un array
  });

});