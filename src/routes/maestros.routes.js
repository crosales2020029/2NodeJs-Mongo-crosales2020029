const express = require('express');
const maestroControlador = require('../controllers/maestros.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/registrarMaestros', maestroControlador.crearMaestro);
api.put('/agregarCursos/:idMaestro', md_autenticacion.Auth, maestroControlador.agregarCursos);
api.put('/editarCursos/:idCurso', md_autenticacion.Auth, maestroControlador.editarCursos);



module.exports = api;



