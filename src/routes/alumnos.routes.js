const express = require('express');
const alumnoControlador = require('../controllers/alumno.controller');

const api = express.Router();

api.post('/registrarAlumno', alumnoControlador.Registrar);
api.post('/loginAlumno', alumnoControlador.Login);

module.exports = api;

