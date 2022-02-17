const Usuario = require('../models/usuarios.model')
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function CrearPrimerUser(req, res) {
    var usuarioModel = new Usuario();
    Usuario.find({ userName: 'PROFESOR' }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Peticion Denegada' });
        if (usuarioEncontrado.length == 0) {
            usuarioModel.userName = 'PROFESOR'
            usuarioModel.rol = 'ROL_PROFESOR'
            usuarioModel.password = bcrypt.hash('123456', null, null, (err, passwordEncriptada) => {
                usuarioModel.password = passwordEncriptada;
                usuarioModel.save((err, usuarioGuardado) => {
                    if (err) return res.status(500)
                        .send({ mensaje: 'Peticion Denegada' });
                    if (!usuarioGuardado) return res.status(500)
                        .send({ mensaje: 'Usuario Mal Agregado' });
    
                    return res.status(200).send({ usuario: usuarioGuardado });
                });
            });
        }else{
            return res.status(500).send({mensaje: "Profesor Agregado"})
        }
    })
    
}

function Login(req, res) {
    var parametros = req.body;
    Usuario.findOne({ userName: parametros.userName }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Peticion Denegada' });
        if (usuarioEncontrado) {
            bcrypt.compare(parametros.password, usuarioEncontrado.password,
                (err, verificacionPassword) => {//TRUE OR FALSE
                    if (verificacionPassword) {
                        if (parametros.obtenerToken === 'true') {
                            return res.status(200)
                                .send({ token: jwt.crearToken(usuarioEncontrado) })
                        } else {
                            usuarioEncontrado.password = undefined;
                            return res.status(200)
                                .send({ usuario: "Sesion Mal Iniciada" })
                        }
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'Contrasena Mala' });
                    }
                })

        } else {
            return res.status(500)
                .send({ mensaje: 'Usuario No Encontrado' })
        }
    })
}


module.exports = {
    CrearPrimerUser,
    Login
}