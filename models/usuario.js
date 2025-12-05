const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const clientesSchema = new Schema({
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    foto: { type: String, required: false },
    estatus: { type: String, required: true, default: 'activo' },
    direccion: {
        calle: { type: String, required: false },
        codigoPostal: { type: String, required: false },
        estado: { type: String, required: false },
    },
    telefono: { type: String, required: false },
    authGoogle: { type: Boolean, required: false, default: false }
}, { timestamps: true });



clientesSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next();

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();

    } catch (error) {
        next(error);
    }
});


// ✔️ Método para validar contraseña
clientesSchema.methods.isValidPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};


// ✔️ Modelo consistente
const Cliente = mongoose.model('Cliente', clientesSchema, 'clientes');

module.exports = Cliente;
