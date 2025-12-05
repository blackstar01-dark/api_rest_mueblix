const mongoose = require('mongoose');
const Categoria = require('./categoria');
const { Schema } = mongoose;

const productosSchema = new Schema({
    nombre: {type: String, required: true, index: true},
    precio: {type: String, required: true},
    cantidad: {type: Number, required: true},
    estatus: {type: String, required: true, default: 'existente'},
    caracteristicas: {
        tipo: {type: String, required: true},
        descripcion: {type: String, required: true},
        color: {type: String, required: true},
        peso: {type: Number, required: true},
    },
    categoria: {type: Schema.Types.ObjectId, ref: 'Categoria', required: true, index: true},
    imagen: [{type: String, required: true}],  
    sensor: {type: Schema.Types.ObjectId, ref: 'Sensor', required: true},
}, {timestamps: true});

const Producto = mongoose.model('Producto', productosSchema, 'productos');

module.exports = Producto;