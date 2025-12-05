const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/BlacklistedToken');
require('dotenv').config();

async function verificarToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];  // Extraer token del header Authorization

    // Si no hay token, devolver error
    if (!token) {
        console.log('Token no proporcionado');  // Depuración: Verificar que el token está presente
        return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    try {
        // Verificar si el token está en la lista negra
        const tokenInvalido = await BlacklistedToken.findOne({ token });
        if (tokenInvalido) {
            console.log('Token encontrado en la lista negra');  // Depuración: Verificar que el token esté en la lista negra
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }

        // Decodificar el token y verificar su validez
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token verificado:', decoded);  // Depuración: Mostrar el contenido del token decodificado

        // Asignar el userId al request para usarlo más tarde en las rutas protegidas
        req.userId = decoded.id;
        
        next();  // Si el token es válido, proceder con la siguiente función o ruta
    } catch (error) {
        console.error('Error al verificar el token:', error);  // Log para errores en la verificación del token
        return res.status(401).json({ message: 'Token inválido o expirado', error: error.message });
    }
}

module.exports = { verificarToken };
