const mongoose = require('mongoose');
const Empleado = require('../../models/empleado');


async function indexEmpleado(req, res) {
    try {
        const empleados = await Empleado.find();
        res.status(200).json({ message: 'Empleados obtenidos correctamente', data: empleados });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los empleados', error });
    }
}


async function showEmpleado(req, res) {
    const { id } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID de empleado no válido' });
    }

    try {
        const empleado = await Empleado.findById(id);
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.status(200).json({ message: 'Empleado obtenido correctamente', data: empleado });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el empleado', error });
    }
}


async function postEmpleado(req, res) {
    try {
        const empleado = await Empleado.create(req.body);
        res.status(201).json({ message: 'Empleado creado correctamente', data: empleado });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el empleado', error });
    }
}


async function updateEmpleado(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID de empleado no válido' });
    }

    try {
        const empleado = await Empleado.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.status(200).json({ message: 'Empleado actualizado correctamente', data: empleado });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el empleado', error });
    }
}


async function destroyEmpleado(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID de empleado no válido' });
    }

    try {
        const empleado = await Empleado.findByIdAndUpdate(
            id,
            { estatus: 'inactivo' },
            { new: true, runValidators: true }
        );
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.status(200).json({ message: 'Empleado eliminado correctamente', data: empleado });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el empleado', error });
    }
}

async function profileEmpleado(req, res) {
    try {
        const empleadoId = req.userId;  // Usar req.userId en lugar de req.user.id
        const empleado = await Empleado.findById(empleadoId);
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.status(200).json({ message: 'Perfil del empleado obtenido correctamente', data: empleado });
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener el perfil del empleado', error });
    }
}


module.exports = {
    indexEmpleado,
    showEmpleado,
    postEmpleado,
    updateEmpleado,
    destroyEmpleado,
    profileEmpleado
};
