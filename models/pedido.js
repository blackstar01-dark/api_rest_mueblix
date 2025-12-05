const mongoose = require('mongoose');
const { Schema } = mongoose;

// IMPORTA los modelos referenciados
require('./usuario');   // <-- esto asegura que 'Usuario' esté registrado
require('./producto');  // <-- si quieres popular producto también

const pedidoSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true },
    producto: [{ type: Schema.Types.ObjectId, ref: 'Producto', required: true }],
    cantidad: { type: Number, required: true },
    total: { type: Number, required: true },
    fecha_pedido: { type: Date, default: Date.now },
    estado: { type: String, required: true, default: 'pendiente' },
    direccion_envio: {
        calle: { type: String },
        codigoPostal: { type: String },
        estado: { type: String },
    },
    pago: {
        metodo_pago: { type: String, required: true },
        estatus_pago: { type: String, required: true },
        fecha_pago: { type: Date, default: Date.now },
    },
    informacion_envio: {
        fecha_envio: { type: Date },
        fecha_entrega: { type: Date },
    }
}, { timestamps: true });

// Registrar el modelo
const Pedido = mongoose.model('Pedido', pedidoSchema, 'pedidos');

module.exports = Pedido;
