const Usuario = require('../../models/usuario');
const BlacklistedToken = require('../../models/BlacklistedToken');
const jwt = require('jsonwebtoken');

async function loginCliente(req, res) {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ email });
        if (!usuario){
            return res.status(401).json({message: 'Correo no registrado'});
        }
        const passwordValido = await usuario.isValidPassword(password);
        if (!passwordValido) {
            return res.status(401).json({message: 'Contraseña incorrecta'});
        }
        const token = jwt.sign({id: usuario._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({message: 'Inicio de sesión exitoso', data: token});
    } catch (error) {
        res.status(400).json({message: 'Error en el inicio de sesión', data: error});
    }
}

async function logoutCliente(req, res) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({message: 'Token no proporcionado'});
        }

        const decoded = jwt.decode(token);
        if(!decoded){
            return res.status(401).json({message: 'Token inválido'});
        }
        const expiresAt = new Date(decoded.exp * 1000);

        await BlacklistedToken.create({token, expiresAt});

        res.status(200).json({message: 'Cierre de sesión exitoso'});
    } catch (error) {
        res.status(400).json({message: 'Error en el cierre de sesión', data: error}); 
    }
}

module.exports = { loginCliente, logoutCliente }