const Maestro = require('../models/maestros.model');
const Usuario = require('../models/usuarios.model')
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function crearMaestro(req, res) {
    var parametros = req.body;
    var maestroModel = new Maestro();
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
                            .send({ mensaje: 'Peticion Denegada' });
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
                    .send({ mensaje: 'No Existe Maestro' });
            }
        })
    }
}

function agregarCursos(req, res){
    var idMaestro = req.params.idMaestro;
    var parametros = req.body;

    Maestro.findByIdAndUpdate(idMaestro, { $push: { cursos: { nombreCurso: parametros.nombreCurso } } }, { new: true }, (err, cursoAgregado) => {
        if (err) return res.status(500).send({ mensaje: "Peticion Denegada" })
        if (!cursoAgregado) return res.status(404).send({ mensaje: "Curso Denegado" })

        return res.status(200).send({ curso: cursoAgregado })
    })
}

function editarCursos(req, res) {
    var idCurso = req.params.idCurso;
    var parametros = req.body

    Maestro.findOneAndUpdate({ cursos: { $elemMatch: { _id: idCurso} } },
        { "cursos.$.nombreCurso": parametros.nombreCurso }, { new: true }, (err, cursoEditado) => {
            if (err) return res.status(500).send({ mensaje: "Peticion Denegada" })
            if (!cursoEditado) return res.status(404).send({ mensaje: "No Tienes este permiso" })

            return res.status(200).send({ Curso: cursoEditado })
        })
}



module.exports = {
    crearMaestro,
    agregarCursos,
    editarCursos,
}