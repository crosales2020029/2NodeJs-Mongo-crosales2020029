const express = require('express');
const cors = require('cors');
var app = express();

const UsuarioRuta = require('./src/routes/usuarios.routes');
const MaestroRuta = require('./src/routes/maestros.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use('/api', UsuarioRuta, MaestroRuta);

module.exports = app;