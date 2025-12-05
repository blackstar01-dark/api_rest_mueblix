const Cliente = require('../../models/usuario');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// =====================
//  LOGIN CON GOOGLE
// =====================
async function loginGoogle(req, res) {
    const { token } = req.body;

    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const email = payload.email;

        let cliente = await Cliente.findOne({ email });

        // Si no existe, crearlo
        if (!cliente) {
            cliente = await Cliente.create({
                email,
                nombres: payload.given_name || payload.name || '',
                apellidos: payload.family_name || '',
                foto: payload.picture || null,
                password: Math.random().toString(36).slice(-10), // evita null
                authGoogle: true,
            });
        }

        const tokenJWT = jwt.sign(
            { id: cliente._id, email: cliente.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: 'Login exitoso',
            token: tokenJWT,
            cliente,
        });

    } catch (error) {
        res.status(400).json({ message: 'Error en el login con Google' });
    }
}

// =====================
//  REGISTRO CON GOOGLE
// =====================
async function registerGoogle(req, res) {
    const { token } = req.body;

    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const email = payload.email;

        let cliente = await Cliente.findOne({ email });

        if (cliente) {
            return res.status(400).json({
                message: 'El cliente ya está registrado',
            });
        }

        cliente = await Cliente.create({
            email,
            nombres: payload.given_name || payload.name || '',
            apellidos: payload.family_name || '',
            foto: payload.picture || null,
            password: Math.random().toString(36).slice(-10),
            authGoogle: true,
        });

        const tokenJWT = jwt.sign(
            { id: cliente._id, email: cliente.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: 'Registro exitoso',
            token: tokenJWT,
            cliente,
        });

    } catch (error) {
        res.status(400).json({ message: 'Error en el registro con Google' });
    }
}

module.exports = { loginGoogle, registerGoogle };
