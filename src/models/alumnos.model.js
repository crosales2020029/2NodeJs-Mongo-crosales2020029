const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const AlumnoSchema=Schema({
    nombre: String,
    cursos: [{
        nombreCurso: String, 
        idMaestroCurso:{type: Schema.Types.ObjectId, ref: 'Maestros'}
    }]
})

module.exports=mongoose.model('Alumnos', AlumnoSchema);



