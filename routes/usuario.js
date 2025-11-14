const express = require('express');
const router = express.Router();
const usuarioController = require('../app/controllers/usuario');

router.get('/', usuarioController.indexUsuario);

router.get('/:id', usuarioController.showUsuario);

router.post('/', usuarioController.postUsuario);

router.put('/:id', usuarioController.updateUsuario);

router.delete('/:id', usuarioController.destroyUsuario);

module.exports = router;