const mongoose = require('mongoose');
const { Schema } = mongoose;

const sensorSchema = new Schema({
    nombre: {type: String, required: true},
    tipo: {type: String, required: true},
    estado: {type: String, required: true},
    lectura: {
        valor: {type: Number, required: true},
        fecha: {type: Date, required: true}
    }
})

const Sensor = mongoose.model('Sensor', sensorSchema, 'sensores');

module.exports = Sensor;