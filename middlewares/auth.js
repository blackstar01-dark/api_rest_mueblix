const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/BlacklistedToken');
require('dotenv').config();



async function verificarToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    try {
        const tokenInvalido = await BlacklistedToken.findOne({ token });
        if (tokenInvalido) {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id;

        next(); 
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
}

module.exports = { verificarToken };