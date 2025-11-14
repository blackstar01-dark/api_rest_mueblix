const mongoose = require('mongoose');
const { Schema } = mongoose;

const empleadosSchema = new Schema({
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    foto: {type: String, required: false},
    estatus: {type: String, required: true, default: 'activo'},
    rol: {type: String, required: true},
    fecha_nacimiento: {type: Date, required: true},
    telefono: {type: String, required: false},
    direccion: {
        calle: {type: String, required: false},
        codigoPostal: {type: String, required: false},
        estado: {type: String, required: false},
    },
}, {timestamps: true});

const Empleado = mongoose.model('Empleado', empleadosSchema, 'empleados');

module.exports = Empleado;