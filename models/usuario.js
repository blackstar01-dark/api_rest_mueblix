    const mongoose = require('mongoose');
    const { Schema } = mongoose;
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcryptjs');

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

    clientesSchema.pre('save', async function(next) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (error) {
            next(error);
        }
    })

    clientesSchema.methods.isValidPassword = async function(password) {
        try {
            return await bcrypt.compare(password, this.password);
        } catch (error) {
            throw error;
        }
    }

    const Usuario = mongoose.model('Usuario', clientesSchema, 'clientes');;

    module.exports = Usuario;