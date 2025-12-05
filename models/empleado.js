const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require('bcryptjs');

const empleadosSchema = new Schema({
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: false},
    foto: {type: String, required: false},
    estatus: {type: String, required: true, default: 'activo'},
    rol: {type: String, required: true},
    fecha_nacimiento: {type: Date, required: false},
    telefono: {type: String, required: false},
    direccion: {
        calle: {type: String, required: false},
        codigoPostal: {type: String, required: false},
        estado: {type: String, required: false},
    },
    authGoogle: { type: Boolean, required: false, default: false }
}, {timestamps: true});

empleadosSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})

empleadosSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}

const Empleado = mongoose.model('Empleado', empleadosSchema, 'empleados');

module.exports = Empleado;