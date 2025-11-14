const express = require('express');
const router = express.Router();
const usuarioController = require('../app/controllers/usuario');
const auth = require('../app/controllers/auth')

router.get('/', usuarioController.indexUsuario);

router.get('/:id', usuarioController.showUsuario);

router.post('/', usuarioController.postUsuario);

router.put('/:id', usuarioController.updateUsuario);

router.delete('/:id', usuarioController.destroyUsuario);

router.post('/login', auth.loginCliente);

router.post('/logout', auth.logoutCliente);

module.exports = router;