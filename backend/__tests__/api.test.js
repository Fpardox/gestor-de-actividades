require('dotenv').config();

const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

// Esta función se ejecuta después de que TODAS las pruebas en este archivo terminan
afterAll(async () => {
    await mongoose.connection.close();
});

describe('API de Tareas', () => {

  it('debería obtener una lista de tareas de la ruta /api/tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

});