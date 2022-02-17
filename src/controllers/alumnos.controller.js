const Usuario = require('../models/alumnos.model')
const Usuario = require('../models/usuarios.model')
const bcrypt = require('bcrypt-nodejs');

function crearAlumno(req, res) {
    var parametros = req.body;
    var alumnoModel = new Alumno();
    var usuarioModel = new Usuario();

    if (parametros.nombre && parametros.apellido && parametros.userName && parametros.password) {
        maestroModel.nombre = parametros.nombre;
        maestroModel.apellido = parametros.apellido;

        Maestro.find({ nombre: parametros.nombre, apellido: parametros.apellido }, (err, maestroEncontrado) => {
            if (maestroEncontrado.length == 0) {

                bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                    usuarioModel.userName = parametros.userName;
                    usuarioModel.rol = 'ROL_PROFESOR';
                    usuarioModel.password = passwordEncriptada;
                    usuarioModel.save((err, usuarioGuardado) => {
                        if (err) return res.status(500)
                            .send({ mensaje: 'Peticion Denegado' });
                        if (!usuarioGuardado) return res.status(500)
                            .send({ mensaje: 'Maestro Denegado' });

                        return res.status(200).send({ usuario: usuarioGuardado });
                    });
                    maestroModel.save((err, maestroGuardado) => {
                        if (err) return res.status(500)
                            .send({ mensaje: 'Peticion Denegada' });
                        if (!maestroGuardado) return res.status(500)
                            .send({ mensaje: 'Maestro Denegado' });

                        return res.status(200).send({ maestro: maestroGuardado });
                    });

                });
            } else {
                return res.status(500)
                    .send({ mensaje: 'No Existe Maestro ' });
            }
        })
    }
}

module.exports = {
    crearAlumno
}