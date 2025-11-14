    const mongoose = require('mongoose');
    const { Schema } = mongoose;

    const clientesSchema = new Schema({
        nombres: { type: String, required: true },
        apellidos: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        foto: {type: String, required: false},
        estatus: {type: String, required: true, default: 'activo'},
        direccion: {
            calle: {type: String, required: false},
            codigoPostal: {type: String, required: false},
            estado: {type: String, required: false},
        },
        telefono: {type: String, required: false},
    }, {timestamps: true});

    const Usuario = mongoose.model('Usuario', clientesSchema, 'clientes');;

    module.exports = Usuario;