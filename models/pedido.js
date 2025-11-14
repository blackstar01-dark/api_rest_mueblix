const mongoose = require('mongoose');
const Producto = require('./producto');
const { Schema } = mongoose;

const pedidoSchema = new Schema({
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario', required: true},
    producto: {type: Schema.Types.ObjectId, ref: 'Producto', required: true},
    cantidad: {type: Number, required: true},
    total: {type: Number, required: true},
    fecha_pedido: {type: Date, default: Date.now},
    estado: {type: String, required: true, default: 'pendiente'},
    direccion_envio: {
        calle: {type: String, required: false},
        codigoPostal: {type: String, required: false},
        estado: {type: String, required: false},
    },
    pago: {
        metodo_pago: {type: String, required: true},
        estatus_pago: {type: String, required: true}
    }
}, {timestamps: true});

const Pedido = mongoose.model('Pedido', pedidoSchema, 'pedidos');

module.exports = Pedido;