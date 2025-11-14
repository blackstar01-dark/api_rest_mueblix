const Sensor = require('../../models/sensor');

async function indexSensor(req, res) {
    try {
        const sensor = await Sensor.find();
        res.status(200).json(sensor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function showSensor(req, res) {
    const id = req.params.id;
    try {
        const sensor = await Sensor.findById(id);
        if(!sensor) {
            return res.status(404).json({message: 'Sensor no encontrado'});
        }
        res.status(200).json(sensor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function storeSensor(req, res) {
    const body = req.body;
    try {
        const sensor = await Sensor.create(body);
        res.status(200).json(sensor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function updateSensor(req, res) {
    const id = req.params.id;
    const body = req.body;
    try {
        const sensor = await Sensor.findByIdAndUpdate(id, body, { new: true });
        if(!sensor) {
            return res.status(404).json({message: 'Sensor no encontrado'});
        }
        res.status(200).json(sensor);
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function destroySensor(req, res) {
    const id = req.params.id;
    try {
        const sensor = await Sensor.findByIdAndDelete(id, { estado: 'inactivo'}, { new: true });
        if(!sensor) {
            return res.status(404).json({message: 'Sensor no encontrado'});
        }
        res.status(200).json(sensor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { indexSensor, showSensor, storeSensor, updateSensor, destroySensor}