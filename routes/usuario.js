const express = require('express');
const router = express.Router();
const usuarioController = require('../app/controllers/usuario');
const auth = require('../app/controllers/auth');
const token = require('../middlewares/auth');
const googleAuth = require('../app/controllers/googleAuth')

router.get('/', usuarioController.indexUsuario);

router.post('/register', auth.registerCliente);
router.post('/login', auth.loginCliente);
router.post('/logout', auth.logoutCliente);
router.get('/profile', token.verificarToken, auth.clienteProfile);
router.post('/google', googleAuth.registerGoogle);

router.get('/:id', usuarioController.showUsuario);
router.post('/', usuarioController.postUsuario);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.destroyUsuario);




module.exports = router;