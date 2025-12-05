const mongoose = require('mongoose');
const Usuario = require('../../models/usuario');

async function indexUsuario(req, res) {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json({ message: 'Usuarios obtenidos correctamente', data: usuarios });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
}

async function showUsuario(req, res) {
    const { id } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID de usuario no válido' });
    }

    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario obtenido correctamente', data: usuario });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
}

async function postUsuario(req, res) {
    const body = req.body;
    try {
        const usuario = await Usuario.create(body);
        res.status(200).json({ message: 'Usuario registrado correctamente', data: usuario });
    } catch (error) {
        res.status(400).json({ message: 'Error en el registro', error });
    }
}

async function updateUsuario(req, res) {
    const { id } = req.params;
    const body = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID de usuario no válido' });
    }

    try {
        const usuario = await Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario actualizado correctamente', data: usuario });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el usuario', error });
    }
}

async function destroyUsuario(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID de usuario no válido' });
    }

    try {
        const usuario = await Usuario.findByIdAndUpdate(id, { estatus: 'inactivo' }, { new: true });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario desactivado correctamente', data: usuario });
    } catch (error) {
        res.status(400).json({ message: 'Error al desactivar el usuario', error });
    }
}

module.exports = { indexUsuario, showUsuario, postUsuario, updateUsuario, destroyUsuario };
