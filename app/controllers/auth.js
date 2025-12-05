const Usuario = require('../../models/usuario');
const Empleado = require('../../models/empleado');
const BlacklistedToken = require('../../models/BlacklistedToken');
const jwt = require('jsonwebtoken');

/**
 * Login de un usuario cliente
 */
async function loginCliente(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
        }

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ message: 'Correo no registrado' });
        }

        const passwordValido = await usuario.isValidPassword(password);
        if (!passwordValido) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: usuario._id, rol: 'cliente', nombres: usuario.nombres, apellidos: usuario.apellidos, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error loginCliente:', error);
        res.status(500).json({ message: 'Error en el inicio de sesión' });
    }
}

async function registerCliente(req, res) {
    try {
        const { nombres, apellidos, email, password, telefono } = req.body;

        if (!nombres || !apellidos || !email || !password || !telefono) {
            return res.status(400).json({ message: 'Nombres, apellidos, correo, contraseña y teléfono son requeridos' });
        }

        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'Correo ya registrado' });
        }

        const usuario = new Usuario({
            nombres,
            apellidos,
            email,
            password,
            telefono
        });

        await usuario.save();

        res.status(201).json({ message: 'Registro exitoso', data: usuario });
    } catch (error) {
        console.error('Error registerCliente:', error);
        res.status(500).json({ message: 'Error en el registro' });
    }
    
}

/**
 * Logout de un usuario cliente
 */
async function logoutCliente(req, res) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        const decoded = jwt.decode(token);
        if (!decoded || !decoded.exp) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        const expiresAt = new Date(decoded.exp * 1000);

        await BlacklistedToken.create({ token, expiresAt });

        res.status(200).json({ message: 'Cierre de sesión exitoso' });
    } catch (error) {
        console.error('Error logoutCliente:', error);
        res.status(500).json({ message: 'Error en el cierre de sesión' });
    }
}

/**
 * Login de un empleado
 */
async function loginEmpleado(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
        }

        const empleado = await Empleado.findOne({ email });
        if (!empleado) {
            return res.status(401).json({ message: 'Correo no registrado' });
        }

        const passwordValido = await empleado.isValidPassword(password);
        if (!passwordValido) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: empleado._id, rol: 'empleado' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

         res.status(200).json(token);
    } catch (error) {
        console.error('Error loginEmpleado:', error);
        res.status(500).json({ message: 'Error en el inicio de sesión' });
    }
}

async function clienteProfile(req, res) {
    try {
        const id = req.userId; // 🔥 Asegurarse que req.user viene del middleware
        if (!id) {
            return res.status(400).json({ message: 'ID de usuario no válido' });
        }

        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.error('Error clienteProfile:', error);
        res.status(500).json({ message: 'Error en la obtención del perfil del cliente' });
    }
}


module.exports = { loginCliente, logoutCliente, loginEmpleado, registerCliente, clienteProfile };
